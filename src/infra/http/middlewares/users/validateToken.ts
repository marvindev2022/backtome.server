import { InvalidParamError } from '@app/errors/InvalidParamError';
import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import env from './../../../../env';

@Injectable()
export class ValidateToken implements NestMiddleware {
  constructor() {}
  async use(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    if (!authorization) {
      throw new UnauthorizedException('Autorização inválida');
    }

    const token = authorization.split(' ')[1];
    if (!token) {
      throw new InvalidParamError('Token');
    }

    if (!verify(token, env.JWT_SECRET)) {
      throw new UnauthorizedException(
        'Você não tem permissão de acessar este recurso',
      );
    }

    next();
  }
}
