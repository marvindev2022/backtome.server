import { Module } from '@nestjs/common';
import { AdoptionAnimalsDatabaseModule } from '@infra/database/prisma/repositories/prisma-adoption-animal-database.module';
import { AdoptionAnimalsController } from './adoption-animals.controller';
import { AdoptionAnimalsService } from '@infra/http/services/animals/AdoptionAnimals/adoption-animals.service';

@Module({
  imports: [AdoptionAnimalsDatabaseModule],
  controllers: [AdoptionAnimalsController],
  providers: [AdoptionAnimalsService],
})
export class AdoptionAnimalsModule {}
