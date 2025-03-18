import { ethers } from "hardhat";
import abiAccountRules from '../abi/AccountRules.json';


//exemplo de código para o participante realizar a permissão de um contrato para ser executado na rede
async function permissionamentoContrato() {

    //0x51FD57d1f7c9539986333C50978D2E9926300e27 - prod nova versão 10/03/25
    const rulesInstance = await ethers.getContractAt(abiAccountRules, "0x51FD57d1f7c9539986333C50978D2E9926300e27");


    const listedContracts:Array<String> = ["endereço do contrato a ser permissionado"];
    
    for (let i = 0; i < listedContracts.length; i++) {

        //realiza a permissão de um contrato para ser executado na rede
        const contract = listedContracts[i];
        await (await rulesInstance.addTarget(contract.toString())).wait();
        
        //Caso queira remover o contrato para não ser mais executado, utilize o removeTarget
        //await (await rulesInstance.removeTarget(contract.toString())).wait();
        

        console.log("Contract added:", contract);
    }   

};
