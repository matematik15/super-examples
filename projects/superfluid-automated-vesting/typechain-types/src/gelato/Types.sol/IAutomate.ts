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
} from "../../../common";

export type ModuleDataStruct = {
  modules: PromiseOrValue<BigNumberish>[];
  args: PromiseOrValue<BytesLike>[];
};

export type ModuleDataStructOutput = [number[], string[]] & {
  modules: number[];
  args: string[];
};

export interface IAutomateInterface extends utils.Interface {
  functions: {
    "cancelTask(bytes32)": FunctionFragment;
    "createTask(address,bytes,(uint8[],bytes[]),address)": FunctionFragment;
    "gelato()": FunctionFragment;
    "getFeeDetails()": FunctionFragment;
    "taskTreasury()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "cancelTask"
      | "createTask"
      | "gelato"
      | "getFeeDetails"
      | "taskTreasury"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "cancelTask",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "createTask",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<BytesLike>,
      ModuleDataStruct,
      PromiseOrValue<string>
    ]
  ): string;
  encodeFunctionData(functionFragment: "gelato", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "getFeeDetails",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "taskTreasury",
    values?: undefined
  ): string;

  decodeFunctionResult(functionFragment: "cancelTask", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "createTask", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "gelato", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getFeeDetails",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "taskTreasury",
    data: BytesLike
  ): Result;

  events: {};
}

export interface IAutomate extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IAutomateInterface;

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
    cancelTask(
      taskId: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    createTask(
      execAddress: PromiseOrValue<string>,
      execDataOrSelector: PromiseOrValue<BytesLike>,
      moduleData: ModuleDataStruct,
      feeToken: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    gelato(overrides?: CallOverrides): Promise<[string]>;

    getFeeDetails(overrides?: CallOverrides): Promise<[BigNumber, string]>;

    taskTreasury(overrides?: CallOverrides): Promise<[string]>;
  };

  cancelTask(
    taskId: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  createTask(
    execAddress: PromiseOrValue<string>,
    execDataOrSelector: PromiseOrValue<BytesLike>,
    moduleData: ModuleDataStruct,
    feeToken: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  gelato(overrides?: CallOverrides): Promise<string>;

  getFeeDetails(overrides?: CallOverrides): Promise<[BigNumber, string]>;

  taskTreasury(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    cancelTask(
      taskId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;

    createTask(
      execAddress: PromiseOrValue<string>,
      execDataOrSelector: PromiseOrValue<BytesLike>,
      moduleData: ModuleDataStruct,
      feeToken: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<string>;

    gelato(overrides?: CallOverrides): Promise<string>;

    getFeeDetails(overrides?: CallOverrides): Promise<[BigNumber, string]>;

    taskTreasury(overrides?: CallOverrides): Promise<string>;
  };

  filters: {};

  estimateGas: {
    cancelTask(
      taskId: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    createTask(
      execAddress: PromiseOrValue<string>,
      execDataOrSelector: PromiseOrValue<BytesLike>,
      moduleData: ModuleDataStruct,
      feeToken: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    gelato(overrides?: CallOverrides): Promise<BigNumber>;

    getFeeDetails(overrides?: CallOverrides): Promise<BigNumber>;

    taskTreasury(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    cancelTask(
      taskId: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    createTask(
      execAddress: PromiseOrValue<string>,
      execDataOrSelector: PromiseOrValue<BytesLike>,
      moduleData: ModuleDataStruct,
      feeToken: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    gelato(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getFeeDetails(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    taskTreasury(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
