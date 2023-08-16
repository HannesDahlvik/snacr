import Link from 'next/link'

import AuthLoginForm from '~/components/auth/LoginForm'

export default function AuthLoginPage() {
    return (
        <div className="flex flex-1 flex-col justify-center items-center w-full">
            <h2 className="mb-8">Login</h2>

            <AuthLoginForm />

            <p className="mt-4">
                Dont have an account?{' '}
                <Link className="text-blue-500" href="/signup">
                    Signup
                </Link>
            </p>
        </div>
    )
}
