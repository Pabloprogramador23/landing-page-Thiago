import { test, expect } from '@playwright/test';

// PARITY-004 — Formulário de contato via WhatsApp

test.describe('Formulário de contato', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.locator('#contato').scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
  });

  test('estado inicial — 4 campos vazios, botão habilitado — BR-MIGRAR-034', async ({ page }) => {
    await expect(page.locator('#nome')).toBeVisible();
    await expect(page.locator('#telefone')).toBeVisible();
    await expect(page.locator('#email')).toBeVisible();
    await expect(page.locator('#mensagem')).toBeVisible();

    await expect(page.locator('#nome')).toHaveValue('');
    await expect(page.locator('#telefone')).toHaveValue('');
    await expect(page.locator('#email')).toHaveValue('');
    await expect(page.locator('#mensagem')).toHaveValue('');

    await expect(page.locator('#submitBtn')).toBeEnabled();
  });

  test('erros inline sem alert() ao submeter vazio — BR-MIGRAR-035 + DEV-003', async ({ page }) => {
    let alertFired = false;
    page.on('dialog', () => { alertFired = true; });

    await page.locator('#submitBtn').click();
    await page.waitForTimeout(300);

    expect(alertFired).toBe(false);

    // Erros inline visíveis
    await expect(page.locator('[data-error="nome"]:not(.hidden)')).toBeVisible();
    await expect(page.locator('[data-error="telefone"]:not(.hidden)')).toBeVisible();
    await expect(page.locator('[data-error="email"]:not(.hidden)')).toBeVisible();
    await expect(page.locator('[data-error="mensagem"]:not(.hidden)')).toBeVisible();
  });

  test('email inválido gera erro só no campo email — BR-MIGRAR-036', async ({ page }) => {
    await page.fill('#nome', 'João Silva');
    await page.fill('#telefone', '85986303253');
    await page.fill('#email', 'email-invalido');
    await page.fill('#mensagem', 'Mensagem de teste');

    await page.locator('#submitBtn').click();
    await page.waitForTimeout(300);

    await expect(page.locator('[data-error="email"]:not(.hidden)')).toBeVisible();
    await expect(page.locator('[data-error="nome"].hidden')).toBeAttached();
    await expect(page.locator('[data-error="mensagem"].hidden')).toBeAttached();
  });

  test('formatação automática de telefone 10 dígitos — BR-MIGRAR-037', async ({ page }) => {
    await page.fill('#telefone', '8598630325');
    await expect(page.locator('#telefone')).toHaveValue('(85) 9863-0325');
  });

  test('formatação automática de telefone 11 dígitos — BR-MIGRAR-037', async ({ page }) => {
    await page.fill('#telefone', '85986303253');
    await expect(page.locator('#telefone')).toHaveValue('(85) 98603-2781');
  });

  test('happy path — formulário válido abre wa.me — BR-MIGRAR-038', async ({ page, context }) => {
    const newPagePromise = context.waitForEvent('page');

    await page.fill('#nome', 'João Silva');
    await page.fill('#telefone', '85986303253');
    await page.fill('#email', 'joao@gmail.com');
    await page.fill('#mensagem', 'Olá, gostaria de contratar');

    await page.locator('#submitBtn').click();

    const newPage = await newPagePromise;
    // WhatsApp redireciona wa.me para api.whatsapp.com — ambas são URLs válidas do WhatsApp
    expect(newPage.url()).toMatch(/5585986032781/);
    expect(newPage.url()).toMatch(/whatsapp\.com|wa\.me/);
    await newPage.close();
  });

  test('formulário resetado após envio — BR-MIGRAR-040', async ({ page, context }) => {
    const newPagePromise = context.waitForEvent('page');

    await page.fill('#nome', 'João Silva');
    await page.fill('#telefone', '85986303253');
    await page.fill('#email', 'joao@gmail.com');
    await page.fill('#mensagem', 'Mensagem de teste');

    await page.locator('#submitBtn').click();
    const newPage = await newPagePromise;
    await newPage.close();

    await expect(page.locator('#nome')).toHaveValue('');
    await expect(page.locator('#email')).toHaveValue('');
    await expect(page.locator('#mensagem')).toHaveValue('');
  });

  test('informações de contato direto visíveis — BR-MIGRAR-042', async ({ page }) => {
    await expect(page.locator('#contato').getByText('+55 85 9 8603-2781')).toBeVisible();
    await expect(page.locator('#contato').getByText('pablomagalhes@gmail.com')).toBeVisible();
    await expect(page.locator('#contato a[href*="linkedin"]')).toBeVisible();
  });
});
