# Delivery versus Payment entre Clientes de Instituições Financeiras:

É importante observar os <strong>pré-requisitos</strong> pois, apesar de alguns scripts poderem se executados "fora de ordem", devemos notar que os scripts de registro de operações de DVP devem preceder a execução dos scripts de liquidação das respectivas operações, como já mencionado anteriormente nesta documencação.

- [ex11-transferir-tpft-entre-wd-e-cliente.ts](https://github.com/raylsnetwork/piloto_rd/blob/main/exemplos/ex11-transferir-tpft-entre-wd-e-cliente.ts): realiza a transferência de Título Público Federal Tokenizado entre contas de uma mesma instituição financeira;

  <strong>Pré-requisitos:</strong>

  1. O endereço da conta que deseja realizar a venda necessita de saldo de TPFt. Para tanto é preciso que uma solicitação off-chain seja feita à SELIC para que, então, a SELIC envie os TPFt solicitados à respectiva conta do vendedor

- [ex12-dvp-cliente-registro-vendedor.ts](https://github.com/raylsnetwork/piloto_rd/blob/main/exemplos/ex12-dvp-cliente-registro-vendedor.ts): realiza o lançamento (registro) de uma operação de DVP com Título Público Federal Tokenizado enquanto vendedor do ativo (entre clientes de instituições financeiras);

    <strong>Pré-requisitos:</strong>

    1. Antes de mais nada, os contratos da instituição precisam estar implantados no ambiente do participante com a execução do código [setup-participant-contracts.ts](https://github.com/raylsnetwork/piloto_rd/blob/main/setup/setup-participant-contracts.ts);

    2. O endereço do cliente que deseja registrar a operação de venda deve possuir saldo de TPFt. Para tanto, é preciso que o script [ex11-transferir-tpft-entre-wd-e-cliente.ts](https://github.com/raylsnetwork/piloto_rd/blob/main/exemplos/ex11-transferir-tpft-entre-wd-e-cliente.ts) tenha sido executado previamente;

    3. É necessário conhecer os metadados do TPFt (`TPFtData`), a saber: `acronym`, do tipo `string`; `code`, do tipo `string` e; `maturityDate` do tipo `uint256`;

    4. É necessário conhecer dados da operação, a saber: os Chain Ids das partes envolvidas; os endereços das contas envolvidas; os metadados (`TPFtData`) do título negociado; a quantidade (`tpftAmount`) de títulos negociados; o preço (`price`) a ser pago por unidade de TPFt; o estado inicial (`status` - 1 p/ vendedor) da operação e; a informação de confirmação de que a operação será realizada entre duas clientes de instituições (`isBetweenClients` = `true`).

- [ex13-dvp-cliente-registro-comprador.ts](https://github.com/raylsnetwork/piloto_rd/blob/main/exemplos/ex13-dvp-cliente-registro-comprador.ts): realiza o lançamento (registro) de uma operação de DVP com Título Público Federal Tokenizado enquanto comprador do ativo (entre clientes de instituições financeiras); 

    <strong>Pré-requisitos:</strong>

    1. Antes de mais nada, os contratos da instituição precisam estar implantados no ambiente do participante com a execução do código [setup-participant-contracts.ts](https://github.com/raylsnetwork/piloto_rd/blob/main/setup/setup-participant-contracts.ts);

    2. O endereço da de reservas da instituição de onde está partindo o registro de compra necessita de saldo de CBDC. Para tanto é preciso ter executado o script [ex1-requisitar-emissao-cbdc.ts](https://github.com/raylsnetwork/piloto_rd/blob/main/exemplos/ex1-requisitar-emissao-cbdc.ts) previamente. Também é necessário que a conta do cliente comprador possua saldo de Real Tokenizado;

    3. É necessário conhecer os metadados do TPFt (`TPFtData`), a saber: `acronym`, do tipo `string`; `code`, do tipo `string` e; `maturityDate` do tipo `uint256`;

    4. É necessário conhecer dados da operação, a saber: os Chain Ids das partes envolvidas; os endereços das contas envolvidas; os metadados (`TPFtData`) do título negociado; a quantidade (`tpftAmount`) de títulos negociados; o preço (`price`) a ser pago por unidade de TPFt; o estado inicial (`status` - 2 p/ comprador) da operação e; a informação de confirmação de que a operação será realizada entre duas clientes de instituições (`isBetweenClients` = `true`).

- [ex14-dvp-cliente-liquidacao-vendedor.ts](https://github.com/raylsnetwork/piloto_rd/blob/main/exemplos/ex14-dvp-cliente-liquidacao-vendedor.ts): realiza o resgate de uma operação de DVP com Título Público Federal Tokenizado enquanto vendedor do ativo (entre clientes de instituições financeiras); 

  <strong>Pré-requisitos:</strong>

  1. Para que o cliente receba seu pagamento via RealTokenizado, o endereço do contrato CBDC precisa estar autorizado a emitir e queimar tokens do contrato RealTokenizado. Dito isso, antes de executar este exemplo, é preciso ter executado o script [setup-participant-rt.ts](https://github.com/raylsnetwork/piloto_rd/blob/main/setup/setup-participant-rt.ts);

  2. É necessário ter executado o código [ex12-dvp-cliente-registro-vendedor.ts](https://github.com/raylsnetwork/piloto_rd/blob/main/exemplos/ex12-dvp-cliente-registro-vendedor.ts) previamente;

  3. É necessário conhecer os metadados do TPFt (`TPFtData`), a saber: `acronym`, do tipo `string`; `code`, do tipo `string` e; `maturityDate` do tipo `uint256`;

  4. É necessário conhecer dados da operação, a saber: os Chain Ids das partes envolvidas; os endereços das contas envolvidas; os metadados (`TPFtData`) do título negociado; a quantidade (`tpftAmount`) de títulos negociados; o preço (`price`) a ser pago por unidade de TPFt; o estado inicial (`status` - 1 p/ vendedor) da operação e; a informação de confirmação de que a operação será realizada entre duas clientes de instituições (`isBetweenClients` = `true`).


- [ex15-dvp-cliente-liquidacao-comprador.ts](https://github.com/raylsnetwork/piloto_rd/blob/main/exemplos/ex15-dvp-cliente-liquidacao-comprador.ts): realiza o resgate de uma operação de DVP com Título Público Federal Tokenizado enquanto comprador do ativo (entre clientes de instituições financeiras); 

    <strong>Pré-requisitos:</strong>

    1. É necessário ter executado o código [ex13-dvp-cliente-registro-comprador.ts](https://github.com/raylsnetwork/piloto_rd/blob/main/exemplos/ex13-dvp-cliente-registro-comprador.ts): previamente;

    2. É necessário conhecer os metadados do TPFt (`TPFtData`), a saber: `acronym`, do tipo `string`; `code`, do tipo `string` e; `maturityDate` do tipo `uint256`;

    3. É necessário conhecer dados da operação, a saber: os Chain Ids das partes envolvidas; os endereços das contas envolvidas; os metadados (`TPFtData`) do título negociado; a quantidade (`tpftAmount`) de títulos negociados; o preço (`price`) a ser pago por unidade de TPFt; o estado inicial (`status` - 2 p/ comprador) da operação e; a informação de confirmação de que a operação será realizada entre duas clientes de instituições (`isBetweenClients` = `true`).

<br/>
<br/>
<br/>

## Diagrama de Sequência

<p align="center">
  <a href="" rel="noopener">
    <img src="https://public-professional-services.s3.eu-west-2.amazonaws.com/9-DVP-entre-Clientes.drawio.png" alt="Project logo">
  </a>
    <p align="center">
    <span>DVP entre clientes de instituições financeiras</span>
  </p>
</p>


<br>

[<<< Voltar](../Rayls.md)