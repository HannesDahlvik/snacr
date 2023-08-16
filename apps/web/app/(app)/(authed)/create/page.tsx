import { Fragment } from 'react'

import CreatePostWrapper from '~/components/create/PostWrapper'
import { Separator } from '~/components/ui'
import { caller } from '~/lib/caller'

export default async function AuthedCreatePage() {
    const subscribedPlaces = await caller.subscriptions.places()

    return (
        <div className="flex justify-center h-full">
            <div className="absolute-center w-center py-10">
                {subscribedPlaces.length === 0 ? (
                    <div className="text-center bg-secondary rounded-lg p-8 py-12">
                        <h2>You have not joined any places</h2>
                        <p className="text-muted-foreground mt-2">
                            You can&apos;t make a post as you have not joined any places
                        </p>
                    </div>
                ) : (
                    <Fragment>
                        <h4>Create a post</h4>

                        <Separator className="my-4" />

                        <CreatePostWrapper places={subscribedPlaces} />
                    </Fragment>
                )}
            </div>
        </div>
    )
}
