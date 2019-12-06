import {
  ISocketMessage,
  ISocketMessageParams,
  SocketMessage
} from './socket_message'

export interface IRpcMessage extends ISocketMessage {
  readonly args: IRpcMessageArgs
  readonly domain: string
  readonly verb: string
}

export type IRpcMessageArgs = Record<string | symbol, any>

export interface IRpcMessageParams extends ISocketMessageParams {
  args?: IRpcMessageArgs
  domain: string
  verb: string
}

export class RpcMessage extends SocketMessage implements IRpcMessage {
  readonly args: IRpcMessageArgs
  readonly domain: string
  readonly verb: string

  constructor (p: IRpcMessageParams) {
    super(p)
    this.args = p.args || {}
    this.domain = p.domain
    this.verb = p.verb
  }
}
