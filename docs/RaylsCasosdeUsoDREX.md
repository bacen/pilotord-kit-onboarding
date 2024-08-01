# Casos de Teste e Contratos Inteligentes 

Os contratos inteligentes desenvolvidos implementam o Real Digital (DREX) como um token ERC20 e o Título Público Federal Tokenizado (TPFt) como um token ERC1155, ambos registrados via Commit Chain e com capacidades de envio e recebimento de mensagens cross-chain dentro da VEN. Ainda, o token Real Tokenizado também foi implementado seguindo o padrão ERC20, todavia, sem a necessidade de ser registrado via Commit Chain, existindo somente nas PLs de cada um dos participantes.  

O caso de testes requestToMint foi implementado de forma que a PL do BACEN seja responsável por autorizar tais ações de emissão de novos DREX.  

Já o caso de teste STR0004 (Transferência de Real Digital entre Participantes) focou em demonstrar como transações de DREX entre diferentes IFs podem ser feitos de forma atômica e garantindo confidencialidade entre as s IFs.  

O caso de teste STR0008 (equivalente ao Swap One Step) focou em demonstrar como é possível que clientes de diferentes IFs participantes podem transacionar entre si.  

Já os casos de testes com TPFt e DVP foram feitos de forma a permitir que a emissão de Títulos Públicos e posterior comercialização de tais títulos, tanto entre instituições apenas, quanto entre clientes de instituições.  

Foram criados os seguintes contratos inteligentes:  

- CDBC.sol: contrato que representa o Real Digital;  

- TPFt.sol: contrato que representa o Título Público Federal Tokenizado;  

- RealTokenizado: contrato que representa reais tokenizados existentes dentro de uma IF;  

- STR.sol: contrato utilizado para que o BACEN receba e processe mensagens para emissão de novos DREX;  

- TPFToperation.sol: contrato utilizado por participantes para registrarem, liquidarem e/ou reverterem operações de DVP;  

- DVP.sol: contrato existente na PL da SELIC cujo objetivo é conciliar e servir como ponto de liquidação de operações de DVP.  

Ainda, foram desenvolvidos os scripts de setup que cada PL deve executar quando do seu ingresso na VEN. Por fim, foram escritos e executados os casos de teste para os requisitos solicitados.  


<br>

[<<< Voltar](../Rayls.md)