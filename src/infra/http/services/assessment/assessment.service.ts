import { AssessmentRepository } from '@app/repositories/Assessment/Assessment';
import {
  Injectable,
} from '@nestjs/common';
import { Assessment, } from '@domain/Assessment/Assessment';

@Injectable()
export class AssessmentService {
  constructor(private assessmentRepository: AssessmentRepository) {}

  async createAssessment(assessment: any): Promise<string> {
    

    const newReport = new Assessment(assessment);

    const reportId = await this.assessmentRepository.register(newReport); 

    return reportId;
  }

  async findAssessmentAll() {
  
    const assessment = await this.assessmentRepository.findAssessmentAll();
   
    return assessment;
  }

  
}
