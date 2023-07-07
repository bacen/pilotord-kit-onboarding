# Solidity API

## AddressDiscovery

_Smart Contract_ utilitário para facilitar a descoberta dos demais endereços de contratos na rede do Piloto RD.

### ACCESS_ROLE

```solidity
bytes32 ACCESS_ROLE
```

_Role_ de acesso, pertencente a autoridade do contrato.

### addressDiscovery

```solidity
mapping(bytes32 => address) addressDiscovery
```

_Mapping_ do endereço dos contratos, a chave é o hash keccak256 do nome do contrato.

### constructor

```solidity
constructor(address _authority, address _admin)
```

Construtor

#### Parameters

| Name        | Type    | Description                                                        |
| ----------- | ------- | ------------------------------------------------------------------ |
| \_authority | address | Autoridade do contrato, pode atualizar os endereços dos contratos. |
| \_admin     | address | Administrador, pode trocar a autoridade.                           |

### updateAddress

```solidity
function updateAddress(bytes32 smartContract, address newAddress) public
```

Atualiza o endereço de um contrato, permitido apenas para a autoridade.

#### Parameters

| Name          | Type    | Description                         |
| ------------- | ------- | ----------------------------------- |
| smartContract | bytes32 | Hash keccak256 do nome do contrato. |
| newAddress    | address | Novo endereço do contrato.          |
