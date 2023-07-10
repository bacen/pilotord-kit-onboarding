// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.7.0 <0.9.0;

import "./RealDigital.sol";
import "./RealTokenizado.sol";

/**
 * @title SwapTwoSteps
 * @dev Este contrato implementa a troca de Real Tokenizado entre dois participantes distintos.
 * A troca destrói Real Tokenizado do cliente pagador, transfere Real Digital do participante pagador para o participante
 *  recebedor e emite Real Tokenizado para o cliente recebedor.
 * A operação de _swap_ implementada neste contrato é realizada em duas transações: uma de proposta e outra de aceite.
 */
contract SwapTwoSteps {
    RealDigital private CBDC;

    // Enumeração com as possíveis situações de uma operação de _swap_.
    enum SwapStatus {
        PENDING,          // Operação de _swap_ registrada, pendente de cancelamento ou execução.
        EXECUTED,         // Operação de _swap_ executada.
        CANCELLED         // Operação de _swap_ cancelada.
    }

    struct SwapProposal {
        RealTokenizado tokenSender;      // O endereço do contrato de Real Tokenizado do participante pagador
        RealTokenizado tokenReceiver;    // O endereço do contrato de Real Tokenizado do participante recebedor
        address sender;                  // O endereço da wallet do cliente pagador
        address receiver;                // O endereço da wallet do cliente recebedor
        uint256 amount;                  // Quantidade de Reais a ser movimentada.
        SwapStatus status;               // Situação atual da operação.
        uint256 timestamp;               // Timestamp da criação da proposta.
    }

    uint256 private proposalCounter;
    mapping(uint256 => SwapProposal) private swapProposals; // _Mapping_ de propostas de _swap_. A chave é o identificador da proposta.

    // Evento de início do _swap_. Disparado quando uma proposta de _swap_ é registrada.
    event SwapStarted(
        uint256 proposalId,     // Id da proposta
        uint256 senderNumber,   // Número do CNPJ do participante pagador
        uint256 receiverNumber, // Número do CNPJ do participante recebedor
        address sender,         // Endereço da wallet do cliente pagador
        address receiver,       // Endereço da wallet do cliente recebedor
        uint256 amount          // Quantidade de Reais a ser movimentada
    );

    // Evento de execução do _swap_. Disparado quando uma proposta de _swap_ é executada.
    event SwapExecuted(
        uint256 proposalId,     // Id da proposta
        uint256 senderNumber,   // Número do CNPJ do participante pagador
        uint256 receiverNumber, // Número do CNPJ do participante recebedor
        address sender,         // Endereço da wallet do cliente pagador
        address receiver,       // Endereço da wallet do cliente recebedor
        uint256 amount          // Quantidade de Reais movimentada
    );

    // Evento de cancelamento do _swap_. Disparado quando uma proposta de _swap_ é cancelada.
    event SwapCancelled(uint256 proposalId, string reason);

    // Evento de expiração de proposta de _swap_. Disparado quando uma proposta de _swap_ expira.
    event ExpiredProposal(uint256 proposalId);

    // Construtor do contrato. Recebe o endereço do contrato de Real Digital.
    constructor(RealDigital _CBDC) {
        CBDC = _CBDC;
        proposalCounter = 0;
    }

    // Função que retorna o número de propostas de _swap_ registradas.
    function startSwap(
        RealTokenizado tokenSender,   // O endereço do contrato de Real Tokenizado do participante pagador
        RealTokenizado tokenReceiver, // O endereço do contrato de Real Tokenizado do participante recebedor
        address receiver,             // O endereço da wallet do cliente recebedor
        uint256 amount                // Quantidade de Reais a ser movimentada
    ) public {
        proposalCounter += 1;
        swapProposals[proposalCounter] = SwapProposal({
            tokenSender: tokenSender,
            tokenReceiver: tokenReceiver,
            sender: msg.sender,
            receiver: receiver,
            amount: amount,
            status: SwapStatus.PENDING,
            timestamp: block.timestamp
        });

        emit SwapStarted(
            proposalCounter,
            tokenSender.cnpj8(),
            tokenReceiver.cnpj8(),
            msg.sender,
            receiver,
            amount
        );
    }

    // Função que retorna o número de propostas de _swap_ registradas.
    function executeSwap(uint256 proposalId) public {
        SwapProposal storage proposal = swapProposals[proposalId];
        require(proposal.receiver == msg.sender, "Only the receiver can execute the swap.");
        require(proposal.status == SwapStatus.PENDING, "Cannot execute swap, status is not PENDING.");
        require(block.timestamp - proposal.timestamp <= 1 minutes, "Swap proposal has expired.");

        proposal.tokenSender.burnFrom(proposal.sender, proposal.amount);
        CBDC.move(proposal.tokenSender.reserve(), proposal.tokenReceiver.reserve(), proposal.amount);
        proposal.tokenReceiver.mint(proposal.receiver, proposal.amount);

        proposal.status = SwapStatus.EXECUTED;

        emit SwapExecuted(
            proposalId,
            proposal.tokenSender.cnpj8(),
            proposal.tokenReceiver.cnpj8(),
            proposal.sender,
            proposal.receiver,
            proposal.amount
        );
    }

    // Função que retorna o número de propostas de _swap_ registradas.
    function cancelSwap(uint256 proposalId, string memory reason) public {
        SwapProposal storage proposal = swapProposals[proposalId];
        require(msg.sender == proposal.sender || msg.sender == proposal.receiver, "Only the sender or receiver can cancel the swap.");
        require(proposal.status == SwapStatus.PENDING, "Cannot cancel swap, status is not PENDING.");

        proposal.status = SwapStatus.CANCELLED;
        emit SwapCancelled(proposalId, reason);
    }
}
