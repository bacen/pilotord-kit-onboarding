import { ethers } from "hardhat";
import abiRealDigital from "../abi/RealDigital.json";

/**
 * Real Digital e TPFt - como dar aprovações para o contrato TPFtDvP necessárias em algumas operações.
 */
export async function approveRealDigital(
  realDigitalAddress: string, 
  walletAccount: string, 
  realDigitalAmount: number,
  tpftDvpAddress: string,
  swapOneStepAddrress?: string) 
  {

    /**
     * Obtém contrato Real Digital
     */
    const realDigital = await ethers.getContractAt(
      abiRealDigital,
      realDigitalAddress,
    );

    /**
      * Endereço do participante associado ao Real Digital
      */
    const walletAccountSigner = await ethers.getSigner(walletAccount);
    
    /**
     * Aprova o contrato TPFtDvP a negociar valor de Real Digital
     */
    await realDigital.connect(walletAccountSigner).approve(tpftDvpAddress, realDigitalAmount);

    if(swapOneStepAddrress) {
      /**
       * Aprova o contrato SwapOneStep a negociar valor de Real Digital
       */
      await realDigital.connect(walletAccountSigner).approve(swapOneStepAddrress, realDigitalAmount);
    }
  }

  const realDigitalAmount = 100;

  /**
   * Função a ser chamada para aprovar uma quantidade de Real Digital para o contrato TPFtDvP
   * de acordo com os critérios do participante.
   */
  approveRealDigital(
    '<Endereço do contrato RealDigital>',
    '<Endereço de carteira do participante>',
    realDigitalAmount,
    '<Endereço do contrato TPFtDvP>'
  ) 

  /**
   * Função a ser chamada para aprovar uma quantidade de Real Digital para o contrato TPFtDvP e SwapOneStep
   * de acordo com os critérios do participante.
   */
    approveRealDigital(
      '<Endereço do contrato RealDigital>',
      '<Endereço de carteira do participante>',
      realDigitalAmount,
      '<Endereço do contrato TPFtDvP>',
      '<Endereço do contrato SwapOneStep>'
    ) 
