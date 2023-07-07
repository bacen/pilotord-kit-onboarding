# Solidity API

## SwapOneStep

Este contrato implementa a troca de Real Tokenizado entre dois participantes distintos.

A troca destrói Real Tokenizado do cliente pagador,
transfere Real Digital do participante pagador para o participante recebedor
e emite Real Tokenizado para o cliente recebedor.

Todos os passos dessa operação de _swap_ são realizados em apenas uma transação.

### CBDC

```solidity
contract RealDigital CBDC
```

Referência ao contrato para que seja efetuada a movimentação de Real Digital.

### SwapExecuted

```solidity
event SwapExecuted(uint256 senderNumber, uint256 receiverNumber, address sender, address receiver, uint256 amount)
```

Evento de _swap_ executado.

#### Parameters

| Name           | Type    | Description                 |
| -------------- | ------- | --------------------------- |
| senderNumber   | uint256 | O CNPJ8 do pagador          |
| receiverNumber | uint256 | O CNPJ8 do recebedor        |
| sender         | address | A carteira do pagador       |
| receiver       | address | A carteira do recebedor     |
| amount         | uint256 | O valor que foi movimentado |

### constructor

```solidity
constructor(contract RealDigital _CBDC)
```

Constrói uma instância do contrato e armazena o endereço do contrato do Real Digital.

#### Parameters

| Name   | Type                 | Description                          |
| ------ | -------------------- | ------------------------------------ |
| \_CBDC | contract RealDigital | Endereço do contrato do Real Digital |

### executeSwap

```solidity
function executeSwap(contract RealTokenizado tokenSender, contract RealTokenizado tokenReceiver, address receiver, uint256 amount) public
```

Transfere o Real Tokenizado do cliente pagador para o recebedor. O cliente pagador é identificado pela carteira que estiver executando esta função.

#### Parameters

| Name          | Type                    | Description                                                         |
| ------------- | ----------------------- | ------------------------------------------------------------------- |
| tokenSender   | contract RealTokenizado | O endereço do contrato de Real Tokenizado do participante pagador   |
| tokenReceiver | contract RealTokenizado | O endereço do contrato de Real Tokenizado do participante recebedor |
| receiver      | address                 | O endereço do cliente recebedor                                     |
| amount        | uint256                 | O valor a ser movimentado                                           |
