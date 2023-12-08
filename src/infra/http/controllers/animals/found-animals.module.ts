import { Module } from '@nestjs/common';
import { FoundAnimalService } from '@infra/http/services/animals/FoundAnimals/found-animals.service';
import { FoundAnimalsController } from './found-animals.controller';
import { FoundAnimalsDatabaseModule } from '@infra/database/prisma/repositories/prisma-found-animals-database.module';

@Module({
  imports: [FoundAnimalsDatabaseModule],
  controllers: [FoundAnimalsController],
  providers: [FoundAnimalService],
})
export class FoundAnimalsModule {}
