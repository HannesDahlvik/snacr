import { authRouter } from './routers/auth'
import { commentsRouter } from './routers/comments'
import { placeRouter } from './routers/place'
import { postsRouter } from './routers/posts'
import { subscriptionsRouter } from './routers/subscriptions'
import { authedProcedure, procedure, router } from './trpc'

export const snacrRouter = router({
    auth: authRouter,
    comments: commentsRouter,
    place: placeRouter,
    posts: postsRouter,
    subscriptions: subscriptionsRouter,
    test: procedure.query(() => 'test procedure'),
    authedTest: authedProcedure.query(() => 'authed test procedure')
})

export type SnacrRouter = typeof snacrRouter
