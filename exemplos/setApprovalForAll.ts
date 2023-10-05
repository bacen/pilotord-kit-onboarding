import { ethers } from "hardhat";
import abiIERC1155 from "../abi/IERC1155.json";

/**
 * TPFt - como dar aprovação ao contrato TPFtDvP necessária em algumas operações.
 */
export async function setApprovalForAll(
  owner: string,
  tpftAddress: string, 
  tpftDvpAddress: string) 
  {
    /**
     * Obtém contrato TPFt
     */
    const TPFt = await ethers.getContractAt(
      abiIERC1155,
      tpftAddress
    );

    /**
     * Dono do TPFt
     */
    const ownerSigner = await ethers.getSigner(owner);

    /**
     * Aprova o contrato TPFtDvP a negociar TPFt
     */
    await TPFt.connect(ownerSigner).setApprovalForAll(tpftDvpAddress, true);
  }

/**
  * Função a ser chamada somente uma vez para aprovar o contrato TPFtDvP no TPFt.
  */
setApprovalForAll(
  '<Endereço do dono do TPFt>',
  '<Endereço do contrato TPFt>',
  '<Endereço do contrato TPFtDvP>'
) 
