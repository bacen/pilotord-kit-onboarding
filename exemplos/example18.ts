import {ethers} from "hardhat";
import abiITPFtRepaymentReserve from "../abi/ITPFtRepaymentReserve.json";
import abiAddressDiscovery from "../abi/AddressDiscovery.json";

/**
 * TPFtRepaymentReserve - Armazena e permite que um participante ou cliente realize o saque do valor financeiro armazenado 
 * no contrato referente a pagamento de resgate de TPFt que não foi bem-sucedido.
 */

/**
 * Função que permite que uma carteira de autoridade realize o saque do valor financeiro armazenado no contrato para um 
 * participante ou cliente. A autoridade deve indicar uma nova carteira de destino para receber o valor financeiro.
 */
async function withdrawFrom(tpftId: string, from: string, to: string) {

   /**
   * Obtém contrato Address Discovery
   */
   const addressDiscrovery = await ethers.getContractAt(
    abiAddressDiscovery,
    '<Endereço do Contrato Address Discovery>'
  );

  /**
   * Endereço do TPFtRepaymentReserve
   */
  const tpftRepaymentReserveAddress = await addressDiscrovery.addressDiscovery(ethers.utils.id('TPFtRepaymentReserve'));
  
  /**
   * Obtém contrato TPFtRepaymentReserve
   */
  const TPFtRepaymentReserve = await ethers.getContractAt(
    abiITPFtRepaymentReserve, 
    tpftRepaymentReserveAddress
  ); 
  
  /**
   * A carteira de autoridade executa a função withdrawFrom do contrato TPFtRepaymentReserve para realizar o saque para 
   * a nova carteira de participante em forma de Real digital ou para carteira de cliente em forma de Real Tokenizado.
   */
  const authority = await ethers.getSigner("<Endereço da carteira de autoridade>");
  const withdrawFromBalance = await TPFtRepaymentReserve.connect(authority).withdrawFrom(tpftId, from, to);

  /**
   * Aguarda até que a transação enviada pela carteira de autoridade seja confirmada na blockchain. 
   */
  await withdrawFromBalance.wait();

  /**
   * Hash da resposta do saque do valor financeiro armazenado no contrato para a nova carteira de participante ou cliente.
   */
  console.log(withdrawFromBalance.hash);    
}