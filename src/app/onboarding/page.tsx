import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { OnboardingFlow } from './onboarding-flow'

export default async function OnboardingPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/auth/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, target_institution')
    .eq('id', user.id)
    .single()

  // Already onboarded — skip to dashboard
  if (profile?.target_institution) {
    redirect('/dashboard')
  }

  const firstName = profile?.full_name?.split(' ')[0] ?? 'utilizator'

  return <OnboardingFlow firstName={firstName} />
}
