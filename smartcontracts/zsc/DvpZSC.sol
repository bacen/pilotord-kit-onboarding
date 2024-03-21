// SPDX-License-Identifier: Apache License 2.0
pragma solidity ^0.8.0;

import "./Utils.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "./ZSCRestricted.sol";
import "./ZetherVerifier.sol";
import "hardhat/console.sol";

contract DvpZSC is AccessControl{

    using Utils for uint256;
    using Utils for Utils.G1Point;

    using Counters for Counters.Counter;

    Counters.Counter private _proposalIdCounter;

    event DvPStarted(Utils.G1Point[] parties, Utils.G1Point[] encryptedAmounts);

    enum TransactionStatus {
        UNKNOWN,
        REGISTERED,
        CONFIRMED,
        EXECUTED,
        CANCELLED
    }

    struct DvPTransaction {
        Utils.G1Point[] encryptedAmounts;
        Utils.G1Point randomTransactionNumber;
        Utils.G1Point[] publicKeyList;
        Utils.G1Point nonce;
        bytes proof;
        bytes32 proofHash;
        TransactionStatus status;
        address assetAddress;
        uint epoch;
        address counterparty;
    }

    mapping(address => DvPTransaction) dvpProposals;  
    
    /// Starts the DvP
    /// @param encryptedAmounts list of encrypted amounts
    /// @param randomTransactionNumber random transaction number
    /// @param publicKeyList list of public keys
    /// @param nonce nonce
    /// @param proofHash hash of the proof
    /// @param assetAddress address of the asset
    function startDvp(Utils.G1Point[] memory encryptedAmounts, Utils.G1Point memory randomTransactionNumber, Utils.G1Point[] memory publicKeyList, Utils.G1Point memory nonce, bytes32 proofHash, address assetAddress) public{
        
        uint256 currentEpoch = block.timestamp / ZSCRestricted(assetAddress).epochLength();
        
        for (uint i=0;i<encryptedAmounts.length;i++){
            dvpProposals[_msgSender()].encryptedAmounts.push(encryptedAmounts[i]);
            dvpProposals[_msgSender()].publicKeyList.push(publicKeyList[i]);
        }

        dvpProposals[_msgSender()].randomTransactionNumber = randomTransactionNumber;
        dvpProposals[_msgSender()].assetAddress = assetAddress;
        dvpProposals[_msgSender()].nonce = nonce;
        dvpProposals[_msgSender()].proofHash = proofHash;
        dvpProposals[_msgSender()].status = TransactionStatus.REGISTERED;
        dvpProposals[_msgSender()].epoch = currentEpoch;

        
        ZSCRestricted(assetAddress).lockProof(proofHash);

        emit DvPStarted(publicKeyList,encryptedAmounts);

    }

    /// Confirms the DvP
    /// @param proof proof of the transfer
    /// @param counterparty counterparty that you are confirming to
    function confirmDvp(bytes memory proof, address counterparty) public{
        require(dvpProposals[_msgSender()].status != TransactionStatus.CANCELLED && dvpProposals[dvpProposals[_msgSender()].counterparty].status!=TransactionStatus.EXECUTED,"DvP cannot be confirmed");
        // Counterparty must be the same as sender before confirm
        bytes32 proofHash = keccak256(abi.encodePacked(proof));
        if (dvpProposals[_msgSender()].proofHash == proofHash){
            dvpProposals[_msgSender()].status = TransactionStatus.CONFIRMED;
            dvpProposals[_msgSender()].proof=proof;
            dvpProposals[_msgSender()].counterparty = counterparty;
        }
        else{
            revert("Hash do not match DvP proposal");
        }
        if ((dvpProposals[_msgSender()].status == TransactionStatus.CONFIRMED) && (dvpProposals[dvpProposals[_msgSender()].counterparty].status == TransactionStatus.CONFIRMED)){
            executeDvP();
        }   
    }
    function executeDvP() private{
        
        dvpProposals[_msgSender()].status = TransactionStatus.EXECUTED;
        dvpProposals[dvpProposals[_msgSender()].counterparty].status = TransactionStatus.EXECUTED;

        ZetherVerifier.Transaction memory tx1;

        tx1.C = new Utils.G1Point[](dvpProposals[_msgSender()].encryptedAmounts.length);
        tx1.y = new Utils.G1Point[](dvpProposals[_msgSender()].encryptedAmounts.length);
        for (uint i=0;i<dvpProposals[_msgSender()].encryptedAmounts.length;i++){
            tx1.C[i]= dvpProposals[_msgSender()].encryptedAmounts[i];
            tx1.y[i]= dvpProposals[_msgSender()].publicKeyList[i];
        }
        tx1.D=dvpProposals[_msgSender()].randomTransactionNumber;
        tx1.u=dvpProposals[_msgSender()].nonce;
        tx1.proof = dvpProposals[_msgSender()].proof;
        tx1.beneficiary = Utils.G1Point(0,0);

        ZetherVerifier.Transaction memory tx2;

        tx2.C = new Utils.G1Point[](dvpProposals[dvpProposals[_msgSender()].counterparty].encryptedAmounts.length);
        tx2.y = new Utils.G1Point[](dvpProposals[dvpProposals[_msgSender()].counterparty].encryptedAmounts.length);

        for (uint i=0;i<dvpProposals[dvpProposals[_msgSender()].counterparty].encryptedAmounts.length;i++){
            tx2.C[i]= dvpProposals[dvpProposals[_msgSender()].counterparty].encryptedAmounts[i];
            tx2.y[i]= dvpProposals[dvpProposals[_msgSender()].counterparty].publicKeyList[i];
        }
        tx2.D=dvpProposals[dvpProposals[_msgSender()].counterparty].randomTransactionNumber;
        tx2.u=dvpProposals[dvpProposals[_msgSender()].counterparty].nonce;
        tx2.proof = dvpProposals[dvpProposals[_msgSender()].counterparty].proof;
        tx2.beneficiary = Utils.G1Point(0,0);
        require(ZSCRestricted(dvpProposals[_msgSender()].assetAddress).transfer(
            tx1
        ),"Transaction 1 failed");
        
        require(ZSCRestricted(dvpProposals[dvpProposals[_msgSender()].counterparty].assetAddress).transfer(
            tx2
        ),"Transaction 2 failed");    
    }

    function cancelDvP() public{
        require(dvpProposals[_msgSender()].status != TransactionStatus.CANCELLED && dvpProposals[_msgSender()].status!=TransactionStatus.EXECUTED,"DvP cannot be cancelled");
        dvpProposals[_msgSender()].status = TransactionStatus.CANCELLED;
        dvpProposals[dvpProposals[_msgSender()].counterparty].status = TransactionStatus.CANCELLED;
    }

}