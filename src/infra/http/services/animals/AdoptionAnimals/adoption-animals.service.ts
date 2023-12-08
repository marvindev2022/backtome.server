import { AdoptionAnimalsRepository } from '@app/repositories/AdoptionAnimals/adoption-animals';
import { AdoptionAnimal } from '@domain/AdoptionAnimal/AdoptionAnimal';
import { RegisterAdoptionAnimalDTO } from '@infra/http/dtos/AdoptionAnimal/registerAdoptionAnimal.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AdoptionAnimalsService {
  constructor(private adoptionAnimalsRepository: AdoptionAnimalsRepository) {}

  async register(request: RegisterAdoptionAnimalDTO): Promise<void> {
    const newAnimal = new AdoptionAnimal(request);

    await this.adoptionAnimalsRepository.create(newAnimal);
  }

  async list(): Promise<AdoptionAnimal['props'][]> {
    const adoptionAnimals = await this.adoptionAnimalsRepository.find();

    if (adoptionAnimals instanceof Error) {
      throw adoptionAnimals;
    }

    return adoptionAnimals;
  }
}
