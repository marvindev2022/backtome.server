import { ReportRepository } from '@app/repositories/Reports/report';
import { Report } from '@domain/Reports/Reports';
import {  NotFoundException } from '@nestjs/common';

export class InMemoryReportRepository implements ReportRepository {
  public reports: Report[] = [];

  async register(report: Report): Promise<string> {
    this.reports.push(report);

    return 'valid_id';
  }

  async findReportById(reportId: string): Promise<Report> {
    const report = this.reports.find((report) => report.props.messageId === reportId);

    if (!report) {
      throw new NotFoundException('Report not found');
    }

    return report;
  }

  async deleteReport(reportId: string, reportingUserId: string): Promise<void> {
    const reportIndex = this.reports.findIndex(
      (report) => report.props.messageId === reportId && report.props.reportingUserId === reportingUserId,
    );

    if (reportIndex < 0) {
      throw new NotFoundException('Report not found');
    }

    this.reports.splice(reportIndex, 1);
  }
}
