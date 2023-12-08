import { Ong } from "@domain/Ong's/Ongs";

export abstract class OngsRepository {
  abstract register(ong:any): Promise<any>
  abstract findAllOngs(): Promise<Ong['props'][]>;
}
