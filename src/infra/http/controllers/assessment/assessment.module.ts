import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { PrismaService } from '@infra/database/prisma/prisma.service';
import { ValidateToken } from '@infra/http/middlewares/users/validateToken';
import { AssessmentController } from './assesment.controller';
import { AssessmentsDatabaseModule } from '@infra/database/prisma/repositories/prisma-assessment-database.module';
import { AssessmentService } from '@infra/http/services/assessment/assessment.service';

@Module({
  imports: [AssessmentsDatabaseModule],
  controllers: [AssessmentController],
  providers: [AssessmentService, PrismaService],
})
export class AssessmentsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
     .apply(ValidateToken)
      .forRoutes(
        { path: '/testmonial/*', method: RequestMethod.POST },
        { path: '/testmonial/*', method: RequestMethod.GET },
      );
  }
}
