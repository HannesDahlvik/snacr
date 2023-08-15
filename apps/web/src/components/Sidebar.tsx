'use client'

import { RouterOutputs } from '@snacr/api'

import CreatePlaceModal from './modals/CreatePlace'
import { Button } from './ui'
import { useModals } from '~/hooks/useModals'

interface Props {
    places: RouterOutputs['subscriptions']['places']
}

export default function Sidebar({ places }: Props) {
    const modals = useModals()

    return (
        <div className="sidebar-area fixed top-20 left-0 h-[calc(100vh-80px)] w-80 bg-secondary/75 p-10 border-r z-40">
            <Button
                variant="outline"
                className="w-full"
                onClick={() =>
                    modals.openModal({
                        title: 'Create Place',
                        children: <CreatePlaceModal />
                    })
                }
            >
                Create Place
            </Button>

            <div className="flex flex-col mt-5">
                {places.length === 0 && (
                    <p className="text-center">You have not joined any places</p>
                )}

                {places.map((place) => (
                    <div key={place.id}>
                        <p>{place.name}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
