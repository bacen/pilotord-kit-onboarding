# Solidity API

## RealDigitalDefaultAccount

Contrato que permite aos participantes trocarem sua carteira _default_.

### ACCESS_ROLE

```solidity
bytes32 ACCESS_ROLE
```

_Role_ de acesso pertencente à autoridade do contrato.


### CBDC

```solidity
contract RealDigital CBDC
```

Referência ao contrato do Real Digital para validação de participantes.


### defaultAccount

```solidity
mapping(uint256 => address) defaultAccount
```

_Mapping_ das contas default. Chave é o CPNJ8 do participante.


### onlyParticipant

```solidity
modifier onlyParticipant()
```

Modificador de método: somente participantes podem alterar suas carteiras _default_.


### constructor

```solidity
constructor(contract RealDigital token, address _authority, address _admin) public
```

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| token | contract RealDigital | Endereço do Real Digital |
| _authority | address | Autoridade do contrato. Adiciona carteiras default |
| _admin | address | Administrador do contrato. Permite trocar a autoridade |




### addDefaultAccount

```solidity
function addDefaultAccount(uint256 cnpj8, address wallet) public
```

Adiciona a primeira carteira _default_ para um participante. É permitido apenas para a autoridade. (BCB)

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| cnpj8 | uint256 | CNPJ8 do participante |
| wallet | address | Carteira |




### updateDefaultWallet

```solidity
function updateDefaultWallet(uint256 cnpj8, address newWallet) public
```

Permite ao participante trocar sua carteira _default_. Deve ser chamado a partir do endereço default.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| cnpj8 | uint256 | CNPJ8 do participante |
| newWallet | address | Carteira |

