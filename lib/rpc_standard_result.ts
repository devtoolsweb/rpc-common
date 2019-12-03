import { IRpcResult, IRpcResultParams, RpcResult } from './rpc_result'

export interface IRpcStandardResult<T> extends IRpcResult {
  readonly value: T
}

export interface IRpcStandardResultParams<T> extends IRpcResultParams {
  value: T
}

export class RpcStandardResult<T> extends RpcResult
  implements IRpcStandardResult<T> {
  readonly value: T

  constructor (p: IRpcStandardResultParams<T>) {
    super(p)
    this.value = p.value
  }
}

export interface IRpcStandardListResult<T> extends IRpcResult {
  readonly items: T[]
}

export interface IRpcStandardListResultParams<T> extends IRpcResultParams {
  items: Iterable<T>
}

export class RpcStandardListResult<T> extends RpcResult
  implements IRpcStandardListResult<T> {
  readonly items = new Array<T>()

  constructor (p: IRpcStandardListResultParams<T>) {
    super(p)
    for (const item of p.items) {
      this.items.push(item)
    }
  }
}

export interface IRpcDateResult extends IRpcStandardResult<Date | null> {}

export class RpcDateResult extends RpcStandardResult<Date | null>
  implements IRpcStandardResult<Date | null> {
  constructor (p: IRpcStandardResultParams<Date | null>) {
    super({ ...p, value: p.value ? new Date(p.value) : null })
  }
}

export interface IRpcNumericResult extends IRpcStandardResult<number> {}

export class RpcNumericResult extends RpcStandardResult<number>
  implements IRpcStandardResult<number> {}
