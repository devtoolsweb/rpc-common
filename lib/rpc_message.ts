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
export interface IRpcMessageOpts {
  id?: JsonRpcId
  ttl?: number
}

export class RpcMessage implements IRpcMessage {
  static readonly standardTtl = 10000

  private static lastId = 1

  readonly id?: JsonRpcId
  readonly ttl: number

  constructor (p: IRpcMessageOpts = {}) {
    if (p.id) {
      this.id = p.id === 'auto' ? RpcMessage.lastId++ : p.id
    }
    const ttl = p.ttl || 0
    this.ttl = ttl > 0 ? ttl : RpcMessage.standardTtl
  }

  get jsonrpc () {
    return JsonRpcVersion
  }

  toJSON (): any {
    const { id, jsonrpc, ttl } = this
    return {
      jsonrpc,
      id,
      ...(ttl === RpcMessage.standardTtl ? {} : { params: { ttl } })
    }
  }

  static makePropsFromJson (json: any): IRpcMessageOpts {
    this.validateJson(json)
    const ttl = json.params?.ttl
    return {
      ...(json.id ? { id: json.id } : {}),
      ...(ttl ? { ttl } : {})
    }
  }

  protected static validateJson (json: any) {
    if (json.jsonrpc !== JsonRpcVersion) {
      throw new Error('JSON-RPC message version mismatch')
    }
  }
}
