import { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch'

export async function createContext(
    opts:
        | {
              type: 'rsc'
          }
        | (FetchCreateContextFnOptions & {
              type: 'api'
          })
) {
    if (opts.type === 'rsc') {
        return {
            type: opts.type
        }
    }
    return {
        type: opts.type,
        req: opts.req,
        resHeaders: opts.resHeaders
    }
}
