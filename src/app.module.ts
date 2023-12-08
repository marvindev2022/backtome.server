import { Module } from '@nestjs/common';
import { DatabaseModule } from '@infra/database/database.module';
import { HttpModule } from '@infra/http/http.module';
import { ConfigModule } from '@nestjs/config';
import { BullConfigModule } from './infra/config/bull.module';
import { MailerConfigModule } from './infra/config/mailer.module';
import { MessageController } from 'src/app.controler';
import { MulterModule } from '@nestjs/platform-express';
import { SocketModule } from '@infra/Socket/socket.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    BullConfigModule,
    MailerConfigModule,
    HttpModule,
    DatabaseModule,
    SocketModule,
    MulterModule.register({
      dest: 'uploads/',
    }),
  ],
  controllers: [MessageController],
  providers: [],
})
export class AppModule {}
