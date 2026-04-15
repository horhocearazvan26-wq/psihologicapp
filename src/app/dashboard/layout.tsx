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
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  const profile = await getProfile(user.id)

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
