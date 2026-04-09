import { createClient } from '@/lib/supabase/server'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import {
  INSTITUTION_LABELS,
  INSTITUTION_FULL_NAMES,
  CATEGORY_LABELS,
  CATEGORY_ICONS,
  getScoreColor,
} from '@/lib/utils'
import type { Institution, TestCategory } from '@/types'
import {
  BookOpen, Target, Trophy, ArrowRight, Play,
  TrendingUp, Clock, Zap, ChevronRight, Calendar,
  BarChart3, Layers
} from 'lucide-react'

const institutions: Institution[] = ['MAI', 'MApN', 'SRI', 'ANP']
const categories: TestCategory[] = ['attention', 'logic', 'memory', 'numerical', 'vocabulary', 'personality']

const INSTITUTION_COLORS: Record<Institution, { gradient: string; bg: string; text: string; ring: string }> = {
  MAI: { gradient: 'from-blue-500 to-blue-700', bg: 'bg-blue-50', text: 'text-blue-700', ring: 'ring-blue-200' },
  MApN: { gradient: 'from-green-500 to-green-700', bg: 'bg-green-50', text: 'text-green-700', ring: 'ring-green-200' },
  SRI: { gradient: 'from-red-500 to-red-700', bg: 'bg-red-50', text: 'text-red-700', ring: 'ring-red-200' },
  ANP: { gradient: 'from-purple-500 to-purple-700', bg: 'bg-purple-50', text: 'text-purple-700', ring: 'ring-purple-200' },
}

const CATEGORY_BG: Record<TestCategory, string> = {
  attention: 'bg-blue-50 text-blue-600',
  logic: 'bg-purple-50 text-purple-600',
  memory: 'bg-amber-50 text-amber-600',
  numerical: 'bg-green-50 text-green-600',
  vocabulary: 'bg-rose-50 text-rose-600',
  personality: 'bg-teal-50 text-teal-600',
}

function getDaysUntilExam(examDate: string | null): number | null {
  if (!examDate) return null
  const diff = new Date(examDate).getTime() - Date.now()
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user!.id)
    .single()

  const { data: recentSessions } = await supabase
    .from('test_sessions')
    .select('*')
    .eq('user_id', user!.id)
    .eq('completed', true)
    .order('completed_at', { ascending: false })
    .limit(4)

  const { data: progressData } = await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', user!.id)

  const totalTests = progressData?.reduce((sum, p) => sum + p.tests_taken, 0) ?? 0
  const avgScore = progressData && progressData.length > 0
    ? progressData.reduce((sum, p) => sum + p.average_score, 0) / progressData.length
    : 0
  const bestScore = progressData && progressData.length > 0
    ? Math.max(...progressData.map(p => Number(p.best_score)))
    : 0

  const firstName = profile?.full_name?.split(' ')[0] ?? 'utilizator'
  const daysUntil = getDaysUntilExam(profile?.exam_date ?? null)

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Bună, {firstName}! 👋
          </h1>
          <p className="text-slate-500 mt-1 text-sm">
            {totalTests === 0
              ? 'Alege o categorie și începe primul test astăzi.'
              : `Ai completat ${totalTests} teste până acum. Continuă să exersezi!`}
          </p>
        </div>
        {daysUntil !== null && daysUntil > 0 && (
          <div className="hidden sm:flex items-center gap-3 bg-amber-50 border border-amber-100 rounded-2xl px-4 py-3">
            <Calendar className="w-5 h-5 text-amber-500" />
            <div>
              <p className="text-xs text-amber-600 font-medium">Până la examen</p>
              <p className="text-lg font-extrabold text-amber-700">{daysUntil} zile</p>
            </div>
          </div>
        )}
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          {
            icon: BookOpen, label: 'Teste completate', value: totalTests.toString(),
            color: 'text-blue-600', bg: 'bg-blue-50',
          },
          {
            icon: Target, label: 'Scor mediu', value: avgScore > 0 ? `${avgScore.toFixed(0)}%` : '—',
            color: getScoreColor(avgScore).replace('text-', 'text-'), bg: 'bg-green-50',
          },
          {
            icon: Trophy, label: 'Cel mai bun scor', value: bestScore > 0 ? `${bestScore.toFixed(0)}%` : '—',
            color: 'text-yellow-600', bg: 'bg-yellow-50',
          },
          {
            icon: Zap,
            label: 'Plan',
            value: profile?.subscription_plan === 'free' ? 'Gratuit' : profile?.subscription_plan === 'one_institution' ? '1 Inst.' : 'Complet',
            color: profile?.subscription_plan === 'free' ? 'text-slate-600' : 'text-purple-600',
            bg: profile?.subscription_plan === 'free' ? 'bg-slate-50' : 'bg-purple-50',
          },
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

      {/* Quick actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link href="/dashboard/simulate">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-5 text-white hover:opacity-95 transition-opacity cursor-pointer group">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <Play className="w-5 h-5 text-white" />
              </div>
              <ChevronRight className="w-4 h-4 text-white/60 group-hover:text-white transition-colors" />
            </div>
            <p className="font-bold text-base">Simulare Examen</p>
            <p className="text-blue-100 text-xs mt-1">Condiții reale cu cronometru</p>
          </div>
        </Link>

        <Link href="/dashboard/flashcards">
          <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl p-5 text-white hover:opacity-95 transition-opacity cursor-pointer group">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <Layers className="w-5 h-5 text-white" />
              </div>
              <ChevronRight className="w-4 h-4 text-white/60 group-hover:text-white transition-colors" />
            </div>
            <p className="font-bold text-base">Flashcard-uri</p>
            <p className="text-purple-100 text-xs mt-1">Memorare rapidă</p>
          </div>
        </Link>

        <Link href="/dashboard/review">
          <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-5 text-white hover:opacity-95 transition-opacity cursor-pointer group">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <ChevronRight className="w-4 h-4 text-white/60 group-hover:text-white transition-colors" />
            </div>
            <p className="font-bold text-base">Review Greșeli</p>
            <p className="text-amber-100 text-xs mt-1">Revizuiește răspunsurile greșite</p>
          </div>
        </Link>
      </div>

      {/* Institutions */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-slate-800">Instituții</h2>
          <Link href="/dashboard/tests">
            <Button variant="ghost" size="sm" className="text-xs gap-1">
              Toate testele <ArrowRight className="w-3 h-3" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {institutions.map((inst) => {
            const colors = INSTITUTION_COLORS[inst]
            const instProgress = progressData?.filter(p => p.institution === inst) ?? []
            const instAvg = instProgress.length > 0
              ? instProgress.reduce((s, p) => s + p.average_score, 0) / instProgress.length
              : null
            const instTests = instProgress.reduce((s, p) => s + p.tests_taken, 0)

            return (
              <Link key={inst} href={`/dashboard/tests?institution=${inst}`}>
                <Card hover>
                  <CardContent className="p-5">
                    <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${colors.gradient} flex items-center justify-center mb-4 shadow-sm`}>
                      <span className="text-white font-bold text-sm">{inst}</span>
                    </div>
                    <h3 className="font-bold text-slate-800 text-sm leading-tight mb-0.5">
                      {INSTITUTION_LABELS[inst]}
                    </h3>
                    <p className="text-xs text-slate-400 mb-3 leading-tight">
                      {INSTITUTION_FULL_NAMES[inst]}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-400">{instTests} teste</span>
                      {instAvg !== null ? (
                        <span className={`text-xs font-bold ${getScoreColor(instAvg)}`}>
                          {instAvg.toFixed(0)}%
                        </span>
                      ) : (
                        <span className="text-xs text-slate-300">—</span>
                      )}
                    </div>
                    {instAvg !== null && (
                      <div className="w-full bg-slate-100 rounded-full h-1 mt-2">
                        <div
                          className="bg-blue-500 h-1 rounded-full"
                          style={{ width: `${Math.min(instAvg, 100)}%` }}
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Categories */}
      <div>
        <h2 className="text-base font-bold text-slate-800 mb-4">Categorii</h2>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {categories.map((cat) => {
            const catProgress = progressData?.filter(p => p.category === cat) ?? []
            const catAvg = catProgress.length > 0
              ? catProgress.reduce((s, p) => s + p.average_score, 0) / catProgress.length
              : null

            return (
              <Link key={cat} href={`/dashboard/tests?category=${cat}`}>
                <Card hover>
                  <CardContent className="p-3 text-center">
                    <div className={`w-9 h-9 rounded-xl ${CATEGORY_BG[cat]} flex items-center justify-center mx-auto mb-2 text-lg`}>
                      {CATEGORY_ICONS[cat]}
                    </div>
                    <p className="text-xs font-semibold text-slate-700 leading-tight line-clamp-2">
                      {CATEGORY_LABELS[cat].split(' ')[0]}
                    </p>
                    {catAvg !== null && (
                      <p className={`text-xs font-bold mt-1 ${getScoreColor(catAvg)}`}>
                        {catAvg.toFixed(0)}%
                      </p>
                    )}
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Recent activity */}
      {recentSessions && recentSessions.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-slate-800">Activitate recentă</h2>
            <Link href="/dashboard/progress">
              <Button variant="ghost" size="sm" className="text-xs gap-1">
                <BarChart3 className="w-3 h-3" /> Progres complet
              </Button>
            </Link>
          </div>
          <Card>
            <CardContent className="p-0">
              <div className="divide-y divide-slate-50">
                {recentSessions.map((session) => (
                  <div key={session.id} className="flex items-center gap-3 px-5 py-3.5 hover:bg-slate-50 transition-colors">
                    <div className={`w-9 h-9 rounded-xl ${CATEGORY_BG[session.category as TestCategory] ?? 'bg-slate-100 text-slate-600'} flex items-center justify-center text-base shrink-0`}>
                      {CATEGORY_ICONS[session.category as TestCategory]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-800 truncate">
                        {CATEGORY_LABELS[session.category as TestCategory]}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <span>{session.institution}</span>
                        <span>·</span>
                        <Clock className="w-3 h-3" />
                        <span>{new Date(session.completed_at).toLocaleDateString('ro-RO', { day: 'numeric', month: 'short' })}</span>
                      </div>
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

      {/* CTA for free users */}
      {profile?.subscription_plan === 'free' && (
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6">
          <div className="absolute -right-8 -top-8 w-40 h-40 bg-white/10 rounded-full" />
          <div className="absolute -right-4 bottom-0 w-24 h-24 bg-indigo-500/30 rounded-full" />
          <div className="relative flex items-center justify-between gap-4">
            <div>
              <h3 className="text-white font-bold text-lg">Deblochează accesul complet</h3>
              <p className="text-blue-100 text-sm mt-1">
                De la 69 lei — 200+ întrebări per categorie, simulare completă, statistici avansate
              </p>
            </div>
            <Link href="/dashboard/pricing" className="shrink-0">
              <Button variant="secondary" size="md">
                Vezi planuri <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
