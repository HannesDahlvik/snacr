'use client'

import { useRouter } from 'next/navigation'

import { Button, Input } from '../ui'
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
    const signupMutation = api.auth.signup.useMutation()

    const router = useRouter()

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
                onError: (err) => console.error(err),
                onSuccess: () => {
                    router.replace('/')
                    router.refresh()
                }
            }
        )
    }

    return (
        <form className="flex flex-col" onSubmit={handleSubmit(handleSignup)}>
            <Input
                type="text"
                className="border rounded mb-2 px-2"
                placeholder="Jon Doe"
                required
                {...register('username')}
            />

            <Input
                type="email"
                className="border rounded mb-2 px-2"
                placeholder="name@email.com"
                required
                {...register('email')}
            />

            <Input
                type="password"
                className="border rounded mb-2 px-2"
                placeholder="******"
                required
                {...register('password')}
            />

            <Button type="submit">Signup</Button>
        </form>
    )
}
