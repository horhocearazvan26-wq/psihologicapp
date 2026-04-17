'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

function normalizeRedirectPath(input: string | null | undefined) {
  if (!input || !input.startsWith('/')) return null
  if (input.startsWith('//')) return null
  return input
}

export async function signInWithEmail(formData: FormData) {
  const supabase = await createClient()
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const redirectTo = normalizeRedirectPath(formData.get('redirectTo') as string | null)

  const { data: { user }, error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    return { error: error.message }
  }

  // Skip the /onboarding round-trip for returning users
  const { data: profile } = await supabase
    .from('profiles')
    .select('target_institution')
    .eq('id', user!.id)
    .single()

  if (profile?.target_institution) {
    redirect(redirectTo ?? '/dashboard')
  }

  redirect('/onboarding')
}

export async function signUpWithEmail(formData: FormData) {
  const supabase = await createClient()
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const fullName = formData.get('full_name') as string

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName },
      emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
    },
  })

  if (error) {
    return { error: error.message }
  }

  // If auto-confirmed (no email verification), redirect directly to onboarding
  // If email confirmation is required, show success message
  const { data: { session } } = await supabase.auth.getSession()
  if (session) {
    redirect('/onboarding')
  }

  return { success: 'Verifică-ți emailul pentru a confirma contul.' }
}

export async function signInWithGoogle(redirectTo?: string) {
  const supabase = await createClient()
  const next = normalizeRedirectPath(redirectTo)
  const callbackUrl = new URL('/auth/callback', process.env.NEXT_PUBLIC_APP_URL)

  if (next) {
    callbackUrl.searchParams.set('next', next)
  }

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: callbackUrl.toString(),
    },
  })

  if (error) {
    return { error: error.message }
  }

  return { url: data.url }
}

export async function resetPassword(formData: FormData) {
  const supabase = await createClient()
  const email = formData.get('email') as string

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password`,
  })

  if (error) {
    return { error: error.message }
  }

  return { success: 'Email de resetare trimis. Verifică-ți inbox-ul.' }
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/')
}
