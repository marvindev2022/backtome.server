import { MissingParamError } from '@app/errors/MissingParamError';
import { HttpRequest } from '@app/protocols/http';
import { Address } from './Addres';

describe('Address', () => {
  const makeSut = (props: HttpRequest) => {
    const newAddress = new Address(props.body);

    return newAddress;
  };

  it('should throw missing param error if none cep is provided', () => {
    const httpRequest = {
      body: {
        complement: 'any_complement',
      },
    };

    expect(() => makeSut(httpRequest)).toThrow(new MissingParamError('cep'));
  });

  it('should throw missing param error if none complement is provided', () => {
    const httpRequest = {
      body: {
        cep: 'any_cep',
      },
    };

    expect(() => makeSut(httpRequest)).toThrow(
      new MissingParamError('complement'),
    );
  });

  it('should return a new address if request is valid', () => {
    const httpRequest = {
      body: {
        cep: 'any_cep',
        complement: 'any_complement',
        number:'any_number'
      },
    };
    const sut = makeSut(httpRequest);

    expect(Object.values(sut)).toBeTruthy();
  });
});
