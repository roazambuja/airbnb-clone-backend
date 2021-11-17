import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { Reserva, ReservaModel } from '../entidades/reserva';
import { ReservaRepositorio } from '../persistencia/reservaRepositorio';
import { realizarReserva, verificarDisponibilidade } from '../persistencia/negocio';


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

export async function verify(req: Request, res: Response, next: NextFunction) {
    try {
        const { idAcomodacao, dataDeInicio, dataDeTermino } = req.body;
        
        if (idAcomodacao && dataDeInicio && dataDeTermino) {

            try { 
              let verificaReserva: boolean = await verificarDisponibilidade(idAcomodacao, dataDeInicio, dataDeTermino);
              if (verificaReserva) {
                res.status(200).send('Ok');
              } else {
                res.status(400).send('Reserva não pode ser realizada');
              }
            } catch(error) {
                next(error);
            }
        } else {
            res.status(400).send('Dados incompletos');
        }
    } catch (error) {
        next(error);
    }
}

