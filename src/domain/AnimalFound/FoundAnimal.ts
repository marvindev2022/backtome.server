import { Animal, AnimalProps } from '@domain/Animal/Animal';
import { z } from 'zod';

interface FoundAnimalProps extends AnimalProps {
  species: string;
  race: string;
  age: string;
  color: string;
  gender: string;
  size: string;
  distinctive_characteristics: string;
  photo: string[];
  found_location: string;
  userId: string;
}

export class FoundAnimal extends Animal {
  props: FoundAnimalProps;

  constructor(animalProps: FoundAnimalProps) {
    super(
      z.object({
        species: z.string({ required_error: 'Espécie não foi informada' }),
        race: z.string({ required_error: 'Raça não foi informada' }),
        gender: z.string({ required_error: 'Sexo não foi informado' }),
        createAt: z.string({ required_error: 'Data não foi informado' }),
        age: z.string({ required_error: 'Idade não foi informada' }),
        color: z.string({ required_error: 'Cor não foi informada' }),

        size: z.string({ required_error: 'Tamanho não foi informado' }),
        distinctive_characteristics: z.string({
          required_error: 'Características não foram informadas',
        }),
        personality_description: z.string({
          required_error: 'Características não foram informadas',
        }),
        photo: z.array(z.string({
          required_error: 'Endereço de imagem não foi informado',
        })),
        found_location: z.string({
          required_error: 'Endereço não foi informado',
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
