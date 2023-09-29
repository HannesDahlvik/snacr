import { useAuth } from '../../providers/AuthProvider'
import { Redirect, Slot } from 'expo-router'

export default function AppLayout() {
    const { user } = useAuth()

    if (!user) {
        return <Redirect href="/" />
    }

    return (
        <>
            <Slot />
        </>
    )
}
