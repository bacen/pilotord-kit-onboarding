import { ethers } from "hardhat";
import abiRealDigital from "../abi/RealDigital.json"
import abiRealTokenizado from "../abi/RealTokenizado.json"
import abiITPFt from "../abi/ITPFt.json"
import abiAddressDiscovery from "../abi/AddressDiscovery.json";
import abiKeyDictionary from "../abi/KeyDictionary.json";

interface CheckAddress {
  name: string;
  publicAddress: string;
}

/**
 * Script  WalletsCheckingFlow
 * Objetivo: verificar se uma ou mais carteiras estão com as permissões necessárias para realizar as operações envolvendo TPFt.
 * Premissa: para executar esse script é necessário assinar a transação com uma carteira de um participante habilitado no real digital.
 * @param wallets Lista de carteiras que serão verificadas
 */
async function TPFtCheckApproves(wallets: CheckAddress[]) {
  // Valida se lista de carteira está vazia
  if (!wallets?.length) {
    throw new Error("Insira carteira(s) e os contratos de TPFt e TPFtDvP");
  }
  // Endereço do contrato TPFt
  const TPFT_CONTRACT_ADDRESS = (await addressDiscoveryContract("TPFt"))
    .contractAddress;
  // Endereço do contrato TPFtDvP
  const TPFT_DVP_ADDRESS = (await addressDiscoveryContract("TPFtDvP"))
    .contractAddress;
  // Obtém contrato TPFt
  const tpftContract = await ethers.getContractAt(
    abiITPFt,
    TPFT_CONTRACT_ADDRESS
  );

  console.log(`\nConsultando contrato > \x1b[33mTPFt...\x1b[0m`);
  // Loop de verificação
  for await (const wallet of wallets) {
    // Verifica se a carteira deu aprovação para o contrato TPFtDvP operar no contrato de TPFt
    const hasApprove = await tpftContract.isApprovedForAll(
      wallet.publicAddress,
      TPFT_DVP_ADDRESS
    );
    // Verifica se a carteira está habilitada no TPFt
    const isEnabledAddress = await tpftContract.isEnabledAddress(
      wallet.publicAddress
    );
    // Indica se a carteira deu aprovação ou não ao TPFtDvP
    if (hasApprove) {
      console.log(`>>>\x1b[32m ${wallet.name} deu aprovação ao TPFtDvP\x1b[0m`);
    } else {
      console.log(
        `\x1b[31m ${wallet.name} não deu aprovação ao TPFtDvP\x1b[0m`
      );
    }
    // Indica se a carteira está habilitada no contrato TPFt
    if (isEnabledAddress) {
      console.log(`>>>\x1b[32m ${wallet.name} está habilitado no TPFt\x1b[0m`);
    } else {
      console.log(`\x1b[31m${wallet.name} não está habilitado no TPFt\x1b[0m`);
    }
  }

  console.log("---Verificação no TPFt finalizada---\n");
}
/**
 * Verifica se a carteira está habilitada no Real Digital
 * @param wallets Lista de carteiras que serão verificadas
 */
async function RealDigitalCheck(wallets: CheckAddress[]) {
  // Valida se lista de carteira está vazia
  if (!wallets?.length) {
    throw new Error("Insira as carteira(s) para verificação no Real Digital");
  }
  // Endereço do contrato Real Digital
  const REAL_DIGITAL_ADDRESS = (await addressDiscoveryContract("RealDigital"))
    .contractAddress;
  // Obtém contrato RealDigital
  const realDigitalContract = await ethers.getContractAt(
    abiRealDigital,
    REAL_DIGITAL_ADDRESS
  );

  console.log("Consultando contrato > \x1b[33mReal Digital....\x1b[0m");
  // Loop de verificação
  for (const wallet of wallets) {
    // Verifica se a carteira está habilitada no RealDigital
    const isEnable = await realDigitalContract.authorizedAccounts(
      wallet.publicAddress
    );
    // Indica se a carteira está habilitada ou não no RealDigital
    if (isEnable) {
      console.log(
        `>>>\x1b[32m ${wallet.name} está habilitada no Real Digital \x1b[0m`
      );
    } else {
      console.log(
        `\x1b[31m ${wallet.name} não está habilitada no Real Digital\x1b[0m`
      );
    }
  }

  console.log("---Verificação no Real Digital finalizada--\n");
}
/**
 * Verifica se uma ou mais carteiras estão habilitadas no Real Tokenizado
 * @param wallets Lista de carteiras que serão verificadas
 * @param realTokenizados Lista de Real Tokenizado
 */
async function RealTokenizadoCheck(
  wallets: CheckAddress[],
  realTokenizados: CheckAddress[]
) {
  // Valida se lista de carteiras ou realTokenizados estão vazias
  if (!wallets?.length || !realTokenizados?.length) {
    throw new Error("Insira as carteira(s) e os contrato(s) de Real Tokenizado");
  }

  console.log("Consultando contrato > \x1b[33mReal Tokenizado...\x1b[0m");
  // Loop de verificacão
  for (const realTokenizado of realTokenizados) {
    // Obtém contrato do RealTokenizado
    const realTokenizadoContract = await ethers.getContractAt(
      abiRealTokenizado,
      realTokenizado.publicAddress
    );
    for (const wallet of wallets) {
      // Verifica se a carteira está habilitada
      const isEnable = await realTokenizadoContract.authorizedAccounts(
        wallet.publicAddress
      );
      // Indica se a carteira está habilitada ou não no RealTokenizado
      if (isEnable) {
        console.log(
          `>>>\x1b[32m ${wallet.name} está habilitada no Real Tokenizado \x1b[0m`
        );
      } else {
        console.log(
          `\x1b[31m${wallet.name} não está habilitada no Real Tokenizado \x1b[0m`
        );
      }
    }
  }

  console.log("---Verificação no Real Tokenizado finalizada---\n");
}
/**
 * Verifica se uma ou mais carteiras estão cadastradas no Key Dictionary
 * @param wallets Lista de carteiras que serão verificadas
 */
async function keyDictionaryCheck(wallets: CheckAddress[]) {
  // Endereço do KeyDictionary
  const KEY_DICTIONARY_ADDRESS = (
    await addressDiscoveryContract("KeyDictionary")
  ).contractAddress;
  // Obtém contrato KeyDictionary
  const keyDictionaryContract = await ethers.getContractAt(
    abiKeyDictionary,
    KEY_DICTIONARY_ADDRESS
  );
  // Valor default do tipo bytes32 na DLT
  const bytes32Default =
    "0x0000000000000000000000000000000000000000000000000000000000000000";

  console.log("Consultando contrato >\x1b[33m keyDictionary\x1b[0m");
  // Loop de verificação
  for await (const wallet of wallets) {
    // Obtém a chave da informação do cliente
    const getKey = await keyDictionaryContract.getKey(wallet.publicAddress);
    // Verifica se a chave tem o valor default e faz log se a carteira está cadastrada no KeyDictionary
    if (bytes32Default === getKey) {
      console.log(
        `\x1b[31m Carteira não está cadastrada no Key Dictionary \x1b[0m`
      );
    } else {
      console.log(
        `>>>\x1b[32m Carteira está cadastrada no Key Dictionary \x1b[0m`
      );
    }
    // Obtém dados do cliente no contrato KeyDictionary
    const clientCustomData = await keyDictionaryContract.getCustomerData(
      getKey
    );
    // Nome do RealTokenizado
    const realTokenizadoName = `RealTokenizado@${clientCustomData.cnpj8}`;
    // Obtém contrato RealTokenizado
    const realTokenizadoAddress = (
      await addressDiscoveryContract(realTokenizadoName)
    ).contractAddress;
    // Informação do RealTokenizado
    const realTokenizado = {
      name: realTokenizadoName,
      publicAddress: realTokenizadoAddress,
    };

    console.log("---Verificação no Key Dictionary finalizada---\n");
    // Chama o script do RealTokenizado para verificar se a carteira está habilitada
    await RealTokenizadoCheck(wallets, [realTokenizado]);
  }
}
/**
 * Busca endereço do contrato no addressDiscovery
 * @param key Nome do contrato
 * @returns Retorna o endereço de contrato
 */
async function addressDiscoveryContract(key: string) {
  // Obtém o contrato AddressDiscovery
  const addressDiscoveryContract = await ethers.getContractAt(
    abiAddressDiscovery,
    ADDRESS_DISCOVERY_ADDRESS
  );
  // Endereço do contrato
  const contractAddress = await addressDiscoveryContract.addressDiscovery(
    ethers.utils.id(key)
  );
  // Retorna erro se o contrato pesquisado no AddressDiscovery não existir
  if (contractAddress === ethers.constants.AddressZero) {
    throw new Error("Endereço de contrato não encontrado no Address Discovery");
  }
  // Retorna o endereço do contrato
  return {
    contractAddress,
  };
}
/**
 * Verifica se os endereços das carteiras são validos
 * @param wallets Lista de carteiras que serão verificadas
 */
async function isWallets(wallets: CheckAddress[]) {
  // Loop de verificação
  wallets.forEach((wallet) => {
    // Verifica se o endereço da carteira é valido
    if (!ethers.utils.isAddress(wallet.publicAddress)) {
      throw new Error(`${wallet.name} não é um endereço de carteira valido.`);
    }
  });
}
/**
 * Executa todas as verificações
 * @param wallets Lista de carteiras que serão verificadas
 * @param addressDiscoveryAddress Endereço do contrato AddressDiscovery
 */
async function main(wallets: CheckAddress[], addressDiscoveryAddress: string) {
  ADDRESS_DISCOVERY_ADDRESS = addressDiscoveryAddress;
  isWallets(wallets);
  await TPFtCheckApproves(wallets);
  await RealDigitalCheck(wallets);
  await keyDictionaryCheck(wallets);
}
/**
 * Mapeamento de mensagens de erros
 */
const errors: Record<string, string> = {
  "RealDigitalDefaultAccount: Not authorized Account":
    "Signer isn't an authorized participant",
};
/**
 * Endereço do contrato AddressDiscovery
 */
let ADDRESS_DISCOVERY_ADDRESS:string;
/**
 * Lista de carteiras que serão verificadas
 */
const wallets: CheckAddress[] = [
  {
    name: "NOME_DA_CARTEIRA",
    publicAddress: "ENDEREÇO_DA_CARTEIRA",
  }
];
/**
 * Executa todas as verificações
 */
main(wallets, "ENDEREÇO_DO_ADDRESS_DISCOVERY").catch((error) => {
  const reason = error?.reason ? errors[error?.reason] : error;
  console.error(`>>> \x1b[31m${reason} \x1b[0m`);
  error.exitCode = 1;
});
