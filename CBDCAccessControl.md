# Solidity API

## CBDCAccessControl

_Smart Contract_ responsável pela camada de controle de acesso para o Real Digital/Tokenizado.

Suas principais funcionalidades são:
- Determinar quais carteiras podem enviar/receber tokens.
- Controlar os papeis de qual endereço pode emitir/resgatar/congelar saldo de uma carteira.

### PAUSER_ROLE

```solidity
bytes32 PAUSER_ROLE
```

_Role_ que permite pausar o contrato.

### MINTER_ROLE

```solidity
bytes32 MINTER_ROLE
```

_Role_ que permite fazer o `mint` nos contratos de token.

### ACCESS_ROLE

```solidity
bytes32 ACCESS_ROLE
```

_Role_ que permite habilitar um endereço.

### MOVER_ROLE

```solidity
bytes32 MOVER_ROLE
```

_Role_ que permite acesso à função `move`, ou seja, transferir o token de outra carteira.

### BURNER_ROLE

```solidity
bytes32 BURNER_ROLE
```

_Role_ que permite acesso à função `burn`.

### FREEZER_ROLE

```solidity
bytes32 FREEZER_ROLE
```

_Role_ que permite bloquear saldo de uma carteira, por exemplo para o [_swap_ de dois passos](./SwapTwoSteps.md).

### authorizedAccounts

```solidity
mapping(address => bool) authorizedAccounts
```

_Mapping_ das contas autorizadas a receber o token.

### EnabledAccount

```solidity
event EnabledAccount(address member)
```

Evento de carteira habilitada.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| member | address | Carteira habilitada |

### DisabledAccount

```solidity
event DisabledAccount(address member)
```

Evento de carteira desabilitada.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| member | address | Carteira desabilitada |

### constructor

```solidity
constructor(address _authority, address _admin) internal
```

Constrói uma instância do contrato, armazenando os argumentos informados.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _authority | address | Autoridade do contrato, pode fazer todas as operações com o token |
| _admin | address | Administrador do contrato, pode trocar a autoridade do contrato caso seja necessário |

### checkAccess

```solidity
modifier checkAccess(address from, address to)
```

Modificador que checa se tanto o pagador quanto o recebedor estão habilitados a receber o token.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| from | address | Carteira do pagador |
| to | address | Carteira do recebedor |

### enableAccount

```solidity
function enableAccount(address member) public
```

Habilita a carteira a receber o token.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| member | address | Carteira a ser habilitada |

### disableAccount

```solidity
function disableAccount(address member) public
```

Desabilita a carteira.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| member | address | Carteira a ser desabilitada |

### verifyAccount

```solidity
function verifyAccount(address account) public view virtual returns (bool)
```

Checa se a carteira pode receber o token.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| account | address | Carteira a ser checada |

