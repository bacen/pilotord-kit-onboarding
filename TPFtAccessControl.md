# Solidity API

## TPFtAccessControl

_Smart Contract_ responsável pela camada de controle de acesso para as operações envolvendo Título Público Federal tokenizado (TPFt).

Suas principais funcionalidades são:
- Determinar quais carteiras podem criar e emitir TPFt,
- Controlar quais carteiras tem acesso as operações envolvendo TPFt.

### MINTER_ROLE

```solidity
bytes32 MINTER_ROLE
```

_Role_ que permite criar e emitir TPFt.

### DIRECT_PLACEMENT_ROLE

```solidity
bytes32 DIRECT_PLACEMENT_ROLE
```

_Role_ que permite realizar a operação de colocação direta.

### AUCTION_PLACEMENT_ROLE

```solidity
bytes32 AUCTION_PLACEMENT_ROLE
```

_Role_ que permite realizar a liquidação de oferta pública.

### FREEZER_ROLE

```solidity
bytes32 FREEZER_ROLE
```

_Role_ que permite bloquear saldo de uma carteira.

### REPAYMENT_ROLE

```solidity
bytes32 REPAYMENT_ROLE
```

_Role_ que permite realizar a operação de resgate.

### constructor

```solidity
constructor() public
```

Constrói uma instância do contrato e permite a carteira conceder ou revogar 
as roles para os participantes.

### allowTPFtMint

```solidity
function allowTPFtMint(address member) public
```

Habilita a carteira a criar e emitir TPFt.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| member | address | Carteira a ser habilitada |

### allowDirectPlacement

```solidity
function allowDirectPlacement(address member) public
```

Habilita a carteira a realizar a operação de colocação direta envolvendo TPFt.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| member | address | Carteira a ser habilitada |

### allowAuctionPlacement

```solidity
function allowAuctionPlacement(address member) public
```

Habilita a carteira a realizar a liquidação de oferta pública envolvendo TPFt.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| member | address | Carteira a ser habilitada |

### allowFreezingPlacement

```solidity
function allowFreezingPlacement(address member) public
```

Habilita a carteira a ter saldo de ativos bloqueados.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| member | address | Carteira a ser habilitada |

### enableAddress

```solidity
function enableAddress(address member) public
```

Habilita a carteira a operar no piloto Real Digital Selic.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| member | address | Carteira a ser habilitada |

### disableAddress

```solidity
function disableAddress(address member) public
```

Desabilita a carteira a operar no piloto Real Digital Selic.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| member | address | Carteira a ser desabilita |

### isEnabledAddress

```solidity
function isEnabledAddress(address member) public view returns (bool)
```

Verifica se a carteira está habilitada a operar no piloto Real Digital Selic.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| member | address | Carteira a ser verificada |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | Retorna um valor booleano que indica se a carteira está habilitada a operar no piloto Real Digital Selic. |

