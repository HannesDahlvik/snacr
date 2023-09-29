import { DeviceType } from './trpc'
import { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch'

export async function createContext(
    opts:
        | {
              type: 'rsc'
              device: DeviceType
          }
        | (FetchCreateContextFnOptions & {
              type: 'api'
          })
) {
    if (opts.type === 'rsc') {
        return {
            type: opts.type,
            device: opts.device
        }
    }
    return {
        type: opts.type,
        req: opts.req,
        resHeaders: opts.resHeaders
    }
}
