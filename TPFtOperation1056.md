# Solidity API

## TPFtOperation1056

_Smart Contract_ responsável por permitir que participantes cadastrados no 
Real Digital realizem a operação de recompra/revenda
envolvendo Título Público Federal tokenizado (TPFt).

### constructor

```solidity
constructor(contract AddressDiscovery addressDiscovery_, contract ITPFt tpftContract_, contract TPFtOperationId tpftOperationId_, contract ITPFtDvP tpftDvP_, contract TPFtRepoStorage tpftRepoStorage_, contract DateTimeOracle dateTimeOracle_) public
```

Inicializa o contrato TPFtTwoStepReverseRepoOperation, facilitando operações relacionadas a TPFts em duplo comando.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| addressDiscovery_ | contract AddressDiscovery | Endereço do contrato que facilita a descoberta dos demais endereços de contratos. |
| tpftContract_ | contract ITPFt | Contrato TPFt. |
| tpftOperationId_ | contract TPFtOperationId | Contrato TPFtOperationId para utilidades relacionadas a TPFts. |
| tpftDvP_ | contract ITPFtDvP | Contrato TPFtDvP para operações de DvP. |
| tpftRepoStorage_ | contract TPFtRepoStorage | Contrato TPFtRepoStorage. |
| dateTimeOracle_ | contract DateTimeOracle | Contrato de Oráculo de Data. |

### tradeReverseRepo

```solidity
function tradeReverseRepo(uint256 originalOperationId, uint256 returnOperationId) external
```

Função para a execução da operação de recompra/revenda.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| originalOperationId | uint256 | Número de operação de compra/venda compromissada + data vigente no formato yyyyMMdd, já executada. |
| returnOperationId | uint256 | Número de operação de recompra/revenda + data vigente no formato yyyyMMdd. |

### tradeReverseRepoOpenReturnPrice

```solidity
function tradeReverseRepoOpenReturnPrice(uint256 originalOperationId, uint256 returnOperationId, uint256 returnUnitPrice) external
```

Função para a execução da operação de recompra/revenda com o preço unitário de retorno aberto.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| originalOperationId | uint256 | Número de operação de compra/venda compromissada + data vigente no formato yyyyMMdd, já executada. |
| returnOperationId | uint256 | Número de operação de recompra/revenda + data vigente no formato yyyyMMdd. |
| returnUnitPrice | uint256 | Preço unitário de retorno do TPFt. Incluindo as 8 casas decimais. |

### cancel

```solidity
function cancel(uint256 returnOperationId, string reason) external
```

Função para cancelar uma operação de recompra/revenda envolvendo TPFt.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| returnOperationId | uint256 | Número de operação de recompra/revenda + data vigente no formato yyyyMMdd. |
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

### updateTPFtRepoStorage

```solidity
function updateTPFtRepoStorage(contract TPFtRepoStorage newTPFtRepoStorage) external
```

Função que atualiza o endereço do contrato TPFtRepoStorage.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| newTPFtRepoStorage | contract TPFtRepoStorage | Novo endereço do contrato TPFtRepoStorage. |

### updateAddressDiscovery

```solidity
function updateAddressDiscovery(contract AddressDiscovery newAddressDiscovery) external
```

Função que atualiza o endereço do contrato AddressDiscovery.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| newAddressDiscovery | contract AddressDiscovery | Novo endereço do contrato AddressDiscovery. |

### updateTPFt

```solidity
function updateTPFt(address newTPFt) external
```

Função que atualiza o endereço do contrato TPFt.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| newTPFt | address | Novo endereço do contrato TPFt. |

### updateTPFtDvP

```solidity
function updateTPFtDvP(contract ITPFtDvP newTPFtDvP) external
```

Função que atualiza o endereço do contrato TPFtDvP.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| newTPFtDvP | contract ITPFtDvP | Novo endereço do contrato TPFtDvP. |

### updateTPFtOperationId

```solidity
function updateTPFtOperationId(contract TPFtOperationId newTPFtOperationId) external
```

Função que atualiza o endereço do contrato TPFtOperationId.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| newTPFtOperationId | contract TPFtOperationId | Novo endereço do contrato TPFtOperationId. |

### updateDateTimeOracle

```solidity
function updateDateTimeOracle(contract DateTimeOracle newDateTimeOracle) external
```

Função que atualiza o endereço do contrato DateTimeOracle.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| newDateTimeOracle | contract DateTimeOracle | Novo endereço do contrato DateTimeOracle. |

### getTPFtRepoStorage

```solidity
function getTPFtRepoStorage() public view returns (contract TPFtRepoStorage)
```

Função que retorna o endereço do contrato TPFtRepoStorage.

### getAddressDiscovery

```solidity
function getAddressDiscovery() public view returns (contract AddressDiscovery)
```

Função que retorna o endereço do contrato AddressDiscovery.

### getTPFt

```solidity
function getTPFt() public view returns (address)
```

Função que retorna o endereço do contrato TPFt.

### getTPFtDvP

```solidity
function getTPFtDvP() public view returns (contract ITPFtDvP)
```

Função que retorna o endereço do contrato TPFtDvP.

### getTPFtOperationId

```solidity
function getTPFtOperationId() public view returns (contract TPFtOperationId)
```

Função que retorna o endereço do contrato TPFtOperationId.

### getDateTimeOracle

```solidity
function getDateTimeOracle() external view returns (contract DateTimeOracle)
```

Função que retorna o endereço do contrato DateTimeOracle.

