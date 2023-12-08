import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Report } from '@domain/Reports/Reports';
import { ReportRepository } from '@app/repositories/Reports/report';

@Injectable()
export class PrismaReportRepository implements ReportRepository {
  constructor(private prismaService: PrismaService) {}

  async register(report: Report): Promise<string> {
    try {
      const { reportingUserId, reportedUserId, messageId, reason, } = report.props;

      await this.prismaService.report.create({
        data: {

          reportingUserId: reportingUserId as string,
          reportedUserId: reportedUserId as string,
          firebaseMessageId: messageId as string,
          reason: reason as string,
        },
        select: {
          id: true,
        },
      });

      return "Registramos sua denúncia";
    } catch (error) {
      throw new Error('Erro ao registrar o relatório');
    }
  }

  async findReportById(id: string): Promise<any | Error> {
    try {
      const report = await this.prismaService.report.findFirst({
        where: { id },
      });

      if (!report) throw new BadRequestException('Relatório não encontrado');

      return { ...report };
    } catch (error) {
      throw new Error('Erro ao buscar o relatório');
    }
  }

  async deleteReport(reportId: string, reportingUserId: string): Promise<void> {
    try {
      const report = await this.prismaService.report.findUnique({
        where: { id: reportId },
      });

      if (!report) {
        throw new Error('Relatório não encontrado');
      }
        if(report.reportingUserId === reportingUserId){
      await this.prismaService.report.delete({
        where: { id: reportId },
      })}else{
        throw new BadRequestException("Erro ao deletar")
      };
    } catch (error) {
      throw new Error('Erro ao excluir o relatório');
    }
  }
}
