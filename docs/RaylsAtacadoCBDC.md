# CBDC (atacado):

- [ex1-requisitar-emissao-cbdc.ts](https://github.com/raylsnetwork/piloto_rd/blob/main/exemplos/ex1-requisitar-emissao-cbdc.ts): faz uma soliticação de emissão de novos CBDC para receber em uma conta.

  <strong>Pré-requisitos:</strong> 
  
  1. Antes de mais nada, os contratos da instituição precisam estar implantados no ambiente do participante com a execução do código [setup-participant-contracts.ts](https://github.com/raylsnetwork/piloto_rd/blob/main/setup/setup-participant-contracts.ts).

- [ex2-transferir-cbdc-atacado.ts](https://github.com/raylsnetwork/piloto_rd/blob/main/exemplos/ex2-transferir-cbdc-atacado.ts): a partir da instituição de origem, envia Real Digital para uma segunda instituição de destino (atacado).
  
  <strong>Pré-requisitos:</strong> 
  
  1. Na origem, o endereço que deseja iniciar a transferência necessita de saldo, portanto, é interessante que o respectivo endereço tenha recebido saldo, por exemplo, através da execução do script [ex1-requisitar-emissao-cbdc.ts](https://github.com/raylsnetwork/piloto_rd/blob/main/exemplos/ex1-requisitar-emissao-cbdc.ts);

  2. No destino, o endereço destinatário precisa estar autorizado, via allowlist, na PL da instituição de destino, a receber CDBC. Caso o endereço não tenha autorização, basta que os administradores da PL de destino tenham executado o código [opcional_add-conta-allowlist-cdbc.ts](https://github.com/raylsnetwork/piloto_rd/blob/main/exemplos/opcional_add-conta-allowlist-cdbc.ts) para autorizar uma conta a receber CDBC na respectiva PL.

- [ex3-reversao-transferencia-cbdc-atacado.ts](https://github.com/raylsnetwork/piloto_rd/blob/main/exemplos/ex3-reversao-transferencia-cbdc-atacado.ts): tenta realizar o envio de Real Digital para uma conta não autorizada, mas tem o envio revertido devido à não autorização - ocorre que apenas endereços de contas autorizadas podem receber CDBC.

  <strong>Pré-requisitos:</strong> 

  1. Na origem, o endereço que deseja iniciar a transferência necessita de saldo, portanto, é interessante que o respectivo endereço tenha recebido saldo, por exemplo, através da execução do script [ex1-requisitar-emissao-cbdc.ts](https://github.com/raylsnetwork/piloto_rd/blob/main/exemplos/ex1-requisitar-emissao-cbdc.ts);

  2. Caso o endereço de destino esteja autorizado a receber CDBCs, no caso deste exemplo, é necessário desautorizar o endereço de destino, através da execução do código [opcional_remove-conta-allowlist-cdbc.ts](https://github.com/raylsnetwork/piloto_rd/blob/main/exemplos/opcional_remove-conta-allowlist-cdbc.ts): desautoriza uma conta a receber CDBC.

<br/>
<br/>
<br/>

## Diagramas de Sequência

<p align="center">
  <a href="" rel="noopener">
    <img src="https://public-professional-services.s3.eu-west-2.amazonaws.com/1-requestToMint.drawio.png" alt="Project logo">
  </a>
  <p align="center">
    <span>Exemplo 1 - Requisição para emissão de novos Reais Digitais (CDBC)</span>
  </p>
</p>
</br>
</br>

<p align="center">
  <a href="" rel="noopener">
    <img src="https://public-professional-services.s3.eu-west-2.amazonaws.com/2-CBDC-Allowlist.drawio.png" alt="Project logo">
  </a>
  <p align="center">
    <span>Opcional - Fluxos de adição, remoção e checagem para uma conta receber, ou não, Real Dgital (CDBC)</span>
  </p>
</p>
</br>
</br>

<p align="center">
  <a href="" rel="noopener">
    <img src="https://public-professional-services.s3.eu-west-2.amazonaws.com/3-STR0004.drawio.png" alt="Project logo">
  </a>
  <p align="center">
    <span>Exemplo 2 - Envio de Real Digital entre instituições financeiras (atacado)</span>
  </p>
</p>
</br>
</br>

<p align="center">
  <a href="" rel="noopener">
    <img src="https://public-professional-services.s3.eu-west-2.amazonaws.com/4-STR0004-Revers%C3%A3o-At%C3%B4mica.drawio.png" alt="Project logo">
  </a>
  <p align="center">
    <span>Exemplo 3 - Reversão de envio de Real Digital devido a permissionamento inválido</span>
  </p>
</p>
</br>
</br>

<br>

[<<< Voltar](../Rayls.md)