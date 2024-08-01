# Setup Kubernetes

## Pré-requisitos

- Acesso ao repositório piloto_rd_setup.
- Acesso ao registry da Parfin (registry.parfin.io)
- [Kubernetes](https://kubernetes.io/docs/setup/)
- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [Cluster MongoDB com ReplicaSet](#mongodb)

> **⚠️ Atenção:**
>
> Não foram realizados testes utilizando o Minikube e o K3s até o momento.

### Kubernetes Namespace

- Crie o namespace que será utilizado pelas aplicações.

```bash
kubectl create namespace <namespace>
```

### Adicionando as credenciais no cluster Kubernetes (opcional)

- Crie a secret que concederá acesso ao registry.parfin.io. Caso seu cluster tenha acesso ao registry ou esteja utilizando um repositório interno, esse passo é opcional. 

> **⚠️ Atenção:**
>
> Para solicitar essas credenciais, por favor entrar em contato através do e-mail drex-support@parfin.io.

```bash
kubectl create secret docker-registry registry-parfin-io --docker-server=registry.parfin.io --docker-username=xxxxx --docker-password=xxxxx --namespace=xxxxx
```

### Clonar Repositorio

- Faça clone do repositório piloto_rd_setup.
```bash
git clone https://github.com/raylsnetwork/piloto_rd_setup.git
```

### MongoDB

Tanto a Rayls Privacy Ledger quanto a Rayls Relayer necessitam de um cluster MongoDB com Replica Set configurado. Se não houver instalação do MongoDB com Replica Set, nem possibilidade de instalar ou usar o MongoDB Atlas, a Parfin oferece uma imagem de container do MongoDB 6 com Replica Set inicializado para o período de testes do Drex.

Essa imagem está disponível em `registry.parfin.io/mongo6_rs:latest`

> **⚠️ Atenção:**
>
> Reforçamos que essa imagem estará disponível no repositório somente enquanto durarem os testes do Drex e que não deve ser utilizada em produção. A Parfin não se responsabiliza pelo suporte no Mongo ou caso ocorra alguma perda de dados relacionada a essa imagem.


> ℹ️ No diretório ./kubernetes/dependencies está disponível um manifesto para o MongoDB. O objetivo deste manifesto é facilitar a implementação de um MongoDB.

Caso queira utilizar essa imagem basta executar o seguinte comando: 

```bash
kubectl apply -f kubernetes/dependencies/mongodb.yml -f <namespace>
```

O resultado esperado no log será dos Pods deverá ser:
```bash
{
  ok: 1,
  '$clusterTime': {
    clusterTime: Timestamp({ t: 1716990014, i: 21 }),
    signature: {
      hash: Binary.createFromBase64('AAAAAAAAAAAAAAAAAAAAAAAAAAA=', 0),
      keyId: Long('0')
    }
  },
  operationTime: Timestamp({ t: 1716990014, i: 21 })
}
REPLICA SET ONLINE
```

> ⚠️ Reforçamos que o volume da MongoDB está configurado utilizando o plugin HostPath para os testes. Caso o host seja destruído, os dados também serão removidos.

## Rayls Privacy Ledger

> ⚠️ Reforçamos que o volume da Privacy Ledger está configurado utilizando o plugin HostPath para os testes. Caso o host seja destruído, os dados também serão removidos. 

Para outras abordagens relacionadas a persistência de dados do Kubernetes, seguem alguns links de drivers e access modes disponíveis:
- [Kubernetes Persistent Volumes Access Modes](https://kubernetes.io/docs/concepts/storage/persistent-volumes/#access-modes:)
- [AWS EFS CSI](https://docs.aws.amazon.com/pt_br/eks/latest/userguide/efs-csi.html)
- [Azure CSI](https://learn.microsoft.com/pt-br/azure/aks/azure-csi-disk-storage-provision)
- [Google Cloud Persistent Volumes ](https://cloud.google.com/kubernetes-engine/docs/concepts/persistent-volumes)

### Executando a Privacy Ledger

1. Altere as variáveis de ambiente do StatefulSet.yml

| Variável                                     | Descrição                                                                                   |
|----------------------------------------------|---------------------------------------------------------------------------------------------|
| MONGODB_CONN                                 | Connection String do MongoDB. Exemplo: `mongodb://mongodb:27017/admin?directConnection=true&replicaSet=rs0`     |
| NETWORKID                                    | `CHAIN_ID` da Privacy Ledger                                                                |

> ℹ️ Caso esteja utilizando um MongoDB gerenciado (Atlas), a string de conexão `MONGODB_CONN` deverá ser `mongodb+srv://<username>:<password>@<endpoint>` 

```yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: rayls-privacy-ledger
  labels:
    app: rayls-privacy-ledger
spec:
  replicas: 1
  serviceName: rayls-privacy-ledger
  selector:
    matchLabels:
      app: rayls-privacy-ledger
  template:
    metadata:
      labels:
        app: rayls-privacy-ledger
    spec:
      volumes:
        - configMap:
            defaultMode: 0700
            name: rayls-privacy-ledger
          name: config
        - name: persistent-storage
          persistentVolumeClaim:
            claimName: rayls-privacy-ledger-pvc
      containers:
        - name: rayls-privacy-ledger
          image: registry.parfin.io/rayls-privacy-ledger:v1.8.6
          imagePullPolicy: Always
          command: ["/app/var/start.sh"]
          resources:
            limits:
              cpu: "4"
              memory: "6Gi"
          ports:
            - containerPort: 80
              name: 80tcp
              protocol: TCP
          livenessProbe:
            failureThreshold: 3
            httpGet:
              path: /
              port: 8545
              scheme: HTTP
            initialDelaySeconds: 180
            periodSeconds: 15
            successThreshold: 1
            timeoutSeconds: 1
          env:
            - name: DATADIR
              value: /app/data/raylz-private-ledger
            - name: MONGODB_DATABASE
              value: "rayls-privacy-ledger"
            - name: MINER_ETHERBASE
              value: "0x1bE478ee83095aF7F21bd84743fB39B68Dd600A6"
            - name: NETWORKID
              value: "xxxxxxxxxxx"
            - name: MONGODB_CONN
              value: "mongodb://mongodb:27017/admin?directConnection=true&replicaSet=rs0"
          volumeMounts:
            - mountPath: /app/var
              name: config
              readOnly: true
            - mountPath: /app/data
              name: persistent-storage
      imagePullSecrets:
        - name: registry-parfin-io
```

2. Alterar a capacidade de disco da Privacy Ledger nos manifestos PersistentVolume.yml e PersistentVolumeClaim
  - Recomendamos 2Gi para o período de testes

PersistentVolume.yml
```yaml
apiVersion: v1
kind: PersistentVolume
metadata:
  name: rayls-privacy-ledger-sc
spec:
  storageClassName: rayls-privacy-ledger-sc
  capacity:
    storage: 2Gi
  accessModes:
    - ReadWriteOnce
  hostPath:
    path: "/mnt/data"
```

PersistentVolumeClaim.yml
```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: rayls-privacy-ledger-pvc
spec:
  accessModes:
    - ReadWriteOnce
  storageClassName: rayls-privacy-ledger-sc
  resources:
    requests:
      storage: 2Gi
```

3. Alterar o `chainId` da Privacy Ledger no arquivo ConfigMap.yml
```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: rayls-privacy-ledger
data:
  genesis.json: |
    {
      "config": {
       "chainId": xxxxxxxxxxxxx,
       "homesteadBlock": 0,
       "eip150Block": 0,
       "eip155Block": 0,
       "eip158Block": 0,
       "byzantiumBlock": 0,
       "constantinopleBlock": 0,
       "petersburgBlock": 0,
       "istanbulBlock": 0,
       "berlinBlock": 0,
       "ethash": {}
      },
      "difficulty": "1",
      "gasLimit": "9000000000000",
      "alloc": {
        "0x5f2E7061aDd05c8B4C2b48054E5A591eFFa270Aa": {
          "balance": "300000000000000000000000"
        }
      }
    }
  config.toml: |
    [Eth]
    RPCGasCap = 9000000000000

    [Eth.Ethash]
    DisallowBlockCreation = true
    CacheDir = "ethash"
    CachesInMem = 2
    CachesOnDisk = 3
    CachesLockMmap = false
    DatasetDir = "/app/data/raylz-private-ledger/.ethash"
    DatasetsInMem = 1
    DatasetsOnDisk = 2
    DatasetsLockMmap = false
    PowMode = 0
    NotifyFull = false
  start.sh: |-
    #!/bin/sh

    /app/raylz-private-ledger \
    --http \
    --http.vhosts='*' \
    --http.addr="0.0.0.0" \
    --http.api="net,web3,eth,debug,txpool" \
    --http.port 8545 \
    --http.corsdomain '*' \
    --ipcdisable \
    --ws \
    --ws.addr="0.0.0.0" \
    --ws.port 8660 \
    --ws.api eth,net,web3 \
    --ws.origins '*' \
    --datadir "${DATADIR}" \
    --networkid "${NETWORKID}" \
    --mine \
    --miner.threads=1 \
    --miner.etherbase="${MINER_ETHERBASE}" \
    --metrics \
    --pprof \
    --metrics.addr 0.0.0.0 \
    --metrics.port 6080 \
    --pprof.addr 0.0.0.0  \
    --rpc.gascap 0 \
    --gcmode "archive" \
    --syncmode=full \
    --miner.gasprice 0 \
    --port 30309 \
    --config /app/var/config.toml \
    --db.engine mongodb \
    --db.engine.host "${MONGODB_CONN}" \
    --db.engine.name="${MONGODB_DATABASE}" \
    /app/var/genesis.json
```

4. Execute os manifestos da pasta `kubernetes/rayls/privacy-ledger`

```bash
kubectl apply -f rayls/privacy-ledger -n <namespace>
```

O log da Privacy Ledger deverá conter o seguinte output antes de executar o Relayer:
```bash
INFO [05-29|13:51:03.539] Looking for peers  peercount=0 tried=0 static=0
INFO [05-29|13:51:15.556] Looking for peers  peercount=0 tried=8 static=0
```
> ⚠️ Importante validar que o CHAIND no log seja o mesmo que foi ajustado no StatefulSet.yml e também no ConfigMap.yml

## Rayls Relayer

1. Altere as variáveis necessárias no ConfigMap.yml

| Variável                                     | Descrição                                                                         |
|----------------------------------------------|-----------------------------------------------------------------------------------|
| Database.ConnectionString                |Connection String do MongoDB. Exemplo: `mongodb://mongodb:27017/admin?directConnection=true&replicaSet=rs0`|
| Blockchain.ChainId                       | `CHAIN_ID` da Privacy Ledger                                                          |
| Blockchain.ChainURL                      | URL RPC da Privacy Ledger                                                             |
| Blockchain.ChainWSURL                    | URL WebSocket da Privacy Ledger                                                       |
| CommitChain.ChainURL                     | URL RPC da Commit Chain                                                               |
| CommitChain.ChainWSUrl                   | URL Web Socket da Commit Chain                                                        |

> ℹ️ Caso esteja utilizando um MongoDB gerenciado (Atlas), a string de conexão `MONGODB_CONN` deverá ser `mongodb+srv://<username>:<password>@<endpoint>` 

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: rayls-relayer
data:
  config.json: |
    {
      "Database": {
        "ConnectionString": "mongodb://mongodb:27017/admin?directConnection=true&replicaSet=rs0",
        "Name": "rayls-relayer",
        "Type": "mongodb"
      },
      "Blockchain": {
        "ChainID": "xxxxxxxxxxxx",
        "ChainURL": "http://rayls-privacy-ledger:8545",
        "ChainWSURL": "ws://rayls-privacy-ledger:8660",
        "BatchSize": 1000,
        "StartingBlock": "0"
      },
      "CommitChain": {
        "ChainURL": "xxxxxxxxxxxxx",
        "ChainWSUrl": "xxxxxxxxxxx",
        "CommitChainPLStorageContract": "0x4066b405B6FD10798b7c310C1aa77b351aAC6B8C",
        "ParticipantStorageContract": "0x8863d38A64D5B59F5208b163801e60dEb9eB9AD5",
        "ChainId": "381660001",
        "CcStartingBlock": 5966146,
        "CcAtomicRevertStartingBlock": "5966146",
        "Version": "1.8.6.2",
        "AtomicTeleportContract": "0x27A7DB9E328E68F1ab2cF86Bc803Ee4cF264fffc",
        "ResourceRegistryContract": "0xc44f4350544F3E075b11243fcf83A864d575c0c7",
        "CcEndpointAddress": "0x6928638433Dd9116A4A02b0813E1B19723C9f8F6",
        "BalanceCommitmentContract": "0xC7f7f47800d510B22DB2e9c1e3090c0E4B51Cc30",
        "TokenRegistryContract": "0x06585a6C01f9bcD21dE797479fdCBaFAc6c161b2",
        "OperatorChainId": "999"
      }
    }
```
2. Execute os manifestos da pasta `kubernetes/rayls/relayer`

```bash
kubectl apply -f rayls/relayer/ -n <namespace>
```

Os logs do pod em um cenário de sucesso será:
```bash
[14:21:10 2024-05-29] DEBUG: Attempt to ensure private keys set and contracts deployed | 
[14:21:10 2024-05-29] INFO: Check if Private Ledger has Private Keys defined... | 
[14:21:10 2024-05-29] INFO: Check if Private Ledger is deployed... | 
[14:21:10 2024-05-29] INFO: Deployment not found | Version="1.8.6.2" 
[14:21:10 2024-05-29] INFO: No other deployment found for this version. Starting a new deployment... | 
[14:21:10 2024-05-29] INFO: Deploying Private Ledger contracts | 
[14:21:10 2024-05-29] INFO: SignatureStorage deployment transaction sent | TX_HASH=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx 
[14:21:42 2024-05-29] INFO: DeployRaylzMessageExecutor deployment transaction sent. Hash: | TX_HASH=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx 
[14:21:52 2024-05-29] INFO: DeployEndpoint deployment transaction sent: | TX_HASH=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx 
[14:21:55 2024-05-29] INFO: DeployRaylzContractFactory deployment transaction sent. Hash: | TX_HASH=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx 
[14:22:12 2024-05-29] INFO: Deployment document inserted | version="1.8.6.2" 
[14:22:12 2024-05-29] INFO: 📝 Endpoint Address from Private Ledger  | ADDRESS=0xExEMPL0AFa067aCC9EXAMPLE6C382282bEXAMPL1
```

> ⚠️ Importante armazenar os valores do `Endpoint Address from Privacy Ledger`, ele será utilizado pelo time de desenvolvimento


<br>

[<<< Voltar](../Rayls.md)