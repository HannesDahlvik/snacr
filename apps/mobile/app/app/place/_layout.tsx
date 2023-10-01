import { Stack } from 'expo-router'

export default function AppPlaceLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="[url]"
                options={{
                    headerShown: false
                }}
            />
        </Stack>
    )
}
