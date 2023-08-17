import Link from 'next/link'

import { getServerSession } from '@snacr/api'

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
    const subscribedPlaces = await caller.subscriptions.places()

    let hasJoinedPlace = false
    subscribedPlaces.map((joinedPlace) => {
        if (joinedPlace.id === place.id) hasJoinedPlace = true
        else hasJoinedPlace = false
    })

    return (
        <div className="flex flex-col items-center">
            <div className="flex justify-center items-center h-40 w-full bg-secondary/75 border-b">
                <div className="absolute-center flex justify-between items-center w-center">
                    <div>
                        <h3>{place.name}</h3>
                        <p className="text-muted-foreground text-sm">p/{place.url}</p>
                    </div>

                    <div>
                        <PlacePageJoinButton place={place} hasJoinedPlace={hasJoinedPlace} />
                    </div>
                </div>
            </div>

            <div className="absolute-center flex flex-col gap-4 w-center mt-40 py-8">
                {posts.length === 0 && (
                    <div>
                        <h2 className="text-center">No Posts Found</h2>
                    </div>
                )}

                {posts.map((post) => (
                    <Link
                        className="w-full"
                        href={`/p/${post.place.url}/post/${post.id}`}
                        key={post.id}
                    >
                        <PostCard post={post} />
                    </Link>
                ))}
            </div>
        </div>
    )
}
