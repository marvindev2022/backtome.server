import { ReportRepository } from '@app/repositories/Reports/report';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Report, } from '@domain/Reports/Reports';

@Injectable()
export class ReportService {
  constructor(private reportRepository: ReportRepository) {}

  async createReport(report: any): Promise<string> {
    

    const newReport = new Report(report);

    const reportId = await this.reportRepository.register(newReport); 

    return reportId;
  }

  async findReportById(ReportId: string) {
    if (!ReportId) {
      throw new BadRequestException('Identificação de usuário inválida');
    }
    const Report = await this.reportRepository.findReportById(ReportId);
    if (!('password' in Report)) {
      throw new BadRequestException('Usuário não encontrado');
    }
    return Report;
  }

  async deleteReport(reportId: string, reportingUserId: string): Promise<void> {
    const Report = await this.reportRepository.findReportById(reportId);

    if (!Report) {
      throw new NotFoundException('Report not found');
    }

    await this.reportRepository.deleteReport(reportId, reportingUserId);
  }
}
