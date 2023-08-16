import { db } from '@snacr/db'

import { createURL } from '../lib/utils'
import { authedProcedure, procedure, router } from '../trpc'
import { createId } from '@paralleldrive/cuid2'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'

export const placeRouter = router({
    getByUrl: procedure
        .input(
            z.object({
                url: z.string()
            })
        )
        .query(async ({ input }) => {
            const place = await db
                .selectFrom('Place')
                .selectAll()
                .where('url', '=', input.url)
                .executeTakeFirstOrThrow()

            return place
        }),
    create: authedProcedure
        .input(
            z.object({
                name: z.string().min(3).max(20),
                description: z.string().max(300).optional()
            })
        )
        .mutation(async ({ ctx, input }) => {
            const newPlace = await db
                .transaction()
                .execute(async (trx) => {
                    const place = await trx
                        .insertInto('Place')
                        .values({
                            id: createId(),
                            creatorId: ctx.user.userId,
                            description: input.description,
                            name: input.name,
                            url: createURL(input.name)
                        })
                        .returningAll()
                        .executeTakeFirstOrThrow()

                    await trx
                        .insertInto('Subscription')
                        .values({
                            placeId: place.id,
                            userId: ctx.user.userId
                        })
                        .executeTakeFirstOrThrow()
                    return place
                })
                .catch((err) => {
                    throw new TRPCError({
                        code: 'INTERNAL_SERVER_ERROR',
                        message: err.message
                    })
                })

            return newPlace
        })
})
