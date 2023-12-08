import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PrismaAssessmentRepository } from './prisma-assessment-repository';
import { AssessmentRepository } from '@app/repositories/Assessment/Assessment';

@Module({
  providers: [
    PrismaService,
    { provide: AssessmentRepository, useClass: PrismaAssessmentRepository },
  ],
  exports: [{ provide: AssessmentRepository, useClass: PrismaAssessmentRepository }],
})
export class AssessmentsDatabaseModule {}
