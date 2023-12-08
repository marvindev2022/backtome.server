import { HttpRequest } from '@app/protocols/http';
import { FoundAnimal } from './FoundAnimal';

interface FoundAnimalProps extends HttpRequest {
  body: {
    species: string;
    race: string;
    age: string;
    color: string;
    size: string;
    distinctive_characteristics: string;
    photo: string[];
    found_location: string;
    userId: string;
  };
}

describe('Lost Animal', () => {
  const makeSut = (props: FoundAnimalProps) => {
    const newAnimal = new FoundAnimal(props.body);

    return newAnimal;
  };

  it('should throw an error if any param is invalid', () => {
    const httpRequest = {
      body: {
        species: 'any_specie',
        race: 'any_race',
        age: 'any_age',
        color: 'any_color',
        size: 'any_size',
        distinctive_characteristics: 'any_characteristic',
        photo: ['any_date'],
        found_location: 'any_location',
        userId: 'any_id',
      },
    };

    expect(() => makeSut(httpRequest)).toThrow();
  });

  it('should create a valid new found animal instance', () => {
    const httpRequest = {
      body: {
        species: 'any_specie',
        race: 'any_race',
        age: 'Filhote',
        color: 'any_color',
        size: 'any_size',
        distinctive_characteristics: 'any_characteristic',
        photo: ['any_date'],
        found_location: 'any_location',
        userId: 'any_id',
      },
    };

    const newAnimal = makeSut(httpRequest);

    expect(Object.values(newAnimal.props)).toBeTruthy();
  });
});
