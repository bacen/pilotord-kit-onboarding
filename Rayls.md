# Introdução

A Rayls permite a criação de ambientes permissionados compatíveis com EVM. Esta fornece privacidade separando os tokens em ledgers distintos, usando os conceitos de bridge descritos na [EIP-5164](https://eips.ethereum.org/EIPS/eip-5164) para mover os ativos entre os ledgers de diferentes participantes. No contexto da Rayls, a rede DREX atual atual é chamada de Commit Chain, que atua como um meio de comunicação entre os ledgers, recebendo as informações necessárias para garantir que as operações envolvendo a bridge aconteçam nas duas pontas.

<br/>

# Estrutura da Rayls 

A seguir, uma breve descrição da estrutura da Rayls.

### Privacy Ledger (PL)

Uma PL é, basicamente, uma blockchain privada construída sobre a tecnologia Parfin Rayls. A Rayls possui uma série de recursos cuja instituição proprietária da PL pode utilizar, a saber: 

- Carteira (wallet) & custódia: útil para criação, gestão e manutenção de contas de interação com a blockchain; 

- Conexão via API & RPC: cujo objetivo é permitir que aplicações no nível de usuário sejam capazes de utilizar a blockchain em sua stack de desenvolvimento; 

- Banco de dados não-relacional: útil para aumentar o desempenho de informações a serem lidas ou escritas na blockchain; 

- Relayer: serviço responsável por garantir que a Privacy Ledger se comunique com outras blockchains, utilizando, para isso, os conceitos de bridge descritos na [EIP-5164](https://eips.ethereum.org/EIPS/eip-5164); 

Cada instituição participante administrará sua própria PL. Vale ressaltar que as informações que trafegam dentro da PL são privadas, ou seja, apenas a organização proprietária da respectiva Privacy Ledger controlará o acesso a tais informações e recursos.

### Private Subnet

A Private Subnet existe em um contexto no qual diversas PLs podem se conectar,sendo administrada pelo BACEN. Para garantir a comunicação existe a Commit Chain, uma blockchain privada cujos propósitos são vários, dentre os quais: 

- Servir como infraestrutura central de comunicação entre as PLs participantes da Private Subnet; 

- Gerenciar o recebimento e propagação de mensagens entre PLs distintas, tomando por base a EIP-5164; 

- Implementar privacidade na troca de mensagens de PLs através de técnicas de criptografia. 

Cada Instituição participará do ecossistema com sua respectiva PL e com o seu nó da rede DREX(Commit Chain). 

Para maiores informações sobre a infraestrutura topológica da Rayls e da Private Subnet, [clique aqui](./docs/RaylsArquitetura.md).


### Informações Relevantes

Foram disponibilizados vídeos explicativos sobre a plataforma [aqui](https://www.youtube.com/playlist?list=PLGP0Z9TilfuG1uaw-kqhSofwwSsOMGanV).

Antes de irmos à experimentação com os exemplos, vejamos algumas informações relevantes:

- Parâmetros:
    - Cada Participante terá sua conta Default (conta de reservas);
    - Cada Participante terá uma wallet (conta) para clientes;
    - Resource Id: essa informação é dada pelo operador da Private Subnet e corresponde a um identificador único para cada ativo que circula na rede;
    - Chain Id da Commit Chain: `381660001`;
    - Chain Id dos Participantes: essa informação deve ser preenchida com o respectivo código ISPB da instituição participante;

| PARTICIPANTE                      | CHAIN ID  |
| --------------------------------- | --------- |
| BANCO BTG PACTUAL S.A.            | 30306294  |
| BANCO GENIAL	                    | 45246410  |
| BANCO INTER	                    | 416968    |
| BANCO SICOOB S.A.	                | 2038233   |
| BCO B3 S.A.	                    | 997185    |
| BCO BRADESCO S.A.	                | 60746948  |
| BCO BV S.A	                    | 1858775   |
| BCO DO BRASIL S.A.	            | 191       |
| BCO RIBEIRAO PRETO S.A. (ABBC)	| 517645    |
| BCO SANTANDER (BRASIL) S.A.	    | 90400888  |
| CAIXA ECONOMICA FEDERAL	        | 360306    |
| ITAÚ UNIBANCO S.A.	            | 60701190  |
| NU PAGAMENTOS - IP	            | 18236120  |
| BCO ABC BRASIL S.A.	            | 28195667  |
| BCO ARBI S.A.	                    | 54403563  |
| BCO XP S.A.	                    | 33264668  |


- Onde encontrar os endereços dos contratos: no momento do setup, imprime-se no console o endereço dos contratos deployados;
- Averiguação de privacidade: para tanto, acessar o ["How To"](./docs/RaylsHowTo.md).
- Todas as informações por parte do Banco Central já estão preenchidas no arquivo [.env](https://github.com/raylsnetwork/piloto_rd/blob/main/.env.example). Consulte o roteiro de execução para mais detalhes;
- Os contratos de Real Digital e TPFt foram desenvolvidos novamente para se adequarem a solução da Rayls ([mais detalhes aqui](./docs/RaylsCasosdeUsoDREX.md)). Após a configuração do seu nó Rayls, deve ser solicitado via email ao SELIC a colocação direta de TPFt na sua wallet default;
- Para consultar seus saldos, basta executar o exemplo [opcional_consultar-saldos.ts](https://github.com/raylsnetwork/piloto_rd/blob/main/exemplos/opcional_consultar-saldos.ts).

<br/>

# Setup do Participante

Nesta guia, você tera uma visão geral de como instalar a Rayls Network utilizando Docker-compose ou Kubernetes.

### Setup Docker

1. [Pré-requisitos](./docs/RaylsSetupDocker.md#pré-requisitos)
2. [Instalando o ambiente Rayls](./docs/RaylsSetupDocker.md#instalando-o-ambiente-rayls)

### Setup Kubernetes

1. [Pré-requisitos](./docs/RaylsSetupK8S.md#pré-requisitos)
2. [Instalando a Rayls Privacy Ledger](./docs/RaylsSetupK8S.md#rayls-privacy-ledger)
3. [Instalando o Rayls Relayer](./docs/RaylsSetupK8S.md#rayls-relayer)

<br/>

# Roteiro de Execução

Os seguintes arquivos-fonte foram criados com o intuito de dar ao participante, um ponto de partida, um guia, sobre como interagir dos contratos inteligentes mencionados acima. Para mais informações sobre os contratos que foram desenvolvidos, [clique aqui](./docs/RaylsCasosdeUsoDREX.md). <strong>Para usuários não técnicos, recomendamos utilizar o Portal Rayls DREX</strong>, [clicando aqui](https://portal-rayls-drex.parfin.io/).

Os exemplos foram escritos em Typescript, utilizando o framework [Hardhat](https://hardhat.org/). Isso não é uma recomendação do uso da ferramenta por parte da Parfin. Os participantes são livres para desenvolverem a interação com os contratos inteligente da forma que bem entenderem.

Os códigos foram testados em sua funcionalidade, todavia, não foram realizadas auditorias nem análises de vulnerabilidade. Não é recomendado o uso de tais códigos em produção, especialmente o uso de chaves privadas diretamente no arquivo de configuração do Hardhat.

Antes de executar os scripts de exemplo, é imperativo que sejam preenchidas as informações do arquivo [.env](https://github.com/raylsnetwork/piloto_rd/blob/main/.env.example). Em seguida, executar o script de setup, [setup-participant-contracts.ts](https://github.com/raylsnetwork/piloto_rd/blob/main/setup/setup-participant-contracts.ts). Por fim, os scripts de exemplo exigem que as informações necessárias para executar as transações sejam preenchidas. Tais informações estão delineadas entre parênteses angulares (por exemplo: `<informações a serem preenchidas>`).

Para rodar cada script de setup, bem como cada um dos scripts de exemplos que se seguem abaixo é necessário rodar o comando `run` do [Hardhat](https://hardhat.org/), sempre apontando para a rede desejada (`--network rayls`). Exemplo abaixo:

`npx hardhat run exemplos/ex1-requisitar-emissao-cbdc.ts --network rayls`

<br/>

### CDBC (atacado)

Os exemplos desta seção correspondem às ações que podem ser realizadas e que envolvem exclusivamente o contrato `CBDC`. Lembre-se, antes de mais nada, executar o setup principal [setup-participant-contracts.ts](https://github.com/raylsnetwork/piloto_rd/blob/main/setup/setup-participant-contracts.ts). Em seguida, siga a seguinte ordem:

- A) [ex1-requisitar-emissao-cbdc.ts](https://github.com/raylsnetwork/piloto_rd/blob/main/exemplos/ex1-requisitar-emissao-cbdc.ts): faz uma soliticação de emissão de novos CBDC para receber em uma conta;

- B) [ex2-transferir-cbdc-atacado.ts](https://github.com/raylsnetwork/piloto_rd/blob/main/exemplos/ex2-transferir-cbdc-atacado.ts): a partir da instituição de origem, envia Real Digital para uma segunda instituição de destino (atacado);

Scripts opcionais para o Real Digital (atacado):

- [ex3-reversao-transferencia-cbdc-atacado.ts](https://github.com/raylsnetwork/piloto_rd/blob/main/exemplos/ex3-reversao-transferencia-cbdc-atacado.ts): tenta realizar o envio de Real Digital para uma conta não autorizada, mas tem o envio revertido devido à não autorização;

- [opcional_add-conta-allowlist-cdbc](https://github.com/raylsnetwork/piloto_rd/blob/main/exemplos/opcional_add-conta-allowlist-cdbc.ts): autoriza uma conta a receber CDBC; 

- [opcional_remove-conta-allowlist-cdbc](https://github.com/raylsnetwork/piloto_rd/blob/main/exemplos/opcional_remove-conta-allowlist-cdbc.ts): desautoriza uma conta a receber CDBC;

Caso queira maiores detalhes sobre os <strong>pré-requisitos</strong> necessários para executar cada um dos exemplos de Real Digital (CBDC/DREX - atacado), [clique aqui](./docs/RaylsAtacadoCBDC.md).

<br/>

### Real Tokenizado (atacado)

O exemplo desta seção corresponde às ações que podem ser realizadas e que envolvem o contrato `RealTokenizado`. Esse caso de uso possui um requisito importante, que consiste garantir acesso ao endereço do contrato CBDC ao contrato RealTokenizado. Por isso, execute os scripts na seguinte ordem:

- C) [setup-participant-rt.ts](https://github.com/raylsnetwork/piloto_rd/blob/main/setup/setup-participant-rt.ts): o endereço do contrato CBDC precisa estar autorizado a emitir e queimar tokens do contrato RealTokenizado. Dito isso, antes de executar este exemplo, deve-se executar o script de garantia de controle de acesso ao RealTokenizado. É importante dizer que esse passo (C) só precisa ser executado uma vez. Caso já tenha executado a etapa (C) anteriormente, então não será mais necessário executá-la para poder testar o `ex4` a seguir;

- D) [ex4-transferir-realtokenizado-varejo.ts](https://github.com/raylsnetwork/piloto_rd/blob/main/exemplos/ex4-transferir-realtokenizado-varejo.ts): a partir de um cliente em uma instituição de origem, envia Real Digital da reserva, bem como Real Tokenizado para uma segunda conta de cliente em uma instituição de destino (varejo);

Caso queira maiores detalhes sobre os <strong>pré-requisitos</strong> necessários para executar cada um dos exemplos de Real Tokenizado (varejo), [clique aqui](./docs/RaylsVarejoRealTokenizado.md).

<br/>

### Delivery versus Payment (DVP) entre Instituições Financeiras (IF)

O exemplo desta seção corresponde às ações que podem ser realizadas e que envolvem o contrato `TPFToperation` para que seja possível performar o DVP. É imprescindível que o vendedor tenha saldo de TPFt em sua conta para poder participar desse fluxo (tal saldo deve ser solicitado off-chain para a SELIC). Ainda, nota-se que diferentes scripts devem ser executados por participantes diferentes: vendedor executa apenas os scripts relacionados a ele, de forma similar, participante comprador executa apenas scripts de comprador. Dessa forma, os exemplos devem ser executados na seguinte ordem:

- Scripts de registro da operação: 

    - E) [ex5-dvp-if-registro-vendedor.ts](https://github.com/raylsnetwork/piloto_rd/blob/main/exemplos/ex5-dvp-if-registro-vendedor.ts): realiza o lançamento (registro) de uma operação de DVP com Título Público Federal Tokenizado enquanto vendedor do ativo (entre instituições financeiras) - esse script deve ser executado tão e somente pelo <strong>vendedor</strong>;

    - E) [ex6-dvp-if-registro-comprador.ts](https://github.com/raylsnetwork/piloto_rd/blob/main/exemplos/ex6-dvp-if-registro-comprador.ts): realiza o lançamento (registro) de uma operação de DVP com Título Público Federal Tokenizado enquanto comprador do ativo (entre instituições financeiras) - esse script deve ser executado tão e somente pelo <strong>comprador</strong>;

    - Obs.: a ordem de quem registra primeiro não importa, ou seja, tanto faz vendedor ou comprador registrar primeiro, desde que ambos tenham registrado antes de tentar liquidar a operação.

- Scripts de liquidação da operação:

    - F) [ex9-dvp-if-liquidacao-comprador.ts](https://github.com/raylsnetwork/piloto_rd/blob/main/exemplos/ex9-dvp-if-liquidacao-comprador.ts): realiza o resgate de uma operação de DVP com Título Público Federal Tokenizado enquanto comprador do ativo (entre instituições financeiras) - esse script deve ser executado tão e somente pelo <strong>comprador</strong>; 

    - F) [ex10-dvp-if-liquidacao-vendedor.ts](https://github.com/raylsnetwork/piloto_rd/blob/main/exemplos/ex10-dvp-if-liquidacao-vendedor.ts): realiza o resgate de uma operação de DVP com Título Público Federal Tokenizado enquanto vendedor do ativo (entre instituições financeiras) - esse script deve ser executado tão e somente pelo <strong>vendedor</strong>; 

    - Obs.: a ordem de quem liquida primeiro não importa.

Scripts opcionais para o DVP entre IFs:

- [ex7-dvp-if-req-reversao-vendedor.ts](https://github.com/raylsnetwork/piloto_rd/blob/main/exemplos/ex7-dvp-if-req-reversao-vendedor.ts): realiza o cancelamento (reversão) de uma operação de DVP com Título Público Federal Tokenizado enquanto vendedor do ativo (entre instituições financeiras). Esse exemplo só faz sentido se o apenas o registro da operação de DVP por parte do vendedor tiver sido executado - caso ambos, vendedor e comprador já tenham registrado para a mesma operação, será impossível solicitar reversão do respectivo DVP;

- [ex8-dvp-if-req-reversao-comprador.ts](https://github.com/raylsnetwork/piloto_rd/blob/main/exemplos/ex8-dvp-if-req-reversao-comprador.ts): realiza o cancelamento (reversão) de uma operação de DVP com Título Público Federal Tokenizado enquanto comprador do ativo (entre instituições financeiras). Esse exemplo só faz sentido se o apenas o registro da operação de DVP por parte do comprador tiver sido executado - caso ambos, vendedor e comprador já tenham registrado para a mesma operação, será impossível solicitar reversão do respectivo DVP;;

Caso queira maiores detalhes sobre os <strong>pré-requisitos</strong> necessários para executar cada um dos exemplos de DVP entre IFs, [clique aqui](./docs/RaylsDVPEntreIFs.md).

<br/>

### Delivery versus Payment (DVP) entre Clientes

O exemplo desta seção corresponde a ainda mais ações que podem ser realizadas e que envolvem o contrato `TPFToperation`. É imprescindível que o vendedor tenha saldo de TPFt em sua conta para poder participar desse fluxo (tal saldo deve ser solicitado off-chain para a SELIC). Ainda, nota-se que diferentes scripts devem ser executados por participantes diferentes: vendedor executa apenas os scripts relacionados a ele, de forma similar, participante comprador executa apenas scripts de comprador. Dessa forma, os exemplos devem ser executados na seguinte ordem:

Caso a SELIC tenha enviado saldo TPFt para a sua conta padrão, de sua PL, então você precisará, antes de mais nada, enviar saldo de TPFt para a conta de seu cliente vendedor, executando o `ex11` a seguir. Caso sua conta de cliente já pessoa saldo de TPFt, então esse passo (G) pode ser ignorado.

- G) [ex11-transferir-tpft-entre-wd-e-cliente.ts](https://github.com/raylsnetwork/piloto_rd/blob/main/exemplos/ex11-transferir-tpft-entre-wd-e-cliente.ts): realiza a transferência de Título Público Federal Tokenizado entre contas de uma mesma instituição financeira - esse script deve ser executado tão e somente pelo <strong>vendedor</strong>;;

Scripts de registro da operação: 

- H) [ex12-dvp-cliente-registro-vendedor.ts](https://github.com/raylsnetwork/piloto_rd/blob/main/exemplos/ex12-dvp-cliente-registro-vendedor.ts): realiza o lançamento (registro) de uma operação de DVP com Título Público Federal Tokenizado enquanto vendedor do ativo (entre clientes de instituições financeiras) - esse script deve ser executado tão e somente pelo <strong>vendedor</strong>;

- H) [ex13-dvp-cliente-registro-comprador.ts](https://github.com/raylsnetwork/piloto_rd/blob/main/exemplos/ex13-dvp-cliente-registro-comprador.ts): realiza o lançamento (registro) de uma operação de DVP com Título Público Federal Tokenizado enquanto comprador do ativo (entre clientes de instituições financeiras) - esse script deve ser executado tão e somente pelo <strong>comprador</strong>;

- Obs.: a ordem de quem registra primeiro não importa, ou seja, tanto faz vendedor ou comprador registrar primeiro, desde que ambos tenham registrado antes de tentar liquidar a operação.

Scripts de liquidação da operação:

- I) [ex14-dvp-cliente-liquidacao-vendedor.ts](https://github.com/raylsnetwork/piloto_rd/blob/main/exemplos/ex14-dvp-cliente-liquidacao-vendedor.ts): realiza o resgate de uma operação de DVP com Título Público Federal Tokenizado enquanto vendedor do ativo (entre clientes de instituições financeiras) - esse script deve ser executado tão e somente pelo <strong>vendedor</strong>;

- I) [ex15-dvp-cliente-liquidacao-comprador.ts](https://github.com/raylsnetwork/piloto_rd/blob/main/exemplos/ex15-dvp-cliente-liquidacao-comprador.ts): realiza o resgate de uma operação de DVP com Título Público Federal Tokenizado enquanto comprador do ativo (entre clientes de instituições financeiras) - esse script deve ser executado tão e somente pelo <strong>comprador</strong>;

- Obs.: a ordem de quem liquida primeiro não importa.

Caso queira maiores detalhes sobre os <strong>pré-requisitos</strong> necessários para executar cada um dos exemplos de DVP entre Clientes de IFs, [clique aqui](./docs/RaylsDVPEntreClientes.md).

<br/>
<br/>
<br/>

# Validação de Confidencialidade e Privacidade:

A solução proposta garante a privacidade das transações que trafegam pela Private Subnet. Para verificar que, de fato, as informações são trocadas de maneira confidencial entre as PLs, você pode seguir o seguinte tutorial para executar o passo a passo que atesta a privacidade das transações: [Tutorial para Checagem de Privacidade na Private Subnet](./docs/RaylsHowTo.md).

<br/>
<br/>
<br/>

# Perguntas Frequentes (FAQ):

1. O que é "Chain Id" e como devo preencher essa informação em meu ambiente?
    - A informação Chain Id (variável de ambiente `CHAINID`) deve ser preenchido com o Código ISPB da respectiva instituição participante - ela corresponde ao identificador único da rede (PL)  de cada participante.

2. Qual é o "Chain Id" da Commit Chain?
    - Essa informação pode ser encontrada no config map do Relayer de sua respectiva PL.

3. O que é "Resource Id"?
    - Essa informação corresponde ao identificador de um recurso existente na rede. Em linhas gerais, corresponde a um identificador único para ativos que vivem na Private Subnet.

4. Como posso verificar a privacidade das transações entre PLs?
    - Basta executar o script de checagem de privacidade, seguindo este passo a passo: [Tutorial para Checagem de Privacidade na Private Subnet](./docs/RaylsHowTo.md).

5. Como posso verificar os saldos dos ativos relacionados às contas que configurei em meu ambiente?
    - Uma vez que seu arquivo `.env` foi configurado corretamente e que o setup deste repositório tenha sido executado, basta utilizar o [Script de Consulta de Saldos](https://github.com/raylsnetwork/piloto_rd/blob/main/exemplos/opcional_consultar-saldos.ts).

1. Qual a utilidade da variável de ambiente ENDPOINT_ADDR? Onde posso encontrar essa informação?
    - É o endereço do contrato Endpoint que, por sua vez, faz parte do protocolo de comunicação cross-chain da Rayls. Esse endereço é informado no output do console do Relayer, um dos componentes do ambiente de infraestrutura necessária para ter uma Rayls em plena execução. Para maiores informações sobre o setup do Relayer, [clique aqui](./docs/RaylsSetupK8S.md#rayls-relayer).

2. Como posso consultar meus saldos de Real Tokenizado, DREX ou TPFt?
    - Para consultar seu saldo, é preciso invocar a função `balanceOf` a partir de algum dos respectivos contratos. O endereço dos contratos podem ser descobertos a partir de seu resourceId. Veja os exemplos 1, 3 e 5, para ter modelos de como consultar saldo - com base nesses exemplos, você poderia criar um script próprio, customizando sua checagem de saldos.

3. Como devo preencher as informações necessárias para realizar uma operação de DVP?
    - `operationId`: identificador único da operação, informação que deve ser acordada previamente de antemão entre as partes envolvidas no DVP - dado do tipo `string`;
    - `chainIdSeller`: Chain ID da PL do participante vendedor - dado do tipo `inteiro`;
    - `chainIdBuyer`: Chain ID da PL do participante comprador - dado do tipo `inteiro`;
    - `accountSeller`: conta da PL do participante vendedor - dado do tipo `address`;
    - `accountBuyer`: conta da PL do participante comprador - dado do tipo `address`;
    - `tpftData`: "metadados" de um TPFt (token ERC-1155);
      - `acronym`: acrônimo do TPFt, por ex. "LTN" - dado do tipo `string`;
      - `code`: código do TPFt, por ex. "100000" - dado do tipo `string`;
      - `maturityDate`: data de vencimento do TPFt, formato UNIX timestamp, por ex. "1797292800" - dado do tipo `inteiro`;
    - `tpftAmount`: quantidade de TPFt - dado do tipo `inteiro`;
    - `price`: preço unitário por TPFt - dado do tipo `inteiro`;
    - `status`: estado inicial da operação, para vendedor, é sempre igual a 1, já para comprador, sempre igual a 2, independentemente do estado anterior da operação - dado do tipo `inteiro`;
    - `isBetweenClients`: falso (`false`) para operação entre instituições financeiras, verdadeiro (`true`) para operação entre clientes finais de instituições financeiras - dado do tipo `booleano`.

4. Estou tentando executar um exemplo, mas a transação da erro quando eu executo. O que fazer?
    - Caso alguma de suas transações reverta, uma das opções utilizar o `data` da transação para tentar decodar com base nas ABIs disponíveis no projeto. A partir disso, você será capaz de conhecer melhor a mensagem de erro que justifica a reversão da respectiva transação e, com isso, poderá tentar readaptar o seu código para que flua como desejado.

5. Meu exemplo começa a executar, porém a contagem que aparece na tela excede 120 segundos e então meu exemplo parece não apresentar um resultado coerente. O que fazer?
    - Isso ocorre quando alguma de suas transações cross-chain falhou. Pode ser que alguma de suas informações do arquivo .env estejam erradas. Verifique e valide cada um dos valores associados às suas variáveis de ambiente. Caso o problema persista, investigue nos logs dos seus componentes:
      - Relayer - Procure por uma mensagem de erro ou reversão associada a operação realizada. Essa mensagem ajudará a identificar o motivo da sua reversão;
      - Privacy ledger - Procure por mensagem de erro associado a execução das transações.

[<<< Voltar](README.md)