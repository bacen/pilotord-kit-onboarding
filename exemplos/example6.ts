import { ethers } from "hardhat";
import { BigNumber } from "ethers";
import abiITPFtOperation1052 from "../abi/ITPFtOperation1052.json";

/**
 * TPFtOperation1052 - Permite que participantes cadastrados no Real Digital 
 * realizem a operação de compra e venda envolvendo Título Público Federal tokenizado (TPFt) 
 * entre si e/ou seus clientes utilizando seus CNPJ8s.
 */
async function tradeByCNPJ8() {
  const TPFtOperation1052 = await ethers.getContractAt(
    abiITPFtOperation1052,
    "<Endereço do Contrato TPFtOperation1052>"
  );
  // Sender refere-se ao cedente (detentor de TPFts) e receiver refere-se ao cessionário (não detentor de TPFts)
  const [, senderAccount, receiverAccount] = await ethers.getSigners();
  const params = {
    operationId: "<Número de operação + data vigente no formato yyyyMMdd>",
    cnpj8Sender: "<CNPJ8 do cedente da operação>",
    cnpj8Receiver: "<CNPJ8 do cessionário da operação>",
    callerPart: "<Parte que está transmitindo o comando da operação>",
    tpftData: {
      acronym: "<A sigla do TPFt>",
      code: "<O código único do TPFt>",
      maturityDate: "<Data de vencimento em milissegundos do TPFt (timestamp unix). Deve-se usar horário UTC+0 e não GMT+3/UTC-3 por exemplo.>",
    },
    tpftAmount: "<Quantidade de TPFt a ser negociada>",
    unitPrice: "<Preço unitário do TPFt>",
  };

  const callerPartBySender = BigNumber.from(0); //Quando o cedente está transmitindo o comando da operação.
  const callerPartByReceiver = BigNumber.from(1); //Quando o cessionário está transmitindo o comando da operação.

  //Execução por parte do sender (cedente) para realizar operação de 
  //compra e venda informando o CNPJ8.
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
  
  //Aguarda até que a transação enviada pelo sender seja confirmada na blockchain. 
  await senderTransaction.wait();

  //Execução por parte do receiver (cessionário) para realizar operação de 
  //compra e venda informando o CNPJ8.
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

  //Aguarda até que a transação enviada pelo receiver seja confirmada na blockchain.   
  await receiverTransaction.wait();

  // Resposta da execução da operação de compra e venda
  console.log(senderTransaction.hash);
  console.log(receiverTransaction.hash);
}

/**
 * TPFtOperation1052 - Permite que participantes cadastrados no Real Digital 
 * realizem a operação de compra e venda envolvendo Título Público Federal tokenizado (TPFt) 
 * entre si e/ou seus clientes utilizando seus endereços de carteiras.
 */
async function tradeByAddresses() {
  const TPFtOperation1052 = await ethers.getContractAt(
    abiITPFtOperation1052,
    "<Endereço do Contrato TPFtOperation1052>"
  );

  // Sender refere-se ao cedente (detentor de TPFts) e receiver refere-se ao cessionário (não detentor de TPFts)
  const [, senderAccount, receiverAccount] = await ethers.getSigners();
  const params = {
    operationId: "<Número de operação + data vigente no formato yyyyMMdd>",
    callerPart: "<Parte que está transmitindo o comando da operação>",
    tpftData: {
      acronym: "<A sigla do TPFt>",
      code: "<O código único do TPFt>",
      maturityDate: "<Data de vencimento em milissegundos do TPFt (timestamp unix). Deve-se usar horário UTC+0 e não GMT+3/UTC-3 por exemplo.>",
    },
    tpftAmount: "<Quantidade de TPFt a ser negociada>",
    unitPrice: "<Preço unitário do TPFt>",
  };
  
  const callerPartBySender = BigNumber.from(0); //Quando o cedente está transmitindo o comando da operação.
  const callerPartByReceiver = BigNumber.from(1); //Quando o cessionário está transmitindo o comando da operação.

  //Registro por parte do sender (cedente) para realizar operação de 
  //compra e venda informando o endereço das carteiras.  
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

  //Aguarda até que a transação enviada pelo sender seja confirmada na blockchain.   
  await senderTransaction.wait();

  //Registro por parte do receiver (cessionário) para realizar operação de 
  //compra e venda informando o endereço das carteiras.    
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
  
  //Aguarda até que a transação enviada pelo receiver seja confirmada na blockchain.   
  await receiverTransaction.wait();  

  // Resposta da execução da operação de compra e venda
  console.log(senderTransaction.hash);
  console.log(receiverTransaction.hash);
}