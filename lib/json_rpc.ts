/**
 * JSON-RPC 2.0 interfaces
 */
export const JsonRpcVersion = '2.0'

export type JsonRpcRequestParams = Record<string, unknown> | unknown[]

export type JsonRpcId = 'auto' | number | string

export interface IJsonRpcMessage {
    readonly jsonrpc: string
}

export interface IJsonRpcNotification {
    readonly method: string
    readonly params?: JsonRpcRequestParams
}

export interface IJsonRpcRequest extends IJsonRpcNotification {
    readonly id: JsonRpcId
}

export interface IJsonRpcError {
    readonly code: number
    readonly data?: unknown
    readonly message: string
}

export interface IJsonRpcResponse {
    readonly error?: IJsonRpcError
    readonly id: JsonRpcId
    readonly result?: unknown
}
