import { PropsWithChildren } from 'react'

import type { Metadata } from 'next'
import { Lato } from 'next/font/google'

import { getServerSession } from '@snacr/api'

import './globals.css'
import { ThemeProvider } from '~/components/ui'
import AuthProvider from '~/providers/AuthProvider'
import { ModalsProvider } from '~/providers/ModalProvider'
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
        <html lang="en" suppressHydrationWarning>
            <body className={lato.className} style={{ fontWeight: '400' }}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    themes={['light', 'dark']}
                    enableSystem
                >
                    <TrpcProvider>
                        <AuthProvider session={session}>
                            <ModalsProvider>
                                <>{children}</>
                            </ModalsProvider>
                        </AuthProvider>
                    </TrpcProvider>
                </ThemeProvider>
            </body>
        </html>
    )
}
