'use client'

import { useRouter } from 'next/navigation'

import { RouterOutputs } from '@snacr/api'
import { VoteType } from '@snacr/db'

import CreateComment from '../modals/CreateComment'
import { Button } from '../ui'
import { ArrowFatDown, ArrowFatUp } from '@phosphor-icons/react'
import { z } from 'zod'
import { useModals } from '~/hooks/useModals'
import { useToast } from '~/hooks/useToast'
import { api } from '~/lib/api'
import { cn } from '~/lib/utils'
import { useAuth } from '~/providers/AuthProvider'

const commentVoteSchema = z.object({
    commentId: z.string(),
    type: z.custom<VoteType>()
})
type CommentVoteSchema = z.infer<typeof commentVoteSchema>

interface Props {
    comments: RouterOutputs['comments']['getByPostId']
    postId: string
}

export default function PostPageCommentsSidebar({ comments, postId }: Props) {
    const { user } = useAuth()

    const { openModal } = useModals()
    const { toast } = useToast()
    const router = useRouter()

    const commentVoteMutation = api.comments.vote.useMutation()

    const handleCreateComment = () => {
        openModal({
            title: 'Create a Comment',
            children: <CreateComment postId={postId} />
        })
    }

    const handleCommentVote = (data: CommentVoteSchema) => {
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

    return (
        <div className="relative flex flex-col">
            <div className="sticky top-0 flex justify-between items-center w-full p-4 border-b">
                <h5>Comments</h5>
                <Button variant="ghost" onClick={handleCreateComment}>
                    Post
                </Button>
            </div>

            <div className="flex flex-col w-full h-[calc(100vh-80px-73px)] overflow-y-scroll">
                {comments.map((comment) => {
                    const isVoteAuthor = comment.votes.map((val) => val.userId === user?.userId)[0]
                    const isUpvote = comment.votes.map((val) =>
                        val.type === 'UP' ? true : false
                    )[0]
                    let votes = 0
                    comment.votes.map((vote) => (vote.type === 'UP' ? votes++ : votes--))

                    return (
                        <div className="flex flex-col gap-2 p-4 border-b" key={comment.id}>
                            <p className="text-sm">{comment.user.username}</p>

                            <p>{comment.text}</p>

                            <div className="grid grid-cols-[20px_20px_20px] items-center gap-2 text-center">
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
                                        handleCommentVote({
                                            commentId: comment.id,
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
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
