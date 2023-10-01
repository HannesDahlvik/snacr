import { SafeAreaView } from 'react-native-safe-area-context'
import { Text } from 'react-native-ui-lib'

interface Props {
    message?: string
}

export default function ErrorPage({ message = 'Unknown error' }: Props) {
    return (
        <SafeAreaView className="flex-1 flex-col items-center justify-center gap-3">
            <Text className="text-3xl font-bold">There was an error</Text>

            <Text>{message}</Text>
        </SafeAreaView>
    )
}
