import { Button, Text } from 'react-native'

import { useAuth } from '../../providers/AuthProvider'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function AppProfilePage() {
    const { logout } = useAuth()

    return (
        <SafeAreaView className="flex-1 flex-col items-center justify-center gap-3">
            <Text className="mb-2">AppProfilePage</Text>

            <Button title="Logout" onPress={logout} />
        </SafeAreaView>
    )
}
