import { JsonRpcId } from './json_rpc'
import {
  IRpcNotification,
  IRpcNotificationProps,
  RpcNotification
} from './rpc_notification'

export interface IRpcRequest extends IRpcNotification {
  readonly id: JsonRpcId
}

export interface IRpcRequestProps extends IRpcNotificationProps {
  id: JsonRpcId
}

export class RpcRequest extends RpcNotification implements IRpcRequest {
  readonly id!: JsonRpcId

  constructor (p: IRpcRequestProps) {
    super(p)
  }

  protected static validateJson (json: any) {
    super.validateJson(json)
    if (!json.id) {
      throw new Error('JSON-RPC request must contain an id')
    }
  }
}
