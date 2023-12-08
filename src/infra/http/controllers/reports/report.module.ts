import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { PrismaService } from '@infra/database/prisma/prisma.service';
import { ReportsController } from './reports.controller';
import { ReportService } from '@infra/http/services/reports/reports.service';
import { ReportsDatabaseModule } from '@infra/database/prisma/repositories/prisma-report-database.module';
import { ValidateToken } from '@infra/http/middlewares/users/validateToken';

@Module({
  imports: [ReportsDatabaseModule],
  controllers: [ReportsController],
  providers: [ReportService, PrismaService],
})
export class ReportsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
     .apply(ValidateToken)
      .forRoutes(
        { path: '/reports/*', method: RequestMethod.POST },
        { path: '/reports/*', method: RequestMethod.GET },
        { path: '/reports/*', method: RequestMethod.DELETE },
      );
  }
}
