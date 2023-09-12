import {ethers} from "hardhat";
import abiTPFt from "../abi/ITPFt.json";
import abiIERC155 from "../abi/IERC1155.json";

/**
 * TPFt - Permite a obtenção do id do TPFt
 */
async function getTpftId() {
  const TPFt = await ethers.getContractAt(
    abiTPFt, 
    '<Endereço do Contrato TPFt>'
    ); 
  
  const params = {
      tpftData: {
        acronym: '<A sigla do TPFt>',
        code: '<O código único do TPFt>',
        maturityDate: '<Data de vencimento em milissegundos do TPFt (timestamp Unix)>',
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
  const TPFt = await ethers.getContractAt(
    abiIERC155, 
    '<Endereço do Contrato TPFt>'
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


