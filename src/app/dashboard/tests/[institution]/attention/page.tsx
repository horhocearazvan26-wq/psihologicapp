import { redirect } from 'next/navigation'
import { normalizeInstitutionParam } from '@/lib/utils'
interface Props {
  params: Promise<{ institution: string }>
}

export default async function AttentionPage({ params }: Props) {
  const { institution: instParam } = await params
  const institution = normalizeInstitutionParam(instParam)

  if (!institution) redirect('/dashboard/tests')
  redirect(`/test/attention/${instParam.toLowerCase()}`)
}
