import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { FoundAnimalsRepository } from '@app/repositories/FoundAnimals/found-animals';
import { PrismaFoundAnimalsRepository } from './prisma-found-animals-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: FoundAnimalsRepository,
      useClass: PrismaFoundAnimalsRepository,
    },
  ],
  exports: [
    {
      provide: FoundAnimalsRepository,
      useClass: PrismaFoundAnimalsRepository,
    },
  ],
})
export class FoundAnimalsDatabaseModule {}
