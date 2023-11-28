# Anonymous Zether

O Anonymous Zether é uma solução de privacidade e anonimidade desenvolvida pela JPMorgan e posteriormente incorporada pela Consensys.

Esta é baseada em um paper da Universidade de Stanford em parceira com a Visa, link [aqui](https://crypto.stanford.edu/~buenz/papers/zether.pdf).

A solução se baseia na criptografia ElGamal, que é uma criptografia assimétrica (possui um par de chave pública e privada) e homomórfica (permite cálculos entre números criptografados).

Além disso, o contrato consegue verificar que o valor subtraído é igual ao valor adicionado, usando provas de conhecimento zero.

Para mais detalhes, consulte as apresentações na pasta [docs](./docs)

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