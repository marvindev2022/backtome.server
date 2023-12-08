import { RegisterLostAnimalDTO } from '@infra/http/dtos/LostAnimal/registerLostAnimal.dto';
import { LostAnimalService } from '@infra/http/services/animals/LostAnimals/lost-animals.service';
import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('lost-animals')
export class LostAnimalsController {
  constructor(private lostAnimalsSerivce: LostAnimalService) {}

  @Post('registered')
  async register(@Body() registerLostAnimalDTO: RegisterLostAnimalDTO ) {
    return (await this.lostAnimalsSerivce.register(registerLostAnimalDTO)).props;
  }

  @Get('find')
  async find() {
    const lostAnimalsList = await this.lostAnimalsSerivce.find();

    if (lostAnimalsList instanceof Error) throw lostAnimalsList;

    return lostAnimalsList.map((lostAnimals) => ({
      ...lostAnimals,
    }));
  }
}
