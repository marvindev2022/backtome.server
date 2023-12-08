import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { OngsRepository } from '@app/repositories/Ongs/ongs';
import { Ong } from "@domain/Ong's/Ongs";

@Injectable()
export class PrismaOngRepository implements OngsRepository {
  constructor(private prismaService: PrismaService) {}

  async register(ong: Ong): Promise<string> {
    try {
      const {  address,contact,name,description,logo,website} = ong.props;

      await this.prismaService.ongs.create({
        data: {
          address,contact,name,description,logo,website
        },
        select: {
          id: true,
        },
      });

      return "Ong Registrada!";
    } catch (error) {
      throw new Error('Erro ao registrar ong');
    }
  }
  async findAllOngs(): Promise<Ong['props'][]> {
    const ongs = await this.prismaService.ongs.findMany();

    const ongList = ongs.map((ong) => ({
      id: ong.id,
      name: ong.name,
      address: ong.address,
      contact: ong.contact,
      website: ong.website ? ong.website : undefined,
      description: ong.description ? ong.description : undefined,
      logo: ong.logo ? ong.logo : undefined,
    }));

    return ongList;
  }
}
