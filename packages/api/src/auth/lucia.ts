import { cache } from 'react'

import { cookies } from 'next/headers'

import { prisma } from '@snacr/db'
import { env } from '@snacr/env'

import { prisma as prismaAdapter } from '@lucia-auth/adapter-prisma'
import { lucia } from 'lucia'
import { nextjs } from 'lucia/middleware'
import 'lucia/polyfill/node'

export const auth = lucia({
    env: env.NODE_ENV === 'production' ? 'PROD' : 'DEV',
    middleware: nextjs(),
    adapter: prismaAdapter(prisma),
    sessionCookie: {
        expires: false
    },
    getUserAttributes: (data) => {
        return {
            email: data.email,
            emailVerified: Boolean(data.email_verified),
            photo: data.photo,
            username: data.username
        }
    }
})

export type Auth = typeof auth

export const getPageSession = cache(() => {
    const authRequest = auth.handleRequest({
        request: null,
        cookies
    })
    return authRequest.validate()
})
