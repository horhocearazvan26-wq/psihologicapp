import { createClient } from '@/lib/supabase/server'
import { DashboardClient } from '@/components/dashboard/dashboard-client'

function getDaysUntilExam(examDate: string | null): number | null {
  if (!examDate) return null
  const diff = new Date(examDate).getTime() - Date.now()
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user!.id).single()
  const { data: recentSessions } = await supabase
    .from('test_sessions').select('*').eq('user_id', user!.id).eq('completed', true)
    .order('completed_at', { ascending: false }).limit(10)
  const { data: progressData } = await supabase.from('user_progress').select('*').eq('user_id', user!.id)

  const totalTests = progressData?.reduce((s, p) => s + p.tests_taken, 0) ?? 0
  const avgScore = progressData?.length
    ? progressData.reduce((s, p) => s + p.average_score, 0) / progressData.length
    : 0
  const bestScore = progressData?.length
    ? Math.max(...progressData.map(p => Number(p.best_score)))
    : 0

  const firstName = profile?.full_name?.split(' ')[0] ?? 'utilizator'
  const daysUntil = getDaysUntilExam(profile?.exam_date ?? null)

  return (
    <DashboardClient
      firstName={firstName}
      totalTests={totalTests}
      avgScore={avgScore}
      bestScore={bestScore}
      subscriptionPlan={profile?.subscription_plan ?? 'free'}
      progressData={progressData ?? []}
      recentSessions={recentSessions ?? []}
      daysUntil={daysUntil}
    />
  )
}
