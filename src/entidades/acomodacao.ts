import { Schema, model } from "mongoose";

export interface Acomodacao {
  idLocador: string;
  nome: string;
  descricao: string;
  categoria: string;
  imagem: string | undefined;
  preco: number;
  local: {
    rua: string;
    numero: number;
    complemento: string;
    cidade: string;
    estado: string;
    pais: string;
    cep: number;
  };
  numeroDePessoas: number;
  comodidades: { quartos: number; banheiros: number };
  regras: { fumar: boolean; animais: boolean };
}

export const AcomodacaoSchema = new Schema<Acomodacao>(
  {
    idLocador: { type: String, required: true },
    nome: { type: String, required: true },
    descricao: { type: String, required: true },
    categoria: { type: String, required: true },
    imagem: { type: String },
    preco: { type: Number, required: true },
    local: {
      rua: { type: String, required: true },
      numero: { type: Number, required: true },
      complemento: { type: String },
      cidade: { type: String, required: true },
      estado: { type: String, required: true },
      pais: { type: String, required: true },
      cep: { type: Number, required: true },
    },
    numeroDePessoas: { type: Number, required: true },
    comodidades: {
      quartos: { type: Number, required: true },
      banheiros: { type: Number, required: true },
    },
    regras: {
      fumar: { type: Boolean, required: true },
      animais: { type: Boolean, required: true },
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);
AcomodacaoSchema.virtual("imagem_url").get(function (this: Acomodacao) {
  return `http://localhost:${process.env.PORT}/files/${this.imagem}`;
});

export const AcomodacaoModel = model<Acomodacao>(
  "Acomodacao",
  AcomodacaoSchema,
  "acomodacoes",
);
