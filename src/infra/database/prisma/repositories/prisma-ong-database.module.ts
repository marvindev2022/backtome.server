import { Module } from '@nestjs/common';
import { PrismaOngRepository } from './prisma-ong-repository';
import { PrismaService } from '../prisma.service';
import { OngsRepository } from '@app/repositories/Ongs/ongs';

@Module({
  providers: [
    PrismaService,
    { provide: OngsRepository, useClass: PrismaOngRepository },
  ],
  exports: [{ provide: OngsRepository, useClass: PrismaOngRepository }],
})
export class OngsDatabaseModule {}
