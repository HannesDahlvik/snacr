import { PostType, db } from '@snacr/db'

import { withPlace } from '../lib/helpers'
import { authedProcedure, procedure, router } from '../trpc'
import { createId, isCuid } from '@paralleldrive/cuid2'
import { z } from 'zod'

export const postsRouter = router({
    getFrontpage: procedure.query(async () => {
        const posts = await db
            .selectFrom('Post')
            .selectAll()
            .select((eb) => [withPlace(eb)])
            .execute()
        return posts
    }),
    getById: procedure
        .input(
            z.object({
                postId: z.string().refine((val) => isCuid(val))
            })
        )
        .query(async ({ input }) => {
            const post = await db
                .selectFrom('Post')
                .selectAll()
                .where('Post.id', '=', input.postId)
                .executeTakeFirstOrThrow()
            return post
        }),
    create: authedProcedure
        .input(
            z.object({
                body: z.string(),
                placeId: z.string().refine((val) => isCuid(val)),
                title: z.string().min(3),
                type: z.custom<PostType>()
            })
        )
        .mutation(async ({ ctx, input }) => {
            const newPlace = await db
                .insertInto('Post')
                .values({
                    id: createId(),
                    authorId: ctx.user.userId,
                    body: input.body,
                    placeId: input.placeId,
                    title: input.title,
                    type: input.type
                })
                .returningAll()
                .executeTakeFirst()

            return newPlace
        })
})
