import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { PrismaService } from '@infra/database/prisma/prisma.service';
import { ValidateToken } from '@infra/http/middlewares/users/validateToken';
import { MessageService } from '@infra/http/services/message/message.service';
import { FirebaseMessagesModule } from '@infra/database/prisma/repositories/prisma-message-database.module';
import { MessagesController } from '@infra/http/controllers/message/message.controller';
import { SocketModule } from '@infra/Socket/socket.module';
@Module({
  imports: [FirebaseMessagesModule,SocketModule],
  controllers: [MessagesController],
  providers: [MessageService, PrismaService],
})
export class MessagesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidateToken)
      .forRoutes(
        { path: '/message/*', method: RequestMethod.POST },
        { path: '/message/*', method: RequestMethod.PUT },
        { path: '/message/*', method: RequestMethod.GET },
        { path: '/message/*', method: RequestMethod.DELETE },
      );
  }
}
