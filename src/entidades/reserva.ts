import { model, Schema } from "mongoose";

export interface Reserva {
    idLocador: string;
    idAcomodacao: string;
    dataDeInicio: Date;
    dataDeTermino: Date;
}

const ReservaSchema = new Schema<Reserva>({
    idLocador: { type: String, required: true },
    idAcomodacao: { type: String, required: true },
    dataDeInicio: { type: Date, required: true },
    dataDeTermino: { type: Date, required: true },
});

export const ReservaModel = model<Reserva>("Reserva", ReservaSchema, "reservas");
