# Solidity API

## TPFtOperation1052

_Smart Contract_ responsável por permitir que participantes cadastrados no Real Digital 
realizem a operação de compra e venda envolvendo Título Público Federal tokenizado (TPFt) 
entre si e/ou seus clientes.

### constructor

```solidity
constructor(contract AddressDiscovery addressDiscovery_, contract ITPFt tpft_, contract ITPFtDvP tpftDvp_, contract TPFtOperationId tpftOperationId_) public
```

Inicializa o contrato TPFtTwoStepOperation, facilitando operações relacionadas a TPFts em duplo comando.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| addressDiscovery_ | contract AddressDiscovery | Endereço do contrato que facilita a descoberta dos demais endereços de contratos. |
| tpft_ | contract ITPFt | Contrato TPFtFacade. |
| tpftDvp_ | contract ITPFtDvP | Contrato TPFtDvP para operações de DvP. |
| tpftOperationId_ | contract TPFtOperationId | Contrato TPFtOperationId para utilidades relacionadas a TPFts. |

### trade

```solidity
function trade(uint256 operationId, uint256 cnpj8Sender, uint256 cnpj8Receiver, enum CallerPart callerPart, struct ITPFt.TPFtData tpftData, uint256 tpftAmount, uint256 unitPrice) external
```

Função externa que permite aos participantes realizarem a operação de compra e venda entre 
si informando os CNPJ8s das partes. O CNPJ8 identifica a carteira default da parte.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| operationId | uint256 | Número de operação + data vigente no formato yyyyMMdd. |
| cnpj8Sender | uint256 | CNPJ8 do cedente da operação. |
| cnpj8Receiver | uint256 | CNPJ8 do cessionário da operação. |
| callerPart | enum CallerPart | Parte que está transmitindo o comando da operação. Se for o cedente deve ser informado CallerPart.TPFtSender, se for o cessionário deve ser informado CallerPart.TPFtReceiver. |
| tpftData | struct ITPFt.TPFtData | Estrutura de dados do TPFt, que incluem as seguintes informações: <br />- `acronym`: A sigla do TPFt. <br />- `code`: O código único do TPFt. <br />- `maturityDate`: A data de vencimento do TPFt, representada como um valor numérico (timestamp Unix). |
| tpftAmount | uint256 | Quantidade de TPFt a ser negociada. Incluir as 2 casas decimais. |
| unitPrice | uint256 | Preço unitário do TPFt. Incluir as 8 casas decimais. |

### trade

```solidity
function trade(uint256 operationId, address sender, address receiver, enum CallerPart callerPart, struct ITPFt.TPFtData tpftData, uint256 tpftAmount, uint256 unitPrice) external
```

Função externa que permite aos participantes realizarem a operação de compra e venda entre si informando os endereços das carteiras das partes.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| operationId | uint256 | Número de operação + data vigente no formato yyyyMMdd. |
| sender | address | Endereço da carteira do cedente da operação. |
| receiver | address | Endereço da carteira do cessionário da operação. |
| callerPart | enum CallerPart | Parte que está transmitindo o comando da operação. Se for o cedente deve ser informado CallerPart.TPFtSender, se for o cessionário deve ser informado CallerPart.TPFtReceiver. |
| tpftData | struct ITPFt.TPFtData | Estrutura de dados do TPFt, que incluem as seguintes informações: <br />- `acronym`: A sigla do TPFt. <br />- `code`: O código único do TPFt. <br />- `maturityDate`: A data de vencimento do TPFt, representada como um valor numérico (timestamp Unix). |
| tpftAmount | uint256 | Quantidade de TPFt a ser negociada. Incluir as 2 casas decimais. |
| unitPrice | uint256 | Preço unitário do TPFt. Incluir as 8 casas decimais. |

### trade

```solidity
function trade(uint256 operationId, address sender, contract RealTokenizado senderToken, address receiver, contract RealTokenizado receiverToken, enum CallerPart callerPart, struct ITPFt.TPFtData tpftData, uint256 tpftAmount, uint256 unitPrice) external
```

Função externa que permite aos participantes e/ou clientes realizarem a operação de compra e venda entre si 
informando o endereço das carteiras das partes e do seu Real Tokenizado.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| operationId | uint256 | Número de operação + data vigente no formato yyyyMMdd. |
| sender | address | Endereço da carteira do cedente da operação. |
| senderToken | contract RealTokenizado | RealTokenizado do cedente da operação. |
| receiver | address | Endereço da carteira do cessionário da operação. |
| receiverToken | contract RealTokenizado | RealTokenizado do cessionário da operação. |
| callerPart | enum CallerPart | Parte que está transmitindo o comando da operação. Se for o cedente deve ser informado CallerPart.TPFtSender, se for o cessionário deve ser informado CallerPart.TPFtReceiver. |
| tpftData | struct ITPFt.TPFtData | Estrutura de dados do TPFt, que incluem as seguintes informações: <br />- `acronym`: A sigla do TPFt. <br />- `code`: O código único do TPFt. <br />- `maturityDate`: A data de vencimento do TPFt, representada como um valor numérico (timestamp Unix). |
| tpftAmount | uint256 | Quantidade de TPFt a ser negociada. Incluir as 2 casas decimais. |
| unitPrice | uint256 | Preço unitário do TPFt. Incluir as 8 casas decimais. |

### trade

```solidity
function trade(uint256 operationId, uint256 cnpj8Sender, uint256 cnpj8Receiver, enum CallerPart callerPart, struct ITPFt.TPFtData tpftData, uint256 tpftAmount, uint256 unitPrice, string noticeNumber) external
```

Função externa que permite aos participantes e o BACEN realizarem a operação de leilão de definitivas entre
si informando os CNPJ8s das partes. O CNPJ8 identifica a carteira default da parte.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| operationId | uint256 | Número de operação + data vigente no formato yyyyMMdd. |
| cnpj8Sender | uint256 | CNPJ8 do cedente da operação. |
| cnpj8Receiver | uint256 | CNPJ8 do cessionário da operação. |
| callerPart | enum CallerPart | Parte que está transmitindo o comando da operação. Se for o cedente deve ser informado CallerPart.TPFtSender, se for o cessionário deve ser informado CallerPart.TPFtReceiver. |
| tpftData | struct ITPFt.TPFtData | Estrutura de dados do TPFt, que incluem as seguintes informações: <br />- `acronym`: A sigla do TPFt. <br />- `code`: O código único do TPFt. <br />- `maturityDate`: A data de vencimento do TPFt, representada como um valor numérico (timestamp Unix). |
| tpftAmount | uint256 | Quantidade de TPFt a ser negociada. Incluir as 2 casas decimais. |
| unitPrice | uint256 | Preço unitário do TPFt. Incluir as 8 casas decimais. |
| noticeNumber | string | Número de comunicado. |

### cancel

```solidity
function cancel(uint256 operationId, string reason) external
```

Função externa que cancela uma operação de compra e venda envolvendo TPFt.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| operationId | uint256 | Número de operação + data vigente no formato yyyyMMdd. |
| reason | string | Motivo do cancelamento |

### pause

```solidity
function pause() external
```

Função externa utilizada pela carteira que é detentor da _ROLE_ DEFAULT_ADMIN_ROLE para colocar o contrato em pausa.
Apenas o detentor desse papel pode executar essa função, verificado pelo modificador "onlyRole(DEFAULT_ADMIN_ROLE)".
O contrato em pausa bloqueará a execução de funções, garantindo que o contrato possa ser temporariamente interrompido.

### unpause

```solidity
function unpause() external
```

Função externa utilizada pela carteira que é detentor da _ROLE_ DEFAULT_ADMIN_ROLE para retirar o contrato de pausa.
Apenas o detentor desse papel pode executar essa função, verificado pelo modificador "onlyRole(DEFAULT_ADMIN_ROLE)".
O contrato retirado de pausa permite a execução normal de todas as funções novamente após ter sido previamente pausado.

### updateAddressDiscovery

```solidity
function updateAddressDiscovery(contract AddressDiscovery newAddressDiscovery) external
```

Função externa que atualiza o endereço do contrato AddressDiscovery.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| newAddressDiscovery | contract AddressDiscovery | novo endereço do AddressDiscovery. |

### updateTPFt

```solidity
function updateTPFt(contract ITPFt newTPFt) external
```

Função externa que atualiza o endereço do contrato TPFtFacade.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| newTPFt | contract ITPFt | novo endereço do TPFtFacade. |

### updateTPFtDvP

```solidity
function updateTPFtDvP(contract ITPFtDvP newTPFtDvP) external
```

Função externa que atualiza o endereço do contrato TPFtDvP.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| newTPFtDvP | contract ITPFtDvP | novo endereço do TPFtDvP. |

### updateTPFtOperationId

```solidity
function updateTPFtOperationId(contract TPFtOperationId newTPFtOperationId) external
```

Função externa que atualiza o endereço do contrato TPFtOperationId.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| newTPFtOperationId | contract TPFtOperationId | novo endereço do TPFtOperationId. |

### _validSender

```solidity
function _validSender(enum CallerPart callerPart, address sender) internal view returns (bool)
```

Função interna que valida se a operação foi realizada por cedente válido.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| callerPart | enum CallerPart | Parte que está transmitindo o comando da operação. |
| sender | address | Endereço da carteira do cedente da operação. |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | Booleano que indica se a operação foi realizada por um cedente válido. |

### _getAuthorizedSender

```solidity
function _getAuthorizedSender(enum CallerPart callerPart, contract RealDigitalDefaultAccount realDigitalDefaultAccount) internal view returns (address sender, uint256 cnpj8Sender)
```

### _getAuthorizedReceiver

```solidity
function _getAuthorizedReceiver(enum CallerPart callerPart, uint256 cnpj8Receiver, contract RealDigitalDefaultAccount realDigitalDefaultAccount) internal view returns (address receiver)
```

### _validateReceiver

```solidity
function _validateReceiver(address receiver, contract RealDigitalDefaultAccount realDigitalDefaultAccount) internal view
```

### _validateCallerPart

```solidity
function _validateCallerPart(address wallet) internal view
```

### _customValidOperation

```solidity
function _customValidOperation(struct TPFtTwoStepOperation.OperationStepData) internal pure
```

Função interna que realiza validações personalizadas.

### getAddressDiscovery

```solidity
function getAddressDiscovery() public view returns (contract AddressDiscovery)
```

Função externa que retorna o endereço do contrato AddressDiscovery.

### getTPFt

```solidity
function getTPFt() public view returns (contract ITPFt)
```

Função externa que retorna o endereço do contrato TPFt.

### getTPFtDvP

```solidity
function getTPFtDvP() public view returns (contract ITPFtDvP)
```

Função externa que retorna o endereço do contrato TPFtDvP.

### getTPFtOperationId

```solidity
function getTPFtOperationId() public view returns (contract TPFtOperationId)
```

Função externa que retorna o endereço do contrato TPFtOperationId.

