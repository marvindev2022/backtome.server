import { inMemoryLostAnimalRepository } from '@test/repositories/in-memory-lost-animal-repository';
import { LostAnimalService } from './lost-animals.service';

describe('Lost Animal', () => {
  it('should register a new lost animal', async () => {
    const lostAnimalRepository = new inMemoryLostAnimalRepository();
    const lostAnimalService = new LostAnimalService(lostAnimalRepository);

    const lostAnimal = await lostAnimalService.register({
      species: 'any_specie',
      race: 'any_race',
      age: 'Filhote',
      color: 'any_color',
      size: 'any_size',
      photo: ['any_url','any_photo'],
      distinctive_characteristics: 'any_characteristic',
      date_loss: 'any_date',
      location_loss: 'any_location',
      userId: 'any_id',
    });

    expect(lostAnimalRepository.lostAnimals.length).toBeGreaterThanOrEqual(1);
    expect(lostAnimalRepository.lostAnimals[0]).toEqual(lostAnimal);
  });
});
