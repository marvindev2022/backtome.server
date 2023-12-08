import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import env from './../../env';

@Module({
  imports: [
    BullModule.forRootAsync({
      useFactory: () => ({
        redis: {
          host: env.QUEUE_HOST,
          port: Number(env.QUEUE_PORT),
          username: env.QUEUE_USER,
          password: env.QUEUE_PASSWORD,
          tls: {
            rejectUnauthorized: true,
          },
        },
      }),
    }),
  ],
})
export class BullConfigModule {}
