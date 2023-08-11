import { useEffect } from 'react'

import '../global.css'
import { getValue } from '../lib/store'
import AuthProvider from '../providers/AuthProvider'
import TrpcProvider from '../providers/TrpcProvider'
import { store } from '../stores'
import { Slot, SplashScreen } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
    useEffect(() => {
        const getSessionId = async () => {
            const sessionId = await getValue('sessionId')
            store.auth.sessionId.set(sessionId)
            SplashScreen.hideAsync()
        }
        getSessionId()
    }, [])

    return (
        <SafeAreaProvider>
            <TrpcProvider>
                <AuthProvider>
                    <StatusBar style="auto" />
                    <Slot />
                </AuthProvider>
            </TrpcProvider>
        </SafeAreaProvider>
    )
}
