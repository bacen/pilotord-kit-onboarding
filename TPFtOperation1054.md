# Solidity API

## TPFtOperation1054

_Smart Contract_ responsável por permitir que participantes cadastrados no Real Digital 
realizem a operação de compra/venda compromissada envolvendo Título Público Federal tokenizado (TPFt) entre si e/ou seus clientes.

### constructor

```solidity
constructor(contract AddressDiscovery addressDiscovery_, contract ITPFt tpftContract_, contract TPFtOperationId tpftOperationId_, contract ITPFtDvP tpftDvP_, contract TPFtRepoStorage tpftRepoStorage_, contract DateTimeOracle dateTimeOracle_) public
```

Inicializa o contrato TPFtTwoStepRepoOperation, facilitando operações relacionadas a TPFts em duplo comando.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| addressDiscovery_ | contract AddressDiscovery | Endereço do contrato que facilita a descoberta dos demais endereços de contratos. |
| tpftContract_ | contract ITPFt | Contrato TPFt. |
| tpftOperationId_ | contract TPFtOperationId | Contrato TPFtOperationId para utilidades relacionadas a TPFts. |
| tpftDvP_ | contract ITPFtDvP | Contrato TPFtDvP para operações de DvP. |
| tpftRepoStorage_ | contract TPFtRepoStorage | Contrato TPFtRepoStorage. |
| dateTimeOracle_ | contract DateTimeOracle | Contrato de Oráculo de Data. |

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

Função para os participantes realizarem a operação de compra/venda compromissada intradiária  
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

Função para cancelar uma operação de compra/venda compromissada  envolvendo TPFt.

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
Apenas o detentor desse papel pode executar essa função, verificado pelo modificador "onlyRole(DEFAULT_ADMIN_ROLE)".
O contrato em pausa bloqueará a execução de funções, garantindo que o contrato possa ser temporariamente interrompido.

### unpause

```solidity
function unpause() external
```

Função externa utilizada pela carteira que é detentor da _ROLE_ DEFAULT_ADMIN_ROLE para retirar o contrato de pausa.
Apenas o detentor desse papel pode executar essa função, verificado pelo modificador "onlyRole(DEFAULT_ADMIN_ROLE)".
O contrato retirado de pausa permite a execução normal de todas as funções novamente após ter sido previamente pausado.

### updateTPFtRepoStorage

```solidity
function updateTPFtRepoStorage(contract TPFtRepoStorage newTPFtRepoStorage) external
```

Função que atualiza o endereço do contrato TPFtRepoStorage.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| newTPFtRepoStorage | contract TPFtRepoStorage | Novo endereço do contrato TPFtRepoStorage. |

### updateAddressDiscovery

```solidity
function updateAddressDiscovery(contract AddressDiscovery newAddressDiscovery) external
```

Função que atualiza o endereço do contrato AddressDiscovery.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| newAddressDiscovery | contract AddressDiscovery | Novo endereço do contrato AddressDiscovery. |

### updateTPFt

```solidity
function updateTPFt(address newTPFt) external
```

Função que atualiza o endereço do contrato TPFt.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| newTPFt | address | Novo endereço do contrato TPFt. |

### updateTPFtDvP

```solidity
function updateTPFtDvP(contract ITPFtDvP newTPFtDvP) external
```

Função que atualiza o endereço do contrato TPFtDvP.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| newTPFtDvP | contract ITPFtDvP | Novo endereço do contrato TPFtDvP. |

### updateTPFtOperationId

```solidity
function updateTPFtOperationId(contract TPFtOperationId newTPFtOperationId) external
```

Função que atualiza o endereço do contrato TPFtOperationId.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| newTPFtOperationId | contract TPFtOperationId | Novo endereço do contrato TPFtOperationId. |

### updateDateTimeOracle

```solidity
function updateDateTimeOracle(contract DateTimeOracle newDateTimeOracle) external
```

Função que atualiza o endereço do contrato DateTimeOracle

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| newDateTimeOracle | contract DateTimeOracle | Novo endereço do contrato DateTimeOracle |

### getDateTimeOracle

```solidity
function getDateTimeOracle() external view returns (contract DateTimeOracle)
```

Função que retorna o endereço do contrato DateTimeOracle

### getTPFtRepoStorage

```solidity
function getTPFtRepoStorage() public view returns (contract TPFtRepoStorage)
```

Função que retorna o endereço do contrato TPFtRepoStorage.

### getAddressDiscovery

```solidity
function getAddressDiscovery() public view returns (contract AddressDiscovery)
```

Função que retorna o endereço do contrato AddressDiscovery.

### getTPFt

```solidity
function getTPFt() public view returns (address)
```

Função que retorna o endereço do contrato TPFt.

### getTPFtDvP

```solidity
function getTPFtDvP() public view returns (contract ITPFtDvP)
```

Função que retorna o endereço do contrato TPFtDvP.

### getTPFtOperationId

```solidity
function getTPFtOperationId() public view returns (contract TPFtOperationId)
```

Função que retorna o endereço do contrato TPFtOperationId.

