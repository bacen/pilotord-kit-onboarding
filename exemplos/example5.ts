import {ethers} from "hardhat";
import { BigNumber } from "ethers";
import { approveRealDigital } from "./approveRealDigital";
import abiITPFtOperation1002 from "../abi/ITPFtOperation1002.json";
import abiAddressDiscovery from "../abi/AddressDiscovery.json";

/**
 * TPFtOperation1002 - Permite que o Bacen realize a liquidação de oferta pública 
 * envolvendo Título Público Federal tokenizado (TPFt) para um participante
 * que esteja cadastrado no Real Digital utilizando seus CNPJ8.
 * @dev Para a operação ocorrer é necessário que cada carteira de aprovação para o endereço contrato TPFtDvP
 * no Real Digital através da função approve e no TPFt através setApprovalForAll.
 */
async function tpftOperation1002() {

   /**
   * Obtém contrato Address Discovery
   */
   const addressDiscrovery = await ethers.getContractAt(
    abiAddressDiscovery,
    '<Endereço do Contrato Address Discovery>'
  );
 
  /**
   * Endereço do TPFtDvP
   */
  const tpftDvpAddress = await addressDiscrovery.addressDiscovery(ethers.utils.id('TPFtDvP'));

  /**
   * Endereço do Real Digital
   */
  const realDigitalAddress = await addressDiscrovery.addressDiscovery(ethers.utils.id('RealDigital'));

  /**
   * Endereço do TPFtOperation1002
   */
  const tpftOperation1002Address = await addressDiscrovery.addressDiscovery(ethers.utils.id('TPFtOperation1002'));

  /**
   * Obtém contrato TPFtOperation1002
   */
  const TPFtOperation1002 = await ethers.getContractAt(
    abiITPFtOperation1002, 
    tpftOperation1002Address
    ); 
  
  /**
   * Sender refere-se ao cedente - Bacen atua a nome da Secretaria Nacional do Tesouro (STN).
   * Receiver refere-se ao cessionário - Instituição Financeira Participante cadastrada no Real Digital.
   * Restrições: 
   *  1. O endereço da carteira do Bacen deverá ter a _role_ de AUCTION_PLACEMENT_ROLE.
   *  2. Tanto o endereço de carteira da STN como da Instituição Financeira Participante 
   *     deverão estar habilitados no contrato TPFt.   
   */ 
  
  const [ , , receiverAccount ] = await ethers.getSigners();
  
  const params = {
    operationId: '<Número de operação + data vigente no formato yyyyMMdd>',
    cnpj8Sender: '<CNPJ8 do cedente da operação. Sempre será o CNPJ8 da STN>',
    cnpj8Receiver: '<CNPJ8 do cessionário da operação>',
    tpftData: {
      acronym: '<A sigla do TPFt>',
      code: "<O código único do TPFt>",
      // Ex: const date = new Date("2023-09-26"); Math.floor(date.getTime() / 1000); retorno 1695686400
      maturityDate: '<Data de vencimento em segundos do TPFt (timestamp Unix)>',
    },
    tpftAmount: '<Quantidade de TPFt a ser negociada>',
    unitPrice: '<Preço unitário do TPFt>',
  }

  /**
   * Quando o cedente está transmitindo o comando da operação.
   */
  const callerPartBySender =  BigNumber.from(0)
  /**
   * Quando o cessionário está transmitindo o comando da operação.
   */
  const callerPartByReceiver =  BigNumber.from(1)

  /**
    * Função a ser chamada para aprovar uma quantidade de Real Digital para o contrato TPFtDvP
    * de acordo com os critérios do participante.
    */
  const realDigitalAmount = 1000;
 
  approveRealDigital(realDigitalAddress, receiverAccount.address, realDigitalAmount, tpftDvpAddress)

  /**
   * Registro da liquidação de oferta pública de TPFt por parte do receiver
   * chamando a função auctionPlacement
   */
  const receiverTransaction = await TPFtOperation1002
    .connect(receiverAccount)
    .auctionPlacement(
      params.operationId,
      params.cnpj8Sender,
      params.cnpj8Receiver,
      callerPartByReceiver,
      params.tpftData,
      params.tpftAmount,
      params.unitPrice
    )

    /**
     * Aguarda até que a transação enviada pelo receiver seja confirmada na blockchain. 
     */
    await receiverTransaction.wait();

    /**
     * Resposta da operação de liquidação de oferta pública de TPFt.
     */
    console.log(receiverTransaction.hash);  
}
