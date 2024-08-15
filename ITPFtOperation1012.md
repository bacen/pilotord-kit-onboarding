# Solidity API

## ITPFtOperation1012

Interface responsável por permitir o resgate de Título Público Federal tokenizado (TPFt).

### OperationRepaymentParticipant

```solidity
event OperationRepaymentParticipant(address sender, uint256 tpftId, struct ITPFt.TPFtData tpftData, uint256 tpftAmount, uint256 operationId, uint256 unitRepaymentPrice, uint256 financialRepaymentValue, string status, uint256 timestamp)
```

Evento emitido quando uma operação de resgate é realizada para a carteira de um participante.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| sender | address | Endereço do cedente da operação. |
| tpftId | uint256 | Id do TPFt. |
| tpftData | struct ITPFt.TPFtData | Estrutura de dados do TPFt, que incluem as seguintes informações: <br />- `acronym`: A sigla do TPFt. <br />- `code`: O código único do TPFt. <br />- `maturityDate`: A data de vencimento do TPFt, representada como um valor numérico (timestamp Unix). |
| tpftAmount | uint256 | Quantidade de TPFt resgatada. |
| operationId | uint256 | Número de operação + data vigente no formato yyyyMMdd. |
| unitRepaymentPrice | uint256 | Preço unitário de cada TPFt ao momento do resgate. |
| financialRepaymentValue | uint256 | Valor financeiro em Real Digital a ser pago ao cedente (participante) pela STN. |
| status | string | Status da operação. |
| timestamp | uint256 | Valor numérico que indica um ponto específico no tempo fornecido em formato de timestamp Unix. |

### OperationRepaymentClient

```solidity
event OperationRepaymentClient(address sender, uint256 tpftId, contract RealTokenizado senderToken, struct ITPFt.TPFtData tpftData, uint256 operationId, uint256 tpftAmount, uint256 unitRepaymentPrice, uint256 financialRepaymentValue, string status, uint256 timestamp)
```

Evento emitido quando uma operação de resgate é realizada para a carteira de um cliente.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| sender | address | Endereço do cedente da operação. |
| tpftId | uint256 | Id do TPFt. |
| senderToken | contract RealTokenizado | RealTokenizado do cedente da operação. |
| tpftData | struct ITPFt.TPFtData | Estrutura de dados do TPFt, que incluem as seguintes informações: <br />- `acronym`: A sigla do TPFt. <br />- `code`: O código único do TPFt. <br />- `maturityDate`: A data de vencimento do TPFt, representada como um valor numérico (timestamp Unix). |
| operationId | uint256 | Número de operação + data vigente no formato yyyyMMdd. |
| tpftAmount | uint256 | Quantidade de TPFt resgatada. |
| unitRepaymentPrice | uint256 | Preço unitário de cada TPFt ao momento do resgate. |
| financialRepaymentValue | uint256 | Valor financeiro em Real Tokenizado a ser pago ao cedente (cliente) pela STN. |
| status | string | Status da operação. |
| timestamp | uint256 | Valor numérico que indica um ponto específico no tempo fornecido em formato de timestamp Unix. |

### OperationRepaymentWithReserve

```solidity
event OperationRepaymentWithReserve(address sender, uint256 tpftId, contract RealTokenizado senderToken, struct ITPFt.TPFtData tpftData, uint256 operationId, uint256 tpftAmount, uint256 unitRepaymentPrice, uint256 financialRepaymentValue, string status, address reserveAccount, uint256 timestamp)
```

Evento emitido quando uma operação de resgate é realizada para a carteira do participante 
associado ao cliente que não pode resgatar.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| sender | address | Endereço do cedente da operação. |
| tpftId | uint256 | Id do TPFt. |
| senderToken | contract RealTokenizado | RealTokenizado do cedente da operação. |
| tpftData | struct ITPFt.TPFtData | Estrutura de dados do TPFt, que incluem as seguintes informações: <br />- `acronym`: A sigla do TPFt. <br />- `code`: O código único do TPFt. <br />- `maturityDate`: A data de vencimento do TPFt, representada como um valor numérico (timestamp Unix). |
| operationId | uint256 | Número de operação + data vigente no formato yyyyMMdd. |
| tpftAmount | uint256 | Quantidade de TPFt resgatada. |
| unitRepaymentPrice | uint256 | Preço unitário de cada TPFt ao momento do resgate. |
| financialRepaymentValue | uint256 | Valor financeiro em Real Tokenizado a ser pago ao cedente (cliente) pela STN. |
| status | string | Status da operação. |
| reserveAccount | address | Endereço da carteira de reserva do participante. |
| timestamp | uint256 | Valor numérico que indica um ponto específico no tempo fornecido em formato de timestamp Unix. |

### OperationRepaymentForContract

```solidity
event OperationRepaymentForContract(address sender, uint256 tpftId, struct ITPFt.TPFtData tpftData, uint256 operationId, uint256 tpftAmount, uint256 unitRepaymentPrice, uint256 financialRepaymentValue, address contractAddress, string status, string reason, uint256 timestamp)
```

Evento emitido quando uma operação de resgate para um participante ou cliente é realizada no contrato TPFtRepaymentReserve.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| sender | address | Endereço do cedente da operação. |
| tpftId | uint256 | Id do TPFt. |
| tpftData | struct ITPFt.TPFtData | Estrutura de dados do TPFt, que incluem as seguintes informações: <br />- `acronym`: A sigla do TPFt. <br />- `code`: O código único do TPFt. <br />- `maturityDate`: A data de vencimento do TPFt, representada como um valor numérico (timestamp Unix). |
| operationId | uint256 | Número de operação + data vigente no formato yyyyMMdd. |
| tpftAmount | uint256 | Quantidade de TPFt resgatada. |
| unitRepaymentPrice | uint256 | Preço unitário de cada TPFt ao momento do resgate. |
| financialRepaymentValue | uint256 | Valor financeiro em Real Tokenizado a ser pago ao cedente (cliente) pela STN. |
| contractAddress | address | Endereço do contrato de resgate. |
| status | string | Status da operação. |
| reason | string | Motivo de pagamento no contrato de resgate. |
| timestamp | uint256 | Valor numérico que indica um ponto específico no tempo fornecido em formato de timestamp Unix. |

### repayment

```solidity
function repayment(address sender, uint256 operationId, struct ITPFt.TPFtData tpftData, uint256 unitRepaymentPrice) external
```

Função para o Tesouro Nacional realizar o pagamento de resgate na data de vencimento de um TPFt.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| sender | address | Endereço da carteira do cedente da operação. |
| operationId | uint256 | Número de operação + data vigente no formato yyyyMMdd. |
| tpftData | struct ITPFt.TPFtData | Estrutura de dados do TPFt, que incluem as seguintes informações: <br />- `acronym`: A sigla do TPFt. <br />- `code`: O código único do TPFt. <br />- `maturityDate`: A data de vencimento do TPFt, representada como um valor numérico (timestamp Unix). |
| unitRepaymentPrice | uint256 | Preço unitário de cada TPFt no momento do resgate. |

