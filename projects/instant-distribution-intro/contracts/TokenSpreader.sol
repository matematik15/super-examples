// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

import {ISuperfluid, ISuperToken } from "@superfluid-finance/ethereum-contracts/contracts/apps/SuperAppBase.sol";
import {IInstantDistributionAgreementV1} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/agreements/IInstantDistributionAgreementV1.sol";

import {SuperTokenV1Library} from "@superfluid-finance/ethereum-contracts/contracts/apps/SuperTokenV1Library.sol";

contract TokenSpreader {
    /// @notice Super token to be distributed.
    ISuperToken public spreaderToken;

    /// @notice SuperToken Library
    using SuperTokenV1Library for ISuperToken;

    /// @notice Index ID. Never changes.
    uint32 public constant INDEX_ID = 0;

    address private _owner;

    constructor(ISuperToken _spreaderToken, address _creator) {
        _owner = _creator;
        spreaderToken = _spreaderToken;

        // Creates the IDA Index through which tokens will be distributed
        _spreaderToken.createIndex(INDEX_ID);
    }

    //Ownership based on OpenZeppelin's implementation. Just importing Ownable wouldn't work directly since we're using factory.
    function owner() public view virtual returns (address) {
        return _owner;
    }

    function _checkOwner() internal view virtual {
        require(owner() == msg.sender, "Ownable: caller is not the owner");
    }
    
    modifier onlyOwner() {
        _checkOwner();
        _;
    }

    // ---------------------------------------------------------------------------------------------
    // IDA OPERATIONS

    /// @notice Takes the entire balance of the designated spreaderToken in the contract and distributes it out to unit holders w/ IDA
    function distribute() public onlyOwner {
        uint256 spreaderTokenBalance = spreaderToken.balanceOf(address(this));

        (uint256 actualDistributionAmount, ) = spreaderToken.calculateDistribution(
            address(this),
            INDEX_ID,
            spreaderTokenBalance
        );

        spreaderToken.distribute(INDEX_ID, actualDistributionAmount);
    }

    /// @notice lets an account gain a single distribution unit
    /// @param subscriber subscriber address whose units are to be incremented
    function gainShare(address subscriber) public onlyOwner {
        // Get current units subscriber holds
        (, , uint256 currentUnitsHeld, ) = spreaderToken.getSubscription(
            address(this),
            INDEX_ID,
            subscriber
        );

        // Update to current amount + 1
        spreaderToken.updateSubscriptionUnits(
            INDEX_ID,
            subscriber,
            uint128(currentUnitsHeld + 1)
        );
    }

    /// @notice lets an account lose a single distribution unit
    /// @param subscriber subscriber address whose units are to be decremented
    function loseShare(address subscriber) public onlyOwner {
        // Get current units subscriber holds
        (, , uint256 currentUnitsHeld, ) = spreaderToken.getSubscription(
            address(this),
            INDEX_ID,
            subscriber
        );

        // Update to current amount - 1 (reverts if currentUnitsHeld - 1 < 0, so basically if currentUnitsHeld = 0)
        spreaderToken.updateSubscriptionUnits(
            INDEX_ID,
            subscriber,
            uint128(currentUnitsHeld - 1)
        );
    }

    /// @notice allows an account to delete its entire subscription this contract
    /// @param subscriber subscriber address whose subscription is to be deleted
    function deleteShares(address subscriber) public onlyOwner {
        spreaderToken.deleteSubscription(address(this), INDEX_ID, subscriber);
    }
}
