import { InvalidParamError } from '@app/errors/InvalidParamError';
import { MissingParamError } from '@app/errors/MissingParamError';
import { z } from 'zod';

interface ReportProps {
  reportingUserId: string;
  reportedUserId: string;
  messageId: string;
  reason: string;
}

interface NewReport {
  body: ReportProps;
  statusCode: number;
}

interface IsValidMethodReturn {
  isValid: boolean;
  body: any;
  statusCode: number;
}

export class Report {
  props: ReportProps;

  constructor(props: ReportProps) {
    const newreport = this.handle(props);

    if (newreport.statusCode >= 300) {
      throw newreport.body;
    }

    this.props = newreport.body;
  }

  private handle(props: ReportProps): NewReport {
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

  private isValid(params: ReportProps): IsValidMethodReturn {
    const reportSchema = z.object({
      reportingUserId: z.string().min(3, { message: 'Invalid' }),
      reportedUserId: z.string().min(9, { message: 'Invalid' }),
      messageId: z.string().min(3, { message: 'Invalid' }),
      reason: z.string().min(3, { message: 'Invalid' }),
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
