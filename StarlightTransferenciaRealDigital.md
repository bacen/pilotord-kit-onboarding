
# Cenário 1: Transferência simples
<br />

Para o cenário de transferência do Real Digital, adotou-se o exemplo chamado [Escrow](https://github.com/EYBlockchain/starlight/blob/master/test/real-world-zapps/Escrow.zol) disponível no repositório da solução. A partir deste exemplo, houve necessidade de ajustes específicos e a correção de falhas visando a completa execução do fluxo. As modificações realizadas ainda não foram atualizadas no repositório oficial. Para o Piloto, será utilizada a versão ajustada pela equipe do projeto. As seções abaixo detalham a instalação e utilização das APIs para execução do cenário.

- [Passo a passo](#passo-a-passo)
  - [Geração das imagens](#1-geração-das-imagens)
  - [Configurar scripts (Postman)](#2-configurar-scripts-postman)
  - [Permissões contratos](#3-permissões-contratos)  
- [APIs](#apis)



## Passo a passo

Para efetuar os testes, é necessário realizar a configuração do cliente Starlight. Com o intuito de simplificar esse processo, disponibilizamos uma série de scripts que podem ser executados em plataformas como Postman ou outras ferramentas análogas (Insomnia, etc.).”


### 1 - Geração das imagens

O primeiro passo consiste na geração das imagens dos componentes do Starlight. Para isto deve-se seguir as instruções detalhadas abaixo:


Construção dos componentes **Zapp** e **MongoDB**
* git clone https://github.com/kaleido-io/starlight
* git checkout refactor (**IMPORTANTE:** usar essa branch)
* **ATENÇÃO**: o repositório da Kaleido contém instruções para uso do projeto. No entanto, pedimos que sigam as nossas instruções abaixo.
* cd zapps/Escrow (recomendamos executar os comandos dentro desse diretório para facilitar a instalação)
* Dentro desta pasta, copiar os seguintes arquivos que estão neste projeto: 
  * [bn.js](bn.js)
  * [config_timber.js](config_timber.js)
  * [docker-compose.yaml](docker-compose.yaml)
* Dentro da pasta zapps/Escrow/build/contracts, copiar o arquivo [EscrowShield.json](EscrowShield.json) e o arquivo [ERC20.json](ERC20.json)

Build da imagem do **MongoDB**
* docker build -t starlight-mongo -f Dockerfile.mongo .

Build da imagem do **Zapp Escrow**
* Atualizar o Dockerfile para substituir a biblioteca [bn.js](bn.js):
  * No Dockerfile, antes da linha com o comando EXPOSE, adicionar a linha:
    * COPY bn.js ./node_modules/number-to-bn/node_modules/bn.js/lib
  * docker build -t zapp-escrow -f Dockerfile . 

Construção do componente **Timber**
* git clone https://github.com/EYBlockchain/timber
* git checkout multiple-contracts (**IMPORTANTE:** usar essa branch)
* cd merkle-tree

Build da imagem do **Timber** que controla o merkle tree
* docker build -t timber .

Com as imagens dos componentes do Starlight devidamente criadas, o passo subsequente é dar início aos serviços
* Configurar os dados abaixo no [docker-compose.yaml](docker-compose.yaml) e copie para a pasta zapps/Escrow:
  * Apontar para o seu fullnode no parâmetro: RPC_URL=ws://host:porta (linha 37 e 62)
  * Endereço da sua conta: DEFAULT_ACCOUNT (linha 63)
  * Chave da sua conta default: KEY (linha 64)
  * Endereço da sua conta admin: ADMIN_ACCOUNT (linha 65)
  * Chave da sua conta admin: ADMIN_KEY (linha 66)

* Alterar as configurações do seu nó Besu, aumentando ou desabilitando o limite RPC para logs (parâmetro (RPC-MAX-LOGS-RANGE)[https://besu.hyperledger.org/23.4.0/public-networks/reference/cli/options#rpc-max-logs-range]) (necessário para o correto funcionamento do Timber)

* Executar os comandos abaixo para subir os componentes:
  * cd zapps/Escrow
  * docker-compose up
  * verificar se todos os containers estão up:

|  IMAGE                    | STATUS      |  PORTS                   | NAMES               |
| ------------------------- | ----------- | ------------------------ | ------------------- |
|  zapp-escrow              | Up          |  0.0.0.0:3000->3000/tcp  | zapp-sender         |
|  timber                   | Up          |  0.0.0.0:3100->80/tcp    | timber-sender       |
|  zokrates-worker-updated  | Up          |  80/tcp                  | zokrates-sender     |
|  starlight-mongo          | Up          |  27017/tcp               | timber-mongo-sender |
|  starlight-mongo          | Up          |  27017/tcp               | zapp-mongo-sender   |

<br />

**ATENÇÃO**

O docker-compose fornecido cria volumes para ambos os bancos de dados. Recomenda-se que os volumes não sejam apagados durante os testes.


### 2 - Configurar scripts (Postman)

* Importe o arquivo [starlight.json](starlight.json) no [Postman](https://www.postman.com/downloads/).
* Dentro do Postman, crie um ambiente e defina as seguintes variáveis:
* * `host`: `http://localhost:3000` (servidor onde está rodando o cliente, o valor default é `http://localhost:3000`)
* * `EscrowShield`: `0xf3cBfC5c2d71CdB931B004b3B5Ca4ABEdbA3Cd43` (endereço do contrato de escrow na rede)
* * `account`: `` (preencher com conta Ethereum do participante que será utilizada para o teste)

### 3 - Permissões contratos

Foi realizado o deploy do contrato inteligente denominado **EscrowShield** responsável por gerenciar os *commitments* do Starlight para os testes de transferência, assegurando que os saldos permaneçam criptografados na rede. Para participar dos testes, os envolvidos no projeto piloto deverão realizar um depósito neste contrato. Isso requer a autorização do contrato **EscrowShield** para retirar o Real Digital da carteira Ethereum do participante, o que é feito por meio do **approve** do valor no contrato de Real Digital. O endereço do contrato de escrow que necessita autorização está especificado na seção [Configurar scripts](#-2---Configurar-scripts-(Postman)).


## APIs

A interação com os testes da solução Starlight ocorrerá através de APIs configuradas de acordo com a seção [Configurar scripts](#-2---Configurar-scripts-(Postman)). O primeiro passo deve ser o depósito no contrato **EscrowShield**. Após o depósito, transferências, saques e consultas ao *commitments* podem ser realizadas através das APIs conforme detalhado a seguir:

### Realizar depósito

O operação de depósito consiste na transferência de um valor específico da carteira Ethereum de Real Digital para o contrato EscrowShield. Para que o depósito seja efetivado é necessário que a carteira possua saldo suficiente e que o **approve** tenha sido realizado conforme as diretrizes apresentadas em [Premissões de contratos](#-3---Permissões-contratos). 
Ao realizar a chamada à API de depósito, um novo *commitment* com o valor depositado será criado no banco de dados da sua aplicação ZApp local.

### Transferir Real Digital

Para transferir Real Digital deve-se definir o endereço da carteira do recebedor e efetuar a chamada à API de transferência. É requisito para a operação que haja pelo menos 2 *commitments* não gastos (isNullable is false). O resultado final será a geração de 2 novos *commitments*: um no valor da transferência para o endereço da carteira recebedora e outro para o participante pagador com o valor da diferença entre o valor dos dois *commitments* gastos e o valor da transferência. É importante notar que ambos os *commitments* recém-criados passarão a integrar o conjunto de *commitments* locais. Contudo, o commitment destinado à carteira do recebedor não estará acessível para gastos pelo pagador.
Caso não haja 2 registros de *commitments* não gastos para executar a transferência o seguinte erro será apresentado: `Cannot read properties of undefined (reading 'preimage')`

### Realizar saque

A operação de saque consiste em retirar Real Digital do contrato EscrowShield e retornar para a carteira Ethereum do participante. Para efetuar a operação, assim como na transferência, é necessário que haja ao menos 2 *commitments* não gastos (isNullable is false). Como resultado, será gerado um novo *commitment* com o valor remanescente da diferença entre o valor dos 2 *commitments* gastos e o valor do saque.
Caso não haja 2 registros de *commitments* não gastos para realizar o saque o seguinte erro será apresentado: `Cannot read properties of undefined (reading 'preimage')`

### Consultar commitments

A API de consulta possibilita a busca de todos os *commitments* registrados na base de dados do seu ZApp. Cada operação realizada, seja de depósito, transferência ou saque, gera *commitments* que ficam registrado nesta base.

Para verificar o saldo do participante, é necessário calcular o valor por meio da busca dos *commitments* e identificar aqueles gerados especificamente para você. Vale ressaltar que, nas transferências, também são registrados na base os *commitments* gerados para a parte que recebeu os fundos. O campo **mappingKey** indica sobre quais *commitments* são seus e quais são de uma contraparte.


[<<< Voltar](Starlight.md)