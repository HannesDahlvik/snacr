'use client'

import { useRouter } from 'next/navigation'

import { Button, Input, useToast } from '@snacr/ui-web'

import { z } from 'zod'
import { useZodForm } from '~/hooks/useZodForm'
import { api } from '~/lib/api'

const signupSchema = z.object({
    username: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6)
})
type SignupSchema = z.infer<typeof signupSchema>

export default function AuthSignupForm() {
    const { toast } = useToast()
    const router = useRouter()

    const signupMutation = api.auth.signup.useMutation()

    const {
        handleSubmit,
        register,
        formState: { errors }
    } = useZodForm({
        schema: signupSchema
    })

    const handleSignup = (data: SignupSchema) => {
        signupMutation.mutate(
            {
                username: data.username,
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
        <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit(handleSignup)}>
            <Input
                label="Username"
                type="text"
                placeholder="Jon Doe"
                required
                error={errors.username?.message}
                {...register('username')}
            />

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

            <Button type="submit">Signup</Button>
        </form>
    )
}
