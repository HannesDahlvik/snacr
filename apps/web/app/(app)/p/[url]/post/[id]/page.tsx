import { Fragment } from 'react'

import Link from 'next/link'

import parse from 'html-react-parser'
import PostPageCommentsSidebar from '~/components/post/CommentsSidebar'
import PostVoteButtons from '~/components/post/VoteButtons'
import { Separator } from '~/components/ui'
import { caller } from '~/lib/caller'
import { PlacePostParamsProps } from '~/types'

export default async function PlacePostPage({ params }: PlacePostParamsProps) {
    const post = await caller.posts.getById({
        postId: params.id
    })
    const comments = await caller.comments.getByPostId({
        postId: params.id
    })

    const body = post.body ? parse(post.body) : null

    return (
        <Fragment>
            <div className="absolute-center flex flex-col w-center py-8 pb-24">
                <Link href={`/p/${post.place.url}`} className="text-sm hover:underline">
                    p/{post.place.url}
                </Link>

                <Separator className="my-2" />

                <h2 className="mb-4">{post.title}</h2>

                <div className="editor-content">{body}</div>
            </div>

            <div className="!fixed absolute-center bottom-0 h-16 flex justify-center items-center w-full bg-secondary/75 border-t backdrop-blur">
                <div className="flex justify-between items-center w-center">
                    <p>Posted by {post.user.username}</p>

                    <PostVoteButtons post={post} />
                </div>
            </div>

            <div className="fixed top-20 right-0 max-h-[calc(100vh-80px)] w-[400px] bg-secondary border-l z-40">
                <PostPageCommentsSidebar comments={comments} postId={post.id} />
            </div>
        </Fragment>
    )
}
