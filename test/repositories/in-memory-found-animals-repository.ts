import { FoundAnimalsRepository } from '@app/repositories/FoundAnimals/found-animals';
import { FoundAnimal } from '@domain/AnimalFound/FoundAnimal';

export class inMemoryFoundAnimalsRepository implements FoundAnimalsRepository {
  public foundAnimals: FoundAnimal[] = [];

  async create(animal: FoundAnimal): Promise<void> {
    this.foundAnimals.push(animal);
  }
}
