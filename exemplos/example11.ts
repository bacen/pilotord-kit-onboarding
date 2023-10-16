import { ethers } from "hardhat";
import { BigNumber } from "ethers";
import { setApprovalForAll } from "./setApprovalForAll";
import { approveRealDigital } from "./approveRealDigital";
import { approveRealTokenizado } from "./approveRealTokenizado";
import abiITPFtOperation1052 from "../abi/ITPFtOperation1052.json";
import abiAddressDiscovery from "../abi/AddressDiscovery.json";

/**
 * TPFtOperation1052 - Permite que a operação de compra e venda envolvendo Título Público Federal tokenizado (TPFt) 
 * seja realizada entre um participante (cedente) e um cliente (cessionário) pertencente a um outro participante 
 * utilizando seus endereços de carteiras. Ambos participantes devem estar cadastrados no Real Digital. 
 * Além disso, o cliente deve estar cadastrado no Real Tokenizado do seu respetivo participante. 
 * Como o cliente encontra-se em um participante diferente, é necessário que o contrato SwapOneStepFrom 
 * no Real Digital seja aprovado por meio da função "approve" usando a carteira do participante cujo 
 * cliente é um cessionário.
 * @dev Para que a operação seja concluida com sucesso, a carteira do participante e a do cliente devem 
 * aprovar o endereço do contrato TPFtDvP em seus respetivos Real Tokenizados usando a função "approve" e 
 * no TPFt por meio da função "setApprovalForAll".
 */
async function tradeParticipantAndDifferentClient() {

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
   * Endereço do SwapOneStepFrom
   */
  const swapOneStepFromAddress = await addressDiscrovery.addressDiscovery(ethers.utils.id('SwapOneStepFrom'));

   /**
   * Endereço do Real Digital
   */
   const realDigitalAddress = await addressDiscrovery.addressDiscovery(ethers.utils.id('RealDigital'));
 
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
   * senderParticipant (Ex. Participante A) refere-se ao cedente (detentor de TPFts).
   * receiverParticipant (Ex. Participante B) refere-se a um outro participante na rede. 
   */
  const [, , senderParticipant, receiverParticipant] = await ethers.getSigners();
  const senderParticipantAddress = senderParticipant.address;
  const receiverParticipantAddress = receiverParticipant.address; 

  /**
   * Endereço do RealTokenizedParticipantSenderAddress (Ex. Endereço do Real Tokenizado do Participante A)
   */   
  const realTokenizedParticipantSenderAddress = '<Endereço do Real Tokenizado do Participante>'
  
  /**
   * receiverClient (Ex. Cliente do Participante B) refere-se ao cessionário (não detentor de TPFts)
   * que pertence ao receiverParticipant.
   */
  const receiverClientAddress = '<Endereço do Cessionário de TPFt>';
  const receiverClient = await ethers.getSigner(receiverClientAddress);
  
  /**
   * Endereço do RealTokenizedParticipantReceiverAddress (Ex. Endereço do Real Tokenizado do Participante B)
   * @dev Note-se que o receiverClient (Ex. Cliente do Participante B) deve estar cadastrado no 
   * RealTokenizedParticipantReceiverAddress (Ex. Real Tokenizado do Participante B)
   */   
  const realTokenizedParticipantReceiverAddress = '<Endereço do Real Tokenizado do Participante>'
  
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
  setApprovalForAll(senderParticipantAddress, tpftAddress, tpftDvpAddress) 

   /**
    * Função a ser chamada para aprovar uma quantidade de Real Digital para o contrato TPFtDvP
    * de acordo com os critérios do participante (Ex. Participante B) do receiverClient (cessionário).
    */
  const realDigitalAmount = 1000;
 
  approveRealDigital(realDigitalAddress, receiverParticipantAddress, realDigitalAmount, tpftDvpAddress, swapOneStepFromAddress)

  /**
    * Função a ser chamada para aprovar uma quantidade de Real Tokenizado para o contrato TPFtDvP
    * de acordo com os critérios do cliente.
    */
  const realTokenizadoAmount = 1000;
 
  approveRealTokenizado(realTokenizedParticipantReceiverAddress, receiverClientAddress, realTokenizadoAmount, tpftDvpAddress)

  /**
   * Registro por parte do senderParticipant (cedente) para realizar operação de 
   * compra e venda informando o endereço das carteiras.  
   */
  const senderTransaction = await TPFtOperation1052
    .connect(senderParticipant)
    ?.[
      "trade(uint256,address,address,address,address,uint8,(string,string,uint256),uint256,uint256)"
    ](
      params.operationId,
      senderParticipantAddress,
      realTokenizedParticipantSenderAddress,
      receiverClientAddress,
      realTokenizedParticipantReceiverAddress,
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
   * Registro por parte do receiverClient (cessionário) para realizar operação de 
   * compra e venda informando o endereço das carteiras.    
   */
  const receiverTransaction = await TPFtOperation1052
    .connect(receiverClient)
    ?.[
      "trade(uint256,address,address,address,address,uint8,(string,string,uint256),uint256,uint256)"
    ](
      params.operationId,
      senderParticipantAddress,
      realTokenizedParticipantSenderAddress,
      receiverClientAddress,
      realTokenizedParticipantReceiverAddress,
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
