import {ethers} from "hardhat";
import abiITPFtRepaymentReserve from "../abi/ITPFtRepaymentReserve.json";
import abiAddressDiscovery from "../abi/AddressDiscovery.json";

/**
 * TPFtRepaymentReserve - Armazena e permite que um participante ou cliente realize o saque do valor financeiro armazenado 
 * no contrato referente a pagamento de resgate de TPFt que não foi bem-sucedido.
 */

/**
 * Função que permite a consulta de valor financeiro armazenado no contrato para um participante ou cliente. 
 */
async function getBalance(account: string, tpftId: string) {

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
   * Função getBalance do contrato TPFtRepaymentReserve para realizar a consulta de valor financeiro 
   * armazenado no contrato para um participante ou cliente.
   */
  const getAccountBalance = await TPFtRepaymentReserve.getBalance(account, tpftId);
  
  /**
   * Resposta da consulta de valor financeiro armazenado no contrato TPFtRepaymentReserve para um participante ou cliente.
   */
  console.log(getAccountBalance);    
}




