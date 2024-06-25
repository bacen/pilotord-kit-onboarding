# Tutorial de Swap

## Introdução

Este tutorial tem como objetivo explicar como realizar um swap no SwapShield usando a rota de API.
As rotas apresentadas neste tutorial correspondem apenas às rotas testadas no âmbito do piloto para efetuar o swap entre Real Digital e Título Público Federal tokenizado.
Vale destacar que a solução desenvolvida permite, ainda, trocas entre títulos e troca entre Real Digital. Estes fluxos, entretanto, não foram objetos de testes pela equipe do projeto, mas podem ser utilizados consultando as referências da documentação oficial SwapEscrow disponibilizada no repositório oficial do Starlight.

<br />
Foram testadas as seguintes rotas para propor um novo swap:

- [Real Digital (ERC20) para TPFt (ERC1155) - `/startSwapFromErc20ToErc1155`](#a-começar-um-swap-real-digital-erc20-para-tpft-erc1155-startswapfromerc20toerc1155)
- [TPFt (ERC1155) para Real Digital (ERC20) - `/startSwapFromErc1155ToErc20`](#c-começar-um-swap-tpft-erc1155-para-real-digitalerc20-startswapfromerc1155toerc20)

e as rotas abaixo para aceitar um swap:

- [Real Digital (ERC20) para TPFt (ERC1155) - `/completeSwapFromErc20ToErc1155`](#b-completar-um-swap-real-digital-erc20-para-tpft-erc1155-completeswapfromerc20toerc1155)
- [TPFt (ERC1155) para Real Digital (ERC20) - `/completeSwapFromErc1155ToErc20`](#d-completar-um-swap-tpft-erc1155-para-real-digital-erc20-completeswapfromerc1155toerc20)


*A rota de completeSwap que deve ser chamada deve ser equivalente à rota de startSwap que foi chamada anteriormente. Exemplo: se foi chamada a rota /startSwapFromErc20ToErc1155, a rota de completeSwap equivalente é /completeSwapFromErc20ToErc1155.*

> Lembre-se que antes de realizar o swap, é necessário que o endereço que está propondo o swap tenha tokens suficientes depositados através da rota de /depositErc20 ou /depositErc1155 suficientes para realizar a troca. Veja a seção [Depósitos](./DEPOSITOS.md) para mais informações.

## Método: Swap via API

Para realizar um swap via API, é necessário realizar uma requisição POST para a rota `/startSwapFromErc20ToErc1155` do SwapShield, passando os parâmetros necessários no corpo da requisição.

## A) Começar um Swap Real Digital (ERC20) para TPFt (ERC1155) - `/startSwapFromErc20ToErc1155`

### Rota
`POST <endereço_da_aplicação:3000>/startSwapFromErc20ToErc1155`

### Descrição
Essa rota é utilizada para iniciar um swap de Real Digital (ERC20) para Título Público Federal tokenizado (TPFt) (ERC1155) no SwapShield.

### Request

### Body
O request deve conter os seguintes campos:

| Field                | Type   | Description                                          | Required |
|----------------------|--------|------------------------------------------------------|----------|
| `erc20Address`       | string | Endereço do Real Digital específico               | Yes      |
| `counterParty`       | string | Endereço da contraparte que receberá o swap          | Yes      |
| `amountSent`         | number | Quantidade de Real Digital a ser enviada          | Yes      |
| `tokenIdReceived`    | number | Id representando a série de TPFt a ser recebida      | Yes      |
| `tokenReceivedAmount`| number | Quantidade (unidades) da série de TPFt a ser recebida| Yes      |

#### Exemplo
```json
{
  "erc20Address": "0x3A34C530700E3835794eaE04d2a4F22Ce750eF7e",
  "counterParty": "0xAccountBankB",
  "amountSent": 30,
  "tokenIdReceived": 1,
  "tokenReceivedAmount": 3
}
```

### Response

#### Sucesso (200 OK)
Se a solicitação for bem-sucedida, a API retornará um código de status 200 com a seguinte estrutura de resposta.

#### Exemplo de Resposta
```json
{
    "tx": {
    },
    "encEvent": [],
    "commitment": {
    }
}
```

> Ao completar o Swap, será possível achar a informação do *swapId* no campo `commitment.preimage.value.swapId` da resposta.

> A contraparte também poderá saber o swapId proposto através das rotas /getAllCommitments. Os swaps propostos serão reconhecidos pela aplicação da contra-parte e será adicionads no banco de commitements.

## B) Completar um Swap Real Digital (ERC20) para TPFt (ERC1155) - `/completeSwapFromErc20ToErc1155`

### Rota
`POST <endereço_da_aplicação:3000>/completeSwapFromErc20ToErc1155`

### Descrição
Essa rota é utilizada para completar um swap de Real Digital (ERC20) para Título Público Federal tokenizado (TPFt) (ERC1155) no SwapShield.

### Request

### Body
O request deve conter os seguintes campos:

| Field                | Type   | Description                                          | Required |
|----------------------|--------|------------------------------------------------------|----------|
| `swapId`       | number | Id do swap a ser completado               | Yes      |

#### Exemplo
```json
{
  "swapId": 331103933
}
```

### Response

#### Sucesso (200 OK)
Se a solicitação for bem-sucedida, a API retornará um código de status 200 com a seguinte estrutura de resposta.

#### Exemplo de Resposta
```json
{
    "tx": {
    },
    "encEvent": [],
    "commitment": {
    }
}
```

## C) Começar um Swap TPFt (ERC1155) para Real Digital(ERC20) - `/startSwapFromErc1155ToErc20`

### Rota
`POST <endereço_da_aplicação:3000>/startSwapFromErc1155ToErc20`

### Descrição
Essa rota é utilizada para iniciar um swap de Título Público Federal tokenizado (TPFt) (ERC1155) para Real Digital (ERC20) no SwapShield.

### Request

### Body
O request deve conter os seguintes campos:

| Field                | Type   | Description                                          | Required |
|----------------------|--------|------------------------------------------------------|----------|
| `erc20Address`       | string | Endereço do Real Digital da troca               | Yes      |
| `counterParty`       | string | Endereço da contraparte que receberá o swap          | Yes      |
| `amountReceived`         | number | Quantidade de Real Digital a ser recebido          | Yes      |
| `tokenIdSent`    | number | Id representando a série de TPFt a ser enviado      | Yes      |
| `tokenSentAmount`| number | Quantidade (unidades) da série de TPFt a ser enviado| Yes      |

#### Exemplo
```json
{
    "erc20Address" : "0x3A34C530700E3835794eaE04d2a4F22Ce750eF7e",
    "counterParty" : "0xAccountBankB",
	"amountReceived": 30,
	"tokenIdSent" : 1,
    "tokenSentAmount" : 3
}
```

### Response

#### Sucesso (200 OK)
Se a solicitação for bem-sucedida, a API retornará um código de status 200 com a seguinte estrutura de resposta.

#### Exemplo de Resposta
```json
{
    "tx": {
    },
    "encEvent": [],
    "commitment": {
    }
}
```

> Ao completar o Swap, será possível achar a informação do *swapId* no campo `commitment.preimage.value.swapId` da resposta.

> A contraparte também poderá saber o swapId proposto através das rotas /getAllCommitments. Os swaps propostos serão reconhecidos pela aplicação da contra-parte e será adicionads no banco de commitements.

## D) Completar um Swap TPFt (ERC1155) para Real Digital (ERC20) - `/completeSwapFromErc1155ToErc20`

### Rota
`POST <endereço_da_aplicação:3000>/completeSwapFromErc1155ToErc20`

### Descrição
Essa rota é utilizada para completar um swap de Título Público Federal tokenizado (TPFt) (ERC1155) para Real Digital (ERC20) no SwapShield.

### Request

### Body
O request deve conter os seguintes campos:

| Field                | Type   | Description                                          | Required |
|----------------------|--------|------------------------------------------------------|----------|
| `swapId`       | number | Id do swap a ser completado               | Yes      |

#### Exemplo
```json
{
  "swapId": 331103933
}
```

### Response

#### Sucesso (200 OK)
Se a solicitação for bem-sucedida, a API retornará um código de status 200 com a seguinte estrutura de resposta.

#### Exemplo de Resposta
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