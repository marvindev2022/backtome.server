import { inMemoryFoundAnimalsRepository } from '@test/repositories/in-memory-found-animals-repository';
import { FoundAnimalService } from './found-animals.service';

describe('Founded Animal', () => {
  it('should register a new found animal', async () => {
    const foundAnimalsRepository = new inMemoryFoundAnimalsRepository();
    const foundAnimalsService = new FoundAnimalService(foundAnimalsRepository);

    const sud = {
      species: 'any_specie',
      race: 'any_race',
      age: 'Filhote',
      color: 'any_color',
      size: 'any_size',
      distinctive_characteristics: 'any_characteristic',
      photo: 'any_path',
      found_location: 'any_location',
      userId: 'any_id',
    };
    await foundAnimalsService.register(sud);

    expect(foundAnimalsRepository.foundAnimals.length).toBe(1);
    expect(foundAnimalsRepository.foundAnimals[0].props).toEqual(sud);
  });
});
