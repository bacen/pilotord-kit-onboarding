# Interação com os _smart contracts_

## Objetivo

Esta documentação tem como objetivo explicar como será feita a interação com os _smart contracts_ que estão disponíveis na Rede do Piloto do Real Digital.

Por se tratar de um piloto em ambiente de testes, esta documentação está sujeita a constantes evoluções que serão aqui refletidas.

Serão fornecidos ao participante do piloto a [ABI](https://docs.soliditylang.org/en/v0.8.20/abi-spec.html) de cada um dos contratos e seus respectivos endereços publicados na rede. Cada participante deve implementar, da forma que melhor entender, a sua interação com os contratos, fazendo uso de bibliotecas padrão Web3 como, por exemplo, o [Web3JS](https://web3js.readthedocs.io/en/v1.10.0/), [Web3J](https://docs.web3j.io/4.10.0/), ou frameworks como o [Hardhat](https://hardhat.org/) ou [Truffle](https://trufflesuite.com/).

No piloto, todos os contratos serão implementados e publicados na rede pelo Banco Central do Brasil.

## Smart Contracts

Os contratos que representam tokens (Real Digital, Real Tokenizado, Título Público Federal) foram desenvolvidos usando como base o padrão [ERC20](https://ethereum.org/pt/developers/docs/standards/tokens/erc-20/), com a adição de [funções específicas de controle de acesso](./CBDCAccessControl.md). 
Todos os tokens suportam 2 casas decimais.

### CBDC - [Real Digital](./RealDigital.md)

O CBDC (Central Bank Digital Currency) está definido no contrato chamado [RealDigital](./abi/RealDigital.json). 
* A carteira do Banco Central do Brasil é a gestora do token.
* O símbolo do token é `BRL`.
* Somente carteiras autorizadas podem receber Real Digital. 
* Cada participante deve mandar ao Banco Central do Brasil o endereço da sua carteira principal para o cadastro. Esta carteira será a carteira _default_ do participante. Após o cadastro inicial, o próprio participante poderá habilitar outras carteiras a receber Real Digital, bem como alterar sua carteira _default_.

A carteira default será usada principalmente nos contratos de _swap_, detalhados abaixo.

### DVt (Depósito bancário à vista tokenizado) e MEt (Moeda eletrônica tokenizada) - [Real Tokenizado](./RealTokenizado.md)

O Real Tokenizado está definido no contrato chamado [RealTokenizado](./abi/RealTokenizado.json). 
* A carteira default do participante será a gestora do token, porém a criação do token na rede será feita pelo Banco Central do Brasil. 
* O símbolo do token a definir.
* Assim como o Real Digital, somente carteiras autorizadas podem receber Real Tokenizado. 
* O participante deve utilizar dos métodos `enableAccount` e `disableAccount` para gerenciar as carteiras permitidas.

### [STR](./STR.md)

O contrato chamado [STR](./abi/STR.json) representa a forma como os participantes solicitarão Real Digital ao Banco Central do Brasil. Esse contrato permite que qualquer participante solicite o _mint_ de Real Digital, desde que sua carteira esteja cadastrada, usando o método `requestToMint`.


### [Real Digital Default Account](./RealDigitalDefaultAccount.md)

O contrato [RealDigitalDefaulAccount](./abi/RealDigitalDefaultAccount.json) permite ao participante trocar a sua carteira _default_, através do método `updateDefaultWallet`. Ainda, através do _mapping_ `defaultAccount`, é possível recuperar a carteira _default_ dos outros participantes, bastando passar como parâmetro o CNPJ8 da mesma. Essa operação será necessária para as transações de _swap_.

### [Real Digital Enable Account](./RealDigitalEnableAccount.md)

O contrato [RealDigitalEnableAccount](./abi/RealDigitalEnableAccount.json) permite ao participante habilitar outras carteiras de sua posse para receber Real Digital, através do método `enableAccount`.

### [KeyDictionary](./KeyDictionary.md)

O contrato [KeyDictionary](./abi/KeyDictionary.json) simulará um DICT para o Real Digital. Durante o piloto os dados de clientes, fictícios, devem ser inseridos na rede para recuperação durante as operações de _swap_. 
O método a ser invocado para a inserção de dados é o `addAccount`, que tem os seguintes parâmetros:

* Chave, identificador unico gerado pelo participante, deve ser salvo no formato hash keccak256
* CPF do cliente fictício
* Código do participante
* Conta do cliente fictício
* Agência do cliente fictício
* Carteira do cliente fictício

## Swap e comunicação Off-Chain

Os contratos de _swap_ permitem a troca de Real Tokenizado entre os participantes, usando Real Digital como reserva. 

No momento há duas implementações disponíveis: uma que executa o _swap_ em apenas [uma transação](./abi/SwapOneStep.json) e outro que depende da [aprovação do recebedor](./abi/SwapTwoSteps.json) para a troca seja concluída, exigindo assim duas transações na rede.

Para mais detalhes leia a documentação dos contratos [SwapOneStep](./SwapOneStep.md) e [SwapTwoSteps](./SwapTwoSteps.md)

O objetivo do piloto é testar as duas formas de _swap_, além de uma terceira que ainda será implementada e que envolve troca de informações _off-chain_.


[<<< Voltar](README.md)
