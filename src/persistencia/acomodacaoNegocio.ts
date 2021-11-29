import mongoose from "mongoose";
import { Acomodacao } from "../entidades/acomodacao";
import { AcomodacaoRepositorio } from "./acomodacaoRepositorio";

export async function criarAcomodacao(
  idLocador: string,
  nome: string,
  descricao: string,
  categoria: string,
  imagem: string,
  preco: number,
  local: {
    rua: string;
    numero: number;
    complemento: string;
    cidade: string;
    estado: string;
    pais: string;
    cep: number;
  },
  numeroDePessoas: number,
  comodidades: { quartos: number; banheiros: number },
  regras: { fumar: boolean; animais: boolean },
) {
  if (
    idLocador &&
    nome &&
    descricao &&
    categoria &&
    imagem &&
    preco &&
    local &&
    numeroDePessoas &&
    comodidades &&
    regras
  ) {
    const acomodacao: Acomodacao = {
      idLocador,
      nome,
      descricao,
      categoria,
      imagem,
      preco,
      numeroDePessoas,
      local,
      comodidades,
      regras,
    };
    return await AcomodacaoRepositorio.criar(acomodacao);
  } else {
    throw new Error("Verifique as informações e tente novamente");
  }
}
