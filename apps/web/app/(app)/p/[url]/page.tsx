import { RouterOutputs, getServerSession } from '@snacr/api'

import PlacePageJoinButton from '~/components/place/JoinButton'
import PostCard from '~/components/post/Card'
import { caller } from '~/lib/caller'
import { PlaceParamsProps } from '~/types'

export default async function PlacePage({ params }: PlaceParamsProps) {
    const session = await getServerSession()
    const place = await caller.place.getByUrl({
        url: params.url
    })
    const posts = await caller.posts.getByPlaceId({
        placeId: place.id
    })
    let subscriptions: RouterOutputs['subscriptions']['places'] | undefined
    if (session) subscriptions = await caller.subscriptions.places()

    return (
        <div className="flex flex-col items-center">
            <div className="flex justify-center items-center h-40 w-full bg-secondary/75 border-b">
                <div className="absolute-center flex justify-between items-center w-center">
                    <div>
                        <h3>{place.name}</h3>
                        <p className="text-muted-foreground text-sm">p/{place.url}</p>
                    </div>

                    {session && <PlacePageJoinButton place={place} subscriptions={subscriptions} />}
                </div>
            </div>

            <div className="absolute-center flex flex-col gap-4 w-center mt-40 py-8">
                {posts.length === 0 && (
                    <div>
                        <h2 className="text-center">No Posts Found</h2>
                    </div>
                )}

                {posts.map((post) => (
                    <PostCard post={post} key={post.id} />
                ))}
            </div>
        </div>
    )
}
