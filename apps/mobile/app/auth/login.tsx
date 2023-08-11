import { Text, View, TextInput, Button } from 'react-native'

import { useZodForm } from '../../hooks/useZodForm'
import { api } from '../../lib/api'
import { save } from '../../lib/store'
import { useAuth } from '../../providers/AuthProvider'
import { store } from '../../stores'
import { useHookstate } from '@hookstate/core'
import { Controller } from 'react-hook-form'
import { SafeAreaView } from 'react-native-safe-area-context'
import { z } from 'zod'

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
})
type LoginSchema = z.infer<typeof loginSchema>

export default function LoginPage() {
    const loginMutation = api.auth.login.useMutation()

    const { setSessionId, setUser } = useAuth()
    const authSessionId = useHookstate(store.auth.sessionId)

    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useZodForm({
        schema: loginSchema
    })

    const handleLogin = (data: LoginSchema) => {
        loginMutation.mutate(
            {
                email: data.email,
                password: data.password
            },
            {
                onError: (err) => console.error(err),
                onSuccess: async (res) => {
                    if (setSessionId && setUser) {
                        setSessionId(res.sessionId)
                        setUser(res.user)
                    }
                    await save('sessionId', res)
                    authSessionId.set(res)
                }
            }
        )
    }

    return (
        <SafeAreaView className="flex-1 flex-col justify-center items-center">
            <Text className="mb-4 text-3xl">Login</Text>

            <View className="flex flex-col">
                <Controller
                    name="email"
                    control={control}
                    rules={{
                        required: true
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            className="border rounded mb-2 px-2"
                            placeholder="name@email.com"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />

                <Controller
                    name="password"
                    control={control}
                    rules={{
                        required: true
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            className="border rounded mb-2 px-2"
                            placeholder="******"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />

                <Button title="Login" onPress={handleSubmit(handleLogin)} />
            </View>
        </SafeAreaView>
    )
}
