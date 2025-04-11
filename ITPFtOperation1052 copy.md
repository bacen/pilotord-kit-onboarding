# Solidity API

## ITPFtOperation1052

Interface responsável por permitir que participantes cadastrados no 
Real Digital realizem a operação de compra e venda envolvendo 
Título Público Federal tokenizado (TPFt) entre si e/ou clientes.

### trade

```solidity
function trade(uint256 operationId, uint256 cnpj8Sender, uint256 cnpj8Receiver, enum CallerPart callerPart, struct ITPFt.TPFtData tpftData, uint256 tpftAmount, uint256 unitPrice) external
```

Função externa que permite aos participantes realizarem a operação de compra e venda entre 
si informando os CNPJ8s das partes. O CNPJ8 identifica a carteira default da parte.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| operationId | uint256 | Número de operação + data vigente no formato yyyyMMdd. |
| cnpj8Sender | uint256 | CNPJ8 do cedente da operação. |
| cnpj8Receiver | uint256 | CNPJ8 do cessionário da operação. |
| callerPart | enum CallerPart | Parte que está transmitindo o comando da operação. Se for o cedente deve ser informado CallerPart.TPFtSender, se for o cessionário deve ser informado CallerPart.TPFtReceiver. |
| tpftData | struct ITPFt.TPFtData | Estrutura de dados do TPFt, que incluem as seguintes informações: <br />- `acronym`: A sigla do TPFt. <br />- `code`: O código único do TPFt. <br />- `maturityDate`: A data de vencimento do TPFt, representada como um valor numérico (timestamp Unix). |
| tpftAmount | uint256 | Quantidade de TPFt a ser negociada. Incluir as 2 casas decimais. |
| unitPrice | uint256 | Preço unitário do TPFt. Incluir as 8 casas decimais. |

### trade

```solidity
function trade(uint256 operationId, address sender, address receiver, enum CallerPart callerPart, struct ITPFt.TPFtData tpftData, uint256 tpftAmount, uint256 unitPrice) external
```

Função externa que permite aos participantes realizarem a operação de compra e venda entre si informando os endereços das carteiras das partes.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| operationId | uint256 | Número de operação + data vigente no formato yyyyMMdd. |
| sender | address | Endereço da carteira do cedente da operação. |
| receiver | address | Endereço da carteira do cessionário da operação. |
| callerPart | enum CallerPart | Parte que está transmitindo o comando da operação. Se for o cedente deve ser informado CallerPart.TPFtSender, se for o cessionário deve ser informado CallerPart.TPFtReceiver. |
| tpftData | struct ITPFt.TPFtData | Estrutura de dados do TPFt, que incluem as seguintes informações: <br />- `acronym`: A sigla do TPFt. <br />- `code`: O código único do TPFt. <br />- `maturityDate`: A data de vencimento do TPFt, representada como um valor numérico (timestamp Unix). |
| tpftAmount | uint256 | Quantidade de TPFt a ser negociada. Incluir as 2 casas decimais. |
| unitPrice | uint256 | Preço unitário do TPFt. Incluir as 8 casas decimais. |

### trade

```solidity
function trade(uint256 operationId, address sender, contract RealTokenizado senderToken, address receiver, contract RealTokenizado receiverToken, enum CallerPart callerPart, struct ITPFt.TPFtData tpftData, uint256 tpftAmount, uint256 unitPrice) external
```

Função externa que permite aos participantes e/ou clientes realizarem a operação de compra e venda entre si 
informando o endereço das carteiras das partes e do seu Real Tokenizado.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| operationId | uint256 | Número de operação + data vigente no formato yyyyMMdd. |
| sender | address | Endereço da carteira do cedente da operação. |
| senderToken | contract RealTokenizado | RealTokenizado do cedente da operação. |
| receiver | address | Endereço da carteira do cessionário da operação. |
| receiverToken | contract RealTokenizado | RealTokenizado do cessionário da operação. |
| callerPart | enum CallerPart | Parte que está transmitindo o comando da operação. Se for o cedente deve ser informado CallerPart.TPFtSender, se for o cessionário deve ser informado CallerPart.TPFtReceiver. |
| tpftData | struct ITPFt.TPFtData | Estrutura de dados do TPFt, que incluem as seguintes informações: <br />- `acronym`: A sigla do TPFt. <br />- `code`: O código único do TPFt. <br />- `maturityDate`: A data de vencimento do TPFt, representada como um valor numérico (timestamp Unix). |
| tpftAmount | uint256 | Quantidade de TPFt a ser negociada. Incluir as 2 casas decimais. |
| unitPrice | uint256 | Preço unitário do TPFt. Incluir as 8 casas decimais. |

### trade

```solidity
function trade(uint256 operationId, uint256 cnpj8Sender, uint256 cnpj8Receiver, enum CallerPart callerPart, struct ITPFt.TPFtData tpftData, uint256 tpftAmount, uint256 unitPrice, string noticeNumber) external
```

Função externa que permite aos participantes e o BACEN realizarem a operação de leilão de definitivas entre
si informando os CNPJ8s das partes. O CNPJ8 identifica a carteira default da parte.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| operationId | uint256 | Número de operação + data vigente no formato yyyyMMdd. |
| cnpj8Sender | uint256 | CNPJ8 do cedente da operação. |
| cnpj8Receiver | uint256 | CNPJ8 do cessionário da operação. |
| callerPart | enum CallerPart | Parte que está transmitindo o comando da operação. Se for o cedente deve ser informado CallerPart.TPFtSender, se for o cessionário deve ser informado CallerPart.TPFtReceiver. |
| tpftData | struct ITPFt.TPFtData | Estrutura de dados do TPFt, que incluem as seguintes informações: <br />- `acronym`: A sigla do TPFt. <br />- `code`: O código único do TPFt. <br />- `maturityDate`: A data de vencimento do TPFt, representada como um valor numérico (timestamp Unix). |
| tpftAmount | uint256 | Quantidade de TPFt a ser negociada. Incluir as 2 casas decimais. |
| unitPrice | uint256 | Preço unitário do TPFt. Incluir as 8 casas decimais. |
| noticeNumber | string | Número de comunicado. |

### cancel

```solidity
function cancel(uint256 operationId, string reason) external
```

Função externa que cancela uma operação de compra e venda envolvendo TPFt.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| operationId | uint256 | Número de operação + data vigente no formato yyyyMMdd. |
| reason | string | Motivo do cancelamento |

### pause

```solidity
function pause() external
```

Função externa utilizada pela carteira que é detentor da _ROLE_ DEFAULT_ADMIN_ROLE para colocar o contrato em pausa.
O contrato em pausa bloqueará a execução de funções, garantindo que o contrato possa ser temporariamente interrompido.

### unpause

```solidity
function unpause() external
```

Função externa utilizada pela carteira que é detentor da _ROLE_ DEFAULT_ADMIN_ROLE para retirar o contrato de pausa.
O contrato retirado de pausa permite a execução normal de todas as funções novamente após ter sido previamente pausado.

