// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "./RealDigital.sol";

/**
 * @title RealDigitalDefaultAccount
 * @dev Permite que os participantes alterem suas carteiras _default_.
 */
contract RealDigitalDefaultAccount is AccessControl{
    
    RealDigital private CBDC;  // Referência ao contrato do Real Digital para validação de participantes.
    address private authority; // Autoridade do contrato. Adiciona carteiras default.
    address private admin;     // Administrador do contrato. Permite trocar a autoridade.
    
    mapping(uint256 => address) private _defaultAccount; // Mapping das contas default. A chave é o CNPJ8 do participante.
    
    /**
     * @dev Modificador de método: somente participantes podem executar o método.
     */
    modifier onlyParticipant {
        require(CBDC.hasRole(CBDC.ACCESS_ROLE(), msg.sender), "Must be participant");
        _;
    }
    
    /**
     * @dev Construtor para instanciar o contrato.
     * @param _CBDC Endereço do Real Digital.
     * @param _authority Autoridade do contrato.
     * @param _admin Administrador do contrato.
     */
    constructor(RealDigital _CBDC, address _authority, address _admin) {
        CBDC = _CBDC;
        authority = _authority;
        admin = _admin;
    }
    
    /**
     * @dev Adiciona a primeira carteira _default_ para um participante. Permitido apenas para a autoridade.
     * @param cnpj8 CNPJ8 do participante.
     * @param wallet Carteira do participante.
     */
    function addDefaultAccount(uint256 cnpj8, address wallet) public {
        require(msg.sender == authority, "Must be authority");
        _defaultAccount[cnpj8] = wallet;
    }
    
    /**
     * @dev Permite ao participante trocar sua carteira _default_.
     * @param cnpj8 CNPJ8 do participante.
     * @param newWallet Nova carteira do participante.
     */
    function updateDefaultWallet(uint256 cnpj8, address newWallet) public onlyParticipant {
        require(_defaultAccount[cnpj8] == msg.sender, "Must be current default account");
        _defaultAccount[cnpj8] = newWallet;
    }
    
    /**
     * @dev Retorna a conta _default_ de um participante.
     * @param cnpj8 CNPJ8 do participante.
     * @return endereço da conta _default_.
     */
    function defaultAccount(uint256 cnpj8) public view returns (address) {
        return _defaultAccount[cnpj8];
    }

}
