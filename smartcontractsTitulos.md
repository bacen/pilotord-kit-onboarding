# Interação com os _smart contracts_

## Objetivo

Esta documentação tem como objetivo explicar como será feita a interação com os _smart contracts_ que estão disponíveis na Rede do Piloto do Real Digital para uso dos Títulos Públicos Federais Tokenizados e as operações de oferta e compra e venda destes títulos.

Por se tratar de um piloto em ambiente de testes, esta documentação está sujeita a constantes evoluções que serão aqui refletidas.

Serão fornecidos ao participante do piloto a [ABI](https://docs.soliditylang.org/en/v0.8.20/abi-spec.html) de cada um dos contratos e seus respectivos endereços publicados na rede. Cada participante deve implementar, da forma que melhor entender, a sua interação com os contratos, fazendo uso de bibliotecas padrão Web3 como, por exemplo, o [Web3JS](https://web3js.readthedocs.io/en/v1.10.0/), [Web3J](https://docs.web3j.io/4.10.0/), ou frameworks como, por exemplo, o [Hardhat](https://hardhat.org/) ou [Truffle](https://trufflesuite.com/).

No piloto, todos os contratos serão implementados e publicados na rede pelo Banco Central do Brasil.

## Smart Contracts

Uma operação será identificada unicamente pelo operationId informado pelo participante. Este número será único na rede e sugere-se que seja utilizado o número da faixa do participante concatenado com a data vigente. Este formato não será validado e o operationId será utilizado para realizar a correspondência de uma operação de duplo comando.

Os valores de preço unitário, quantidade e valor financeiro serão tratados nos contratos assumindo os últimos algarismos como casas decimais de acordo com cada tipo de atributo. Caso o atributo seja um inteiro, deve ser preenchido o número de casas decimais com zero nos últimos algarismos.

## Título Público Federal tokenizado - [TPFt](./ITPFt.md)

O TPFt está definido no contrato chamado TPFt que implementa a interface [ITPFt](./abi/ITPFt.json).

- O TPFt é fungível e identificado pelo seu código, sigla e data vencimento.
- A carteira da Secretaria do Tesouro Nacional (STN) é a gestora do token.
- Somente carteiras autorizadas podem receber TPFt.
- Os tokens disponibilizados seguirão as [características dos Títulos Públicos Federais](https://www.bcb.gov.br/content/estabilidadefinanceira/selic/CaracteristicaTitulos.pdf).

### Liquidação de oferta pública - [Operação 1002](./ITPFtOperation1002.md)

A liquidação de oferta pública está definida no contrato chamado TPFtOperation1002 que implementa a interface [ITPFtOperation1002](./abi/ITPFtOperation1002.json). O contrato permite transferir quantidades inteiras de TPFt da carteira _default_ da STN para a carteira _default_ de um participante cadastrado por meio do método `auctionPlacement`. A liquidação da operação é realizada com a entrega contra pagamento (DvP) e somente o Bacen pode transmitir o comando cedente dessa operação.

### Compra e venda - [Operação 1052](./ITPFtOperation1052.md)

A operação de compra e venda entre participantes e/ou clientes está definida no contrato chamado TPFtOperation1052 que implementa a interface [ITPFtOperation1052](./abi/ITPFtOperation1052.json). O contrato permite transferir quantidades fracionárias de TPFt entre carteiras de participantes e/ou clientes cadastrados por meio do método `trade`. A liquidação da operação é executada com a entrega contra pagamento (DvP).


[<<< Voltar](README.md)
