import { caller } from '~/lib/caller'
import { PlacePostParamsProps } from '~/types'

export default async function PlacePostPage({ params }: PlacePostParamsProps) {
    const post = await caller.posts.getById({
        postId: params.id
    })

    return (
        <div>
            <p>{JSON.stringify(post)}</p>
        </div>
    )
}
