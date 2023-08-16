import Link from 'next/link'

import AuthSignupForm from '~/components/auth/SignupForm'

export default function AuthSignupPage() {
    return (
        <div className="flex flex-1 flex-col justify-center items-center w-full">
            <h2 className="mb-8">Signup</h2>

            <AuthSignupForm />

            <p className="mt-4">
                Already have an account?{' '}
                <Link className="text-blue-500" href="/login">
                    Login
                </Link>
            </p>
        </div>
    )
}
