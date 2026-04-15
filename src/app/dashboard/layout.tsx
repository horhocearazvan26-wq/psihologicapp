import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getProfile } from '@/lib/supabase/queries'
import { DashboardShell } from '@/components/dashboard/dashboard-shell'
import type { UserProfile } from '@/types'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  // getSession() reads from the already-validated cookie (0ms, no network call).
  // Middleware already ran getUser() to refresh/validate the token.
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    redirect('/auth/login')
  }

  const profile = await getProfile(session.user.id)

  const userProfile: UserProfile = profile ?? {
    id: session.user.id,
    email: session.user.email!,
    full_name: session.user.user_metadata?.full_name ?? null,
    avatar_url: session.user.user_metadata?.avatar_url ?? null,
    subscription_plan: 'free',
    subscribed_institution: null,
    created_at: session.user.created_at,
  }

  return <DashboardShell user={userProfile}>{children}</DashboardShell>
}
