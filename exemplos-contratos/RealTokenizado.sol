// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.7.0 <0.9.0;

import "./RealDigital.sol";

/**
 * @title RealTokenizado
 * @dev Implementação do contrato Real Tokenizado (DVt e MEt).
 */
contract RealTokenizado is RealDigital {

    bytes32 public constant AUTHORITY_ROLE = keccak256("AUTHORITY_ROLE");
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public constant RESERVE_ROLE = keccak256("RESERVE_ROLE");
    
    mapping(address => uint256) private _frozenBalances;

    string public participant;
    uint256 public cnpj8;
    address public reserve;

    /**
     * @dev Construtor do contrato
     * @param _name nome do token
     * @param _symbol símbolo do token
     * @param _authority endereço da autoridade do contrato
     * @param _admin endereço do administrador
     * @param _participant identificação do participante
     * @param _cnpj8 CNPJ da instituição
     * @param _reserve endereço da reserva
     */
    constructor(
        string memory _name,
        string memory _symbol,
        address _authority,
        address _admin,
        string memory _participant,
        uint256 _cnpj8,
        address _reserve
    ) RealDigital(_name, _symbol, _authority, _admin) {
        _setupRole(RESERVE_ROLE, _reserve);

        participant = _participant;
        cnpj8 = _cnpj8;
        reserve = _reserve;
    }

    // Função para atualizar a carteira de reserva do token. A carteira de reserva é usada pelo DvP
    function updateReserve(address newReserve) public whenNotPaused onlyRole(DEFAULT_ADMIN_ROLE) {
        revokeRole(RESERVE_ROLE, reserve);
        grantRole(RESERVE_ROLE, newReserve);
        reserve = newReserve;
    }

}
