# Exemplos de interação com os _smart contracts_

Aqui estão sendo disponibilizados alguns exemplos de interação com os contratos inteligentes, de maneira a guiar o desenvolvimento por parte dos participantes.

Os exemplos estarão escritos em Typescript usando o framework [Hardhat](https://hardhat.org/). Isso não é uma recomendação do uso da ferramenta por parte do Banco Central do Brasil. Os participantes são livres para desenvolverem a interação com os contratos inteligentes da forma que bem entenderem.

Esse código foi testado mas não foi feita nenhuma auditoria ou análise de vulnerabilidade. Não recomendamos o uso em produção, especialmente o uso de chaves privadas no arquivo de configuração do Hardhat.

[Exemplo 1](example1.ts):
    Enable Account / Mint and Burn.

[Exemplo 2](example2.ts):
    Buscar default account participant e realizar transferência de CBDC.

[Exemplo 3](example3.ts):
    Participante ativando um endereço para um cliente e realizando uma emissão de DVt ou MEt.

[Exemplo 4](example4.ts):
Participante buscando o endereço de Real Digital no contrato de AddressDiscovery.

[Exemplo 5](example5.ts):
Operação 1002: Registro de liquidação de oferta pública. 

[Exemplo 6](example6.ts):
Operação 1052: Registro de operação de compra e venda entre participantes.

[Exemplo 7](example7.ts):
TPFt: Consulta de saldo.

[Exemplo 8](example8.ts):
Participantes fazendo swap de Real Tokenizado em um passo.

[Exemplo 9](example9.ts):
Operação 1052: Registro de operação de compra e venda entre um participante e seu cliente.

[Exemplo 10](example10.ts):
Operação 1052: Registro de operação de compra e venda entre dois clientes do mesmo participante.

[Exemplo 11](example11.ts):
Operação 1052: Registro de operação de compra e venda entre um participante e um cliente de um participante distinto.

[Exemplo 12](example12.ts):
Operação 1052: Registro de operação de compra e venda entre dois clientes de participantes distintos.

[Exemplo 13](walletsCheckingFlow.ts):
TPFt: Verificar se a carteira está com as permissões necessárias para realizar as operações envolvendo TPFt.

[Exemplo 14](example14.ts):
Operação 1002: Cancelamento de liquidação de oferta pública.

[Exemplo 15](example15.ts):
Operação 1052: Cancelamento de operação de compra e venda entre participantes/clientes.

[<<< Voltar](../README.md)
