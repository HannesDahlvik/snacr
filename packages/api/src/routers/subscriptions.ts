import { Place, Subscription, db } from '@snacr/db'

import { authedProcedure, router } from '../trpc'

export const subscriptionsRouter = router({
    places: authedProcedure.query(async ({ ctx }) => {
        const subscribedPlaces = await db
            .selectFrom('Subscription')
            .where('userId', '=', ctx.user.userId)
            .leftJoin('Place', 'Subscription.placeId', 'Place.id')
            .selectAll(['Place', 'Subscription'])
            .orderBy('Place.name', 'asc')
            .$castTo<Place & Subscription>()
            .execute()

        return subscribedPlaces
    })
})
