/**
 * Formata telefone BR progressivamente (use em onInput).
 * ≤ 10 dígitos → (XX) XXXX-XXXX  (fixo)
 *  > 10 dígitos → (XX) 9XXXX-XXXX (celular)
 * RN-03, RN-04 — extraído de whatsappForm.js:65-77
 */
export function formatPhone(input: string): string {
  const digits = input.replace(/\D/g, '').slice(0, 11);
  const len = digits.length;

  if (len === 0) return '';
  if (len <= 2) return `(${digits}`;
  if (len <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (len <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;

  // 11 dígitos — celular BR com nono dígito
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}
