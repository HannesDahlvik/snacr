import Link from 'next/link'

import Logout from '~/components/auth/Logout'
import { caller } from '~/lib/caller'

export default async function Home() {
    const test = await caller.test()

    return (
        <div className="flex flex-1 flex-col justify-center items-center">
            <h1>Snacr</h1>

            <Link href="/login">Login</Link>
            <Link href="/signup">Signup</Link>
            <Logout />

            <p>Test: {test}</p>

            <Link href="/authed">Authed Page</Link>
        </div>
    )
}
