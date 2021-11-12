import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { Reserva, ReservaModel } from '../entidades/reserva';
import { ReservaRepositorio } from '../persistencia/reservaRepositorio';
import { realizarReserva } from '../persistencia/negocio';


export async function register(req: Request, res: Response, next: NextFunction) {
    try {
        const {idLocador, idAcomodacao, dataDeInicio, dataDeTermino } = req.body;
        
        if (idLocador && idAcomodacao && dataDeInicio && dataDeTermino) {
            let reserva: Reserva =  await realizarReserva(idLocador, idAcomodacao, dataDeInicio, dataDeTermino);
            if (reserva){
                res.json(reserva);
            } else {
                res.status(400).send('Cadastro não pode ser realizado');
            }
    
        } else {
            res.status(400).send('Dados incompletos');
        }
    } catch (error) {
        next(error);
    }
    

    
}

