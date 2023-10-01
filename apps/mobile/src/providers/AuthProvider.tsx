import {
    Dispatch,
    PropsWithChildren,
    SetStateAction,
    createContext,
    useContext,
    useEffect,
    useState
} from 'react'

import { User } from '@snacr/api'

import ErrorPage from '../components/ErrorPage'
import LoadingPage from '../components/LoadingPage'
import { api } from '../lib/api'
import { SecureStore } from '../lib/store'
import { SplashScreen, router } from 'expo-router'

interface AuthContextType {
    sessionId: string | null
    setSessionId: Dispatch<SetStateAction<string | null>>
    user: User | null
    setUser: Dispatch<SetStateAction<User | null>>
}

export const AuthContext = createContext<AuthContextType | null>(null)

export default function AuthProvider({ children }: PropsWithChildren) {
    const authVerify = api.auth.verify.useMutation()

    const [sessionId, setSessionId] = useState<string | null>(null)
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        authVerify.mutate(undefined, {
            onError: (err) => {
                console.error(err)
            },
            onSuccess: (data) => {
                if (!data) {
                    setSessionId(null)
                    setUser(null)
                    return
                }

                setSessionId(data.sessionId)
                setUser(data.user)
                router.replace('/app')
            },
            onSettled: () => {
                SplashScreen.hideAsync()
            }
        })
    }, [])

    if (authVerify.isError) return <ErrorPage message={authVerify.error.message} />

    if (authVerify.isLoading) return <LoadingPage />

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

        setAuth(null, null)
    }

    const setAuth = async (sessionId: string | null, user: User | null) => {
        ctx?.setSessionId(sessionId)
        ctx?.setUser(user)

        if (sessionId === null) {
            await SecureStore.remove('sessionId')
        } else {
            await SecureStore.save('sessionId', sessionId)
        }
    }

    return {
        logout,
        setAuth,
        sessionId: ctx?.sessionId,
        user: ctx?.user
    }
}
