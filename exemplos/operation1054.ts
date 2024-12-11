import { ethers } from "hardhat";
import { BigNumber } from "ethers";
import { setApprovalForAll } from "./setApprovalForAll";
import { approveRealDigital } from "./approveRealDigital";
import { approveRealTokenizado } from "./approveRealTokenizado";
import abiITPFtOperation1054 from "../abi/ITPFtOperation1054.json";
import abiAddressDiscovery from "../abi/AddressDiscovery.json";

/**
 * TPFtOperation1054 - Permite que participantes cadastrados no Real Digital 
 * realizem a operação de compromissada na ida envolvendo Título Público Federal tokenizado (TPFt) 
 * entre si utilizando seus CNPJ8s.
 * @dev Para a operação ocorrer é necessário que cada carteira de aprovação para o endereço contrato TPFtDvP
 * no Real Digital através da função approve e no TPFt através setApprovalForAll.
 */
async function tradeRepoByCNPJ8() {
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
  const tpftAddress = '<Endereço do Contrato TPFt>';
 
  /**
   * Endereço do TPFtDvP
   */
  const tpftDvpAddress = '<Endereço do Contrato TPFtDvP>';

  /**
   * Endereço do Real Digital
   */
  const realDigitalAddress = await addressDiscrovery.addressDiscovery(ethers.utils.id('RealDigital'));

  /**
   * Obtém contrato TPFtOperation1054
   */
  const TPFtOperation1054 = await ethers.getContractAt(
    abiITPFtOperation1054,
    '<Endereço do Contrato TPFtOperation1054>'
  );

  /**
   * Sender refere-se ao cedente (detentor de TPFts)
   */
  const senderAddress = '<Endereço do Cedente de TPFt>';
  const sender = await ethers.getSigner(senderAddress);

  /**
   * Receiver refere-se ao cessionário (não detentor de TPFts)
   */
  const receiverAddress = '<Endereço do Cessionário de TPFt>';
  const receiver = await ethers.getSigner(receiverAddress);

  const params = {
    operationId: "<Número de operação + data vigente no formato yyyyMMdd>",
    cnpj8Sender: "<CNPJ8 do cedente da operação>",
    cnpj8Receiver: "<CNPJ8 do cessionário da operação>",
    tpftData: {
      acronym: "<A sigla do TPFt>",
      code: "<O código único do TPFt>",
      // Ex: const date = new Date("2023-09-26"); Math.floor(date.getTime() / 1000); retorno 1695686400
      maturityDate: "<Data de vencimento em segundos do TPFt (timestamp Unix)>",
    },
    tpftAmount: "<Quantidade de TPFt a ser negociada>",
    unitPrice: "<Preço unitário do TPFt>",
    returnUnitPrice: "<Preço unitário de retorno do TPFt>",
    returnDate: "<Data de retorno em segundos da compromissada do TPFt (timestamp Unix)>"
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
  setApprovalForAll(sender.address, tpftAddress, tpftDvpAddress) 

  /**
   * Função a ser chamada para aprovar uma quantidade de Real Digital para o contrato TPFtDvP
   * de acordo com os critérios do participante.
   */
  const realDigitalAmount = 1000;

  approveRealDigital(realDigitalAddress, receiver.address, realDigitalAmount, tpftDvpAddress)

  /**
   * Execução por parte do sender (cedente) para realizar operação de 
   * Compra e venda informando o CNPJ8.
   */
  const senderTransaction = await TPFtOperation1054
    .connect(sender)
    ?.[
      "tradeRepo(uint256,uint256,uint256,uint8,(string,string,uint256),uint256,uint256,uint256,uint256)"
    ](
      params.operationId,
      params.cnpj8Sender,
      params.cnpj8Receiver,
      callerPartBySender,
      params.tpftData,
      params.tpftAmount,
      params.unitPrice,
      params.returnUnitPrice,
      params.returnDate
    );
  
  /**
   * Aguarda até que a transação enviada pelo sender seja confirmada na blockchain. 
   */
  await senderTransaction.wait();

  /**
   * Execução por parte do receiver (cessionário) para realizar operação de 
   * Compra e venda informando o CNPJ8.
   */
  const receiverTransaction = await TPFtOperation1054
    .connect(receiver)
    ?.[
      "tradeRepo(uint256,uint256,uint256,uint8,(string,string,uint256),uint256,uint256,uint256,uint256)"
    ](
      params.operationId,
      params.cnpj8Sender,
      params.cnpj8Receiver,
      callerPartByReceiver,
      params.tpftData,
      params.tpftAmount,
      params.unitPrice,
      params.returnUnitPrice,
      params.returnDate
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

/**
 * TPFtOperation1054 - Permite que participantes cadastrados no Real Digital 
 * realizem a operação de compromissada na ida envolvendo Título Público Federal tokenizado (TPFt) 
 * entre si utilizando seus endereços de carteiras.
 * @dev Para a operação ocorrer é necessário que cada carteira de aprovação para o endereço contrato TPFtDvP
 * no Real Digital através da função approve e no TPFt através setApprovalForAll.
 */
async function tradeByAddresses() {

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
  const tpftAddress = '<Endereço do Contrato TPFt>';
 
  /**
   * Endereço do TPFtDvP
   */
  const tpftDvpAddress = '<Endereço do Contrato TPFtDvP>';

  /**
   * Endereço do Real Digital
   */
  const realDigitalAddress = await addressDiscrovery.addressDiscovery(ethers.utils.id('RealDigital'));

  /**
   * Endereço do TPFtOperation1054
   */
  const TPFtOperation1054 = await ethers.getContractAt(
    abiITPFtOperation1054,
    '<Endereço do Contrato TPFtOperation1054>'
  );

  /**
   * Sender refere-se ao cedente (detentor de TPFts) 
   */
  const senderAddress = '<Endereço do Cedente de TPFt>';
  const sender = await ethers.getSigner(senderAddress);

  /**
   * Receiver refere-se ao cessionário (não detentor de TPFts)
   */
  const receiverAddress = '<Endereço do Cessionário de TPFt>';
  const receiver = await ethers.getSigner(receiverAddress);
  
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
    returnUnitPrice: "<Preço unitário de retorno do TPFt>",
    returnDate: "<Data de retorno em segundos da compromissada do TPFt (timestamp Unix)>"
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
  setApprovalForAll(sender.address, tpftAddress, tpftDvpAddress) 

  /**
    * Função a ser chamada para aprovar uma quantidade de Real Digital para o contrato TPFtDvP
    * de acordo com os critérios do participante.
    */
  const realDigitalAmount = 1000;
 
  approveRealDigital(realDigitalAddress, receiver.address, realDigitalAmount, tpftDvpAddress)

  /**
   * Registro por parte do sender (cedente) para realizar operação de 
   * compra e venda informando o endereço das carteiras.  
   */
  const senderTransaction = await TPFtOperation1054
    .connect(sender)
    ?.[
      "tradeRepo(uint256,address,address,uint8,(string,string,uint256),uint256,uint256,uint256,uint256)"
    ](
      params.operationId,
      sender.address,
      receiver.address,
      callerPartBySender,
      params.tpftData,
      params.tpftAmount,
      params.unitPrice,
      params.returnUnitPrice,
      params.returnDate
    );

  /**
   * Aguarda até que a transação enviada pelo sender seja confirmada na blockchain.   
   */
  await senderTransaction.wait();

  /**
   * Registro por parte do receiver (cessionário) para realizar operação de 
   * compra e venda informando o endereço das carteiras.    
   */
  const receiverTransaction = await TPFtOperation1054
    .connect(receiver)
    ?.[
      "tradeRepo(uint256,address,address,uint8,(string,string,uint256),uint256,uint256,uint256,uint256)"
    ](
      params.operationId,
      sender.address,
      receiver.address,
      callerPartByReceiver,
      params.tpftData,
      params.tpftAmount,
      params.unitPrice,
      params.returnUnitPrice,
      params.returnDate
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

/**
 * TPFtOperation1054 - Permite que participantes e clientes cadastrados no Real Digital 
 * realizem a operação de compromissada na ida envolvendo Título Público Federal tokenizado (TPFt) 
 * entre si utilizando seus endereços de carteiras e seus respetivos endereços de Real Tokenizado.
 * @dev Para a operação ocorrer é necessário que cada carteira de aprovação para o endereço contrato TPFtDvP
 * no Real Digital através da função approve e no TPFt através setApprovalForAll.
 */
async function tradeByAddressesParticipantClient() {

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
  const tpftAddress = '<Endereço do Contrato de TPFt>';
 
  /**
   * Endereço do TPFtDvP
   */
  const tpftDvpAddress = '<Endereço do Contrato de TPFtDvP>';

  /**
   * Endereço do Real Digital
   */
   const realDigitalAddress = await addressDiscrovery.addressDiscovery(ethers.utils.id('RealDigital'));

  /**
   * Obtém contrato TPFtOperation1054
   */
  const TPFtOperation1054 = await ethers.getContractAt(
    abiITPFtOperation1054,
    '<Endereço do Contrato TPFtOperation1054>'
  );

  /**
   * Sender refere-se ao cedente (detentor de TPFts - participante ou cliente) 
   */
  const senderAddress = '<Endereço do Cedente de TPFt>';
  const sender = await ethers.getSigner(senderAddress);

  /**
   * Endereço do RealTokenizedSenderAddress (Ex. Endereço do Real Tokenizado do Cedente)
   */   
  const realTokenizedSenderAddress = '<Endereço do Real Tokenizado do Cedente>';

  /**
   * Receiver refere-se ao cessionário (não detentor de TPFts - participante ou cliente)
   */
  const receiverAddress = '<Endereço do Cessionário de TPFt>';
  const receiver = await ethers.getSigner(receiverAddress);
  
  /**
   * Endereço do RealTokenizedReceiverAddress (Ex. Endereço do Real Tokenizado do Cessionário)
   */   
  const realTokenizedReceiverAddress = '<Endereço do Real Tokenizado do Cessionário>';
  
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
    returnUnitPrice: "<Preço unitário do TPFt de retorno>",
    returnDate: "<Data de retorno em segundos (timestamp Unix)>",
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
  setApprovalForAll(senderAddress, tpftAddress, tpftDvpAddress) 

  /**
    * Função a ser chamada para aprovar uma quantidade de Real Tokenizado para o contrato TPFtDvP
    * de acordo com os critérios do cliente.
    */
  const realTokenizadoAmount = 1000;
 
  approveRealTokenizado(realTokenizedReceiverAddress, receiverAddress, realTokenizadoAmount, tpftDvpAddress)

  /**
   * Registro por parte do senderParticipant (cedente) para realizar operação de 
   * compra e venda informando o endereço das carteiras.  
   */
  const senderTransaction = await TPFtOperation1054
    .connect(sender)
    ?.[
      "trade(uint256,address,address,address,address,uint8,(string,string,uint256),uint256,uint256)"
    ](
      params.operationId,
      senderAddress,
      realTokenizedSenderAddress,
      receiverAddress,
      realTokenizedReceiverAddress,
      callerPartBySender,
      params.tpftData,
      params.tpftAmount,
      params.unitPrice,
      params.returnUnitPrice,
      params.returnDate
    );

  /**
   * Aguarda até que a transação enviada pelo sender seja confirmada na blockchain.   
   */
  await senderTransaction.wait();

  /**
   * Registro por parte do receiverClient (cessionário) para realizar operação de 
   * compra e venda informando o endereço das carteiras.    
   */
  const receiverTransaction = await TPFtOperation1054
    .connect(receiver)
    ?.[
      "tradeRepo(uint256,address,address,address,address,uint8,(string,string,uint256),uint256,uint256,uint256,uint256)"
    ](
      params.operationId,
      senderAddress,
      realTokenizedSenderAddress,
      receiverAddress,
      realTokenizedReceiverAddress,
      callerPartByReceiver,
      params.tpftData,
      params.tpftAmount,
      params.unitPrice,
      params.returnUnitPrice,
      params.returnDate
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
