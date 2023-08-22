import { Place, PostType, User, Vote, VoteType, db } from '@snacr/db'

import { authedProcedure, procedure, router } from '../trpc'
import { createId, isCuid } from '@paralleldrive/cuid2'
import { jsonArrayFrom, jsonObjectFrom } from 'kysely/helpers/postgres'
import { z } from 'zod'

export const postsRouter = router({
    getFrontpage: procedure.query(async () => {
        const posts = await db
            .selectFrom('Post')
            .selectAll()
            .orderBy('Post.createdAt', 'desc')
            .select((eb) => [
                jsonObjectFrom(
                    eb
                        .selectFrom('Place')
                        .selectAll('Place')
                        .whereRef('Post.placeId', '=', 'Place.id')
                )
                    .$castTo<Place>()
                    .as('place'),
                jsonObjectFrom(
                    eb
                        .selectFrom('User')
                        .selectAll('User')
                        .whereRef('User.id', '=', 'Post.authorId')
                )
                    .$castTo<User>()
                    .as('user'),
                jsonArrayFrom(
                    eb.selectFrom('Vote').selectAll('Vote').whereRef('Vote.postId', '=', 'Post.id')
                )
                    .$castTo<Vote[]>()
                    .as('votes')
            ])
            .execute()

        posts.sort((a, b) => b.votes.length - a.votes.length)

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
                .select((eb) => [
                    jsonObjectFrom(
                        eb
                            .selectFrom('Place')
                            .selectAll('Place')
                            .whereRef('Post.placeId', '=', 'Place.id')
                    )
                        .$castTo<Place>()
                        .as('place'),
                    jsonObjectFrom(
                        eb
                            .selectFrom('User')
                            .selectAll('User')
                            .whereRef('User.id', '=', 'Post.authorId')
                    )
                        .$castTo<User>()
                        .as('user'),
                    jsonArrayFrom(
                        eb
                            .selectFrom('Vote')
                            .selectAll('Vote')
                            .whereRef('Vote.postId', '=', 'Post.id')
                    )
                        .$castTo<Vote[]>()
                        .as('votes')
                ])
                .executeTakeFirstOrThrow()
            return post
        }),
    getByPlaceId: procedure
        .input(
            z.object({
                placeId: z.string().refine((val) => isCuid(val))
            })
        )
        .query(async ({ input }) => {
            const posts = await db
                .selectFrom('Post')
                .selectAll()
                .where('Post.placeId', '=', input.placeId)
                .orderBy('Post.createdAt', 'desc')
                .select((eb) => [
                    jsonObjectFrom(
                        eb
                            .selectFrom('Place')
                            .selectAll('Place')
                            .whereRef('Post.placeId', '=', 'Place.id')
                    )
                        .$castTo<Place>()
                        .as('place'),
                    jsonObjectFrom(
                        eb
                            .selectFrom('User')
                            .selectAll('User')
                            .whereRef('User.id', '=', 'Post.authorId')
                    )
                        .$castTo<User>()
                        .as('user'),
                    jsonArrayFrom(
                        eb
                            .selectFrom('Vote')
                            .selectAll('Vote')
                            .whereRef('Vote.postId', '=', 'Post.id')
                    )
                        .$castTo<Vote[]>()
                        .as('votes')
                ])
                .execute()

            posts.sort((a, b) => b.votes.length - a.votes.length)

            return posts
        }),
    create: authedProcedure
        .input(
            z.object({
                body: z.string().optional(),
                placeId: z.string().refine((val) => isCuid(val)),
                title: z.string().min(3).max(300),
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
        }),
    vote: authedProcedure
        .input(
            z.object({
                postId: z.string().refine((val) => isCuid(val)),
                type: z.custom<VoteType>()
            })
        )
        .mutation(async ({ ctx, input }) => {
            await db
                .selectFrom('Vote')
                .selectAll()
                .where('Vote.postId', '=', input.postId)
                .where('Vote.userId', '=', ctx.user.userId)
                .executeTakeFirst()
                .then(async (vote) => {
                    if (vote && vote.userId === ctx.user.userId) {
                        if (vote.type === input.type) {
                            const removedVote = await db
                                .deleteFrom('Vote')
                                .where('Vote.postId', '=', input.postId)
                                .where('Vote.userId', '=', ctx.user.userId)
                                .executeTakeFirstOrThrow()

                            return removedVote
                        } else if (vote.type !== input.type) {
                            const updatedVote = await db
                                .updateTable('Vote')
                                .set({
                                    type: vote.type === 'DOWN' ? 'UP' : 'DOWN'
                                })
                                .where('Vote.postId', '=', input.postId)
                                .where('Vote.userId', '=', ctx.user.userId)
                                .executeTakeFirstOrThrow()

                            return updatedVote
                        }

                        return vote
                    } else {
                        const newVote = await db
                            .insertInto('Vote')
                            .values({
                                postId: input.postId,
                                type: input.type,
                                userId: ctx.user.userId
                            })
                            .returningAll()
                            .executeTakeFirstOrThrow()

                        return newVote
                    }
                })
        })
})
