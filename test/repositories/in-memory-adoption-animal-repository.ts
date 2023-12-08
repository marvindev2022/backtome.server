import { AdoptionAnimalsRepository } from '@app/repositories/AdoptionAnimals/adoption-animals';
import { AdoptionAnimal } from '@domain/AdoptionAnimal/AdoptionAnimal';
import { NotFoundException } from '@nestjs/common';

export class inMemoryAdoptionAnimalsRepository
  implements AdoptionAnimalsRepository
{
  public adoptionAnimals: AdoptionAnimal[] = [];

  async create(animal: AdoptionAnimal): Promise<void> {
    this.adoptionAnimals.push(animal);
  }

  async find(): Promise<AdoptionAnimal['props'][] | Error> {
    if (this.adoptionAnimals.length < 1) {
      return new NotFoundException('There are no animals to adopt');
    }

    return this.adoptionAnimals.map((adoptionAnimal) => adoptionAnimal.props);
  }
}
