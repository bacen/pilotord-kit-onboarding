// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.7.0 <0.9.0;

import "./RealDigital.sol";
import "./RealTokenizado.sol";

/**
 * @title SwapOneStep
 * @dev Este contrato implementa a troca de Real Tokenizado entre dois participantes distintos.
 * 
 * A troca destrói Real Tokenizado do cliente pagador, 
 * transfere Real Digital do participante pagador para o participante recebedor
 * e emite Real Tokenizado para o cliente recebedor.
 * 
 * Todos os passos dessa operação de _swap_ são realizados em apenas uma transação.
 */
contract SwapOneStep {
    RealDigital private CBDC;

    event SwapExecuted(
        uint256 senderNumber,
        uint256 receiverNumber,
        address sender,
        address receiver,
        uint256 amount
    );

    constructor(RealDigital _CBDC) {
        CBDC = _CBDC;
    }

    // Transfere o Real Tokenizado do cliente pagador para o recebedor. 
    // O cliente pagador é identificado pela carteira que estiver executando esta função.
    function executeSwap(
        RealTokenizado tokenSender,
        RealTokenizado tokenReceiver,
        address receiver,
        uint256 amount
    ) public {
        // O valor é retirado do pagador
        tokenSender.burnFrom(msg.sender, amount);
        // Real Digital é transferido do participante pagador para o recebedor
        CBDC.move(tokenSender.reserve(), tokenReceiver.reserve(), amount);
        // Real Tokenizado é emitido para o recebedor
        tokenReceiver.mint(receiver, amount);

        // Emitindo o evento de SwapExecuted
        emit SwapExecuted(
            tokenSender.cnpj8(),
            tokenReceiver.cnpj8(),
            msg.sender,
            receiver,
            amount
        );
    }
}
