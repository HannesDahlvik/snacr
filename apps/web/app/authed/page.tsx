import { redirect } from 'next/navigation'

import { getServerSession } from '@snacr/api'

import { caller } from '~/lib/caller'

export default async function AuthedPage() {
    const session = await getServerSession()

    if (!session) return redirect('/login')

    const authedTest = await caller.authedTest()

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <h2 className="mb-2">Authed Page</h2>

            <p>Authed test: {authedTest}</p>
        </div>
    )
}
