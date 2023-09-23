import { PostType, VoteType, prisma } from '@snacr/db'

import { authedProcedure, procedure, router } from '../trpc'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'

export const postsRouter = router({
    getFrontpage: procedure.query(async () => {
        const posts = await prisma.post
            .findMany({
                orderBy: {
                    createdAt: 'desc'
                },
                include: {
                    place: true,
                    user: true,
                    votes: true
                }
            })
            .catch((err) => {
                throw new TRPCError({
                    code: 'INTERNAL_SERVER_ERROR',
                    message: err.message
                })
            })

        posts.sort((a, b) => b.votes.length - a.votes.length)

        return posts
    }),
    getById: procedure
        .input(
            z.object({
                postId: z.string().cuid()
            })
        )
        .query(async ({ input }) => {
            const post = prisma.post
                .findFirstOrThrow({
                    where: {
                        id: input.postId
                    },
                    include: {
                        place: true,
                        user: true,
                        votes: true
                    }
                })
                .catch((err) => {
                    throw new TRPCError({
                        code: 'INTERNAL_SERVER_ERROR',
                        message: err.message
                    })
                })

            return post
        }),
    getByPlaceId: procedure
        .input(
            z.object({
                placeId: z.string().cuid()
            })
        )
        .query(async ({ input }) => {
            const posts = await prisma.post
                .findMany({
                    where: {
                        placeId: input.placeId
                    },
                    orderBy: {
                        createdAt: 'desc'
                    },
                    include: {
                        place: true,
                        user: true,
                        votes: true
                    }
                })
                .catch((err) => {
                    throw new TRPCError({
                        code: 'INTERNAL_SERVER_ERROR',
                        message: err.message
                    })
                })

            posts.sort((a, b) => b.votes.length - a.votes.length)

            return posts
        }),
    create: authedProcedure
        .input(
            z.object({
                body: z.string().optional(),
                placeId: z.string().cuid(),
                title: z.string().min(3).max(300),
                type: z.custom<PostType>()
            })
        )
        .mutation(async ({ ctx, input }) => {
            const newPlace = await prisma.post
                .create({
                    data: {
                        authorId: ctx.user.userId,
                        body: input.body,
                        placeId: input.placeId,
                        title: input.title,
                        type: input.type
                    }
                })
                .catch((err) => {
                    throw new TRPCError({
                        code: 'INTERNAL_SERVER_ERROR',
                        message: err.message
                    })
                })

            return newPlace
        }),
    vote: authedProcedure
        .input(
            z.object({
                postId: z.string().cuid(),
                type: z.custom<VoteType>()
            })
        )
        .mutation(async ({ ctx, input }) => {
            await prisma.vote
                .findFirst({
                    where: {
                        postId: input.postId,
                        userId: ctx.user.userId
                    }
                })
                .then(async (vote) => {
                    if (vote && vote.userId === ctx.user.userId) {
                        if (vote.type === input.type) {
                            const removedVote = await prisma.vote.delete({
                                where: {
                                    userId_postId: {
                                        postId: input.postId,
                                        userId: ctx.user.userId
                                    }
                                }
                            })

                            return removedVote
                        } else {
                            const updatedVote = await prisma.vote.update({
                                data: {
                                    type: vote.type === 'DOWN' ? 'UP' : 'DOWN'
                                },
                                where: {
                                    userId_postId: {
                                        postId: input.postId,
                                        userId: ctx.user.userId
                                    }
                                }
                            })

                            return updatedVote
                        }
                    } else {
                        const newVote = await prisma.vote.create({
                            data: {
                                postId: input.postId,
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
