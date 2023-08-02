import { ethers } from "hardhat";
import abiSTR from "../abi/STR.json";
import abiRealDigitalEnableAccount from "../abi/RealDigitalEnableAccount.json";
import { TransactionReceipt, TransactionResponse } from "@ethersproject/providers";

// Habilita uma conta, emite valores e destrói valores.
async function example1() {
    const STR = await ethers.getContractAt(abiSTR, '<Endereço do contrato SRT>');
    const enableAccount = await ethers.getContractAt(abiRealDigitalEnableAccount, '<Endereço do contrato RealDigitalEnableAccount>');
    const [, participantX, anotherAddressParticipantX ] = await ethers.getSigners();

    // Após ter um endereço habilitado pelo BACEN, a instituição pode habilitar novos endereços
    const enableTx: TransactionResponse = await enableAccount.connect(participantX).enableAccount(anotherAddressParticipantX.address);

    // Sempre que um novo endereço for habilitado, deve-se esperar que a transação de habilitação seja confirmada, atualizando o estado do contrato
    const enableReceipt: TransactionReceipt = await enableTx.wait();

    if (enableReceipt.status === 0) {
        // Caso o status da transação seja 0, a transação falhou por algum motivo. 
        throw new Error("Enable Account Transaction Failed");
    }


    // Emite Real Digital para a carteira do participante
    // Lembrar que são duas casas decimais, então se passar o valor 100 = 1 Real Digital
    // ethers.utils.parseUnits("100.50", 2) pode ser usado para formatar um valor para o contrato
    const mintResponse = await STR.connect(anotherAddressParticipantX).requestToMint(ethers.utils.parseUnits("100.50", 2));
    console.log(mintResponse.hash);
    const burnResponse = await STR.connect(anotherAddressParticipantX).requestToBurn(ethers.utils.parseUnits("100", 2));
    console.log(burnResponse.hash);
}