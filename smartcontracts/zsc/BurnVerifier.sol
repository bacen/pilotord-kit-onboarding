// SPDX-License-Identifier: Apache License 2.0
pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

import "./Utils.sol";
import "./InnerProductVerifier.sol";

contract BurnVerifier {
    using Utils for uint256;
    using Utils for Utils.G1Point;

    InnerProductVerifier ip;

    struct BurnStatement {
        Utils.G1Point CLn;
        Utils.G1Point CRn;
        Utils.G1Point y;
        uint256 epoch; // or uint8?
        address sender;
        Utils.G1Point u;
    }

    struct BurnProof {
        Utils.G1Point BA;
        Utils.G1Point BS;

        Utils.G1Point T_1;
        Utils.G1Point T_2;
        uint256 tHat;
        uint256 mu;

        uint256 c;
        uint256 s_sk;
        uint256 s_b;
        uint256 s_tau;

        InnerProductVerifier.InnerProductProof ipProof;
    }

    constructor(address _ip) {
        ip = InnerProductVerifier(_ip);
    }

    function verifyBurn(Utils.G1Point memory CLn, Utils.G1Point memory CRn, Utils.G1Point memory y, uint256 epoch, Utils.G1Point memory u, address sender, bytes memory proof) public view returns (bool) {
        BurnStatement memory statement; // WARNING: if this is called directly in the console,
        // and your strings are less than 64 characters, they will be padded on the right, not the left. should hopefully not be an issue,
        // as this will typically be called simply by the other contract. still though, beware
        statement.CLn = CLn;
        statement.CRn = CRn;
        statement.y = y;
        statement.epoch = epoch;
        statement.u = u;
        statement.sender = sender;
        BurnProof memory burnProof = unserialize(proof);
        return verify(statement, burnProof);
    }

    struct BurnAuxiliaries {
        uint256 y;
        uint256[32] ys;
        uint256 z;
        uint256[1] zs; // silly. just to match zether.
        uint256 zSum;
        uint256[32] twoTimesZSquared;
        uint256 x;
        uint256 t;
        uint256 k;
        Utils.G1Point tEval;
    }

    struct SigmaAuxiliaries {
        uint256 c;
        Utils.G1Point A_y;
        Utils.G1Point A_b;
        Utils.G1Point A_t;
        Utils.G1Point gEpoch;
        Utils.G1Point A_u;
    }

    struct IPAuxiliaries {
        Utils.G1Point P;
        Utils.G1Point u_x;
        Utils.G1Point[] hPrimes;
        Utils.G1Point hPrimeSum;
        uint256 o;
    }

    function gSum() internal pure returns (Utils.G1Point memory) {
        return Utils.G1Point(0x2257118d30fe5064dda298b2fac15cf96fd51f0e7e3df342d0aed40b8d7bb151, 0x0d4250e7509c99370e6b15ebfe4f1aa5e65a691133357901aa4b0641f96c80a8);
    }

    function verify(BurnStatement memory statement, BurnProof memory proof) internal view returns (bool) {
        uint256 statementHash = uint256(keccak256(abi.encode(statement.CLn, statement.CRn, statement.y, statement.epoch, statement.sender))).mod(); // stacktoodeep?

        BurnAuxiliaries memory burnAuxiliaries;
        burnAuxiliaries.y = uint256(keccak256(abi.encode(statementHash, proof.BA, proof.BS))).mod();
        burnAuxiliaries.ys[0] = 1;
        burnAuxiliaries.k = 1;
        for (uint256 i = 1; i < 32; i++) {
            burnAuxiliaries.ys[i] = burnAuxiliaries.ys[i - 1].mul(burnAuxiliaries.y);
            burnAuxiliaries.k = burnAuxiliaries.k.add(burnAuxiliaries.ys[i]);
        }
        burnAuxiliaries.z = uint256(keccak256(abi.encode(burnAuxiliaries.y))).mod();
        burnAuxiliaries.zs[0] = burnAuxiliaries.z.mul(burnAuxiliaries.z);
        burnAuxiliaries.zSum = burnAuxiliaries.zs[0].mul(burnAuxiliaries.z); // trivial sum
        burnAuxiliaries.k = burnAuxiliaries.k.mul(burnAuxiliaries.z.sub(burnAuxiliaries.zs[0])).sub(burnAuxiliaries.zSum.mul(1 << 32).sub(burnAuxiliaries.zSum));
        burnAuxiliaries.t = proof.tHat.sub(burnAuxiliaries.k);
        for (uint256 i = 0; i < 32; i++) {
            burnAuxiliaries.twoTimesZSquared[i] = burnAuxiliaries.zs[0].mul(1 << i);
        }

        burnAuxiliaries.x = uint256(keccak256(abi.encode(burnAuxiliaries.z, proof.T_1, proof.T_2))).mod();
        burnAuxiliaries.tEval = proof.T_1.mul(burnAuxiliaries.x).add(proof.T_2.mul(burnAuxiliaries.x.mul(burnAuxiliaries.x))); // replace with "commit"?

        SigmaAuxiliaries memory sigmaAuxiliaries;
        sigmaAuxiliaries.A_y = Utils.g().mul(proof.s_sk).add(statement.y.mul(proof.c.neg()));
        sigmaAuxiliaries.A_b = Utils.g().mul(proof.s_b).add(statement.CRn.mul(proof.s_sk).add(statement.CLn.mul(proof.c.neg())).mul(burnAuxiliaries.zs[0]));
        sigmaAuxiliaries.A_t = Utils.g().mul(burnAuxiliaries.t).add(burnAuxiliaries.tEval.neg()).mul(proof.c).add(Utils.h().mul(proof.s_tau)).add(Utils.g().mul(proof.s_b.neg()));
        sigmaAuxiliaries.gEpoch = Utils.mapInto("Zether", statement.epoch);
        sigmaAuxiliaries.A_u = sigmaAuxiliaries.gEpoch.mul(proof.s_sk).add(statement.u.mul(proof.c.neg()));

        sigmaAuxiliaries.c = uint256(keccak256(abi.encode(burnAuxiliaries.x, sigmaAuxiliaries.A_y, sigmaAuxiliaries.A_b, sigmaAuxiliaries.A_t, sigmaAuxiliaries.A_u))).mod();
        require(sigmaAuxiliaries.c == proof.c, "Sigma protocol challenge equality failure.");

        IPAuxiliaries memory ipAuxiliaries;
        ipAuxiliaries.o = uint256(keccak256(abi.encode(sigmaAuxiliaries.c))).mod();
        ipAuxiliaries.u_x = Utils.h().mul(ipAuxiliaries.o);
        ipAuxiliaries.hPrimes = new Utils.G1Point[](32);
        for (uint256 i = 0; i < 32; i++) {
            ipAuxiliaries.hPrimes[i] = ip.hs(i).mul(burnAuxiliaries.ys[i].inv());
            ipAuxiliaries.hPrimeSum = ipAuxiliaries.hPrimeSum.add(ipAuxiliaries.hPrimes[i].mul(burnAuxiliaries.ys[i].mul(burnAuxiliaries.z).add(burnAuxiliaries.twoTimesZSquared[i])));
        }
        ipAuxiliaries.P = proof.BA.add(proof.BS.mul(burnAuxiliaries.x)).add(gSum().mul(burnAuxiliaries.z.neg())).add(ipAuxiliaries.hPrimeSum);
        ipAuxiliaries.P = ipAuxiliaries.P.add(Utils.h().mul(proof.mu.neg()));
        ipAuxiliaries.P = ipAuxiliaries.P.add(ipAuxiliaries.u_x.mul(proof.tHat));
        require(ip.verifyInnerProduct(ipAuxiliaries.hPrimes, ipAuxiliaries.u_x, ipAuxiliaries.P, proof.ipProof, ipAuxiliaries.o), "Inner product proof verification failed.");

        return true;
    }

    function unserialize(bytes memory arr) internal pure returns (BurnProof memory proof) {
        proof.BA = Utils.G1Point(Utils.slice(arr, 0), Utils.slice(arr, 32));
        proof.BS = Utils.G1Point(Utils.slice(arr, 64), Utils.slice(arr, 96));

        proof.T_1 = Utils.G1Point(Utils.slice(arr, 128), Utils.slice(arr, 160));
        proof.T_2 = Utils.G1Point(Utils.slice(arr, 192), Utils.slice(arr, 224));
        proof.tHat = uint256(Utils.slice(arr, 256));
        proof.mu = uint256(Utils.slice(arr, 288));

        proof.c = uint256(Utils.slice(arr, 320));
        proof.s_sk = uint256(Utils.slice(arr, 352));
        proof.s_b = uint256(Utils.slice(arr, 384));
        proof.s_tau = uint256(Utils.slice(arr, 416));

        InnerProductVerifier.InnerProductProof memory ipProof;
        ipProof.L = new Utils.G1Point[](5);
        ipProof.R = new Utils.G1Point[](5);
        for (uint256 i = 0; i < 5; i++) { // 2^5 = 32.
            ipProof.L[i] = Utils.G1Point(Utils.slice(arr, 448 + i * 64), Utils.slice(arr, 480 + i * 64));
            ipProof.R[i] = Utils.G1Point(Utils.slice(arr, 448 + (5 + i) * 64), Utils.slice(arr, 480 + (5 + i) * 64));
        }
        ipProof.a = uint256(Utils.slice(arr, 448 + 5 * 128));
        ipProof.b = uint256(Utils.slice(arr, 480 + 5 * 128));
        proof.ipProof = ipProof;

        return proof;
    }
}
