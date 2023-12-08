import { OngsRepository } from '@app/repositories/Ongs/ongs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Ongs } from '@prisma/client';

@Injectable()
export class InMemoryOngsRepository implements OngsRepository {
  private ongs: Ongs[] = [];

  async findAllOngs(): Promise<any> {
    return this.ongs;
  }
}


