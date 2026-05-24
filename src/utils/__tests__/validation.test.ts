import { describe, it, expect } from 'vitest';
import { validateEmail, validateRequired } from '../validation';

describe('validateEmail — BR-MIGRAR-036', () => {
  // Casos válidos
  it('aceita email simples', () => {
    expect(validateEmail('pablo@gmail.com')).toBe(true);
  });

  it('aceita email com domínio .com.br', () => {
    expect(validateEmail('pablo@empresa.com.br')).toBe(true);
  });

  it('aceita email com tag +', () => {
    expect(validateEmail('pablo+tag@gmail.com')).toBe(true);
  });

  // Casos inválidos — tabela de exemplos do feature file
  it('rejeita email sem @', () => {
    expect(validateEmail('invalido')).toBe(false);
  });

  it('rejeita email sem usuário antes de @', () => {
    expect(validateEmail('@gmail.com')).toBe(false);
  });

  it('rejeita email sem domínio após @', () => {
    expect(validateEmail('pablo@')).toBe(false);
  });

  it('rejeita email com espaço', () => {
    expect(validateEmail('pablo gmail.com')).toBe(false);
  });

  it('rejeita string vazia', () => {
    expect(validateEmail('')).toBe(false);
  });

  it('é função pura', () => {
    const email = 'test@test.com';
    expect(validateEmail(email)).toBe(validateEmail(email));
  });
});

describe('validateRequired', () => {
  it('retorna true para string com conteúdo', () => {
    expect(validateRequired('João')).toBe(true);
  });

  it('retorna false para string vazia', () => {
    expect(validateRequired('')).toBe(false);
  });

  it('retorna false para string só com espaços', () => {
    expect(validateRequired('   ')).toBe(false);
  });

  it('retorna true para string com espaços e conteúdo', () => {
    expect(validateRequired('  João  ')).toBe(true);
  });
});
