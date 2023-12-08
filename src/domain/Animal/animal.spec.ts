import { z } from 'zod';
import { Animal } from './Animal';
import { HttpRequest } from '@app/protocols/http';
import { Message } from '../message/Message';

describe('Animal Class', () => {
  const makeSut = (props: HttpRequest) => {
    const newAnimal = new Animal(
      z.object({
        race: z.string({ required_error: 'Raça inválida' }),
        age: z.string({ required_error: 'Idade inválida' }),
        photo: z.string({required_error: 'Defina imagem'}),
        color: z.string({ required_error: 'Cor inválida' }),
        size: z.string({ required_error: 'Tamanho inválido' }),
        distinctive_chacteristics: z.string({
          required_error: 'Características inválidas',
        }),
      }),
    );

    return newAnimal.handle(props.body);
  };

  it('should throw bad request error if no specie is provided', () => {
    const httpRequest = {
      body: {
        race: 'any_race',
        age: 'any_age',
        color: 'any_color',
        photo: 'any_url',
        size: 'any_size',
        distinctive_characteristics: 'any_characteristic',
      },
    };

    expect(() => makeSut(httpRequest)).toThrow();
  });

  it('should throw bad request error if no race is provided', () => {
    const httpRequest = {
      body: {
        species: 'any_specie',
        age: 'any_age',
        photo: 'any_url',
        color: 'any_color',
        size: 'any_size',
        distinctive_characteristics: 'any_characteristic',
      },
    };

    expect(() => makeSut(httpRequest)).toThrow();
  });

  it('should throw bad request error if a invalid age is provided', () => {
    const httpRequest = {
      body: {
        species: 'any_specie',
        race: 'any_race',
        age: 'invalid_age',
        color: 'any_color',
        size: 'any_size',
        photo: 'any_url',
        distinctive_characteristics: 'any_characteristic',
      },
    };

    expect(() => makeSut(httpRequest)).toThrow();
  });

  it('should throw bad request error if no age is provided', () => {
    const httpRequest = {
      body: {
        species: 'any_specie',
        race: 'any_race',
        color: 'any_color',
        size: 'any_size',
        photo: 'any_url',
        distinctive_characteristics: 'any_characteristic',
      },
    };

    expect(() => makeSut(httpRequest)).toThrow();
  });

  it('should throw bad request error if no color is provided', () => {
    const httpRequest = {
      body: {
        species: 'any_specie',
        race: 'any_race',
        age: 'any_age',
        photo: 'any_url',
        size: 'any_size',
        distinctive_characteristics: 'any_characteristic',
      },
    };

    expect(() => makeSut(httpRequest)).toThrow();
  });

  it('should throw bad request error if no size is provided', () => {
    const httpRequest = {
      body: {
        species: 'any_specie',
        race: 'any_race',
        age: 'any_age',
        photo: 'any_url',
        color: 'any_color',
        distinctive_characteristics: 'any_characteristic',
      },
    };

    expect(() => makeSut(httpRequest)).toThrow();
  });
  
  it('should throw bad request error if no photo is provided', () => {
    const httpRequest = {
      body: {
        species: 'any_specie',
        race: 'any_race',
        age: 'any_age',
        color: 'any_color',
        distinctive_characteristics: 'any_characteristic',
      },
    };

    expect(() => makeSut(httpRequest)).toThrow();
  });

  it('should throw bad request error if no distinctive characteristic is provided', () => {
    const httpRequest = {
      body: {
        species: 'any_specie',
        race: 'any_race',
        age: 'any_age',
        photo: 'any_url',
        color: 'any_color',
        size: 'any_size',
      },
    };

    expect(() => makeSut(httpRequest)).toThrow();
  });
});
