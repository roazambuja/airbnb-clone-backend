# Anotaçõezinhas pro projeto

## Sobre as filtragens

- Filtrar por nome
- Filtrar por faixa de preço
- Filtrar por local (por enquanto so verificar nome da cidade, ou do bairro, etc etc)
- Filtrar pelo numero de pessoas que comporta
- Filtrar por quais comodidades tem 
- Filtrar por quais regras tem
- Filtrar por disponibilidade

Isso tudo ai pode estar no banco, entao da uma ideia mais ou menos de como vai ser o schema de uma acomodação

## Os schemas

Igual a roberta falou pode ter um schema pra reserva igual no ngc da biblioteca

### Schema acomodação

```JSON
{
  "nome": string,
  "idDono": id no schema de usuarios la,
  "preço": number,
  "local": <talvez o CEP?> number,
  "numeroDePessoas": number,
  "comodidades": {
      "cozinha": number, (to pensando q esse numero pode ser a quantidade, ai se é 0 significa q n tem)
      "banheiros": number,
      ... etc etc
  },
  "regras": {
      "fumar": booleano,
      "animais": booleano,
      ...etc
  },
  "reserva": booleano (pra mostrar se ta disponivel etc etc) 
}
```

### Schema reserva

```JSON
{
  "idLocador": (cara dono da casa eu acho) pode ser o id do usuario,
  "idLocatario": mesma coisa, id do usuario,
  "dataDeInicio": Date,
  "dataDeTermino": Date
}
```

### Schema usuario

```JSON
{
  "nome": string,
  "email": string,
  "senhaHash": string
}
```
