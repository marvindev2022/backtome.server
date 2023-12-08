import { Animal, AnimalProps } from '@domain/Animal/Animal';
import { z } from 'zod';

export class LostAnimal extends Animal {
  props: AnimalProps;

  constructor(animalProps: AnimalProps) {
    super(
      z.object({
        species: z.string({ required_error: 'Espécie não foi informada' }),
        race: z.string({ required_error: 'Raça não foi informada' }),
        age: z.string({ required_error: 'Idade não foi informada' }),
        photo: z.array(
          z.string({ required_error: 'Foto não foi selecionada' }),
        ),
        color: z.string({ required_error: 'Cor não foi informada' }),
        size: z.string({ required_error: 'Tamanho não foi informado' }),
        distinctive_characteristics: z.string({
          required_error: 'Características não foram informadas',
        }),
        date_loss: z.string({
          required_error: 'Data da perda não foi informada',
        }),
        location_loss: z.string({
          required_error: 'Localização da perda não foi informada',
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
