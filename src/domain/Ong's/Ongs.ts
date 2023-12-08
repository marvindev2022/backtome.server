import { InvalidParamError } from '@app/errors/InvalidParamError';
import { MissingParamError } from '@app/errors/MissingParamError';
import { z } from 'zod';

export interface OngProps {
  name: string;
  address: string;
  contact: string;
  website?: string;
  description?: string;
  logo?: string;
}

interface NewOng {
  body: OngProps;
  statusCode: number;
}

interface IsValidMethodReturn {
  isValid: boolean;
  body: any;
  statusCode: number;
}

export class Ong {
  props: OngProps;

  constructor(props: OngProps) {
    const newOng = this.handle(props);

    if (newOng.statusCode >= 300) {
      throw newOng.body;
    }

    this.props = newOng.body;
  }

  private handle(props: OngProps): NewOng {
    const { isValid, body, statusCode } = this.isValid(props);

    if (!isValid) {
      return {
        body: body,
        statusCode: statusCode,
      };
    }

    return {
      body: props,
      statusCode: 200,
    };
  }

  private isValid(params: OngProps): IsValidMethodReturn {
    const ongSchema = z.object({
      name: z.string().min(3, { message: 'Invalid' }),
      address: z.string().min(3, { message: 'Invalid' }),
      contact: z.string().min(9, { message: 'Invalid' }),
    });

    const ongIsValid = ongSchema.safeParse(params);

    if (!ongIsValid.success) {
      const errorPath = ongIsValid.error.errors[0].path[0].toString();
      const errorMessage = ongIsValid.error.errors[0].message;
      const errorBody =
        errorMessage === 'Invalid'
          ? new InvalidParamError(errorPath)
          : new MissingParamError(errorPath);

      return {
        isValid: false,
        body: errorBody,
        statusCode: 400,
      };
    }

    return {
      isValid: true,
      body: null,
      statusCode: 200,
    };
  }
}
