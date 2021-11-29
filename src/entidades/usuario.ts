import { Schema, model } from "mongoose";

export interface Usuario {
  nome: string;
  email: string;
  senha: string;
}

export const UsuarioSchema = new Schema<Usuario>({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
});

export const UsuarioModel = model<Usuario>(
  "Usuario",
  UsuarioSchema,
  "usuarios",
);
