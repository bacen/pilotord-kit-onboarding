# Infraestrutura topológica 

O esquema ilustrativo, a seguir, demonstra como uma Privacy Ledger de propriedade de uma única instituição é composta, e como ela se relaciona com a Commit Chain: 

<p align="center">
    <a href="" rel="noopener">
        <img src="https://public-professional-services.s3.eu-west-2.amazonaws.com/Raylz-e-Commit-Chain+(1).png" alt="Rayls">
    </a>
    <p align="center">
        <span>Figura - Estrutura de uma Privacy Ledger e sua relação com a Commit Chain</span>
    </p>
</p>

Como podemos observar, na ilustração acima, os contratos inteligentes podem existir tanto na Privacy Ledger quanto na Commit Chain, sendo elas blockchains distintas e funcionais. A comunicação entre PL e Commit Chain se dará através da figura do Relayer, que é um serviço que realiza escuta ativa de eventos que ocorrem na respectiva PL e propaga tais eventos à(s) blockchain(s) interessada(s), de forma criptografada e, privada. Ou seja, toda e qualquer mensagem que trafega pela Private Subnet através da Commit Chain será confidencial e poderá ser acessível apenas pelas partes autorizadas (terceiros participantes da rede não terão acesso às respectivas trocas de mensagem). 

Em suma, pode-se dizer que a arquitetura da Private Subnet foi construída de forma a garantir que: 

- Tudo o que ocorre dentro de uma PL é privado, e somente os administradores da respectiva PL poderão autorizar acesso a ela; 

- Os contratos inteligentes e protocolos podem ser executados tanto nas PLs quanto na Commit Chain, a depender dos papéis de cada ator na Private Subnet; 

- A comunicação entre PLs se dará por intermédio da Commit Chain, protegida por criptografia de ponta a ponta; 

Para mais informações, acesse:

- [Site oficial Parfin](https://parfin.io/rayls)
- [Repositório de Setup da Rayls](https://github.com/raylsnetwork/piloto_rd_setup)

<br>

[<<< Voltar](../Rayls.md)