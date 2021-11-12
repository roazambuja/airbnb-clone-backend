import { Reserva, ReservaModel } from '../entidades/reserva';
import { ReservaRepositorio } from './reservaRepositorio';

export async function realizarReserva(idLocador: string, idAcomodacao: string, dataDeInicio: Date, dataDeTermino: Date){
    if (idLocador && idAcomodacao && dataDeInicio && dataDeTermino) {
        const reserva: Reserva = {
            idLocador: idLocador,
            idAcomodacao: idAcomodacao,
            dataDeInicio: dataDeInicio,
            dataDeTermino:  dataDeTermino
        }
        return await ReservaRepositorio.criar(reserva);
    } else {
        throw new Error('Dados incompletos');
    }
}