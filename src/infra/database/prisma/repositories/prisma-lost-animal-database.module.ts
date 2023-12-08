import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { LostAnimalsRepository } from '@app/repositories/LostAnimals/lost-animals';
import { PrismaLostAnimalsRepository } from './prisma-lost-animal-repository';

@Module({
  providers: [
    PrismaService,
    { provide: LostAnimalsRepository, useClass: PrismaLostAnimalsRepository },
  ],
  exports: [
    { provide: LostAnimalsRepository, useClass: PrismaLostAnimalsRepository },
  ],
})
export class LostAnimalsDatabaseModule {}
