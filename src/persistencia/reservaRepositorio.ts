import { Reserva, ReservaModel } from '../entidades/reserva';

export class ReservaRepositorio {

    static async criar(reserva: Reserva): Promise<Reserva> {
        return await ReservaModel.create(reserva);
    }
    
    static async buscar(): Promise<Reserva[]> {
        return await ReservaModel.find().exec();
    }
    
    static async buscarPorId(id: string): Promise<Reserva[]>{
        return await ReservaModel.where('idAcomodacao').equals(id).exec();
    }
}