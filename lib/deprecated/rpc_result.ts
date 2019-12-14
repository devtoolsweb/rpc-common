import {
  ISocketMessage,
  ISocketMessageParams,
  SocketMessage
} from './socket_message'

export enum RpcResultCode {
  AuthenticationRequired = -32300,
  InternalError = -32603,
  InvalidParams = -32602,
  InvalidRequest = -32600,
  MethodNotFound = -32601,
  OK = 0,
  ParseError = -32700
}

export type RpcResultData = Record<string, any>

export type RpcResultStatus = 'failed' | 'success' | 'timeout'

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
    this.status = p.status || 'success'
    p.comment && (this.comment = p.comment)
  }
}
