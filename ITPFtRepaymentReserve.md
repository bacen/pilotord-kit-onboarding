# Solidity API

## ITPFtRepaymentReserve

Interface responsável por armazenar e realizar o pagamento de saldos de TPFt que não puderam ser resgatados.

### WithdrawalForParticipant

```solidity
event WithdrawalForParticipant(address sender, uint256 tpftId, struct ITPFt.TPFtData tpftData, uint256 operationId, uint256 financialRepaymentValue, string status, uint256 timestamp)
```

Evento emitido quando é realizado o saque do valor financeiro armazenado no contrato para um participante.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| sender | address | Endereço do cedente da operação. |
| tpftId | uint256 | Id do TPFt. |
| tpftData | struct ITPFt.TPFtData | Estrutura de dados do TPFt, que incluem as seguintes informações: <br />- `acronym`: A sigla do TPFt. <br />- `code`: O código único do TPFt. <br />- `maturityDate`: A data de vencimento do TPFt, representada como um valor numérico (timestamp Unix). |
| operationId | uint256 | Número de operação + data vigente no formato yyyyMMdd. |
| financialRepaymentValue | uint256 | Valor financeiro em Real Digital a ser pago ao cedente (participante) pela STN. |
| status | string | Status da operação. |
| timestamp | uint256 | Valor numérico que indica um ponto específico no tempo fornecido em formato de timestamp Unix. |

### WithdrawalForClient

```solidity
event WithdrawalForClient(address sender, uint256 tpftId, contract RealTokenizado senderToken, struct ITPFt.TPFtData tpftData, uint256 operationId, uint256 financialRepaymentValue, string status, uint256 timestamp)
```

Evento emitido quando é realizado o saque do valor financeiro armazenado no contrato para um cliente.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| sender | address | Endereço do cedente da operação. |
| tpftId | uint256 | Id do TPFt. |
| senderToken | contract RealTokenizado | RealTokenizado do cedente da operação. |
| tpftData | struct ITPFt.TPFtData | Estrutura de dados do TPFt, que incluem as seguintes informações: <br />- `acronym`: A sigla do TPFt. <br />- `code`: O código único do TPFt. <br />- `maturityDate`: A data de vencimento do TPFt, representada como um valor numérico (timestamp Unix). |
| operationId | uint256 | Número de operação + data vigente no formato yyyyMMdd. |
| financialRepaymentValue | uint256 | Valor financeiro em Real Tokenizado a ser pago ao cedente (cliente) pela STN. |
| status | string | Status da operação. |
| timestamp | uint256 | Valor numérico que indica um ponto específico no tempo fornecido em formato de timestamp Unix. |

### WithdrawalForParticipantByAuthority

```solidity
event WithdrawalForParticipantByAuthority(address sender, uint256 tpftId, struct ITPFt.TPFtData tpftData, uint256 operationId, uint256 financialRepaymentValue, string status, address newWallet, uint256 timestamp)
```

Evento emitido quando é realizado o saque do valor financeiro armazenado no contrato para um participante por uma carteira de autoridade.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| sender | address | Endereço do cedente da operação. |
| tpftId | uint256 | Id do TPFt. |
| tpftData | struct ITPFt.TPFtData | Estrutura de dados do TPFt, que incluem as seguintes informações: <br />- `acronym`: A sigla do TPFt. <br />- `code`: O código único do TPFt. <br />- `maturityDate`: A data de vencimento do TPFt, representada como um valor numérico (timestamp Unix). |
| operationId | uint256 | Número de operação + data vigente no formato yyyyMMdd. |
| financialRepaymentValue | uint256 | Valor financeiro em Real Tokenizado a ser pago ao cedente (cliente) pela STN. |
| status | string | Status da operação. |
| newWallet | address | Endereço da nova carteira que receberá o pagamento. |
| timestamp | uint256 | Valor numérico que indica um ponto específico no tempo fornecido em formato de timestamp Unix. |

### WithdrawalForClientByAuthority

```solidity
event WithdrawalForClientByAuthority(address sender, uint256 tpftId, contract RealTokenizado senderToken, struct ITPFt.TPFtData tpftData, uint256 operationId, uint256 financialRepaymentValue, string status, address newWallet, uint256 timestamp)
```

Evento emitido quando é realizado o saque do valor financeiro armazenado no contrato para um cliente por uma carteira de autoridade.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| sender | address | Endereço do cedente da operação. |
| tpftId | uint256 | Id do TPFt. |
| senderToken | contract RealTokenizado | RealTokenizado do cedente da operação. |
| tpftData | struct ITPFt.TPFtData | Estrutura de dados do TPFt, que incluem as seguintes informações: <br />- `acronym`: A sigla do TPFt. <br />- `code`: O código único do TPFt. <br />- `maturityDate`: A data de vencimento do TPFt, representada como um valor numérico (timestamp Unix). |
| operationId | uint256 | Número de operação + data vigente no formato yyyyMMdd. |
| financialRepaymentValue | uint256 | Valor financeiro em Real Tokenizado a ser pago ao cedente (cliente) pela STN. |
| status | string | Status da operação. |
| newWallet | address | Endereço da nova carteira que receberá o pagamento. |
| timestamp | uint256 | Valor numérico que indica um ponto específico no tempo fornecido em formato de timestamp Unix. |

### withdraw

```solidity
function withdraw(uint256 tpftId) external
```

Função que permite o saque do valor financeiro armazenado no contrato para um participante ou cliente.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| tpftId | uint256 | Id do TPFt associado à retirada. |

### withdrawFrom

```solidity
function withdrawFrom(uint256 tpftId, address from, address to) external
```

Função que permite que uma carteira de autoridade realize o saque do valor financeiro armazenado no contrato para um participante ou cliente. 
A autoridade deve indicar uma nova carteira de destino para receber o valor financeiro.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| tpftId | uint256 | Id do TPFt associado à retirada. |
| from | address | Endereço da carteira original com valor depositado. |
| to | address | Endereço da nova carteira que receberá o valor de resgate. |

### getBalance

```solidity
function getBalance(address to, uint256 tpftId) external view returns (uint256)
```

Função que permite a consulta de valor financeiro armazenado no contrato para um participante ou cliente.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| to | address | Endereço da carteira de participante ou cliente que possui o saldo. |
| tpftId | uint256 | Id do TPFt associado ao saldo. |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | Saldo de Real Digital armazenado para a carteira especificada. |

