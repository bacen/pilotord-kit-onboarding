// SPDX-License-Identifier: Apache License 2.0
pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

import "./Utils.sol";
import "./InnerProductVerifier.sol";

contract ZetherVerifier {
    using Utils for uint256;
    using Utils for Utils.G1Point;

    uint256 constant UNITY = 0x14a3074b02521e3b1ed9852e5028452693e87be4e910500c7ba9bbddb2f46edd; // primitive 2^28th root of unity modulo q.
    uint256 constant TWO_INV = 0x183227397098d014dc2822db40c0ac2e9419f4243cdcb848a1f0fac9f8000001; // 2^{-1} modulo q

    InnerProductVerifier ip;
    uint256 public constant fee = 0; // set this to be the "transaction fee". can be any integer under MAX.

    struct Transaction {
        Utils.G1Point[] C;
        Utils.G1Point D;
        Utils.G1Point[] y;
        Utils.G1Point u;
        bytes proof;
        Utils.G1Point beneficiary;
    }

    struct ZetherStatement {
        Utils.G1Point[] CLn;
        Utils.G1Point[] CRn;
        Utils.G1Point[] C;
        Utils.G1Point D;
        Utils.G1Point[] y;
        uint256 epoch;
        Utils.G1Point u;
    }

    struct ZetherProof {
        Utils.G1Point BA;
        Utils.G1Point BS;
        Utils.G1Point A;
        Utils.G1Point B;

        Utils.G1Point[] CLnG;
        Utils.G1Point[] CRnG;
        Utils.G1Point[] C_0G;
        Utils.G1Point[] DG;
        Utils.G1Point[] y_0G;
        Utils.G1Point[] gG;
        Utils.G1Point[] C_XG;
        Utils.G1Point[] y_XG;

        uint256[] f;
        uint256 z_A;

        Utils.G1Point T_1;
        Utils.G1Point T_2;
        uint256 tHat;
        uint256 mu;

        uint256 c;
        uint256 s_sk;
        uint256 s_r;
        uint256 s_b;
        uint256 s_tau;

        InnerProductVerifier.InnerProductProof ipProof;
    }

    constructor(address _ip) {
        ip = InnerProductVerifier(_ip);
    }

    function verifyTransfer(Utils.G1Point[] memory CLn, Utils.G1Point[] memory CRn, Utils.G1Point[] memory C,Utils.G1Point memory D,Utils.G1Point[] memory y, uint256 epoch,Utils.G1Point memory u, bytes memory proof) public view returns (bool) {
        ZetherStatement memory statement;
        statement.CLn = CLn; // do i need to allocate / set size?!
        statement.CRn = CRn;
        statement.C = C;
        statement.D = D;
        statement.y = y;
        statement.epoch = epoch;
        statement.u = u;
        ZetherProof memory zetherProof = unserialize(proof);
        return verify(statement, zetherProof);
    }

    function verifyTransfer(Utils.G1Point[] memory CLn, Utils.G1Point[] memory CRn, uint256 epoch, Transaction memory transaction) public view returns (bool) {
        ZetherStatement memory statement;
        statement.CLn = CLn; // do i need to allocate / set size?!
        statement.CRn = CRn;
        statement.C = transaction.C;
        statement.D = transaction.D;
        statement.y = transaction.y;
        statement.epoch = epoch;
        statement.u = transaction.u;
        ZetherProof memory zetherProof = unserialize(transaction.proof);
        return verify(statement, zetherProof);
    }

    struct ZetherAuxiliaries {
        uint256 y;
        uint256[64] ys;
        uint256 z;
        uint256[2] zs; // [z^2, z^3]
        uint256[64] twoTimesZSquared;
        uint256 zSum;
        uint256 x;
        uint256 t;
        uint256 k;
        Utils.G1Point tEval;
    }

    struct SigmaAuxiliaries {
        uint256 c;
        Utils.G1Point A_y;
        Utils.G1Point A_D;
        Utils.G1Point A_b;
        Utils.G1Point A_X;
        Utils.G1Point A_t;
        Utils.G1Point gEpoch;
        Utils.G1Point A_u;
    }

    struct AnonAuxiliaries {
        uint256 m;
        uint256 N;
        uint256 v;
        uint256 w;
        uint256 vPow;
        uint256 wPow;
        uint256[2][] f; // could just allocate extra space in the proof?
        uint256[2][] r; // each poly is an array of length N. evaluations of prods
        Utils.G1Point temp;
        Utils.G1Point CLnR;
        Utils.G1Point CRnR;
        Utils.G1Point[2][] CR;
        Utils.G1Point[2][] yR;
        Utils.G1Point C_XR;
        Utils.G1Point y_XR;
        Utils.G1Point gR;
        Utils.G1Point DR;
    }

    struct IPAuxiliaries {
        Utils.G1Point P;
        Utils.G1Point u_x;
        Utils.G1Point[] hPrimes;
        Utils.G1Point hPrimeSum;
        uint256 o;
    }

    function gSum() internal pure returns (Utils.G1Point memory) {
        return Utils.G1Point(0x00715f13ea08d6b51bedcde3599d8e12163e090921309d5aafc9b5bfaadbcda0, 0x27aceab598af7bf3d16ca9d40fe186c489382c21bb9d22b19cb3af8b751b959f);
    }

    function verify(ZetherStatement memory statement, ZetherProof memory proof) internal view returns (bool) {
        uint256 statementHash = uint256(keccak256(abi.encode(statement.CLn, statement.CRn, statement.C, statement.D, statement.y, statement.epoch))).mod();
        AnonAuxiliaries memory anonAuxiliaries;
        anonAuxiliaries.v = uint256(keccak256(abi.encode(statementHash, proof.BA, proof.BS, proof.A, proof.B))).mod();
        anonAuxiliaries.w = uint256(keccak256(abi.encode(anonAuxiliaries.v, proof.CLnG, proof.CRnG, proof.C_0G, proof.DG, proof.y_0G, proof.gG, proof.C_XG, proof.y_XG))).mod();
        anonAuxiliaries.m = proof.f.length / 2;
        anonAuxiliaries.N = 1 << anonAuxiliaries.m;
        anonAuxiliaries.f = new uint256[2][](2 * anonAuxiliaries.m);
        for (uint256 k = 0; k < 2 * anonAuxiliaries.m; k++) {
            anonAuxiliaries.f[k][1] = proof.f[k];
            anonAuxiliaries.f[k][0] = anonAuxiliaries.w.sub(proof.f[k]); // is it wasteful to store / keep all these in memory?
        }

        for (uint256 k = 0; k < 2 * anonAuxiliaries.m; k++) {
            anonAuxiliaries.temp = anonAuxiliaries.temp.add(ip.gs(k).mul(anonAuxiliaries.f[k][1]));
            anonAuxiliaries.temp = anonAuxiliaries.temp.add(ip.hs(k).mul(anonAuxiliaries.f[k][1].mul(anonAuxiliaries.f[k][0])));
        }
        anonAuxiliaries.temp = anonAuxiliaries.temp.add(ip.hs(2 * anonAuxiliaries.m).mul(anonAuxiliaries.f[0][1].mul(anonAuxiliaries.f[anonAuxiliaries.m][1])).add(ip.hs(2 * anonAuxiliaries.m + 1).mul(anonAuxiliaries.f[0][0].mul(anonAuxiliaries.f[anonAuxiliaries.m][0]))));
        require(proof.B.mul(anonAuxiliaries.w).add(proof.A).eq(anonAuxiliaries.temp.add(Utils.h().mul(proof.z_A))), "Recovery failure for B^w * A.");

        anonAuxiliaries.r = assemblePolynomials(anonAuxiliaries.f);

        anonAuxiliaries.CR = assembleConvolutions(anonAuxiliaries.r, statement.C);
        anonAuxiliaries.yR = assembleConvolutions(anonAuxiliaries.r, statement.y);
        for (uint256 i = 0; i < anonAuxiliaries.N; i++) {
            anonAuxiliaries.CLnR = anonAuxiliaries.CLnR.add(statement.CLn[i].mul(anonAuxiliaries.r[i][0]));
            anonAuxiliaries.CRnR = anonAuxiliaries.CRnR.add(statement.CRn[i].mul(anonAuxiliaries.r[i][0]));
        }
        anonAuxiliaries.vPow = 1;
        for (uint256 i = 0; i < anonAuxiliaries.N; i++) {
            anonAuxiliaries.C_XR = anonAuxiliaries.C_XR.add(anonAuxiliaries.CR[i / 2][i % 2].mul(anonAuxiliaries.vPow));
            anonAuxiliaries.y_XR = anonAuxiliaries.y_XR.add(anonAuxiliaries.yR[i / 2][i % 2].mul(anonAuxiliaries.vPow));
            if (i > 0) {
                anonAuxiliaries.vPow = anonAuxiliaries.vPow.mul(anonAuxiliaries.v);
            }
        }
        anonAuxiliaries.wPow = 1;
        for (uint256 k = 0; k < anonAuxiliaries.m; k++) {
            anonAuxiliaries.CLnR = anonAuxiliaries.CLnR.add(proof.CLnG[k].mul(anonAuxiliaries.wPow.neg()));
            anonAuxiliaries.CRnR = anonAuxiliaries.CRnR.add(proof.CRnG[k].mul(anonAuxiliaries.wPow.neg()));
            anonAuxiliaries.CR[0][0] = anonAuxiliaries.CR[0][0].add(proof.C_0G[k].mul(anonAuxiliaries.wPow.neg()));
            anonAuxiliaries.DR = anonAuxiliaries.DR.add(proof.DG[k].mul(anonAuxiliaries.wPow.neg()));
            anonAuxiliaries.yR[0][0] = anonAuxiliaries.yR[0][0].add(proof.y_0G[k].mul(anonAuxiliaries.wPow.neg()));
            anonAuxiliaries.gR = anonAuxiliaries.gR.add(proof.gG[k].mul(anonAuxiliaries.wPow.neg()));
            anonAuxiliaries.C_XR = anonAuxiliaries.C_XR.add(proof.C_XG[k].mul(anonAuxiliaries.wPow.neg()));
            anonAuxiliaries.y_XR = anonAuxiliaries.y_XR.add(proof.y_XG[k].mul(anonAuxiliaries.wPow.neg()));

            anonAuxiliaries.wPow = anonAuxiliaries.wPow.mul(anonAuxiliaries.w);
        }
        anonAuxiliaries.DR = anonAuxiliaries.DR.add(statement.D.mul(anonAuxiliaries.wPow));
        anonAuxiliaries.gR = anonAuxiliaries.gR.add(Utils.g().mul(anonAuxiliaries.wPow));
        anonAuxiliaries.C_XR = anonAuxiliaries.C_XR.add(Utils.g().mul(fee.mul(anonAuxiliaries.wPow)));  // this line is new

        ZetherAuxiliaries memory zetherAuxiliaries;
        zetherAuxiliaries.y = uint256(keccak256(abi.encode(anonAuxiliaries.w))).mod();
        zetherAuxiliaries.ys[0] = 1;
        zetherAuxiliaries.k = 1;
        for (uint256 i = 1; i < 64; i++) {
            zetherAuxiliaries.ys[i] = zetherAuxiliaries.ys[i - 1].mul(zetherAuxiliaries.y);
            zetherAuxiliaries.k = zetherAuxiliaries.k.add(zetherAuxiliaries.ys[i]);
        }
        zetherAuxiliaries.z = uint256(keccak256(abi.encode(zetherAuxiliaries.y))).mod();
        zetherAuxiliaries.zs[0] = zetherAuxiliaries.z.mul(zetherAuxiliaries.z);
        zetherAuxiliaries.zs[1] = zetherAuxiliaries.zs[0].mul(zetherAuxiliaries.z);
        zetherAuxiliaries.zSum = zetherAuxiliaries.zs[0].add(zetherAuxiliaries.zs[1]).mul(zetherAuxiliaries.z);
        zetherAuxiliaries.k = zetherAuxiliaries.k.mul(zetherAuxiliaries.z.sub(zetherAuxiliaries.zs[0])).sub(zetherAuxiliaries.zSum.mul(1 << 32).sub(zetherAuxiliaries.zSum));
        zetherAuxiliaries.t = proof.tHat.sub(zetherAuxiliaries.k); // t = tHat - delta(y, z)
        for (uint256 i = 0; i < 32; i++) {
            zetherAuxiliaries.twoTimesZSquared[i] = zetherAuxiliaries.zs[0].mul(1 << i);
            zetherAuxiliaries.twoTimesZSquared[i + 32] = zetherAuxiliaries.zs[1].mul(1 << i);
        }

        zetherAuxiliaries.x = uint256(keccak256(abi.encode(zetherAuxiliaries.z, proof.T_1, proof.T_2))).mod();
        zetherAuxiliaries.tEval = proof.T_1.mul(zetherAuxiliaries.x).add(proof.T_2.mul(zetherAuxiliaries.x.mul(zetherAuxiliaries.x))); // replace with "commit"?

        SigmaAuxiliaries memory sigmaAuxiliaries;
        sigmaAuxiliaries.A_y = anonAuxiliaries.gR.mul(proof.s_sk).add(anonAuxiliaries.yR[0][0].mul(proof.c.neg()));
        sigmaAuxiliaries.A_D = Utils.g().mul(proof.s_r).add(statement.D.mul(proof.c.neg())); // add(mul(anonAuxiliaries.gR, proof.s_r), mul(anonAuxiliaries.DR, proof.c.neg()));
        sigmaAuxiliaries.A_b = Utils.g().mul(proof.s_b).add(anonAuxiliaries.DR.mul(zetherAuxiliaries.zs[0].neg()).add(anonAuxiliaries.CRnR.mul(zetherAuxiliaries.zs[1])).mul(proof.s_sk).add(anonAuxiliaries.CR[0][0].add(Utils.g().mul(fee.mul(anonAuxiliaries.wPow))).mul(zetherAuxiliaries.zs[0].neg()).add(anonAuxiliaries.CLnR.mul(zetherAuxiliaries.zs[1])).mul(proof.c.neg())));
        sigmaAuxiliaries.A_X = anonAuxiliaries.y_XR.mul(proof.s_r).add(anonAuxiliaries.C_XR.mul(proof.c.neg()));
        sigmaAuxiliaries.A_t = Utils.g().mul(zetherAuxiliaries.t).add(zetherAuxiliaries.tEval.neg()).mul(proof.c.mul(anonAuxiliaries.wPow)).add(Utils.h().mul(proof.s_tau)).add(Utils.g().mul(proof.s_b.neg()));
        sigmaAuxiliaries.gEpoch = Utils.mapInto("Zether", statement.epoch);
        sigmaAuxiliaries.A_u = sigmaAuxiliaries.gEpoch.mul(proof.s_sk).add(statement.u.mul(proof.c.neg()));

        sigmaAuxiliaries.c = uint256(keccak256(abi.encode(zetherAuxiliaries.x, sigmaAuxiliaries.A_y, sigmaAuxiliaries.A_D, sigmaAuxiliaries.A_b, sigmaAuxiliaries.A_X, sigmaAuxiliaries.A_t, sigmaAuxiliaries.A_u))).mod();
        require(sigmaAuxiliaries.c == proof.c, "Sigma protocol challenge equality failure.");

        IPAuxiliaries memory ipAuxiliaries;
        ipAuxiliaries.o = uint256(keccak256(abi.encode(sigmaAuxiliaries.c))).mod();
        ipAuxiliaries.u_x = Utils.h().mul(ipAuxiliaries.o);
        ipAuxiliaries.hPrimes = new Utils.G1Point[](64);
        for (uint256 i = 0; i < 64; i++) {
            ipAuxiliaries.hPrimes[i] = ip.hs(i).mul(zetherAuxiliaries.ys[i].inv());
            ipAuxiliaries.hPrimeSum = ipAuxiliaries.hPrimeSum.add(ipAuxiliaries.hPrimes[i].mul(zetherAuxiliaries.ys[i].mul(zetherAuxiliaries.z).add(zetherAuxiliaries.twoTimesZSquared[i])));
        }
        ipAuxiliaries.P = proof.BA.add(proof.BS.mul(zetherAuxiliaries.x)).add(gSum().mul(zetherAuxiliaries.z.neg())).add(ipAuxiliaries.hPrimeSum);
        ipAuxiliaries.P = ipAuxiliaries.P.add(Utils.h().mul(proof.mu.neg()));
        ipAuxiliaries.P = ipAuxiliaries.P.add(ipAuxiliaries.u_x.mul(proof.tHat));
        require(ip.verifyInnerProduct(ipAuxiliaries.hPrimes, ipAuxiliaries.u_x, ipAuxiliaries.P, proof.ipProof, ipAuxiliaries.o), "Inner product proof verification failed.");

        return true;
    }

    function assemblePolynomials(uint256[2][] memory f) internal pure returns (uint256[2][] memory result) {
        // f is a 2m-by-2 array... containing the f's and x - f's, twice (i.e., concatenated).
        // output contains two "rows", each of length N.
        uint256 m = f.length / 2;
        uint256 N = 1 << m;
        result = new uint256[2][](N);
        for (uint256 j = 0; j < 2; j++) {
            result[0][j] = 1;
            for (uint256 k = 0; k < m; k++) {
                for (uint256 i = 0; i < N; i += 1 << m - k) {
                    result[i + (1 << m - 1 - k)][j] = result[i][j].mul(f[j * m + m - 1 - k][1]);
                    result[i][j] = result[i][j].mul(f[j * m + m - 1 - k][0]);
                }
            }
        }
    }

    function assembleConvolutions(uint256[2][] memory exponent, Utils.G1Point[] memory base) internal view returns (Utils.G1Point[2][] memory result) {
        // exponent is two "rows" (actually columns).
        // will return two rows, each of half the length of the exponents;
        // namely, we will return the Hadamards of "base" by the even circular shifts of "exponent"'s rows.
        uint256 size = exponent.length;
        uint256 half = size / 2;
        result = new Utils.G1Point[2][](half); // assuming that this is necessary even when return is declared up top
        uint256 omega = UNITY.exp((1 << 28) / size); // wasteful: using exp for all 256-bits, though we only need 28 (at most!)
        uint256 omega_inv = omega.mul(omega).inv(); // also square it. inverse fft will be half as big
        uint256[] memory omegas = new uint256[](half);
        // TODO edge case when there are no decoys - size = 2
        // The inverses array is only used for the fft call with inverse=true however since the inverse_fft array has
        // size=1 the fft call returns the input array (without any further processing). Maybe size=2 should be treated
        // separately (and possibly simplified).
        uint256 halfHalf = half == 1 ? 1 : half / 2;
        uint256[] memory inverses = new uint256[](halfHalf); // if it's not an integer, will this still work nicely?
        omegas[0] = 1;
        inverses[0] = 1;
        for (uint256 i = 1; i < half; i++) omegas[i] = omegas[i - 1].mul(omega);
        for (uint256 i = 1; i < halfHalf; i++) inverses[i] = inverses[i - 1].mul(omega_inv);
        Utils.G1Point[] memory base_fft = fft(base, omegas, false); // could precompute UNITY.inv(), but... have to exp it anyway
        uint256[] memory exponent_fft = new uint256[](size);
        for (uint256 j = 0; j < 2; j++) {
            for (uint256 i = 0; i < size; i++) exponent_fft[i] = exponent[(size - i) % size][j]; // convolutional flip plus copy

            exponent_fft = fft(exponent_fft, omegas);
            Utils.G1Point[] memory inverse_fft = new Utils.G1Point[](half);
            for (uint256 i = 0; i < half; i++) { // break up into two statements for ease of reading
                inverse_fft[i] = inverse_fft[i].add(base_fft[i].mul(exponent_fft[i].mul(TWO_INV)));
                inverse_fft[i] = inverse_fft[i].add(base_fft[i + half].mul(exponent_fft[i + half].mul(TWO_INV)));
            }

            inverse_fft = fft(inverse_fft, inverses, true); // square, because half as big.
            for (uint256 i = 0; i < half; i++) result[i][j] = inverse_fft[i];
        }
    }

    function fft(Utils.G1Point[] memory input, uint256[] memory omegas, bool inverse) internal view returns (Utils.G1Point[] memory result) {
        uint256 size = input.length;
        if (size == 1) return input;
        require(size % 2 == 0, "Input size is not a power of 2!");

        Utils.G1Point[] memory even = fft(extract(input, 0), extract(omegas, 0), inverse);
        Utils.G1Point[] memory odd = fft(extract(input, 1), extract(omegas, 0), inverse);
        result = new Utils.G1Point[](size);
        for (uint256 i = 0; i < size / 2; i++) {
            Utils.G1Point memory temp = odd[i].mul(omegas[i]);
            result[i] = even[i].add(temp);
            result[i + size / 2] = even[i].add(temp.neg());
            if (inverse) { // could probably "delay" the successive multiplications by 2 up the recursion.
                result[i] = result[i].mul(TWO_INV);
                result[i + size / 2] = result[i + size / 2].mul(TWO_INV);
            }
        }
    }

    function extract(Utils.G1Point[] memory input, uint256 parity) internal pure returns (Utils.G1Point[] memory result) {
        result = new Utils.G1Point[](input.length / 2);
        for (uint256 i = 0; i < input.length / 2; i++) {
            result[i] = input[2 * i + parity];
        }
    }

    function fft(uint256[] memory input, uint256[] memory omegas) internal view returns (uint256[] memory result) {
        uint256 size = input.length;
        if (size == 1) return input;
        require(size % 2 == 0, "Input size is not a power of 2!");

        uint256[] memory even = fft(extract(input, 0), extract(omegas, 0));
        uint256[] memory odd = fft(extract(input, 1), extract(omegas, 0));
        result = new uint256[](size);
        for (uint256 i = 0; i < size / 2; i++) {
            uint256 temp = odd[i].mul(omegas[i]);
            result[i] = even[i].add(temp);
            result[i + size / 2] = even[i].sub(temp);
        }
    }

    function extract(uint256[] memory input, uint256 parity) internal pure returns (uint256[] memory result) {
        result = new uint256[](input.length / 2);
        for (uint256 i = 0; i < input.length / 2; i++) {
            result[i] = input[2 * i + parity];
        }
    }

    function unserialize(bytes memory arr) internal pure returns (ZetherProof memory proof) {
        proof.BA = Utils.G1Point(Utils.slice(arr, 0), Utils.slice(arr, 32));
        proof.BS = Utils.G1Point(Utils.slice(arr, 64), Utils.slice(arr, 96));
        proof.A = Utils.G1Point(Utils.slice(arr, 128), Utils.slice(arr, 160));
        proof.B = Utils.G1Point(Utils.slice(arr, 192), Utils.slice(arr, 224));

        uint256 m = (arr.length - 1472) / 576;
        proof.CLnG = new Utils.G1Point[](m);
        proof.CRnG = new Utils.G1Point[](m);
        proof.C_0G = new Utils.G1Point[](m);
        proof.DG = new Utils.G1Point[](m);
        proof.y_0G = new Utils.G1Point[](m);
        proof.gG = new Utils.G1Point[](m);
        proof.C_XG = new Utils.G1Point[](m);
        proof.y_XG = new Utils.G1Point[](m);
        proof.f = new uint256[](2 * m);
        for (uint256 k = 0; k < m; k++) {
            proof.CLnG[k] = Utils.G1Point(Utils.slice(arr, 256 + k * 64), Utils.slice(arr, 288 + k * 64));
            proof.CRnG[k] = Utils.G1Point(Utils.slice(arr, 256 + (m + k) * 64), Utils.slice(arr, 288 + (m + k) * 64));
            proof.C_0G[k] = Utils.G1Point(Utils.slice(arr, 256 + m * 128 + k * 64), Utils.slice(arr, 288 + m * 128 + k * 64));
            proof.DG[k] = Utils.G1Point(Utils.slice(arr, 256 + m * 192 + k * 64), Utils.slice(arr, 288 + m * 192 + k * 64));
            proof.y_0G[k] = Utils.G1Point(Utils.slice(arr, 256 + m * 256 + k * 64), Utils.slice(arr, 288 + m * 256 + k * 64));
            proof.gG[k] = Utils.G1Point(Utils.slice(arr, 256 + m * 320 + k * 64), Utils.slice(arr, 288 + m * 320 + k * 64));
            proof.C_XG[k] = Utils.G1Point(Utils.slice(arr, 256 + m * 384 + k * 64), Utils.slice(arr, 288 + m * 384 + k * 64));
            proof.y_XG[k] = Utils.G1Point(Utils.slice(arr, 256 + m * 448 + k * 64), Utils.slice(arr, 288 + m * 448 + k * 64));
            proof.f[k] = uint256(Utils.slice(arr, 256 + m * 512 + k * 32));
            proof.f[k + m] = uint256(Utils.slice(arr, 256 + m * 544 + k * 32));
        }
        uint256 starting = m * 576;
        proof.z_A = uint256(Utils.slice(arr, 256 + starting));

        proof.T_1 = Utils.G1Point(Utils.slice(arr, 288 + starting), Utils.slice(arr, 320 + starting));
        proof.T_2 = Utils.G1Point(Utils.slice(arr, 352 + starting), Utils.slice(arr, 384 + starting));
        proof.tHat = uint256(Utils.slice(arr, 416 + starting));
        proof.mu = uint256(Utils.slice(arr, 448 + starting));

        proof.c = uint256(Utils.slice(arr, 480 + starting));
        proof.s_sk = uint256(Utils.slice(arr, 512 + starting));
        proof.s_r = uint256(Utils.slice(arr, 544 + starting));
        proof.s_b = uint256(Utils.slice(arr, 576 + starting));
        proof.s_tau = uint256(Utils.slice(arr, 608 + starting));

        InnerProductVerifier.InnerProductProof memory ipProof;
        ipProof.L = new Utils.G1Point[](6);
        ipProof.R = new Utils.G1Point[](6);
        for (uint256 i = 0; i < 6; i++) { // 2^6 = 64.
            ipProof.L[i] = Utils.G1Point(Utils.slice(arr, 640 + starting + i * 64), Utils.slice(arr, 672 + starting + i * 64));
            ipProof.R[i] = Utils.G1Point(Utils.slice(arr, 640 + starting + (6 + i) * 64), Utils.slice(arr, 672 + starting + (6 + i) * 64));
        }
        ipProof.a = uint256(Utils.slice(arr, 640 + starting + 6 * 128));
        ipProof.b = uint256(Utils.slice(arr, 672 + starting + 6 * 128));
        proof.ipProof = ipProof;

        return proof;
    }
}
