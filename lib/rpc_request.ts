import { IJsonRpcNotification } from './json_rpc'
import { IRpcMessage, IRpcMessageProps, RpcMessage } from './rpc_message'
import { RpcUtils } from './rpc_utils'

export type RpcRequestParams = Record<string, any>

export interface IRpcRequest<T extends RpcRequestParams = {}>
  extends IRpcMessage,
    IJsonRpcNotification {
  readonly apiKey?: string
  readonly domain: string
  readonly method: string
  readonly params: T
  readonly verb: string
}

export interface IRpcRequestProps<T extends RpcRequestParams = {}>
  extends IRpcMessageProps {
  apiKey?: string
  method: string
  params?: T
}

export class RpcRequest<T extends RpcRequestParams = {}> extends RpcMessage
  implements IRpcRequest {
  readonly apiKey?: string
  readonly domain: string
  readonly method: string
  readonly params: T
  readonly verb: string

  constructor (p: IRpcRequestProps<T>) {
    super(p)
    p.apiKey && (this.apiKey = p.apiKey)
    const [domain, verb] = RpcUtils.parseMethod(p.method)
    this.domain = domain
    this.method = p.method
    this.params = p.params || ({} as T)
    this.verb = verb
  }

  toJSON (): any {
    const { apiKey, method, params } = this
    const json = super.toJSON()
    if (apiKey) {
      json.params.apiKey = apiKey
    }
    json.params = { ...json.params, ...params }
    return { ...json, method }
  }

  static makePropsFromJson (json: any): IRpcRequestProps {
    return {
      ...super.makePropsFromJson(json),
      method: json.method,
      params: json.params
    }
  }

  protected static validateJson (json: any) {
    super.validateJson(json)
    if (typeof json.method !== 'string' || !json.method) {
      throw new Error('JSON-RPC method name must be an non-empty string')
    }
  }
}
