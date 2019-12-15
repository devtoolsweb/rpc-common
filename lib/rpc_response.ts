import {
  IJsonRpcError,
  IJsonRpcMessage,
  IJsonRpcResponse,
  JsonRpcId
} from './json_rpc'
import { IRpcMessageProps, RpcMessage } from './rpc_message'

export interface IRpcResponse extends IJsonRpcMessage, IJsonRpcResponse {}

export interface IRpcResponseProps extends IRpcMessageProps {
  error?: IJsonRpcError
  id: JsonRpcId
  result?: any
}

export class RpcResponse extends RpcMessage implements IRpcResponse {
  readonly error?: IJsonRpcError
  readonly id!: JsonRpcId
  readonly result?: any

  constructor (p: IRpcResponseProps) {
    super(p)
    if (!!p.error === !!p.result) {
      throw new Error(
        'The RPC response must contain either an error or result data'
      )
    }
    if (p.error) {
      this.error = p.error
    } else if (p.result) {
      this.result = p.result
    }
  }

  toJSON (): any {
    const { error, result } = this
    return {
      ...super.toJSON(),
      ...(error ? { error } : {}),
      ...(result ? { result } : {})
    }
  }

  static makePropsFromJson (json: any): IRpcResponseProps {
    const props = super.makePropsFromJson(json) as IRpcResponseProps
    if (json.error) {
      props.error = json.error
    }
    if (json.result) {
      props.result = json.result
    }
    return props
  }
}
