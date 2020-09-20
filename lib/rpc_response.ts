import {
  IJsonRpcError,
  IJsonRpcMessage,
  IJsonRpcResponse,
  JsonRpcId
} from './json_rpc'
import { IRpcMessageArgs, RpcMessage } from './rpc_message'

export interface IRpcResponse extends IJsonRpcMessage, IJsonRpcResponse {}

export interface IRpcResponseArgs extends IRpcMessageArgs {
  error?: IJsonRpcError
  id: JsonRpcId
  result?: any
}

export class RpcResponse extends RpcMessage implements IRpcResponse {
  readonly error?: IJsonRpcError
  readonly id!: JsonRpcId
  readonly result?: any

  constructor(args: IRpcResponseArgs) {
    super(args)
    if (!!args.error === !!args.result) {
      throw new Error(
        'The RPC response must contain either an error or result data'
      )
    }
    if (args.error) {
      this.error = args.error
    } else if (args.result) {
      this.result = args.result
    }
  }

  toJSON() {
    const { error, result } = this
    return {
      ...super.toJSON(),
      ...(error ? { error } : {}),
      ...(result ? { result } : {})
    }
  }

  static makePropsFromJson(json: any): IRpcResponseArgs {
    const props = super.makePropsFromJson(json) as IRpcResponseArgs
    if (json.error) {
      props.error = json.error
    }
    if (json.result) {
      props.result = json.result
    }
    return props
  }
}
