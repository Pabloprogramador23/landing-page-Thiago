export interface WhatsAppFormData {
  nome: string;
  telefone: string;
  email: string;
  mensagem: string;
}

/**
 * Monta a URL wa.me com template de mensagem estruturado.
 * RN-05, RN-08 — extraído de whatsappForm.js:28-47
 * Template preservado do legado (data-dictionary.md §3.2).
 */
export function buildWhatsAppUrl(
  data: WhatsAppFormData,
  whatsappNumber: string
): string {
  const message =
    `*Nova mensagem do site:*\n\n` +
    `👤 *Nome:* ${data.nome}\n` +
    `📞 *Telefone:* ${data.telefone}\n` +
    `📧 *Email:* ${data.email}\n\n` +
    `💬 *Mensagem:*\n${data.mensagem}\n\n` +
    `---\n` +
    `_Enviado através do formulário do site_`;

  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}
