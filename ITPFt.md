# Solidity API

## ITPFt

Interface responsável pela criação e emissão de Título Público Federal tokenizado (TPFt).

### TPFtData

```solidity
struct TPFtData {
  string acronym;
  string code;
  uint256 maturityDate;
}
```

### OnlyMinterContract

```solidity
error OnlyMinterContract()
```

Erro lançado porque a ação só pode ser realizada pelo contrato de colocação direta de TPFts.

### OnlyDirectPlacementContract

```solidity
error OnlyDirectPlacementContract()
```

Erro lançado porque a ação só pode ser realizada pelo contrato de colocação direta de TPFts.

### name

```solidity
function name() external view returns (string)
```

Função externa que retorna o nome do token.

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | string | Retorna uma string contendo o nome do token. |

### getTPFtId

```solidity
function getTPFtId(struct ITPFt.TPFtData tpftData) external view returns (uint256)
```

Função para obter o ID do título.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| tpftData | struct ITPFt.TPFtData | Estrutura de dados do TPFt, que incluem as seguintes informações: <br />- `acronym`: A sigla do TPFt. <br />- `code`: O código único do TPFt. <br />- `maturityDate`: A data de vencimento do TPFt, representada como um valor numérico (timestamp Unix). |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | Retorna o ID do título. 
 Se não existir um TPFt com as informações fornecidas, o valor retornado será 0. |

### createTPFt

```solidity
function createTPFt(struct ITPFt.TPFtData tpftData) external
```

Função para criar um novo TPFt.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| tpftData | struct ITPFt.TPFtData | Estrutura de dados do TPFt, que incluem as seguintes informações: <br />- `acronym`: A sigla do TPFt. <br />- `code`: O código único do TPFt. <br />- `maturityDate`: A data de vencimento do TPFt, representada como um valor numérico (timestamp Unix). |

### mint

```solidity
function mint(address receiverAddress, uint256 tpftId, uint256 tpftAmount) external
```

Função para emitir TPFt.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| receiverAddress | address | Endereço do cessionário da operação. Nesta operação sempre será o endereço da STN. |
| tpftId | uint256 | Id do TPFt |
| tpftAmount | uint256 | Quantidade de TPFt a ser emitida. |

### mint

```solidity
function mint(address receiverAddress, struct ITPFt.TPFtData tpftData, uint256 tpftAmount) external
```

Função para emitir TPFt.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| receiverAddress | address | Endereço do cessionário da operação. Nesta operação sempre será o endereço da STN. |
| tpftData | struct ITPFt.TPFtData | Estrutura de dados do TPFt, que incluem as seguintes informações: <br />- `acronym`: A sigla do TPFt. <br />- `code`: O código único do TPFt. <br />- `maturityDate`: A data de vencimento do TPFt, representada como um valor numérico (timestamp Unix). |
| tpftAmount | uint256 | Quantidade de TPFt a ser emitida. |

### directPlacement

```solidity
function directPlacement(address from, address to, struct ITPFt.TPFtData tpftData, uint256 tpftAmount) external
```

Função para realizar uma operação de colocação direta de TPFt.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| from | address | Endereço da carteira de origem da operação de colocação direta. |
| to | address | Endereço da carteira de destino da operação de colocação direta. |
| tpftData | struct ITPFt.TPFtData | Estrutura de dados do TPFt, que incluem as seguintes informações: <br />- `acronym`: A sigla do TPFt. <br />- `code`: O código único do TPFt. <br />- `maturityDate`: A data de vencimento do TPFt, representada como um valor numérico (timestamp Unix). |
| tpftAmount | uint256 | Quantidade de TPFt a ser enviada na operação de colocação direta. |

### balanceOf

```solidity
function balanceOf(address wallet, uint256 tpftId) external view returns (uint256)
```

Função externa que consulta o saldo de um título vencimento (TPFt) na carteira informada.


### decimals

```solidity
function decimals() external view returns (uint256)
```

Função externa para obter o número de casas decimais do TPFt.

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | Número de casas decimais que para o TPFt será de 2. |

### increaseFrozenBalance

```solidity
function increaseFrozenBalance(address from, struct ITPFt.TPFtData tpftData, uint256 tpftAmount) external
```

Função para incrementar tokens parcialmente bloqueados de uma carteira. Somente quem possuir FREEZER_ROLE pode executar.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| from | address | Endereço da carteira que os ativos serão bloqueados. |
| tpftData | struct ITPFt.TPFtData | Estrutura de dados do TPFt, que incluem as seguintes informações: <br />- `acronym`: A sigla do TPFt. <br />- `code`: O código único do TPFt. <br />- `maturityDate`: A data de vencimento do TPFt, representada como um valor numérico (timestamp Unix). |
| tpftAmount | uint256 | Quantidade de TPFt. |

### decreaseFrozenBalance

```solidity
function decreaseFrozenBalance(address from, struct ITPFt.TPFtData tpftData, uint256 tpftAmount) external
```

Função para decrementar tokens parcialmente bloqueados de uma carteira. Somente quem possuir FREEZER_ROLE pode executar.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| from | address | Endereço da carteira que os ativos serão desbloqueados. |
| tpftData | struct ITPFt.TPFtData | Estrutura de dados do TPFt, que incluem as seguintes informações: <br />- `acronym`: A sigla do TPFt. <br />- `code`: O código único do TPFt. <br />- `maturityDate`: A data de vencimento do TPFt, representada como um valor numérico (timestamp Unix). |
| tpftAmount | uint256 | Quantidade de TPFt. |

### pause

```solidity
function pause() external
```

Função externa utilizada pelo Bacen que é detentor da _ROLE_ DEFAULT_ADMIN_ROLE para colocar o contrato em pausa.
Apenas o detentor desse papel pode executar essa função, verificado pelo modificador "onlyRole(DEFAULT_ADMIN_ROLE)".
O contrato em pausa bloqueará a execução de funções, garantindo que o contrato possa ser temporariamente interrompido.

### unpause

```solidity
function unpause() external
```

Função externa utilizada pelo Bacen que é detentor da _ROLE_ DEFAULT_ADMIN_ROLE para retirar o contrato de pausa.
Apenas o detentor desse papel pode executar essa função, verificado pelo modificador "onlyRole(DEFAULT_ADMIN_ROLE)".
O contrato retirado de pausa permite a execução normal de todas as funções novamente após ter sido previamente pausado.

### setPaymentStatus

```solidity
function setPaymentStatus(address account, uint256 tpftId, bool status) external
```

Função externa que permite definir o status de pagamento para um determinado endereço da carteira e ID de TPFt.
Apenas contas com a Role REPAYMENT_ROLE têm permissão para utilizar esta função.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| account | address | Endereço da carteira para o qual o status de pagamento será definido. |
| tpftId | uint256 | ID do TPFt para o qual o status de pagamento será definido. |
| status | bool | Status de pagamento a ser definido (verdadeiro para pago, falso para não pago). |

### getPaymentStatus

```solidity
function getPaymentStatus(address account, uint256 tpftId) external view returns (bool)
```

Função externa que retorna o status de pagamento para um determinado endereço da carteira e ID de TPFt.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| account | address | Endereço da carteira para a qual o status de pagamento está sendo consultado. |
| tpftId | uint256 | ID do TPFt para o qual o status de pagamento está sendo consultado. |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | Retorna true se o pagamento foi efetuado, false se não foi. |

### setTpftIdToPaused

```solidity
function setTpftIdToPaused(uint256 tpftId, bool status) external
```

Função externa que permite definir o status de pausa para um determinado ID de TPFt.
Apenas contas com a Role REPAYMENT_ROLE têm permissão para utilizar esta função.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| tpftId | uint256 | ID do TPFt para o qual o status de pausa será ajustado. |
| status | bool | Status de pausa a ser definido (verdadeiro para pausado, falso para não pausado). |

### isTpftIdPaused

```solidity
function isTpftIdPaused(uint256 tpftId) external view returns (bool)
```

Função externa que retorna o status de pausa para um determinado ID de TPFt.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| tpftId | uint256 | ID do TPFt para o qual o status de pausa está sendo consultado. |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | Retorna true se o TPFt está pausado para operações, false se não está. |

### burn

```solidity
function burn(address from, uint256 tpftId, uint256 tpftAmount) external
```

Função para realizar a baixa de um TPFt pelo seu ID.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| from | address | Endereço da carteira que será realizada a baixa do TPFt. |
| tpftId | uint256 | ID do TPFt. |
| tpftAmount | uint256 | Quantidade de TPFt a ser realizada a baixa. |

### burn

```solidity
function burn(address from, struct ITPFt.TPFtData tpftData, uint256 tpftAmount) external
```

Função para realizar a baixa de um TPFt pelo TPFtData.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| from | address | Endereço da carteira que será realizada a baixa do TPFt. |
| tpftData | struct ITPFt.TPFtData | Estrutura de dados do TPFt, que incluem as seguintes informações: <br />- `acronym`: A sigla do TPFt. <br />- `code`: O código único do TPFt. <br />- `maturityDate`: A data de vencimento do TPFt, representada como um valor numérico (timestamp Unix). |
| tpftAmount | uint256 | Quantidade de TPFt a ser realizada a baixa. |

