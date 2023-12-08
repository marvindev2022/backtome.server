import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from '@app/repositories/User/user';
import { User } from '@domain/User/User';
import { CpfValidator } from '@app/protocols/cpf/cpfValidator';
import { PhoneValidator } from '@app/protocols/phone/phoneValidator';
import { InvalidParamError } from '@app/errors/InvalidParamError';
import { UserLoginDTO } from '@infra/http/dtos/User/login.dto';
import { EditUserDTO } from '@infra/http/dtos/User/editUser.dto';
import { RegisterUserDTO } from '@infra/http/dtos/User/registerUser.dto';
import { ResetPasswordDTO } from '@infra/http/dtos/User/resetPassword.dto';
import { EditPasswordDTO } from '@infra/http/dtos/User/editPassword.dto';
import { EmailValidationResponseDTO } from '@infra/http/dtos/User/emailValidationResponse.dto';
import { z } from 'zod';
import { sign } from 'jsonwebtoken';
import { DeleteUserDTO } from '@infra/http/dtos/User/deleteUser.dto';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private phoneValidator: PhoneValidator,
    private cpfValidator: CpfValidator,
  ) {}

  async register(request: RegisterUserDTO): Promise<User | Error> {
    const newUser = new User(request);

    const cpfIsValid = this.cpfValidator.execute(newUser.props?.cpf as string);
    const phoneIsValid = this.phoneValidator.execute(
      newUser.props?.phone as string,
    );

    if (!cpfIsValid) return new InvalidParamError('cpf');
    if (!phoneIsValid) return new InvalidParamError('phone');

    await this.userRepository.register(newUser);
    return newUser;
  }

  async login(request: UserLoginDTO): Promise<any> {
    const requestSchema = z.object({
      email: z.string().email().min(6, { message: 'Invalid' }),
      password: z.string(),
    });

    const loginProps = requestSchema.safeParse(request);

    if (!loginProps.success) {
      throw new BadRequestException('Erro ao realizar login', {
        cause: new BadRequestException(),
        description: loginProps.error.errors[0].message,
      });
    }

    const userLoginResponse = await this.userRepository.login(loginProps.data);

    if (userLoginResponse instanceof Error) {
      throw userLoginResponse;
    }
    const user = new User(userLoginResponse.props);
    function removeSensitiveData(userLoginResponse: any) {
      const { email, cpf, phone, ...userPropsWithoutSensitiveData } =
        userLoginResponse.props;

      const userWithoutSensitiveData = {
        ...userPropsWithoutSensitiveData,
        token: sign(
          { id: userLoginResponse.id },
          process.env.JWT_SECRET as string,
        ),
      };

      delete userWithoutSensitiveData.password;

      return userWithoutSensitiveData;
    }
    return removeSensitiveData(user);
  }

  async edit(userId: string, request: EditUserDTO): Promise<void | Error> {
    if (!userId) {
      return new BadRequestException('Identificação de usuário inválida!');
    }
    if (request && Number(request.password?.length) < 6)
      throw new BadRequestException('Senha deve ter pelo menos 6 caracteres!');

    const editionGoneWrong = await this.userRepository.edit(userId, request);

    if (editionGoneWrong instanceof Error) {
      return editionGoneWrong;
    }
  }

  async findUsers(userId: string) {
    if (!userId) {
      throw new BadRequestException('Identificação de usuário inválida');
    }
    const user = await this.userRepository.findUserById(userId);
    if (!('password' in user)) {
      throw new BadRequestException('Usuário não encontrado');
    }
    return user;
  }

  async editPassword(
    userId: string,
    request: EditPasswordDTO,
  ): Promise<string> {
    if (!userId) {
      throw new BadRequestException('Identificação de usuário inválida');
    }

    const { currentPassword, newPassword } = request;

    const user = await this.userRepository.findUserById(userId);

    if (!('password' in user)) {
      throw new BadRequestException('Usuário não encontrado');
    }

    if (user.password !== currentPassword) {
      throw new BadRequestException('Senha atual incorreta');
    }
    if (Number(user.password?.length) < 6)
      throw new BadRequestException('Senha deve ter pelo menos 6 caracteres!');

    const updatedPassword = await this.userRepository.updatePassword(
      userId,
      newPassword,
    );

    if (updatedPassword) {
      return 'Senha alterada com sucesso!';
    }

    throw new BadRequestException('Erro ao alterar senha');
  }

  async resetPassword(
    userId: string,
    request: ResetPasswordDTO,
  ): Promise<string> {
    const { password } = request;

    if (!userId) {
      throw new BadRequestException('Identificação de usuário inválida!');
    }

    const user = await this.userRepository.findUserById(userId);

    if (!user) {
      throw new BadRequestException('Usuário não encontrado');
    }
    if (Number(password?.length) < 6)
      throw new BadRequestException('Senha deve ter pelo menos 6 caracteres!');

    const updatedPassword = await this.userRepository.updatePassword(
      userId,
      password,
    );

    if (updatedPassword) {
      return 'Senha alterada com sucesso!';
    }

    throw new BadRequestException('Erro ao alterar senha!');
  }

  async validateEmail(email: string): Promise<EmailValidationResponseDTO> {
    const bodySchema = z.string().email({ message: 'E-mail' });
    const sendedEmail = bodySchema.safeParse(email);

    if (!sendedEmail.success) {
      throw new InvalidParamError(sendedEmail.error.message);
    }

    const emailIsValid = await this.userRepository.findByEmail(
      sendedEmail.data,
    );

    if (emailIsValid instanceof NotFoundException) {
      return {
        isAvailable: true,
        message: 'Nenhum usuário está cadastrado com este e-mail',
      };
    }

    return {
      isAvailable: false,
      message: 'Já existe um usuário cadastrado com este e-mail',
    };
  }
  async deleteUser(request: DeleteUserDTO, id: string): Promise<void> {
    const user = await this.userRepository.findUserById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.userRepository.deleteUser(request, id);
  }
}
