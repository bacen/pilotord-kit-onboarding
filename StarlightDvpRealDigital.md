
# Cenário 2: Compra e Venda de TPFt com Real Digital
<br />

O cenário de troca de TPFt por Real Digital envolvendo 2 participantes foi desenvolvido a partir dos requisitos estabelecidos pela equipe do piloto Drex.
O fluxo é executado por uma aplicação denominada SwapEscrow desenvolvida pela EY a partir da solução Starlight.
As seções a seguir detalham as etapas de instalação e execução deste cenário da forma como foram testados pela equipe do projeto.

- [Cenário 2: Compra e Venda de TPFt com Real Digital](#cenário-2-compra-e-venda-de-tpft-com-real-digital)
  - [1. Executando o Starlight SwapEscrow](#1-executando-o-starlight-swapescrow)
    - [Passo a Passo - Configuração Padrão](#passo-a-passo-configuração-padrão)
    - [Observações](#observações)
    - [Como funciona a criptografia no SwapEscrow?](#como-funciona-a-criptografia-no-swapescrow)
  - [2. Permissões dos contratos](#2-permissões-dos-contratos)
  - [3. Interação com a aplicação](#3-interação-com-a-aplicação)
    - [3.1 - Configurar scripts - via Postman](#31---configurar-scripts---via-postman)
  - [4. Consulta de informações das aplicações](#4-consulta-de-informações-das-aplicações)
  - [5 - Interação com contratos de forma alternativa](#5---interação-com-contratos-de-forma-alternativa)
    - [5.1 - Interação via frontend](#51---interação-via-frontend)
  - [6. Endereços dos contratos](#6-endereços-dos-contratos)
  - [7. Interagindo com o sistema](#7-interagindo-com-o-sistema)

## 1. Executando o Starlight SwapEscrow

A primeira etapa corresponde à configuração inicial do sistema. Existem diferentes formas de realizar esta configuração, cada uma com o seu respectivo arquivo de docker-compose. Para o projeto, a equipe do BC utilizou a configuração padrão recomendada, com a utilização de um Mongo externo e com as demais imagens baixadas do GHCR (Github Container Registry). Demais formas de configuração podem ser consultadas no repositório oficial da solução disponibilizado pela EY.

### Passo a Passo - Configuração Padrão

1) Clonar o projeto:

    ```bash
    git clone https://github.com/eybrativosdigitais/zapp-swapescrow-drex
    ```

2) Entrar no diretório do projeto:

    ```bash
    cd zapp-swapescrow-drex
    ```

3) Copiar os 3 arquivos .json da pasta [build](./build/) para a pasta `build\contracts` que está dentro da pasta zapp-swapescrow-drex:

    ```bash
    ERC20.json
    ERC1155Token.json
    SwapShield.json
    ```

  Estes arquivos são importantes para o funcionamento correto do starlight na rede DREX, pois, contém as informações da rede, contrato e bloco utilizados no piloto.

4) Criar o arquivo `env` copiando do exemplo:

    ```bash
    cp env.example .env
    ```

5) Preencher o arquivo .env com as informações necessárias:
   - Apontar para o seu fullnode no parâmetro: `SWAPESCROW_RPC_URL=ws://host:porta`
   - Endereço da sua conta: `DEFAULT_ACCOUNT`
   - Chave da sua conta default: `KEY`
   - Url de conexão com o Mongo: `MONGO_URL`

6) Copiar o arquivo de configuração do Docker Compose:

    ```bash
    cp docker-compose.external-db-using-image.yml docker-compose.yml
    ```

> IMPORTANTE: mesmo com a configuração acima usando imagens Dockers que constam no repositório Github Container Repository, são requeridos que os seguintes diretórios estejam no mesmo diretório onde estejam os arquivos .env e docker-compose.yml. São eles: circuits, proving-files, orchestration/common/db, build e config.

7) Dar permissões de execução para o script de inicialização:

    ```bash
    chmod +x ./startup.sh
    ```

8) Inicializar os serviços:

    ```bash
    ./startup.sh
    ```

9) Verificar se todos os containers estão up: `docker ps`. O log deverá ser semelhante ao abaixo:

    | CONTAINER ID | IMAGE                                                 | COMMAND                  | CREATED     | STATUS   | PORTS                                       | NAMES                             |
    |--------------|-------------------------------------------------------|--------------------------|-------------|----------|---------------------------------------------|-----------------------------------|
    | 3e52d5d9a6ea | zapp-swapescrow-zapp                                  | "docker-entrypoint.s…"   | 45 seconds ago  | Up 30 seconds| 0.0.0.0:3000->3000/tcp, :::3000->3000/tcp   | zapp-swapescrow-zapp-1            |
    | 0594e1178515 | zapp-swapescrow-timber                                | "docker-entrypoint.s…"   | 45 seconds ago  | Up 30 seconds| 0.0.0.0:3100->80/tcp, :::3100->80/tcp       | zapp-swapescrow-timber-1          |
    | b7b53b8b0a63 | ghcr.io/eyblockchain/zokrates-worker-updated:latest   | "/bin/sh -c 'npm sta…"   | 45 seconds ago  | Up 30 seconds| 0.0.0.0:8080->80/tcp, :::8080->80/tcp       | zapp-swapescrow-zokrates-1        |

10) Exibir os logs:

    ```bash
    docker compose logs -f -n 1000 timber zapp zokrates
    ```

11) A configuração inicial está completa se os logs não apresentaram erros. Caso tenha acontecido algum erro, vá até a seção [Erros comuns](./docs/ERROS.md) checar se há alguma solução já conhecida.


### Observações

- Alterar as configurações do seu nó Besu, aumentando ou desabilitando o limite RPC para logs (parâmetro [RPC-MAX-LOGS-RANGE](https://besu.hyperledger.org/23.4.0/public-networks/reference/cli/options#rpc-max-logs-range)) (necessário para o correto funcionamento do Timber)

- Permitir conexões Websocket no seu nó Besu (parâmetro [--rpc-ws-enabled=true](https://besu.hyperledger.org/23.7.3/public-networks/reference/cli/options#rpc-ws-api)) (necessário para o correto funcionamento do Zapp e Timber)

- Outras configurações da conexão Websocket do seu nó Besu, importantes para o bom funcionamento:

```
--rpc-ws-enabled \
--rpc-ws-api="ETH,WEB3,NET" \
--rpc-ws-host=0.0.0.0 \
```

### Como funciona a criptografia no SwapEscrow?

O Starlight grava as operações em registros que são chamados de commitments. Esses commitments ficam em um banco de dados local, definido pelo cliente e configurado no docker-compose.yml

Quando esses commitments enviados para gerar as provas que a transação ocorreu ou mesmo registrados on chain para restauração de backup futuros, é utilizada um par de chaves criptograficas que usam a curva eliptica [BabyJubJub](https://docs.iden3.io/publications/pdfs/Baby-Jubjub.pdf) para fazer a criptografia/descriptografia destas informações. Chamamos essas chaves de `chaves de criptografia` para não confundirmos com a chave da conta Ethereum da instancia. A geração desse par de chaves é aleatória, e sua geração ocorre em disco.

Cada instancia do Starlight SwapEscrow usa a conta Ethereum configurada no arquivo `.env` e para cada conta, quando a instancia é carregada a primeira vez, é criada um par de chaves criptograficas que usam a curva eliptica [BabyJubJub](https://docs.iden3.io/publications/pdfs/Baby-Jubjub.pdf). Essa chave fica registrada no arquivo **orchestration/common/db/key.json**. A chave pública deste par e o endereço Ethereum da instancia Startlight SwapEscrow são registrados no mapa `zkpPublicKeys` no Smart Contract SwapShield do projeto Starlight SwapEscrow.

IMPORTANTE: Caso o usuário perca o arquivo **orchestration/common/db/key.json**, ele *não poderá descriptografar* as transações que foram destinadas a ele com a chave pública registrada anteriormente, e também não poderá realizar saque, pois não conseguirá mais enviar a chave privada correta na geração das provas.

Caso o usuário queira criar uma nova chave de encriptação, mas mantendo a conta Ethereum, ele deverá parar a instancia que esta com a chave registrada incorretamente com `docker compose down`, apague o arquivo **orchestration/common/db/key.json** e inicialize a aplicação novamente. Uma nova chave será gerada, porém, esta nova chave não estará registrada no Smart Contract SwapShield e o usuário deverá registrar a nova chave pública no mapa `zkpPublicKeys` do Smart Contract SwapShield. Este processo poderá ser feito através do script `./starlight-utils/register.js`.

Caso o usuário tenha um backup do arquivo key.json e ele deseja restaurar, ele deverá copiar o arquivo para o diretório **orchestration/common/db/** e através do script `./starlight-utils/register.js` registrar a chave pública no mapa `zkpPublicKeys` do Smart Contract SwapShield.

Os dados da contraparte são criprografados pelo remetente da proposta utilizando a chave pública da contraparte (receiver) que esta registrada no Smart Contract SwapShield. Somente a contraparte, utilizando a chave privada própria, pode descriptografar estes dados. Sendo assim, a contraparte (receiver) só consegue incorporar o commitment de proposta de troca (swapProposals) se o proponente (sender) encriptar os dados com a chave pública do recebedor da proposta (receiver), ou quando no momento de conclusão da troca, a contraparte (receiver) encriptar os dados da aceitação utilizando a chave pública do proponente (sender), permitindo assim o proponente incorporar o commitment em seu banco de dados.

Para efeitos de backup, os commitments (dados de cada transação) também são criptografados com a chave privada do remetente. Se for necessário restaurar um backup, o Starlight SwapEscrow poderá acessar novamente os eventos das transações, descriptografar e trazer os dados das transações para o banco de dados da instância.

## 2. Permissões dos contratos

Foi realizado o deploy do contrato inteligente denominado **SwapShield** responsável por gerenciar os *commitments* do Starlight para os testes de compra e venda, assegurando que os saldos permaneçam criptografados na rede. Para participar dos testes, os envolvidos no projeto piloto deverão realizar um depósito de Real Digital (ERC20) e de TPFt (ERC1155) neste contrato.

Isso requer a autorização do contrato **SwapShield** para duas ações:

- a) Retirar o Real Digital da carteira Ethereum do participante. É feito por meio do **approve** do valor no contrato de Real Digital. O endereço do contrato de SwapShield que necessita autorização está especificado na seção [Endereços dos contratos](#6-endereços-dos-contratos).
- b) Retirar os Títulos Públicos Federais tokenizados (TPFt) da carteira Ethereum do participante. É feito por meio do **setApprovalForAll**. O endereço do contrato de SwapShield que necessita autorização está especificado na seção [Endereços dos contratos](#6-endereços-dos-contratos).

## 3. Interação com a aplicação

O foco será a interação via Postman, mas também é possível interagir via frontend da aplicação ou cURL. Pode-se verificar estas outras formas de interação na seção [Interações alternativas](#5-interação-com-contratos-de-forma-alternativa).

### 3.1 - Configurar scripts - via Postman

Na coleção SwapEscrow.postman_collection.json encontram-se os endpoints de interação com a aplicação.

Para configurar o Postman, siga os passos abaixo:

- Importe o arquivo [SwapEscrow.postman_collection.json](./SwapEscrow.postman_collection.json) no [Postman](https://www.postman.com/downloads/).
- Dentro do Postman, clique no nome da pasta e defina as seguintes propriedades na aba variáveis:
  - `bank_a_zapp`: Servidor onde está rodando a sua aplicação, o valor default é `http://localhost:3000`
  - `swapShield_address`: Endereço do contrato de SwapShield na rede DREX
  - `accountBankA`: Preencher com a sua conta Ethereum que será utilizada para o teste
  - `accountBankB`: A conta Ethereum da instituição que será sua contra-parte nas operações
  - `erc_1155_address`: Endereço do contrato do TPFt na rede DREX
  - `erc_20_address`: Endereço do contrato de real digital utilizado na troca na rede DREX
  - `bank_b_zapp`: *Campo não obrigatório* - Servidor onde está rodando a aplicação de sua contra-parte o valor default é `http://localhost:3003`. Este campo é útil caso esteja testando entre dois bancos próprios.

<p align="center">
  <img src="https://starlight-readme.s3.amazonaws.com/postman-config.png" alt="Configuração Postman"/>
</p>

Atenção: É importante verificar se as variáveis não foram previamente definidas na seção "Environments" do Postman para evitar conflitos com testes de cenários anteriores


## 4. Consulta de informações das aplicações

Na aplicação, há um frontend com rotas para consultar o status. Para acessá-lo, basta abrir o navegador e ir até o endereço http://<endereço_da_aplicacao>:3000. Nesse frontend, é possível verificar o *status da aplicação*, os *commitments* e os *balanços privados* (também chamados de shielded) do seu endereço. Para isso, pode-se navegar pelas páginas "Info", "Balanços" e "Commitments".

> É possível através dessa interface, realizar as ações de "Depósito", "Troca" e "Retirada" de Real Digital e TPFt, sendo uma forma alternativa ao Postman.

<p align="center">
  <img src="https://starlight-readme.s3.amazonaws.com/starlight-frontend.png" alt="Frontend - Info"/>
</p>

## 5 - Interação com contratos de forma alternativa

### 5.1 - Interação via frontend

A aplicação possui um frontend que permite a interação com os contratos. Para acessar, basta acessar o endereço `http://<endereço_da_aplicação>:3000` no navegador. Neste frontend, é possível realizar todos os passos de interação com os contratos que estão disponíveis nas rotas do Postman. Para isso, você pode começar pela tela de Depósito da aplicação.

> Além das ações de depósito, troca e retirada, é possível utilizar o frontend para [Consulta de informações das aplicações](#4---consulta-de-informações-das-aplicações).


## 6. Endereços dos contratos

- **SwapShield**: 0xDa4c47FAD65cc6Cd1873F9BD2a5e6dB5d70E6d67
- **Real Digital (ERC20)**: 0x3A34C530700E3835794eaE04d2a4F22Ce750eF7e
- **TPFt (ERC1155)**: 0x4ABDE28B04315C05a4141a875f9B33c9d1440a8E

## 7. Interagindo com o sistema

Para interagir com o sistema, pode-se utilizar o Postman ou o frontend da aplicação. A seguir, serão apresentadas as 3 ações disponíveis na aplicação e suas variações (Depositar, Trocar e Retirar).

1) [**Depositar**](./docs/DEPOSITOS.md) - Há dois tipos de depósito, um para Real Digital e outro para TPFt:
   - [**Depositar Real Digital (ERC20)**: `/depositErc20`](./docs/DEPOSITOS.md#a-depositar-real-tokenizado-erc20--depositerc20)
   - [**Depositar TPFt (ERC1155)**: `/depositErc1155`](./docs/DEPOSITOS.md#b-depositar-tpft-erc1155--depositerc1155)

2) [**Trocar**](./docs/SWAPS.md) - As trocas (ou swaps) ocorrem em duas etapas. A parte que irá propor a troca, começará o swap por meio das rotas de `/startSwap`. Ao fim da proposta, será gerado um ID de troca, a contraparte pode completar a troca através desse ID gerado, utilizando as rotas de `/completeSwap`. Há 2 formas de troca, que depende do que será enviado e recebido, sendo elas:

   - [**Trocar Real Digital por TPFt**: `/startSwapErc20ToErc1155`](./docs/SWAPS.md#a-começar-um-swap-real-digital-erc20-para-tpft-erc1155-startswapfromerc20toerc1155)
   - [**Trocar TPFt por Real Digital**: `/startSwapErc1155ToErc20`](./docs/SWAPS.md#c-começar-um-swap-tpft-erc1155-para-real-digitalerc20-startswapfromerc1155toerc20)

3) **Retirar** - Há dois tipos de retirada, um para Real Digital e outro para TPFt:

   - **Retirar Real Digital (ERC20)**: `/withdrawErc20`
   - **Retirar TPFt (ERC1155)**: `/withdrawErc1155`

[<<< Voltar](Starlight.md)
