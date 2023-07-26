'use client'

import { api } from '~/lib/api'

export default function Auth() {
    const loginMutation = api.auth.login.useMutation()
    const signupMutation = api.auth.signup.useMutation()
    const logoutMutation = api.auth.logout.useMutation()

    const handleLogin = () => {
        loginMutation.mutate(
            {
                email: 'test@test.com',
                password: 'test123'
            },
            {
                onError: (err) => console.error(err),
                onSuccess: (data) => console.log(data)
            }
        )
    }

    const handleSignup = () => {
        signupMutation.mutate(
            {
                email: 'test@test.com',
                password: 'test123',
                username: 'tester'
            },
            {
                onError: (err) => console.error(err),
                onSuccess: (data) => console.log(data)
            }
        )
    }

    const handleLogout = () => {
        logoutMutation.mutate(undefined, {
            onError: (err) => console.error(err),
            onSuccess: (data) => console.log(data)
        })
    }

    return (
        <div className="flex flex-col gap-4 w-32 mt-4">
            <button onClick={handleLogin}>Login</button>
            <button onClick={handleSignup}>Signup</button>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}
