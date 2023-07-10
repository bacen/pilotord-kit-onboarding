// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/access/AccessControl.sol";

/**
 * @title RealDigitalEnableAccount
 * @dev Contrato que permite ao participante habilitar outras carteiras de sua propriedade.
 */
contract RealDigitalEnableAccount is AccessControl {
    // Representa o papel de um participante no contrato.
    bytes32 public constant PARTICIPANT_ROLE = keccak256("PARTICIPANT_ROLE");

    /**
     * @dev Construtor do contrato
     * @param accessControlAddress Endereço do contrato de controle de acesso. O construtor cria uma instância do contrato e armazena este endereço.
     */
    constructor(address accessControlAddress) {
        _setupRole(DEFAULT_ADMIN_ROLE, accessControlAddress);
        _setupRole(PARTICIPANT_ROLE, accessControlAddress);
    }

    /**
     * @dev Habilita uma nova carteira para o participante. Qualquer carteira previamente habilitada para o participante pode habilitar outras carteiras.
     * @param member Novo endereço do participante.
     */
    function enableAccount(address member) public onlyRole(PARTICIPANT_ROLE) {
        _setupRole(PARTICIPANT_ROLE, member);
    }

    /**
     * @dev Desabilita a própria carteira que executou a função.
     */
    function disableAccount() public onlyRole(PARTICIPANT_ROLE) {
        require(!hasRole(DEFAULT_ADMIN_ROLE, _msgSender()), "Cannot disable default admin");
        revokeRole(PARTICIPANT_ROLE, msg.sender);
    }
}
