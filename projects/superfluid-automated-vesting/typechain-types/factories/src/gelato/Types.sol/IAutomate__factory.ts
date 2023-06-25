/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IAutomate,
  IAutomateInterface,
} from "../../../../src/gelato/Types.sol/IAutomate";

const _abi = [
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "taskId",
        type: "bytes32",
      },
    ],
    name: "cancelTask",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "execAddress",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "execDataOrSelector",
        type: "bytes",
      },
      {
        components: [
          {
            internalType: "enum Module[]",
            name: "modules",
            type: "uint8[]",
          },
          {
            internalType: "bytes[]",
            name: "args",
            type: "bytes[]",
          },
        ],
        internalType: "struct ModuleData",
        name: "moduleData",
        type: "tuple",
      },
      {
        internalType: "address",
        name: "feeToken",
        type: "address",
      },
    ],
    name: "createTask",
    outputs: [
      {
        internalType: "bytes32",
        name: "taskId",
        type: "bytes32",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "gelato",
    outputs: [
      {
        internalType: "address payable",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getFeeDetails",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "taskTreasury",
    outputs: [
      {
        internalType: "contract ITaskTreasuryUpgradable",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

export class IAutomate__factory {
  static readonly abi = _abi;
  static createInterface(): IAutomateInterface {
    return new utils.Interface(_abi) as IAutomateInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IAutomate {
    return new Contract(address, _abi, signerOrProvider) as IAutomate;
  }
}
