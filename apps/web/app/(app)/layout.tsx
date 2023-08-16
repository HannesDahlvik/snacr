import { PropsWithChildren } from 'react'

import { getServerSession } from '@snacr/api'

import Navbar from '~/components/Navbar'
import Sidebar from '~/components/Sidebar'
import { caller } from '~/lib/caller'

export default async function AppLayout({ children }: PropsWithChildren) {
    const session = await getServerSession()
    let places
    if (session) places = await caller.subscriptions.places()

    return (
        <div className="relative grid-main min-h-screen">
            <Navbar />

            <Sidebar places={places ? places : []} />

            <main className="main-area">{children}</main>
        </div>
    )
}
