# Starlight

O Starlight é uma solução de privacidade e anonimidade desenvolvida e mantida pela Ernest & Young ([EYBlockchain/starlight: :zap: solidity --> zApp transpiler :zap: (github.com)​](https://github.com/EYBlockchain/starlight)).

A proposta da solução é permitir a criação de aplicações de privacidade para blockchain, baseadas no padrão EVM, e simplificar a integração das provas de conhecimento zero em contratos inteligentes permitindo que o desenvolvedor possa abstrair a complexidade de circuitos criptográficos e focar apenas na lógica do contrato. Utilizando um contrato Solidity básico e anotações específicas para privacidade (decoradores), a Starlight se propõe a gerar automaticamente uma aplicação ZKP denominada ZApp (ZKP Application) com toda a infraestrutura necessária para executar os contratos mantendo a privacidade de informações.

As próximas seções fornecerão uma visão da estrutura da solução, seguida de um guia passo a passo elaborado para instalação e execução dos cenários de teste do piloto.

<br />

# Estrutura do Starlight

Todas as interações com as aplicações Starlight são realizadas através do cliente ZApp, que opera localmente em cada nó da rede. Cada aplicação Zapp é constituída pelos seguintes serviços:

- **Zapp**: este é o aplicativo cliente principal. As interações com o aplicativo se dão por meio de APIs
- **Timber**: responsável por sincronizar a merkle-tree dos *commitments* com as informações privadas locais e as informações públicas registradas na rede DLT
- **Zokrates-worker**: responsável pela geração das provas de conhecimento zero
- **MongoDB**: base de dados utilizada pelo Zapp e pelo Timber para salvar os *commitments* e o estado do merkle-tree, respectivamente

<br />

## Requisitos mínimos

Aqui estão os requisitos mínimos para o Sistema Operacional, Docker, Ambiente de Execução e Hardware definidos pela EY para execução dos cenários:

- Execução em Servidor em Máquina Virtual Dedicada - não Desktop
- Sistema operacional Linux, distribuição Red Hat ou Ubuntu
- Docker Engine versão v26.1 ou superior
- 8 Gb de Memória RAM
- 32 GB de Disco SSD
- 2 vCPU
- Conexão a um nó Besu que esteja conectado a rede Blockchain DREX via Websocket

A EY não garante o correto funcionamento da aplicação se ela for executada em máquinas Desktop ou com requisitos inferiores aos estabelecidos acima.

<br />


# Cenários

Para o Piloto, até o momento, foram implementados e testados os seguintes cenários com a solução Starlight:

- [transferência de Real Digital entre duas instituições](StarlightTransferenciaRealDigital.md);
- [compra e venda de TPFt com Real Digital](StarlightDvpRealDigital.md)

A descrição e os detalhes de instalação e execução estão definidos nos respectivos links dos cenários acima.

[<<< Voltar](README.md)
