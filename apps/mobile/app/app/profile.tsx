import { useAuth } from '../../src/providers/AuthProvider'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button, Text } from 'react-native-ui-lib'

export default function AppProfilePage() {
    const { logout } = useAuth()

    return (
        <SafeAreaView className="flex-1 flex-col items-center justify-center gap-3">
            <Text className="mb-2">AppProfilePage</Text>

            <Button label="Logout" onPress={logout} />
        </SafeAreaView>
    )
}
