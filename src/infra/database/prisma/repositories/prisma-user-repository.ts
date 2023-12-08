import { sign } from 'jsonwebtoken';
import { UploadedFile } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User } from '@domain/User/User';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from '@app/repositories/User/user';
import { UserLoginDTO } from '@infra/http/dtos/User/login.dto';
import { compareToEncrypted } from '@app/protocols/crypto/compare/compareToEncrypted';
import { EditUserDTO } from '@infra/http/dtos/User/editUser.dto';

import { FindedUserDTO } from '@infra/http/dtos/User/findedUser.dto';

import { makeHash } from '@app/protocols/crypto/hash/makeHash';
import { DeleteUserDTO } from '@infra/http/dtos/User/deleteUser.dto';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prismaService: PrismaService) {}

  async register(user: User): Promise<string> {
    if (user instanceof Error) {
      throw new BadRequestException(user.message, {
        cause: user,
        description: user.stack,
      });
    }

    const { address, ...userProps } = user.props;

    const { id } = await this.prismaService.user.create({
      data: {
        ...userProps,
      },
      select: {
        id: true,
      },
    });

    if (address?.cep && address.complement) {
      await this.prismaService.address.create({
        data: {
          ...address,
          id,
        },
      });
    }

    return id;
  }

  async login(account: UserLoginDTO): Promise<any | Error> {
    const databaseStored = await this.prismaService.user.findUnique({
      where: { email: account.email },
    });
    if (databaseStored?.email && !databaseStored?.active)
      throw new BadRequestException('Conta está desativada!');
    if (
      !databaseStored?.password ||
      !compareToEncrypted({
        receivedString: account.password,
        encryptedString: databaseStored.password,
      })
    ) {
      return new BadRequestException('Email ou senha estão incorretos');
    }
    const { ...user } = new User(databaseStored);
    return {
      password: '',
      token: sign({ id: databaseStored.id }, process.env.JWT_SECRET as string),
      ...user,
    };
  }

  async edit(userId: string, account: EditUserDTO): Promise<any | Error> {
    if (!userId) {
      throw new BadRequestException('Identificação inválida');
    }

    const updatedUser = await this.prismaService.user.update({
      data: {
        name: account.name,
        email: account.email,
        password: makeHash(account.password as string),
        phone: account.phone,
        age: account.age,
        cpf: account.cpf,
      },
      where: {
        id: userId,
      },
    });

    const addressExist = await this.prismaService.address.findFirst({
      where: {
        userId: userId,
      },
    });

    if (addressExist && account.address) {
      await this.prismaService.address.update({
        data: {
          cep: account.address.cep,
          complement: account.address.complement,
          number: account.address.number,
        },
        where: {
          userId,
        },
      });
    }
    if (!addressExist && account.address) {
      await this.prismaService.address.create({
        data: {
          cep: account?.address.cep,
          complement: account?.address.complement,
          number: account?.address.number,
          userId,
        },
      });
    }

    return updatedUser;
  }

  async saveImage(id: string, photoUrl: string): Promise<any> {
    const updatedUser = await this.prismaService.user.update({
      where: { id },
      data: {
        photo: photoUrl,
      },
    });

    return updatedUser;
  }
  async saveFile(id: string, fileUrl: string): Promise<any> {
    const updatedUser = await this.prismaService.user.update({
      where: { id },
      data: {
        doc: fileUrl,
        isVerified: true
      },
    });

    return updatedUser;
  }
  async findUserById(id: string): Promise<any> {
    const user = await this.prismaService.user.findFirst({
      where: { id },
    });

    if (!user) throw new BadRequestException('Usuário não encontrado');
    const address = await this.prismaService.address.findFirst({
      where: { userId: id },
    });
    return { ...user, address };
  }

  async deleteUser(request: DeleteUserDTO, id: string): Promise<void> {
    const user = await this.prismaService.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new Error('Usuário não encontrado');
    }
    await this.prismaService.user.update({
      where: { id },
      data: {
        active: false,
        motivoDesativacao: request.motivoDesativacao,
      },
    });
  }
  async updatePassword(id: string, newPassword: string): Promise<boolean> {
    const encryptedPassword = makeHash(newPassword);

    const userUpdated = await this.prismaService.user.update({
      where: { id },
      data: { password: encryptedPassword },
    });

    if (!userUpdated) return false;
    return true;
  }

  async findByEmail(email: string): Promise<FindedUserDTO | NotFoundException> {
    const databaseResponse = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (!databaseResponse || Object.values(databaseResponse).length < 1) {
      return new NotFoundException('Nenhum usuário encontrado');
    }

    return databaseResponse;
  }
}
