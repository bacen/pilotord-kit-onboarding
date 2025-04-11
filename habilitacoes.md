## Habilitações

Para executar as operações de liquidação de oferta pública (`TPFtOperation1002`), compra e venda (`TPFtOperation1052`), compra e venda compromissada (`TPFtOperation1054`) e recompra e revenda (`TPFtOperation1056`) envolvendo Títulos Públicos Federais tokenizados (TPFt), é necessário que os participantes efetuem as seguintes habilitações para o contrato `TPFtDvP` realizar transações com os ativos de sua carteira:

- <span style="text-decoration: underline;">TPFt</span>: deve ser autorizada na carteira do participante ou cliente a manipulação do saldo de TPFt através do método `setApprovalForAll`, herdado do padrão ERC-1155, do contrato TPFt. Esta autorização somente precisa ser feita quando houver deploy de um novo contrato  `TPFtDvP`;

- <span style="text-decoration: underline;">RealDigital</span>: deve ser autorizada na carteira do participante uma quantia através do método `approve`, herdado do padrão ERC-20, do contrato RealDigital. Essa quantia poderá ser utilizada em mais de uma operação e é possível autorizar novos valores sempre que necessário;

- <span style="text-decoration: underline;">RealTokenizado</span>: deve ser autorizada na carteira do participante e do seu cliente uma quantia através do método `approve`, herdado do padrão ERC-20, do contrato RealTokenizado. Essa quantia poderá ser utilizada em mais de uma operação e é possível autorizar novos valores sempre que necessário;

<span style="text-decoration: underline;">Além disso, ao criar novas carteiras na rede, o participante deve informar ao Bacen para que a carteira seja autorizada a ter TPFt.</span> 

O detalhamento das habilitações por operação está representado no quadro abaixo:

<table>
  <tr style="font-weight:bold;">
    <th colspan="7" style="text-align:center;">Habilitações necessárias para operações envolvendo TPFt</th>
  </tr>
  <tr>
    <th rowspan="2" style="text-align:left;">OPERAÇÃO TPFt</th>
    <th colspan="2" style="text-align:center;">realDigital</th>
    <th colspan="2" style="text-align:center;">tpfT</th>
    <th colspan="2" style="text-align:center;">realTokenizado</th>
  </tr>
  <tr>
    <th style="text-align:center;">enableAccount</th>
    <th style="text-align:center;">approve</th>
    <th style="text-align:center;">enableAddress</th>
    <th style="text-align:center;">setApprovalForAll</th>
    <th style="text-align:center;">/:enderecoContrato/enableAccount</th>
    <th style="text-align:center;">/:enderecoContrato/approve</th>
  </tr>
  <tr>
    <td>TPFtOperation1001</td>
    <td></td>
    <td></td>
    <td style="text-align:center;">X*</td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>TPFtOperation1002</td>
    <td style="text-align:center;">X</td>
    <td style="text-align:center;">X</td>
    <td style="text-align:center;">X*</td>
    <td style="text-align:center;">X</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>TPFtOperation1070</td>
    <td></td>
    <td></td>
    <td style="text-align:center;">X*</td>
    <td style="text-align:center;">X</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>TPFtOperation1052 (Participante)</td>
    <td style="text-align:center;">X</td>
    <td style="text-align:center;">X</td>
    <td style="text-align:center;">X*</td>
    <td style="text-align:center;">X</td>
    <td style="text-align:center;"></td>
    <td style="text-align:center;"></td>
  </tr>
  <tr>
    <td>TPFtOperation1052 (Cliente)</td>
    <td></td>
    <td></td>
    <td style="text-align:center;">X*</td>
    <td style="text-align:center;">X</td>
    <td style="text-align:center;">X</td>
    <td style="text-align:center;">X</td>
  </tr>
  <tr>
    <td>TPFtOperation1054 (Participante)</td>
    <td style="text-align:center;">X</td>
    <td style="text-align:center;">X</td>
    <td style="text-align:center;">X*</td>
    <td style="text-align:center;">X</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>TPFtOperation1054 (Participante-Cliente)</td>
    <td></td>
    <td></td>
    <td style="text-align:center;">X*</td>
    <td style="text-align:center;">X</td>
    <td style="text-align:center;">X</td>
    <td style="text-align:center;">X</td>
  </tr>
  <tr>
    <td>TPFtOperation1056 (Participante)</td>
    <td style="text-align:center;">X</td>
    <td style="text-align:center;">X</td>
    <td style="text-align:center;">X*</td>
    <td style="text-align:center;">X</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>TPFtOperation1056 (Participante-Cliente)</td>
    <td></td>
    <td></td>
    <td style="text-align:center;">X*</td>
    <td style="text-align:center;">X</td>
    <td style="text-align:center;">X</td>
    <td style="text-align:center;">X</td>
  </tr>
</table>


| **DESCRIÇÃO**                                                                                                                                                                                               |
|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **realDigital/enableAccount:** habilitar a carteira para operar Real Digital.                                                                                                                               |
| **realDigital/approve:** habilitar o contrato `TPFtDvP` a realizar transações com o valor de Real Digital aprovado pela carteira.                                                                           |
| **tpft/enableAddress:** habilitar a carteira para operar TPFt. _*O Bacen ou uma carteira default de um participante habilitado no TPFt e no RealDigital pode habilitar uma carteira no TPFt._               |
| **tpft/setApprovalForAll:** habilitar o contrato `TPFtDvP` a realizar transações com TPFt pela carteira.  _*Esta autorização somente precisa ser feita quando houver deploy de um novo contrato_ `TPFtDvP`. |
| **realTokenizado/:enderecoContrato/enableAccount:** habilitar a carteira para operar Real Tokenizado.                                                                                                       |
| **realTokenizado/:enderecoContrato/approve:** habilitar o contrato `TPFtDvP` a realizar transações com o valor de Real Tokenizado aprovado pela carteira.                                                   |

[<<< Voltar](smartcontracts.md)