import { Injectable } from '@nestjs/common';
import { OngsRepository } from '@app/repositories/Ongs/ongs';
import { Ong } from "@domain/Ong's/Ongs";

@Injectable()
export class OngsService {
  constructor(private ongRepository: OngsRepository) {}

  async createOng(ong: any): Promise<any> {


    const newOng = new Ong(ong);

    const ongId = await this.ongRepository.register(newOng);

    return ongId;
  }
  async getAllOngs(): Promise<Ong['props'][] | Error> {
    return this.ongRepository.findAllOngs();
  }
}
