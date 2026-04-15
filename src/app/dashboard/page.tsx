import { Suspense } from 'react'
import { createClient } from '@/lib/supabase/server'
import { getProfile } from '@/lib/supabase/queries'
import { DashboardClient } from '@/components/dashboard/dashboard-client'

function getDaysUntilExam(examDate: string | null): number | null {
  if (!examDate) return null
  const diff = new Date(examDate).getTime() - Date.now()
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="h-44 rounded-3xl bg-white/5 animate-pulse" />
      <div className="grid grid-cols-3 gap-3">
        <div className="h-28 rounded-2xl bg-white/5 animate-pulse" />
        <div className="h-28 rounded-2xl bg-white/5 animate-pulse" />
        <div className="h-28 rounded-2xl bg-white/5 animate-pulse" />
      </div>
      <div className="space-y-2">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-16 rounded-2xl bg-white/5 animate-pulse" />
        ))}
      </div>
    </div>
  )
}

async function DashboardContent() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const [profile, { data: recentSessions }, { data: progressData }] = await Promise.all([
    getProfile(user!.id),   // returns cached result — no extra DB call
    supabase.from('test_sessions').select('*').eq('user_id', user!.id).eq('completed', true)
      .order('completed_at', { ascending: false }).limit(10),
    supabase.from('user_progress').select('*').eq('user_id', user!.id),
  ])

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
      initialInstitution={
        profile?.subscribed_institution ??
        profile?.target_institution ??
        null
      }
    />
  )
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardContent />
    </Suspense>
  )
}
