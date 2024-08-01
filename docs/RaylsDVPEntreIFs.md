# Delivery versus Payment entre Instituições Financeiras:

É importante observar os <strong>pré-requisitos</strong> pois, apesar de alguns scripts poderem se executados "fora de ordem", devemos notar que os scripts de registro de operações de DVP devem preceder a execução dos scripts de liquidação das respectivas operações, como já mencionado anteriormente nesta documencação.

- [ex5-dvp-if-registro-vendedor.ts](https://github.com/raylsnetwork/piloto_rd/blob/main/exemplos/ex5-dvp-if-registro-vendedor.ts): realiza o lançamento (registro) de uma operação de DVP com Título Público Federal Tokenizado enquanto vendedor do ativo (entre instituições financeiras).

  <strong>Pré-requisitos:</strong>

  1. Antes de mais nada, os contratos da instituição precisam estar implantados no ambiente do participante com a execução do código [setup-participant-contracts.ts](https://github.com/raylsnetwork/piloto_rd/blob/main/setup/setup-participant-contracts.ts);

  2. O endereço da conta que deseja realizar a venda necessita de saldo de TPFt. Para tanto é preciso que uma solicitação off-chain seja feita à SELIC para que, então, a SELIC envie os TPFt solicitados à respectiva conta do vendedor

  3. É necessário conhecer os metadados do TPFt (`TPFtData`), a saber: `acronym`, do tipo `string`; `code`, do tipo `string` e; `maturityDate` do tipo `uint256`;

  4. É necessário conhecer dados da operação, a saber: os Chain Ids das partes envolvidas; os endereços das contas envolvidas; os metadados (`TPFtData`) do título negociado; a quantidade (`tpftAmount`) de títulos negociados; o preço (`price`) a ser pago por unidade de TPFt; o estado inicial (`status` - 1 p/ vendedor) da operação e; a informação de confirmação de que a operação será realizada entre duas instituições, em detrimento de entre dois clientes finais (`isBetweenClients` = `false`).

- [ex6-dvp-if-registro-comprador.ts](https://github.com/raylsnetwork/piloto_rd/blob/main/exemplos/ex6-dvp-if-registro-comprador.ts): realiza o lançamento (registro) de uma operação de DVP com Título Público Federal Tokenizado enquanto comprador do ativo (entre instituições financeiras).

  <strong>Pré-requisitos:</strong>

  1. Antes de mais nada, os contratos da instituição precisam estar implantados no ambiente do participante com a execução do código [setup-participant-contracts.ts](https://github.com/raylsnetwork/piloto_rd/blob/main/setup/setup-participant-contracts.ts);

  2. O endereço da conta que deseja realizar a compra precisa de saldo de CBDC. Portanto, é interessante que o respectivo endereço tenha recebido saldo, por exemplo, através da execução do script [ex1-requisitar-emissao-cbdc.ts](https://github.com/raylsnetwork/piloto_rd/blob/main/exemplos/ex1-requisitar-emissao-cbdc.ts).

  3. É necessário conhecer os metadados do TPFt (`TPFtData`), a saber: `acronym`, do tipo `string`; `code`, do tipo `string` e; `maturityDate` do tipo `uint256`;

  4. É necessário conhecer dados da operação, a saber: os Chain Ids das partes envolvidas; os endereços das contas envolvidas; os metadados (`TPFtData`) do título negociado; a quantidade (`tpftAmount`) de títulos negociados; o preço (`price`) a ser pago por unidade de TPFt; o estado inicial (`status` - 2 p/ comprador) da operação e; a informação de confirmação de que a operação será realizada entre duas instituições, em detrimento de entre dois clientes finais (`isBetweenClients` = `false`).

- [ex7-dvp-if-req-reversao-vendedor.ts](https://github.com/raylsnetwork/piloto_rd/blob/main/exemplos/ex7-dvp-if-req-reversao-vendedor.ts): caso no qual o vendedor deseja realizar o cancelamento (solicitação de reversão) de uma operação de DVP com Título Público Federal Tokenizado já registrada;

  <strong>Pré-requisitos:</strong>

  1. Ter executado o código [ex5-dvp-if-registro-vendedor.ts](https://github.com/raylsnetwork/piloto_rd/blob/main/exemplos/ex5-dvp-if-registro-vendedor.ts);

  2. O endereço da conta que deseja registrar e posteriormente solicitar reversão da operação de venda necessita de saldo de TPFt. Para tanto é preciso que uma solicitação off-chain seja feita à SELIC para que, então, a SELIC envie os TPFt solicitados à respectiva conta do vendedor

  3. É necessário conhecer os metadados do TPFt (`TPFtData`), a saber: `acronym`, do tipo `string`; `code`, do tipo `string` e; `maturityDate` do tipo `uint256`;

  4. É necessário conhecer dados da operação, a saber: os Chain Ids das partes envolvidas; os endereços das contas envolvidas; os metadados (`TPFtData`) do título negociado; a quantidade (`tpftAmount`) de títulos negociados; o preço (`price`) a ser pago por unidade de TPFt; o estado inicial (`status` - 1 p/ vendedor) da operação e; a informação de confirmação de que a operação será realizada entre duas instituições, em detrimento de entre dois clientes finais (`isBetweenClients` = `false`);

  5. O estado (`status`) da operação precisa refletir o fato de que o registro da respectiva operação foi feito apenas pela parte vendedora. Ocorre que, caso ambas as partes tenham feito seus registros, e tais registros tenham sido compatíveis, então não será possível solicitar o cancelamento da operação.

- [ex8-dvp-if-req-reversao-comprador.ts](https://github.com/raylsnetwork/piloto_rd/blob/main/exemplos/ex8-dvp-if-req-reversao-comprador.ts): caso no qual o comprador deseja realizar o cancelamento (solicitação de reversão) de uma operação de DVP com Título Público Federal Tokenizado já registrada;

  <strong>Pré-requisitos:</strong>

  1. Ter executado o código [ex6-dvp-if-registro-comprador.ts](https://github.com/raylsnetwork/piloto_rd/blob/main/exemplos/ex6-dvp-if-registro-comprador.ts);

  2. O endereço da conta que deseja registrar e posteriormente solicitar reversão da operação de compra precisa de saldo de CBDC. Portanto, é interessante que o respectivo endereço tenha recebido saldo, por exemplo, através da execução do script [ex1-requisitar-emissao-cbdc.ts](https://github.com/raylsnetwork/piloto_rd/blob/main/exemplos/ex1-requisitar-emissao-cbdc.ts).

  3. É necessário conhecer os metadados do TPFt (`TPFtData`), a saber: `acronym`, do tipo `string`; `code`, do tipo `string` e; `maturityDate` do tipo `uint256`;

  4. É necessário conhecer dados da operação, a saber: os Chain Ids das partes envolvidas; os endereços das contas envolvidas; os metadados (`TPFtData`) do título negociado; a quantidade (`tpftAmount`) de títulos negociados; o preço (`price`) a ser pago por unidade de TPFt; o estado inicial (`status` - 2 p/ comprador) da operação e; a informação de confirmação de que a operação será realizada entre duas instituições, em detrimento de entre dois clientes finais (`isBetweenClients` = `false`);
  
  5. O estado (`status`) da operação precisa refletir o fato de que o registro da respectiva operação foi feito apenas pela parte compradora. Ocorre que, caso ambas as partes tenham feito seus registros, e tais registros tenham sido compatíveis, então não será possível solicitar o cancelamento da operação.

- [ex9-dvp-if-liquidacao-comprador.ts](https://github.com/raylsnetwork/piloto_rd/blob/main/exemplos/ex9-dvp-if-liquidacao-comprador.ts): realiza o resgate de uma operação de DVP com Título Público Federal Tokenizado enquanto comprador do ativo (entre instituições financeiras);

  <strong>Pré-requisitos:</strong>

  1. É necessário ter executado o código [ex6-dvp-if-registro-comprador.ts](https://github.com/raylsnetwork/piloto_rd/blob/main/exemplos/ex6-dvp-if-registro-comprador.ts) previamente;

  2. É necessário conhecer os metadados do TPFt (`TPFtData`), a saber: `acronym`, do tipo `string`; `code`, do tipo `string` e; `maturityDate` do tipo `uint256`;

  3. É necessário conhecer dados da operação, a saber: os Chain Ids das partes envolvidas; os endereços das contas envolvidas; os metadados (`TPFtData`) do título negociado; a quantidade (`tpftAmount`) de títulos negociados; o preço (`price`) a ser pago por unidade de TPFt; o estado inicial (`status` - 1 p/ vendedor, 2 p/ comprador) da operação e; a informação de confirmação de que a operação será realizada entre duas instituições, em detrimento de entre dois clientes finais (`isBetweenClients` = `false`).

- [ex10-dvp-if-liquidacao-vendedor.ts](https://github.com/raylsnetwork/piloto_rd/blob/main/exemplos/ex10-dvp-if-liquidacao-vendedor.ts): realiza o resgate de uma operação de DVP com Título Público Federal Tokenizado enquanto vendedor do ativo (entre instituições financeiras); 

  <strong>Pré-requisitos:</strong>

  1. É necessário ter executado o código [ex5-dvp-if-registro-vendedor.ts](https://github.com/raylsnetwork/piloto_rd/blob/main/exemplos/ex5-dvp-if-registro-vendedor.ts) previamente;

  2. É necessário conhecer os metadados do TPFt (`TPFtData`), a saber: `acronym`, do tipo `string`; `code`, do tipo `string` e; `maturityDate` do tipo `uint256`;

  3. É necessário conhecer dados da operação, a saber: os Chain Ids das partes envolvidas; os endereços das contas envolvidas; os metadados (`TPFtData`) do título negociado; a quantidade (`tpftAmount`) de títulos negociados; o preço (`price`) a ser pago por unidade de TPFt; o estado inicial (`status` - 1 p/ vendedor, 2 p/ comprador) da operação e; a informação de confirmação de que a operação será realizada entre duas instituições, em detrimento de entre dois clientes finais (`isBetweenClients` = `false`).

<br/>
<br/>
<br/>

## Diagrama de Estado

  A ilustração esquemática a seguir demonstra como a execução de ações pelos participantes devem alterar os estados de uma operação de DPV, seja ela entre instituições ou entre clientes finais.

<p align="center">
  <a href="" rel="noopener">
    <img src="https://public-professional-services.s3.eu-west-2.amazonaws.com/DVP-diagrama-estados.png" alt="Project logo">
  </a>
  <p align="center">
    <span>Diagrama de estados do DVP</span>
  </p>
</p>
</br>
</br>

## Diagramas de Sequência

<p align="center">
  <a href="" rel="noopener">
    <img src="https://public-professional-services.s3.eu-west-2.amazonaws.com/6-Mint-de-TPFt.drawio.png" alt="Project logo">
  </a>
  <p align="center">
    <span>Emissão de Títulos Públicos Federais Tokenizados</span>
  </p>
</p>
</br>
</br>

<p align="center">
  <a href="" rel="noopener">
    <img src="https://public-professional-services.s3.eu-west-2.amazonaws.com/7-DVP-entre-IFs.drawio.png" alt="Project logo">
  </a>
  <p align="center">
    <span>DVP entre instituições financeiras</span>
  </p>
</p>
</br>
</br>

<p align="center">
  <a href="" rel="noopener">
    <img src="https://public-professional-services.s3.eu-west-2.amazonaws.com/8-DVP-com-Revers%C3%A3o.drawio.png" alt="Project logo">
  </a>
    <p align="center">
    <span>Cancelamento de DVP entre instituições financeiras</span>
  </p>
</p>
</br>
</br>


<br>

[<<< Voltar](../Rayls.md)