import {ethers} from "hardhat";
import abiITPFtOperation1002 from "../abi/ITPFtOperation1002.json";

/**
 * TPFtOperation1002 - como cancelar a liquidação de oferta pública envolvendo Título Público Federal tokenizado (TPFt).
 */
async function tpftOperation1002Cancel(
  operationId: string,
  reason?: string
) {

  /**
   * Obtém contrato TPFtOperation1002
   */
  const TPFtOperation1002 = await ethers.getContractAt(
    abiITPFtOperation1002, 
    '<Endereço do Contrato TPFtOperation1002>'
  ); 
  
  /**
   * Sender é o cedente - Bacen atua a nome da Secretaria Nacional do Tesouro (STN).
   * Receiver refere-se ao cessionário - Instituição Financeira Participante cadastrada no Real Digital.
   
   */ 
  const [ , , receiverAccount ] = await ethers.getSigners();
  
  /**
   * Cancelamento da liquidação de oferta pública de TPFt por parte do receiver
   * chamando à função cancel
   */
  const cancelTransaction = await TPFtOperation1002
    .connect(receiverAccount)
    .cancel(
      operationId,
      reason
  )

  /**
    * Aguarda até que a transação enviada pelo receiver seja confirmada na blockchain. 
    */
  await cancelTransaction.wait();

  /**
    * Resposta de cancelamento da operação de liquidação de oferta pública de TPFt.
    */
  console.log(cancelTransaction.hash);  
}

/**
  * Função a ser chamada para cancelamento de liquidação de oferta pública de TPFt.
  */
tpftOperation1002Cancel(
  '<Número de operação + data vigente no formato yyyyMMdd>',
  '<Motivo do cancelamento>'
) 

