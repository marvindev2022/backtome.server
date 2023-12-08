import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { MailProcessorService } from '@infra/http/services/mail/mail.service';
import { MailController } from './mail.controller';
import { UsersDatabaseModule } from '@infra/database/prisma/repositories/prisma-user-database.module';

@Module({
  imports: [
    BullModule.registerQueueAsync({
      name: 'mail',
    }),
    UsersDatabaseModule,
  ],
  controllers: [MailController],
  providers: [MailProcessorService],
})
export class MailQueueModule {}
