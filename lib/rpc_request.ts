import { JsonRpcId } from './json_rpc'
import {
  IRpcNotification,
  IRpcNotificationProps,
  RpcNotification
} from './rpc_notification'

export interface IRpcRequest extends IRpcNotification {
  readonly id: JsonRpcId
}

export interface IRpcRequestProps extends IRpcNotificationProps {}

export class RpcRequest extends RpcNotification implements IRpcRequest {
  constructor (p: IRpcRequestProps) {
    super(p)
  }
}
