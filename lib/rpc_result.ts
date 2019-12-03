import {
  ISocketMessage,
  ISocketMessageParams,
  SocketMessage
} from './socket_message'

export type RpcResultData = Record<string, any>

export type RpcResultStatus = 'Failed' | 'OK' | 'Timeout'

export interface IRpcResult extends ISocketMessage {
  readonly comment?: string
  readonly status: RpcResultStatus
}

export interface IRpcResultParams extends ISocketMessageParams {
  comment?: string
  status?: RpcResultStatus
}

export class RpcResult extends SocketMessage implements IRpcResult {
  readonly comment?: string
  readonly status: RpcResultStatus

  constructor (p: IRpcResultParams) {
    super(p)
    this.status = p.status || 'OK'
    p.comment && (this.comment = p.comment)
  }
}
