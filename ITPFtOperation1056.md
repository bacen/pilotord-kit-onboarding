# Solidity API

## ITPFtOperation1056

Interface responsável por permitir que participantes cadastrados no 
Real Digital realizem a operação de recompra/revenda
envolvendo Título Público Federal tokenizado (TPFt).

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
O contrato em pausa bloqueará a execução de funções, garantindo que o contrato possa ser temporariamente interrompido.

### unpause

```solidity
function unpause() external
```

Função externa utilizada pela carteira que é detentor da _ROLE_ DEFAULT_ADMIN_ROLE para retirar o contrato de pausa.
O contrato retirado de pausa permite a execução normal de todas as funções novamente após ter sido previamente pausado.

