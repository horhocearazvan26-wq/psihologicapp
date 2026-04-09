import { createClient } from '@/lib/supabase/server'
import { Card, CardContent } from '@/components/ui/card'
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
  attention: 'bg-blue-50 text-blue-600',
  logic: 'bg-purple-50 text-purple-600',
  memory: 'bg-amber-50 text-amber-600',
  numerical: 'bg-green-50 text-green-600',
  vocabulary: 'bg-rose-50 text-rose-600',
  personality: 'bg-teal-50 text-teal-600',
}

export default async function ProgressPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: progressData } = await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', user!.id)

  const { data: sessions } = await supabase
    .from('test_sessions')
    .select('*')
    .eq('user_id', user!.id)
    .eq('completed', true)
    .order('completed_at', { ascending: false })
    .limit(30)

  const totalTests = progressData?.reduce((sum, p) => sum + p.tests_taken, 0) ?? 0
  const avgScore = progressData && progressData.length > 0
    ? progressData.reduce((sum, p) => sum + Number(p.average_score), 0) / progressData.length
    : 0
  const bestScore = progressData && progressData.length > 0
    ? Math.max(...progressData.map(p => Number(p.best_score)))
    : 0

  // Build chart data for score over time (last 14 sessions)
  const chartSessions = (sessions ?? []).slice(0, 14).reverse().map((s, i) => ({
    label: `#${i + 1}`,
    score: Math.round(s.score ?? 0),
    date: new Date(s.completed_at).toLocaleDateString('ro-RO', { day: 'numeric', month: 'short' }),
  }))

  // Category averages across all institutions
  const categoryAverages = categories.map((cat) => {
    const catProgress = progressData?.filter(p => p.category === cat) ?? []
    const avg = catProgress.length > 0
      ? catProgress.reduce((s, p) => s + p.average_score, 0) / catProgress.length
      : 0
    return {
      category: CATEGORY_LABELS[cat],
      score: Math.round(avg),
      icon: CATEGORY_ICONS[cat],
    }
  }).filter(c => c.score > 0)

  function getProgress(institution: Institution, category: TestCategory) {
    return progressData?.find(p => p.institution === institution && p.category === category)
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Progresul meu</h1>
        <p className="text-slate-500 mt-1 text-sm">Urmărește evoluția ta în timp</p>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { icon: BookOpen, label: 'Teste completate', value: totalTests, color: 'text-blue-600', bg: 'bg-blue-50' },
          { icon: TrendingUp, label: 'Scor mediu', value: avgScore > 0 ? `${avgScore.toFixed(1)}%` : '—', color: getScoreColor(avgScore), bg: 'bg-green-50' },
          { icon: Trophy, label: 'Cel mai bun scor', value: bestScore > 0 ? `${bestScore.toFixed(0)}%` : '—', color: 'text-yellow-600', bg: 'bg-yellow-50' },
          { icon: Clock, label: 'Sesiuni recente', value: sessions?.length ?? 0, color: 'text-purple-600', bg: 'bg-purple-50' },
        ].map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label}>
              <CardContent className="p-4 flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center shrink-0`}>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div className="min-w-0">
                  <p className="text-lg font-bold text-slate-900 leading-none">{stat.value}</p>
                  <p className="text-xs text-slate-500 mt-0.5 truncate">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Charts */}
      {totalTests > 0 && (
        <ProgressCharts
          chartSessions={chartSessions}
          categoryAverages={categoryAverages}
        />
      )}

      {/* Progress per institution */}
      {institutions.map((inst) => {
        const instProgress = progressData?.filter(p => p.institution === inst) ?? []
        if (instProgress.length === 0) return null

        const instAvg = instProgress.reduce((s, p) => s + p.average_score, 0) / instProgress.length

        return (
          <div key={inst}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-slate-800">{INSTITUTION_LABELS[inst]}</h2>
              <span className={`text-sm font-bold ${getScoreColor(instAvg)}`}>
                Medie: {instAvg.toFixed(0)}%
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((cat) => {
                const p = getProgress(inst, cat)
                if (!p) return null
                const catStyle = CATEGORY_STYLES[cat]

                return (
                  <Card key={cat}>
                    <CardContent className="p-5">
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-9 h-9 rounded-xl ${catStyle} flex items-center justify-center text-base shrink-0`}>
                          {CATEGORY_ICONS[cat]}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-slate-800 truncate">{CATEGORY_LABELS[cat]}</p>
                          <p className="text-xs text-slate-400">{p.tests_taken} teste</p>
                        </div>
                        <span className={`font-bold text-sm shrink-0 ${getScoreColor(p.average_score)}`}>
                          {Number(p.average_score).toFixed(0)}%
                        </span>
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex justify-between text-xs text-slate-400">
                          <span>Medie</span>
                          <span>Best: {Number(p.best_score).toFixed(0)}%</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2">
                          <div
                            className="h-2 rounded-full transition-all"
                            style={{
                              width: `${Math.min(p.average_score, 100)}%`,
                              background: p.average_score >= 80 ? '#16a34a' : p.average_score >= 60 ? '#d97706' : '#dc2626',
                            }}
                          />
                        </div>
                        <div className="w-full bg-slate-50 rounded-full h-1">
                          <div
                            className="bg-slate-300 h-1 rounded-full"
                            style={{ width: `${Math.min(p.best_score, 100)}%` }}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        )
      })}

      {totalTests === 0 && (
        <Card>
          <CardContent className="text-center py-16">
            <div className="text-5xl mb-4">📊</div>
            <h3 className="text-lg font-bold text-slate-700">Niciun test completat încă</h3>
            <p className="text-slate-500 text-sm mt-2 max-w-sm mx-auto">
              Completează primul test pentru a vedea statisticile și graficele tale aici.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Session history */}
      {sessions && sessions.length > 0 && (
        <div>
          <h2 className="text-base font-bold text-slate-800 mb-4">Istoric sesiuni</h2>
          <Card>
            <CardContent className="p-0">
              <div className="divide-y divide-slate-50">
                {sessions.map((session) => (
                  <div key={session.id} className="flex items-center gap-3 px-5 py-3.5 hover:bg-slate-50 transition-colors">
                    <div className={`w-9 h-9 rounded-xl ${CATEGORY_STYLES[session.category as TestCategory] ?? 'bg-slate-100 text-slate-600'} flex items-center justify-center text-base shrink-0`}>
                      {CATEGORY_ICONS[session.category as TestCategory]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-800">
                        {CATEGORY_LABELS[session.category as TestCategory]}
                        <span className="text-slate-400 font-normal ml-1.5">— {session.institution}</span>
                        {session.is_simulation && (
                          <span className="ml-2 text-xs bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded-md">
                            Simulare
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-slate-400">
                        {new Date(session.completed_at).toLocaleDateString('ro-RO', {
                          weekday: 'short', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit'
                        })}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className={`text-sm font-bold ${getScoreColor(session.score)}`}>
                        {session.score?.toFixed(0)}%
                      </p>
                      <p className="text-xs text-slate-400">{session.correct_answers}/{session.total_questions}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
