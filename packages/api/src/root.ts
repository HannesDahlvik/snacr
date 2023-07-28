import { authRouter } from './routers/auth'
import { procedure, router } from './trpc'

export const snacrRouter = router({
    auth: authRouter,
    test: procedure.query(() => 'test procedure')
})

export type SnacrRouter = typeof snacrRouter
