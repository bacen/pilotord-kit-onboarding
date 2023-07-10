// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.7.0 <0.9.0;

import "./RealDigital.sol";

/**
 * @title STR
 * @dev Este contrato simula o Sistema de Transferência de Reservas (STR). 
 * Por meio dele, os participantes autorizados podem emitir ou destruir Real Digital.
 * Para o piloto nenhuma validação é feita, bastando que o participante esteja autorizado.
 */
contract STR {

    // Instância do contrato Real Digital
    RealDigital private CBDC;

    /**
     * @dev Construtor do contrato.
     * @param _CBDC é a instância do contrato Real Digital.
     */
    constructor(RealDigital _CBDC) {
        CBDC = _CBDC;
    }

    /**
     * @dev Modificador para restringir o acesso apenas a participantes autorizados.
     */
    modifier onlyParticipant {
        require(CBDC.hasRole(CBDC.ACCESS_ROLE(), msg.sender), "Must be participant");
        _;
    }

    /**
     * @dev Função para solicitar a emissão de Real Digital. 
     * Apenas um participante autorizado pode emitir.
     * @param amount é a quantidade de Real Digital para emitir.
     */
    function requestToMint(uint256 amount) external onlyParticipant {
        CBDC.mint(msg.sender, amount);
    }

    /**
     * @dev Função para solicitar a destruição de Real Digital. 
     * Apenas um participante autorizado pode destruir.
     * @param amount é a quantidade de Real Digital para destruir.
     */
    function requestToBurn(uint256 amount) external onlyParticipant {
        CBDC.burnFrom(msg.sender, amount);
    }
}
