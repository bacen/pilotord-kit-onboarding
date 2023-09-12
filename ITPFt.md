# Solidity API

## ITPFt

Interface responsável pela criação e emissão de Título Público Federal tokenizado (TPFt).

### FrozenBalance

```solidity
event FrozenBalance(address from, uint256 balance)
```

Evento emitido quando o saldo de uma carteira é congelado.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| from | address | Endereço da carteira que teve o saldo congelado. |
| balance | uint256 | Saldo de ativo congelado. |

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
function mint(address receiverAddress, struct ITPFt.TPFtData tpftData, uint256 tpftAmount) external
```

Função para emitir TPFt.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| receiverAddress | address | Endereço do cessionário da operação. Nesta operação sempre será o endereço da STN. |
| tpftData | struct ITPFt.TPFtData | Estrutura de dados do TPFt, que incluem as seguintes informações: <br />- `acronym`: A sigla do TPFt. <br />- `code`: O código único do TPFt. <br />- `maturityDate`: A data de vencimento do TPFt, representada como um valor numérico (timestamp Unix). |
| tpftAmount | uint256 | Quantidade de TPFt a ser emitida. |

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
| [0] | uint256 | Retorna o ID do título.  Se não existir um TPFt com as informações fornecidas, o valor retornado será 0. |

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

Função para pausar o token em casos necessários, bloqueando-o para todas as operações.

### unpause

```solidity
function unpause() external
```

Função para despausar o token em casos necessários, desbloqueando-o para todas as operações.

