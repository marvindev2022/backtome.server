import { AssessmentService } from '@infra/http/services/assessment/assessment.service';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

@Controller('testimonial')
export class AssessmentController {
  constructor(private readonly assessmentService: AssessmentService) {}

  @Post('register')
  async createAssessment(@Body() testimonial: any) {
    return this.assessmentService.createAssessment(testimonial);
  }


  @Get('all')
  async findAsessmentAll() {
    return this.assessmentService.findAssessmentAll();
  }


 
}
