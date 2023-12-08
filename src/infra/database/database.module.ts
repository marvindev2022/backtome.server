import { Module } from '@nestjs/common';
import { UsersDatabaseModule } from './prisma/repositories/prisma-user-database.module';
import { LostAnimalsDatabaseModule } from './prisma/repositories/prisma-lost-animal-database.module';
import { AdoptionAnimalsDatabaseModule } from './prisma/repositories/prisma-adoption-animal-database.module';
import { FoundAnimalsDatabaseModule } from './prisma/repositories/prisma-found-animals-database.module';
import { OngsDatabaseModule } from './prisma/repositories/prisma-ong-database.module';
import { ReportsDatabaseModule } from './prisma/repositories/prisma-report-database.module';
import { FirebaseMessagesModule } from './prisma/repositories/prisma-message-database.module';
import { AssessmentsDatabaseModule } from './prisma/repositories/prisma-assessment-database.module';

@Module({
  imports: [
    UsersDatabaseModule,
    LostAnimalsDatabaseModule,
    AdoptionAnimalsDatabaseModule,
    FoundAnimalsDatabaseModule,
    OngsDatabaseModule,
    ReportsDatabaseModule,
    FirebaseMessagesModule,
    AssessmentsDatabaseModule,
  ],
})
export class DatabaseModule {}
