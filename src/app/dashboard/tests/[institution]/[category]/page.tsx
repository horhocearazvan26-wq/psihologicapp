import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { MCQTestEngine } from '@/components/tests/cas/MCQTestEngine'
import { MemoireLucruTest } from '@/components/tests/cas/MemoireLucruTest'
import { InhibitieCognitivaTest } from '@/components/tests/cas/InhibitieCognitivaTest'
import { ComutareAtentieTest } from '@/components/tests/cas/ComutareAtentieTest'
import { CATEGORY_LABELS, INSTITUTION_LABELS } from '@/lib/utils'
import type { Institution, TestCategory } from '@/types'

interface Props {
  params: Promise<{ institution: string; category: string }>
}

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

const INTERACTIVE_CATEGORIES: TestCategory[] = ['memorie-lucru', 'inhibitie-cognitiva', 'comutare-atentie']

export default async function TestPage({ params }: Props) {
  const { institution: instParam, category: catParam } = await params

  const institution = instParam.toUpperCase() as Institution
  const category = catParam as TestCategory

  if (!VALID_INSTITUTIONS.includes(institution) || !VALID_CATEGORIES.includes(category)) {
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

  const institutionLabel = INSTITUTION_LABELS[institution]
  const categoryLabel = CATEGORY_LABELS[category]

  if (category === 'memorie-lucru') {
    return <MemoireLucruTest institutionLabel={institutionLabel} />
  }

  if (category === 'inhibitie-cognitiva') {
    return <InhibitieCognitivaTest institutionLabel={institutionLabel} />
  }

  if (category === 'comutare-atentie') {
    return <ComutareAtentieTest institutionLabel={institutionLabel} />
  }

  return (
    <MCQTestEngine
      institution={institution}
      category={category}
      isFullAccess={isFullAccess}
      institutionLabel={institutionLabel}
      categoryLabel={categoryLabel}
    />
  )
}

void INTERACTIVE_CATEGORIES
