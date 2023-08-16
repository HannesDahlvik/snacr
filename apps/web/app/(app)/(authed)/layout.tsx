import { PropsWithChildren } from 'react'

import { redirect } from 'next/navigation'

import { getServerSession } from '@snacr/api'

export default async function AuthedLayout({ children }: PropsWithChildren) {
    const session = await getServerSession()

    if (!session) return redirect('/login')

    return <>{children}</>
}
