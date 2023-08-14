import {
    Dispatch,
    PropsWithChildren,
    SetStateAction,
    createContext,
    useContext,
    useEffect,
    useState
} from 'react'

import { Text } from 'react-native'

import { User } from '@snacr/db'

import { api } from '../lib/api'
import { remove } from '../lib/store'
import { store } from '../stores'
import { useHookstate } from '@hookstate/core'
import { SafeAreaView } from 'react-native-safe-area-context'

interface AuthContextType {
    sessionId: string | null
    setSessionId: Dispatch<SetStateAction<string | null>>
    user: User | null
    setUser: Dispatch<SetStateAction<User | null>>
}

export const AuthContext = createContext<AuthContextType | null>(null)

export default function AuthProvider({ children }: PropsWithChildren) {
    const authVerify = api.auth.verify.useMutation()

    const authSessionId = useHookstate(store.auth.sessionId)

    const [sessionId, setSessionId] = useState<string | null>(null)
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        if (authSessionId.get())
            authVerify.mutate(undefined, {
                onError: (err) => {
                    console.error(err)
                },
                onSuccess: (data) => {
                    if (!data) {
                        setSessionId(null)
                        setUser(null)
                        store.auth.set({
                            sessionId: null,
                            user: null
                        })
                        return
                    }

                    setSessionId(data.sessionId)
                    setUser(data.user)
                    store.auth.set({
                        sessionId: data.sessionId,
                        user: data.user
                    })
                }
            })
    }, [])

    if (authVerify.isError)
        return (
            <SafeAreaView className="flex flex-1 justify-center items-center">
                <Text>Error: {authVerify.error.message}</Text>
            </SafeAreaView>
        )

    if (authVerify.isLoading)
        return (
            <SafeAreaView className="flex flex-1 justify-center items-center">
                <Text>Loading</Text>
            </SafeAreaView>
        )

    return (
        <AuthContext.Provider
            value={{
                sessionId,
                setSessionId,
                user,
                setUser
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const logoutMutation = api.auth.logout.useMutation()
    const ctx = useContext(AuthContext)

    const logout = async () => {
        logoutMutation.mutate(undefined, {
            onError: (err) => console.error(err),
            onSuccess: (data) => console.log(data)
        })

        ctx?.setSessionId(null)
        ctx?.setUser(null)
        await remove('sessionId')
        store.auth.set({
            sessionId: null,
            user: null
        })
    }

    return {
        logout,
        sessionId: ctx?.sessionId,
        setSessionId: ctx?.setSessionId,
        user: ctx?.user,
        setUser: ctx?.setUser
    }
}
