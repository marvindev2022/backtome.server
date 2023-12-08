import { Module } from '@nestjs/common';
import { FirebaseMessagesRepository } from './prisma-message-repository';
import { MessageRepository } from '@app/repositories/Message/message';
import { SocketModule } from '@infra/Socket/socket.module';

@Module({
  imports: [
    SocketModule, 
  ],
  providers: [
    { provide: MessageRepository, useClass: FirebaseMessagesRepository },
  ],
  exports: [{ provide: MessageRepository, useClass: FirebaseMessagesRepository }],
})
export class FirebaseMessagesModule {}
