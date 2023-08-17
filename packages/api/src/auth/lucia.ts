import { cache } from 'react'

import { cookies } from 'next/headers'

import { pool } from '@snacr/db'

import { pg } from '@lucia-auth/adapter-postgresql'
import { lucia } from 'lucia'
import { nextjs } from 'lucia/middleware'
import 'lucia/polyfill/node'

export const auth = lucia({
    env: process.env.NODE_ENV === 'production' ? 'PROD' : 'DEV',
    middleware: nextjs(),
    adapter: pg(pool, {
        key: 'Key',
        session: 'Session',
        user: 'User'
    }),
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

export const getServerSession = cache(() => {
    const authRequest = auth.handleRequest({
        request: null,
        cookies
    })
    return authRequest.validate()
})
