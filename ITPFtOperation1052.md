# Solidity API

## ITPFtOperation1052

Interface responsável por permitir que participantes cadastrados no 
Real Digital realizem a operação de compra e venda envolvendo 
Título Público Federal tokenizado (TPFt) entre si e/ou clientes.

### trade

```solidity
function trade(uint256 operationId, uint256 cnpj8Sender, uint256 cnpj8Receiver, enum ITPFtOperation.CallerPart callerPart, struct ITPFt.TPFtData tpftData, uint256 tpftAmount, uint256 unitPrice) external
```

Função para os participantes realizarem a operação de compra e venda entre 
si informando os CNPJ8s das partes. O CNPJ8 identifica a carteira default da parte.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| operationId | uint256 | Número de operação + data vigente no formato yyyyMMdd. |
| cnpj8Sender | uint256 | CNPJ8 do cedente da operação. |
| cnpj8Receiver | uint256 | CNPJ8 do cessionário da operação. |
| callerPart | enum ITPFtOperation.CallerPart | Parte que está transmitindo o comando da operação. Se for o cedente deve ser informado CallerPart.TPFtSender, se for o cessionário deve ser informado CallerPart.TPFtReceiver. |
| tpftData | struct ITPFt.TPFtData | Estrutura de dados do TPFt, que incluem as seguintes informações: <br />- `acronym`: A sigla do TPFt. <br />- `code`: O código único do TPFt. <br />- `maturityDate`: A data de vencimento do TPFt, representada como um valor numérico (timestamp unix). Deve-se usar horário UTC+0 e não GMT+3/UTC-3 por exemplo.. |
| tpftAmount | uint256 | Quantidade de TPFt a ser negociada. Incluir as 2 casas decimais. |
| unitPrice | uint256 | Preço unitário do TPFt. Incluir as 8 casas decimais. |

### trade

```solidity
function trade(uint256 operationId, address sender, address receiver, enum ITPFtOperation.CallerPart callerPart, struct ITPFt.TPFtData tpftData, uint256 tpftAmount, uint256 unitPrice) external
```

Função para os participantes realizarem a operação de compra e venda entre si informando os endereços das carteiras das partes.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| operationId | uint256 | Número de operação + data vigente no formato yyyyMMdd. |
| sender | address | Endereço da carteira do cedente da operação. |
| receiver | address | Endereço da carteira do cessionário da operação. |
| callerPart | enum ITPFtOperation.CallerPart | Parte que está transmitindo o comando da operação. Se for o cedente deve ser informado CallerPart.TPFtSender, se for o cessionário deve ser informado CallerPart.TPFtReceiver. |
| tpftData | struct ITPFt.TPFtData | Estrutura de dados do TPFt, que incluem as seguintes informações: <br />- `acronym`: A sigla do TPFt. <br />- `code`: O código único do TPFt. <br />- `maturityDate`: A data de vencimento do TPFt, representada como um valor numérico (timestamp unix). Deve-se usar horário UTC+0 e não GMT+3/UTC-3 por exemplo.. |
| tpftAmount | uint256 | Quantidade de TPFt a ser negociada. Incluir as 2 casas decimais. |
| unitPrice | uint256 | Preço unitário do TPFt. Incluir as 8 casas decimais. |

