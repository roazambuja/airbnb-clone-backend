import { NextFunction, Request, Response } from "express";
import { Reserva } from "../entidades/reserva";
import { realizarReserva, verificarDisponibilidade } from "../persistencia/negocio";

declare namespace Express {
  interface User {
    _id?: string;
  }
}

export async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const { idAcomodacao, dataDeInicio, dataDeTermino } = req.body;
    let idLocador;

    if (req.user) {
      idLocador = (req.user as Express.User)._id;
    } else {
      res.status(401).send("Usuário não está logado.");
    }

    if (idLocador && idAcomodacao && dataDeInicio && dataDeTermino) {
      let reserva: Reserva = await realizarReserva(
        idLocador,
        idAcomodacao,
        dataDeInicio,
        dataDeTermino
      );
      if (reserva) {
        res.json(reserva);
      } else {
        res.status(400).send("Ocorreu um erro ao tentar reservar esse imóvel.");
      }
    } else {
      res.status(400).send("Dados incompletos.");
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
        let verificaReserva: boolean = await verificarDisponibilidade(
          idAcomodacao,
          dataDeInicio,
          dataDeTermino
        );
        if (verificaReserva) {
          res.status(200).send("Ok");
        } else {
          res.status(502).send("Imóvel não disponível na data solicitada.");
        }
      } catch (error) {
        next(error);
      }
    } else {
      res.status(400).send("Dados incompletos.");
    }
  } catch (error) {
    next(error);
  }
}
