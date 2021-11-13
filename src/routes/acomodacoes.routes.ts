import { Router } from "express";
import * as acomodacoesController from "../controllers/acomodacoes.controller";

export const router = Router();
export const path = "/acomodacoes";

router.get(path, acomodacoesController.listarAcomodacoes);
router.get(`${path}/:id`, acomodacoesController.acomodacaoID);
