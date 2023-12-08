import { MessageRepository } from '@app/repositories/Message/message';
import { Message } from '@domain/message/Message';
import {  NotFoundException } from '@nestjs/common';

export class InMemoryMessageRepository implements MessageRepository {
  public message: Message[] = [];

  async register(message: Message): Promise<string> {
    this.message.push(message);

    return 'valid_id';
  }

  async findMessageByUserId(userId: string): Promise<Message> {
    const message = this.message.find((message) => message.props.senderId === userId);

    if (!message) {
      throw new NotFoundException('Message not found');
    }

    return message;
  }
  async findMessageById(messageId: string): Promise<Message> {
    const message = this.message.find((message) => message.props.senderId === messageId);

    if (!message) {
      throw new NotFoundException('Message not found');
    }

    return message;
  }

}
