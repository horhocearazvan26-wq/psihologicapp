'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { signInWithEmail, signUpWithEmail, signInWithGoogle, resetPassword } from '@/app/auth/actions'

type AuthMode = 'login' | 'register' | 'forgot'

interface AuthFormProps {
  mode: AuthMode
}

export function AuthForm({ mode }: AuthFormProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)

    const formData = new FormData(event.currentTarget)

    try {
      if (mode === 'login') {
        const result = await signInWithEmail(formData)
        if (result?.error) setError(result.error)
      } else if (mode === 'register') {
        const result = await signUpWithEmail(formData)
        if (result?.error) setError(result.error)
        else if (result?.success) setSuccess(result.success)
      } else if (mode === 'forgot') {
        const result = await resetPassword(formData)
        if (result?.error) setError(result.error)
        else if (result?.success) setSuccess(result.success)
      }
    } catch {
      // redirect() from server action triggers navigation
    } finally {
      setLoading(false)
    }
  }

  async function handleGoogleSignIn() {
    setLoading(true)
    setError(null)
    const result = await signInWithGoogle()
    if (result?.error) {
      setError(result.error)
      setLoading(false)
    } else if (result?.url) {
      window.location.href = result.url
    }
  }

  return (
    <div className="w-full max-w-md">
      {/* Logo */}
      <div className="text-center mb-8">
        <Link href="/" className="inline-flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-lg">P</span>
          </div>
          <span className="text-xl font-bold text-slate-800">PsihologicApp</span>
        </Link>
        <h1 className="mt-6 text-2xl font-bold text-slate-900">
          {mode === 'login' && 'Intră în cont'}
          {mode === 'register' && 'Creează cont gratuit'}
          {mode === 'forgot' && 'Resetare parolă'}
        </h1>
        <p className="mt-2 text-slate-500 text-sm">
          {mode === 'login' && 'Bun venit înapoi!'}
          {mode === 'register' && 'Începe pregătirea ta astăzi'}
          {mode === 'forgot' && 'Îți vom trimite un link de resetare'}
        </p>
      </div>

      {/* Google Sign In (not for forgot) */}
      {mode !== 'forgot' && (
        <>
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 py-2.5 px-4 border border-slate-200 rounded-xl bg-white hover:bg-slate-50 transition-colors text-sm font-medium text-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continuă cu Google
          </button>

          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-xs text-slate-400 font-medium">sau cu email</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>
        </>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === 'register' && (
          <Input
            label="Nume complet"
            name="full_name"
            type="text"
            placeholder="Ion Popescu"
            required
            autoComplete="name"
          />
        )}
        <Input
          label="Adresă email"
          name="email"
          type="email"
          placeholder="ion@exemplu.ro"
          required
          autoComplete="email"
        />
        {mode !== 'forgot' && (
          <Input
            label="Parolă"
            name="password"
            type="password"
            placeholder="Minim 8 caractere"
            required
            minLength={8}
            autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
          />
        )}

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
            {error}
          </div>
        )}
        {success && (
          <div className="p-3 bg-green-50 border border-green-200 rounded-xl text-sm text-green-700">
            {success}
          </div>
        )}

        {mode === 'login' && (
          <div className="flex justify-end">
            <Link href="/auth/forgot-password" className="text-sm text-blue-600 hover:underline">
              Ai uitat parola?
            </Link>
          </div>
        )}

        <Button type="submit" size="lg" loading={loading} className="w-full">
          {mode === 'login' && 'Intră în cont'}
          {mode === 'register' && 'Creează cont'}
          {mode === 'forgot' && 'Trimite link de resetare'}
        </Button>
      </form>

      {/* Footer links */}
      <p className="text-center text-sm text-slate-500 mt-6">
        {mode === 'login' ? (
          <>Nu ai cont?{' '}
            <Link href="/auth/register" className="text-blue-600 font-medium hover:underline">
              Înregistrează-te gratuit
            </Link>
          </>
        ) : mode === 'register' ? (
          <>Ai deja cont?{' '}
            <Link href="/auth/login" className="text-blue-600 font-medium hover:underline">
              Intră în cont
            </Link>
          </>
        ) : (
          <Link href="/auth/login" className="text-blue-600 font-medium hover:underline">
            Înapoi la login
          </Link>
        )}
      </p>
    </div>
  )
}
