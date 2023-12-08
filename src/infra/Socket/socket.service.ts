import { MessageProps } from '@domain/message/Message';
import { Injectable } from '@nestjs/common';
import { Server } from 'socket.io';

@Injectable()
export class SocketService {
  private io!: Server<any>;

  initialize(server: Server) {
    this.io = server;
  }

  emitNewMessage(message: MessageProps) {
    this.io.emit('newMessage', message);
  }
}
