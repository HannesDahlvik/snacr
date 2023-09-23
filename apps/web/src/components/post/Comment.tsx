import { Fragment } from 'react'

import { RouterOutputs, Session } from '@snacr/api'

import PostCommentVote from './CommentVote'
import PostCreateReplyComment from './CreateReplyComment'
import PostDeleteCommentButton from './DeleteCommentButton'

interface Props {
    postId: string
    comment: RouterOutputs['comments']['getByPostId'][0]
    session: Session | null
}

export default function PostComment({ comment, session, postId }: Props) {
    const isVoteAuthor = comment.votes.find((val) => val.userId === session?.user?.userId)
    const isUpvote = comment.votes.find((val) =>
        val.type === 'UP' && val.userId === session?.user.userId ? true : false
    )
    let votes = 0
    comment.votes.map((vote) => (vote.type === 'UP' ? votes++ : votes--))

    return (
        <Fragment>
            <div className="px-4 pb-4">
                <div className="flex justify-between">
                    <p className="text-sm">{comment.author.username}</p>
                    {comment.authorId === session?.user.userId && (
                        <PostDeleteCommentButton comment={comment} />
                    )}
                </div>

                <p>{comment.text}</p>

                <div className="flex items-center gap-2 mt-2">
                    <div className="grid grid-cols-[20px_20px_20px] items-center gap-2 text-center">
                        <PostCommentVote
                            type="UP"
                            comment={comment}
                            isUpvote={isUpvote ? true : false}
                            isVoteAuthor={isVoteAuthor ? true : false}
                        />

                        <p>{votes}</p>

                        <PostCommentVote
                            type="DOWN"
                            comment={comment}
                            isUpvote={isUpvote ? true : false}
                            isVoteAuthor={isVoteAuthor ? true : false}
                        />
                    </div>

                    <div>
                        <PostCreateReplyComment postId={postId} replyToId={comment.id} />
                    </div>
                </div>
            </div>

            {comment.replies.length > 0 && (
                <div className="pl-4">
                    {comment.replies.map((reply) => (
                        <PostComment
                            postId={postId}
                            comment={reply as any}
                            session={session}
                            key={reply.id}
                        />
                    ))}
                </div>
            )}
        </Fragment>
    )
}
