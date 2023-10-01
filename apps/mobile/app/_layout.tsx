import '../global.css'
import AuthProvider from '../src/providers/AuthProvider'
import TrpcProvider from '../src/providers/TrpcProvider'
import { Slot, SplashScreen } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
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
