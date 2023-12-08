import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PrismaReportRepository } from './prisma-report-repository';
import { ReportRepository } from '@app/repositories/Reports/report';

@Module({
  providers: [
    PrismaService,
    { provide: ReportRepository, useClass: PrismaReportRepository },
  ],
  exports: [{ provide: ReportRepository, useClass: PrismaReportRepository }],
})
export class ReportsDatabaseModule {}
