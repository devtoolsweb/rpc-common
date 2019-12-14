import { IJsonRpcError } from './json_rpc'

export enum RpcErrorCodeEnum {
  InternalError = -32603,
  InvalidParams = -32602,
  InvalidRequest = -32600,
  MethodNotFound = -32601,
  ParseError = -32700,
  Timeout = -32001,
  Unauthorized = -32002
}

export interface IRpcError extends IJsonRpcError {}

export interface IRpcErrorProps {
  code: number
  data?: any
  message: string
}

export class RpcError implements IRpcError {
  readonly code: number
  readonly data?: any
  readonly message: string

  constructor (p: IRpcErrorProps) {
    this.code = p.code
    this.message = p.message
    p.data && (this.data = p.data)
  }
}
