import { ethers } from "hardhat";
import abiSTR from "../../abi/STR.json";
import abiRealDigitalEnableAccount from "../../abi/RealDigitalEnableAccount.json";

function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
};

// Habilita uma conta, emite valores e destrói valores.
async function example1() {
    const STR = await ethers.getContractAt(abiSTR, '<Endereço do contrato SRT>');
    const enableAccount = await ethers.getContractAt(abiRealDigitalEnableAccount, '<Endereço do contrato RealDigitalEnableAccount>');
    const [, participantX, anotherAddressParticipantX ] = await ethers.getSigners();

    // Após ter um endereço habilitado pelo BACEN, a instituição pode habilitar novos endereços
    await enableAccount.connect(participantX).enableAccount(anotherAddressParticipantX.address);

    // Sempre que um novo endereço for habilitado deve esperar o tempo de um bloco para estar apto a ser usado
    await delay(5000);

    // Emite Real Digital para a carteira do participante
    // Lembrar que são duas casas decimais, então se passar o valor 100 = 1 Real Digital
    // ethers.utils.parseUnits("100.50", 2) pode ser usado para formatar um valor para o contrato
    const mintResponse = await STR.connect(anotherAddressParticipantX).requestToMint(ethers.utils.parseUnits("100.50", 2));
    console.log(mintResponse.hash);
    const burnResponse = await STR.connect(anotherAddressParticipantX).requestToBurn(ethers.utils.parseUnits("100", 2));
    console.log(burnResponse.hash);
}