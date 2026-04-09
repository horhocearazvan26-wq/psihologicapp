import { AuthForm } from '@/components/auth/auth-form'

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <AuthForm mode="forgot" />
    </div>
  )
}
