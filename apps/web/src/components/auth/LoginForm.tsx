'use client'

import { useRouter } from 'next/navigation'

import { Button, Input, useToast } from '@snacr/ui-web'

import { z } from 'zod'
import { useZodForm } from '~/hooks/useZodForm'
import { api } from '~/lib/api'

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
})
type LoginSchema = z.infer<typeof loginSchema>

export default function AuthLoginForm() {
    const { toast } = useToast()
    const router = useRouter()

    const loginMutation = api.auth.login.useMutation()

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
                onError: (err) => {
                    toast({
                        title: 'Error',
                        description: err.message,
                        variant: 'destructive'
                    })
                },
                onSuccess: () => {
                    router.replace('/')
                    router.refresh()
                }
            }
        )
    }

    return (
        <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit(handleLogin)}>
            <Input
                label="Email"
                type="email"
                placeholder="name@email.com"
                required
                error={errors.email?.message}
                {...register('email')}
            />

            <Input
                label="Password"
                type="password"
                placeholder="******"
                required
                error={errors.password?.message}
                {...register('password')}
            />

            <Button type="submit">Login</Button>
        </form>
    )
}
