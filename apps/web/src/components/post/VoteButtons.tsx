'use client'

import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import { Place, Post, User, Vote, VoteType } from '@snacr/db'

import { ArrowFatDown, ArrowFatUp } from '@phosphor-icons/react'
import { z } from 'zod'
import { useToast } from '~/hooks/useToast'
import { api } from '~/lib/api'
import { cn } from '~/lib/utils'
import { useAuth } from '~/providers/AuthProvider'

const postVoteSchema = z.object({
    postId: z.string(),
    type: z.custom<VoteType>()
})
type PostVoteSchema = z.infer<typeof postVoteSchema>

interface Props {
    post: Post & {
        place: Place
        user: User
        votes: Vote[]
    }
}

export default function PostVoteButtons({ post }: Props) {
    const { user } = useAuth()
    const { toast } = useToast()
    const router = useRouter()

    const postVoteMutation = api.posts.vote.useMutation()

    const [votes, setVotes] = useState(0)
    const [isUpvote, setIsUpvote] = useState(false)
    const [isVoteAuthor, setIsVoteAuthor] = useState(false)

    useEffect(() => {
        const localIsVoteAuthor = post.votes.find((val) => val.userId === user?.userId)
        const localIsUpvote = post.votes.find((val) => {
            return val.type === 'UP' && val.userId === user?.userId ? true : false
        })
        let localVotes = 0
        post.votes.map((vote) => (vote.type === 'UP' ? localVotes++ : localVotes--))

        setVotes(localVotes)
        setIsUpvote(localIsUpvote ? true : false)
        setIsVoteAuthor(localIsVoteAuthor ? true : false)
    }, [post])

    const handlePostVote = (data: PostVoteSchema) => {
        const parsed = postVoteSchema.safeParse(data)
        if (!parsed.success)
            return toast({
                title: 'Error',
                description: 'Invalid data',
                variant: 'destructive'
            })

        postVoteMutation.mutate(
            {
                postId: data.postId,
                type: data.type
            },
            {
                onError: (err) => {
                    toast({
                        title: 'Error',
                        description: err.message,
                        variant: 'destructive'
                    })
                },
                onSuccess: () => {
                    router.refresh()
                }
            }
        )
    }

    return (
        <div className="grid grid-cols-[20px_20px_20px] items-center gap-2 h-5 text-center">
            <button
                onClick={() =>
                    handlePostVote({
                        postId: post.id,
                        type: 'UP'
                    })
                }
            >
                <ArrowFatUp
                    className={cn(
                        'cursor-pointer',
                        isVoteAuthor && isUpvote ? 'text-blue-500' : ''
                    )}
                    size={20}
                    weight={isVoteAuthor && isUpvote ? 'fill' : 'regular'}
                />
            </button>

            <p>{votes}</p>

            <button
                onClick={() =>
                    handlePostVote({
                        postId: post.id,
                        type: 'DOWN'
                    })
                }
            >
                <ArrowFatDown
                    className={cn(
                        'cursor-pointer',
                        isVoteAuthor && !isUpvote ? 'text-red-500' : ''
                    )}
                    size={20}
                    weight={isVoteAuthor && !isUpvote ? 'fill' : 'regular'}
                />
            </button>
        </div>
    )
}
