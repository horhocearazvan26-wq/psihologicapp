import { createClient, getRequiredUser } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { MCQTestEngine } from '@/components/tests/cas/MCQTestEngine'
import { MemoireLucruTest } from '@/components/tests/cas/MemoireLucruTest'
import { InhibitieCognitivaTest } from '@/components/tests/cas/InhibitieCognitivaTest'
import { ComutareAtentieTest } from '@/components/tests/cas/ComutareAtentieTest'
import { CATEGORY_LABELS, INSTITUTION_LABELS, normalizeInstitutionParam } from '@/lib/utils'
import type { TestCategory } from '@/types'

const VALID_INSTITUTIONS = ['MAI', 'MApN', 'SRI', 'ANP']
const VALID_CATEGORIES: TestCategory[] = [
  'rationament-analitic',
  'transfer-analogic',
  'vocabular',
  'intelegere-texte',
  'rationament-matematic',
  'calcul-matematic',
  'memorie-lucru',
  'inhibitie-cognitiva',
  'comutare-atentie',
]

export async function TestPageContent({
  institutionParam,
  categoryParam,
}: {
  institutionParam: string
  categoryParam: string
}) {
  const institution = normalizeInstitutionParam(institutionParam)
  const category = categoryParam as TestCategory

  if (!institution || !VALID_INSTITUTIONS.includes(institution) || !VALID_CATEGORIES.includes(category)) {
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

  const institutionLabel = INSTITUTION_LABELS[institution]
  const categoryLabel = CATEGORY_LABELS[category]

  if (category === 'memorie-lucru') {
    return (
      <MemoireLucruTest
        institutionLabel={institutionLabel}
        backHref="/dashboard/tests"
      />
    )
  }

  if (category === 'inhibitie-cognitiva') {
    return (
      <InhibitieCognitivaTest
        institutionLabel={institutionLabel}
        backHref="/dashboard/tests"
      />
    )
  }

  if (category === 'comutare-atentie') {
    return (
      <ComutareAtentieTest
        institutionLabel={institutionLabel}
        backHref="/dashboard/tests"
      />
    )
  }

  return (
    <MCQTestEngine
      institution={institution}
      category={category}
      isFullAccess={isFullAccess}
      institutionLabel={institutionLabel}
      categoryLabel={categoryLabel}
      backHref="/dashboard/tests"
    />
  )
}
