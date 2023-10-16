import { ethers } from "hardhat";
import { BigNumber } from "ethers";
import { setApprovalForAll } from "./setApprovalForAll";
import { approveRealTokenizado } from "./approveRealTokenizado";
import abiITPFtOperation1052 from "../abi/ITPFtOperation1052.json";
import abiAddressDiscovery from "../abi/AddressDiscovery.json";


/**
 * TPFtOperation1052 - Permite que clientes pertencentes a participantes cadastrados no Real Digital 
 * realizem a operação de compra e venda envolvendo Título Público Federal tokenizado (TPFt) 
 * entre si e/ou seus clientes utilizando seus endereços de carteiras.
 * @dev Para que a operação seja concluida com sucesso, é necessário que cada carteira do participante aprove o endereço do contrato TPFtDvP.
 * Além disso, há dois cénarios possíveis:
 *  1. Quando os clientes estão no mesmo participante;
 *  2. Quando os clientes estão em participantes diferentes: nesse casso, é necessário que o contrato SwapOneStepFrom 
 *     no Real Digital seja aprovado por meio da função "approve" usando a carteira do participante cujo cliente é um cessionário.
 * Adicionalmente, as carteiras dos participantes/clientes devem aprovar o endereço do contrato TPFtDvP
 * em seus Real Tokenizados usando a função "approve" e no TPFt por meio da função "setApprovalForAll".
 * 
 * 
 */
async function tradeByClientAddressesInSameParticipant() {

  /**
   * Obtém contrato Address Discovery
   */
  const addressDiscrovery = await ethers.getContractAt(
    abiAddressDiscovery,
    '<Endereço do Contrato Address Discovery>'
  );

  /**
   * Endereço do TPFt
   */
  const tpftAddress = await addressDiscrovery.addressDiscovery(ethers.utils.id('TPFt'));
 
  /**
   * Endereço do TPFtDvP
   */
  const tpftDvpAddress = await addressDiscrovery.addressDiscovery(ethers.utils.id('TPFtDvP'));
 
  /**
   * Endereço do TPFtOperation1052
   */
  const tpftOperation1052Address = await addressDiscrovery.addressDiscovery(ethers.utils.id('TPFtOperation1052'));

  /**
   * Obtém contrato TPFtOperation1052
   */
  const TPFtOperation1052 = await ethers.getContractAt(
    abiITPFtOperation1052,
    tpftOperation1052Address
  );

  /**
   * Sender refere-se ao cedente (detentor de TPFts) 
   */
  const senderAccount = '<Endereço do Cedente de TPFt>';
  const senderAccountSigner = await ethers.getSigner(senderAccount);

  //Endereço do RealTokenizedSender
  const realTokenizadoSenderAddress = '<Endereço do Real Tokenizado Sender>'
  
  /**
   * Receiver refere-se ao cessionário (não detentor de TPFts)
   */
  const receiverAccount = '<Endereço do Cessionário de TPFt>';
  const receiverAccountSigner = await ethers.getSigner(receiverAccount);
 
  //Endereço do RealTokenizedReceiver
  const realTokenizadoReceiverAddress = '<Endereço do Real Tokenizado Receiver>'

  const params = {
    operationId: "<Número de operação + data vigente no formato yyyyMMdd>",
    tpftData: {
      acronym: "<A sigla do TPFt>",
      code: "<O código único do TPFt>",
      // Ex: const date = new Date("2023-09-26"); Math.floor(date.getTime() / 1000); retorno 1695686400
      maturityDate: "<Data de vencimento em segundos do TPFt (timestamp Unix)>",
    },
    tpftAmount: "<Quantidade de TPFt a ser negociada>",
    unitPrice: "<Preço unitário do TPFt>",
  };
  
  /**
   * Quando o cedente está transmitindo o comando da operação.
   */
  const callerPartBySender = BigNumber.from(0);
  /**
   * Quando o cessionário está transmitindo o comando da operação.
   */
  const callerPartByReceiver = BigNumber.from(1);

  /**
   * Função a ser chamada somente uma vez para aprovar o contrato TPFtDvP no TPFt.
   */
  setApprovalForAll(senderAccount, tpftAddress, tpftDvpAddress) 

  /**
    * Função a ser chamada para aprovar uma quantidade de Real Tokenizado para o contrato TPFtDvP
    * de acordo com os critérios do cliente.
    */
  const realTokenizadoAmount = 1000;
 
  approveRealTokenizado(realTokenizadoReceiverAddress, receiverAccount, realTokenizadoAmount, tpftDvpAddress)

  /**
   * Registro por parte do sender (cedente) para realizar operação de 
   * compra e venda informando o endereço das carteiras.  
   */
  const senderTransaction = await TPFtOperation1052
    .connect(senderAccountSigner)
    ?.[
      "trade(uint256,address,address,address,address,uint8,(string,string,uint256),uint256,uint256)"
    ](
      params.operationId,
      senderAccount,
      realTokenizadoSenderAddress,
      receiverAccount,
      realTokenizadoReceiverAddress,
      callerPartBySender,
      params.tpftData,
      params.tpftAmount,
      params.unitPrice
    );

  /**
   * Aguarda até que a transação enviada pelo sender seja confirmada na blockchain.   
   */
  await senderTransaction.wait();

  /**
   * Registro por parte do receiver (cessionário) para realizar operação de 
   * compra e venda informando o endereço das carteiras.    
   */
  const receiverTransaction = await TPFtOperation1052
    .connect(receiverAccountSigner)
    ?.[
      "trade(uint256,address,address,address,address,uint8,(string,string,uint256),uint256,uint256)"
    ](
      params.operationId,
      senderAccount,
      realTokenizadoSenderAddress,
      receiverAccount,
      realTokenizadoReceiverAddress,
      callerPartByReceiver,
      params.tpftData,
      params.tpftAmount,
      params.unitPrice
    );
  
  /**
   * Aguarda até que a transação enviada pelo receiver seja confirmada na blockchain.   
   */
  await receiverTransaction.wait();  

  /**
   * Resposta da execução da operação de compra e venda
   */
  console.log(senderTransaction.hash);
  console.log(receiverTransaction.hash);
}
