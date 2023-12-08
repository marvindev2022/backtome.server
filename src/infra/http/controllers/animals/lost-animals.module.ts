import { Module } from '@nestjs/common';
import { LostAnimalsController } from './lost-animals.controller';
import { LostAnimalService } from '@infra/http/services/animals/LostAnimals/lost-animals.service';
import { LostAnimalsDatabaseModule } from '@infra/database/prisma/repositories/prisma-lost-animal-database.module';

@Module({
  imports: [LostAnimalsDatabaseModule],
  controllers: [LostAnimalsController],
  providers: [LostAnimalService],
})
export class LostAnimalsModule {}
