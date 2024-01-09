# Solidity API

## SwapTwoSteps

Este contrato implementa a troca de Real Tokenizado entre dois participantes distintos.

A troca destrói Real Tokenizado do cliente pagador, transfere Real Digital do participante pagador para o participante recebedor e emite Real Tokenizado para o cliente recebedor.

A operação de _swap_ implementada neste contrato é realizada em duas transações: uma de proposta e outra de aceite.

Este contrato parte da premissa que o participante pagador já aprovou a movimentação
de Real Digital e Real Tokenizado pelo contrato usando o método _approve_ do ERC20.

### CBDC

```solidity
contract RealDigital CBDC
```

Referência ao contrato para que seja efetuada a movimentação de Real Digital.

### SwapStatus

```solidity
enum SwapStatus {
  PENDING,          // Operação de _swap_ registrada, pendente de cancelamento ou execução.
  EXECUTED,         // Operação de _swap_ executada.
  CANCELLED         // Operação de _swap_ cancelada.
}
```

Enumeração com as possíveis situações de uma operação de _swap_.

### SwapProposal

```solidity
struct SwapProposal {
  contract RealTokenizado tokenSender;      // O endereço do contrato de Real Tokenizado do participante pagador
  contract RealTokenizado tokenReceiver;    // O endereço do contrato de Real Tokenizado do participante recebedor
  address sender;                           // O endereço da wallet do cliente pagador
  address receiver;                         // O endereço da wallet do cliente recebedor
  uint256 amount;                           // Quantidade de Reais a ser movimentada.
  enum SwapTwoSteps.SwapStatus status;      // Situação atual da operação.
  uint256 timestamp;
}
```

### swapProposals

```solidity
mapping(uint256 => struct SwapTwoSteps.SwapProposal) swapProposals
```

_Mapping_ de propostas de _swap_.

### SwapStarted

```solidity
event SwapStarted(uint256 indexed proposalId, uint256 indexed senderNumber, uint256 indexed receiverNumber, address sender, address receiver, uint256 amount)
```

Evento de início do _swap_.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| proposalId | uint256 | Id da proposta |
| senderNumber | uint256 | CNPJ8 do pagador |
| receiverNumber | uint256 | CNPJ8 do recebedor |
| sender | address | Endereço do pagador |
| receiver | address | Endereço do recebedor |
| amount | uint256 | Valor |

### SwapExecuted

```solidity
event SwapExecuted(uint256 indexed proposalId, uint256 indexed senderNumber, uint256 indexed receiverNumber, address sender, address receiver, uint256 amount)
```

Evento de _swap_ executado.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| proposalId | uint256 | Id da proposta |
| senderNumber | uint256 | CNPJ8 do pagador |
| receiverNumber | uint256 | CNPJ8 do recebedor |
| sender | address | Endereço do pagador |
| receiver | address | Endereço do recebedor |
| amount | uint256 | Valor |

### SwapCancelled

```solidity
event SwapCancelled(uint256 indexed proposalId, string reason)
```

Evento de _swap_ cancelado.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| proposalId | uint256 | Id da proposta |
| reason | string | Razão do cancelamento |

### ExpiredProposal

```solidity
event ExpiredProposal(uint256 indexed proposalId)
```

Evento de proposta expirada. A proposta expira em 1 minuto.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| proposalId | uint256 | Id da proposta |

### constructor

```solidity
constructor(address _admin, address _authority, contract RealDigital _CBDC) public
```

Construtor

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _admin | address | Administrador do contrato, pode trocar a autoridade do contrato caso seja necessário |
| _authority | address | Autoridade do contrato, pode fazer todas as operações com o token |
| _CBDC | contract RealDigital | Endereço do contrato do Real Digital |

### startSwap

```solidity
function startSwap(contract RealTokenizado tokenSender, contract RealTokenizado tokenReceiver, address receiver, uint256 amount) public
```

Cria a proposta de _swap_.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| tokenSender | contract RealTokenizado | Endereço do contrato de Real Tokenizado do pagador |
| tokenReceiver | contract RealTokenizado | Endereço do contrato de Real Tokenizado do recebedor |
| receiver | address | Endereço do cliente recebedor |
| amount | uint256 | Valor |

### executeSwap

```solidity
function executeSwap(uint256 proposalId) public
```

Aceita a proposta de _swap_, executável apenas pelo recebedor.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| proposalId | uint256 | Id da proposta |

### cancelSwap

```solidity
function cancelSwap(uint256 proposalId, string reason) public
```

Cancela a proposta. Pode ser executada tanto pelo pagador quanto pelo recebedor.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| proposalId | uint256 | Id da proposta |
| reason | string | Razão do cancelamento |

