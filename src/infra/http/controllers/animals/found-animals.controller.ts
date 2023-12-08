import { RegisterFoundAnimalDTO } from '@infra/http/dtos/FoundAnimal/registerFoundAnimal.dto';
import { FoundAnimalService } from '@infra/http/services/animals/FoundAnimals/found-animals.service';
import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('animals-found')
export class FoundAnimalsController {
  constructor(private foundAnimalSerivce: FoundAnimalService) {}

  @Post('registered')
  async register(@Body() registerFoundAnimalDTO: RegisterFoundAnimalDTO) {
    return await this.foundAnimalSerivce.register(registerFoundAnimalDTO);
  }

  @Get('find')
  async find() {
    const foundAnimalsList = await this.foundAnimalSerivce.find();

    if (foundAnimalsList instanceof Error) throw foundAnimalsList;

    return foundAnimalsList.map((foundAnimals) => ({
      ...foundAnimals,
    }));
  }
}
