import { ethers } from "hardhat";
import abiKeyDictionary from "../abi/KeyDictionary.json";

// adiciona um cliente ao KeyDictionary e busca o endereço da carteira a partir da chave
async function example9() {
    const contract = await ethers.getContractAt(abiKeyDictionary, '<Endereço KeyDictionary>');
  
    const customerData = {
      taxId: 69280471007, // cpf fictício do cliente
      bankNumber: 123, // identificador do banco
      account: 987654, // conta do cliente
      branch: 123, // agencia
      wallet: '<Endereço carteira do cliente>'
    }
  
    // hash kcal256 do cpf
    const key = ethers.utils.id(String(customerData.taxId));
  
    // adiciona o cliente
    const response = await contract.addAccount(key, customerData.taxId, customerData.bankNumber, 
      customerData.account, customerData.branch, customerData.wallet);
    
    await response.wait();
    console.log(response.hash);
  
    // busca um endereço de carteira de uma chave
    const customerAddress = await contract.getWallet(key);
  
    console.log(customerAddress);
}

