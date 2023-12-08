import { Message } from '@domain/message/Message';

export abstract class MessageRepository {
  abstract register(message: Message): Promise<string>;

  abstract findMessageById(id: string): Promise<any>;
  
  abstract findMessageByUserId(id: string): Promise<any>;

}
