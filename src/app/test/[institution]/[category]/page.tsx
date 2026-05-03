import { TestPageContent } from '@/components/tests/test-page-content'

interface Props {
  params: Promise<{ institution: string; category: string }>
}

export default async function DedicatedTestPage({ params }: Props) {
  const { institution, category } = await params

  return (
    <TestPageContent
      institutionParam={institution}
      categoryParam={category}
    />
  )
}
