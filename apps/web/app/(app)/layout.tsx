import { PropsWithChildren } from 'react'

import Navbar from '~/components/Navbar'
import Sidebar from '~/components/Sidebar'
import { caller } from '~/lib/caller'

export default async function AppLayout({ children }: PropsWithChildren) {
    const subscribedPlaces = await caller.subscriptions.places()

    return (
        <div className="relative grid-main min-h-screen">
            <Navbar />

            <Sidebar places={subscribedPlaces} />

            <main className="main-area">{children}</main>
        </div>
    )
}
