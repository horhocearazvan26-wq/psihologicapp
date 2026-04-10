import { AuthForm } from '@/components/auth/auth-form'

export default function ForgotPasswordPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[var(--bg-base)] px-4 py-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.16),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(56,189,248,0.12),transparent_28%)] dark:bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.22),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.12),transparent_28%)]" />
      <AuthForm mode="forgot" />
    </div>
  )
}
