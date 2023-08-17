'use client'

import { useRouter } from 'next/navigation'

import { Place } from '@snacr/db'

import { Button } from '../ui'
import { useToast } from '~/hooks/useToast'
import { api } from '~/lib/api'
import { useAuth } from '~/providers/AuthProvider'

interface Props {
    place: Place
    hasJoinedPlace: boolean
}

export default function PlacePageJoinButton({ hasJoinedPlace, place }: Props) {
    const { user } = useAuth()
    const { toast } = useToast()
    const router = useRouter()

    const joinPlaceMutation = api.place.join.useMutation()
    const leavePlaceMutation = api.place.leave.useMutation()

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

    if (user && !hasJoinedPlace)
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
