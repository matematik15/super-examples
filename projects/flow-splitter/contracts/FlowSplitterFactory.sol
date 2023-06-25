// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.18;

import { ISuperfluid, ISuperToken } from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol";
import {FlowSplitter} from "./FlowSplitter.sol";

contract FlowSplitterFactory {

    /// @notice mapping of splitter owner (i.e. the msg.sender on the call) to his deployed splitters
    mapping(address => FlowSplitter[]) public ownerToSplitters;

    /// @notice Creates new flow splitter contract.
    /// @param _mainReceiver Receiver of the flow majority.
    /// @param _sideReceiver Receiver of the flow minority.
    /// @param _sideReceiverPortion number out of 1000 representing portion of inflows to be received by the sideReceiver. Ex: 300 would represent 30% 
    /// @param _acceptedSuperToken Super Token that the deployed FlowSplitter will accept streams of
    /// @param _host Superfluid host.
    function createNewSplitter(
        address _mainReceiver,
        address _sideReceiver,
        int96 _sideReceiverPortion,
        ISuperToken _acceptedSuperToken,
        ISuperfluid _host
    ) external {
        FlowSplitter newSplitter = new FlowSplitter(
            _mainReceiver,
            _sideReceiver,
            _sideReceiverPortion,
            _acceptedSuperToken,
            _host
        );

        ownerToSplitters[msg.sender].push(newSplitter);
    }

    /// @param owner address that has deployed some FlowSplitter(s)
    /// @return splitters an array of FlowSplitters deployed and owned by the owner
    function getSplittersByOwner(address owner) external view returns (FlowSplitter[] memory splitters) {
        return ownerToSplitters[owner];
    }
}