import { useZodForm } from '../../src/hooks/useZodForm'
import { api } from '../../src/lib/api'
import { useAuth } from '../../src/providers/AuthProvider'
import { Controller } from 'react-hook-form'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button, Text, TextField, View } from 'react-native-ui-lib'
import { z } from 'zod'

const signupSchema = z.object({
    username: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6)
})
type SignupSchema = z.infer<typeof signupSchema>

export default function SignupPage() {
    const signupMutation = api.auth.signup.useMutation()

    const { setAuth } = useAuth()

    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useZodForm({
        schema: signupSchema,
        defaultValues: {
            username: '',
            email: '',
            password: ''
        }
    })

    const handleSignup = (data: SignupSchema) => {
        signupMutation.mutate(
            {
                username: data.username,
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
        <SafeAreaView className="flex-1 flex-col items-center justify-center gap-3">
            <Text className="text-3xl">Signup</Text>

            <View>
                <Controller
                    name="username"
                    control={control}
                    rules={{
                        required: true
                    }}
                    render={({ field: { onChange } }) => (
                        <TextField
                            placeholder="Username"
                            floatingPlaceholder
                            onChangeText={onChange}
                        />
                    )}
                />

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

                <Button className="mt-3" label="Signup" onPress={handleSubmit(handleSignup)} />
            </View>
        </SafeAreaView>
    )
}
