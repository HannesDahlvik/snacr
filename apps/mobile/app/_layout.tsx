import '../global.css'
import TrpcProvider from '../providers/TrpcProvider'
import { Slot } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

export default function RootLayout() {
    return (
        <TrpcProvider>
            <StatusBar style="auto" />
            <Slot />
        </TrpcProvider>
    )
}
