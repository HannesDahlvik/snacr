'use client'

import { Button } from '~/components/ui'
import { useAuth } from '~/providers/AuthProvider'

export default function Logout() {
    const { logout } = useAuth()

    return <Button onClick={logout}>Logout</Button>
}
