import { PropsWithChildren } from 'react'

import { redirect } from 'next/navigation'

import { getServerSession } from '@snacr/api'

import AuthBackButton from '~/components/auth/BackButton'

export default async function AuthLayout({ children }: PropsWithChildren) {
    const session = await getServerSession()

    if (session) return redirect('/')

    return (
        <div className="flex flex-col items-center pt-40 h-screen">
            <AuthBackButton />

            <h2 className="mb-8 text-6xl">SNACR</h2>

            <div className="flex flex-col justify-center items-center w-[400px] bg-secondary p-12 rounded-lg border shadow-xl">
                {children}
            </div>
        </div>
    )
}
