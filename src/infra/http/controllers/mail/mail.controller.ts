import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
} from '@nestjs/common';
import { PasswordRecoveryDTO } from '@infra/http/dtos/User/passwordRecovery.dto';
import { InvalidParamError } from '@app/errors/InvalidParamError';
import { MissingParamError } from '@app/errors/MissingParamError';
import { UserRepository } from '@app/repositories/User/user';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import env from './../../../../env';
import { z } from 'zod';

@Controller()
export class MailController {
  constructor(
    private userRepository: UserRepository,
    @InjectQueue('mail') private emailQueue: Queue,
  ) {}

  @Post('users/recovery-password')
  @HttpCode(204)
  async sendMail(
    @Body() PasswordRecoveryDto: PasswordRecoveryDTO,
  ): Promise<void> {
    const bodySchema = z.object({
      email: z.string().email({ message: 'E-mail' }),
      cpf: z.string(),
    });

    const requestBody = bodySchema.safeParse(PasswordRecoveryDto);

    if (!requestBody.success) {
      if (requestBody.error.message === 'E-mail') {
        throw new InvalidParamError('E-mail');
      }

      throw new MissingParamError(`${requestBody.error.errors[0].path[0]}`);
    }

    const user = await this.userRepository.findByEmail(requestBody.data.email);

    if (user instanceof Error) {
      throw user;
    }

    if (user.cpf !== requestBody.data.cpf) {
      throw new BadRequestException(
        'Requisição inválida, confira os dados fornecidos',
      );
    }
    const recoveryLink = `${env.FRONTEND_URL}/${user.id}`;
    this.emailQueue.add('mail-job', {
      email: requestBody.data.email,
      recoveryLink,
    });
  }
}
