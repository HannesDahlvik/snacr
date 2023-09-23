import { prisma } from '@snacr/db'

import { authedProcedure, router } from '../trpc'

export const subscriptionsRouter = router({
    places: authedProcedure.query(async ({ ctx }) => {
        const subscribedPlaces = await prisma.subscription.findMany({
            where: {
                userId: ctx.user.userId
            },
            include: {
                place: true
            }
        })

        return subscribedPlaces
    })
})
