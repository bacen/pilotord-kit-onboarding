# Solidity API

## ITPFtOperation1054

Interface responsável por permitir que participantes cadastrados no 
Real Digital realizem a operação de compra/venda compromissada envolvendo Título Público Federal tokenizado (TPFt) entre si e/ou seus clientes.

### tradeRepo

```solidity
function tradeRepo(uint256 operationId, uint256 cnpj8Sender, uint256 cnpj8Receiver, enum CallerPart callerPart, struct ITPFt.TPFtData tpftData, uint256 tpftAmount, uint256 unitPrice, uint256 returnUnitPrice, uint256 returnDate) external
```

Função para os participantes realizarem a operação de compra/venda compromissada entre 
si informando os CNPJ8s das partes. O CNPJ8 identifica a carteira default da parte.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| operationId | uint256 | Número de operação de compra/venda compromissada + data vigente no formato yyyyMMdd. |
| cnpj8Sender | uint256 | CNPJ8 do cedente da operação. |
| cnpj8Receiver | uint256 | CNPJ8 do cessionário da operação. |
| callerPart | enum CallerPart | Parte que está transmitindo o comando da operação. Se for o cedente deve ser informado CallerPart.TPFtSender, se for o cessionário deve ser informado CallerPart.TPFtReceiver. |
| tpftData | struct ITPFt.TPFtData | Estrutura de dados do TPFt, que incluem as seguintes informações: <br />- `acronym`: A sigla do TPFt. <br />- `code`: O código único do TPFt. <br />- `maturityDate`: A data de vencimento do TPFt, representada como um valor numérico (timestamp Unix). |
| tpftAmount | uint256 | Quantidade de TPFt a ser negociada. Incluir as 2 casas decimais. |
| unitPrice | uint256 | Preço unitário do TPFt. Incluir as 8 casas decimais. |
| returnUnitPrice | uint256 | Preço unitário de retorno do TPFt. Incluindo as 8 casas decimais. |
| returnDate | uint256 | Data de retorno da operação de compra/venda compromissada, representada como um valor numérico (timestamp Unix). |

### tradeRepo

```solidity
function tradeRepo(uint256 operationId, address sender, address receiver, enum CallerPart callerPart, struct ITPFt.TPFtData tpftData, uint256 tpftAmount, uint256 unitPrice, uint256 returnUnitPrice, uint256 returnDate) external
```

Função para os participantes realizarem a operação de compra/venda compromissada 
entre si informando os endereços das carteiras das partes.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| operationId | uint256 | Número de operação de compra/venda compromissada + data vigente no formato yyyyMMdd. |
| sender | address | Endereço da carteira do cedente da operação. |
| receiver | address | Endereço da carteira do cessionário da operação. |
| callerPart | enum CallerPart | Parte que está transmitindo o comando da operação. Se for o cedente deve ser informado CallerPart.TPFtSender, se for o cessionário deve ser informado CallerPart.TPFtReceiver. |
| tpftData | struct ITPFt.TPFtData | Estrutura de dados do TPFt, que incluem as seguintes informações: <br />- `acronym`: A sigla do TPFt. <br />- `code`: O código único do TPFt. <br />- `maturityDate`: A data de vencimento do TPFt, representada como um valor numérico (timestamp Unix). |
| tpftAmount | uint256 | Quantidade de TPFt a ser negociada. Incluir as 2 casas decimais. |
| unitPrice | uint256 | Preço unitário do TPFt. Incluir as 8 casas decimais. |
| returnUnitPrice | uint256 | Preço unitário de retorno do TPFt. Incluindo as 8 casas decimais. |
| returnDate | uint256 | Data de retorno da operação de compra/venda compromissada, representada como um valor numérico (timestamp Unix). |

### tradeRepo

```solidity
function tradeRepo(uint256 operationId, address sender, contract RealTokenizado senderToken, address receiver, contract RealTokenizado receiverToken, enum CallerPart callerPart, struct ITPFt.TPFtData tpftData, uint256 tpftAmount, uint256 unitPrice, uint256 returnUnitPrice, uint256 returnDate) external
```

Função para participantes e clientes realizarem a operação de compra/venda compromissada  
entre si informando o endereço das carteiras das partes e do seu Real Tokenizado.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| operationId | uint256 | Número de operação de compra/venda compromissada + data vigente no formato yyyyMMdd. |
| sender | address | Endereço da carteira do cedente da operação. |
| senderToken | contract RealTokenizado | RealTokenizado do cedente da operação. |
| receiver | address | Endereço da carteira do cessionário da operação. |
| receiverToken | contract RealTokenizado | RealTokenizado do cessionário da operação. |
| callerPart | enum CallerPart | Parte que está transmitindo o comando da operação. Se for o cedente deve ser informado CallerPart.TPFtSender, se for o cessionário deve ser informado CallerPart.TPFtReceiver. |
| tpftData | struct ITPFt.TPFtData | Estrutura de dados do TPFt, que incluem as seguintes informações: <br />- `acronym`: A sigla do TPFt. <br />- `code`: O código único do TPFt. <br />- `maturityDate`: A data de vencimento do TPFt, representada como um valor numérico (timestamp Unix). |
| tpftAmount | uint256 | Quantidade de TPFt a ser negociada. Incluir as 2 casas decimais. |
| unitPrice | uint256 | Preço unitário do TPFt. Incluir as 8 casas decimais. |
| returnUnitPrice | uint256 | Preço unitário de retorno do TPFt. Incluindo as 8 casas decimais. |
| returnDate | uint256 | Data de retorno da operação de compra/venda compromissada, representada como um valor numérico (timestamp Unix). |

### tradeRepoIntraday

```solidity
function tradeRepoIntraday(uint256 operationId, uint256 cnpj8Sender, uint256 cnpj8Receiver, enum CallerPart callerPart, struct ITPFt.TPFtData tpftData, uint256 tpftAmount, uint256 unitPrice) external
```

Função para os participantes realizarem a operação de compra/venda compromissada intradiária entre 
si informando os CNPJ8s das partes. O CNPJ8 identifica a carteira default da parte.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| operationId | uint256 | Número de operação de compra/venda compromissada + data vigente no formato yyyyMMdd. |
| cnpj8Sender | uint256 | CNPJ8 do cedente da operação. |
| cnpj8Receiver | uint256 | CNPJ8 do cessionário da operação. |
| callerPart | enum CallerPart | Parte que está transmitindo o comando da operação. Se for o cedente deve ser informado CallerPart.TPFtSender, se for o cessionário deve ser informado CallerPart.TPFtReceiver. |
| tpftData | struct ITPFt.TPFtData | Estrutura de dados do TPFt, que incluem as seguintes informações: <br />- `acronym`: A sigla do TPFt. <br />- `code`: O código único do TPFt. <br />- `maturityDate`: A data de vencimento do TPFt, representada como um valor numérico (timestamp Unix). |
| tpftAmount | uint256 | Quantidade de TPFt a ser negociada. Incluir as 2 casas decimais. |
| unitPrice | uint256 | Preço unitário do TPFt. Incluir as 8 casas decimais. |

### tradeRepoIntraday

```solidity
function tradeRepoIntraday(uint256 operationId, address sender, address receiver, enum CallerPart callerPart, struct ITPFt.TPFtData tpftData, uint256 tpftAmount, uint256 unitPrice) external
```

Função para os participantes realizarem a operação de compra/venda compromissada intradiária 
entre si informando os endereços das carteiras das partes.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| operationId | uint256 | Número de operação de compra/venda compromissada + data vigente no formato yyyyMMdd. |
| sender | address | Endereço da carteira do cedente da operação. |
| receiver | address | Endereço da carteira do cessionário da operação. |
| callerPart | enum CallerPart | Parte que está transmitindo o comando da operação. Se for o cedente deve ser informado CallerPart.TPFtSender, se for o cessionário deve ser informado CallerPart.TPFtReceiver. |
| tpftData | struct ITPFt.TPFtData | Estrutura de dados do TPFt, que incluem as seguintes informações: <br />- `acronym`: A sigla do TPFt. <br />- `code`: O código único do TPFt. <br />- `maturityDate`: A data de vencimento do TPFt, representada como um valor numérico (timestamp Unix). |
| tpftAmount | uint256 | Quantidade de TPFt a ser negociada. Incluir as 2 casas decimais. |
| unitPrice | uint256 | Preço unitário do TPFt. Incluir as 8 casas decimais. |

### tradeRepoIntraday

```solidity
function tradeRepoIntraday(uint256 operationId, address sender, contract RealTokenizado senderToken, address receiver, contract RealTokenizado receiverToken, enum CallerPart callerPart, struct ITPFt.TPFtData tpftData, uint256 tpftAmount, uint256 unitPrice) external
```

Função para participantes e clientes realizarem a operação de compra/venda compromissada intradiária  
entre si informando o endereço das carteiras das partes e do seu Real Tokenizado.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| operationId | uint256 | Número de operação de compra/venda compromissada + data vigente no formato yyyyMMdd. |
| sender | address | Endereço da carteira do cedente da operação. |
| senderToken | contract RealTokenizado | RealTokenizado do cedente da operação. |
| receiver | address | Endereço da carteira do cessionário da operação. |
| receiverToken | contract RealTokenizado | RealTokenizado do cessionário da operação. |
| callerPart | enum CallerPart | Parte que está transmitindo o comando da operação. Se for o cedente deve ser informado CallerPart.TPFtSender, se for o cessionário deve ser informado CallerPart.TPFtReceiver. |
| tpftData | struct ITPFt.TPFtData | Estrutura de dados do TPFt, que incluem as seguintes informações: <br />- `acronym`: A sigla do TPFt. <br />- `code`: O código único do TPFt. <br />- `maturityDate`: A data de vencimento do TPFt, representada como um valor numérico (timestamp Unix). |
| tpftAmount | uint256 | Quantidade de TPFt a ser negociada. Incluir as 2 casas decimais. |
| unitPrice | uint256 | Preço unitário do TPFt. Incluir as 8 casas decimais. |

### tradeRepoOpenReturnPrice

```solidity
function tradeRepoOpenReturnPrice(uint256 operationId, uint256 cnpj8Sender, uint256 cnpj8Receiver, enum CallerPart callerPart, struct ITPFt.TPFtData tpftData, uint256 tpftAmount, uint256 unitPrice, uint256 returnDate) external
```

Função para os participantes realizarem a operação de compra/venda compromissada com o preço unitário de retorno aberto,
entre si informando os CNPJ8s das partes. O CNPJ8 identifica a carteira default da parte.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| operationId | uint256 | Número de operação de compra/venda compromissada + data vigente no formato yyyyMMdd. |
| cnpj8Sender | uint256 | CNPJ8 do cedente da operação. |
| cnpj8Receiver | uint256 | CNPJ8 do cessionário da operação. |
| callerPart | enum CallerPart | Parte que está transmitindo o comando da operação. Se for o cedente deve ser informado CallerPart.TPFtSender, se for o cessionário deve ser informado CallerPart.TPFtReceiver. |
| tpftData | struct ITPFt.TPFtData | Estrutura de dados do TPFt, que incluem as seguintes informações: <br />- `acronym`: A sigla do TPFt. <br />- `code`: O código único do TPFt. <br />- `maturityDate`: A data de vencimento do TPFt, representada como um valor numérico (timestamp Unix). |
| tpftAmount | uint256 | Quantidade de TPFt a ser negociada. Incluir as 2 casas decimais. |
| unitPrice | uint256 | Preço unitário do TPFt. Incluir as 8 casas decimais. |
| returnDate | uint256 | Data de retorno da operação de compra/venda compromissada, representada como um valor numérico (timestamp Unix). |

### tradeRepoOpenReturnPrice

```solidity
function tradeRepoOpenReturnPrice(uint256 operationId, address sender, address receiver, enum CallerPart callerPart, struct ITPFt.TPFtData tpftData, uint256 tpftAmount, uint256 unitPrice, uint256 returnDate) external
```

Função para os participantes realizarem a operação de compra/venda compromissada com o preço unitário de retorno aberto, 
entre si informando os endereços das carteiras das partes.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| operationId | uint256 | Número de operação de compra/venda compromissada + data vigente no formato yyyyMMdd. |
| sender | address | Endereço da carteira do cedente da operação. |
| receiver | address | Endereço da carteira do cessionário da operação. |
| callerPart | enum CallerPart | Parte que está transmitindo o comando da operação. Se for o cedente deve ser informado CallerPart.TPFtSender, se for o cessionário deve ser informado CallerPart.TPFtReceiver. |
| tpftData | struct ITPFt.TPFtData | Estrutura de dados do TPFt, que incluem as seguintes informações: <br />- `acronym`: A sigla do TPFt. <br />- `code`: O código único do TPFt. <br />- `maturityDate`: A data de vencimento do TPFt, representada como um valor numérico (timestamp Unix). |
| tpftAmount | uint256 | Quantidade de TPFt a ser negociada. Incluir as 2 casas decimais. |
| unitPrice | uint256 | Preço unitário do TPFt. Incluir as 8 casas decimais. |
| returnDate | uint256 | Data de retorno da operação de compra/venda compromissada, representada como um valor numérico (timestamp Unix). |

### tradeRepoOpenReturnPrice

```solidity
function tradeRepoOpenReturnPrice(uint256 operationId, address sender, contract RealTokenizado senderToken, address receiver, contract RealTokenizado receiverToken, enum CallerPart callerPart, struct ITPFt.TPFtData tpftData, uint256 tpftAmount, uint256 unitPrice, uint256 returnDate) external
```

Função para participantes e clientes realizarem a operação de compra/venda compromissada com o preço unitário de retorno aberto, 
entre si informando o endereço das carteiras das partes e do seu Real Tokenizado.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| operationId | uint256 | Número de operação de compra/venda compromissada + data vigente no formato yyyyMMdd. |
| sender | address | Endereço da carteira do cedente da operação. |
| senderToken | contract RealTokenizado | RealTokenizado do cedente da operação. |
| receiver | address | Endereço da carteira do cessionário da operação. |
| receiverToken | contract RealTokenizado | RealTokenizado do cessionário da operação. |
| callerPart | enum CallerPart | Parte que está transmitindo o comando da operação. Se for o cedente deve ser informado CallerPart.TPFtSender, se for o cessionário deve ser informado CallerPart.TPFtReceiver. |
| tpftData | struct ITPFt.TPFtData | Estrutura de dados do TPFt, que incluem as seguintes informações: <br />- `acronym`: A sigla do TPFt. <br />- `code`: O código único do TPFt. <br />- `maturityDate`: A data de vencimento do TPFt, representada como um valor numérico (timestamp Unix). |
| tpftAmount | uint256 | Quantidade de TPFt a ser negociada. Incluir as 2 casas decimais. |
| unitPrice | uint256 | Preço unitário do TPFt. Incluir as 8 casas decimais. |
| returnDate | uint256 | Data de retorno da operação de compra/venda compromissada, representada como um valor numérico (timestamp Unix). |

### setDefault

```solidity
function setDefault(uint256 operationId, string reason) external
```

Função para indicar que o compromisso de uma operação de compra/venda compromissada não foi honrado.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| operationId | uint256 | Número de operação de compra/venda compromissada + data vigente no formato yyyyMMdd. |
| reason | string | Motivo do envio para status default. |

### cancel

```solidity
function cancel(uint256 operationId, string reason) external
```

Função para cancelar uma operação de compra/venda compromissada envolvendo TPFt.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| operationId | uint256 | Número de operação de compra/venda compromissada + data vigente no formato yyyyMMdd. |
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

