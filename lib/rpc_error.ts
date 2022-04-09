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

export interface IRpcErrorArgs {
    code: number
    data?: unknown
    message: string
}

export class RpcError implements IRpcError {

    readonly code: number

    readonly data?: unknown

    readonly message: string

    constructor (args: IRpcErrorArgs) {
        this.code = args.code
        this.message = args.message
        args.data && (this.data = args.data)
    }

}
