# Solidity API

## TPFtOperation1012

_Smart Contract_ responsável por permitir que o Tesouro Nacional realize a operação de resgate de 
Títulos Públicos Federais tokenizados (TPFt) para um participante ou cliente que esteja cadastrado no Real Digital.

### RepaymentTPFtInfo

```solidity
struct RepaymentTPFtInfo {
  uint256 tpftId;
  uint256 tpftAmount;
  uint256 operationId;
  struct ITPFt.TPFtData tpftData;
  uint256 unitRepaymentPrice;
  uint256 financialRepaymentValue;
}
```

### constructor

```solidity
constructor(contract AddressDiscovery addressDiscovery_, address tpftFacadeContract_, contract TPFtOperationId tpftOperationIdContract_, contract TPFtRepaymentReserve tpftRepaymentReserve_) public
```

Inicializa o contrato TPFtOperation e concede a role REPAYMENT_ROLE para operações de resgate de TPFts.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| addressDiscovery_ | contract AddressDiscovery | Endereço do contrato que facilita a descoberta dos demais endereços de contratos. |
| tpftFacadeContract_ | address | Contrato TPFtFacade. |
| tpftOperationIdContract_ | contract TPFtOperationId | Contrato TPFtOperationId fornecendo funções utilitárias para operações TPFt. |
| tpftRepaymentReserve_ | contract TPFtRepaymentReserve | Endereço do contrato TPFtRepaymentReserve. |

### repayment

```solidity
function repayment(address sender, uint256 operationId, struct ITPFt.TPFtData tpftData, uint256 unitRepaymentPrice) external
```

Função que permite que o Tesouro Nacional realize a operação de resgate de TPFt para um participante ou cliente.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| sender | address | Endereço da carteira do cedente da operação. |
| operationId | uint256 | Número de operação + data vigente no formato yyyyMMdd. |
| tpftData | struct ITPFt.TPFtData | Estrutura de dados do TPFt, que incluem as seguintes informações: <br />- `acronym`: A sigla do TPFt. <br />- `code`: O código único do TPFt. <br />- `maturityDate`: A data de vencimento do TPFt, representada como um valor numérico (timestamp Unix). |
| unitRepaymentPrice | uint256 | Preço unitário de cada TPFt no momento do resgate. |

### _repaymentForParticipant

```solidity
function _repaymentForParticipant(address sender, address receiver, struct TPFtOperation1012.RepaymentTPFtInfo repaymentTPFtInfo, contract RealDigital realDigital) internal
```

Função interna para realizar o resgate de TPFt para a carteira de um participante, efetuando o pagamento em Real Digital.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| sender | address | Endereço da carteira do cedente da operação. |
| receiver | address | Endereço da carteira do cessionário da operação. |
| repaymentTPFtInfo | struct TPFtOperation1012.RepaymentTPFtInfo | Informações sobre o TPFt a ser resgatado. |
| realDigital | contract RealDigital | Contrato Real Digital usado para o pagamento. |

### _repaymentForClient

```solidity
function _repaymentForClient(address sender, address receiver, struct TPFtOperation1012.RepaymentTPFtInfo repaymentTPFtInfo, contract RealDigital realDigital, contract KeyDictionary keyDictionary, bytes32 key) internal
```

Função interna para processar o resgate de TPFt para a carteira de um cliente.
O fluxo de resgate depende da verificação das condições associadas ao cliente e ao contrato Real Tokenizado.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| sender | address | Endereço da carteira do cedente da operação. |
| receiver | address | Endereço da carteira do cessionário da operação. |
| repaymentTPFtInfo | struct TPFtOperation1012.RepaymentTPFtInfo | Informações sobre o TPFt a ser resgatado. |
| realDigital | contract RealDigital | Contrato Real Digital. |
| keyDictionary | contract KeyDictionary | Contrato KeyDictionary. |
| key | bytes32 | Chave associada ao cliente. |

### _repaymentForContract

```solidity
function _repaymentForContract(address sender, address receiver, struct TPFtOperation1012.RepaymentTPFtInfo repaymentTPFtInfo, contract RealDigital realDigital, string reason) internal
```

Função interna para realizar o resgate de TPFt para o contrato de resgate, efetuando o pagamento em Real Digital.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| sender | address | Endereço da carteira do cedente da operação. |
| receiver | address | Endereço da carteira do cessionário da operação. |
| repaymentTPFtInfo | struct TPFtOperation1012.RepaymentTPFtInfo | Informações sobre o TPFt a ser resgatado. |
| realDigital | contract RealDigital | Contrato Real Digital usado para o pagamento. |
| reason | string | Motivo de pagamento registrado no contrato de resgate. |

### _transferSwap

```solidity
function _transferSwap(address receiver, address swapToRetailAddress, uint256 financialRepaymentValue, contract RealDigital realDigital) internal
```

Função interna para realizar uma transferência de Real Digital a esse contrato e aumentar a 
autorização para o endereço de contrato SwapToRetail para receber fundos no valor de 
financialRepaymentValue.

_Esta função é utilizada para facilitar a troca de Real Digital por outros tokens de Real Tokenizado._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| receiver | address | Endereço da carteira do cessionário da operação. |
| swapToRetailAddress | address | Endereço do contrato SwapToRetailAddress para pagamento de Real Tokenizado ao cliente. |
| financialRepaymentValue | uint256 | Valor financeiro a ser transferido. |
| realDigital | contract RealDigital | Contrato Real Digital. |

### _handleRepaymentWithVerifiedAccount

```solidity
function _handleRepaymentWithVerifiedAccount(address sender, address receiver, struct TPFtOperation1012.RepaymentTPFtInfo repaymentTPFtInfo, contract RealDigital realDigital, contract RealTokenizado realTokenizado) internal
```

Função interna para realizar o resgate de TPFt para a carteira de um cliente, efetuando o pagamento em Real Tokenizado.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| sender | address | Endereço da carteira do cedente da operação. |
| receiver | address | Endereço da carteira do cessionário da operação. |
| repaymentTPFtInfo | struct TPFtOperation1012.RepaymentTPFtInfo | Informações sobre o TPFt a ser resgatado. |
| realDigital | contract RealDigital | Contrato Real Digital. |
| realTokenizado | contract RealTokenizado | Contrato Real Tokenizado. |

### _handleRepaymentWithoutVerifiedAccount

```solidity
function _handleRepaymentWithoutVerifiedAccount(address sender, address receiver, struct TPFtOperation1012.RepaymentTPFtInfo repaymentTPFtInfo, contract RealDigital realDigital, contract RealTokenizado realTokenizado) internal
```

Função interna para processar o resgate de TPFt para a carteira reserva do participante ao qual o cliente pertence.
O pagamento é efetuado em Real Digital se a conta da carteira reserva do participante estiver habilitada no Real Digital.
Caso contrário, o pagamento é realizado diretamente para o contrato de resgate.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| sender | address | Endereço da carteira do cedente da operação. |
| receiver | address | Endereço da carteira do cessionário da operação. |
| repaymentTPFtInfo | struct TPFtOperation1012.RepaymentTPFtInfo | Informações sobre o TPFt a ser resgatado. |
| realDigital | contract RealDigital | Contrato Real Digital. |
| realTokenizado | contract RealTokenizado | Contrato Real Tokenizado. |

### _burnTPFts

```solidity
function _burnTPFts(address sender, uint256 tpftId, uint256 tpftAmount) internal
```

Função interna para realizar a baixa do TPFt.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| sender | address | Endereço da carteira do cedente da operação. |
| tpftId | uint256 | Id do TPFt. |
| tpftAmount | uint256 | Quantidade de TPFt a ser negociada. Incluir as 2 casas decimais. |

### _validateRepayment

```solidity
function _validateRepayment(uint256 operationId, uint256 tpftId, uint256 tpftAmount, uint256 unitRepaymentPrice, address tpftFacadeContract) internal virtual
```

Função interna para validar a operação de resgate.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| operationId | uint256 | Número de operação + data vigente no formato yyyyMMdd. |
| tpftId | uint256 | Id do TPFt. |
| tpftAmount | uint256 | Quantidade de TPFt a ser negociada. Incluir as 2 casas decimais. |
| unitRepaymentPrice | uint256 | Preço unitário de cada TPFt no momento do resgate. |
| tpftFacadeContract | address |  |

### updateAddressDiscovery

```solidity
function updateAddressDiscovery(contract AddressDiscovery newAddressDiscovery) external
```

Função que atualiza o endereço do contrato AddressDiscovery

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| newAddressDiscovery | contract AddressDiscovery | novo endereço do AddressDiscovery |

### updateTpftFacadeContract

```solidity
function updateTpftFacadeContract(address newTPFTFacadeContract) external
```

Função que atualiza o endereço do contrato TPFtFacade

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| newTPFTFacadeContract | address | novo endereço do TPFtFacade |

### updateTpftOperationId

```solidity
function updateTpftOperationId(contract TPFtOperationId newTpftOperationIdContract) external
```

Função que atualiza o endereço do contrato TPFtOperationId

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| newTpftOperationIdContract | contract TPFtOperationId | novo endereço do TPFtOperationId |

### updateTpftRepaymentReserve

```solidity
function updateTpftRepaymentReserve(contract TPFtRepaymentReserve newTPFtRepaymentReserve) external
```

Função que atualiza o endereço do contrato TPFtRepaymentReserve

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| newTPFtRepaymentReserve | contract TPFtRepaymentReserve | novo endereço do TPFtRepaymentReserve |

