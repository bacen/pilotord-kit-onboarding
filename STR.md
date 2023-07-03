# Solidity API

## STR

Este contrato que simula o STR. Por meio dele, os participantes autorizados podem emitir Real Digital.

Para o piloto nenhuma validação é feita, bastando que o participante esteja autorizado.

### CBDC

```solidity
contract RealDigital CBDC
```

Referência ao contrato do Real Digital para checar se o participante é autorizado.

### onlyParticipant

```solidity
modifier onlyParticipant()
```

Modificador de método: somente participantes podem executar a função

### constructor

```solidity
constructor(contract RealDigital token) public
```

Constrói uma instância do contrato e armazena o endereço do Real Digital

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| token | contract RealDigital | Endereço do Real Digital |

### requestToMint

```solidity
function requestToMint(uint256 amount) modifier onlyParticipant() public
```

Emite a quantidade de Real Digital informada em _amount_ para a própria carteira executora desta função

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| amount | uint256 | Quantidade a ser emitida (obs: lembrar das 2 casas decimais) |

### requestToBurn

```solidity
function requestToBurn(uint256 amount) modifier onlyParticipant() public
```

Destrói a quantidade de Real Digital informada em _amount_ da própria carteira executora desta função

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| amount | uint256 | Quantidade a ser destruída (obs: lembrar das 2 casas decimais) |

