'use client'

import { useRouter } from 'next/navigation'

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
                    router.refresh()
                }
            }
        )
    }

    return (
        <form className="flex flex-col" onSubmit={handleSubmit(handleSignup)}>
            <input
                type="text"
                className="border rounded mb-2 px-2"
                placeholder="Jon Doe"
                required
            />

            <input
                type="email"
                className="border rounded mb-2 px-2"
                placeholder="name@email.com"
                required
            />

            <input
                type="password"
                className="border rounded mb-2 px-2"
                placeholder="******"
                required
            />

            <button type="submit">Signup</button>
        </form>
    )
}
