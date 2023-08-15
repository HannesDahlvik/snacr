import { db } from '@snacr/db'

import { authedProcedure, procedure, router } from '../trpc'
import { createId } from '@paralleldrive/cuid2'
import { z } from 'zod'

export const placeRouter = router({
    getByName: procedure
        .input(
            z.object({
                name: z.string()
            })
        )
        .query(async ({ input }) => {
            const place = await db
                .selectFrom('Place')
                .selectAll()
                .where('name', '=', input.name)
                .executeTakeFirstOrThrow()

            return place
        }),
    create: authedProcedure
        .input(
            z.object({
                name: z.string().max(1),
                description: z.string().min(5).optional()
            })
        )
        .mutation(async ({ ctx, input }) => {
            const newPlace = await db
                .insertInto('Place')
                .values({
                    id: createId(),
                    creatorId: ctx.user.userId,
                    description: input.description,
                    name: input.name
                })
                .returningAll()
                .executeTakeFirst()

            return newPlace
        })
})
