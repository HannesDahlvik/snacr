'use client'

import { useRouter } from 'next/navigation'

import { z } from 'zod'
import { useZodForm } from '~/hooks/useZodForm'
import { api } from '~/lib/api'

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
})
type LoginSchema = z.infer<typeof loginSchema>

export default function AuthLoginForm() {
    const loginMutation = api.auth.login.useMutation()

    const router = useRouter()

    const {
        handleSubmit,
        register,
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
                onSuccess: () => {
                    router.refresh()
                }
            }
        )
    }

    return (
        <form className="flex flex-col" onSubmit={handleSubmit(handleLogin)}>
            <input
                type="email"
                className="border rounded mb-2 px-2"
                placeholder="name@email.com"
                required
                {...register('email')}
            />

            <input
                type="password"
                className="border rounded mb-2 px-2"
                placeholder="******"
                required
                {...register('password')}
            />

            <button type="submit">Login</button>
        </form>
    )
}
