import { TRPCError } from '@trpc/server'
import { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch'
import { z } from 'zod'

const deviceTypes = z.enum(['web', 'mobile'])
type DeviceType = z.infer<typeof deviceTypes>

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
            type: opts.type,
            device: 'web' as DeviceType
        }
    }

    const device = opts.req?.headers.get('device')
    const checkDevice = deviceTypes.safeParse(device)

    if (checkDevice.success) {
        return {
            type: opts.type,
            device: device as DeviceType,
            req: opts.req,
            resHeaders: opts.resHeaders
        }
    } else {
        throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'Invalid device'
        })
    }
}
