// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/access/AccessControl.sol";

/*
* @title CBDCAccessControl
* @dev Este Smart Contract é responsável pela camada de controle de acesso para o Real Digital/Tokenizado.
* Ele determina quais carteiras podem enviar/receber tokens e controla os papeis de qual endereço pode emitir/resgatar/congelar saldo de uma carteira.
*/
abstract contract CBDCAccessControl is AccessControl {

    // Definição dos diversos roles do sistema
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE"); // Role que permite pausar o contrato
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE"); // Role que permite fazer o `mint` nos contratos de token
    bytes32 public constant ACCESS_ROLE = keccak256("ACCESS_ROLE"); // Role que permite habilitar um endereço
    bytes32 public constant MOVER_ROLE = keccak256("MOVER_ROLE"); // Role que permite acesso à função `move`, ou seja, transferir o token de outra carteira
    bytes32 public constant BURNER_ROLE = keccak256("BURNER_ROLE"); // Role que permite acesso à função `burn`
    bytes32 public constant FREEZER_ROLE = keccak256("FREEZER_ROLE"); // Role que permite bloquear saldo de uma carteira, por exemplo para o _swap_ de dois passos

    // Mapping para acompanhar quais contas estão autorizadas a receber o token
    mapping(address => bool) private _authorizedAccounts;

    // Evento emitido quando uma carteira é habilitada
    event EnabledAccount(address indexed member);

    // Evento emitido quando uma carteira é desabilitada
    event DisabledAccount(address indexed member);

    /*
    * @dev Construtor do contrato
    * @param _authority: endereço da autoridade do contrato que pode fazer todas as operações com o token
    * @param _admin: endereço do administrador do contrato, que pode trocar a autoridade do contrato caso seja necessário
    */
    constructor(address _authority, address _admin) {
        _setupRole(DEFAULT_ADMIN_ROLE, _admin);
        _setupRole(ACCESS_ROLE, _authority);
        _setupRole(MINTER_ROLE, _authority);
        _setupRole(BURNER_ROLE, _authority);
        _setupRole(MOVER_ROLE, _authority);
        _setupRole(FREEZER_ROLE, _authority);
        _setupRole(PAUSER_ROLE, _admin);

        bytes32 _authorityHash = keccak256(abi.encodePacked(_authority));

        _setRoleAdmin(PAUSER_ROLE, _authorityHash);
        _setRoleAdmin(MINTER_ROLE, _authorityHash);
        _setRoleAdmin(ACCESS_ROLE, _authorityHash);
        _setRoleAdmin(MOVER_ROLE, _authorityHash);
        _setRoleAdmin(BURNER_ROLE, _authorityHash);
        _setRoleAdmin(FREEZER_ROLE, _authorityHash);
    }

    /*
    * @dev Modificador que checa se tanto o pagador quanto o recebedor estão habilitados a receber o token
    * @param from: endereço da carteira do pagador
    * @param to: endereço da carteira do recebedor
    */
    modifier checkAccess(address from, address to) {
        require(verifyAccount(from) && verifyAccount(to), "Access denied");
        _;
    }

    /*
    * @dev Habilita uma carteira a receber o token
    * @param member: endereço da carteira a ser habilitada
    */
    function enableAccount(address member) public {
        require(hasRole(ACCESS_ROLE, msg.sender), "Must have access role to enable account");

        _authorizedAccounts[member] = true;
        emit EnabledAccount(member);
    }

    /*
    * @dev Desabilita uma carteira a receber o token
    * @param member: endereço da carteira a ser desabilitada
    */
    function disableAccount(address member) public {
        require(hasRole(ACCESS_ROLE, msg.sender), "Must have access role to disable account");

        _authorizedAccounts[member] = false;
        emit DisabledAccount(member);
    }

    /*
    * @dev Checa se uma carteira pode receber o token
    * @param account: endereço da carteira a ser checada
    */
    function verifyAccount(address account) public view returns (bool) {
        return _authorizedAccounts[account];
    }


}
