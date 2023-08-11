import { authRouter } from './routers/auth'
import { authedProcedure, procedure, router } from './trpc'

export const snacrRouter = router({
    auth: authRouter,
    test: procedure.query(() => 'test procedure'),
    authedTest: authedProcedure.query(() => 'authed test procedure')
})

export type SnacrRouter = typeof snacrRouter
