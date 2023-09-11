# Solidity API

## ITPFtOperation1002

Interface responsável por permitir a liquidação de oferta pública envolvendo Título Público Federal tokenizado (TPFt).

### auctionPlacement

```solidity
function auctionPlacement(uint256 operationId, uint256 cnpj8Sender, uint256 cnpj8Receiver, enum ITPFtOperation.CallerPart callerPart, struct ITPFt.TPFtData tpftData, uint256 tpftAmount, uint256 unitPrice) external
```

Função para realizar a liquidação de oferta pública.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| operationId | uint256 | Número de operação + data vigente no formato yyyyMMdd. |
| cnpj8Sender | uint256 | CNPJ8 do cedente da operação. Nesta operação sempre será o CNPJ8 da STN. |
| cnpj8Receiver | uint256 | CNPJ8 do cessionário da operação. |
| callerPart | enum ITPFtOperation.CallerPart | Parte que está transmitindo o comando da operação. Se for o cedente deve ser informado CallerPart.TPFtSender, se for o cessionário deve ser informado CallerPart.TPFtReceiver. |
| tpftData | struct ITPFt.TPFtData | Estrutura de dados do TPFt, que incluem as seguintes informações: <br />- `acronym`: A sigla do TPFt. <br />- `code`: O código único do TPFt. <br />- `maturityDate`: A data de vencimento do TPFt, representada como um valor numérico (timestamp Unix). |
| tpftAmount | uint256 | Quantidade de TPFt a ser negociada. Incluir as 2 casas decimais. |
| unitPrice | uint256 | Preço unitário do TPFt. Incluir as 8 casas decimais. |

