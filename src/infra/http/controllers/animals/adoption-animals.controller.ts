import { RegisterAdoptionAnimalDTO } from '@infra/http/dtos/AdoptionAnimal/registerAdoptionAnimal.dto';
import { AdoptionAnimalsService } from '@infra/http/services/animals/AdoptionAnimals/adoption-animals.service';
import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('animals-adoption')
export class AdoptionAnimalsController {
  constructor(private adoptionAnimalSerivce: AdoptionAnimalsService) {}

  @Post('registered')
  async register(@Body() registerAdoptionAnimalDTO: RegisterAdoptionAnimalDTO) {
    return this.adoptionAnimalSerivce.register(registerAdoptionAnimalDTO);
  }

  @Get('find')
  async find() {
    const adoptionList = await this.adoptionAnimalSerivce.list();

    if (adoptionList instanceof Error) throw adoptionList;

    return adoptionList.map((adoptionAnimal) => ({
      ...adoptionAnimal,
    }));
  }
}
