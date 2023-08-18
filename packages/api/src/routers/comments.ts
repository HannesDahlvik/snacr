import { CommentVote, User, VoteType, db } from '@snacr/db'

import { authedProcedure, procedure, router } from '../trpc'
import { createId, isCuid } from '@paralleldrive/cuid2'
import { jsonArrayFrom, jsonObjectFrom } from 'kysely/helpers/postgres'
import { z } from 'zod'

export const commentsRouter = router({
    create: authedProcedure
        .input(
            z.object({
                text: z.string().min(1),
                postId: z.string().refine((val) => isCuid(val))
            })
        )
        .mutation(async ({ ctx, input }) => {
            const newComment = await db
                .insertInto('Comment')
                .values({
                    id: createId(),
                    authorId: ctx.user.userId,
                    postId: input.postId,
                    text: input.text
                })
                .returningAll()
                .executeTakeFirstOrThrow()

            return newComment
        }),
    delete: authedProcedure
        .input(
            z.object({
                commentId: z.string().refine((val) => isCuid(val))
            })
        )
        .mutation(async ({ input }) => {
            const result = await db
                .deleteFrom('Comment')
                .where('Comment.id', '=', input.commentId)
                .executeTakeFirst()

            return result.numDeletedRows
        }),
    getByPostId: procedure
        .input(
            z.object({
                postId: z.string().refine((val) => isCuid(val))
            })
        )
        .query(async ({ input }) => {
            const comments = await db
                .selectFrom('Comment')
                .selectAll('Comment')
                .where('Comment.postId', '=', input.postId)
                .select((eb) => [
                    jsonArrayFrom(
                        eb
                            .selectFrom('CommentVote')
                            .selectAll()
                            .whereRef('CommentVote.commentId', '=', 'Comment.id')
                    )
                        .$castTo<CommentVote[]>()
                        .as('votes'),
                    jsonObjectFrom(
                        eb
                            .selectFrom('User')
                            .selectAll('User')
                            .whereRef('User.id', '=', 'Comment.authorId')
                    )
                        .$castTo<User>()
                        .as('user')
                ])
                .execute()

            return comments
        }),
    vote: authedProcedure
        .input(
            z.object({
                commentId: z.string().refine((val) => isCuid(val)),
                type: z.custom<VoteType>()
            })
        )
        .mutation(async ({ ctx, input }) => {
            await db
                .selectFrom('CommentVote')
                .selectAll()
                .where('CommentVote.commentId', '=', input.commentId)
                .where('CommentVote.userId', '=', ctx.user.userId)
                .executeTakeFirst()
                .then(async (vote) => {
                    if (vote && vote.userId === ctx.user.userId) {
                        if (vote.type === input.type) {
                            const removedVote = await db
                                .deleteFrom('CommentVote')
                                .where('CommentVote.commentId', '=', input.commentId)
                                .where('CommentVote.userId', '=', ctx.user.userId)
                                .executeTakeFirstOrThrow()

                            return removedVote
                        } else if (vote.type !== input.type) {
                            const updatedVote = await db
                                .updateTable('CommentVote')
                                .set({
                                    type: vote.type === 'DOWN' ? 'UP' : 'DOWN'
                                })
                                .where('CommentVote.commentId', '=', input.commentId)
                                .where('CommentVote.userId', '=', ctx.user.userId)
                                .executeTakeFirstOrThrow()

                            return updatedVote
                        }

                        return vote
                    } else {
                        const newVote = await db
                            .insertInto('CommentVote')
                            .values({
                                commentId: input.commentId,
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
