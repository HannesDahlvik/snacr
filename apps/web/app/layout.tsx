import { PropsWithChildren } from 'react'

import type { Metadata } from 'next'
import { Lato } from 'next/font/google'

import './globals.css'

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

export default function RootLayout({ children }: PropsWithChildren) {
    return (
        <html lang="en">
            <body className={lato.className}>{children}</body>
        </html>
    )
}
