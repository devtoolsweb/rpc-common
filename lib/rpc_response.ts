import {
  IJsonRpcError,
  IJsonRpcMessage,
  IJsonRpcResponse,
  JsonRpcId
} from './json_rpc'
import { IRpcMessageProps, RpcMessage } from './rpc_message'

export interface IRpcResponse extends IJsonRpcMessage, IJsonRpcResponse {}

export interface IRpcResponseProps extends IRpcMessageProps {
  error?: IJsonRpcError
  id: JsonRpcId
  result?: any
}

export class RpcResponse extends RpcMessage implements IRpcResponse {
  readonly error?: IJsonRpcError
  readonly id!: JsonRpcId
  readonly result?: any

  constructor (p: IRpcResponseProps) {
    super(p)
    if (!!p.error === !!p.result) {
      throw new Error(
        'The RPC response must contain either an error or result data'
      )
    }
    if (p.error) {
      this.error = p.error
    } else if (p.result) {
      this.result = p.result
    }
  }

  toJSON (): any {
    const { error, result } = this
    return {
      ...super.toJSON(),
      ...(error ? { error } : {}),
      ...(result ? { result } : {})
    }
  }

  static makePropsFromJson (json: any): IRpcResponseProps {
    const props = super.makePropsFromJson(json) as IRpcResponseProps
    if (json.error) {
      props.error = json.error
    }
    if (json.result) {
      props.result = json.result
    }
    return props
  }
}

export interface IRpcResult<T> extends IRpcResponse {
  readonly result: T
}

export interface IRpcStandardResponseProps<T> extends IRpcResponseProps {
  result: T
}

export class RpcResult<T> extends RpcResponse implements IRpcResult<T> {
  readonly result: T

  constructor (p: IRpcStandardResponseProps<T>) {
    super(p)
    this.result = p.result
  }
}

// export interface IRpcStandardListResponse<T> extends IRpcResponse {
//   readonly items: T[]
// }

// export interface IRpcStandardListResponseProps<T> extends IRpcResponseProps {
//   items: Iterable<T>
// }

// export class RpcStandardListResponse<T> extends RpcResponse
// implements IRpcStandardListResponse<T> {
//   readonly items = new Array<T>()

//   constructor (p: IRpcStandardListResponseProps<T>) {
//     super(p)
//     for (const item of p.items) {
//       this.items.push(item)
//     }
//   }
// }

// export interface IRpcDateResponse extends IRpcStandardResponse<Date | null> {}

// export class RpcDateResponse extends RpcStandardResponse<Date | null>
//   implements IRpcStandardResponse<Date | null> {
//     constructor (p: IRpcStandardResponseProps<Date | null>) {
//       super({ ...p, value: p.value ? new Date(p.value) : null })
//     }
//   }

// export interface IRpcNumericResponse extends IRpcStandardResponse<number> {}

// export class RpcNumericResponse extends RpcStandardResponse<number>
//   implements IRpcStandardResponse<number> {}
