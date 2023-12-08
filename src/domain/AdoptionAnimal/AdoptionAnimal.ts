import { Animal, AnimalProps } from '@domain/Animal/Animal';
import { z } from 'zod';

interface AdoptionAnimalProps extends AnimalProps {
  species: string;
  race: string;
  age: string;
  color: string;
  size: string;
  photo: string[];
  distinctive_characteristics: string;
  personality_description: string;
  userId: string;
}

export class AdoptionAnimal extends Animal {
  props: AdoptionAnimalProps;

  constructor(animalProps: AdoptionAnimalProps) {
    super(
      z.object({
        species: z.string({ required_error: 'Espécie não foi informada' }),
        race: z.string({ required_error: 'Raça não foi informada' }),
        age: z.string({ required_error: 'Idade não foi informada' }),
        color: z.string({ required_error: 'Cor não foi informada' }),
        size: z.string({ required_error: 'Tamanho não foi informado' }),
        photo: z.string({ required_error: 'Url não foi informado' }),
        distinctive_characteristics: z.string({
          required_error: 'Características não foram informadas',
        }),
        personality_description: z.string({
          required_error: 'Descrição da personalidade não foi informada',
        }),
        userId: z.string({
          required_error: 'Identificação do usuário não foi informada',
        }),
      }),
    );

    const newAnimal = this.handle(animalProps);

    this.props = newAnimal.body;
  }
}
