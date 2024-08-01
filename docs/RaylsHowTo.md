# Testando a privacidade cross-chain

## Dependências

- Compilador & runtime _golang_ versão 1.20 ou superior;
- Acesso às informações de configuração do Relayer envolvido na transação:
    - URL RPC da commit chain;
    - Endereço do contrato `PLStorage` que vive na Commit Chain;
    - Chaves criptográficas das PLs envolvidas na troca de mensagens;
        - DhPublic: chave criptográfica pública da contra-parte envolvida na comunicação;
        - DhSecret: chave criptográfica privada do relayer de onde a transação partiu;
- ABI do contrato de destino contendo as assinaturas dos possíveis métodos invocados a partir da origem.

## Passo a passo

1) Preencher o arquivo config.json com as informações necessárias:
    - `cc_rpc_url`: URL http para comunicação RPC a Commit Chain (`CommitChain.ChainURL` do config map do Relayer do participante);
    - `cc_plstorage_address`: endereço do contrato PLStorage do protocolo Rayls que reside na Commit Chain;(`CommitChain.ParticipantStorageContract` do config map do Relayer do participante);
    - `block_range`: número de blocos que o script de privacidade irá investigar (recomenda-se algo como de 15 a 30 blocos);
    - `destination_abi_path`: ABI do contrato que executará a mensagem no destino. Recomenda-se copiar a respectiva ABI e colar no arquivo `ABI/DestionationABI.json`;
    - `secret_key`: chave criptográfica privada da qual o participante tem acesso (`Blockchain.DhSecret` do config map do Relayer do participante);
    - `public_key`: chave criptográfica pública da contraparte (`Blockchain.DhPublic` do config map do Relayer da contraparte).

2) Invocar a função do smart contract de origem que irá disparar uma mensagem cross-chain. Importante notar que a ABI do contrato de destino deve ter relação com a mensagem cross-chain disparada na origem. Ou seja, o contrato de origem deve invocar o contrato destino (e sua respectiva ABI de destino) para que o presente script de privacidade seja capaz de decodar a mensagem disparada.

3) Executar o script de privacidade através de um comando como `go run main.go encrypt.go generate.go`.

## Analisando o resultado do teste

Queremos verificar se, de fato, apenas as PLs de participantes autorizados têm acesso às trocas de mensagem, de forma confidencial. Para tanto, temos, basicamente, dois cenários distintos:

A) Caso as credenciais configuradas no arquivo `config.json` sejam válidas, e caso haja, de fato, mensagens a serem descriptogafadas nos últimos blocos da Commit Chain para as PLs envolvidas, então o conteúdo da mensagem encriptada será revelado. Nesse caso, no console, o uma mensagem similar a <strong>_"Successfully decrypted and decoded a total..."_</strong> 

- Ou seja, nesse caso, temos a descriptografia executada com sucesso, sinalizando que a(s) mensagem(s) e as credenciais do arquivo `config.json` correspondem às informações das PLs autorizadas a acessarem o conteúdo confidencial da(s) respectiva(s) mensagem(ns).

B) Em caso contrário, se as credenciais configuradas no `config.json` pertencerem a PLs não autorizadas, ou caso não hajam mensagens correspondentes nos últimos blocos configurados, então o texto <strong>"Not able to decrypt and decode any message... Decryption failed!"</strong> será impresso no console. Isso é indício de que alguma ou ambas as credenciais informadas não correspondem às de participantes autorizados a acessarem a mensagem em questão - ou mesmo, que nenhum dos últimos blocos da Commit Chain pode descriptografado.

## Exemplo: Privacidade com a Requisição de Emissão de DREX.

Tomando por base o exemplo [ex1-requisitar-emissao-cbdc.ts](https://github.com/raylsnetwork/piloto_rd/blob/main/exemplos/ex1-requisitar-emissao-cbdc.ts), iremos verificar como, de fato, a troca de mensagens entre duas PLs distintas é feita de forma confidencial. Para tanto, convencionaremos os nomes das blockchains como Privacy Ledger de Origem (PLO) e Privacy Ledger de Destino (PLD). 

Antes de mais nada, seguindo o passo a passo recém apresentado, iniciaremos pela etapa (1), preenchendo o arquivo `config.json` com as informações necessárias:

<p align="center">
    <img src="https://public-professional-services.s3.eu-west-2.amazonaws.com/3-config.json"></a>
    <p align="center">
        <span>Etapa 1 - preenchendo o arquivo config.json</span>
    </p>
</p>

Em seguida, podemos invocar o script que desejamos testar. Neste caso, o comando `npx hardhat run exemplos/ex1-requisitar-emissao-cbdc.ts --network rayls` será executado, cumprindo a etapa (2) de nosso tutorial.

Por fim, uma vez que a transação que invoca a mensagem cross-chain já foi executada, então podemos executar o script de privacidade - etapa (3) - com o comando `go run main.go encrypt.go generate.go`. O resultado obtido neste teste foi o seguinte:

<p align="center">
    <img src="https://public-professional-services.s3.eu-west-2.amazonaws.com/2-Privacy-decrypt-proceeded.png"></a>
    <p align="center">
        <span>Etapa 3 - Resultado da execução do script de privacidade</span>
    </p>
</p>

Um ponto que vale a pena mostrar, é que, caso executemos o script de privacidade, e nenhuma mensagem possa ser descriptografada, então o resultado será similar ao que podemos ver na imagem a seguir:

<p align="center">
    <img src="https://public-professional-services.s3.eu-west-2.amazonaws.com/1-Privacy-decrypt-failed.png"></a>
    <p align="center">
        <span>Resultado da execução do script de privacidade: nenhuma mensagem descriptografada</span>
    </p>
</p>


<br>

[<<< Voltar](../Rayls.md)