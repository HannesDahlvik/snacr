import { Pressable, StatusBar } from 'react-native'

import { useAuth } from '../../src/providers/AuthProvider'
import { Link, Redirect, Slot } from 'expo-router'
import { ArrowLeft } from 'phosphor-react-native'

export default function AuthLayout() {
    const { user } = useAuth()

    if (user) {
        return <Redirect href="/app" />
    }

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
