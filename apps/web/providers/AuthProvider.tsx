'use client'

import { PropsWithChildren, createContext, useContext } from 'react'

import { User, type Session } from '@snacr/api'

type AuthContextType = {
    user: User | undefined
    state: 'idle' | 'active' | undefined
}

export const AuthContext = createContext<AuthContextType | null>(null)

export function useAuth() {
    const ctx = useContext(AuthContext)
    return { ...ctx }
}

interface Props extends PropsWithChildren {
    session: Session | null
}

export default function AuthProvider({ children, session }: Props) {
    return (
        <AuthContext.Provider
            value={{
                user: session?.user,
                state: session?.state
            }}
        >
            <>{children}</>
        </AuthContext.Provider>
    )
}
