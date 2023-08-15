import { caller } from '~/lib/caller'
import { PlaceParamsProps } from '~/types'

export default async function PlacePage({ params }: PlaceParamsProps) {
    const place = await caller.place.getByName({
        name: params.name
    })

    return (
        <div>
            <p>{JSON.stringify(place)}</p>
        </div>
    )
}
