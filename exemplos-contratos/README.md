# Smart Contracts Real Digital

Esta é uma implementação criada por Bruno E. Grossi com ajuda de AI para uma possível implementação dos contratos liberados pelo Bacen no [GitHub](https://github.com/bacen/pilotord-kit-onboarding). A implementação dos contratos é uma implementação proposta, baseado na documentação disponível e na interface definida pelos [ABIs disponíveis em 05/07/2023](https://github.com/bacen/pilotord-kit-onboarding/tree/a27aecb4650557d82009282f79508753de3b6544/abi). De forma alguma se propõe a ser a melhor implementação nem a implementação de produção desses contratos, servindo apenas como uma solução de teste, voltada para estudos e testes em ambientes controlados.

Há muitos pontos que podem ser melhoradas, algumas listadas abaixo. Faça a sua contribuição e envie Pull Requests para esse repositório. Todos serão revisados.

Os pontos onde anoto com `[Sugestão de implementação]`, são sugestões minhas para o código, e não estão na implementação.

## Dúvidas

- Qual a relacão e uso correto de `CBDCAccessControl`. Me pareceu um ancestral comum a todos os contratos que implementam `AccessControl`. Usei como um contrato abstrato, pai de `RealDigital`, mas não tenho certeza.

