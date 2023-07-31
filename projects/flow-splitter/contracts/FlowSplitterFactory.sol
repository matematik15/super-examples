// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.18;

import { ISuperfluid, ISuperToken } from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol";
import {FlowSplitter} from "./FlowSplitter.sol";

contract FlowSplitterFactory {

    /// @notice mapping of splitter owner (i.e. the msg.sender on the call) to his deployed splitters
    mapping(address => FlowSplitter[]) public ownerToSplitters;


    /// @notice Creates new flow splitter contract.
    /// @param _acceptedSuperToken Super Token that the deployed FlowSplitter will accept streams of
    /// @param _receivers an array containg all the receivers that the flow splitter will stream to
    /// @param _flows an array containg all the flow proportions that receivers will get. Must be the same length as the receivers array. The receiver with index i in the receivers array has the portion defined at the same index i in the flows array.
    /// @param _host Superfluid host.
    function createNewSplitter(
        address[] memory _receivers,
        int96[] memory _flows,
        ISuperToken _acceptedSuperToken,
        ISuperfluid _host
    ) external {
        FlowSplitter newSplitter = new FlowSplitter(
            _receivers,
            _flows,
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