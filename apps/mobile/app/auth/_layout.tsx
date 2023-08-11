import { Pressable, StatusBar } from 'react-native'

import { useAuth } from '../../providers/AuthProvider'
import { Link, Slot, useRouter } from 'expo-router'
import { ArrowLeft } from 'phosphor-react-native'

export default function AuthLayout() {
    const router = useRouter()
    const { user } = useAuth()

    if (user) router.replace('/authed')

    return (
        <>
            <Slot />

            <Link
                style={{
                    top: StatusBar.currentHeight ? StatusBar.currentHeight + 24 : 60
                }}
                className="absolute left-6"
                href="/"
                asChild
            >
                <Pressable>
                    <ArrowLeft weight="bold" />
                </Pressable>
            </Link>
        </>
    )
}
