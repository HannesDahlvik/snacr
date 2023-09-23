import { RouterOutputs, getServerSession } from '@snacr/api'

import PostComment from './Comment'
import CreateCommentButton from './CreateCommentButton'
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

                {comments.map((comment) => (
                    <div className="flex flex-col gap-2 pt-4" key={comment.id}>
                        <PostComment postId={postId} comment={comment} session={session} />
                    </div>
                ))}
            </div>
        </div>
    )
}
