import { ethers } from "hardhat";
import abiITPFtOperation1056 from "../abi/ITPFtOperation1056.json";

/**
 * TPFtOperation1056 - Permite que participantes cadastrados no Real Digital 
 * realizem a operação de recompra e revenda envolvendo Título Público Federal tokenizado (TPFt)
 */
async function tradeReverseRepo() {
  /**
   * Obtém contrato TPFtOperation1056
   */
  const TPFtOperation1056 = await ethers.getContractAt(
    abiITPFtOperation1056,
    '<Endereço do Contrato TPFtOperation1056>'
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
    originalOperationId: "<Número de operação compromissada + data vigente no formato yyyyMMdd>",
    returnOperationId: "<Número de operação de recompra e revenda + data vigente no formato yyyyMMdd>"
  };

  /**
   * Execução por parte do sender (cedente) para realizar 
   * operação de recompra e revenda no retorno.
   */
  const senderTransaction = await TPFtOperation1056
    .connect(sender)
    .tradeReverseRepo(
      params.originalOperationId,
      params.returnOperationId
    );
  
  /**
   * Aguarda até que a transação enviada pelo sender seja confirmada na blockchain. 
   */
  await senderTransaction.wait();

  /**
   * Execução por parte do receiver (cessionário) para realizar operação de 
   * Compra e venda informando o CNPJ8.
   */
  const receiverTransaction = await TPFtOperation1056
    .connect(receiver)
    .tradeReverseRepo(
      params.originalOperationId,
      params.returnOperationId
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
 * TPFtOperation1056 - Permite que participantes cadastrados no Real Digital 
 * realizem a operação de recompra e revenda com preço unitário de retorno aberto 
 * envolvendo Título Público Federal tokenizado (TPFt)
 */
async function tradeReverseRepoOpenReturnPrice() {
  /**
   * Obtém contrato TPFtOperation1056
   */
  const TPFtOperation1056 = await ethers.getContractAt(
    abiITPFtOperation1056,
    '<Endereço do Contrato TPFtOperation1056>'
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
    originalOperationId: "<Número de operação compromissada + data vigente no formato yyyyMMdd>",
    returnOperationId: "<Número de operação de recompra e revenda + data vigente no formato yyyyMMdd>",
    returnUnitPrice: "<Preço unitário de retorno aberto>"
  };

  /**
   * Execução por parte do sender (cedente) para realizar 
   * operação de recompra e revenda no retorno.
   */
  const senderTransaction = await TPFtOperation1056
    .connect(sender)
    .tradeReverseRepoOpenReturnPrice(
      params.originalOperationId,
      params.returnOperationId,
      params.returnUnitPrice
    );
  
  /**
   * Aguarda até que a transação enviada pelo sender seja confirmada na blockchain. 
   */
  await senderTransaction.wait();

  /**
   * Execução por parte do receiver (cessionário) para realizar operação de 
   * Compra e venda informando o CNPJ8.
   */
  const receiverTransaction = await TPFtOperation1056
    .connect(receiver)
    .tradeReverseRepoOpenReturnPrice(
      params.originalOperationId,
      params.returnOperationId,
      params.returnUnitPrice
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

