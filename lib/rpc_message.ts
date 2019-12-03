import {
  ISocketMessage,
  ISocketMessageParams,
  SocketMessage
} from './socket_message'
import { IRpcResult } from './rpc_result'

export interface IRpcCallbackArgs {
  readonly verb: string
  readonly result?: IRpcResult
}

export type RpcCallback = (p: IRpcCallbackArgs) => void

export interface IRpcMessageArgs {
  readonly onResponse?: RpcCallback
  readonly onTimeout?: RpcCallback
}

export type RpcMessageArgs = IRpcMessageArgs | Record<string, any>

export interface IRpcMessage extends ISocketMessage {
  readonly namespace: string
  readonly verb: string
  readonly args: RpcMessageArgs
}

export interface IRpcMessageParams extends ISocketMessageParams {
  namespace: string
  verb: string
  args?: RpcMessageArgs
}

export class RpcMessage extends SocketMessage implements IRpcMessage {
  readonly namespace: string
  readonly verb: string
  readonly args: RpcMessageArgs

  constructor (p: IRpcMessageParams) {
    super(p)
    this.namespace = p.namespace
    this.verb = p.verb
    this.args = p.args || {}
  }
}
