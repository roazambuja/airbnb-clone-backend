import { Router } from 'express';
import * as ReservaController from '../controllers/reservas.controller';

export const router= Router();
export const path = '/reservas';

router.post("/", ReservaController.register);
router.post("/verificar", ReservaController.verify);