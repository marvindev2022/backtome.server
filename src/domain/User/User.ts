import {
  BadRequestException
} from '@nestjs/common'
import { InvalidParamError } from '@app/errors/InvalidParamError';
import { MissingParamError } from '@app/errors/MissingParamError';
import { makeHash } from '@app/protocols/crypto/hash/makeHash';
import { Address } from '@domain/Address/Addres';
import { z } from 'zod';

interface UserCreationProps {
  name: string;
  email: string;
  cpf: string;
  phone: string;
  password: string;
}

interface UserProps extends UserCreationProps {
  
  address?: {
    cep: string;
    complement?: string;
    number?:string
  };
}

interface NewUser {
  body: UserCreationProps;
  statusCode: number;
}

interface IsValidMethodReturn {
  isValid: boolean;
  body: any;
  statusCode: number;
}

export class User {
  props: UserProps;
  private address?: Address;

  constructor(props: UserProps) {
    const { address, ...userProps } = props;

    const newUser = this.handle(userProps);

    if (address) {
      this.address = new Address(address);
    }

    if (newUser.statusCode >= 300) {
      throw newUser.body;
    }
    this.props = {
      ...newUser.body,
      password: makeHash(newUser.body.password),
      address: this.address && this.address.props,
    };
  }

  private handle(props: UserCreationProps): NewUser {
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

  private isValid(params: UserCreationProps): IsValidMethodReturn {
    const userSchema = z.object({
      name: z.string().min(3, { message: 'Invalid' }),
      email: z.string().email().min(6, { message: 'Invalid' }),
      phone: z.string().min(9, { message: 'Invalid' }),
      cpf: z.string().length(11, { message: 'Invalid' }),
      password: z.string().min(6, { message: 'Invalid' }),
    });
    const userIsValid = userSchema.safeParse(params);
    if (!userIsValid.success) {
      const errorPath = userIsValid.error.errors[0].path[0].toString();
      const errorMessage = userIsValid.error.errors[0].message;
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
