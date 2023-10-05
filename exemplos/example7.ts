import {ethers} from "hardhat";
import abiTPFt from "../abi/ITPFt.json";
import abiIERC1155 from "../abi/IERC1155.json";
import abiAddressDiscovery from "../abi/AddressDiscovery.json";

/**
 * TPFt - Permite a obtenção do id do TPFt
 */
async function getTpftId() {
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
   * Obtém contrato TPFt
   */
  const TPFt = await ethers.getContractAt(
    abiTPFt, 
    tpftAddress
    ); 
  
  const params = {
      tpftData: {
        acronym: '<A sigla do TPFt>',
        code: '<O código único do TPFt>',
        // A função Math.floor(date.getTime() / 1000) transformar data milissegundos em segundos(timestamp Unix)
        maturityDate: '<Data de vencimento em segundos do TPFt (timestamp Unix)>',
      }
  }
  
  //Obtém o id do TPFt.
  const tpftId = await TPFt.getTPFtId(
    params.tpftData,
  );

  //Imprime o id do TPFt.
  console.log(tpftId.toString());   
  
  return tpftId;
  
}

/**
 * TPFt - Permite a consulta de saldo de TPFt em base ao seu id
 */
async function balanceOfTpft() {
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
   * Obtém contrato TPFt
   */
  const TPFt = await ethers.getContractAt(
    abiIERC1155, 
    tpftAddress
    ); 
  
  const params = {
    tpftId: '<Id do TPFt>',
  }

  //Consulta do saldo do TPFt.
  const balanceOfTPFt = await TPFt.balanceOf(
    '<Endereço de carteira>',
    params.tpftId
  )

  //Saldo do TPFt.
  console.log(balanceOfTPFt.toString());    
}


