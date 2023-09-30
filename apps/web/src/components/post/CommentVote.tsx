'use client'

import { useRouter } from 'next/navigation'

import { Comment, VoteType } from '@snacr/db'
import { cn } from '@snacr/ui-utils'
import { useToast } from '@snacr/ui-web'

import { ArrowFatDown, ArrowFatUp } from '@phosphor-icons/react'
import { z } from 'zod'
import { api } from '~/lib/api'

const commentVoteSchema = z.object({
    commentId: z.string(),
    type: z.custom<VoteType>()
})
type CommentVoteSchema = z.infer<typeof commentVoteSchema>

interface Props {
    comment: Comment
    type: VoteType
    isVoteAuthor: boolean
    isUpvote: boolean
}

export default function PostCommentVote({ comment, type, isUpvote, isVoteAuthor }: Props) {
    const { toast } = useToast()
    const router = useRouter()

    const commentVoteMutation = api.comments.vote.useMutation()

    const handleCommentVote = (data: CommentVoteSchema) => {
        const parsed = commentVoteSchema.safeParse(data)
        if (!parsed.success)
            return toast({
                title: 'Error',
                description: 'Invalid data',
                variant: 'destructive'
            })

        commentVoteMutation.mutate(
            {
                commentId: data.commentId,
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

    if (type === 'UP')
        return (
            <button
                onClick={() =>
                    handleCommentVote({
                        commentId: comment.id,
                        type: 'UP'
                    })
                }
            >
                <ArrowFatUp
                    className={cn(
                        'cursor-pointer hover:text-blue-500',
                        isVoteAuthor && isUpvote ? 'text-blue-500' : ''
                    )}
                    size={20}
                    weight={isVoteAuthor && isUpvote ? 'fill' : 'regular'}
                />
            </button>
        )
    else
        return (
            <button
                onClick={() =>
                    handleCommentVote({
                        commentId: comment.id,
                        type: 'DOWN'
                    })
                }
            >
                <ArrowFatDown
                    className={cn(
                        'cursor-pointer hover:text-red-500',
                        isVoteAuthor && !isUpvote ? 'text-red-500' : ''
                    )}
                    size={20}
                    weight={isVoteAuthor && !isUpvote ? 'fill' : 'regular'}
                />
            </button>
        )
}
