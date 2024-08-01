# Setup Docker

## Pré-requisitos

Para que os componentes dos participantes do Drex possam utilizar a Rayls, é necessário:

- Acesso ao repositório piloto_rd_setup.
- Acesso ao registry da Parfin (registry.parfin.io)
- WSL/Sistema operacional Linux
- ChainID que foi disponibilizado previamente pelo Banco Central
- [Make](https://www.gnu.org/software/make/)
- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [Docker](https://docs.docker.com/engine/install/ubuntu/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- Cluster MongoDB com ReplicaSet

Caso tenha alguma dúvida, na [FAQ](#faq) abaixo estão descritos os comandos para checar se os componentes estão instalados e quais as versões dos mesmos 

### Clonar Repositorio

> **⚠️ Atenção:**
>
> Os tokens de acesso pessoal são uma alternativa ao uso de senhas para autenticação no GitHub ao usar a API do GitHub ou a linha de comando.
> https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens

- Faça clone do repositório piloto_rd_setup.
```bash
git clone https://github.com/raylsnetwork/piloto_rd_setup.git
cd piloto_rd_setup
```

## Instalando o ambiente Rayls

> **⚠️ Atenção:**
> Tanto a Rayls Privacy Ledger quanto o Rayls Relayer necessitam de um cluster MongoDB com Replica Set configurado. Caso nenhuma connection string seja informada, inicializaremos um cluster MongoDB local com Replica Set configurado.
>
> Reforçamos que essa imagem estará disponível no repositório somente enquanto durarem os testes do Drex e que não deve ser utilizada em produção. A Parfin não se responsabiliza pelo suporte no Mongo ou caso ocorra alguma perda de dados relacionada a essa imagem.

#### Importante

- O container do mongo persistirá os dados no diretório ./mongodb/data
- Para remover os dados basta executar o comando sudo rm -rf ./mongodb/data
- É essencial que o MongoDB esteja operacional para inicializar a Rayls Network

### Instalação

1. Realizar login no registry da Parfin:
```bash
docker login registry.parfin.io
```

2. Para inicializar o ambiente Rayls com MongoDB local basta utilizar o seguinte comando:
```bash
cd docker
make up-rayls CHAINID=xxxxxxxxx COMMIT_CHAIN_RPC_URL=http://commit-chain-rpc-url:commit-chain-rpc-port COMMIT_CHAIN_WS_URL=ws://commit-chain-ws-url:commit-chain-ws-port     
```
Caso prefira utilizar um MongoDB gerenciado (MongoDB Atlas), basta informar a string de conexão como parâmetro:
```bash
cd docker
make up-rayls CHAINID=xxxxxxxxx COMMIT_CHAIN_RPC_URL=http://commit-chain-rpc-url:commit-chain-rpc-port COMMIT_CHAIN_WS_URL=ws://commit-chain-ws-url:commit-chain-ws-port MONGODB_CONNECTION_STRING='mongodb+srv://username:password@endpoint' 
```

- Após inicializar o ambiente o seguinte output será exibido:

```bash
Directories created:
./rayls/privacy-ledger/data
./rayls/privacy-ledger/var
./rayls/relayer/var

Files created:
./rayls/privacy-ledger/var/genesis.json
./rayls/privacy-ledger/var/config.toml
./rayls/privacy-ledger/var/start.sh
./docker-compose.yml

CHAINID was updated in the following files:
./rayls/privacy-ledger/var/genesis.json
./rayls/privacy-ledger/var/start.sh

Starting Rayls Environment!
```

- Após alguns segundos todos os recursos serão provisionados automaticamente:

```bash
[+] Running 2/2
 ✔ Container docker-privacy-ledger-1  Running
 ✔ Container docker-relayer-1         Started
```

Os logs da Privacy Ledger e Relayer serão exibidos automaticamente no terminal, o resultado esperado no log será:
```bash
privacy-ledger-1  | INFO [07-04|14:33:00.521] Generating DAG in progress               epoch=1 percentage=64 elapsed=23.524s
privacy-ledger-1  | INFO [07-04|14:33:00.858] Generating DAG in progress               epoch=1 percentage=65 elapsed=23.861s
privacy-ledger-1  | INFO [07-04|14:33:01.189] Generating DAG in progress               epoch=1 percentage=66 elapsed=24.192s
relayer-1         | [14:33:01 2024-07-04] INFO: Deployment document inserted | version="1.8.6.2" 
relayer-1         | [14:33:01 2024-07-04] INFO: 📝 Endpoint Address from Private Ledger  | ADDRESS=0xExEMPL0AFa067aCC9EXAMPLE6C382282bEXAMPL1 
```
Após isso basta interromper a execução dos logs utilizando o comando `ctrl + c`

> ⚠️ Importante armazenar os valores do `Endpoint Address from Privacy Ledger`.

### FAQ

#### Comandos para verificar os pré requisitos e as versões instaladas

- Linux: `uname -a` -> Este comando irá exibir a versão do Sistema Operacional e informações do Kernel
- git: `git --version` -> Este comando irá exibir a versão do git instalada. Se não estiver será retornado um erro dizendo que o git não foi encontrado
- make: `make --version` -> Este comando irá exibir a versão do make instalada. Se não estiver será retornado um erro dizendo que o make não foi encontrado
- docker: `docker --version` -> Este comando irá exibir a versão do docker instalada. Se não estiver será retornado um erro dizendo que o docker não foi encontrado
- docker compose: `docker compose version` -> Este comando irá exibir a versão do docker compose instalada. Se não estiver será retornado um erro dizendo que o docker compose não foi encontrado

#### Como verifico os comandos disponíveis neste projeto?

Para verificar os comandos disponíveis basta rodar o comando `make help`

```bash
up-rayls       - Start the Privacy Ledger, Relayer
down-rayls     - Stop the Privacy Ledger, Relayer and remove orphans
down           - Stop all services and remove orphans
destroy-rayls  - Destroy the Rayls directory
destroy-all    - Destroy the Rayls directory, Mongodb directory and Docker Compose file
```

#### Como verifico se meus containers estão rodando?

```bash
docker ps
```

#### Como verifico os logs dos containers?

Para visualizar os logs dos containers basta executar os seguintes comandos:

```bash
docker logs docker-privacy-ledger-1 -f
docker logs docker-relayer-1 -f
```


<br>

[<<< Voltar](../Rayls.md)