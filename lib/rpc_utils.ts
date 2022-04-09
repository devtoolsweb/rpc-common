const rpcMethodQNSeparators = [ '@', '::', '\\/', '\\\\', '\\.' ]
const rpcMethodQNRegexp = new RegExp(
    `^([a-z_]\\w*)(?:(?:${rpcMethodQNSeparators.join('|')})([a-z_]\\w+))?$`,
    'i'
)
const rpcMethodQNForm = `[domain<${rpcMethodQNSeparators.join('|')}>]verb'`

class RpcUtilsCtor {

    parseMethod (method: string) {
        const m = method.match(rpcMethodQNRegexp)
        if (!m) {
            throw new Error(`RPC method name does not match pattern '${rpcMethodQNForm}'`)
        }
        return m[2] ? [ m[1], m[2] ] : [ '', m[1] ]
    }

}

export const RpcUtils = new RpcUtilsCtor()
