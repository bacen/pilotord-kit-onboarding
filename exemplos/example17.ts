import {ethers} from "hardhat";
import abiITPFtRepaymentReserve from "../abi/ITPFtRepaymentReserve.json";
import abiAddressDiscovery from "../abi/AddressDiscovery.json";

/**
 * TPFtRepaymentReserve - Armazena e permite que um participante ou cliente realize o saque do valor financeiro armazenado 
 * no contrato referente a pagamento de resgate de TPFt que não foi bem-sucedido.
 */

/**
 * Função que permite que o participante ou cliente realize o saque do valor financeiro armazenado no contrato.
 */
async function withdraw(tpftId: string) {

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
   * A carteira de participante ou cliente executa a função withdraw do contrato TPFtRepaymentReserve para realizar o saque para 
   * o participante em forma de Real digital e para o cliente em forma de Real Tokenizado.
   */
  const signer = await ethers.getSigner("<Endereço da carteira de participante ou cliente>");
  const withdrawBalance = await TPFtRepaymentReserve.connect(signer).withdraw(tpftId);

  /**
   * Aguarda até que a transação enviada pela carteira do participante ou cliente seja confirmada na blockchain. 
   */
  await withdrawBalance.wait();

  /**
   * Hash da resposta do saque do valor financeiro armazenado no contrato para carteira do participante ou cliente.
   */
  console.log(withdrawBalance.hash);    
}


