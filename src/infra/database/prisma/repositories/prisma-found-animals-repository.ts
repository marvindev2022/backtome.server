import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { FoundAnimal } from '@domain/AnimalFound/FoundAnimal';
import { FoundAnimalsRepository } from '@app/repositories/FoundAnimals/found-animals';

@Injectable()
export class PrismaFoundAnimalsRepository implements FoundAnimalsRepository {
  constructor(private prismaService: PrismaService) {}

  async create(animal: FoundAnimal): Promise<void> {
    await this.prismaService.animalFound.create({
      data: {
        ...animal.props,
        createdAt:  new Date()
      },
    });
  }

  async find(): Promise<FoundAnimal['props'][]> {
    const animalsFound = await this.prismaService.animalFound.findMany();

    if (animalsFound.length < 1) {
      throw new NotFoundException('Não existem animais para serem listados');
    }

    return animalsFound;
  }
}
