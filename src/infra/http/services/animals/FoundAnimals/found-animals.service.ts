import { FoundAnimalsRepository } from '@app/repositories/FoundAnimals/found-animals';
import { FoundAnimal } from '@domain/AnimalFound/FoundAnimal';
import { RegisterFoundAnimalDTO } from '@infra/http/dtos/FoundAnimal/registerFoundAnimal.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FoundAnimalService {
  constructor(private foundAnimalsRepository: FoundAnimalsRepository) {}

  async register(request: RegisterFoundAnimalDTO): Promise<void> {
    const newAnimal = new FoundAnimal(request);

    await this.foundAnimalsRepository.create(newAnimal);
  }
  async find(): Promise<FoundAnimal['props'][] | Error> {
    const animalsFoundList = await this.foundAnimalsRepository.find();

    if (animalsFoundList instanceof Error) {
      return animalsFoundList;
    }

    return animalsFoundList;
  }
}
