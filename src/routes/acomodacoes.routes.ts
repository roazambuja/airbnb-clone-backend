import { Router } from "express";
import * as acomodacoesController from "../controllers/acomodacoes.controller";
import multer from "multer";
import uploads from "../config/upload";

export const router = Router();
export const path = "/acomodacoes";
export const upload = multer(uploads);

router.get("/", acomodacoesController.listarAcomodacoes);
router.get("/:id", acomodacoesController.acomodacaoID);
router.post("/", upload.single("imagem"), acomodacoesController.criar);
