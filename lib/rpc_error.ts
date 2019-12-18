import { IJsonRpcError } from './json_rpc'

export enum RpcErrorCodeEnum {
  AuthenticationRequired = -32002,
  InternalError = -32603,
  InvalidParams = -32602,
  InvalidRequest = -32600,
  MethodNotFound = -32601,
  ParseError = -32700,
  Timeout = -32001,
  Unauthorized = -32003
}

export interface IRpcError extends IJsonRpcError {}

export interface IRpcErrorOpts {
  code: number
  data?: any
  message: string
}

export class RpcError implements IRpcError {
  readonly code: number
  readonly data?: any
  readonly message: string

  constructor (p: IRpcErrorOpts) {
    this.code = p.code
    this.message = p.message
    p.data && (this.data = p.data)
  }
}
