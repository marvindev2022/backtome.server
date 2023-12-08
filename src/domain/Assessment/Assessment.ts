import { InvalidParamError } from '@app/errors/InvalidParamError';
import { MissingParamError } from '@app/errors/MissingParamError';
import { z } from 'zod';

interface AssessmentProps {
  assessment: string;
  testimony: string;
  userId: string;
}

interface NewAssessment {
  body: AssessmentProps;
  statusCode: number;
}

interface IsValidMethodReturn {
  isValid: boolean;
  body: any;
  statusCode: number;
}

export class Assessment {
  props: AssessmentProps;

  constructor(props: AssessmentProps) {
    const newAssessment = this.handle(props);

    if (newAssessment.statusCode >= 300) {
      throw newAssessment.body;
    }

    this.props = newAssessment.body;
  }

  private handle(props: AssessmentProps): NewAssessment {
    const { isValid, body, statusCode } = this.isValid(props);

    if (!isValid) {
      return {
        body: body,
        statusCode: statusCode,
      };
    }

    return {
      body: props,
      statusCode: 200,
    };
  }

  private isValid(params: AssessmentProps): IsValidMethodReturn {
    const reportSchema = z.object({
      assessment: z.string().min(1, { message: 'Invalid' }),
      testimony: z.string().min(3, { message: 'Invalid' }),
      userId: z.string().min(3, { message: 'Invalid' }),
    });

    const reportIsValid = reportSchema.safeParse(params);

    if (!reportIsValid.success) {
      const errorPath = reportIsValid.error.errors[0].path[0].toString();
      const errorMessage = reportIsValid.error.errors[0].message;
      const errorBody =
        errorMessage === 'Invalid'
          ? new InvalidParamError(errorPath)
          : new MissingParamError(errorPath);

      return {
        isValid: false,
        body: errorBody,
        statusCode: 400,
      };
    }

    return {
      isValid: true,
      body: null,
      statusCode: 200,
    };
  }
}
