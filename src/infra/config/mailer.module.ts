import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import env from './../../env';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: () => ({
        defaults: {
          From: env.MAILER_SENDER,
        },
        transport: {
          host: env.MAILER_HOST,
          port: Number(env.MAILER_PORT),
          auth: {
            user: env.MAILER_USER,
            pass: env.MAILER_PASS,
          },
          tls: {
            rejectUnauthorized: false,
          },
        },
      }),
    }),
  ],
})
export class MailerConfigModule {}
