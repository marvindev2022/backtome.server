import { LostAnimalsRepository } from '@app/repositories/LostAnimals/lost-animals';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { LostAnimal } from '@domain/LostAnimal/LostAnimal';

@Injectable()
export class PrismaLostAnimalsRepository implements LostAnimalsRepository {
  constructor(private prismaService: PrismaService) {}

  async create(animal: LostAnimal): Promise<void> {
    await this.prismaService.lostAnimal.create({
      data: {
        ...animal.props,
        createdAt:  new Date()

      },
    });
  }

  async find(): Promise<LostAnimal['props'][]> {
    const lostAnimals = await this.prismaService.lostAnimal.findMany();

    if (lostAnimals.length < 1) {
      throw new NotFoundException('Não existem animais para serem listados');
    }

    return lostAnimals;
  }
}
