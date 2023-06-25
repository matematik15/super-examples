/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../common";

export interface VestingAutomationInterface extends utils.Interface {
  functions: {
    "addFundsOwner(address)": FunctionFragment;
    "automate()": FunctionFragment;
    "createVestingTask(address,address)": FunctionFragment;
    "dedicatedMsgSender()": FunctionFragment;
    "executeStartVesting(address,address)": FunctionFragment;
    "executeStopVesting(address,address)": FunctionFragment;
    "fundsOwner()": FunctionFragment;
    "fundsOwners(address)": FunctionFragment;
    "primaryFundsOwner()": FunctionFragment;
    "removeFundsOwner(address)": FunctionFragment;
    "taskTreasury()": FunctionFragment;
    "vestingEndTasks(bytes32)": FunctionFragment;
    "vestingScheduler()": FunctionFragment;
    "vestingStartTasks(bytes32)": FunctionFragment;
    "withdraw()": FunctionFragment;
    "withdrawFunds(uint256,address)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "addFundsOwner"
      | "automate"
      | "createVestingTask"
      | "dedicatedMsgSender"
      | "executeStartVesting"
      | "executeStopVesting"
      | "fundsOwner"
      | "fundsOwners"
      | "primaryFundsOwner"
      | "removeFundsOwner"
      | "taskTreasury"
      | "vestingEndTasks"
      | "vestingScheduler"
      | "vestingStartTasks"
      | "withdraw"
      | "withdrawFunds"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "addFundsOwner",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: "automate", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "createVestingTask",
    values: [PromiseOrValue<string>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "dedicatedMsgSender",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "executeStartVesting",
    values: [PromiseOrValue<string>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "executeStopVesting",
    values: [PromiseOrValue<string>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "fundsOwner",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "fundsOwners",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "primaryFundsOwner",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "removeFundsOwner",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "taskTreasury",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "vestingEndTasks",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "vestingScheduler",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "vestingStartTasks",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(functionFragment: "withdraw", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "withdrawFunds",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>]
  ): string;

  decodeFunctionResult(
    functionFragment: "addFundsOwner",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "automate", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "createVestingTask",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "dedicatedMsgSender",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "executeStartVesting",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "executeStopVesting",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "fundsOwner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "fundsOwners",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "primaryFundsOwner",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "removeFundsOwner",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "taskTreasury",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "vestingEndTasks",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "vestingScheduler",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "vestingStartTasks",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "withdrawFunds",
    data: BytesLike
  ): Result;

  events: {};
}

export interface VestingAutomation extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: VestingAutomationInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    addFundsOwner(
      newFundsOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    automate(overrides?: CallOverrides): Promise<[string]>;

    createVestingTask(
      sender: PromiseOrValue<string>,
      receiver: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    dedicatedMsgSender(overrides?: CallOverrides): Promise<[string]>;

    executeStartVesting(
      sender: PromiseOrValue<string>,
      receiver: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    executeStopVesting(
      sender: PromiseOrValue<string>,
      receiver: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    fundsOwner(overrides?: CallOverrides): Promise<[string]>;

    fundsOwners(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    primaryFundsOwner(overrides?: CallOverrides): Promise<[string]>;

    removeFundsOwner(
      removedFundsOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    taskTreasury(overrides?: CallOverrides): Promise<[string]>;

    vestingEndTasks(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<
      [string, string, string, BigNumber, BigNumber] & {
        token: string;
        sender: string;
        receiver: string;
        endDate: BigNumber;
        timeScheduled: BigNumber;
      }
    >;

    vestingScheduler(overrides?: CallOverrides): Promise<[string]>;

    vestingStartTasks(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<
      [string, string, string, BigNumber, BigNumber] & {
        token: string;
        sender: string;
        receiver: string;
        startDate: BigNumber;
        timeScheduled: BigNumber;
      }
    >;

    withdraw(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    withdrawFunds(
      _amount: PromiseOrValue<BigNumberish>,
      _token: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  addFundsOwner(
    newFundsOwner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  automate(overrides?: CallOverrides): Promise<string>;

  createVestingTask(
    sender: PromiseOrValue<string>,
    receiver: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  dedicatedMsgSender(overrides?: CallOverrides): Promise<string>;

  executeStartVesting(
    sender: PromiseOrValue<string>,
    receiver: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  executeStopVesting(
    sender: PromiseOrValue<string>,
    receiver: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  fundsOwner(overrides?: CallOverrides): Promise<string>;

  fundsOwners(
    arg0: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  primaryFundsOwner(overrides?: CallOverrides): Promise<string>;

  removeFundsOwner(
    removedFundsOwner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  taskTreasury(overrides?: CallOverrides): Promise<string>;

  vestingEndTasks(
    arg0: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<
    [string, string, string, BigNumber, BigNumber] & {
      token: string;
      sender: string;
      receiver: string;
      endDate: BigNumber;
      timeScheduled: BigNumber;
    }
  >;

  vestingScheduler(overrides?: CallOverrides): Promise<string>;

  vestingStartTasks(
    arg0: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<
    [string, string, string, BigNumber, BigNumber] & {
      token: string;
      sender: string;
      receiver: string;
      startDate: BigNumber;
      timeScheduled: BigNumber;
    }
  >;

  withdraw(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  withdrawFunds(
    _amount: PromiseOrValue<BigNumberish>,
    _token: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    addFundsOwner(
      newFundsOwner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    automate(overrides?: CallOverrides): Promise<string>;

    createVestingTask(
      sender: PromiseOrValue<string>,
      receiver: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[string, string] & { startTaskId: string; endTaskId: string }>;

    dedicatedMsgSender(overrides?: CallOverrides): Promise<string>;

    executeStartVesting(
      sender: PromiseOrValue<string>,
      receiver: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    executeStopVesting(
      sender: PromiseOrValue<string>,
      receiver: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    fundsOwner(overrides?: CallOverrides): Promise<string>;

    fundsOwners(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    primaryFundsOwner(overrides?: CallOverrides): Promise<string>;

    removeFundsOwner(
      removedFundsOwner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    taskTreasury(overrides?: CallOverrides): Promise<string>;

    vestingEndTasks(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<
      [string, string, string, BigNumber, BigNumber] & {
        token: string;
        sender: string;
        receiver: string;
        endDate: BigNumber;
        timeScheduled: BigNumber;
      }
    >;

    vestingScheduler(overrides?: CallOverrides): Promise<string>;

    vestingStartTasks(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<
      [string, string, string, BigNumber, BigNumber] & {
        token: string;
        sender: string;
        receiver: string;
        startDate: BigNumber;
        timeScheduled: BigNumber;
      }
    >;

    withdraw(overrides?: CallOverrides): Promise<boolean>;

    withdrawFunds(
      _amount: PromiseOrValue<BigNumberish>,
      _token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {};

  estimateGas: {
    addFundsOwner(
      newFundsOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    automate(overrides?: CallOverrides): Promise<BigNumber>;

    createVestingTask(
      sender: PromiseOrValue<string>,
      receiver: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    dedicatedMsgSender(overrides?: CallOverrides): Promise<BigNumber>;

    executeStartVesting(
      sender: PromiseOrValue<string>,
      receiver: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    executeStopVesting(
      sender: PromiseOrValue<string>,
      receiver: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    fundsOwner(overrides?: CallOverrides): Promise<BigNumber>;

    fundsOwners(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    primaryFundsOwner(overrides?: CallOverrides): Promise<BigNumber>;

    removeFundsOwner(
      removedFundsOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    taskTreasury(overrides?: CallOverrides): Promise<BigNumber>;

    vestingEndTasks(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    vestingScheduler(overrides?: CallOverrides): Promise<BigNumber>;

    vestingStartTasks(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    withdraw(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    withdrawFunds(
      _amount: PromiseOrValue<BigNumberish>,
      _token: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    addFundsOwner(
      newFundsOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    automate(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    createVestingTask(
      sender: PromiseOrValue<string>,
      receiver: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    dedicatedMsgSender(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    executeStartVesting(
      sender: PromiseOrValue<string>,
      receiver: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    executeStopVesting(
      sender: PromiseOrValue<string>,
      receiver: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    fundsOwner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    fundsOwners(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    primaryFundsOwner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    removeFundsOwner(
      removedFundsOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    taskTreasury(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    vestingEndTasks(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    vestingScheduler(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    vestingStartTasks(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    withdraw(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    withdrawFunds(
      _amount: PromiseOrValue<BigNumberish>,
      _token: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
