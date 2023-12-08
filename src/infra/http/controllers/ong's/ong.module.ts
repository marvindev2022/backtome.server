import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { OngsDatabaseModule } from '@infra/database/prisma/repositories/prisma-ong-database.module';
import { OngsService } from '@infra/http/services/Ongs/ongs.service';
import { ValidateToken } from '@infra/http/middlewares/users/validateToken';
import { OngsController } from './ongs.controller';
import { PrismaService } from '@infra/database/prisma/prisma.service';

@Module({
  imports: [OngsDatabaseModule],
  controllers: [OngsController],
  providers: [OngsService, PrismaService],
})
export class OngsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidateToken)
      .exclude({ path: '/ongs/all', method: RequestMethod.GET })
      .forRoutes(OngsController);
  }
}
