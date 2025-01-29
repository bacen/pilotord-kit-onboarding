import { ethers } from "hardhat";
import abiSwapOneStep from '../abi/SwapOneStep.json';
import abiRealDigital from '../abi/RealDigital.json';
import abiRealTokenizado from '../abi/RealTokenizado.json';
import abiKeyDictionary from '../abi/KeyDictionary.json';
import abiAddressDiscovery from '../abi/AddressDiscovery.json';

// exemplo de transferencia entre clientes de instituições diferentes usando o SwapOneStep
// Dado a carteira do cliente, checa primeiro de qual participante é o cliente
async function example19() {
    // Os endereços dos contratos podem ser consultados no AddressDiscovery
    const swapOneStep = await ethers.getContractAt(abiSwapOneStep, '<Endereço contrato SwapOneStep>');
    const cbdc = await ethers.getContractAt(abiRealDigital, '<Endereço contrato RealDigital>');
    const drexSender = await ethers.getContractAt(abiRealTokenizado, '<Endereço contrato Real Tokenizado do participante>');
    //const drexReceiverAddress = '<Endereço contrato Real Tokenizado do participante recebedor>';
    const keyDictionary = await ethers.getContractAt(abiKeyDictionary, '<Endereço contrato KeyDictionary>');
    const addressDiscovery = await ethers.getContractAt(abiAddressDiscovery, '<Endereço contrato Address Discovery>');
    const cnpj8 = '<CPNJ8 do participante>'

    // drexSenderAuthority é a carteira que possui autoridade sobre o real tokenizado do participante que esta enviando a transação, 
    // caso o endereço de reserva do real tokenizado tenha sido atualizado, deve ser passado a carteira de reserva para qual foi atualizada.
    const [ drexSenderAuthority, senderCustomer ] = await ethers.getSigners();

    const receiver = '<Endereço da carteira do cliente recebedor>';
    const amount = ethers.utils.parseUnits("100", 2);

    // Consulta dados do cliente no KeyDictionary
    const customerKey = await keyDictionary.getKey(receiver)

    if(customerKey != "0x0000000000000000000000000000000000000000000000000000000000000000")
    {
        const customerData = await keyDictionary.getCustomerData(customerKey)
        const cnpj8CustomerParticipant = customerData.cnpj8

        // Se for cliente do próprio participante, apenas transfere o valor
        if (cnpj8CustomerParticipant == cnpj8){
            
            const result = await drexSender.connect(senderCustomer).transfer(receiver, amount)
            await result.wait();
            console.log("Hash Transfer: ", result.hash);

        } else {
            // Se não, busca o endereço do contrato do participante recebedor no AddresDiscovery
            const drexReceiverAddress = await addressDiscovery.addressDiscovery(ethers.utils.id(`RealTokenizado@${cnpj8CustomerParticipant}`));

            await (await cbdc.connect(drexSenderAuthority).approve(swapOneStep.target, amount)).wait();
            await (await drexSender.connect(senderCustomer).approve(swapOneStep.target, amount)).wait();
        
            const result = await swapOneStep.connect(senderCustomer).executeSwap(drexSender.target, drexReceiverAddress, receiver, amount);
            await result.wait();
            console.log("Hash SwapOneStep: ", result.hash);

        }
    }
    else{
        console.log("Cliente não encontrado no KeyDictionary");
    }
}