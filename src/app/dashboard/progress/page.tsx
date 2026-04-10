import { createClient } from '@/lib/supabase/server'
import {
  INSTITUTION_LABELS,
  CATEGORY_LABELS,
  CATEGORY_ICONS,
  getScoreColor,
} from '@/lib/utils'
import type { Institution, TestCategory } from '@/types'
import { ProgressCharts } from './progress-charts'
import { TrendingUp, Trophy, BookOpen, Clock } from 'lucide-react'

const institutions: Institution[] = ['MAI', 'MApN', 'SRI', 'ANP']
const categories: TestCategory[] = ['attention', 'logic', 'memory', 'numerical', 'vocabulary', 'personality']

const CATEGORY_STYLES: Record<TestCategory, string> = {
  attention:   'bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400',
  logic:       'bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400',
  memory:      'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400',
  numerical:   'bg-green-50 dark:bg-green-950/40 text-green-600 dark:text-green-400',
  vocabulary:  'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400',
  personality: 'bg-teal-50 dark:bg-teal-950/40 text-teal-600 dark:text-teal-400',
}

export default async function ProgressPage() {
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
    return { category: CATEGORY_LABELS[cat], score: Math.round(avg), icon: CATEGORY_ICONS[cat] }
  }).filter(c => c.score > 0)

  function getProgress(institution: Institution, category: TestCategory) {
    return progressData?.find(p => p.institution === institution && p.category === category)
  }

  return (
    <div className="space-y-8 animate-fade-up">
      <div>
        <h1 className="text-2xl font-extrabold text-[var(--text-primary)] tracking-tight">Progresul meu</h1>
        <p className="text-[var(--text-secondary)] mt-1.5 text-sm">Urmărește evoluția ta în timp</p>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { icon: BookOpen,   label: 'Teste completate',  value: totalTests.toString(),                         iconBg: 'bg-blue-50 dark:bg-blue-950/40',   iconColor: 'text-blue-500' },
          { icon: TrendingUp, label: 'Scor mediu',         value: avgScore > 0 ? `${avgScore.toFixed(1)}%` : '—', iconBg: 'bg-green-50 dark:bg-green-950/40', iconColor: 'text-green-500' },
          { icon: Trophy,     label: 'Cel mai bun scor',   value: bestScore > 0 ? `${bestScore.toFixed(0)}%` : '—', iconBg: 'bg-amber-50 dark:bg-amber-950/40', iconColor: 'text-amber-500' },
          { icon: Clock,      label: 'Sesiuni recente',    value: (sessions?.length ?? 0).toString(),            iconBg: 'bg-violet-50 dark:bg-violet-950/40', iconColor: 'text-violet-500' },
        ].map(({ icon: Icon, label, value, iconBg, iconColor }) => (
          <div key={label} className="bg-[var(--bg-surface)] rounded-2xl border border-[var(--border)] shadow-sm p-4 flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center shrink-0`}>
              <Icon className={`w-5 h-5 ${iconColor}`} />
            </div>
            <div className="min-w-0">
              <p className="text-lg font-extrabold text-[var(--text-primary)] leading-none">{value}</p>
              <p className="text-xs text-[var(--text-muted)] mt-0.5 truncate">{label}</p>
            </div>
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
                      <div className={`w-9 h-9 rounded-xl ${CATEGORY_STYLES[cat]} flex items-center justify-center text-base shrink-0`}>
                        {CATEGORY_ICONS[cat]}
                      </div>
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
        <div className="bg-[var(--bg-surface)] rounded-2xl border border-[var(--border)] shadow-sm p-16 text-center">
          <div className="text-5xl mb-4">📊</div>
          <h3 className="text-base font-bold text-[var(--text-primary)]">Niciun test completat încă</h3>
          <p className="text-[var(--text-muted)] text-sm mt-2 max-w-sm mx-auto">
            Completează primul test pentru a vedea statisticile și graficele tale aici.
          </p>
        </div>
      )}

      {/* Session history */}
      {sessions && sessions.length > 0 && (
        <div>
          <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">Istoric sesiuni</h2>
          <div className="bg-[var(--bg-surface)] rounded-2xl border border-[var(--border)] shadow-sm overflow-hidden">
            {sessions.map((session, i) => (
              <div
                key={session.id}
                className={`flex items-center gap-3 px-5 py-3.5 hover:bg-[var(--bg-muted)] transition-colors ${i < sessions.length - 1 ? 'border-b border-[var(--border)]' : ''}`}
              >
                <div className={`w-9 h-9 rounded-xl ${CATEGORY_STYLES[session.category as TestCategory] ?? 'bg-[var(--bg-muted)] text-[var(--text-muted)]'} flex items-center justify-center text-base shrink-0`}>
                  {CATEGORY_ICONS[session.category as TestCategory]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[var(--text-primary)]">
                    {CATEGORY_LABELS[session.category as TestCategory]}
                    <span className="text-[var(--text-muted)] font-normal ml-1.5">— {session.institution}</span>
                    {session.is_simulation && (
                      <span className="ml-2 text-xs bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400 px-1.5 py-0.5 rounded-md font-semibold">
                        Simulare
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-[var(--text-muted)]">
                    {new Date(session.completed_at).toLocaleDateString('ro-RO', {
                      weekday: 'short', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit'
                    })}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className={`text-sm font-extrabold ${getScoreColor(session.score)}`}>
                    {session.score?.toFixed(0)}%
                  </p>
                  <p className="text-xs text-[var(--text-muted)]">{session.correct_answers}/{session.total_questions}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
