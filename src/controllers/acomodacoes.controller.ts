import { Request, Response } from "express";
import qs from "qs";
import { URL } from "url";
import { AcomodacaoModel } from "../entidades/acomodacao";

// interface com todos os possiveis filtros
interface queryFiltro extends qs.ParsedQs {
    nome?: string;
    categoria?: string;
    precoMin?: string;
    precoMax?: string;
    local?: { [key: string]: string };
    capacidade?: string;
    comodidades?: { [key: string]: string };
    regras?: { [key: string]: "1" | "0" };
}

// um exemplo de uri é:
// api/v1/acomodacoes?nome=x&precoMin=0&precoMax=0&local[numero]=32&local[rua]=x&local[cidade]=x&local[estado]=x&capacidade=0&comodidades[cozinha]=0&comodidades[banheiro]=0&regras[fumar]=<1 ou 0>&regras[animais]=<1 ou 0>
export async function listarAcomodacoes(req: Request, res: Response) {
    // retirar o query para parsear com o qs
    const query = new URL(req.originalUrl).search.substring(1);
    const queryParams: queryFiltro = qs.parse(query);

    let filtroMongoose: { [key: string]: any } = {};

    // para cada elemento da query...
    for (const key in queryParams) {
        // adicione-o no objeto de filtro de acordo

        if (key === "comodidades") {
            for (const comodidade in queryParams[key]) {
                const numComodidade = Number.parseInt(queryParams[key]![comodidade], 10);
                filtroMongoose[key][comodidade] = { $gte: numComodidade };
            }
        } else if (key === "regras") {
            for (const regra in queryParams[key]) {
                const regraPermitida = queryParams[key]![regra] === "1" ? true : false;
                filtroMongoose[key][regra] = regraPermitida;
            }
        } else if (key === "local") {
            for (const definicaoLocal in queryParams[key]) {
                filtroMongoose[key][definicaoLocal] = new RegExp(queryParams[key]![definicaoLocal], "ig");
            }
        } else if (key === "capacidade") {
            const capacidade = Number.parseInt(queryParams[key]!, 10);
            filtroMongoose["numeroDePessoas"] = capacidade;
        } else if (key === "precoMin") {
            const precoMin = Number.parseInt(queryParams[key]!, 10);
            filtroMongoose["preco"] = { $lte: precoMin };
        } else if (key === "precoMax") {
            const precoMax = Number.parseInt(queryParams[key]!, 10);
            filtroMongoose["preco"] = { $gte: precoMax };
        }

        // outras strings (nome, categoria, etc)
        else {
            filtroMongoose[key] = new RegExp(queryParams[key] as string, "ig");
        }
    }

    // depois, faça a requisição ao banco com o filtro criado
    try {
        const acomodacoesFiltradas = await AcomodacaoModel.find(filtroMongoose).lean().exec();
        // e retorne as acomodações encontradas
        return res.status(200).send(acomodacoesFiltradas);
    } catch (err) {
        return res.status(501).send({ message: err });
    }
}
