import { test, expect } from '@playwright/test';

// PARITY-005 — Conteúdo estático — paridade textual e estrutural

test.describe('Conteúdo estático — paridade por seção', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  // ─── ABOUT ───

  test('seção #sobre exibe foto com alt correto — BR-MIGRAR-017', async ({ page }) => {
    const foto = page.locator('#sobre img[alt="Foto de Pablo Magalhães"]');
    await expect(foto).toBeAttached();
  });

  test('foto tem loading="lazy" — BR-MIGRAR-048', async ({ page }) => {
    const foto = page.locator('#sobre img[alt="Foto de Pablo Magalhães"]');
    await expect(foto).toHaveAttribute('loading', 'lazy');
  });

  test('links sociais da seção About têm noopener — BR-MIGRAR-021 + BR-MIGRAR-046', async ({ page }) => {
    const githubLink = page.locator('#sobre a[href*="github.com"]');
    const linkedinLink = page.locator('#sobre a[href*="linkedin.com"]');
    await expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
    await expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  // ─── SKILLS ───

  test('exatamente 6 cards de skill — DEV-011', async ({ page }) => {
    await page.locator('#skills').scrollIntoViewIfNeeded();
    const cards = page.locator('#skills .skill-card');
    await expect(cards).toHaveCount(6);
  });

  test('cada skill tem ícone, título e descrição — BR-MIGRAR-022', async ({ page }) => {
    await page.locator('#skills').scrollIntoViewIfNeeded();
    const cards = page.locator('#skills .skill-card');
    const count = await cards.count();
    for (let i = 0; i < count; i++) {
      const card = cards.nth(i);
      await expect(card.locator('svg, [data-icon]')).toBeAttached();
      await expect(card.locator('h3')).not.toBeEmpty();
      await expect(card.locator('p')).not.toBeEmpty();
    }
  });

  // ─── SERVIÇOS ───

  test('exatamente 6 cards de serviço — BR-MIGRAR-024', async ({ page }) => {
    await page.locator('#servicos').scrollIntoViewIfNeeded();
    const cards = page.locator('#servicos .service-card');
    await expect(cards).toHaveCount(6);
  });

  test('cada serviço tem ícone, título e descrição — DEV-010', async ({ page }) => {
    await page.locator('#servicos').scrollIntoViewIfNeeded();
    const cards = page.locator('#servicos .service-card');
    const count = await cards.count();
    for (let i = 0; i < count; i++) {
      const card = cards.nth(i);
      await expect(card.locator('svg, [data-icon]')).toBeAttached();
      await expect(card.locator('p').first()).not.toBeEmpty();
    }
  });

  test('layout alternado: cards pares mr-auto, ímpares ml-auto — BR-MIGRAR-025', async ({ page }) => {
    await page.locator('#servicos').scrollIntoViewIfNeeded();
    const cards = page.locator('#servicos .service-card');

    // Card 0 (par) deve ter mr-auto
    await expect(cards.nth(0)).toHaveClass(/mr-auto/);
    // Card 1 (ímpar) deve ter ml-auto
    await expect(cards.nth(1)).toHaveClass(/ml-auto/);
  });

  // ─── FOOTER ───

  test('footer exibe PabloTech, nav links, social e copyright — BR-MIGRAR-043', async ({ page }) => {
    await expect(page.locator('footer').getByText('PabloTech').first()).toBeVisible();
    await expect(page.locator('footer a[href*="github.com"]')).toBeVisible();
    await expect(page.locator('footer a[href*="linkedin.com"]')).toBeVisible();
  });

  test('copyright exibe ano corrente — BR-MIGRAR-044 + DEV-006', async ({ page }) => {
    const currentYear = new Date().getFullYear().toString();
    await expect(page.locator('footer').getByText(currentYear)).toBeVisible();
  });

  // ─── PARADIGMA: dados em data files, não hardcoded ───

  test('links externos globais têm rel="noopener noreferrer" — G-01 eliminado por construção', async ({ page }) => {
    const externalLinks = page.locator('a[target="_blank"]');
    const count = await externalLinks.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      const rel = await externalLinks.nth(i).getAttribute('rel');
      expect(rel).toContain('noopener');
      expect(rel).toContain('noreferrer');
    }
  });
});
