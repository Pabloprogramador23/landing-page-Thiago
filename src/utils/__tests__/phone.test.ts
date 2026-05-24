import { describe, it, expect } from 'vitest';
import { formatPhone } from '../phone';

describe('formatPhone — BR-MIGRAR-037', () => {
  it('retorna string vazia para input vazio', () => {
    expect(formatPhone('')).toBe('');
  });

  it('formata 10 dígitos (fixo): 8598630325 → (85) 9863-0325', () => {
    expect(formatPhone('8598630325')).toBe('(85) 9863-0325');
  });

  it('formata 11 dígitos (celular): 85986303253 → (85) 98630-3253', () => {
    expect(formatPhone('85986303253')).toBe('(85) 98630-3253');
  });

  it('ignora caracteres não-numéricos no input', () => {
    expect(formatPhone('(85) 98630-3253')).toBe('(85) 98630-3253');
  });

  it('formata parcialmente enquanto digita — 2 dígitos', () => {
    expect(formatPhone('85')).toBe('(85');
  });

  it('formata parcialmente — 6 dígitos', () => {
    expect(formatPhone('859863')).toBe('(85) 9863');
  });

  it('trunca em 11 dígitos máximo', () => {
    expect(formatPhone('859863032530000')).toBe('(85) 98630-3253');
  });

  it('é função pura — mesma entrada produz mesma saída', () => {
    const input = '85986303253';
    expect(formatPhone(input)).toBe(formatPhone(input));
  });
});
