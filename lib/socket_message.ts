export interface ISocketMessageParams {
  id?: number
  ttl?: number
}

export interface ISocketMessage {
  readonly id: number
  readonly ttl?: number
}

export class SocketMessage implements ISocketMessage {
  readonly id: number
  readonly ttl: number

  private static lastId = 1
  private static standardTtl = 10000

  constructor (params: ISocketMessageParams | string) {
    const p =
      typeof params === 'string'
        ? (JSON.parse(params) as ISocketMessageParams)
        : params
    this.id = p.id || SocketMessage.lastId++
    this.ttl = p.ttl || SocketMessage.standardTtl
  }

  toString () {
    return JSON.stringify(this)
  }
}
