import { Router } from 'express';
import * as ReservaController from '../controllers/reservas.controller';

export const router= Router();
export const path = '/reservas';

router.post(path, ReservaController.register);
