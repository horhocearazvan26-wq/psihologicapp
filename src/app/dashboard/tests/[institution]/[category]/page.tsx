import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { TestEngine } from '@/components/tests/test-engine'
import { CATEGORY_LABELS, INSTITUTION_LABELS } from '@/lib/utils'
import type { Institution, TestCategory } from '@/types'

interface Props {
  params: Promise<{ institution: string; category: string }>
}

export default async function TestPage({ params }: Props) {
  const { institution: instParam, category: catParam } = await params

  const institution = instParam.toUpperCase() as Institution
  const category = catParam as TestCategory

  const validInstitutions = ['MAI', 'MApN', 'SRI', 'ANP']
  const validCategories = ['attention', 'logic', 'memory', 'numerical', 'vocabulary', 'personality']

  if (!validInstitutions.includes(institution) || !validCategories.includes(category)) {
    redirect('/dashboard/tests')
  }

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
    <TestEngine
      institution={institution}
      category={category}
      isFullAccess={isFullAccess}
      institutionLabel={INSTITUTION_LABELS[institution]}
      categoryLabel={CATEGORY_LABELS[category]}
    />
  )
}
