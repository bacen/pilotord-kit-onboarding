# Interação com os _smart contracts_

## Objetivo

Esta documentação tem como objetivo explicar como será feita a interação com os _smart contracts_ que estão disponíveis na Rede do Piloto do Real Digital para uso dos ativos Real Digital e Real Tokenizado.

Por se tratar de um piloto em ambiente de testes, esta documentação está sujeita a constantes evoluções que serão aqui refletidas.

Serão fornecidos ao participante do piloto a [ABI](https://docs.soliditylang.org/en/v0.8.20/abi-spec.html) de cada um dos contratos e seus respectivos endereços publicados na rede. Cada participante deve implementar, da forma que melhor entender, a sua interação com os contratos, fazendo uso de bibliotecas padrão Web3 como, por exemplo, o [Web3JS](https://web3js.readthedocs.io/en/v1.10.0/), [Web3J](https://docs.web3j.io/4.10.0/), ou frameworks como, por exemplo, o [Hardhat](https://hardhat.org/) ou [Truffle](https://trufflesuite.com/).

No piloto, todos os contratos serão implementados e publicados na rede pelo Banco Central do Brasil.


## CBDC - [Real Digital](./RealDigital.md)

O CBDC (Central Bank Digital Currency) está definido no contrato chamado [RealDigital](./abi/RealDigital.json). 

Este contrato foi desenvolvido usando como base o padrão [ERC20](https://ethereum.org/pt/developers/docs/standards/tokens/erc-20/), com a adição de [funções específicas de controle de acesso](./CBDCAccessControl.md) e com as seguintes características:

* A carteira do Banco Central do Brasil é a gestora do token.
* O símbolo do token é `BRL`.
* Valor definido com 2 casas decimais
* Apenas instituições detentoras de Conta Reservas ou Conta de Liquidação e o Tesouro Nacional poderão ter Real Digital em suas carteiras.
* Cada participante deve mandar ao Banco Central do Brasil o endereço da sua carteira principal para o cadastro. Esta carteira será a carteira _default_ do participante e poderá ser posteriormente alterada através do contrato [RealDigitalDefaultAccount](./RealDigitalDefaultAccount.md). 
* Após o cadastro inicial, o próprio participante poderá habilitar outras carteiras a receber Real Digital através do contrato [RealDigitalEnableAccount](./RealDigitalEnableAccount.md).
* A solicitação de emissão de Real Digital será feita mediante chamada da carteira ao contrato [STR](./abi/STR.md)

### [Real Digital Default Account](./RealDigitalDefaultAccount.md)

O contrato [RealDigitalDefaulAccount](./abi/RealDigitalDefaultAccount.json) permite ao participante trocar a sua carteira _default_, através do método `updateDefaultWallet`. 

Ainda, através do _mapping_ `defaultAccount`, é possível recuperar a carteira _default_ dos outros participantes, bastando passar como parâmetro o CNPJ8 da instituição desejada. 

A carteira _default_ será necessária para as transações de _swap_ detalhadas em seção específica de [swaps]().

### [Real Digital Enable Account](./RealDigitalEnableAccount.md)

O contrato [RealDigitalEnableAccount](./abi/RealDigitalEnableAccount.json) permite ao participante habilitar ou desabilitar outras carteiras de sua posse para o recebimento de Real Digital. 

Para habilitação deve ser utilizado o método `enableAccount`. Para desabilitação, `disableAccount`.

### [STR](./STR.md)

O contrato chamado [STR](./abi/STR.json) representa uma simulação do sistema STR, será por meio desse contrato que os participantes solicitarão Real Digital ao Banco Central do Brasil no âmbito do projeto Piloto.

Este contrato permite que qualquer participante solicite o _mint_ de Real Digital através de uma carteira previamente habilitada. 

Para solicitar a emissão deve ser utilizado o método `requestToMint`.


## DVt (Depósito bancário à vista tokenizado) e MEt (Moeda eletrônica tokenizada) - [Real Tokenizado](./RealTokenizado.md)

O Real Tokenizado está definido no contrato chamado [RealTokenizado](./abi/RealTokenizado.json). 

Este contrato foi desenvolvido usando como base o padrão [ERC20](https://ethereum.org/pt/developers/docs/standards/tokens/erc-20/), com a adição de [funções específicas de controle de acesso](./CBDCAccessControl.md) e com as seguintes características:


* A primeira carteira default do participante será a gestora do token;
* A criação e publicação do contrato na rede será feita exclusivamente pelo Banco Central do Brasil;
* Caso seja necessário alterar a carteira gestora, deve ser feita solicitação de alteração ao Banco Central do Brasil através dos mecanismos oficiais de comunicação;
* O símbolo do token `BRL@CNPJ8`. Exemplo `BRL@11111111`, para o Real Tokenizado da instituição '11111111';
* Valor definido com 2 casas decimais;
* Assim como o Real Digital, somente carteiras autorizadas podem receber Real Tokenizado;
* O participante deve utilizar dos métodos `enableAccount` e `disableAccount` para gerenciar as carteiras permitidas.



### [KeyDictionary](./KeyDictionary.md)

O contrato [KeyDictionary](./abi/KeyDictionary.json) simulará um Diretório de Identificadores de Contas Transacionais ([DICT](https://www.bcb.gov.br/estabilidadefinanceira/dict)) para a transferência de Real Tokenizado. Durante o piloto, os dados de clientes, sempre fictícios, devem ser inseridos na rede para recuperação e identificação das carteiras de clientes durante as operações de _swap_ de transferência entre clientes.
O método a ser invocado para a inserção de dados é o `addAccount`, que tem os seguintes parâmetros:

* Chave, identificador único gerado pelo participante, deve ser salvo no formato hash (keccak256);
* CPF do cliente fictício;
* Código do participante;
* Conta do cliente fictício;
* Agência do cliente fictício;
* Carteira do cliente fictício;
* O Cnpj8 do participante;

Ao iniciar uma transferência o participante poderá recuperar a carteira do destinatário através de consulta ao método `getWallet`.

Ao receber uma transferência o participante recebedor poderá identificar o cliente pagador através da consulta aos métodos `getKey` e `getCustomerData`.


## Swaps e comunicação Off-Chain

Sempre que houver uma transferência de Real Tokenizado entre clientes de instituições distintas, essa transferência deve ser efetivada por meio de um contrato de _swap_ que permita a troca de Real Tokenizado, usando como reserva o Real Digital das respectivas instituições envolvidas.

No momento, há três implementações disponíveis: uma que executa o _swap_ em apenas uma transação e outras duas que dependem da aprovação do recebedor para que a troca seja concluída. Todas as implementações foram efetuadas utilizando os padrões de _approve_ para o respectivo contrato de _swap_ previamente à execução da operação.

O objetivo do piloto é testar formas distintas de _swap_ de forma a avaliar como podem se encaixar em diferentes negócios. Há, ainda, a possibilidade de implementação de um _swap_ que envolva a troca de informações _off-chain_.


### [Swap One Step](./SwapOneStep.md)

O contrato [SwapOneStep](./abi/SwapOneStep.json) efetua a transferência de Real Tokenizado em uma única transação atômica. Após os _approves_ das carteiras pagadoras de Real Tokenizado e Real Digital, a chamada ao `executeSwap` efetivará a destruição (`burn`) de Real Tokenizado do cliente pagador, a transferência (`transferFrom`) de Real Digital da instituição pagadora para a instituição recebedora e a emissão (`mint`) de Real Tokenizado para o cliente recebedor.



### [Swap Two Steps](./SwapTwoSteps.md)

O contrato [SwapTwoSteps](./abi/SwapTwoSteps.json) executa a transferência de forma atômica quando o participante recebedor confirmar a operação. Após os _approves_ das carteiras pagadoras de Real Tokenizado e Real Digital, a chamada ao `startSwap` irá gerar um evento para a instituição recebedora. A instituição recebedora avalia o crédito e confirma a transferência efetivando, assim, a operação atômica.


### [Swap Two Steps Reserve](./SwapTwoStepsReserve.md)

O contrato [SwapTwoStepsReserve](./abi/SwapTwoStepsReserve.json), assim como o [SwapTwoSteps](./abi/SwapTwoSteps.json), executa a transferência de forma atômica quando o participante recebedor confirmar a operação. Nesse contrato, entretanto, após os _approves_ das carteiras pagadoras de Real Tokenizado e Real Digital, a chamada ao `startSwap` efetivará a transferência dos tokens de Real Tokenizado e Real Digital para o contrato SwapToStepsReserve como forma de reserva e garantia de saldo, além de gerar um evento para a instituição recebedora. A instituição recebedora então avalia o crédito e confirma a transferência efetivando, assim, a operação atômica.



[<<< Voltar](README.md)
