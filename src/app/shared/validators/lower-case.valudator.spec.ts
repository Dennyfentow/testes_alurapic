import { isLowerCase } from "./lower-case.validator";

describe('a função isLowerCase', () => {
  it('deve confirmar quando recebe um texto em caixa baixa', () => {
    // preparação do teste
    const valor = 'mario';

    // executação do teste
    const result = isLowerCase(valor);

    // avaliação do resultado
    expect(result).toBe(true);

  });

  it('deve validar quando o valor enviado não for caixa baixa',(() => {
    expect(isLowerCase('Mario')).toBeFalsy(); // preparação, executação e avaliação em uma linha
  }));
})
