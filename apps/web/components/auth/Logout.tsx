'use client'

import { useAuth } from '~/providers/AuthProvider'

export default function Logout() {
    const { logout } = useAuth()

    return (
        <div className="mb-4">
            <button onClick={logout}>Logout</button>
        </div>
    )
}
