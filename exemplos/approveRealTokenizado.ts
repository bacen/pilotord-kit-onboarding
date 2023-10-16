import { ethers } from "hardhat";
import abiRealTokenizado from "../abi/RealTokenizado.json";

/**
 * Real Tokenizado - como dar aprovações para o contrato TPFtDvP necessárias em algumas operações.
 */
export async function approveRealTokenizado(
  realTokenizadoAddress: string, 
  walletAccount: string, 
  realTokenizadoAmount: number,
  tpftDvpAddress: string) 
  {
    /**
     * Obtém contrato Real Tokenizado
     */
    const realTokenizado = await ethers.getContractAt(
      abiRealTokenizado,
      realTokenizadoAddress
    );

    /**
     * Endereço do participante/cliente associado ao Real Tokenizado
     */
    const walletAccountSigner = await ethers.getSigner(walletAccount);

    /**
     * Aprova o contrato TPFtDvP a negociar valor de Real Tokenizado
     */
    await realTokenizado.connect(walletAccountSigner).approve(tpftDvpAddress, realTokenizadoAmount);
  }


  const realTokenizadoAmount = 100;

/**
  * Função a ser chamada para aprovar uma quantidade de Real Tokenizado para o contrato TPFtDvP
  * de acordo com os critérios do cliente.
  */
approveRealTokenizado(
  '<Endereço do contrato Real Tokenizado>',
  '<Endereço de carteira do cliente>',
  realTokenizadoAmount,
  '<Endereço do contrato TPFtDvP>'
)
