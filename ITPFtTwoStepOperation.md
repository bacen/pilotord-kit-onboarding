# Solidity API

## ITPFtTwoStepOperation

Interface que adiciona funcionalidades específicas para operações de dois comandos com TPFt.

### OperationEvent

```solidity
event OperationEvent(uint256 operationId, uint256 cnpj8Sender, uint256 cnpj8Receiver, address sender, address receiver, struct ITPFt.TPFtData tpftData, uint256 tpftAmount, uint256 unitPrice, uint256 financialValue, string status, uint256 timestamp)
```

Evento emitido quando uma operação de trade é realizada entre participante envolvendo CNPJ8s.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| operationId | uint256 | Número de operação + data vigente no formato yyyyMMdd. |
| cnpj8Sender | uint256 | CNPJ8 do cedente da operação. |
| cnpj8Receiver | uint256 | CNPJ8 do cessionário da operação. |
| sender | address | Endereço do cedente da operação. |
| receiver | address | Endereço do cessionarário da operação. |
| tpftData | struct ITPFt.TPFtData | Estrutura de dados do TPFt, que incluem as seguintes informações: <br />- `acronym`: A sigla do TPFt. <br />- `code`: O código único do TPFt. <br />- `maturityDate`: A data de vencimento do TPFt, representada como um valor numérico (timestamp Unix). |
| tpftAmount | uint256 | Quantidade de TPFt a ser negociada. |
| unitPrice | uint256 | Preço unitário do TPFt. Incluindo as 8 casas decimais. |
| financialValue | uint256 | Calculado pela quantidade de TPFt a ser negociada vezes Preço unitário do TPFt. |
| status | string | Status da operação. |
| timestamp | uint256 | Valor numérico que indica um ponto específico no tempo fornecido em formato de timestamp Unix. |

### OperationTradeEvent

```solidity
event OperationTradeEvent(uint256 operationId, address sender, address receiver, struct ITPFt.TPFtData tpftData, uint256 tpftAmount, uint256 unitPrice, uint256 financialValue, string status, uint256 timestamp)
```

Evento emitido quando uma operação de trade é realizada entre participante envolvendo endereços.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| operationId | uint256 | Número de operação + data vigente no formato yyyyMMdd. |
| sender | address | Endereço do cedente da operação. |
| receiver | address | Endereço do cessionarário da operação. |
| tpftData | struct ITPFt.TPFtData | Estrutura de dados do TPFt, que incluem as seguintes informações: <br />- `acronym`: A sigla do TPFt. <br />- `code`: O código único do TPFt. <br />- `maturityDate`: A data de vencimento do TPFt, representada como um valor numérico (timestamp Unix). |
| tpftAmount | uint256 | Quantidade de TPFt a ser negociada. |
| unitPrice | uint256 | Preço unitário do TPFt. Incluindo as 8 casas decimais. |
| financialValue | uint256 | Calculado pela quantidade de TPFt a ser negociada vezes Preço unitário do TPFt. |
| status | string | Status da operação. |
| timestamp | uint256 | Valor numérico que indica um ponto específico no tempo fornecido em formato de timestamp Unix. |

### OperationClientTradeEvent

```solidity
event OperationClientTradeEvent(uint256 operationId, address sender, contract RealTokenizado senderToken, address receiver, contract RealTokenizado receiverToken, struct ITPFt.TPFtData tpftData, uint256 tpftAmount, uint256 unitPrice, uint256 financialValue, string status, uint256 timestamp)
```

Evento emitido quando uma operação de trade entre clientes é realizada envolvendo endereços e seus
Real Tokenizados.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| operationId | uint256 | Número de operação + data vigente no formato yyyyMMdd. |
| sender | address | Endereço da carteira do cedente da operação. |
| senderToken | contract RealTokenizado | RealTokenizado do cedente da operação. |
| receiver | address | Endereço da carteira do cessionário da operação. |
| receiverToken | contract RealTokenizado | RealTokenizado do cessionário da operação. |
| tpftData | struct ITPFt.TPFtData | Estrutura de dados do TPFt, que incluem as seguintes informações: <br />- `acronym`: A sigla do TPFt. <br />- `code`: O código único do TPFt. <br />- `maturityDate`: A data de vencimento do TPFt, representada como um valor numérico (timestamp Unix). |
| tpftAmount | uint256 | Quantidade de TPFt a ser negociada. |
| unitPrice | uint256 | Preço unitário do TPFt. Incluindo as 8 casas decimais. |
| financialValue | uint256 | Calculado pela quantidade de TPFt a ser negociada vezes Preço unitário do TPFt. |
| status | string | Status da operação. |
| timestamp | uint256 | Valor numérico que indica um ponto específico no tempo fornecido em formato de timestamp Unix. |

### OperationCancelEvent

```solidity
event OperationCancelEvent(uint256 operationId, string status, string reason, uint256 timestamp)
```

Evento emitido quando uma operação de liquidação de oferta pública ou compra e venda envolvendo TPFt é cancelada.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| operationId | uint256 | Número de operação + data vigente no formato yyyyMMdd. |
| status | string | Status da operação. |
| reason | string | Motivo do cancelamento. |
| timestamp | uint256 | Valor numérico que indica um ponto específico no tempo fornecido em formato de timestamp Unix. |

