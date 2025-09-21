# Artefato: Quadrilema Drex – Fase I do Piloto

## Visão Geral
O piloto Drex enfrentou desafios técnicos e arquiteturais que podem ser organizados em um **quadrilema evolutivo**:
- **Privacidade**
- **Programabilidade**
- **Desempenho Computacional**
- **Descentralização**

Este artefato associa cada pilar às **falhas, limitações e dores reais** observadas no relatório, com base em páginas e trechos.

---

## 1. Privacidade (30%)

| Falha / Limitação | Página | Trecho | Impacto |
|-------------------|--------|--------|--------|
| Anonymous Zether não testado | 58 | "Até a conclusão da fase I do piloto, em 7 de outubro de 2024, não foi possível avaliar os fluxos propostos nem realizar os testes." | Solução-chave de privacidade não foi validada. |
| Rayls: perda de auditoria pós-transferência | 50 | "Após a emissão do ativo e sua transferência para a PL de um participante, não há garantia de que o ativo mantenha o mesmo nível de privacidade nas operações subsequentes." | Autoridades perdem visibilidade, inviabilizando compliance. |
| Starlight oculta operações da autoridade | 56 | "No entanto, isso também oculta essas operações da autoridade sobre o token, que não consegue acompanhar as operações na rede." | Risco regulatório grave: impossibilidade de rastrear ativos. |
| Chaves sob controle do agente de acesso | 54 | "As chaves criptográficas utilizadas no contrato privado Starlight [...] ficam em posse do agente de acesso do usuário." | Centralização de poder e risco de perda de ativos. |

---

## 2. Programabilidade (25%)

| Falha / Limitação | Página | Trecho | Impacto |
|-------------------|--------|--------|--------|
| DvP com 3 ativos não suportado | 51 | "O DvP do cliente [...] não pode ser implementado, pois ainda não é suportado pela linguagem [Zolidity]." | Impossibilidade de trocas atômicas entre clientes. |
| Falta de componibilidade entre serviços | 51 | "Para cada novo serviço, pode ser necessária a criação de uma nova ledger." | Arquitetura ineficiente e difícil de escalar. |
| Zolidity limita expressividade | 56 | "A programabilidade da solução depende da capacidade da linguagem Zolidity em suportar as características do negócio." | Dependência de linguagem imatura. |
| Contrato único para todos os ativos (EY) | 56 | "Essa escolha de projeto resulta em um problema de falta de componibilidade, pois a introdução de um novo tipo de ativo exige a reconstrução completa da solução." | Baixa escalabilidade técnica. |

---

## 3. Desempenho Computacional (25%)

| Falha / Limitação | Página | Trecho | Impacto |
|-------------------|--------|--------|--------|
| Épocas de 60 segundos limitam atomicidade | 59 | "Um menor tempo de época permitiria um maior número de transações, em contraponto, há necessidade de execução sincronizada [...] gerando maior número de erros." | Falhas frequentes em operações atômicas. |
| Tempo de resposta entre 10s e 4min | 59 | "O tempo médio observado para a execução de cada transação é de 15 a 20 segundos." | Inaceitável para varejo. |
| Topologia full mesh consome +22% de banda | 61 | "Os links do BC experimentaram redução de, pelo menos, 22%." | Ineficiência de rede, inviável para escala nacional. |
| Capacidade limitada mesmo com mais recursos | 62 | "A arquitetura de ledgers distribuídas tem capacidade limitada, mesmo com o aumento de recursos computacionais." | Escalabilidade não é linear. |

---

## 4. Descentralização (20%)

| Falha / Limitação | Página | Trecho | Impacto |
|-------------------|--------|--------|--------|
| Computação confidencial centraliza poder no BC | 45 | "O BC passaria a ser o proprietário do código e dos dados, enquanto os participantes forneceriam apenas capacidade de processamento." | Descentralização teórica, centralização prática. |
| Validadores não veem dados das transações | 50 | "Transações confirmadas podem ser consideradas inválidas posteriormente por desrespeitarem regras do sistema." | Auditoria externa inviabilizada. |
| Governança centralizada no BC | 62 | "A governança da rede deve ser bem estruturada, com validadores distribuídos entre as autoridades sobre os diversos tokens." | Ausência de modelo claro de governança descentralizada. |
| Microsoft Nova ZKP rejeitada por aumentar centralização | 57 | "Optou-se por não adotar a arquitetura nos testes do piloto, especialmente devido à [...] descentralização." | Tensão entre privacidade e descentralização. |
