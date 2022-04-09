import { IJsonRpcNotification } from './json_rpc'
import { IRpcMessage, IRpcMessageArgs, RpcMessage } from './rpc_message'
import { JsonObject } from 'type-fest'
import { RpcUtils } from './rpc_utils'

export type RpcRequestParams = Record<string, unknown>

export interface IRpcRequest<T extends RpcRequestParams = RpcRequestParams>
    extends IRpcMessage,
    IJsonRpcNotification {
    readonly apiKey?: string
    readonly domain: string
    readonly method: string
    readonly params: T
    readonly verb: string
}

export interface IRpcRequestArgs<T extends RpcRequestParams = RpcRequestParams>
    extends IRpcMessageArgs {
    apiKey?: string
    method: string
    params?: T
}

export class RpcRequest<T extends RpcRequestParams = RpcRequestParams> extends RpcMessage
    implements IRpcRequest {

    readonly apiKey?: string

    readonly domain: string

    readonly method: string

    readonly params: T

    readonly verb: string

    constructor (args: IRpcRequestArgs<T>) {
        super(args)
        args.apiKey && (this.apiKey = args.apiKey)
        const [ domain,
            verb ] = RpcUtils.parseMethod(args.method)
        this.domain = domain
        this.method = args.method
        this.params = args.params || ({} as T)
        this.verb = verb
    }

    toJSON (): JsonObject {
        const { apiKey, method, params } = this
        const p: JsonObject = {}
        const json = {
            params: p,
            ...super.toJSON()
        }
        if (apiKey) {
            json.params.apiKey = apiKey
        }
        json.params = {
            ...json.params,
            ...params
        }
        return {
            ...json,
            method
        }
    }

    static makePropsFromJson (json: JsonObject): IRpcRequestArgs {
        return {
            ...super.makePropsFromJson(json),
            method: json.method as string,
            params: json.params as JsonObject
        }
    }

    protected static validateJson (json: JsonObject) {
        super.validateJson(json)
        if (typeof json.method !== 'string' || !json.method) {
            throw new Error('JSON-RPC method name must be an non-empty string')
        }
    }

}
