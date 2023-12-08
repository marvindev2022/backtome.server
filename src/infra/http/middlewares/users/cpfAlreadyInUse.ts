import { MissingParamError } from '@app/errors/MissingParamError';
import { PrismaService } from '@infra/database/prisma/prisma.service';
import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class CpfAlreadyInUseMiddleware implements NestMiddleware {
  constructor(private prismaService: PrismaService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const { cpf } = req.body;

    if (!cpf) {
      const missingParam = new MissingParamError('cpf');
      throw new BadRequestException(missingParam.message);
    }

    const databaseRegister = await this.prismaService.user.findFirst({
      where: { cpf },
      select: { cpf: true },
    });

    if (databaseRegister?.cpf) {
      throw new BadRequestException('Cpf já está sendo usado');
    }

    next();
  }
}
