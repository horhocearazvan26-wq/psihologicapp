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

  // Read user ID from cookie (unverified) so we can fire the profile DB query
  // at the same time as getUser() verifies the token — cuts layout time in half.
  const { data: { session: cookieSession } } = await supabase.auth.getSession()
  const tentativeId = cookieSession?.user?.id

  const [{ data: { user } }, profile] = await Promise.all([
    supabase.auth.getUser(),
    tentativeId ? getProfile(tentativeId) : Promise.resolve(null),
  ])

  if (!user) {
    redirect('/auth/login')
  }

  const userProfile: UserProfile = profile ?? {
    id: user.id,
    email: user.email!,
    full_name: user.user_metadata?.full_name ?? null,
    avatar_url: user.user_metadata?.avatar_url ?? null,
    subscription_plan: 'free',
    subscribed_institution: null,
    created_at: user.created_at,
  }

  return <DashboardShell user={userProfile}>{children}</DashboardShell>
}
