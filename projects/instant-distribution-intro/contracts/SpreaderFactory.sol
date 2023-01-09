// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

import {ISuperfluid, ISuperToken} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol";

import {TokenSpreader} from "./TokenSpreader.sol";

contract SpreaderFactory {
    /// @notice mapping of loan owner (i.e. the msg.sender on the call) to the loan Id
    uint256 public id;

    mapping(address => TokenSpreader[]) public ownerToSpreaders;

    function createNewSpreader(
        ISuperToken _borrowToken
    ) external {
        TokenSpreader newSpreader = new TokenSpreader(
            _borrowToken,
            msg.sender
        );

        ownerToSpreaders[msg.sender].push(newSpreader);
    }

    function getOwnerSpreaders(address owner) public view returns (TokenSpreader[] memory) {
        return ownerToSpreaders[owner];
    }
}
