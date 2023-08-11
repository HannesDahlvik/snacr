import AuthSignupForm from '~/components/auth/SignupForm'

export default function AuthSignupPage() {
    return (
        <div className="flex flex-1 flex-col justify-center items-center">
            <h2 className="mb-4">Signup</h2>

            <AuthSignupForm />
        </div>
    )
}
