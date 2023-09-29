import { Text, View, TextInput, Button } from 'react-native'

import { useZodForm } from '../../hooks/useZodForm'
import { api } from '../../lib/api'
import { useAuth } from '../../providers/AuthProvider'
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

    const { setAuth } = useAuth()

    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useZodForm({
        schema: loginSchema,
        defaultValues: {
            email: '',
            password: ''
        }
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
                    setAuth(res.sessionId, res.user)
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
