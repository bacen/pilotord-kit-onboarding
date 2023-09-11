import { ethers } from "hardhat";
import abiAddressDiscovery from '../abi/AddressDiscovery.json';

// busca o endereço do contrato do RealDigital
async function example4() {
    const contract = await ethers.getContractAt(abiAddressDiscovery, '<Endereço contrato Address Discovery>');
    const realDigitalAddress = await contract.addressDiscovery(ethers.utils.id('RealDigital'));

    console.log(realDigitalAddress);
}