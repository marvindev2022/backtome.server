import { InvalidParamError } from '@app/errors/InvalidParamError';
import { MissingParamError } from '@app/errors/MissingParamError';
import { z } from 'zod';

export interface MessageProps {
  title: string;
  content: string;
  senderId: string;
  receiverId: string;
}

interface NewMessage {
  body: MessageProps;
  createdAt: Date;
  statusCode: number;
}

interface IsValidMethodReturn {
  isValid: boolean;
  body: any;
  statusCode: number;
}

export class Message {
  props: MessageProps;

  constructor(props: MessageProps) {
    const newMessage = this.handle(props);

    if (newMessage.statusCode >= 300) {
      throw newMessage.body;
    }

    this.props = newMessage.body;
  }

  private handle(props: MessageProps): NewMessage {
    const { isValid, body, statusCode } = this.isValid(props);

    if (!isValid) {
      return {
        body: body,
        createdAt: new Date(),
        statusCode: statusCode,
      };
    }

    return {
      body: props,
      createdAt: new Date(),
      statusCode: 200,
    };
  }

  private isValid(params: MessageProps): IsValidMethodReturn {
    const messageSchema = z.object({
      title: z.string().min(3, { message: 'Invalid' }),
      content: z.string().min(1, { message: 'Invalid' }),
      senderId: z.string().min(3, { message: 'Invalid' }),
      receiverId: z.string().min(3, { message: 'Invalid' }),
    });

    const messageIsValid = messageSchema.safeParse(params);

    if (!messageIsValid.success) {
      const errorPath = messageIsValid.error.errors[0].path[0].toString();
      const errorMessage = messageIsValid.error.errors[0].message;
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
