import { test, expect } from '@playwright/test';

// PARITY-002 — FloatingButtons — visibilidade e comportamento

test.describe('Botões flutuantes', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('botões ocultos enquanto #inicio está visível — BR-MIGRAR-010', async ({ page }) => {
    const floatingEl = page.locator('#floating-buttons');
    await expect(floatingEl).toHaveClass(/opacity-0/);
  });

  test('botão WhatsApp tem rel="noopener noreferrer" — BR-MIGRAR-046', async ({ page }) => {
    const whatsappBtn = page.locator('#floating-buttons a[href*="wa.me"]');
    await expect(whatsappBtn).toHaveAttribute('rel', 'noopener noreferrer');
  });

  test('botão WhatsApp aponta para wa.me/5585986032781', async ({ page }) => {
    const whatsappBtn = page.locator('#floating-buttons a[href*="wa.me"]');
    await expect(whatsappBtn).toHaveAttribute('href', /wa\.me\/5585986032781/);
  });

  test('backToTop faz scroll para o topo — BR-MIGRAR-013', async ({ page }) => {
    // Rola para baixo para mostrar os botões
    await page.evaluate(() => window.scrollTo(0, 2000));
    await page.waitForTimeout(500);

    const backToTop = page.locator('#back-to-top');
    await backToTop.click();

    await page.waitForTimeout(800);
    const scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollY).toBeLessThan(100);
  });

  test('botões aparecem após rolar além do hero — BR-MIGRAR-010', async ({ page }) => {
    const floatingEl = page.locator('#floating-buttons');

    // Inicialmente ocultos
    await expect(floatingEl).toHaveClass(/opacity-0/);

    // Rola para além do hero
    await page.evaluate(() => window.scrollTo(0, 1000));
    await page.waitForTimeout(600);

    // Devem aparecer
    await expect(floatingEl).not.toHaveClass(/opacity-0/);
  });
});
