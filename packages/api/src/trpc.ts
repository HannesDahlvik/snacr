import { cookies } from 'next/headers'
import { NextRequest } from 'next/server'

import { auth } from './auth/lucia'
import { createContext } from './context'
import { TRPCError, initTRPC } from '@trpc/server'
import superjson from 'superjson'

const t = initTRPC.context<typeof createContext>().create({
    transformer: superjson
})

export const router = t.router
export const procedure = t.procedure
export const authedProcedure = t.procedure.use(async ({ ctx, next }) => {
    const authRequest = auth.handleRequest({
        request: ctx.req as NextRequest,
        cookies
    })
    const session = await authRequest.validate()
    if (!session)
        throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: 'Not authenticated'
        })

    return next({
        ctx: {
            user: session?.user,
            session
        }
    })
})
