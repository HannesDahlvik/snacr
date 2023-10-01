import { useZodForm } from '../../src/hooks/useZodForm'
import { api } from '../../src/lib/api'
import { useAuth } from '../../src/providers/AuthProvider'
import { Controller } from 'react-hook-form'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button, Text, TextField, View } from 'react-native-ui-lib'
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

            <View>
                <Controller
                    name="email"
                    control={control}
                    rules={{
                        required: true
                    }}
                    render={({ field: { onChange } }) => (
                        <TextField
                            placeholder="Email"
                            floatingPlaceholder
                            onChangeText={onChange}
                        />
                    )}
                />

                <Controller
                    name="password"
                    control={control}
                    rules={{
                        required: true
                    }}
                    render={({ field: { onChange } }) => (
                        <TextField
                            placeholder="Password"
                            floatingPlaceholder
                            secureTextEntry
                            onChangeText={onChange}
                        />
                    )}
                />

                <Button className="mt-3" label="Login" onPress={handleSubmit(handleLogin)} />
            </View>
        </SafeAreaView>
    )
}
