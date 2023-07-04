# Conexão com a rede do Real Digital

## Objetivo

Esta documentação tem como objetivo estabelecer pré-requisitos de participação na rede do Real Digital e definir padrões de configuração para implantação do nó do participante nessa rede.

Por se tratar de um piloto em ambiente de testes, os padrões adotados poderão sofrer ajustes que serão refletidos na documentação apresentada.

## Pré-requisitos e premissas

Para participar do piloto do Real Digital, são necessários os seguintes itens:
* O participante deve alocar as equipes necessárias, com dimensionamento e qualificação técnica adequados à execução das configurações de seu nó  na rede.
* O participante é responsável por disponibilizar e implantar infraestruturas de processamento, comunicação e segurança (hardwares e softwares) que suportarão o Piloto RD em sua ponta de atuação.
* Cada participante poderá ter apenas 1 nó na rede e se conectará aos demais nós por meio da RSFN - Rede do Sistema Financeiro Nacional.
  * Para esta comunicação do piloto, via RSFN, será necessário uma banda mínima disponível de 6Mbps a fim de evitar risco à operação normal dos demais serviços.
  * Os links individuais de acesso à RSFN devem ter largura de banda mínima de 10Mbps, sendo necessário observar ainda a redundância prevista no [Manual de Redes do SFN](https://www.bcb.gov.br/estabilidadefinanceira/comunicacaodados).
* O participante poderá ter nó apenas do tipo fullnode/RPC, não podendo ter nó do tipo validador ou bootnode.
* A porta padrão do nó do participante é 30303 (TCP/UDP).
* O acesso à RSFN deverá ter as seguintes portas (TCP/UDP) liberadas:
   * IP nó participante:30303 <- IPs dos demais participantes e IPs do Bacen* ou RSFN; 
   * IP nó participante -> IPs dos demais participantes e IPs do Bacen*:30000-30009 e 30303 ou RSFN:30000-30009 e 30303
* *O participante que optar por liberação mais restritiva deverá solicitar ao Bacen listagem dos participantes da rede com respectivos blocos de endereço na RSFN.
* Durante a vigência do Piloto RD, fica suspensa, exclusivamente para os participantes selecionados, a vedação de comunicação direta entre si estabelecida no item 1.5 do [Manual de Redes do SFN](https://www.bcb.gov.br/estabilidadefinanceira/comunicacaodados).
* Os dados utilizados nos testes deverão ser fictícios e não devem ser armazenados ou replicados para ambientes computacionais alheios aos das instituições autorizadas conforme regulamentação vigente.
* Testes de carga deverão ser previamente combinados e autorizados pelo Banco Central do Brasil.


## Pré-instalação
* Baixar a [coleção de scripts](https://www.postman.com/hyperledger/workspace/hyperledger-besu/overview) de chamadas das APIs do BESU via Postman. Os scripts são opcionais às validações por CLI
* Como sugestão, a implantação do nó do participante poderá ser realizada utilizando os links abaixo:

    - https://besu.hyperledger.org/stable/private-networks/get-started/install/

    - https://github.com/ConsenSys/quorum-kubernetes 
    
    - https://besu.hyperledger.org/stable/private-networks/tutorials/kubernetes/
    
    - https://besu.hyperledger.org/stable/private-networks/tutorials/azure/

## Configuração do nó do participante

Para implantar o nó do participante na rede piloto do Real Digital deverão ser utilizadas as seguintes configurações:

### Nome do nó do participante

De forma a facilitar a identificação do nó do participante durante o piloto, estabeleceu-se o seguinte padrão para o nome do nó:

**função-participante-sequencial >>> ex.: fullnode-bcb-1**

* função: papel do nó na rede. Os papéis podem ser: bootnode, validador ou fullnode. No caso dos participantes do piloto, será sempre **fullnode**

* participante: identificador do participante. Exemplo: bcb, selic, etc

* sequencial: número sequencial (caso o participante tenha mais de nó)
    
Configurar o nome do nó do participante no parâmetro **identity** no arquivo config.toml ou na variável de ambiente BESU_IDENTITY.
    - https://besu.hyperledger.org/stable/public-networks/reference/cli/options/#identity

### Gênesis

Considerar o arquivo [genesis.json](genesis.json), disponibilizado neste kit-onboarding, para realizar o _deploy_ do nó do participante.
Importante que o arquivo genesis.json esteja sincronizado para se conectar à rede, pois, algumas informações não podem ser diferentes, como por exemplo:

* chainID (identificador da rede)
* extraData (https://besu.hyperledger.org/stable/private-networks/how-to/configure/consensus/qbft/#extra-data)

### Config.toml

Está disponível neste kit-onboarding um template do arquivo [config.toml](config.toml) para ser utilizado na configuração do nó do participante. Atentar para os parâmetros que devem ser customizados conforme o seu ambiente (`p2p-host`, `p2p-port` e `nat-method`). Consulte a [documentação](https://besu.hyperledger.org/stable/public-networks/how-to/connect/specify-nat/#kubernetes) do Besu sobre como configurar esses parâmetros.


### Discovery (Bootnode)

O _discovery_ será efetuado de forma automática usando bootnodes. Através deles serão disponibilizados os endereços (enodes) dos participantes da rede para que o nó faça automaticamente a conexão com cada _peer_. Foram disponibilizados 4 bootnodes na rede para atender os requisitos mínimos de resiliência e disponibilidade.

Os quatro endereços (enodes) abaixo devem ser configurados no parâmetro (BESU_ENODE_BOOTNODES), separados por vírgula, no arquivo de variáveis de ambiente do container BESU.

    * Os enodes dos Bootnodes:
        **validator-bcb-1**
            enode://6402a9957982b006576a9c52d259b1b0959ddb69c0a9661d3e605ca4f6efd567880ea42053a61c01524d64c66d4a419b097f400a16305e142b7350e67b803bf9@200.218.66.38:30004

        **validator-bcb-2**
            enode://b6db3da7f706efaba257a48a313eabfcc0e9431111d773bad441f99534faaa0d2802b749d34246d87e6c7efb85e743c302a3a8085609a5863cae9e4da3b44124@200.218.66.36:30005

        **validator-selic-01**
            enode://fbf06435ebfb61113341de8b68156d86534bd8be297a0e567b4858ca5de7ac9f0a8aceda3abcf80815a3b0cd08cbc9b302ae091f538e1c44ed7a8823b76af0b8@200.218.66.113:30303

        **validator-selic-02**
            enode://36af70abfecd5a9277e4825b69a835de34c1c225cfce45ad14ad95f61070eb20c94ab715ab15d040a5e5213c37c5fe873a4da86eaa87b9c9245f656ca967e95a@200.218.66.85:30303
        

Exemplo: 
    BESU_ENODE_BOOTNODES="enode://bootnode1@host:port,enode://bootnode2@host:port,enode://bootnode3@host:port,enode://bootnode4@host:port"

## Execução do nó do participante

Após realizar os passos acima, deve ser efetuada a implantação do nó em seu ambiente.
Para conferir se o nó subiu corretamente, verifique as seguintes informações:

* Caso esteja executando o nó em container, verifique se ele está com status healthy.

* Realize um teste de conexão (telnet, nc, echo) no endereço e porta do seu nó.
Importante realizar este teste na porta de _discovery_ tanto para o protocolo TCP quanto para o protocolo UDP.

* Verifique no log do nó se ele foi iniciado corretamente:
    ``` 
    | main | INFO | FullSyncDownloader | Starting full sync.*
    | main | INFO | FullSyncTargetManager | Unable to find sync target. Currently checking 0 peers for usefulness*
    ```

* Uma vez iniciado, execute a API `ADMIN\admin_nodeInfo` para obter o endereço (atributo **enode** da resposta) do seu nó, 
pois você usará esse dado no passo de permissionamento do nó na rede do piloto. Certifique-se de que o endereço fornecido na resposta à consulta seja o IP público da RSFN que será utilizado pelo participante ao longo do piloto.

O retorno da API será algo parecido com o abaixo:

```json
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": {
            "enode": "enode://xxxx@host:port",
            "listenAddr": "200.218.66.38:30002",
            "ip": "200.218.66.38",
            "name": "besu/bootnode-bcb-1/v23.1.2/linux-x86_64/openjdk-java-17",
            "id": "xxxx",
            "ports": {
                "discovery": 30002,
                "listener": 30002
            },
            "protocols": {
                "eth": {
                    "config": {
                        "chainId": 381660001,
                        "muirGlacierBlock": 0,
                        "qbft": {
                            "epochLength": 30000,
                            "blockPeriodSeconds": 5,
                            "requestTimeoutSeconds": 10
                        }
                    },
                    "difficulty": 119929,
                    "genesis": "xxxx",
                    "head": "xxxx",
                    "network": 381660001
                }
            }
        }
    }
```

## Permissionamento do nó do participante na rede do piloto

O permissionamento na rede será efetuado, por meio de contrato, exclusivamente pelo Banco Central do Brasil, administrador da rede.

Para solicitar a permissão, siga os passos abaixo:

* Fornecer por email ao Banco Central do Brasil o _enode_ do nó do participante (obtido no passo anterior):
    - e-mail: piloto.rd.tecnologia@bcb.gov.br 
    - assunto: DEINF | Permissão de Nó na Rede | Participante: [nome do participante]

* Configurar os seguintes parâmetros no arquivo config.toml do nó do participante. O arquivo de exemplo já possui esses parâmetros, basta descomentá-los.

    * Arquivo config.toml:
    ```        
    permissions-nodes-contract-enabled=true
    permissions-nodes-contract-address="0x3821eC14ECCF3FEe769B22239184A873a1aa2065"
    permissions-nodes-contract-version=2
    ```

Após receber a confirmação do Banco Central do Brasil sobre a autorização do nó e, após realizar as configurações acima, execute o nó do participante novamente e verifique as seguintes informações:

* Verifique se o container do nó está com status healthy.

* Verifique no log do nó se ele foi iniciado corretamente:
    ```
    | main | INFO | FullSyncDownloader | Starting full sync.
    | main | INFO | FullSyncTargetManager | Unable to find sync target. Currently checking 0 peers for usefulness
    ```

* Execute a API `NET\net_peerCount` para verificar em quantos peers o nó do participante se conectou. A quantidade de nós conectados ao seu nó vai depender da quantidade de nós que estão conectados na rede no momento. É esperado que o nó do participante conecte-se a mais de 1 nó na rede. O retorno da API será algo parecido:

```json
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": "0x7"
    }
```
    
    
* Execute a API `ADMIN\admin_peers` para verificar quais nós se conectaram. Quando se utiliza bootnodes na rede, o discovery deverá ocorrer de forma automática, portanto, nessa lista, você deverá encontrar os nós conectados ao nó do participante.  O retorno da API será algo parecido com o abaixo:

```json
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": [
            {
                "version": "0x5",
                "name": "besu/fullnode-bcb-1/v23.1.2/linux-x86_64/openjdk-java-17",
                "caps": [
                    "eth/62",
                    "eth/63",
                    "eth/64",
                    "eth/65",
                    "eth/66",
                    "eth/67",
                    "eth/68",
                    "istanbul/100",
                    "snap/1"
                ],
                "network": {
                    "localAddress": "172.17.38.196:30002",
                    "remoteAddress": "200.218.66.36:60964"
                },
                "port": "0x7530",
                "id": "xxxx",
                "protocols": {
                    "eth": {
                        "difficulty": "0x1d772",
                        "head": "xxxx",
                        "version": 68
                    }
                },
                "enode": "enode://b39d76f80ba5615f84b7c429a3f3467d4fb4f17bf64fa80dbf733a0efed261a16c4e07ace321e5f86ed19fefb85ed5f3d791f6e85fddf6c465cb8315056f069f@200.218.66.36:30000?discport=0"
            },
            {
                "version": "0x5",
                "name": "besu/bootnode-bcb-2/v23.1.2/linux-x86_64/openjdk-java-17",
                "caps": [
                    "eth/62",
                    "eth/63",
                    "eth/64",
                    "eth/65",
                    "eth/66",
                    "eth/67",
                    "eth/68",
                    "istanbul/100",
                    "snap/1"
                ],
                "network": {
                    "localAddress": "172.17.38.196:35674",
                    "remoteAddress": "200.218.66.39:30003"
                },
                "port": "0x7533",
                "id": "xxxx",
                "protocols": {
                    "eth": {
                        "difficulty": "0x1d772",
                        "head": "xxxx",
                        "version": 68
                    }
                },
                "enode": "enode://cc60171dd6a652d0c9f567308eef145aa45f030249ff26b597143213b1212666de61d167426452c99614d39258a155b8ead875ad8b26f1b28685a1495e5995df@200.218.66.39:30003"
            }
        ]
    }
```

## Conectividade com sucesso na rede
    
Se você conseguiu implantar o seu nó e ele conseguiu conectar nos peers que o bootnode disponibilizou, então bem-vindo à rede do piloto do Real Digital.

O próximo passo será validar o uso de smart contract e transações na rede.

## Problemas comuns

Possíveis problemas para o nó do participante NÃO se conectar à rede do piloto:

Verifique sua rede:

* Falta liberação no firewall dos endereços e portas;
* Falta liberação no firewall da porta para o protocolo UDP;
* Regras de NAT não configuradas corretamente;

Verifique o nó do participante:

* Permissonamento não concedido pelo administrador do contrato;
* Implantar o nó sem expor as portas do container (TCP e UDP);
* Genesis configurado errado (verificar extradata, chainId);
* Apontamento para o enode errado do bootnodes;


[<<< Voltar](README.md)
