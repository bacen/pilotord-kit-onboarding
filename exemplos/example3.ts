import { ethers } from "hardhat";
import abiRealTokenizado from '../abi/RealTokenizado.json';
import { TransactionReceipt, TransactionResponse } from "@ethersproject/providers";

// Participante ativa um endereço para um cliente e realizando uma emissão de DVt ou MEt
async function example3() {
    const dvtParticipantX = await ethers.getContractAt(abiRealTokenizado, '<Endereço contrato Real Tokenizado>');
    const [, participantX, customerX ] = await ethers.getSigners();

    // participante do piloto habilitando endereço para cliente
    const enableTx: TransactionResponse = await dvtParticipantX.connect(participantX).enableAccount(customerX.address);

    // Sempre que um novo endereço for habilitado, deve-se esperar que a transação de habilitação seja confirmada, atualizando o estado do contrato
    const enableReceipt: TransactionReceipt = await enableTx.wait();

    if (enableReceipt.status === 0) {
        // Caso o status da transação seja 0, a transação falhou por algum motivo. 
        throw new Error("Enable Account Transaction Failed");
    }

    // Participante do piloto emitindo dvt para cliente 
    const response = await dvtParticipantX.connect(participantX).mint(customerX.address, ethers.utils.parseUnits("100", 2));

    console.log(response.hash);
}