import { User } from '@domain/User/User';
import { DeleteUserDTO } from '@infra/http/dtos/User/deleteUser.dto';
import { EditUserDTO } from '@infra/http/dtos/User/editUser.dto';
import { FindedUserDTO } from '@infra/http/dtos/User/findedUser.dto';
import { UserLoginDTO } from '@infra/http/dtos/User/login.dto';
import { NotFoundException } from '@nestjs/common';


export abstract class UserRepository {
  abstract register(user: User): Promise<string>;

  abstract login(account: UserLoginDTO): Promise<any | Error>;

  abstract edit(
    userId: string,
    account: EditUserDTO,
    photoFile?: Express.Multer.File,
  ): Promise<void | Error>;

  abstract findUserById(userId: string): Promise<User>;

  abstract saveImage(id:string,photoUrl:string): Promise<any>;
  
  abstract saveFile(id:string,fileUrl:string): Promise<any>;

  abstract updatePassword(
    userId: string,
    newPassword: string,
  ): Promise<User | boolean | Error>;

  abstract findByEmail(
    email: string,
  ): Promise<FindedUserDTO | NotFoundException>;

  abstract deleteUser(request: DeleteUserDTO, id: string): Promise<void>;
}
