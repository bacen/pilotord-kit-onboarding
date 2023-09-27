import { ethers } from "hardhat";
import abiSwapOneStep from '../abi/SwapOneStep.json';
import abiRealDigital from '../abi/RealDigital.json';
import abiRealTokenizado from '../abi/RealTokenizado.json';

// exemplo de transferencia entre clientes de instituições diferentes usando o SwapOneStep
async function example8() {
    // Os endereços dos contratos podem ser consultados no AddressDiscovery
    const swapOneStep = await ethers.getContractAt(abiSwapOneStep, '<Endereço contrato SwapOneStep>');
    const cbdc = await ethers.getContractAt(abiRealDigital, '<Endereço contrato RealDigital>');
    const drexSender = await ethers.getContractAt(abiRealTokenizado, '<Endereço contrato Real Tokenizado do participante>');
    const drexReceiverAddress = '<Endereço contrato Real Tokenizado do participante recebedor>';
    
    // Pode ser consultado no KeyDictionary
    const receiver = '<Endereço da carteira do cliente recebedor>';
    const amount = ethers.utils.parseUnits("100", 2);

    // drexSenderAuthority é a carteira que possui autoridade sobre o real tokenizado do participante que esta enviando a transação, 
    // caso o endereço de reserva do real tokenizado tenha sido atualizado, deve ser passado a carteira de reserva para qual foi atualizada.
    const [ drexSenderAuthority, senderCustomer ] = await ethers.getSigners();

    await (await cbdc.connect(drexSenderAuthority).approve(swapOneStep.address, amount)).wait();
    await (await drexSender.connect(senderCustomer).approve(swapOneStep.address, amount)).wait();

    const result = await swapOneStep.connect(senderCustomer).executeSwap(drexSender.address, drexReceiverAddress, receiver, amount);
    await result.wait();

    console.log(result.hash);
}