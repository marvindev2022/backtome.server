import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Param,
  Post,
  Put,
  Patch,
  Get,
  Delete,
  UseInterceptors,
  UploadedFile
} from '@nestjs/common';
import { RegisterUserDTO } from '@infra/http/dtos/User/registerUser.dto';
import { UserService } from '@infra/http/services/users/users.service';
import { UserLoginDTO } from '@infra/http/dtos/User/login.dto';
import { EditUserDTO } from '@infra/http/dtos/User/editUser.dto';
import { EditPasswordDTO } from '@infra/http/dtos/User/editPassword.dto';
import { MissingParamError } from '@app/errors/MissingParamError';
import { ResetPasswordDTO } from '@infra/http/dtos/User/resetPassword.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { DeleteUserDTO } from '@infra/http/dtos/User/deleteUser.dto';


@Controller('users')
export class UsersController {
  constructor(private userService: UserService) {}

  @Post('registered')
  async register(@Body() registerUserDTO: RegisterUserDTO) {
    const id = await this.userService.register(registerUserDTO);

    if (id instanceof Error) throw new BadRequestException(id.message);

    return { message: 'Usuário cadastrado com sucesso!' };
  }

  @Post('login')
  async login(@Body() userLoginDTO: UserLoginDTO) {
    const userData = await this.userService.login(userLoginDTO);

    return userData;
  }

  @Post('validate/email')
  async validateEmail(@Body() { email }: { email: string }) {
    if (!email) {
      throw new MissingParamError('email');
    }

    const emailIsAvailable = await this.userService.validateEmail(email);

    return emailIsAvailable;
  }

  @Get(':id/find')
  async findUserById(@Param('id') id:string){
  const user = await this.userService.findUsers(id)
  return user
}
  @Patch(':id/delete')
  async deleteUserById(@Body() request:DeleteUserDTO, @Param('id') id:string){
   await this.userService.deleteUser(request,id)
  return "Usuario deletado!"
}

@Put(':id')
@UseInterceptors(FileInterceptor('photo'))
async edit(@Param('id') id: string, @Body() editUserDTO: EditUserDTO, @UploadedFile() photoFile: Express.Multer.File) {
  if (photoFile) {
    const imagePath = `uploads/${photoFile.filename}`;
    editUserDTO.photo = imagePath;
  }

  await this.userService.edit(id, editUserDTO);

  return 'Dados editados com sucesso!';
}

  @Patch(':id/password')
  async editPassword(
    @Param('id') id: string,
    @Body() request: EditPasswordDTO,
  ): Promise<string | void> {
    await this.userService.editPassword(id, request);
  }

  @Patch(':id/change-password')
  @HttpCode(201)
  async resetPassword(
    @Param('id') id: string,
    @Body() request: ResetPasswordDTO,
  ): Promise<string | Error> {
    const resetedPassword = await this.userService.resetPassword(id, request);
    return resetedPassword;
  }
}
