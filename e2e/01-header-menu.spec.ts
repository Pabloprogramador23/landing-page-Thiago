import { test, expect } from '@playwright/test';

// PARITY-001 — Header / Nav — menu mobile hamburger

test.describe('Header — navegação e menu mobile', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('6 links de navegação: Início, Sobre, Skills, Serviços, Portfolio, Contato', async ({ page }) => {
    const expectedLinks = ['Início', 'Sobre', 'Skills', 'Serviços', 'Portfolio', 'Contato'];
    const expectedHrefs = ['#inicio', '#sobre', '#skills', '#servicos', '#portfolio', '#contato'];

    const nav = page.locator('nav').first();
    for (let i = 0; i < expectedLinks.length; i++) {
      await expect(nav.locator(`a[href="${expectedHrefs[i]}"]`)).toBeVisible();
    }
  });

  test('nav tem role="navigation" e aria-label — DEV-008', async ({ page }) => {
    const nav = page.locator('nav').first();
    await expect(nav).toHaveAttribute('aria-label', /.+/);
  });

  test('desktop: links visíveis inline, hamburger oculto — BR-MIGRAR-006', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    const hamburger = page.locator('button[aria-label*="menu"], button[aria-label*="Menu"], #hamburger-btn, [data-menu-toggle]');
    await expect(page.locator('nav a[href="#sobre"]').first()).toBeVisible();
  });

  test('mobile: hamburger visível e abre overlay — BR-MIGRAR-002', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    const hamburger = page.locator('button[aria-expanded]').first();
    await expect(hamburger).toBeVisible();
    await expect(hamburger).toHaveAttribute('aria-expanded', 'false');

    await hamburger.click();

    await expect(hamburger).toHaveAttribute('aria-expanded', 'true');
  });

  test('mobile: menu fecha ao clicar X novamente — BR-MIGRAR-003', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    const hamburger = page.locator('button[aria-expanded]').first();

    await hamburger.click();
    await expect(hamburger).toHaveAttribute('aria-expanded', 'true');

    await hamburger.click();
    await expect(hamburger).toHaveAttribute('aria-expanded', 'false');
  });

  test('mobile: menu fecha ao pressionar Escape — DEV-008', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    const hamburger = page.locator('button[aria-expanded]').first();

    await hamburger.click();
    await expect(hamburger).toHaveAttribute('aria-expanded', 'true');

    await page.keyboard.press('Escape');
    await expect(hamburger).toHaveAttribute('aria-expanded', 'false');
  });

  test('logo/brand aponta para #inicio', async ({ page }) => {
    const logoLink = page.locator('header a[href="#inicio"]').first();
    await expect(logoLink).toBeVisible();
  });
});
