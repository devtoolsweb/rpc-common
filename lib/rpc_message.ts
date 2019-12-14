import { IJsonRpcMessage, JsonRpcId, JsonRpcVersion } from './json_rpc'

/**
 * Base RPC message
 */
export interface IRpcMessage extends IJsonRpcMessage {
  readonly id?: JsonRpcId
  readonly ttl: number
}

/**
 * Constructor properties for an RPC message
 */
export interface IRpcMessageProps {
  id?: JsonRpcId
  ttl?: number
}

export class RpcMessage implements IRpcMessage {
  private static lastId = 1
  private static standardTtl = 10000

  readonly id: JsonRpcId
  readonly ttl: number

  constructor (p: IRpcMessageProps = {}) {
    this.id = p.id || RpcMessage.lastId++
    this.ttl = p.ttl || RpcMessage.standardTtl
  }

  get jsonrpc () {
    return JsonRpcVersion
  }
}
