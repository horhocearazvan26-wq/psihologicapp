import { redirect } from 'next/navigation'

interface Props {
  params: Promise<{ institution: string; category: string }>
}

export default async function DedicatedTestRunPage({ params }: Props) {
  const { institution, category } = await params
  redirect(`/test/${institution}/${category}`)
}
