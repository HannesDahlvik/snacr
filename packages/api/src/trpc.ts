import { cookies } from 'next/headers'
import { NextRequest } from 'next/server'

import { auth } from './auth/lucia'
import { createContext } from './context'
import { TRPCError, initTRPC } from '@trpc/server'
import { Session } from 'lucia'
import superjson from 'superjson'
import { z } from 'zod'

const t = initTRPC.context<typeof createContext>().create({
    transformer: superjson
})

const deviceTypes = z.enum(['web', 'mobile'])
type DeviceType = z.infer<typeof deviceTypes>

export const router = t.router
export const procedure = t.procedure.use(({ ctx, next }) => {
    if (ctx.type === 'rsc') {
        return next({
            ctx: {
                device: 'web' as DeviceType
            }
        })
    } else {
        const device = ctx.req?.headers.get('device')
        const checkDevice = deviceTypes.safeParse(device)

        if (checkDevice.success) {
            return next({
                ctx: {
                    device: device as DeviceType
                }
            })
        } else {
            throw new TRPCError({
                code: 'BAD_REQUEST',
                message: 'Invalid device'
            })
        }
    }
})
export const authedProcedure = procedure.use(async ({ ctx, next }) => {
    const authRequest = auth.handleRequest({
        request: ctx.req as NextRequest,
        cookies
    })

    let session: Session | null = null

    if (ctx.device === 'web') {
        session = await authRequest.validate()
    } else if (ctx.device === 'mobile') {
        session = await authRequest.validateBearerToken()
    }

    if (!session)
        throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: 'Not authenticated'
        })

    return next({
        ctx: {
            user: session.user,
            session
        }
    })
})
