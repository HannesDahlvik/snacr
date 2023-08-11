import { PropsWithChildren } from 'react'

import type { Metadata } from 'next'
import { Lato } from 'next/font/google'

import { getServerSession } from '@snacr/api'

import './globals.css'
import AuthProvider from '~/providers/AuthProvider'
import TrpcProvider from '~/providers/TrpcProvider'

const lato = Lato({
    weight: ['300', '400', '700', '900'],
    subsets: ['latin']
})

export const metadata: Metadata = {
    title: {
        default: 'Snacr',
        template: 'Snacr | %s'
    }
}

export default async function RootLayout({ children }: PropsWithChildren) {
    const session = await getServerSession()

    return (
        <html lang="en">
            <body className={lato.className} style={{ fontWeight: '400' }}>
                <TrpcProvider>
                    <AuthProvider session={session}>
                        <div className="flex flex-col h-screen">
                            <>{children}</>
                        </div>
                    </AuthProvider>
                </TrpcProvider>
            </body>
        </html>
    )
}
