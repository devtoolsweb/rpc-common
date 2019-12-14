import { IJsonRpcNotification, JsonRpcRequestParams } from './json_rpc'
import { IRpcMessage, IRpcMessageProps, RpcMessage } from './rpc_message'

export interface IRpcNotification extends IRpcMessage, IJsonRpcNotification {}

export interface IRpcNotificationProps extends IRpcMessageProps {
  method: string
  params?: JsonRpcRequestParams
}

export class RpcNotification extends RpcMessage implements IRpcNotification {
  readonly method: string
  readonly params?: JsonRpcRequestParams

  constructor (p: IRpcNotificationProps) {
    super(p)
    this.method = p.method
    p.params && (this.params = p.params)
  }
}
