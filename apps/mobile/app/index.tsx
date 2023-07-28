import { Button, Text, View } from 'react-native'

import { api } from '../lib/api'

export default function IndexPage() {
    const test = api.test.useQuery(undefined, {
        enabled: false
    })

    if (test.isError)
        return (
            <View className="flex-1 flex-col items-center justify-center gap-3 bg-white">
                <Text>{test.error.message}</Text>
            </View>
        )

    return (
        <View className="flex-1 flex-col items-center justify-center gap-3 bg-white">
            <Button
                title="Fetch"
                disabled={test.status === 'success'}
                onPress={() => test.refetch()}
            />

            <Text>Test: {test.data}</Text>
        </View>
    )
}
