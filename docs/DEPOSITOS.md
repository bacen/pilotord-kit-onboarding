# Tutorial de depósito

## Introdução

Este tutorial tem como objetivo explicar como realizar um depósito no SwapShield através das rotas de API.

O depósito no SwapShield deve ser realizado com Real Digital (ERC20) ou TPFt(ERC1155). São rotas diferentes para cada tipo de token, e cada uma delas será explicada em detalhes a seguir.

> Lembre-se que antes de realizar o depósito de Real Digital (ERC20) ou TPFt(ERC1155), é necessário a aprovação do contrato do SwapShield para realizar a transferência dos tokens. Veja a seção [Permissões dos contratos](../StarlightDvpRealDigital.md#2-permissões-dos-contratos) para mais informações.

## Método 1: Depósito via API

Para realizar um depósito via API, é necessário realizar uma requisição POST para a rota `/deposit` do SwapShield, passando os parâmetros necessários no corpo da requisição.

## A) Depositar Real Digital (ERC20) - /depositErc20

### Rota
`POST <endereço_da_aplicação:3000>/depositErc20`

### Descrição
Essa rota é utilizada para realizar um depósito de Real Digital (ERC20) no SwapShield.

### Request

### Body
O request deve conter os seguintes campos:

| Field     | Type   | Description                       | Required |
|-----------|--------|-----------------------------------|----------|
| `amount`    | number | Quantidade a ser depositada             | Yes      |
| `erc20Address`   | string | Endereço do Real Digital específico    | Yes      |

#### Example
```json
{
  "amount": 200,
  "erc20Address": "0x3A34C530700E3835794eaE04d2a4F22Ce750eF7e"
}
```

### Response

#### Sucesso (200 OK)
Se a solicitação for bem-sucedida, a API retornará um código de status 200 com a seguinte estrutura de resposta.

#### Example Response
```json
{
    "tx": {
    },
    "encEvent": [],
    "commitment": {
    }
}
```

## B) Depositar TPFt (ERC1155) - /depositErc1155

### Rota
`POST <endereço_da_aplicação:3000>/depositErc1155`

### Descrição
Essa rota é utilizada para realizar um depósito de Título Publico Federal tokenizado (TPFt) (ERC1155) no SwapShield.

### Request

### Body
O request deve conter os seguintes campos:

| Field     | Type   | Description                       | Required |
|-----------|--------|-----------------------------------|----------|
| `erc1155Address`    | string | Endereço do contrato do TPFt          | Yes      |
| `tokenId`   | number | Id representando a série de título a ser depositado   | Yes      |
| `amount`   | number | Quantidade (unidades) da série de título a ser depositado   | Yes      |

#### Exemplo
```json
{
  "erc1155Address": "0x4ABDE28B04315C05a4141a875f9B33c9d1440a8E",
  "tokenId": 1,
  "amount": 1200
}
```

### Resposta

#### Sucesso (200 OK)
Se a solicitação for bem-sucedida, a API retornará um código de status 200 com a seguinte estrutura de resposta.

#### Resposta de Exemplo


```json
{
    "tx": {
    },
    "encEvent": [],
    "commitment": {
    }
}
```

[<<< Voltar](../StarlightDvpRealDigital.md)