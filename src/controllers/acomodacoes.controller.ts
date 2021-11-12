import { Request, Response } from "express";
import qs from "qs";
import { URL } from "url";

// interface com todos os possiveis filtros
interface queryFiltro extends qs.ParsedQs {
    nome?: string;
    precoMin?: string;
    precoMax?: string;
    local?: string;
    capacidade?: string;
    comodidades?: [string];
    regras?: [string];
}

export function listarAcomodacoes(req: Request, res: Response) {
    // retirar o query para parsear com o qs
    const query = new URL(req.originalUrl).search.substring(1);
    const queryParams: queryFiltro = qs.parse(query);

    // construir query de busca no banco de dados
}
