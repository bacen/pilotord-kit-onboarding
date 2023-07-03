# Solidity API

## RealDigital


### frozenBalanceOf

```solidity
mapping(address => uint256) frozenBalanceOf
```

_Mapping_ das carteiras e respectivo valor congelado.

### FrozenBalance

```solidity
event FrozenBalance(address wallet, uint256 amount)
```

Evento emitido quando um valor de uma carteira é congelado.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| wallet | address | carteira que teve o fundo congelado |
| amount | uint256 | quantidade congelada |

### checkFrozenBalance

```solidity
modifier checkFrozenBalance(address from, uint256 amount)
```

_Modifier_ para verificar se um endereço possui fundos suficientes. Usado no `_beforeTokenTransfer`.

### constructor

```solidity
constructor(string _name, string _symbol, address _authority, address _admin) public
```

Construtor do token do Real Digital.

Invoca o construtor do ERC20 e dá permissão de autoridade para a carteira do BCB.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _name | string | Nome do token: Real Digital |
| _symbol | string | Símbolo do token: BRL |
| _authority | address | Carteira responsável por emitir, resgatar, mover e congelar fundos (BCB) |
| _admin | address | Carteira responsável por administrar o controle de acessos (BCB) |




### pause

```solidity
function pause() public
```

Função para pausar o token em casos necessários, bloqueando-o para todas as operações.

### unpause

```solidity
function unpause() public
```

Função para despausar o token em casos necessários, desbloqueando-o para todas as operações.

### mint

```solidity
function mint(address to, uint256 amount) public
```

Função para emitir tokens para as carteiras permitidas.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| to | address | carteira destino |
| amount | uint256 | quantidade de tokens |

### _beforeTokenTransfer

```solidity
function _beforeTokenTransfer(address from, address to, uint256 amount) internal
```

Gatilho executado sempre que é solicitada uma movimentação de token, inclusive na criação e destruição de tokens.

Condições de chamada:

- quando `from` é zero, `amount` tokens serão emitidos `to`.
- quando  `to` é zero, `amount` do `from` tokens serão destruídos.
- `from` e `to` nunca serão simultaneamente zero.
- `from` e `to` devem estar registrados como participantes.

### decimals

```solidity
function decimals() public view virtual returns (uint8)
```

Retorna o número de casas decimais utilizadas na representação do valor do token. Por exemplo, se `decimals` for igual a `2`, um saldo de `505` tokens deve ser apresentado como `5.05` (`505 / 10 ** 2`).

### move

```solidity
function move(address from, address to, uint256 amount) public
```

Função para mover tokens de uma carteira para outra. Somente quem possuir MOVER_ROLE pode executar.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| from | address | carteira origem |
| to | address | carteira destino |
| amount | uint256 | quantidade de tokens |

### increaseFrozenBalance

```solidity
function increaseFrozenBalance(address from, uint256 amount) public
```

Função para incrementar tokens parcialmente bloqueados de uma carteira. Somente quem possuir FREEZER_ROLE pode executar.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| from | address | carteira origem |
| amount | uint256 | quantidade de tokens |

### decreaseFrozenBalance

```solidity
function decreaseFrozenBalance(address from, uint256 amount) public
```

Função para decrementar tokens parcialmente bloqueados de uma carteira. Somente quem possuir FREEZER_ROLE pode executar.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| from | address | carteira origem |
| amount | uint256 | quantidade de tokens |

### burn

```solidity
function burn(uint256 amount) public
```

Destrói um determinado valor da carteira.

Veja {ERC20-_burn}._

### moveAndBurn

```solidity
function moveAndBurn(address from, uint256 amount) public
```

Função para destruir tokens de uma carteira. Somente quem possuir MOVER_ROLE pode executar.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| from | address | carteira origem |
| amount | uint256 | quantidade de tokens |

### burnFrom

```solidity
function burnFrom(address account, uint256 amount) public
```

Destrói `amount` tokens da  `account`, deduzindo alllowance do executor.
Olhe {ERC20-_burn} e {ERC20-allowance}.

Requerimentos:

- o executor deve possuir autorização de mover fundos da  `accounts` de no mínimo o
`amount`.

