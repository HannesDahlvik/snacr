import { redirect } from 'next/navigation'

import { getServerSession } from '@snacr/api'

export default async function AuthedPage() {
    const session = await getServerSession()

    if (!session) return redirect('/login')

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <h2>Authed Page</h2>
        </div>
    )
}
