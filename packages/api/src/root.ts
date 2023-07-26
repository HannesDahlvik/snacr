import { authRouter } from './routers/auth'
import { router } from './trpc'

export const snacrRouter = router({
    auth: authRouter
})

export type SnacrRouter = typeof snacrRouter
