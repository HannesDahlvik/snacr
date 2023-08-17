import { RouterOutputs, getServerSession } from '@snacr/api'

import PostCommentVote from './CommentVote'
import CreateCommentButton from './CreateCommentButton'
import PostDeleteCommentButton from './DeleteCommentButton'
import PostNoComments from './NoComments'

interface Props {
    comments: RouterOutputs['comments']['getByPostId']
    postId: string
}

export default async function PostPageCommentsSidebar({ comments, postId }: Props) {
    const session = await getServerSession()

    return (
        <div className="relative flex flex-col">
            <div className="sticky top-0 flex justify-between items-center h-[73px] w-full px-4 border-b">
                <h5>Comments</h5>

                {session?.user && <CreateCommentButton postId={postId} />}
            </div>

            <div className="flex flex-col w-full h-[calc(100vh-80px-73px)] overflow-y-scroll">
                {comments.length === 0 && <PostNoComments />}

                {comments.map((comment) => {
                    const isVoteAuthor = comment.votes.map(
                        (val) => val.userId === session?.user?.userId
                    )[0]
                    const isUpvote = comment.votes.map((val) =>
                        val.type === 'UP' ? true : false
                    )[0]
                    let votes = 0
                    comment.votes.map((vote) => (vote.type === 'UP' ? votes++ : votes--))

                    return (
                        <div className="flex flex-col gap-2 p-4 border-b" key={comment.id}>
                            <div className="flex justify-between">
                                <p className="text-sm">{comment.user.username}</p>

                                {comment.authorId === session?.user.userId && (
                                    <PostDeleteCommentButton comment={comment} />
                                )}
                            </div>

                            <p>{comment.text}</p>

                            <div className="grid grid-cols-[20px_20px_20px] items-center gap-2 text-center">
                                <PostCommentVote
                                    type="UP"
                                    comment={comment}
                                    isUpvote={isUpvote}
                                    isVoteAuthor={isVoteAuthor}
                                />

                                <p>{votes}</p>

                                <PostCommentVote
                                    type="DOWN"
                                    comment={comment}
                                    isUpvote={isUpvote}
                                    isVoteAuthor={isVoteAuthor}
                                />
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
