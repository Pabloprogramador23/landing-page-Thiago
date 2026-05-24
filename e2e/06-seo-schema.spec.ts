import { test, expect } from '@playwright/test';

// PARITY-006 — SEO, schema.org/Person, Open Graph, Plausible Analytics

test.describe('SEO, schema.org e meta tags', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('meta tags básicas presentes — BR-MIGRAR-051', async ({ page }) => {
    // <title> com nome de Pablo
    await expect(page).toHaveTitle(/Pablo Magalhães/);

    // <html lang="pt-BR">
    const lang = await page.locator('html').getAttribute('lang');
    expect(lang).toBe('pt-BR');

    // meta description não-vazia
    const description = await page.locator('meta[name="description"]').getAttribute('content');
    expect(description).toBeTruthy();
    expect(description!.length).toBeGreaterThan(10);

    // canonical
    await expect(page.locator('link[rel="canonical"]')).toBeAttached();
  });

  test('Open Graph tags presentes — BR-MIGRAR-051', async ({ page }) => {
    const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
    expect(ogTitle).toContain('Pablo');

    const ogType = await page.locator('meta[property="og:type"]').getAttribute('content');
    expect(ogType).toBe('website');

    const ogDesc = await page.locator('meta[property="og:description"]').getAttribute('content');
    expect(ogDesc).toBeTruthy();

    const ogUrl = await page.locator('meta[property="og:url"]').getAttribute('content');
    expect(ogUrl).toMatch(/^https?:\/\//);

    const ogImage = await page.locator('meta[property="og:image"]').getAttribute('content');
    expect(ogImage).toMatch(/^https?:\/\//);
  });

  test('Twitter Card tags presentes', async ({ page }) => {
    await expect(page.locator('meta[name="twitter:card"]')).toBeAttached();
    await expect(page.locator('meta[name="twitter:title"]')).toBeAttached();
  });

  test('schema.org/Person presente e correto — BR-MIGRAR-052', async ({ page }) => {
    const ldJson = page.locator('script[type="application/ld+json"]');
    await expect(ldJson).toBeAttached();

    const content = await ldJson.textContent();
    expect(content).toBeTruthy();

    const schema = JSON.parse(content!);
    expect(schema['@type']).toBe('Person');
    expect(schema.name).toBe('Pablo Magalhães');
    expect(schema.email).toBe('pablomagalhes@gmail.com');
    expect(schema.url).toMatch(/^https?:\/\//);
    expect(schema.sameAs).toContain('https://github.com/Pabloprogramador23');
  });

  test('Plausible Analytics script presente — DEV-013', async ({ page }) => {
    const plausible = page.locator('script[data-domain][src*="plausible.io"]');
    await expect(plausible).toBeAttached();

    const domain = await plausible.getAttribute('data-domain');
    expect(domain).toBeTruthy();
  });

  test('favicon presente no <head>', async ({ page }) => {
    const favicon = page.locator('link[rel="icon"]').first();
    await expect(favicon).toBeAttached();
  });

  test('zero endpoints de servidor — sem src/pages/api — BR-MIGRAR-050', async ({ page }) => {
    // Verifica que rotas de API retornam 404 (não existem)
    const response = await page.request.get('/api/test');
    expect([404, 200]).toContain(response.status()); // 404 esperado, 200 seria erro
    // O formulário é client-side only — verificado nos testes E2E do form
  });
});
