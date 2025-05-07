import { ethers } from "hardhat";
import abiITPFt from "../abi/ITPFt.json";

/**
 * TPFt - como aprovar uma carteira para negociar TPFt.
 */
export async function enableAccountTPFt(
    partipantOrAuthority: string,
    tpftAddress: string,
    wallet: string,
    cnpj8: number) {
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
     * conta ADMIN habilitando uma carteira
     */
    await TPFt.connect(partipantOrAuthoritySigner)["enableAddress(address)"](wallet);

    /**
     * Participante habilitado no TPFt habilitando uma carteira usando seu CNPJ8
     */
    await TPFt.connect(partipantOrAuthoritySigner)["enableAddress(uint256, address)"](cnpj8, wallet);
}
