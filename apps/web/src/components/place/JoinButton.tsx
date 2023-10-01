'use client'

import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import { RouterOutputs } from '@snacr/api'
import { Place } from '@snacr/db'
import { Button, useToast } from '@snacr/ui-web'

import { api } from '~/lib/api'

interface Props {
    place: Place
    subscriptions?: RouterOutputs['subscriptions']['places']
}

export default function PlacePageJoinButton({ place, subscriptions }: Props) {
    const { toast } = useToast()
    const router = useRouter()

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
