import { describe, it, expect } from 'vitest';
import { buildWhatsAppUrl } from '../whatsapp';

const WHATSAPP_NUMBER = '5585986032781';

const validData = {
  nome: 'João Silva',
  telefone: '(85) 98603-2781',
  email: 'joao@gmail.com',
  mensagem: 'Quero contratar seus serviços',
};

describe('buildWhatsAppUrl — BR-MIGRAR-038, BR-MIGRAR-039', () => {
  it('gera URL começando com https://wa.me/{número}', () => {
    const url = buildWhatsAppUrl(validData, WHATSAPP_NUMBER);
    expect(url).toMatch(/^https:\/\/wa\.me\/5585986032781\?text=/);
  });

  it('URL contém o número correto — não hardcoded no componente', () => {
    const url = buildWhatsAppUrl(validData, WHATSAPP_NUMBER);
    expect(url).toContain('5585986032781');
  });

  it('mensagem decodificada contém todos os campos — BR-MIGRAR-039', () => {
    const url = buildWhatsAppUrl(validData, WHATSAPP_NUMBER);
    const encodedText = url.split('?text=')[1];
    const decoded = decodeURIComponent(encodedText);

    expect(decoded).toContain('*Nova mensagem do site:*');
    expect(decoded).toContain('👤 *Nome:* João Silva');
    expect(decoded).toContain('📞 *Telefone:* (85) 98603-2781');
    expect(decoded).toContain('📧 *Email:* joao@gmail.com');
    expect(decoded).toContain('💬 *Mensagem:*');
    expect(decoded).toContain('Quero contratar seus serviços');
    expect(decoded).toContain('_Enviado através do formulário do site_');
  });

  it('template preservado exatamente — BR-MIGRAR-039 (template literal)', () => {
    const url = buildWhatsAppUrl(
      { nome: 'João Silva', telefone: '(85) 98603-2781', email: 'joao@gmail.com', mensagem: 'Quero contratar seus serviços' },
      WHATSAPP_NUMBER
    );
    const decoded = decodeURIComponent(url.split('?text=')[1]);
    const expected =
      `*Nova mensagem do site:*\n\n` +
      `👤 *Nome:* João Silva\n` +
      `📞 *Telefone:* (85) 98603-2781\n` +
      `📧 *Email:* joao@gmail.com\n\n` +
      `💬 *Mensagem:*\nQuero contratar seus serviços\n\n` +
      `---\n` +
      `_Enviado através do formulário do site_`;
    expect(decoded).toBe(expected);
  });

  it('é função pura — mesma entrada produz mesma saída', () => {
    const url1 = buildWhatsAppUrl(validData, WHATSAPP_NUMBER);
    const url2 = buildWhatsAppUrl(validData, WHATSAPP_NUMBER);
    expect(url1).toBe(url2);
  });

  it('usa o whatsappNumber passado como parâmetro (não hardcoded)', () => {
    const outroNumero = '5511999999999';
    const url = buildWhatsAppUrl(validData, outroNumero);
    expect(url).toContain(outroNumero);
    expect(url).not.toContain(WHATSAPP_NUMBER);
  });

  it('codifica caracteres especiais na mensagem', () => {
    const data = { ...validData, mensagem: 'Olá! Gostaria de & mais informações' };
    const url = buildWhatsAppUrl(data, WHATSAPP_NUMBER);
    expect(url).not.toContain('&mais');
    expect(url).toContain(encodeURIComponent('&'));
  });
});
