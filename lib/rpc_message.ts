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

  readonly id?: JsonRpcId
  readonly ttl: number

  constructor (p: IRpcMessageProps = {}) {
    if (p.id) {
      this.id = p.id === 'auto' ? RpcMessage.lastId++ : p.id
    }
    this.ttl = p.ttl || RpcMessage.standardTtl
  }

  get jsonrpc () {
    return JsonRpcVersion
  }

  toJSON (): any {
    const { id, jsonrpc, ttl } = this
    return {
      jsonrpc,
      id,
      params: {
        ttl
      }
    }
  }

  static makePropsFromJson (json: any): IRpcMessageProps {
    this.validateJson(json)
    return {
      ...(json.id ? { id: json.id } : {}),
      ...(json.params.ttl ? { ttl: json.params.ttl } : {})
    }
  }

  protected static validateJson (json: any) {
    if (json.jsonrpc !== JsonRpcVersion) {
      throw new Error('JSON-RPC message version mismatch')
    }
  }
}
