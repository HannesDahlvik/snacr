import { PropsWithChildren } from 'react'

import Navbar from '~/components/Navbar'
import Sidebar from '~/components/Sidebar'

export default function AppLayout({ children }: PropsWithChildren) {
    return (
        <div className="relative grid-main min-h-screen">
            <Navbar />

            <Sidebar />

            <main className="main-area">{children}</main>
        </div>
    )
}
