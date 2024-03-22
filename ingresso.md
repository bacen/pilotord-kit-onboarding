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

    - https://besu.hyperledger.org/private-networks/get-started/install/

    - https://github.com/ConsenSys/quorum-kubernetes 
    
    - https://besu.hyperledger.org/private-networks/tutorials/kubernetes/
    
    - https://besu.hyperledger.org/private-networks/tutorials/azure/

## Configuração do nó do participante

Para implantar o nó do participante na rede piloto do Real Digital deverão ser utilizadas as seguintes configurações:

### Nome do nó do participante

De forma a facilitar a identificação do nó do participante durante o piloto, estabeleceu-se o seguinte padrão para o nome do nó:

**função-participante-sequencial >>> ex.: fullnode-bcb-1**

* função: papel do nó na rede. Os papéis podem ser: bootnode, validador ou fullnode. No caso dos participantes do piloto, será sempre **fullnode**

* participante: identificador do participante. Exemplo: bcb, selic, etc

* sequencial: número sequencial (caso o participante tenha mais de nó)
    
Configurar o nome do nó do participante no parâmetro **identity** no arquivo config.toml ou na variável de ambiente BESU_IDENTITY.
    - https://besu.hyperledger.org/public-networks/reference/cli/options#identity

### Gênesis

Considerar o arquivo [genesis.json](genesis.json), disponibilizado neste kit-onboarding, para realizar o _deploy_ do nó do participante.
Importante que o arquivo genesis.json esteja sincronizado para se conectar à rede, pois, algumas informações não podem ser diferentes, como por exemplo:

* chainID (identificador da rede)
* extraData (https://besu.hyperledger.org/private-networks/how-to/configure/consensus/qbft/#extra-data)

### Config.toml

Está disponível neste kit-onboarding um template do arquivo [config.toml](config.toml) para ser utilizado na configuração do nó do participante. Atentar para os parâmetros que devem ser customizados conforme o seu ambiente (`p2p-host`, `p2p-port` e `nat-method`). Consulte a [documentação](https://besu.hyperledger.org/public-networks/how-to/connect/specify-nat/#kubernetes) do Besu sobre como configurar esses parâmetros.


### Conexão do nó com a rede Drex

A interconexão do nó Besu com a rede Drex utiliza o modelo de "Static nodes" com o mecanismo de auto-discovery desabilitado, conforme definido na [documentação](https://besu.hyperledger.org/public-networks/how-to/connect/static-nodes) oficial do produto.

Dessa forma as conexões são estabelecidas com destinatários pré-definidos no arquivo static-nodes.json.

Está disponível neste kit-onboarding um template do arquivo [static-nodes.json](static-nodes.json) com o mapeamento dos enodes aos quais o nó do participante deve se conectar.



## Permissionamento do participante na rede do piloto

O permissionamento na rede será efetuado, por meio de contrato, exclusivamente pelo Banco Central do Brasil, administrador da rede.

Para solicitar a permissão, siga os passos abaixo:

* O enode a ser informado é composto pelo enodeID + host (IP RSFN) + port.
    - "enode://enodeID@host:port"

* Para obter o enodeID sem precisar subir o nó do participante, execute o comando abaixo que extrai o enode, porém a informação vem sem os dados de IP e porta, que devem ser complementados pelo participante.

    - **comando:** _besu --data-path=Node-01/data/ public-key export-address_

    - A saída de comando virá assim:
    ```
    2023-07-04 18:02:04.180-03:00 | main | INFO  | KeyPairUtil | Loaded public key 0x46163abddb5beb0599e73e468c0a2927f53408f871beb8e41c09b38b7fed933d149de697e3f20c963135e75b6293b094ceea08600e59524751de0bdff8b3e0e4 from /nfs-server/hyperledger-des/springboot/besu/hyperledger-01/data/key 0x4ee291a08e09bde67cfcb279db9fe957b707b4a6
    ```

    - no caso acima, o enode seria: enode://46163abddb5beb0599e73e468c0a2927f53408f871beb8e41c09b38b7fed933d149de697e3f20c963135e75b6293b094ceea08600e59524751de0bdff8b3e0e4@IP_RSFN:PORT

* Fornecer por email ao Banco Central do Brasil o _enode_ do nó do participante (obtido no passo anterior):
    - e-mail: piloto.rd.tecnologia@bcb.gov.br 
    - assunto: DEINF | Permissão de Nó na Rede | Participante: [nome do participante]

* Configurar os seguintes parâmetros no arquivo config.toml do nó do participante. O arquivo de exemplo já possui esses parâmetros.

    * Arquivo config.toml:
    ```        
    permissions-nodes-contract-enabled=true
    permissions-nodes-contract-address="0x0000000000000000000000000000000000009999"
    permissions-nodes-contract-version=2
    permissions-accounts-contract-enabled=true
    permissions-accounts-contract-address="0xb3f31049dADf7Ab0239afc2f04568CB19543044D"

    ```

## Execução do nó do participante

Após realizar os passos acima, e receber a confirmação do Banco Central do Brasil sobre a autorização do nó, execute o nó do participante e verifique as seguintes informações:

Para conferir se o nó subiu corretamente, verifique as seguintes informações:

* Caso esteja executando o nó em container, verifique se ele está com status healthy.

* Realize um teste de conexão (telnet, nc, echo) no endereço e porta do seu nó.
Importante realizar este teste na porta de _discovery_ tanto para o protocolo TCP quanto para o protocolo UDP.

* Verifique no log do nó se ele foi iniciado corretamente:
    ``` 
    | main | INFO | FullSyncDownloader | Starting full sync.*
    | main | INFO | FullSyncTargetManager | Unable to find sync target. Currently checking 0 peers for usefulness*
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
