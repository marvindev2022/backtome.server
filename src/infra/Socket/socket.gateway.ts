import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SocketService } from './socket.service';
import { MessageProps } from '@domain/message/Message';

@WebSocketGateway()
export class SocketGateway implements OnGatewayInit {
  @WebSocketServer()
  server!: Server<any>;

  constructor(private socketService: SocketService) {}

  afterInit(server: Server) {
    this.socketService.initialize(server);
  }

  @SubscribeMessage('newMessage')
  handleNewMessage(socket: Socket, message: MessageProps) {
    this.socketService.emitNewMessage(message);
  }
}
