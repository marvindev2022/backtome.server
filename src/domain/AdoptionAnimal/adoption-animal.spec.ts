import { HttpRequest } from '@app/protocols/http';
import { AdoptionAnimal } from './AdoptionAnimal';

interface AdoptionAnimalProps extends HttpRequest {
  body: {
    species: string;
    race: string;
    age: string;
    color: string;
    size: string;
    distinctive_characteristics: string;
    personality_description: string;
    userId: string;
  };
}

describe('Lost Animal', () => {
  const makeSut = (props: AdoptionAnimalProps) => {
    const newAnimal = new AdoptionAnimal(props.body);

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
        personality_description: 'any_description',
        userId: 'any_id',
      },
    };

    expect(() => makeSut(httpRequest)).toThrow();
  });

  it('should create a valid new adoption animal instance', () => {
    const httpRequest = {
      body: {
        species: 'any_specie',
        race: 'any_race',
        age: 'Filhote',
        color: 'any_color',
        size: 'any_size',
        distinctive_characteristics: 'any_characteristic',
        personality_description: 'any_description',
        userId: 'any_id',
      },
    };

    const newAnimal = makeSut(httpRequest);

    expect(Object.values(newAnimal.props)).toBeTruthy();
  });
});
