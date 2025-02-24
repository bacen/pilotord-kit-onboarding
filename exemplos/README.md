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

- [Saque de valor financeiro armazenado no contrato pelo participante ou cliente](example16.ts):
     Permite que um participante ou cliente realize o saque do valor financeiro armazenado no contrato referente a pagamento de resgate de TPFt que não foi bem-sucedido.

- [Saque do valor financeiro armazenado no contrato por uma autoridade](example17.ts):
     Permite que uma carteira de autoridade realize o saque, para uma carteira de participante ou cliente, do valor financeiro armazenado no contrato referente a pagamento de resgate de TPFt que não foi bem-sucedido.

- [Consulta de valor financeiro armazenado no contrato](example18.ts):
      Fornece a consulta de valor financeiro referente a pagamento de resgate de TPFt que não foi bem-sucedido.

- [Operação 1054](operation1054.ts):
  Registro de operação de compromissada.

- [Operação 1054](operation1054IntraDay.ts):
  Registro de operação de compromissada intraday.

- [Operação 1054](operation1054OpenReturnPrice.ts):
  Registro de operação de compromissada com preço unitário de retorno aberto.

- [Operação 1056](operation1056.ts):
  Registro de operação de recompra e revenda.

- [Transferência de DREX Varejo informando apenas a carteira de cliente de destino](example19.ts):
  Dado uma carteira de cliente de destino, checa se a mesma pertence ao participante que está enviando a transação: se sim, faz a transferência simples de DREX Varejo; se não, chama o contrato de SwapOneStep

- [Participante permitir um contrato ser executado na rede](permissionamentoContrato.ts):
  Após o participante realizar o deploy do seu contrato na rede, é necessário dar a permissão para que esse contrato possa ser executado. Para isso é necessário adicionar o contrato como target no contrato de permissionamento.

[<<< Voltar](../README.md)





