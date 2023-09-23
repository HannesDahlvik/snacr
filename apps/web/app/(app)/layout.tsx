import { PropsWithChildren } from 'react'

import { RouterOutputs, getServerSession } from '@snacr/api'

import Navbar from '~/components/Navbar'
import Sidebar from '~/components/Sidebar'
import { caller } from '~/lib/caller'

export default async function AppLayout({ children }: PropsWithChildren) {
    const session = await getServerSession()
    let subscriptions: RouterOutputs['subscriptions']['places'] | undefined
    if (session) subscriptions = await caller.subscriptions.places()

    return (
        <div className="relative grid-main min-h-screen">
            <Navbar />

            <Sidebar subscriptions={subscriptions ?? []} />

            <main className="main-area">{children}</main>
        </div>
    )
}
