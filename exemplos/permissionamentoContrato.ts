import { ethers } from "hardhat";


//exemplo de código para o participante realizar a permissão de um contrato para ser executado na rede
async function permissionamentoContrato() {

    //0xEd4ACCa0ae847CADb6c1212A13B975ae3b138b19 - prod nova versão 11/02/25
    const rulesInstance = await ethers.getContractAt("AccountRules", "0xEd4ACCa0ae847CADb6c1212A13B975ae3b138b19");


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
