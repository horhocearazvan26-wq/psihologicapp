import { Suspense } from 'react'
import { createClient } from '@/lib/supabase/server'
import {
  INSTITUTION_LABELS,
  CATEGORY_LABELS,
  CATEGORY_SHORT_LABELS,
  getScoreColor,
} from '@/lib/utils'
import type { Institution, TestCategory } from '@/types'
import { ProgressCharts } from './progress-charts'
import { TrendingUp, Trophy, BookOpen, Clock } from 'lucide-react'
import { CategoryIcon } from '@/components/ui/category-icon'
import { IconBadge } from '@/components/ui/icon-badge'

const institutions: Institution[] = ['MAI', 'MApN', 'SRI', 'ANP']
const categories: TestCategory[] = ['attention', 'logic', 'memory', 'numerical', 'vocabulary', 'personality']

function ProgressSkeleton() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <div className="h-3 w-20 rounded skeleton mb-2" />
        <div className="h-8 w-40 rounded-lg skeleton mb-1.5" />
        <div className="h-4 w-56 rounded skeleton" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => <div key={i} className="h-24 rounded-2xl skeleton" />)}
      </div>
      <div className="h-64 rounded-2xl skeleton" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => <div key={i} className="h-28 rounded-2xl skeleton" />)}
      </div>
    </div>
  )
}

async function ProgressContent() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: progressData } = await supabase
    .from('user_progress').select('*').eq('user_id', user!.id)

  const { data: sessions } = await supabase
    .from('test_sessions').select('*').eq('user_id', user!.id)
    .eq('completed', true).order('completed_at', { ascending: false }).limit(30)

  const totalTests = progressData?.reduce((sum, p) => sum + p.tests_taken, 0) ?? 0
  const avgScore = progressData && progressData.length > 0
    ? progressData.reduce((sum, p) => sum + Number(p.average_score), 0) / progressData.length
    : 0
  const bestScore = progressData && progressData.length > 0
    ? Math.max(...progressData.map(p => Number(p.best_score)))
    : 0

  const chartSessions = (sessions ?? []).slice(0, 14).reverse().map((s, i) => ({
    label: `#${i + 1}`,
    score: Math.round(s.score ?? 0),
    date: new Date(s.completed_at).toLocaleDateString('ro-RO', { day: 'numeric', month: 'short' }),
  }))

  const categoryAverages = categories.map((cat) => {
    const catProgress = progressData?.filter(p => p.category === cat) ?? []
    const avg = catProgress.length > 0
      ? catProgress.reduce((s, p) => s + p.average_score, 0) / catProgress.length
      : 0
    return { category: CATEGORY_LABELS[cat], score: Math.round(avg), icon: CATEGORY_SHORT_LABELS[cat] }
  }).filter(c => c.score > 0)

  function getProgress(institution: Institution, category: TestCategory) {
    return progressData?.find(p => p.institution === institution && p.category === category)
  }

  return (
    <div className="space-y-8 animate-fade-up">
      <div>
        <p className="text-[10px] font-bold tracking-widest uppercase mb-2" style={{ color: 'var(--text-muted)' }}>Statistici</p>
        <h1 className="text-2xl font-extrabold tracking-tight" style={{ color: 'var(--text-primary)' }}>Progresul meu</h1>
        <p className="mt-1.5 text-sm" style={{ color: 'var(--text-secondary)' }}>Urmărește evoluția ta în timp</p>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { icon: BookOpen,   label: 'Teste completate',  value: totalTests.toString(),                           iconBg: 'bg-blue-500/10',    iconColor: 'text-blue-400',   topBar: 'from-blue-500 to-blue-400' },
          { icon: TrendingUp, label: 'Scor mediu',         value: avgScore > 0 ? `${avgScore.toFixed(1)}%` : '—', iconBg: 'bg-emerald-500/10', iconColor: 'text-emerald-400',topBar: 'from-emerald-500 to-emerald-400' },
          { icon: Trophy,     label: 'Cel mai bun scor',   value: bestScore > 0 ? `${bestScore.toFixed(0)}%` : '—',iconBg: 'bg-amber-500/10',   iconColor: 'text-amber-400',  topBar: 'from-amber-500 to-amber-400' },
          { icon: Clock,      label: 'Sesiuni recente',    value: (sessions?.length ?? 0).toString(),             iconBg: 'bg-violet-500/10',  iconColor: 'text-violet-400', topBar: 'from-violet-500 to-violet-400' },
        ].map(({ icon: Icon, label, value, topBar }) => (
          <div key={label} className="relative dash-card overflow-hidden rounded-2xl p-5">
            <div className={`absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r ${topBar} opacity-60`} />
            <IconBadge icon={Icon} className="mb-3 h-10 w-10 rounded-xl bg-[var(--bg-muted)] text-[var(--text-primary)]" iconClassName="h-5 w-5 text-[var(--text-primary)]" />
            <p className="text-2xl font-extrabold leading-none tracking-tight" style={{ color: 'var(--text-primary)' }}>{value}</p>
            <p className="text-xs mt-1.5 font-medium" style={{ color: 'var(--text-muted)' }}>{label}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      {totalTests > 0 && (
        <ProgressCharts chartSessions={chartSessions} categoryAverages={categoryAverages} />
      )}

      {/* Progress per institution */}
      {institutions.map((inst) => {
        const instProgress = progressData?.filter(p => p.institution === inst) ?? []
        if (instProgress.length === 0) return null
        const instAvg = instProgress.reduce((s, p) => s + p.average_score, 0) / instProgress.length

        return (
          <div key={inst}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-[var(--text-primary)]">{INSTITUTION_LABELS[inst]}</h2>
              <span className={`text-sm font-extrabold ${getScoreColor(instAvg)}`}>
                Medie: {instAvg.toFixed(0)}%
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((cat) => {
                const p = getProgress(inst, cat)
                if (!p) return null
                return (
                  <div key={cat} className="bg-[var(--bg-surface)] rounded-2xl border border-[var(--border)] shadow-sm p-5 hover:border-[var(--border-strong)] hover:shadow-md transition-all duration-200">
                    <div className="flex items-center gap-3 mb-3">
                      <CategoryIcon category={cat} className="h-9 w-9 rounded-xl bg-[var(--bg-muted)] text-[var(--text-primary)]" iconClassName="h-4 w-4 text-[var(--text-primary)]" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-[var(--text-primary)] truncate">{CATEGORY_LABELS[cat]}</p>
                        <p className="text-xs text-[var(--text-muted)]">{p.tests_taken} teste</p>
                      </div>
                      <span className={`font-extrabold text-sm shrink-0 ${getScoreColor(p.average_score)}`}>
                        {Number(p.average_score).toFixed(0)}%
                      </span>
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs text-[var(--text-muted)]">
                        <span>Medie</span>
                        <span>Best: {Number(p.best_score).toFixed(0)}%</span>
                      </div>
                      <div className="w-full bg-[var(--bg-muted)] rounded-full h-1.5">
                        <div
                          className="h-1.5 rounded-full transition-all"
                          style={{
                            width: `${Math.min(p.average_score, 100)}%`,
                            background: p.average_score >= 80 ? '#16a34a' : p.average_score >= 60 ? '#d97706' : '#dc2626',
                          }}
                        />
                      </div>
                      <div className="w-full bg-[var(--bg-muted)] rounded-full h-1">
                        <div
                          className="bg-[var(--border-strong)] h-1 rounded-full"
                          style={{ width: `${Math.min(p.best_score, 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}

      {/* Empty state */}
      {totalTests === 0 && (
        <div className="dash-card rounded-2xl p-16 text-center">
          <IconBadge icon={TrendingUp} className="mx-auto mb-4 h-14 w-14 rounded-2xl bg-[var(--bg-muted)] text-[var(--text-primary)]" iconClassName="h-7 w-7 text-[var(--text-primary)]" />
          <h3 className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>Niciun test completat încă</h3>
          <p className="text-sm mt-2 max-w-sm mx-auto" style={{ color: 'var(--text-muted)' }}>
            Completează primul test pentru a vedea statisticile și graficele tale aici.
          </p>
        </div>
      )}

      {/* Session history */}
      {sessions && sessions.length > 0 && (
        <div>
          <h2 className="text-sm font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Istoric sesiuni</h2>
          <div className="dash-card rounded-2xl overflow-hidden">
            {sessions.map((session, i) => (
              <div
                key={session.id}
                className={`flex items-center gap-3 px-5 py-3.5 transition-colors hover:bg-white/[0.02] ${i < sessions.length - 1 ? 'border-b' : ''}`}
                style={{ borderColor: 'var(--border)' }}
              >
                <CategoryIcon category={session.category as TestCategory} className="h-9 w-9 rounded-xl bg-[var(--bg-muted)] text-[var(--text-primary)]" iconClassName="h-4 w-4 text-[var(--text-primary)]" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                    {CATEGORY_LABELS[session.category as TestCategory]}
                    <span className="font-normal ml-1.5" style={{ color: 'var(--text-muted)' }}>— {session.institution}</span>
                    {session.is_simulation && (
                      <span className="ml-2 text-[10px] bg-violet-500/10 text-violet-400 px-1.5 py-0.5 rounded-md font-bold uppercase tracking-wide">
                        Simulare
                      </span>
                    )}
                  </p>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    {new Date(session.completed_at).toLocaleDateString('ro-RO', {
                      weekday: 'short', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit'
                    })}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className={`text-sm font-extrabold ${getScoreColor(session.score)}`}>
                    {session.score?.toFixed(0)}%
                  </p>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{session.correct_answers}/{session.total_questions}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default function ProgressPage() {
  return (
    <Suspense fallback={<ProgressSkeleton />}>
      <ProgressContent />
    </Suspense>
  )
}
