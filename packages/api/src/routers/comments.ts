import { Comment, User, Vote, VoteType, prisma } from '@snacr/db'

import { authedProcedure, procedure, router } from '../trpc'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'

export const commentsRouter = router({
    create: authedProcedure
        .input(
            z.object({
                text: z.string().min(1),
                postId: z.string().cuid(),
                replyToId: z.string().cuid().optional()
            })
        )
        .mutation(async ({ ctx, input }) => {
            const newComment = await prisma.comment
                .create({
                    data: {
                        authorId: ctx.user.userId,
                        postId: input.postId,
                        text: input.text,
                        replyToId: input.replyToId
                    }
                })
                .catch((err) => {
                    throw new TRPCError({
                        code: 'INTERNAL_SERVER_ERROR',
                        message: err.message
                    })
                })

            return newComment
        }),
    delete: authedProcedure
        .input(
            z.object({
                commentId: z.string().cuid()
            })
        )
        .mutation(async ({ input }) => {
            const deletedComment = await prisma.comment
                .delete({
                    where: {
                        id: input.commentId
                    }
                })
                .catch((err) => {
                    throw new TRPCError({
                        code: 'INTERNAL_SERVER_ERROR',
                        message: err.message
                    })
                })

            return deletedComment
        }),
    getByPostId: procedure
        .input(
            z.object({
                postId: z.string().cuid()
            })
        )
        .query(async ({ input }) => {
            async function getAllReplies(commentId: string) {
                const replies = await prisma.comment.findMany({
                    where: {
                        replyToId: commentId
                    },
                    include: {
                        author: true,
                        votes: true
                    }
                })

                const nestedReplies: typeof replies = await Promise.all(
                    replies.map(async (reply) => {
                        return {
                            ...reply,
                            replies: await getAllReplies(reply.id)
                        }
                    })
                )

                return nestedReplies
            }

            const comments = await prisma.comment.findMany({
                where: {
                    postId: input.postId,
                    replyToId: null
                },
                include: {
                    author: true,
                    votes: true
                }
            })

            const commentsWithReplies = await Promise.all(
                comments.map(async (comment) => {
                    const replies = await getAllReplies(comment.id)

                    return {
                        ...comment,
                        replies
                    }
                })
            )

            return commentsWithReplies
        }),
    vote: authedProcedure
        .input(
            z.object({
                commentId: z.string().cuid(),
                type: z.custom<VoteType>()
            })
        )
        .mutation(async ({ ctx, input }) => {
            await prisma.commentVote
                .findFirst({
                    where: {
                        commentId: input.commentId,
                        userId: ctx.user.userId
                    }
                })
                .then(async (vote) => {
                    if (vote && vote.userId === ctx.user.userId) {
                        if (vote.type === input.type) {
                            const removedVote = await prisma.commentVote.delete({
                                where: {
                                    userId_commentId: {
                                        commentId: input.commentId,
                                        userId: ctx.user.userId
                                    }
                                }
                            })

                            return removedVote
                        } else {
                            const updatedVote = await prisma.commentVote.update({
                                data: {
                                    type: vote.type === 'DOWN' ? 'UP' : 'DOWN'
                                },
                                where: {
                                    userId_commentId: {
                                        commentId: input.commentId,
                                        userId: ctx.user.userId
                                    }
                                }
                            })

                            return updatedVote
                        }
                    } else {
                        const newVote = await prisma.commentVote.create({
                            data: {
                                commentId: input.commentId,
                                type: input.type,
                                userId: ctx.user.userId
                            }
                        })

                        return newVote
                    }
                })
                .catch((err) => {
                    throw new TRPCError({
                        code: 'INTERNAL_SERVER_ERROR',
                        message: err.message
                    })
                })
        })
})
