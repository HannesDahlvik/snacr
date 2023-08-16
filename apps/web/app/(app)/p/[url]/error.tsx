'use client'

import { useEffect } from 'react'

import Link from 'next/link'

import { Button } from '~/components/ui'
import { ErrorPage } from '~/types'

export default function PlaceErrorPage({ error }: ErrorPage) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className="flex flex-col flex-1 justify-center items-center">
            <h2 className="mb-4">
                {error.message.includes('no result') ? 'Place not found!' : 'Something went wrong!'}
            </h2>

            <Link href="/">
                <Button>Home</Button>
            </Link>
        </div>
    )
}
