/**
 * Valida formato de e-mail (apenas sintaxe, sem verificação MX).
 * RN-02 — extraído de whatsappForm.js:21-25
 */
export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

/**
 * Verifica se um campo obrigatório está preenchido.
 * RN-01
 */
export function validateRequired(value: string): boolean {
  return value.trim().length > 0;
}
