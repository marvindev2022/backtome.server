import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { AdoptionAnimalsRepository } from '@app/repositories/AdoptionAnimals/adoption-animals';
import { PrismaAdoptionAnimalsRepository } from './prisma-adoption-animal-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: AdoptionAnimalsRepository,
      useClass: PrismaAdoptionAnimalsRepository,
    },
  ],
  exports: [
    {
      provide: AdoptionAnimalsRepository,
      useClass: PrismaAdoptionAnimalsRepository,
    },
  ],
})
export class AdoptionAnimalsDatabaseModule {}
