import { createContext } from './context'
import { initTRPC } from '@trpc/server'
import superjson from 'superjson'

const t = initTRPC.context<typeof createContext>().create({
    transformer: superjson
})

export const router = t.router

export const procedure = t.procedure
