import { Button, Text, View } from 'react-native'

import { useAuth } from '../providers/AuthProvider'
import { useRouter } from 'expo-router'

export default function AuthedPage() {
    const router = useRouter()
    const { logout, user } = useAuth()

    if (!user) router.replace('/auth/login')

    return (
        <View className="flex flex-1 justify-center items-center">
            <Text>Authed Page</Text>

            <View className="mt-2">
                <Button title="Logout" onPress={logout} />
            </View>
        </View>
    )
}
