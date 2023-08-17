import { Fragment } from 'react'

import PostPageCommentsSidebar from '~/components/post/CommentsSidebar'
import { caller } from '~/lib/caller'
import { PlacePostParamsProps } from '~/types'

export default async function PlacePostPage({ params }: PlacePostParamsProps) {
    const post = await caller.posts.getById({
        postId: params.id
    })
    const comments = await caller.comments.getByPostId({
        postId: params.id
    })

    return (
        <Fragment>
            <div className="absolute-center flex flex-col w-center py-8">
                <h3 className="mb-4">{post.title}</h3>
                <p>{post.body}</p>
            </div>

            <div className="fixed top-20 right-0 max-h-[calc(100vh-80px)] w-[400px] bg-secondary/75 border-l z-40">
                <PostPageCommentsSidebar comments={comments} postId={post.id} />
            </div>
        </Fragment>
    )
}
