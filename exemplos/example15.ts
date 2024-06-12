import { ethers } from "hardhat";
import abiITPFtOperation1052 from "../abi/ITPFtOperation1052.json";


/**
 * TPFtOperation1052 - como cancelar a operação de compra e venda envolvendo Título Público Federal tokenizado (TPFt). 
 */
async function tpftOperation1052Cancel(
  operationId: string,
  reason?: string
) {
  
  /**
   * Obtém contrato TPFtOperation1052
   */
  const TPFtOperation1052 = await ethers.getContractAt(
    abiITPFtOperation1052,
    '<Endereço do Contrato TPFtOperation1052>'
  );

  /**
   * Sender refere-se ao cedente (detentor de TPFts) e receiver refere-se ao cessionário (não detentor de TPFts)
   */
  const [, senderAccount, receiverAccount] = await ethers.getSigners();

  /**
   * Cancelamento da operação de compra e venda por parte do sender
   * chamando à função cancel
   */
  const cancelTransaction = await TPFtOperation1052
    .connect(senderAccount)
    .cancel(
      operationId,
      reason
  )

  /**
    * Aguarda até que a transação enviada pelo receiver seja confirmada na blockchain. 
    */
  await cancelTransaction.wait();

  /**
   * Resposta de cancelamento da operação de compra e venda de TPFt.
   */
  console.log(cancelTransaction.hash);  
  
}

/**
  * Função a ser chamada para cancelamento da operação de compra e venda de TPFt.
  */
tpftOperation1052Cancel(
  '<Número de operação + data vigente no formato yyyyMMdd>',
  '<Motivo do cancelamento>'
) 