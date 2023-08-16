'use client'

import { useRouter } from 'next/navigation'

import { Button, Input } from '../ui'
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
                    router.replace('/')
                    router.refresh()
                }
            }
        )
    }

    return (
        <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit(handleLogin)}>
            <Input type="email" placeholder="name@email.com" required {...register('email')} />

            <Input type="password" placeholder="******" required {...register('password')} />

            <Button type="submit">Login</Button>
        </form>
    )
}
