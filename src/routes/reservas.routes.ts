import { Router } from 'express';
import { ensureAuthentication } from '../controllers/auth.controller';
import * as ReservaController from '../controllers/reservas.controller';

export const router= Router();
export const path = '/reservas';

router.post("/", ensureAuthentication, ReservaController.register);
router.post("/verificar", ReservaController.verify);