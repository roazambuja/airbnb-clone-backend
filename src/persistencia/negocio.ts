import { Reserva, ReservaModel } from '../entidades/reserva';
import { ReservaRepositorio } from './reservaRepositorio';

export async function realizarReserva(idLocador: string, idAcomodacao: string, dataDeInicio: Date, dataDeTermino: Date): Promise<Reserva>{
    const reserva: Reserva = {
        idLocador: idLocador,
        idAcomodacao: idAcomodacao,
        dataDeInicio: dataDeInicio,
        dataDeTermino:  dataDeTermino
    }
    return await ReservaRepositorio.criar(reserva);
}

export async function verificarDisponibilidade(idAcomodacao: string, dataDeInicio: Date, dataDeTermino: Date) {
    const reservas: Reserva[] = await ReservaRepositorio.buscarPorId(idAcomodacao);

    let paramInicio: Number = new Date(dataDeInicio).getTime();
    let paramTermino: Number = new Date(dataDeTermino).getTime();

    let cont: Number = 0;
    let acomodacaoValida: boolean = true;

    reservas.forEach(reserva => {

        let inicio: Number = reserva.dataDeInicio.getTime();
        let termino: Number = reserva.dataDeTermino.getTime();

        acomodacaoValida = (paramInicio < inicio && paramTermino < inicio) ||
            (paramInicio > termino && paramTermino > termino);

        if (!acomodacaoValida) return acomodacaoValida;
    });

    return acomodacaoValida;
}