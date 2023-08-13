import Link from 'next/link'

import { getServerSession } from '@snacr/api'

import Logout from '~/components/auth/Logout'
import { Button } from '~/components/ui'
import { caller } from '~/lib/caller'

export default async function Home() {
    const session = await getServerSession()
    const test = await caller.test()

    return (
        <div className="flex flex-1 flex-col justify-center items-center">
            <div className="flex flex-col items-center">
                <h1>Snacr</h1>
                <p>Auth state: {session?.state ? session.state : 'not authenticated'}</p>
            </div>

            <div className="flex flex-col items-center gap-2 my-2">
                <Link href="/login">
                    <Button>Login</Button>
                </Link>

                <Link href="/signup">
                    <Button>Signup</Button>
                </Link>

                <Logout />
            </div>

            <p>Test: {test}</p>

            <Link href="/authed">Authed Page</Link>
        </div>
    )
}
