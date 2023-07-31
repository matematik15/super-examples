// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.18;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

import { SuperTokenV1Library } from "@superfluid-finance/ethereum-contracts/contracts/apps/SuperTokenV1Library.sol";
import { SuperAppBaseFlow } from "@superfluid-finance/ethereum-contracts/contracts/apps/SuperAppBaseFlow.sol";
import { ISuperfluid, ISuperToken } from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol";

contract FlowSplitter is SuperAppBaseFlow {

    using SuperTokenV1Library for ISuperToken;

    /// @dev Super Token that the FlowSplitter will accept streams of
    ISuperToken public acceptedSuperToken;

    mapping(address => int96) public splitterToFlow;
    address[] receivers;
    int96 public totalShares;

    constructor (
        address[] memory _receivers,
        int96[] memory _flows,
        ISuperToken _acceptedSuperToken,
        ISuperfluid _host
    ) SuperAppBaseFlow (
        _host,
        true,
        true,
        true
    )  {
        require(_receivers.length == _flows.length, "All receivers must have a flow");
        acceptedSuperToken = _acceptedSuperToken;
        receivers = _receivers;
        for(uint i = 0; i < _receivers.length; i++) {
            splitterToFlow[_receivers[i]] = _flows[i];
            totalShares += _flows[i];
        }
    }

    function getFlowByReceiver(address receiver) public view returns (int96 flow) {
        return splitterToFlow[receiver];
    }

    function getReceivers() public view returns (address[] memory) {
        return receivers;
    }

    /// @dev checks that only the acceptedToken is used when sending streams into this contract
    /// @param superToken the token being streamed into the contract
    function isAcceptedSuperToken(ISuperToken superToken) public view override returns (bool) {
        return superToken == acceptedSuperToken;
    }

    /// @dev updates the split of the outflow to one of the receivers
    /// @param newReceiverPortion the new portion of inflows to be redirected to the receiver
    /// @param receiver the receiver address (already known present or new)
    function updateSplit(int96 newReceiverPortion, address receiver) public {

        // get current outflow rate
        int96 totalOutflowRate = calcTotalOutflow();

        //recalc totalShares and add the new portion
        totalShares += newReceiverPortion - splitterToFlow[receiver];
        splitterToFlow[receiver] = newReceiverPortion;

        //Delete the receiver if its new portion is 0
        if(newReceiverPortion == 0) {
            for (uint i = 0; i < receivers.length; i++) {
                if (receivers[i] == receiver) {
                    receivers[i] = receivers[receivers.length - 1];
                    receivers.pop();
                }
            }
            if(totalOutflowRate > 0) {
                acceptedSuperToken.deleteFlow(address(this), receiver);
            }
        }

        // update outflows
        bool isAlreadyPresent;
        for(uint i = 0; i < receivers.length; i++) {
            if(totalOutflowRate > 0) {
                acceptedSuperToken.updateFlow(
                    receivers[i],
                    ( totalOutflowRate * getFlowByReceiver(receivers[i]) ) / totalShares
                );
            }

            //check if the receiver is known to the splitter
            if(receivers[i] == receiver) {
                isAlreadyPresent = true;
            }
        }

        //Add the receiver if it's a new one
        if(!isAlreadyPresent && newReceiverPortion != 0) {
            if(totalOutflowRate > 0) {
                acceptedSuperToken.createFlow(
                    receiver,
                    ( totalOutflowRate * newReceiverPortion ) / totalShares
                );
            }
            receivers.push(receiver);
        }
    }

    function calcTotalOutflow() public view returns (int96) {
        int96 helperOutflow;
        for(uint i = 0; i < receivers.length; i++) {
            helperOutflow += acceptedSuperToken.getFlowRate(address(this), receivers[i]);
        }
        return helperOutflow;
    }

    // ---------------------------------------------------------------------------------------------
    // CALLBACK LOGIC

    function onFlowCreated(
        ISuperToken superToken,
        address sender,
        bytes calldata ctx
    )
        internal
        override
        returns (bytes memory newCtx)
    {
        newCtx = ctx;

        // get inflow rate from sender
        int96 inflowRate = superToken.getFlowRate(sender, address(this));

        // if there's no outflow already, create outflows
        if ( superToken.getFlowRate(address(this), receivers[0]) == 0 ) {
            for(uint i = 0; i < receivers.length; i++) {
                newCtx = superToken.createFlowWithCtx(
                    receivers[i],
                    ( inflowRate * getFlowByReceiver(receivers[i]) ) / totalShares,
                    newCtx
                );
            }
        } 
        
        // otherwise, there's already outflows which should be increased
        else {
            for(uint i = 0; i < receivers.length; i++) {
                newCtx = superToken.updateFlowWithCtx(
                    receivers[i],
                    acceptedSuperToken.getFlowRate(address(this), receivers[i]) + ( inflowRate * getFlowByReceiver(receivers[i]) ) / totalShares,
                    newCtx
                );
            }
        }

    }

    function onFlowUpdated(
        ISuperToken superToken,
        address sender,
        int96 previousFlowRate,
        uint256 /*lastUpdated*/,
        bytes calldata ctx
    )
        internal
        override
        returns (bytes memory newCtx)
    {
        newCtx = ctx;

        // get inflow rate change from sender
        int96 inflowChange = superToken.getFlowRate(sender, address(this)) - previousFlowRate;

        // update outflows
        for(uint i = 0; i < receivers.length; i++) {
            newCtx = superToken.updateFlowWithCtx(
                receivers[i],
                acceptedSuperToken.getFlowRate(address(this), receivers[i]) + ( inflowChange * getFlowByReceiver(receivers[i]) ) / totalShares,
                newCtx
            );
        }
    }



    function onFlowDeleted(
        ISuperToken superToken,
        address /*sender*/,
        address receiver,
        int96 previousFlowRate,
        uint256 /*lastUpdated*/,
        bytes calldata ctx
    )
        internal
        override
        returns (bytes memory newCtx)
    {
        newCtx = ctx;

        // remaining inflow is equal to total outflow less the inflow that just got deleted
        int96 remainingInflow = calcTotalOutflow() - previousFlowRate;

        // handle "rogue recipients" with sticky stream - see readme
        //Originally, this checked if the receiver was either the main or side receiver. We can check this by seeing if the receiver has a defined flow
        if(splitterToFlow[receiver] != 0) {

            newCtx = superToken.createFlowWithCtx(
                receiver,
                previousFlowRate,
                newCtx
            );

        }
        
        // if there is no more inflow, outflows should be deleted
        if ( remainingInflow <= 0 ) {
            for(uint i = 0; i < receivers.length; i++) {
                newCtx = superToken.deleteFlowWithCtx(
                    address(this),
                    receivers[i],
                    newCtx
                );
            }
        }

        // otherwise, there's still inflow left and outflows must be updated
        else {

            for(uint i = 0; i < receivers.length; i++) {
                newCtx = superToken.updateFlowWithCtx(
                    receivers[i],
                    ( remainingInflow * getFlowByReceiver(receivers[i]) ) / totalShares,
                    newCtx
                );
            }
        }
    }

}
