import { ethers } from "hardhat";
import abiRealDigital from '../abi/RealDigital.json';
import abiRealDigitalDefaultAccount from '../abi/RealDigitalDefaultAccount.json';

// Busca a conta padrão do participante e realiza transferência de CBDC
async function example2() {
    const defaultAccount = await ethers.getContractAt(abiRealDigitalDefaultAccount, '<Endereço contrato RealDigitalDefaultAccount>');
    const cbdc = await ethers.getContractAt(abiRealDigital, 'Endereço contrato RealDigital');
    const [, participantX] = await ethers.getSigners();

    // Identificador do participante que vai receber a transferência
    const cnpj8AnotherParticipant = '87654321';

    // Busca o endereço padrão para a transferência
    const address = await defaultAccount.defaultAccount(cnpj8AnotherParticipant);

    // Realiza a transferência de CBDC
    const response = await cbdc.connect(participantX).transfer(address, ethers.utils.parseUnits("100", 2));

    console.log(response.hash);
}