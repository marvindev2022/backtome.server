import { HttpRequest } from '@app/protocols/http';
import { LostAnimal } from './LostAnimal';

interface LostAnimalProps extends HttpRequest {
  body: {
    species: string;
    race: string;
    age: string;
    color: string;
    size: string;
    distinctive_characteristics: string;
    date_loss: string;
    location_loss: string;
    userId: string;
  };
}

describe('Lost Animal', () => {
  const makeSut = (props: LostAnimalProps) => {
    const newAnimal = new LostAnimal(props.body);

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
        date_loss: 'any_date',
        location_loss: 'any_location',
        userId: 'any_id',
      },
    };

    expect(() => makeSut(httpRequest)).toThrow();
  });

  it('should create a valid new lost animal instance', () => {
    const httpRequest = {
      body: {
        species: 'any_specie',
        race: 'any_race',
        age: 'Filhote',
        color: 'any_color',
        size: 'any_size',
        distinctive_characteristics: 'any_characteristic',
        date_loss: 'any_date',
        location_loss: 'any_location',
        userId: 'any_id',
      },
    };

    const newAnimal = makeSut(httpRequest);

    expect(Object.values(newAnimal.props)).toBeTruthy();
  });
});
