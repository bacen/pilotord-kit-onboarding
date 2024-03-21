// SPDX-License-Identifier: Apache License 2.0
pragma solidity ^0.8.0;

library Utils {

    uint256 constant GROUP_ORDER = 0x30644e72e131a029b85045b68181585d2833e84879b9709143e1f593f0000001;
    uint256 constant FIELD_ORDER = 0x30644e72e131a029b85045b68181585d97816a916871ca8d3c208c16d87cfd47;

    function add(uint256 x, uint256 y) internal pure returns (uint256) {
        return addmod(x, y, GROUP_ORDER);
    }

    function mul(uint256 x, uint256 y) internal pure returns (uint256) {
        return mulmod(x, y, GROUP_ORDER);
    }

    function inv(uint256 x) internal view returns (uint256) {
        return exp(x, GROUP_ORDER - 2);
    }

    function mod(uint256 x) internal pure returns (uint256) {
        return x % GROUP_ORDER;
    }

    function sub(uint256 x, uint256 y) internal pure returns (uint256) {
        return x >= y ? x - y : GROUP_ORDER - y + x;
    }

    function neg(uint256 x) internal pure returns (uint256) {
        return GROUP_ORDER - x;
    }

    function exp(uint256 base, uint256 exponent) internal view returns (uint256 output) {
        uint256 order = GROUP_ORDER;
        assembly {
            let m := mload(0x40)
            mstore(m, 0x20)
            mstore(add(m, 0x20), 0x20)
            mstore(add(m, 0x40), 0x20)
            mstore(add(m, 0x60), base)
            mstore(add(m, 0x80), exponent)
            mstore(add(m, 0xa0), order)
            if iszero(staticcall(gas(), 0x05, m, 0xc0, m, 0x20)) { // staticcall or call?
                revert(0, 0)
            }
            output := mload(m)
        }
    }

    function fieldExp(uint256 base, uint256 exponent) internal view returns (uint256 output) { // warning: mod p, not q
        uint256 order = FIELD_ORDER;
        assembly {
            let m := mload(0x40)
            mstore(m, 0x20)
            mstore(add(m, 0x20), 0x20)
            mstore(add(m, 0x40), 0x20)
            mstore(add(m, 0x60), base)
            mstore(add(m, 0x80), exponent)
            mstore(add(m, 0xa0), order)
            if iszero(staticcall(gas(), 0x05, m, 0xc0, m, 0x20)) { // staticcall or call?
                revert(0, 0)
            }
            output := mload(m)
        }
    }

    struct G1Point {
        bytes32 x;
        bytes32 y;
    }

    function add(G1Point memory p1, G1Point memory p2) internal view returns (G1Point memory r) {
        assembly {
            let m := mload(0x40)
            mstore(m, mload(p1))
            mstore(add(m, 0x20), mload(add(p1, 0x20)))
            mstore(add(m, 0x40), mload(p2))
            mstore(add(m, 0x60), mload(add(p2, 0x20)))
            if iszero(staticcall(gas(), 0x06, m, 0x80, r, 0x40)) {
                revert(0, 0)
            }
        }
    }

    function mul(G1Point memory p, uint256 s) internal view returns (G1Point memory r) {
        assembly {
            let m := mload(0x40)
            mstore(m, mload(p))
            mstore(add(m, 0x20), mload(add(p, 0x20)))
            mstore(add(m, 0x40), s)
            if iszero(staticcall(gas(), 0x07, m, 0x60, r, 0x40)) {
                revert(0, 0)
            }
        }
    }

    function neg(G1Point memory p) internal pure returns (G1Point memory) {
        return G1Point(p.x, bytes32(FIELD_ORDER - uint256(p.y))); // p.y should already be reduced mod P?
    }

    function eq(G1Point memory p1, G1Point memory p2) internal pure returns (bool) {
        return p1.x == p2.x && p1.y == p2.y;
    }

    function g() internal pure returns (G1Point memory) {
        return G1Point(0x077da99d806abd13c9f15ece5398525119d11e11e9836b2ee7d23f6159ad87d4, 0x01485efa927f2ad41bff567eec88f32fb0a0f706588b4e41a8d587d008b7f875);
    }

    function h() internal pure returns (G1Point memory) {
        return G1Point(0x01b7de3dcf359928dd19f643d54dc487478b68a5b2634f9f1903c9fb78331aef, 0x2bda7d3ae6a557c716477c108be0d0f94abc6c4dc6b1bd93caccbcceaaa71d6b);
    }

    function mapInto(uint256 seed) internal view returns (G1Point memory) {
        uint256 y;
        while (true) {
            uint256 ySquared = fieldExp(seed, 3) + 3; // addmod instead of add: waste of gas, plus function overhead cost
            y = fieldExp(ySquared, (FIELD_ORDER + 1) / 4);
            if (fieldExp(y, 2) == ySquared) {
                break;
            }
            seed += 1;
        }
        return G1Point(bytes32(seed), bytes32(y));
    }

    function mapInto(string memory input) internal view returns (G1Point memory) {
        return mapInto(uint256(keccak256(abi.encodePacked(input))) % FIELD_ORDER);
    }

    function mapInto(string memory input, uint256 i) internal view returns (G1Point memory) {
        return mapInto(uint256(keccak256(abi.encodePacked(input, i))) % FIELD_ORDER);
    }

    function slice(bytes memory input, uint256 start) internal pure returns (bytes32 result) {
        assembly {
            let m := mload(0x40)
            mstore(m, mload(add(add(input, 0x20), start))) // why only 0x20?
            result := mload(m)
        }
    }
}
