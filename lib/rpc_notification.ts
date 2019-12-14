import { IJsonRpcNotification, JsonRpcRequestParams } from './json_rpc'
import { IRpcMessage, IRpcMessageProps, RpcMessage } from './rpc_message'

export interface IRpcNotification extends IRpcMessage, IJsonRpcNotification {}

export interface IRpcNotificationProps extends IRpcMessageProps {
  apiKey?: string
  method: string
  params?: JsonRpcRequestParams
}

export class RpcNotification extends RpcMessage implements IRpcNotification {
  readonly apiKey?: string
  readonly method: string
  readonly params?: JsonRpcRequestParams

  constructor (p: IRpcNotificationProps) {
    super(p)
    this.method = p.method
    p.apiKey && (this.apiKey = p.apiKey)
    p.params && (this.params = p.params)
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

  static makePropsFromJson (json: any): IRpcNotificationProps {
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
