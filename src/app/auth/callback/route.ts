import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

function normalizeRedirectPath(input: string | null) {
  if (!input || !input.startsWith('/')) return '/onboarding'
  if (input.startsWith('//')) return '/onboarding'
  return input
}

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = normalizeRedirectPath(searchParams.get('next'))
  const base = process.env.NEXT_PUBLIC_APP_URL ?? origin

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      return NextResponse.redirect(`${base}${next}`)
    }
  }

  return NextResponse.redirect(`${base}/auth/login?error=auth_error`)
}
