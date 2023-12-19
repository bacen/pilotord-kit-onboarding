# Solidity API

## KeyDictionary

Contrato que representa a consulta de carteiras de clientes. É um contrato de simulação de um diretório de informações.

Este contrato será usado somente durante o piloto. Os métodos desse contrato podem ser chamados por qualquer endereço habilitado a receber CBDC.

### CBDC

```solidity
contract RealDigital CBDC
```

Referência para o contrato de Real Digital.

### CustomerData

```solidity
struct CustomerData {
  uint256 taxId;      // O CPF do cliente
  uint256 cnpj8       // O Cnpj8 do participante
  uint256 bankNumber; // O código da participante
  uint256 account;    // A conta do cliente
  uint256 branch;     // A agência do cliente   
  address wallet;     // A carteira do cliente
  bool registered;    // Registrado ou não
  address owner;      // A carteira do participante que inseriu o cliente
}
```

### KeyRequested

```solidity
event KeyRequested(address owner, uint256 proposalId, bytes32 key)
```

Evento de solicitação de troca de dono de chave.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| owner | address | O atual dono da chave |
| proposalId | uint256 | Id da proposta |
| key | bytes32 | A chave |

### onlyParticipant

```solidity
modifier onlyParticipant()
```

Modificador de método: somente participantes podem executar o método.


### constructor

```solidity
constructor(contract RealDigital token) public
```

Constrói uma instância do contrato e armazena o endereço do contrato do Real Digital.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| token | contract RealDigital | Endereço do contrato do Real Digital |



### addAccount

```solidity
function addAccount(bytes32 key, uint256 _taxId, uint256 _bankNumber, uint256 _account, uint256 _branch, address _wallet, uint256 _cnpj8) public
```

Adiciona os dados do cliente, vinculando à chave _key_.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| key | bytes32 | A chave |
| _taxId | uint256 | O CPF do cliente |
| _bankNumber | uint256 | O ID do participante |
| _account | uint256 | A conta do cliente |
| _branch | uint256 | A agência do cliente |
| _wallet | address | A carteira do cliente |
| _cnpj8 | uint256 | O Cnpj8 do participante |

### getWallet

```solidity
function getWallet(bytes32 key) public view returns (address)
```

Retorna a carteira do cliente com base na sua chave _key_.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| key | bytes32 | A chave cuja carteira está sendo buscada |


### getKey

```solidity
function getKey(address wallet) public view returns (bytes32)
```

Retorna a chave do cliente com base na sua carteira.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| wallet | address | A carteira do cliente |



### getCustomerData

```solidity
function getCustomerData(bytes32 key) public view returns (struct KeyDictionary.CustomerData)
```

Retorna todos os dados do cliente.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| key | bytes32 | A chave do cliente solicitado |

### updateData

```solidity
function updateData(bytes32 key, uint256 _taxId, uint256 _cnpj8, uint256 _bankNumber, uint256 _account, uint256 _branch, address _wallet) public
```

Atualiza os dados do cliente vinculado à chave _key_. Apenas o dono da carteira do participante ao qual o cliente vinculou sua chave pode alterar os dados por esta função.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| key | bytes32 | A nova chave do cliente |
| _taxId | uint256 | O novo CPF do cliente |
| _cnpj8 | uint256 | O Cnpj8 do participante |
| _bankNumber | uint256 | O novo ID do participante responsável pelo cliente |
| _account | uint256 | A nova conta do cliente |
| _branch | uint256 | A nova agência do cliente |
| _wallet | address | A nova carteira do cliente |

### requestKey

```solidity
function requestKey(bytes32 key, uint256 _taxId, uint256 _cnpj8, uint256 _bankNumber, uint256 _account, uint256 _branch, address _wallet) public
```

Requisita uma chave que pertence a outro participante.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| key | bytes32 | A chave requisitada |
| _taxId | uint256 | O CPF do cliente requisitante |
| _cnpj8 | uint256 | O Cnpj8 do participante |
| _bankNumber | uint256 | ID do participante responsável pelo cliente requisitante |
| _account | uint256 | A conta do cliente requisitante |
| _branch | uint256 | A agência do cliente requisitante |
| _wallet | address | A carteira do cliente requisitante |

### authorizeKey

```solidity
function authorizeKey(uint256 proposalId, bytes32 key) public
```

Autoriza a alteração de dados proposta pelo id _proposalId_ para a chave _key_.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| proposalId | uint256 | Id da proposta |
| key | bytes32 | A chave cujos dados serão alterados |

