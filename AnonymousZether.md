# Anonymous Zether

O Anonymous Zether é uma solução de privacidade e anonimidade desenvolvida pela JPMorgan e posteriormente incorporada pela Consensys.

Esta é baseada em um paper da Universidade de Stanford em parceira com a Visa, link [aqui](https://crypto.stanford.edu/~buenz/papers/zether.pdf).

A solução se baseia na criptografia ElGamal, que é uma criptografia assimétrica (possui um par de chave pública e privada) e homomórfica (permite cálculos entre números criptografados).

Além disso, o contrato consegue verificar que o valor subtraído é igual ao valor adicionado, usando provas de conhecimento zero.

Para mais detalhes, consulte as apresentações na pasta [docs](./docs)

## Cenário 1: Transferência simples

#### Passo a passo

É necessário configurar o client do anonymous zether para realizar os testes de privacidade.
Esse client utiliza dependências do anonymous zether (server), por isso também será necessário configurar ele.
Para facilitar os testes foi disponibilizado alguns scripts que rodam no postman ou ferramenta similar (insomnia, etc).

#### 0 - Configurar o anonymous zether

* Clonar no mesmo diretório raiz, os repositórios da [Consensys](https://github.com/Consensys/anonymous-zether) e da [Kaleido](https://github.com/kaleido-io/anonymous-zether-client/tree/real-digital) (Importante: usar a branch real-digital).
* Instalar as dependências (`yarn` ou `npm install`) dos dois projetos.
* No projeto da Kaleido, configurar o arquivo `.env` da seguinte forma:
```
ERC20_ADDRESS='0x3A34C530700E3835794eaE04d2a4F22Ce750eF7e' (Endereço do contrato do Real Digital)
ZSC_ADDRESS='0x9ecbbA5758D719415F641192E542f8e4cc7934C3' (Endereço do contrato zether)
CHAIN_ID='381660001'
ADMIN_SIGNER='<Chave privada de uma carteira habilitada e com saldo>'
AUTHORITY_SIGNER='<Mesma chave do admin>'
ETH_URL='<URL websocket do seu nó>' (ex: 'ws://172.17.42.90:30200')
DATA_DIR='/tmp/zether'
```
* Execute a aplicação servidor através do comando (`npm start`) no anonymous-zether-client

#### 0.1 - Configurar scripts (Postman)

* Importe o arquivo [zether-client.json](./zether-client.json) no [Postman](https://www.postman.com/downloads/).
* Dentro do Postman, crie um ambiente e defina as seguintes variáveis:
* * `host1`: `http://localhost:3000` (servidor onde está rodando o cliente, o valor default é `http://localhost:3000`)
* * `zsc1`: `` (endereço do contrato de zether na rede)

#### 1 - Criar chaves Ethereum e ElGamal

* Agora precisamos criar as chaves Ethereum e ElGamal que serão utilizadas nessa camada de privacidade.
* Execute a chamada `Create Participant Account`, alterando o corpo da requisição.
* * Nome da conta do participante: Favor informar o CNPJ8 do participante. Esse nome não poderá ser duplicado, portanto, no piloto convencionamos como padrão o uso do CNPJ8.
* Esta chamada criará um par de chaves Ethereum e ElGamal e vai gravar no postman nas variavéis participantEth e participantShielded com os valores das chaves. Você pode consultar esses dados no ambiente que você criou no passo anterior.
* Para confirmar que as chaves foram criadas com sucesso, execute a chamada `Get accounts`

#### 2 - Registrar chaves ElGamal no contrato Zether

* Registre a sua chave no contrato de zether através da chamada `Register Participant in Real Digital ZSC`, alterando o corpo da requisição
* * Nome da conta do participante: Favor informar o CNPJ8 do participante. Esse nome não poderá ser duplicado, portanto, no piloto convencionamos como padrão o uso do CNPJ8.
* * ZSC1: variável de ambiente com o endereço do contrato ZSC criado na rede do piloto. (Poderá obter no address discover com nome ZSCRestricted)
* Confirme que o registro foi feito através da chamada `Get shielded accounts in Real Digital ZSC`
* Use os exemplos do RealDigitalEnableAccount e do STR para habilitar e mintar Real Digital na carteira gerada pelo cliente no primeiro passo

#### 3 - Mover fundos para o contrato Zether

* Execute a chamada `Participant funds shielded account in Real Digital ZSC` para mover o saldo em Real Digital para o contrato Zether
* Cheque o seu saldo em zether com a chamada `Participant checks shielded balance in Real Digital ZSC` 

#### 4 - Transferir Real Digital via Zether

* Escolha um outro participante registrado e execute a chamada `Participant A transfers 50 Real Digital zether to Participant B` para mover Real Digital. No corpo da requisição, o campo `sender` e `receiver` devem estar no formato abaixo, ou seja, apenas uma string com as duas partes da chave ElGamal separadas por uma vírgula: 
```
0x159679aa94befe3c67c951cb659f6f4f8746d2503163cdd4300407fe2ce53c2a,0x245e09c47e3c8d1394333e780163a210b9ffff4ca150b7987fd878ba9bd613bf
```
* Cheque o seu saldo em zether com a chamada `Participant checks shielded balance in Real Digital ZSC` 
* Refaça a transação caso ocorra um dos erros "Sigma protocol challenge equality failure." ou "Recovery failure for B^w * A.". Provavelmente, as provas estão vinculadas a uma época anterior.

#### 5 - Mover Real Digital de volta para a carteira Ethereum

* Execute a chamada `Participant withdraws Real Digital zether` para mover os fundos em Zether de volta para a carteira Ethereum.
* Refaça a transação caso ocorra um dos erros "Sigma protocol challenge equality failure." ou "Recovery failure for B^w * A.". Provavelmente, as provas estão vinculadas a uma época anterior.


## Cenário 2: DvP de Título Público Federal tokenizado

O DvP com Anonymous Zether depende de três contratos: um contrato de Zether para Real Digital, um contrato de Zether para TPFt e um contrato de DvP.

O contrato de Zether para Real Digital usado para o DvP é diferente do contrato usado para transferência simples, por usar uma época maior, de 60 segundos.

* É necessário configurar o client para cada papel (cedente e cessionário) que for testar. `Dica:` configure os dois client (cedente e cessionário). Use portas diferentes na variável PORT no seu arquivo `.env`.

* O DATA_DIR dos dois client, tanto para o cedente como para o cessionário, deve ser o mesmo. Ex.: "/../../tmp/zether".

* `Não utilize o client do teste anterior. (cenário 1: transferência simples)`

* Baixe ou clone no mesmo diretório raiz, os repositórios da [Consensys](https://github.com/Consensys/anonymous-zether) e a nova versão da [Kaleido](https://github.com/kaleido-io/anonymous-zether-client/tree/real-digital) (Importante: usar a branch real-digital e instalar as dependências (`yarn` ou `npm install`) dos dois projetos).

* Utilize o novo arquivo [zether-client-DvP.json](./zether-client-DvP.json) no [Postman](https://www.postman.com/downloads/).

* Se você estiver usando o Postman, alguns scripts preenche automaticamente algumas variáveis, você pode conferir na aba `Tests`.
* Dentro do Postman, crie um ambiente para o teste do DvP e defina as seguintes variáveis:

`CEDENTE`
```
* hostCedente: `http://localhost:3000` (servidor onde está rodando o cliente, o valor default é `http://localhost:3000`)
* ZSCERC1155Restricted: endereço do contrato ZSCERC1155Restricted de zether na rede
* cessionarioShielded: as chaves Ethereum e ElGamal da contraparte cessionario
* txSubmitterCessionario: endereço Ethereum da contraparte
```

`CESSIONARIO`
```
* hostCessionario: `http://localhost:3001` (servidor onde está rodando o cliente, o valor default é `http://localhost:3000`)
* ZSCRestrictedDvP:  endereço do contrato ZSCRestrictedDvP de zether na rede
* cedenteShielded: as chaves Ethereum e ElGamal do cedente
* txSubmitterCedente: endereço Ethereum da contraparte
```

#### Passo a passo

#### 0.0 - Pré-configuração

* Executar o script "Create Participant Account" para criar as suas chaves ElGamal e registrar na variável de ambiente "participantShielded". Caso já tenha as chaves, registre na variável de ambiente.
* Após essa execução, para permissão de movimentar título nessa carteira, solicite à SELIC que autorize a carteira registrada na variável de ambiente participantEth.

#### 0.1 - Do lado do cessionário (Real Digital)

* Configurar o cliente Zether da forma como descrito para o caso de uso de transferência simples, trocando no arquivo `.env` apenas o endereço do contrato de Zether (`ZSC_ADDRESS` = ZSCRestrictedDvP), o endereço do contrato Real Digital (`ERC20_ADDRESS`), o endereço do contrato de DvP (`DVP_ADDRESS`) e o valor da época (`ZSC_EPOCH_LENGTH=60`);
* Após configurar o cliente, é necessário realizar:
* * o registro da chave no ZSC executando o script "Register Participant in ZSC"
* * e o fund na carteira executando os scripts "Participant funds shielded account in ZSC"

#### 0.2 - Do lado do cedente (TPFt)

* Configurar o cliente Zether da forma como descrito para o caso de uso de transferência simples, trocando no arquivo `.env` o endereço do contrato de Zether (`ZSC_ADDRESS` = ZSCERC1155Restricted), o endereço do contrato TFPt (`ERC1155_ADDRESS`), o endereço do contrato de DvP (`DVP_ADDRESS`) e o valor da época (`ZSC_EPOCH_LENGTH=60`);
* Após configurar o cliente, é necessário realizar:
* * o registro da chave no ZSC executando o script "Register Participant in ZSC"
* * e o fund na carteira executando os scripts "Participant funds shielded account in ZSC"
* Como opção, para mover os fundos para a carteira Ethereum do cliente, você pode usar o método `safeTransferFrom` do ERC1155 ou utilizar a operação 1052;

#### 1 - Crie uma chave de uso único (onetime signer)

No DvP com Anonymous Zether, o `match` do cedente com o cessionário é feito pelo endereço da carteira Ethereum. Portanto é necessário a criação de uma carteira para cada transação a ser executada, pois cada endereço pode ser usado apenas uma vez, e este endereço não precisa ter saldo em Real Digital ou TPFt, ele serve apenas para assinar a transação.

* Abra o Postman, e execute a chamada `Creates onetime signer`. Passe o seu endereço retornado (txSubmitterParticipant) para a sua contraparte.

#### 2 - Inicie o DvP

Para iniciar a transação de forma completa, tanto o cedente como o cessionário deve iniciar o DvP, sendo que o cedente iniciará o DvP usando o TPFt e o cessionário iniciará o DvP usando o real digital.

* Execute a chamada `Initiates DvP` de acordo com o seu papel (cedente ou cessionário), passando os seguintes parâmetros no corpo da chamada:
* * `sender`: sua chave ElGamal registrada no contrato
* * `receiver`: a chave ElGamal da sua contraparte. Lembrar que ambos precisam se registrar nos dois contratos Zether
* * `amount`: valor total em real digital ou a quantidade total de TPFt
* * `signer`: o seu endereço Ethereum (txSubmitterParticipant) retornado na chamada anterior
* * `zsc`: o endereço do contrato Zether (informado por e-mail ou no AddressDiscovery com nome: ZSCRestrictedDvP e ZSCERC1155Restricted)

* A chamada retorna um json com um campo `proof`. Este será usado na chamada posterior.

#### 3 - Confirme o DvP

Para finalizar a transação de forma completa, tanto o cedente como o cessionário deve confirmar o DvP dentro da época configurada (60 segundos).

De posse do endereço Ethereum da contraparte, e dado que ela já também iniciou o DvP, confirme a sua parte do DvP:

* Execute a chamada `Executes DvP` de acordo com o seu papel (cedente ou cessionário), passando os seguintes parâmetros no corpo da chamada:
* * `senderEthAddress`: endereço Ethereum criado no primeiro passo;
* * `counterpartyEthAddress`: endereço Ethereum da contraparte;
* * `proof`: Prova gerada no passo anterior

A troca acontece apenas quando os dois executam a chamada.

Os passos 2 e 3, para as duas contrapartes, tem que acontecer no intervalo de 60 segundos, senão
ocorrerá um dos erros `Sigma protocol challenge equality failure.` ou `Recovery failure for B^w * A.`

Mesmo que os dois executem a transação em menos de 60 segundos, ambos saldos só serão atualizados quando a época terminar.


[<<< Voltar](README.md)