import { Button, Text, View } from 'react-native'

import { useAuth } from '../providers/AuthProvider'
import { useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function IndexPage() {
    const router = useRouter()
    const { user } = useAuth()

    if (user) router.replace('/authed')

    return (
        <SafeAreaView className="flex flex-col items-center justify-center pt-60">
            <Text className="mb-8 text-5xl">Snacr</Text>

            <Text className="mb-4">Auth state: {user ? 'Authed' : 'Not Authed'}</Text>

            <View className="w-1/2">
                <View className="mb-2">
                    <Button title="Login" onPress={() => router.push('/auth/login')} />
                </View>

                <View className="mb-2">
                    <Button title="Signup" onPress={() => router.push('/auth/signup')} />
                </View>

                <View className="mb-2">
                    <Button title="Authed page" onPress={() => router.push('/authed')} />
                </View>
            </View>
        </SafeAreaView>
    )
}
