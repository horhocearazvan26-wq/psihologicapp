import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { AttentionSelector } from '@/components/tests/attention-selector'
import { INSTITUTION_LABELS } from '@/lib/utils'
import type { Institution } from '@/types'

interface Props {
  params: Promise<{ institution: string }>
}

export default async function AttentionPage({ params }: Props) {
  const { institution: instParam } = await params
  const institution = instParam.toUpperCase() as Institution

  const validInstitutions = ['MAI', 'MApN', 'SRI', 'ANP']
  if (!validInstitutions.includes(institution)) redirect('/dashboard/tests')

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: profile } = await supabase
    .from('profiles')
    .select('subscription_plan, subscribed_institution')
    .eq('id', user!.id)
    .single()

  const isFullAccess =
    profile?.subscription_plan === 'all_institutions' ||
    (profile?.subscription_plan === 'one_institution' &&
      profile?.subscribed_institution === institution)

  return (
    <AttentionSelector
      institution={institution}
      institutionLabel={INSTITUTION_LABELS[institution]}
      isFullAccess={isFullAccess}
    />
  )
}
