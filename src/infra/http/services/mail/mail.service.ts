import { recoveryPasswordTemplate } from '@app/email-templates/recovery-password-template';
import { PasswordRecoveryMailDTO } from '@infra/http/dtos/User/passwordRecovery.dto';
import { MailerService } from '@nestjs-modules/mailer';
import {
  OnQueueActive,
  OnQueueCompleted,
  OnQueueError,
  Process,
  Processor,
} from '@nestjs/bull';
import { Job } from 'bull';
import env from './../../../../env';

@Processor('mail')
export class MailProcessorService {
  constructor(private mailService: MailerService) {}
  @Process('mail-job')
  sendMailJob(job: Job<PasswordRecoveryMailDTO>) {
    this.mailService.sendMail({
      from: env.MAILER_SENDER,
      to: job.data.email,
      subject: 'Redefinição de senha',
      date: new Date(),
      html: recoveryPasswordTemplate(job.data.recoveryLink),
    });
  }

  @OnQueueActive()
  logEmailBeeingSent() {
    return 'O E-mail está sendo enviado';
  }

  @OnQueueCompleted()
  logEmailSended() {
    return 'O E-mail foi enviado!';
  }
}
