import { FoundAnimal } from '@domain/AnimalFound/FoundAnimal';

export abstract class FoundAnimalsRepository {
  abstract create(animal: FoundAnimal): Promise<void>;
  abstract find(): Promise<FoundAnimal['props'][] | Error>;

}
