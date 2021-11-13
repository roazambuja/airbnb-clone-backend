import { Schema, model } from "mongoose";

export interface Acomodacao {
    nome: string;
    idLocador: string;
    descricao: string;
    categoria: string;
    imagem: string;
    preco: number;
    local: {
        numero: number;
        rua: string;
        complemento: string;
        cidade: string;
        estado: string;
        pais: string;
        cep: number;
    };
    numeroDePessoas: number;
    comodidades: {
        cozinha: number;
        banheiros: number;
    };
    regras: {
        fumar: boolean;
        animais: boolean;
    };
}

export const AcomodacaoSchema = new Schema<Acomodacao>({
    nome: { type: String, required: true },
    idLocador: { type: String, required: true },
    descricao: { type: String, required: true },
    categoria: { type: String, required: true },
    imagem: { type: String, required: true },
    preco: { type: Number, required: true },
    local: {
        numero: { type: Number, required: true },
        rua: { type: String, required: true },
        complemento: { type: String },
        cidade: { type: String, required: true },
        estado: { type: String, required: true },
        pais: { type: String, required: true },
        cep: { type: Number, required: true },
    },
    numeroDePessoas: { type: Number, required: true },
    comodidades: {
        cozinha: { type: Number, required: true },
        banheiros: { type: Number, required: true },
    },
    regras: {
        fumar: { type: Boolean },
        animais: { type: Boolean },
    },
});

export const AcomodacaoModel = model<Acomodacao>("Acomodacao", AcomodacaoSchema, "acomodacoes");
