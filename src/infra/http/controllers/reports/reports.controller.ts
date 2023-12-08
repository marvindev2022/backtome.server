import { ReportService } from '@infra/http/services/reports/reports.service';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportService: ReportService) {}

  @Post('denunce')
  async createReport(@Body() report: any) {
    return this.reportService.createReport(report);
  }


  @Get(':id/find')
  async findReportById(@Param('id') id: string) {
    return this.reportService.findReportById(id);
  }


  @Delete(':id/delete')
  async deleteReport(@Param('reportId') reportId: string,@Param('reportingUserId')reportingUserId: string) {
    return this.reportService.deleteReport(reportId,reportingUserId);
  }
}
