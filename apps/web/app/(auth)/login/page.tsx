import AuthLoginForm from '~/components/auth/LoginForm'

export default function AuthLoginPage() {
    return (
        <div className="flex flex-1 flex-col justify-center items-center">
            <h2 className="mb-4">Login</h2>

            <AuthLoginForm />
        </div>
    )
}
