# Real Tokenizado (varejo):

- [ex4-transferir-realtokenizado-varejo.ts](https://github.com/raylsnetwork/piloto_rd/blob/main/exemplos/ex4-transferir-realtokenizado-varejo.ts): a partir de um cliente em uma instituição de origem, envia Real Digital da reserva, bem como Real Tokenizado para uma segunda conta de cliente em uma instituição de destino (varejo).

  <strong>Pré-requisitos:</strong>

  1. A conta de reservas da instituição da qual se deseja iniciar a transferência necessita de saldo de CBDC, portanto, é interessante que o respectivo endereço tenha recebido saldo, por exemplo, através da execução do script [ex1-requisitar-emissao-cbdc.ts](https://github.com/raylsnetwork/piloto_rd/blob/main/exemplos/ex1-requisitar-emissao-cbdc.ts);

  2. O endereço do contrato CBDC precisa estar autorizado a emitir e queimar tokens do contrato RealTokenizado. Dito isso, antes de executar este exemplo, deve-se executar o script de garantia de controle de acesso ao RealTokenizado: [setup-participant-rt.ts](https://github.com/raylsnetwork/piloto_rd/blob/main/setup/setup-participant-rt.ts).

<br/>
<br/>
<br/>

## Diagramas de Sequência

<p align="center">
  <a href="" rel="noopener">
    <img src="https://public-professional-services.s3.eu-west-2.amazonaws.com/5-STR0008.drawio.png" alt="Project logo">
  </a>
  <p align="center">
    <span>Envio de Real Tokenizado entre clientes de instituições financeiras (varejo)</span>
  </p>
</p>
</br>
</br>


<br>

[<<< Voltar](../Rayls.md)