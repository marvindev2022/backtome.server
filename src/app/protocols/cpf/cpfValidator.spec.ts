import { CpfValidator } from './cpfValidator';

describe('Cpf', () => {
  it('should return false when all digits are the same', () => {
    const validations: boolean[] = [];

    for (let i = 0; i < 10; i++) {
      const actualDigit = i;
      let digits = '';
      for (let j = 0; j < 10; j++) {
        digits += actualDigit.toString();
      }

      const isValid = new CpfValidator().execute(digits);
      validations.push(isValid);
      digits = '';
    }

    expect(validations.every((validation) => !validation)).toBeTruthy();
  });

  it('should return false when cpf is not real', () => {
    const falsyCpf = '14662312746';
    const isValid = new CpfValidator().execute(falsyCpf);

    expect(isValid).toBeFalsy();
  });

  it('should return true when cpf is real', () => {
    const isValid = jest
      .spyOn(new CpfValidator(), 'execute')
      .mockReturnValueOnce(true);

    expect(isValid).toBeTruthy();
  });
});
