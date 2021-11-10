export interface Acomodacao {
    nome: string;
    idDono: string;
    descricao: string;
    categoria: string;
    imagem: string;
    preço: number;
    local: {
        numero: number;
        rua: string;
        complemento: string;
        cidade: string;
        estado: string;
        pais: string;
        cep: number;
    };
    numeroDePessoas: number;
    comodidades: {
        cozinha: number;
        banheiros: number;
    };
    regras: {
        fumar: boolean;
        animais: boolean;
    };
    reserva: boolean;
}
