import { LostAnimalsRepository } from '@app/repositories/LostAnimals/lost-animals';
import { LostAnimal } from '@domain/LostAnimal/LostAnimal';
import { RegisterLostAnimalDTO } from '@infra/http/dtos/LostAnimal/registerLostAnimal.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LostAnimalService {
  constructor(private lostAnimalRepository: LostAnimalsRepository) {}

  async register(request: RegisterLostAnimalDTO): Promise<LostAnimal> {
    const newAnimal = new LostAnimal(request);

    await this.lostAnimalRepository.create(newAnimal);

    return newAnimal;
  }

  async find(): Promise<LostAnimal['props'][] | Error> {
    const lostAnimalsList = await this.lostAnimalRepository.find();

    if (lostAnimalsList instanceof Error) {
      return lostAnimalsList;
    }

    return lostAnimalsList;
  }
}
