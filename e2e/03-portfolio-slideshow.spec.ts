import { test, expect } from '@playwright/test';

// PARITY-003 — Portfolio slideshow

test.describe('Portfolio — slideshow de projetos', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.locator('#portfolio').scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
  });

  test('4 projetos exibidos — BR-MIGRAR-028', async ({ page }) => {
    const titles = [
      'NexusLearn Academy',
      'RAG de Sites de Notícias',
      'Sindicato',
      'Hotel HMS',
    ];
    for (const title of titles) {
      await expect(page.locator(`#portfolio h3:has-text("${title}")`).first()).toBeVisible();
    }
    // "Plataforma Agentic" não deve existir
    await expect(page.locator('#portfolio h3:has-text("Plataforma Agentic")')).toHaveCount(0);
  });

  test('4 slideshows independentes existem na seção', async ({ page }) => {
    const slideshows = page.locator('[id^="slideshow-"]');
    await expect(slideshows).toHaveCount(4);
  });

  test('apenas 1 imagem visível por vez em cada slideshow — BR-MIGRAR-029', async ({ page }) => {
    const slideshow = page.locator('#slideshow-nexuslearn');
    const visibleImgs = slideshow.locator('img.opacity-100');
    await expect(visibleImgs).toHaveCount(1);
  });

  test('navegação manual Next avança slide — BR-MIGRAR-031', async ({ page }) => {
    const slideshow = page.locator('#slideshow-nexuslearn');
    const nextBtn = slideshow.locator('[data-action="next"]');

    const initialVisible = await slideshow.locator('img.opacity-100').getAttribute('data-slide');
    await nextBtn.click();
    await page.waitForTimeout(400);

    const afterClick = await slideshow.locator('img.opacity-100').getAttribute('data-slide');
    expect(afterClick).not.toBe(initialVisible);
  });

  test('navegação manual Prev retrocede slide — BR-MIGRAR-031', async ({ page }) => {
    const slideshow = page.locator('#slideshow-nexuslearn');
    const nextBtn = slideshow.locator('[data-action="next"]');
    const prevBtn = slideshow.locator('[data-action="prev"]');

    await nextBtn.click();
    await page.waitForTimeout(300);
    const afterNext = await slideshow.locator('img.opacity-100').getAttribute('data-slide');

    await prevBtn.click();
    await page.waitForTimeout(300);
    const afterPrev = await slideshow.locator('img.opacity-100').getAttribute('data-slide');

    expect(afterPrev).not.toBe(afterNext);
  });

  test('links externos dos projetos têm rel="noopener noreferrer" — BR-MIGRAR-032', async ({ page }) => {
    const projectLinks = page.locator('#portfolio a[target="_blank"]');
    const count = await projectLinks.count();
    for (let i = 0; i < count; i++) {
      await expect(projectLinks.nth(i)).toHaveAttribute('rel', 'noopener noreferrer');
    }
  });

  test('todas as imagens têm alt não-vazio — BR-MIGRAR-047', async ({ page }) => {
    const images = page.locator('#portfolio img');
    const count = await images.count();
    for (let i = 0; i < count; i++) {
      const alt = await images.nth(i).getAttribute('alt');
      expect(alt).toBeTruthy();
      expect(alt!.length).toBeGreaterThan(0);
    }
  });

  test('isolamento de estado — navegar em NexusLearn não afeta RAG — DEV-007', async ({ page }) => {
    const nexusSS = page.locator('#slideshow-nexuslearn');
    const ragSS = page.locator('#slideshow-rag-noticias');

    const ragInitial = await ragSS.locator('img.opacity-100').getAttribute('data-slide');

    // Navega várias vezes no Nexus
    const nextBtn = nexusSS.locator('[data-action="next"]');
    await nextBtn.click();
    await page.waitForTimeout(200);
    await nextBtn.click();
    await page.waitForTimeout(200);

    // RAG não deve ter mudado
    const ragAfter = await ragSS.locator('img.opacity-100').getAttribute('data-slide');
    expect(ragAfter).toBe(ragInitial);
  });
});
