import { inMemoryLostAnimalRepository } from '@test/repositories/in-memory-lost-animal-repository';
import { LostAnimalService } from './lost-animals.service';
import { NotFoundException } from '@nestjs/common';

describe('Find animal', () => {
  it('should throw not found if none animal is registered', async () => {
    const lostAnimalRepository = new inMemoryLostAnimalRepository();

    const lostAnimalService = new LostAnimalService(lostAnimalRepository);

    expect(await lostAnimalService.find()).toEqual(
      new NotFoundException('There are no lost animals to list'),
    );
  });

  it('should return a list of registered lost animals', async () => {
    const lostAnimalRepository = new inMemoryLostAnimalRepository();

    const lostAnimalService = new LostAnimalService(lostAnimalRepository);

    const lostAnimal = await lostAnimalService.register({
      species: 'any_specie',
      race: 'any_race',
      age: 'Filhote',
      color: 'any_color',
      photo: ['any_url','any_url'],
      size: 'any_size',
      distinctive_characteristics: 'any_characteristic',
      date_loss: 'any_date',
      location_loss: 'any_location',
      userId: 'any_id',
    });

    const lostAnimalsList = await lostAnimalService.find();

    expect(lostAnimalsList[0]).toEqual(lostAnimal.props);
  });
});
