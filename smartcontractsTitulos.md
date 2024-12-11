# Interação com os _smart contracts_ Selic

## Objetivo

Esta documentação tem como objetivo detalhar como será feita a interação com os smart contracts das operações que envolvem Títulos Públicos Federais tokenizados (TPFt), que estão disponíveis na rede do piloto do Real Digital Selic. 

Por se tratar de um piloto em ambiente de testes, esta documentação está sujeita a constantes evoluções que serão aqui refletidas.

Serão fornecidos aos participantes do piloto a [ABI](https://docs.soliditylang.org/en/v0.8.20/abi-spec.html) de cada um dos contratos e seus respectivos endereços publicados na rede. Cada participante deve implementar, da forma que melhor entender, a sua interação com os contratos, fazendo uso de bibliotecas padrão Web3 como, por exemplo, o [Web3JS](https://web3js.readthedocs.io/en/v1.10.0/), [Web3J](https://docs.web3j.io/4.10.0/), ou frameworks como o [Hardhat](https://hardhat.org/) ou [Truffle](https://trufflesuite.com/).


## Smart Contracts
Os contratos das operações (liquidação de oferta pública e compra e venda) que envolvem TPFt foram desenvolvidos usando como base o padrão [ERC1155](https://ethereum.org/pt/developers/docs/standards/tokens/erc-1155/), com a adição de [funções específicas de controle de acesso](./TPFtAccessControl.md). Somente participantes autorizados podem operar na rede do piloto, e é necessário realizar [habilitações](habilitacoes.md) para efetuar as operações com TPFt.


Uma operação será identificada unicamente pelo operationId informado pelo participante. Este número será único na rede e sugere-se que seja utilizado o número da faixa do participante concatenado com a data vigente. Este formato não será validado e o operationId será utilizado para realizar a correspondência de uma operação de duplo comando.

Os valores de preço unitário, quantidade e valor financeiro serão tratados nos contratos assumindo os últimos algarismos como casas decimais de acordo com cada tipo de atributo. Caso o atributo seja um inteiro, deve ser preenchido o número de casas decimais com zero nos últimos algarismos.

### Título Público Federal tokenizado - [TPFt](./ITPFt.md)

O TPFt está definido no contrato chamado TPFt que implementa a interface [ITPFt](./abi/ITPFt.json).

- O TPFt é fungível e identificado pelo seu código, sigla e data vencimento.
- A carteira da Secretaria do Tesouro Nacional (STN) é a gestora do token.
- Somente carteiras autorizadas podem receber TPFt.
- Os tokens disponibilizados seguirão as [características dos Títulos Públicos Federais](https://www.bcb.gov.br/content/estabilidadefinanceira/selic/CaracteristicaTitulos.pdf).

### Liquidação de oferta pública - [Operação 1002](./ITPFtOperation1002.md)

A liquidação de oferta pública está definida no contrato chamado TPFtOperation1002 que implementa a interface [ITPFtOperation1002](./abi/ITPFtOperation1002.json). O contrato permite transferir quantidades inteiras de TPFt da carteira _default_ da STN para a carteira _default_ de um participante cadastrado por meio do método `auctionPlacement`. A liquidação da operação é realizada com a entrega contra pagamento (DvP) e somente o Bacen pode transmitir o comando cedente dessa operação. Tanto o Bacen/STN quanto o Participante, na posição de cedente e cessionário, podem cancelar operações pendentes, desde que o `operationId` exista, o status da operação seja "LAN" ou "CON", e apenas a parte que iniciou o processo de liquidação de oferta pública pode solicitar o cancelamento. 

### Compra e venda - [Operação 1052](./ITPFtOperation1052.md)

A operação de compra e venda entre participantes e/ou clientes está definida no contrato chamado TPFtOperation1052 que implementa a interface [ITPFtOperation1052](./abi/ITPFtOperation1052.json). O contrato permite transferir quantidades fracionárias de TPFt entre carteiras de participantes e/ou clientes cadastrados por meio do método `trade`. A liquidação da operação é executada com a entrega contra pagamento (DvP). As partes envolvidas, sejam participantes ou clientes, na posição de cedente e cessionário, podem cancelar operações pendentes, desde que o `operationId` exista, o status da operação seja "LAN" ou "CON", e apenas a parte que iniciou o processo de liquidação da operação de compra e venda possa solicitar o cancelamento. 

### Resgate - Operação 1012

A operação de resgate está definida no contrato de uso exclusivo do Banco Central chamado TPFtOperation1012. O contrato permite que o Tesouro Nacional realize o pagamento de resgate na data do vencimento do TPFt. A liquidação da operação é executada pagando Real Digital para o participante e emitindo Real Tokenizado para o cliente do participante. Foi implementada a baixa de TPFt, além disso, foi criado um contrato chamado TPFtRepaymentReserve. Esse contrato vai conter saldos que, por algum motivo, não foram possíveis de serem pagos em Real Digital ou Real Tokenizado ao participante ou cliente, respectivamente.

### Reserva de Resgate TPFt - [TPFtRepaymentReserve](./ITPFtRepaymentReserve.md)

O contrato TPFtRepaymentReserve que implementa a interface [ITPFtRepaymentReserve](./abi/ITPFtRepaymentReserve.json) é responsável por armazenar os valores financeiros referente a pagamento de resgate de TPFt que não foi bem-sucedido. O contrato permite o saque dos valores para o participante em forma de Real digital e para o cliente em forma de Real Tokenizado através do método `withdraw`. Além disso, o contrato permite o saque dos valores por uma carteira de autoridade através do método `withdrawFrom`.

### Compra com Compromisso de Revenda - [Operação 1054](./ITPFtOperation1054.md)
A operação de compra com compromisso de revenda está definida no contrato chamado TPFtOperation1054, que implementa a interface [ITPFtOperation1054](./abi/ITPFtOperation1054.json). O contrato permite transferir quantidades fracionárias de TPFt entre carteiras de participantes e clientes cadastrados por meio do método `tradeRepo` com o compromisso de recompra futura. A liquidação da operação é realizada por meio de entrega contra pagamento (DvP). As partes envolvidas, sejam participantes ou clientes, na posição de cedente e cessionário, podem cancelar operações pendentes, desde que o `operationId` exista, o status da operação seja "LAN" ou "CON", e apenas a parte que iniciou o processo de liquidação da operação de compra e venda possa solicitar o cancelamento. A operação não permite transações entre clientes.

A operação de compra com compromisso de revenda também oferece suporte para duas modalidades:

1. Compromissada Intradiária (`tradeRepoIntraday`): Permite que participantes e clientes realizem uma operação de compromissada no mesmo dia entre si. Nessa operação, a quantidade de TPFt e o preço unitário são acordados na ida, e a operação é identificada pelo `operationId`.

2. Compromissada com Preço de Retorno Aberto (`tradeRepoOpenReturnPrice`): Permite que participantes e clientes realizem uma operação de compromissada onde o preço de retorno do TPFt fica em aberto para ser definido na operação de recompra.

Além dessas modalidades, o contrato oferece uma funcionalidade para situações de descumprimento:

- Status de Default (`setDefault`): Caso a operação de recompra não seja realizada no prazo estipulado, é possível marcar a operação como `default`, indicando o descumprimento do compromisso de recompra. A função `setDefault` permite atualizar o status da operação para `default`, especificando o `operationId` e o motivo do descumprimento. Esse status ajuda a monitorar o risco associado a operações de compromissada que não foram cumpridas no prazo acordado.

### Recompra - [Operação 1056](./ITPFtOperation1056.md)
A operação de recompra está definida no contrato chamado TPFtOperation1056, que implementa a interface [ITPFtOperation1056](./abi/ITPFtOperation1056.json). 
O contrato permite que, na data de vencimento da operação de compromissada, o participante ou cliente realize a recompra do TPFt previamente transferidos na operação 1054. A liquidação é executada via entrega contra pagamento (DvP). As partes envolvidas, sejam participantes ou clientes, na posição de cedente e cessionário, podem cancelar operações pendentes, desde que o `returnOperationId` exista, o status da operação seja "LAN" ou "CON", e apenas a parte que iniciou o processo de recompra da operação de compra e venda possa solicitar o cancelamento.

Para a execução da recompra, há duas funções distintas:

1. Recompra com Preço Unitário de Retorno Fechado (`tradeReverseRepo`): Para operações de ida onde o preço unitário de retorno foi previamente estabelecido, o participante ou o cliente pode executar a recompra informando o `originalOperationId` da operação de ida e o `returnOperationId` referente à recompra.

2. Recompra com Preço Unitário de Retorno Aberto (`tradeReverseRepoOpenReturnPrice`): Quando a operação de ida foi realizada com o preço de retorno em aberto, a recompra é executada com o preenchimento do `returnUnitPrice`. O participante ou o cliente deve especificar o `originalOperationId` e o `returnOperationId`, além do preço unitário de retorno ajustado conforme acordado no momento da recompra.


### **Importante**

**Habilitação de carteiras para TPFt**

A habilitação das carteiras de participantes e clientes nas operações dos Títulos Públicos Federais tokenizados (TPFt) é diferente da habilitação das carteiras de participantes e clientes no Real Digital. Para a carteira do participante ou do cliente realizar operações no TPFt, é preciso que o participante solicite a habilitação junto ao BACEN.

**Identificação de clientes para o TPFt**

A identificação das carteiras de clientes e participantes nos contratos dos Títulos Públicos Federais tokenizados (TPFt) é feita da seguinte forma: 

1. Carteira de cliente é identificada no cadastro do Key Dictionary. Neste caso, o pagamento do resgate é feito em Real Tokenizado;

2. Carteira do participante é identificada no cadastro do Real Digital e inexistente no Key Dictionary. Neste caso, o pagamento do resgate é feito em Real Digital.

