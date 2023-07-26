import { cookies } from 'next/headers'
import { NextRequest } from 'next/server'

import { auth } from '../auth/lucia'
import { authedProcedure, procedure, router } from '../trpc'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'

export const authRouter = router({
    login: procedure
        .input(
            z.object({
                email: z.string().email(),
                password: z.string().min(6)
            })
        )
        .mutation(async ({ ctx, input }) => {
            const key = await auth
                .useKey('email', input.email.toLowerCase(), input.password)
                .catch((err) => {
                    throw new TRPCError({
                        code: 'INTERNAL_SERVER_ERROR',
                        message: err.message
                    })
                })
            const session = await auth
                .createSession({
                    userId: key.userId,
                    attributes: {}
                })
                .catch((err) => {
                    throw new TRPCError({
                        code: 'INTERNAL_SERVER_ERROR',
                        message: err.message
                    })
                })
            const authRequest = auth.handleRequest({
                request: ctx.req as NextRequest,
                cookies
            })
            authRequest.setSession(session)

            return session.user
        }),
    logout: authedProcedure.mutation(async ({ ctx }) => {
        const authRequest = auth.handleRequest({
            request: ctx.req as NextRequest,
            cookies
        })
        await auth.invalidateSession(ctx.session.sessionId)
        authRequest.setSession(null)

        return null
    }),
    signup: procedure
        .input(
            z.object({
                username: z.string().min(3),
                email: z.string().email(),
                password: z.string().min(6)
            })
        )
        .mutation(async ({ ctx, input }) => {
            const user = await auth
                .createUser({
                    attributes: {
                        email: input.email.toLowerCase(),
                        email_verified: Number(false),
                        photo: '',
                        username: input.username
                    },
                    key: {
                        providerId: 'email',
                        providerUserId: input.email.toLowerCase(),
                        password: input.password
                    }
                })
                .catch((err) => {
                    throw new TRPCError({
                        code: 'INTERNAL_SERVER_ERROR',
                        message: err.message
                    })
                })
            const session = await auth
                .createSession({
                    userId: user.userId,
                    attributes: {}
                })
                .catch((err) => {
                    throw new TRPCError({
                        code: 'INTERNAL_SERVER_ERROR',
                        message: err.message
                    })
                })
            const authRequest = auth.handleRequest({
                request: ctx.req as NextRequest,
                cookies
            })
            authRequest.setSession(session)

            return user
        })
})
