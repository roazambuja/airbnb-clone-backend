import { Reserva, ReservaModel } from '../entidades/reserva';

export class ReservaRepositorio {

    static async criar(reserva: Reserva): Promise<Reserva> {
        return ReservaModel.create(reserva);
    }
    
    static async buscar(): Promise<Reserva[]> {
        return ReservaModel.find().exec();
    }
    
    static async buscarPorId(id: string): Promise<Reserva[]>{
        return ReservaModel.where('idAcomodacao').equals(id).exec();
    }
}