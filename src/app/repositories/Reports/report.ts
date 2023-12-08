import { Report } from '@domain/Reports/Reports';

export abstract class ReportRepository {
  abstract register(report: Report): Promise<string>;

  abstract findReportById(reportId: string): Promise<Report>;

  abstract deleteReport(reportId: string,reportingUserId:string): Promise<void>
}
