# Solidity API

## ApprovedDigitalCurrency

_Smart Contract_ utilitário para gerenciar que tokens podem ser usados nos contrato de _swap

### ACCESS_ROLE

```solidity
bytes32 ACCESS_ROLE
```

_Role_ que permite adicionar tokens na lista de tokens permitidos

### approvedDigitalCurrency

```solidity
mapping(address => bool) approvedDigitalCurrency
```

### constructor

```solidity
constructor(address _authority, address _admin) public
```

Construtor

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _authority | address | Autoridade do contrato, pode fazer todas as operações com o contrato |
| _admin | address | Administrador do contrato, pode trocar a autoridade do contrato caso seja necessário |

### setDigitalCurrencyApproval

```solidity
function setDigitalCurrencyApproval(address asset, bool approved) public
```

Habilita ou desabilita a operação de um token nos contratos de swap

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| asset | address | endereço do token |
| approved | bool | habilitado ou desabilitado |

