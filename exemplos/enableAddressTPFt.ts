import { ethers } from "hardhat";
import abiITPFt from "../abi/ITPFt.json";

/**
 * TPFt - como aprovar uma carteira para negociar TPFt.
 */
export async function enableAccountTPFt(
    partipantOrAuthority: string,
    tpftAddress: string,
    wallet: string)
{
    /**
     * Obtém contrato TPFt
     */
    const TPFt = await ethers.getContractAt(
        abiITPFt,
        tpftAddress
    );

    /**
     * Participante ou carteira de autoridade
     */
    const partipantOrAuthoritySigner = await ethers.getSigner(partipantOrAuthority);

    /**
     * Aprova o contrato TPFtDvP a negociar TPFt
     */
    await TPFt.connect(partipantOrAuthoritySigner)["enableAddress(address)"](wallet);
}