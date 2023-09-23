import { prisma } from '@snacr/db'

import { createURL } from '../lib/utils'
import { authedProcedure, procedure, router } from '../trpc'
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
            const place = await prisma.place
                .findFirstOrThrow({
                    where: {
                        url: input.url
                    }
                })
                .catch((err) => {
                    throw new TRPCError({
                        code: 'INTERNAL_SERVER_ERROR',
                        message: err.message
                    })
                })

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
            const newPlace = await prisma.$transaction(async (tx) => {
                const place = await tx.place.create({
                    data: {
                        creatorId: ctx.user.userId,
                        description: input.description,
                        name: input.name,
                        url: createURL(input.name)
                    }
                })

                await tx.subscription.create({
                    data: {
                        placeId: place.id,
                        userId: ctx.user.userId
                    }
                })

                return place
            })

            return newPlace
        }),
    join: authedProcedure
        .input(
            z.object({
                placeId: z.string().cuid()
            })
        )
        .mutation(async ({ ctx, input }) => {
            const joinedPlace = await prisma.subscription
                .create({
                    data: {
                        placeId: input.placeId,
                        userId: ctx.user.userId
                    }
                })
                .catch((err) => {
                    throw new TRPCError({
                        code: 'INTERNAL_SERVER_ERROR',
                        message: err.message
                    })
                })

            return joinedPlace
        }),
    leave: authedProcedure
        .input(
            z.object({
                placeId: z.string().cuid()
            })
        )
        .mutation(async ({ ctx, input }) => {
            const leftPlace = await prisma.subscription
                .delete({
                    where: {
                        userId_placeId: {
                            placeId: input.placeId,
                            userId: ctx.user.userId
                        }
                    }
                })
                .catch((err) => {
                    throw new TRPCError({
                        code: 'INTERNAL_SERVER_ERROR',
                        message: err.message
                    })
                })

            return leftPlace
        })
})
