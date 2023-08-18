'use client'

import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import { RouterOutputs } from '@snacr/api'
import { Place } from '@snacr/db'

import { Button } from '../ui'
import { useToast } from '~/hooks/useToast'
import { api } from '~/lib/api'

interface Props {
    place: Place
    subscribedPlaces?: RouterOutputs['subscriptions']['places']
}

export default function PlacePageJoinButton({ place, subscribedPlaces }: Props) {
    const { toast } = useToast()
    const router = useRouter()

    const joinPlaceMutation = api.place.join.useMutation()
    const leavePlaceMutation = api.place.leave.useMutation()

    const [hasJoinedPlace, setHasJoinedPlace] = useState(false)

    useEffect(() => {
        if (subscribedPlaces) {
            const found = subscribedPlaces.find((joinedPlace) => joinedPlace.id === place.id)
            if (found) setHasJoinedPlace(true)
            else setHasJoinedPlace(false)
        }
    }, [subscribedPlaces, place])

    const handleJoinPlace = () => {
        joinPlaceMutation.mutate(
            {
                placeId: place.id
            },
            {
                onError: (err) => {
                    toast({
                        title: 'Error',
                        description: err.message
                    })
                },
                onSuccess: () => {
                    router.refresh()
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
                onError: (err) => {
                    toast({
                        title: 'Error',
                        description: err.message
                    })
                },
                onSuccess: () => {
                    router.refresh()
                }
            }
        )
    }

    if (!hasJoinedPlace)
        return (
            <Button variant="outline" onClick={handleJoinPlace}>
                Join
            </Button>
        )
    else if (hasJoinedPlace)
        return (
            <Button variant="outline" onClick={handleLeavePlace}>
                Leave
            </Button>
        )
    else return null
}
