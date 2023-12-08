import { InvalidParamError } from '@app/errors/InvalidParamError';
import { MissingParamError } from '@app/errors/MissingParamError';
import { z } from 'zod';

export type AnimalProps = any;

interface NewAnimal {
  body: AnimalProps | Error;
  statusCode: number;
}

export class Animal {
  props?: AnimalProps;
  protected propsValidationSchema: z.ZodObject<any>;

  constructor(propsValidationSchema: z.ZodObject<any>) {
    this.propsValidationSchema = propsValidationSchema;
  }

  handle(httpRequest: AnimalProps): NewAnimal {
    const body = this.propsValidationSchema.safeParse(httpRequest);

    if (!body.success) {
      const errorPath = body.error.errors[0].path[0].toLocaleString();

      throw new MissingParamError(errorPath);
    }

    if (!this.ageValidator(httpRequest.age)) {
      throw new InvalidParamError(httpRequest.age);
    }

    return {
      body: body.data,
      statusCode: 200,
    };
  }

  ageValidator(age: string): boolean {
    const validAges = ['Filhote', 'Adulto', 'Idoso'];

    if (!validAges.includes(age)) {
      return false;
    }

    return true;
  }
}
