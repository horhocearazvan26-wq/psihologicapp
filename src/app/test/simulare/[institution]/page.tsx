import { createClient, getRequiredUser } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { normalizeInstitutionParam } from '@/lib/utils'
import { SimulationRunner } from '@/app/dashboard/simulate/simulation-runner'

interface Props {
  params: Promise<{ institution: string }>
}

export default async function DedicatedSimulationPage({ params }: Props) {
  const { institution: institutionParam } = await params
  const institution = normalizeInstitutionParam(institutionParam)

  if (!institution) {
    redirect('/dashboard/simulate')
  }

  const user = await getRequiredUser('/auth/login')
  const supabase = await createClient()
  const { data: profile } = await supabase
    .from('profiles')
    .select('subscription_plan, subscribed_institution')
    .eq('id', user.id)
    .single()

  const hasAccess =
    profile?.subscription_plan === 'all_institutions' ||
    (profile?.subscription_plan === 'one_institution' &&
      profile?.subscribed_institution === institution)

  if (!hasAccess) {
    redirect('/dashboard/pricing')
  }

  return <SimulationRunner institution={institution} backHref="/test/simulare" />
}
