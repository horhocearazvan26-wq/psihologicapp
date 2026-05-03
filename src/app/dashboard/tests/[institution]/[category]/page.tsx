import { redirect } from 'next/navigation'

interface Props {
  params: Promise<{ institution: string; category: string }>
}

export default async function TestPage({ params }: Props) {
  const { institution: instParam, category: catParam } = await params
  redirect(`/test/${instParam.toLowerCase()}/${catParam}`)
}
