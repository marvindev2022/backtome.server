import { Assessment } from '@domain/Assessment/Assessment';

export abstract class AssessmentRepository {
  abstract register(assessment: Assessment): Promise<string>;

  abstract findAssessmentAll(): Promise<Assessment[]>;

}
