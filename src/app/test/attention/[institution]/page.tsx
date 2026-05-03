import { createClient, getRequiredUser } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { AttentionSelector } from '@/components/tests/attention-selector'
import { INSTITUTION_LABELS, normalizeInstitutionParam } from '@/lib/utils'

interface Props {
  params: Promise<{ institution: string }>
}

export default async function DedicatedAttentionPage({ params }: Props) {
  const { institution: institutionParam } = await params
  const institution = normalizeInstitutionParam(institutionParam)

  if (!institution) {
    redirect('/dashboard/tests')
  }

  const user = await getRequiredUser('/auth/login')
  const supabase = await createClient()
  const { data: profile } = await supabase
    .from('profiles')
    .select('subscription_plan, subscribed_institution')
    .eq('id', user.id)
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
