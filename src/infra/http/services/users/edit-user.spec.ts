import { User } from '@domain/User/User';
import { inMemoryUserRepository } from '@test/repositories/in-memory-user-repository';
import { UserService } from './users.service';
import { BadRequestException } from '@nestjs/common';

describe('Edit user service', () => {
  class PhoneValidatorMock {
    execute() {
      return 'valid_phone';
    }
  }
  class CpfValidatorMock {
    execute() {
      return true;
    }
  }

  const userRepository = new inMemoryUserRepository();
  const userService = new UserService(
    userRepository,
    new PhoneValidatorMock(),
    new CpfValidatorMock(),
  );

  const makeSud = async () => {
    const newUser = new User({
      name: 'any_name',
      email: 'any_email@mail.com',
      cpf: '11111111111',
      password: 'any_password',
      phone: 'any_phone',
      age:'any_age',
      photo: 'any_photo',
      address: {
        cep: 'any_cep',
        complement: 'any_complement',
        number: 'any_number'
      },
    });

    if (!newUser.props) {
      throw new Error('Error creating new user');
    }

    const user = await userService.register(newUser.props);

    return user;
  };

  it('should throw an error if none identification is provided', async () => {
    const userId = '';
    const user = {
      name: 'any',
    };

    await makeSud();

    expect(await userService.edit(userId, user)).toEqual(
      new BadRequestException('Identificação de usuário inválida'),
    );
  });

  it('should edit existing user if identification is provided', async () => {
    const userId = 'any_name';
    const user = {
      name: 'any',
    };

    await makeSud();

    userService.edit(userId, user);

    expect(userRepository.users[0].props.name).toEqual(user.name);
  });
});
