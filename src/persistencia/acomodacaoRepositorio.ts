import { Acomodacao, AcomodacaoModel } from "../entidades/acomodacao";

export class AcomodacaoRepositorio {
  static async criar(acomodacoes: Acomodacao): Promise<Acomodacao> {
    return AcomodacaoModel.create(acomodacoes);
  }

  static async buscar(): Promise<Acomodacao[]> {
    return AcomodacaoModel.find().exec();
  }
}
