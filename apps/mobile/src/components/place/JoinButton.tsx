import { useEffect, useState } from 'react'

import { RouterOutputs } from '@snacr/api'
import { Place } from '@snacr/db'

import { api } from '../../lib/api'
import { Button } from 'react-native-ui-lib'

interface Props {
    place: Place
    subscriptions?: RouterOutputs['subscriptions']['places']
}

export default function PlacePageJoinButton({ place, subscriptions }: Props) {
    const tc = api.useContext()

    const joinPlaceMutation = api.place.join.useMutation()
    const leavePlaceMutation = api.place.leave.useMutation()

    const [hasJoinedPlace, setHasJoinedPlace] = useState(false)

    useEffect(() => {
        if (subscriptions) {
            const found = subscriptions.find((subscription) => subscription.place.id === place.id)
            if (found) setHasJoinedPlace(true)
            else setHasJoinedPlace(false)
        }
    }, [subscriptions, place])

    const handleJoinPlace = () => {
        joinPlaceMutation.mutate(
            {
                placeId: place.id
            },
            {
                onError: (err) => {},
                onSuccess: () => {
                    tc.subscriptions.places.invalidate()
                }
            }
        )
    }

    const handleLeavePlace = () => {
        leavePlaceMutation.mutate(
            {
                placeId: place.id
            },
            {
                onError: (err) => {},
                onSuccess: () => {
                    tc.subscriptions.places.invalidate()
                }
            }
        )
    }

    if (!hasJoinedPlace)
        return <Button label="Join" size="small" onPress={handleJoinPlace} outline />
    else if (hasJoinedPlace)
        return <Button label="Leave" size="small" onPress={handleLeavePlace} outline />
    else return null
}
