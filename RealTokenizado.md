# Solidity API

## RealTokenizado

Implementação do contrato do Real Tokenizado (DVt e MEt).

Este contrato herda do Real Digital e todas as funções implementadas. As funções de autoridade são designadas ao participante do piloto.

### participant

```solidity
string participant
```
_String_ que representa o nome do participante.

### cnpj8

```solidity
uint256 cnpj8
```
_Uitn256_ que representa o número da instituição.

### reserve

```solidity
address reserve
```
Carteira de reserva da instituição participante.


### constructor

```solidity
constructor(string _name, string _symbol, address _authority, address _admin, string _participant, uint256 _cnpj8, address _reserve) public
```

Construtor do token do Real Tokenizado.

Invoca o construtor do ERC20 e dá permissão de autoridade para a carteira do participante e admin para o BCB.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _name | string | Nome do token: RealTokenizado@CNPJ8 |
| _symbol | string | Símbolo do token: DREX@CNPJ8 |
| _authority | address | Carteira responsável por emitir, resgatar, mover e congelar fundos |
| _admin | address | Carteira responsável por administrar o controle de acessos (BCB) |
| _participant | string | Identificação do participante como string. |
| _cnpj8 | uint256 | Primeiros 8 digitos do CNPJ da instituição |
| _reserve | address | Carteira de reserva da instituição |


### updateReserve

```solidity
function updateReserve(address newReserve) public
```

Função para atualizar a carteira de reserva do token. A carteira de reserva é usada pelo DvP


#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| newReserve | address | Carteira da autoridade (Instituição) |

