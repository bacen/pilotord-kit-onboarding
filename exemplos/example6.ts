import { ethers } from "hardhat";
import { BigNumber } from "ethers";
import { setApprovalForAll } from "./setApprovalForAll";
import { approveRealDigital } from "./approveRealDigital";
import abiITPFtOperation1052 from "../abi/ITPFtOperation1052.json";
import abiAddressDiscovery from "../abi/AddressDiscovery.json";

/**
 * TPFtOperation1052 - Permite que participantes cadastrados no Real Digital 
 * realizem a operação de compra e venda envolvendo Título Público Federal tokenizado (TPFt) 
 * entre si e/ou seus clientes utilizando seus CNPJ8s.
 * @dev Para a operação ocorrer é necessário que cada carteira de aprovação para o endereço contrato TPFtDvP
 * no Real Digital através da função approve e no TPFt através setApprovalForAll.
 */
async function tradeByCNPJ8() {
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
   * Sender refere-se ao cedente (detentor de TPFts) e receiver refere-se ao cessionário (não detentor de TPFts)
   */
  const [, senderAccount, receiverAccount] = await ethers.getSigners();

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
  setApprovalForAll(senderAccount.address, tpftAddress, tpftDvpAddress) 

  /**
   * Função a ser chamada para aprovar uma quantidade de Real Digital para o contrato TPFtDvP
   * de acordo com os critérios do participante.
   */
  const realDigitalAmount = 1000;

  approveRealDigital(realDigitalAddress, receiverAccount.address, realDigitalAmount, tpftDvpAddress)

  /**
   * Execução por parte do sender (cedente) para realizar operação de 
   * Compra e venda informando o CNPJ8.
   */
  const senderTransaction = await TPFtOperation1052
    .connect(senderAccount)
    ?.[
      "trade(uint256,uint256,uint256,uint8,(string,string,uint256),uint256,uint256)"
    ](
      params.operationId,
      params.cnpj8Sender,
      params.cnpj8Receiver,
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
   * Execução por parte do receiver (cessionário) para realizar operação de 
   * Compra e venda informando o CNPJ8.
   */
  const receiverTransaction = await TPFtOperation1052
    .connect(receiverAccount)
    ?.[
      "trade(uint256,uint256,uint256,uint8,(string,string,uint256),uint256,uint256)"
    ](
      params.operationId,
      params.cnpj8Sender,
      params.cnpj8Receiver,
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

/**
 * TPFtOperation1052 - Permite que participantes cadastrados no Real Digital 
 * realizem a operação de compra e venda envolvendo Título Público Federal tokenizado (TPFt) 
 * entre si e/ou seus clientes utilizando seus endereços de carteiras.
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
  const tpftAddress = await addressDiscrovery.addressDiscovery(ethers.utils.id('TPFt'));
 
  /**
   * Endereço do TPFtDvP
   */
  const tpftDvpAddress = await addressDiscrovery.addressDiscovery(ethers.utils.id('TPFtDvP'));

  /**
   * Endereço do Real Digital
   */
  const realDigitalAddress = await addressDiscrovery.addressDiscovery(ethers.utils.id('RealDigital'));

  /**
   * Endereço do TPFtOperation1052
   */
  const tpftOperation1052Address = await addressDiscrovery.addressDiscovery(ethers.utils.id('TPFtOperation1052'));

  const TPFtOperation1052 = await ethers.getContractAt(
    abiITPFtOperation1052,
    tpftOperation1052Address
  );

  /**
   * Sender refere-se ao cedente (detentor de TPFts) e receiver refere-se ao cessionário (não detentor de TPFts)
   */
  const [, senderAccount, receiverAccount] = await ethers.getSigners();
  
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
  setApprovalForAll(senderAccount.address, tpftAddress, tpftDvpAddress) 

  /**
    * Função a ser chamada para aprovar uma quantidade de Real Digital para o contrato TPFtDvP
    * de acordo com os critérios do participante.
    */
  const realDigitalAmount = 1000;
 
  approveRealDigital(realDigitalAddress, receiverAccount.address, realDigitalAmount, tpftDvpAddress)

  /**
   * Registro por parte do sender (cedente) para realizar operação de 
   * compra e venda informando o endereço das carteiras.  
   */
  const senderTransaction = await TPFtOperation1052
    .connect(senderAccount)
    ?.[
      "trade(uint256,address,address,uint8,(string,string,uint256),uint256,uint256)"
    ](
      params.operationId,
      senderAccount.address,
      receiverAccount.address,
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
    .connect(receiverAccount)
    ?.[
      "trade(uint256,address,address,uint8,(string,string,uint256),uint256,uint256)"
    ](
      params.operationId,
      senderAccount.address,
      receiverAccount.address,
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
