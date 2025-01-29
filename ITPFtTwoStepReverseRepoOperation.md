# Solidity API

## ITPFtTwoStepReverseRepoOperation

Interface que adiciona funcionalidades específicas para operações de recompra/revenda de dois comandos com TPFt.

### ReverseRepoOperationTradeReturnCNPJ8Event

```solidity
event ReverseRepoOperationTradeReturnCNPJ8Event(uint256 originalOperationId, uint256 returnOperationId, uint256 cnpj8Sender, uint256 cnpj8Receiver, address sender, address receiver, struct ITPFt.TPFtData tpftData, uint256 tpftAmount, uint256 returnUnitPrice, uint256 returnFinancialValue, string status, uint256 returnDate, uint256 timestamp)
```

Evento emitido quando uma operação de recompra/revenda 
é realizada entre participante envolvendo CNPJ8s.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| originalOperationId | uint256 | Número de operação de compra/venda compromissada + data vigente no formato yyyyMMdd. |
| returnOperationId | uint256 | Número de operação de recompra/revenda + data vigente no formato yyyyMMdd. |
| cnpj8Sender | uint256 | CNPJ8 do cedente da operação. |
| cnpj8Receiver | uint256 | CNPJ8 do cessionário da operação. |
| sender | address | Endereço do cedente da operação. |
| receiver | address | Endereço do cessionarário da operação. |
| tpftData | struct ITPFt.TPFtData | Estrutura de dados do TPFt, que incluem as seguintes informações: <br />- `acronym`: A sigla do TPFt. <br />- `code`: O código único do TPFt. <br />- `maturityDate`: A data de vencimento do TPFt, representada como um valor numérico (timestamp Unix). |
| tpftAmount | uint256 | Quantidade de TPFt a ser negociada. |
| returnUnitPrice | uint256 | Preço unitário de retorno do TPFt. Incluindo as 8 casas decimais. |
| returnFinancialValue | uint256 | Calculado pela quantidade de TPFt a ser negociada vezes Preço unitário de retorno do TPFt. |
| status | string | Status da operação. |
| returnDate | uint256 | Data de retorno da operação de recompra/revenda, representada como um valor numérico (timestamp Unix). |
| timestamp | uint256 | Valor numérico que indica um ponto específico no tempo fornecido em formato de timestamp Unix. |

### ReverseRepoOperationTradeReturnEvent

```solidity
event ReverseRepoOperationTradeReturnEvent(uint256 originalOperationId, uint256 returnOperationId, address sender, address receiver, struct ITPFt.TPFtData tpftData, uint256 tpftAmount, uint256 returnUnitPrice, uint256 returnFinancialValue, string status, uint256 returnDate, uint256 timestamp)
```

Evento emitido quando uma operação de recompra/revenda 
é realizada entre participante envolvendo endereços.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| originalOperationId | uint256 | Número de operação de compra/venda compromissada + data vigente no formato yyyyMMdd. |
| returnOperationId | uint256 | Número de operação de recompra/revenda + data vigente no formato yyyyMMdd. |
| sender | address | Endereço do cedente da operação. |
| receiver | address | Endereço do cessionarário da operação. |
| tpftData | struct ITPFt.TPFtData | Estrutura de dados do TPFt, que incluem as seguintes informações: <br />- `acronym`: A sigla do TPFt. <br />- `code`: O código único do TPFt. <br />- `maturityDate`: A data de vencimento do TPFt, representada como um valor numérico (timestamp Unix). |
| tpftAmount | uint256 | Quantidade de TPFt a ser negociada. |
| returnUnitPrice | uint256 | Preço unitário de retorno do TPFt. Incluindo as 8 casas decimais. |
| returnFinancialValue | uint256 | Calculado pela quantidade de TPFt a ser negociada vezes Preço unitário de retorno do TPFt. |
| status | string | Status da operação. |
| returnDate | uint256 | Data de retorno da operação de recompra/revenda, representada como um valor numérico (timestamp Unix). |
| timestamp | uint256 | Valor numérico que indica um ponto específico no tempo fornecido em formato de timestamp Unix. |

### ReverseRepoOperationTradeReturnParticipantClientEvent

```solidity
event ReverseRepoOperationTradeReturnParticipantClientEvent(uint256 originalOperationId, uint256 returnOperationId, address sender, contract RealTokenizado senderToken, address receiver, contract RealTokenizado receiverToken, struct ITPFt.TPFtData tpftData, uint256 tpftAmount, uint256 returnUnitPrice, uint256 returnFinancialValue, string status, uint256 returnDate, uint256 timestamp)
```

Evento emitido quando uma operação de recompra/revenda 
é realizada entre participante e cliente envolvendo endereços e Real Tokenizados.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| originalOperationId | uint256 | Número de operação de compra/venda compromissada + data vigente no formato yyyyMMdd. |
| returnOperationId | uint256 | Número de operação de recompra/revenda + data vigente no formato yyyyMMdd. |
| sender | address | Endereço do cedente da operação. |
| senderToken | contract RealTokenizado | RealTokenizado do cedente da operação. |
| receiver | address | Endereço do cessionarário da operação. |
| receiverToken | contract RealTokenizado | RealTokenizado do cessionário da operação. |
| tpftData | struct ITPFt.TPFtData | Estrutura de dados do TPFt, que incluem as seguintes informações: <br />- `acronym`: A sigla do TPFt. <br />- `code`: O código único do TPFt. <br />- `maturityDate`: A data de vencimento do TPFt, representada como um valor numérico (timestamp Unix). |
| tpftAmount | uint256 | Quantidade de TPFt a ser negociada. |
| returnUnitPrice | uint256 | Preço unitário de retorno do TPFt. Incluindo as 8 casas decimais. |
| returnFinancialValue | uint256 | Calculado pela quantidade de TPFt a ser negociada vezes Preço unitário de retorno do TPFt. |
| status | string | Status da operação. |
| returnDate | uint256 | Data de retorno da operação de recompra/revenda, representada como um valor numérico (timestamp Unix). |
| timestamp | uint256 | Valor numérico que indica um ponto específico no tempo fornecido em formato de timestamp Unix. |

### ReverseRepoOperationCancelEvent

```solidity
event ReverseRepoOperationCancelEvent(uint256 operationId, string status, string reason, uint256 timestamp)
```

Evento emitido quando uma operação de recompra/revenda
envolvendo TPFt é cancelada.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| operationId | uint256 | Número de operação de recompra/revenda + data vigente no formato yyyyMMdd. |
| status | string | Status da operação. |
| reason | string | Motivo do cancelamento. |
| timestamp | uint256 | Valor numérico que indica um ponto específico no tempo fornecido em formato de timestamp Unix. |

