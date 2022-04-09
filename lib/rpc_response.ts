import { IJsonRpcError, IJsonRpcMessage, IJsonRpcResponse, JsonRpcId } from './json_rpc'
import { IRpcMessageArgs, RpcMessage } from './rpc_message'
import { JsonObject, JsonValue } from 'type-fest'

export interface IRpcResponse extends IJsonRpcMessage, IJsonRpcResponse {}

export interface IRpcResponseArgs extends IRpcMessageArgs {
    error?: IJsonRpcError
    id: JsonRpcId
    result?: JsonValue
}

export class RpcResponse extends RpcMessage implements IRpcResponse {

    readonly error?: IJsonRpcError

    readonly id!: JsonRpcId

    readonly result?: JsonValue

    constructor (args: IRpcResponseArgs) {
        super(args)
        if (!!args.error === !!args.result) {
            throw new Error('The RPC response must contain either an error or result data')
        }
        if (args.error) {
            this.error = args.error
        }
        else if (args.result) {
            this.result = args.result
        }
    }

    toJSON (): JsonObject {
        const { error, result } = this
        return {
            ...super.toJSON(),
            ...(error ? { error: (error as unknown) as JsonObject } : {}),
            ...(result ? { result } : {})
        }
    }

    static makePropsFromJson (json: JsonObject): IRpcResponseArgs {
        const props = super.makePropsFromJson(json) as IRpcResponseArgs
        if (json.error) {
            props.error = (json.error as unknown) as IJsonRpcError
        }
        if (json.result) {
            props.result = json.result as JsonObject
        }
        return props
    }

}
