import { ethers } from "hardhat";
import abiRealTokenizado from '../abi/RealTokenizado.json';

function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
};

// Participante ativando um endereço para um cliente e realizando uma emissão de DVt ou MEt
async function example3() {
    const dvtParticipantX = await ethers.getContractAt(abiRealTokenizado, '<Endereço contrato Real Tokenizado>');
    const [, participantX, customerX ] = await ethers.getSigners();

    // participante do piloto habilitando endereço para cliente
    await dvtParticipantX.connect(participantX).enableAccount(customerX.address);

    await delay(5000);

    // Participante do piloto emitindo dvt para cliente 
    const response = await dvtParticipantX.connect(participantX).mint(customerX.address, ethers.utils.parseUnits("100", 2));

    console.log(response.hash);
}