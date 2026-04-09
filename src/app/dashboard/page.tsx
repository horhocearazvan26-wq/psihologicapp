import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import {
  INSTITUTION_LABELS, INSTITUTION_FULL_NAMES, CATEGORY_LABELS,
  CATEGORY_ICONS, getScoreColor,
} from '@/lib/utils'
import type { Institution, TestCategory } from '@/types'
import {
  BookOpen, Target, Trophy, ArrowRight, Play,
  TrendingUp, Clock, Zap, ChevronRight, Calendar,
  BarChart3, Layers, Flame,
} from 'lucide-react'
import { InstitutionPicker } from '@/components/dashboard/institution-picker'

const institutions: Institution[] = ['MAI', 'MApN', 'SRI', 'ANP']
const categories: TestCategory[] = ['attention', 'logic', 'memory', 'numerical', 'vocabulary', 'personality']

const INSTITUTION_CONFIG: Record<Institution, {
  gradient: string; bg: string; text: string; border: string; shadow: string
}> = {
  MAI:  { gradient: 'from-blue-600 to-blue-800',    bg: 'bg-blue-50 dark:bg-blue-950/30',    text: 'text-blue-700 dark:text-blue-300',    border: 'border-blue-200 dark:border-blue-800',    shadow: 'shadow-blue-100 dark:shadow-blue-950' },
  MApN: { gradient: 'from-emerald-600 to-teal-700', bg: 'bg-emerald-50 dark:bg-emerald-950/30', text: 'text-emerald-700 dark:text-emerald-300', border: 'border-emerald-200 dark:border-emerald-800', shadow: 'shadow-emerald-100 dark:shadow-emerald-950' },
  SRI:  { gradient: 'from-red-600 to-rose-700',     bg: 'bg-red-50 dark:bg-red-950/30',       text: 'text-red-700 dark:text-red-300',       border: 'border-red-200 dark:border-red-800',       shadow: 'shadow-red-100 dark:shadow-red-950' },
  ANP:  { gradient: 'from-violet-600 to-indigo-700',bg: 'bg-violet-50 dark:bg-violet-950/30', text: 'text-violet-700 dark:text-violet-300', border: 'border-violet-200 dark:border-violet-800', shadow: 'shadow-violet-100 dark:shadow-violet-950' },
}

const CATEGORY_CONFIG: Record<TestCategory, { bg: string; text: string }> = {
  attention:   { bg: 'bg-sky-50 dark:bg-sky-950/40',     text: 'text-sky-600 dark:text-sky-400' },
  logic:       { bg: 'bg-purple-50 dark:bg-purple-950/40', text: 'text-purple-600 dark:text-purple-400' },
  memory:      { bg: 'bg-amber-50 dark:bg-amber-950/40',  text: 'text-amber-600 dark:text-amber-400' },
  numerical:   { bg: 'bg-green-50 dark:bg-green-950/40',  text: 'text-green-600 dark:text-green-400' },
  vocabulary:  { bg: 'bg-rose-50 dark:bg-rose-950/40',    text: 'text-rose-600 dark:text-rose-400' },
  personality: { bg: 'bg-teal-50 dark:bg-teal-950/40',   text: 'text-teal-600 dark:text-teal-400' },
}

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
    .order('completed_at', { ascending: false }).limit(5)
  const { data: progressData } = await supabase.from('user_progress').select('*').eq('user_id', user!.id)

  const totalTests = progressData?.reduce((s, p) => s + p.tests_taken, 0) ?? 0
  const avgScore = progressData?.length ? progressData.reduce((s, p) => s + p.average_score, 0) / progressData.length : 0
  const bestScore = progressData?.length ? Math.max(...progressData.map(p => Number(p.best_score))) : 0

  const firstName = profile?.full_name?.split(' ')[0] ?? 'utilizator'
  const daysUntil = getDaysUntilExam(profile?.exam_date ?? null)

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Bună dimineața' : hour < 18 ? 'Bună ziua' : 'Bună seara'

  return (
    <>
      <InstitutionPicker />

      <div className="space-y-10 animate-fade-up">

        {/* ── Header ── */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-[var(--text-muted)] font-medium mb-1">{greeting},</p>
            <h1 className="text-3xl font-extrabold text-[var(--text-primary)] tracking-tight leading-none">
              {firstName} 👋
            </h1>
            <p className="text-[var(--text-secondary)] mt-2 text-sm">
              {totalTests === 0
                ? 'Alege o instituție și începe primul test astăzi.'
                : `Ai completat ${totalTests} teste. Continuă să exersezi!`}
            </p>
          </div>
          {daysUntil !== null && daysUntil > 0 && (
            <div className="hidden sm:flex items-center gap-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-2xl px-4 py-3 shrink-0">
              <Calendar className="w-5 h-5 text-amber-500" />
              <div>
                <p className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold uppercase tracking-wide">Până la examen</p>
                <p className="text-2xl font-extrabold text-amber-700 dark:text-amber-300 leading-none">{daysUntil} <span className="text-sm font-medium">zile</span></p>
              </div>
            </div>
          )}
        </div>

        {/* ── Stats ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { icon: BookOpen, label: 'Teste completate', value: totalTests.toString(), iconBg: 'bg-blue-50 dark:bg-blue-950/40', iconColor: 'text-blue-500' },
            { icon: Target,   label: 'Scor mediu',       value: avgScore > 0 ? `${avgScore.toFixed(0)}%` : '—', iconBg: 'bg-green-50 dark:bg-green-950/40', iconColor: 'text-green-500' },
            { icon: Trophy,   label: 'Cel mai bun scor', value: bestScore > 0 ? `${bestScore.toFixed(0)}%` : '—', iconBg: 'bg-amber-50 dark:bg-amber-950/40', iconColor: 'text-amber-500' },
            { icon: Flame,    label: 'Plan',             value: profile?.subscription_plan === 'free' ? 'Gratuit' : profile?.subscription_plan === 'one_institution' ? '1 Inst.' : 'Complet', iconBg: 'bg-violet-50 dark:bg-violet-950/40', iconColor: 'text-violet-500' },
          ].map((stat, i) => {
            const Icon = stat.icon
            return (
              <div key={stat.label} className={`bg-[var(--bg-surface)] rounded-2xl border border-[var(--border)] p-5 shadow-sm animate-fade-up stagger-${i + 1}`}>
                <div className={`w-10 h-10 rounded-xl ${stat.iconBg} flex items-center justify-center mb-3`}>
                  <Icon className={`w-5 h-5 ${stat.iconColor}`} />
                </div>
                <p className="text-2xl font-extrabold text-[var(--text-primary)] leading-none">{stat.value}</p>
                <p className="text-xs text-[var(--text-muted)] mt-1.5 font-medium">{stat.label}</p>
              </div>
            )
          })}
        </div>

        {/* ── Quick actions ── */}
        <div>
          <h2 className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-widest mb-4">Acțiuni rapide</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { href: '/dashboard/simulate', icon: Play,       gradient: 'from-indigo-600 to-blue-600',   shadow: 'shadow-indigo-200 dark:shadow-indigo-950', title: 'Simulare Examen',  sub: 'Condiții reale, cronometru' },
              { href: '/dashboard/flashcards', icon: Layers,   gradient: 'from-violet-500 to-purple-600', shadow: 'shadow-violet-200 dark:shadow-violet-950', title: 'Flashcard-uri',    sub: 'Memorare rapidă' },
              { href: '/dashboard/review',   icon: TrendingUp, gradient: 'from-amber-500 to-orange-500',  shadow: 'shadow-amber-200 dark:shadow-amber-950',   title: 'Review Greșeli',   sub: 'Revizuiește erorile' },
            ].map(({ href, icon: Icon, gradient, shadow, title, sub }) => (
              <Link key={href} href={href}>
                <div className={`relative overflow-hidden bg-gradient-to-br ${gradient} rounded-2xl p-5 text-white shadow-lg ${shadow} hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group`}>
                  <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/10 rounded-full" />
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 bg-white/15 rounded-xl flex items-center justify-center">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <ChevronRight className="w-4 h-4 text-white/50 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <p className="font-bold text-base leading-none">{title}</p>
                  <p className="text-white/60 text-xs mt-1.5">{sub}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* ── Institutions ── */}
        <div>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-bold text-[var(--text-primary)]">Instituții</h2>
            <Link href="/dashboard/tests" className="flex items-center gap-1 text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-semibold">
              Toate testele <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {institutions.map((inst, i) => {
              const cfg = INSTITUTION_CONFIG[inst]
              const instProgress = progressData?.filter(p => p.institution === inst) ?? []
              const instAvg = instProgress.length ? instProgress.reduce((s, p) => s + p.average_score, 0) / instProgress.length : null
              const instTests = instProgress.reduce((s, p) => s + p.tests_taken, 0)
              return (
                <Link key={inst} href={`/dashboard/tests?institution=${inst}`}>
                  <div className={`bg-[var(--bg-surface)] border ${cfg.border} rounded-2xl p-5 hover:-translate-y-1 hover:shadow-lg ${cfg.shadow} transition-all duration-200 cursor-pointer animate-fade-up stagger-${i + 1}`}>
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${cfg.gradient} flex items-center justify-center mb-4 shadow-sm`}>
                      <span className="text-white font-extrabold text-xs tracking-wide">{inst}</span>
                    </div>
                    <h3 className="font-bold text-[var(--text-primary)] text-sm leading-tight">{INSTITUTION_LABELS[inst]}</h3>
                    <p className="text-xs text-[var(--text-muted)] mt-0.5 leading-tight line-clamp-1">{INSTITUTION_FULL_NAMES[inst]}</p>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-xs text-[var(--text-muted)]">{instTests} teste</span>
                      {instAvg !== null
                        ? <span className={`text-xs font-bold ${getScoreColor(instAvg)}`}>{instAvg.toFixed(0)}%</span>
                        : <span className="text-xs text-[var(--text-muted)]">—</span>}
                    </div>
                    {instAvg !== null && (
                      <div className="w-full bg-[var(--bg-muted)] rounded-full h-1.5 mt-2">
                        <div className={`bg-gradient-to-r ${cfg.gradient} h-1.5 rounded-full`} style={{ width: `${Math.min(instAvg, 100)}%` }} />
                      </div>
                    )}
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        {/* ── Categories ── */}
        <div>
          <h2 className="text-base font-bold text-[var(--text-primary)] mb-5">Categorii teste</h2>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {categories.map((cat, i) => {
              const cfg = CATEGORY_CONFIG[cat]
              const catProgress = progressData?.filter(p => p.category === cat) ?? []
              const catAvg = catProgress.length ? catProgress.reduce((s, p) => s + p.average_score, 0) / catProgress.length : null
              return (
                <Link key={cat} href={`/dashboard/tests?category=${cat}`}>
                  <div className={`bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl p-3 text-center hover:-translate-y-1 hover:shadow-md transition-all duration-200 cursor-pointer animate-fade-up stagger-${(i % 4) + 1}`}>
                    <div className={`w-10 h-10 rounded-xl ${cfg.bg} flex items-center justify-center mx-auto mb-2 text-xl`}>
                      {CATEGORY_ICONS[cat]}
                    </div>
                    <p className="text-xs font-semibold text-[var(--text-primary)] leading-tight line-clamp-2">
                      {CATEGORY_LABELS[cat].split(' ')[0]}
                    </p>
                    {catAvg !== null && (
                      <p className={`text-xs font-bold mt-1 ${getScoreColor(catAvg)}`}>{catAvg.toFixed(0)}%</p>
                    )}
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        {/* ── Recent activity ── */}
        {recentSessions && recentSessions.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-bold text-[var(--text-primary)]">Activitate recentă</h2>
              <Link href="/dashboard/progress" className="flex items-center gap-1 text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-semibold">
                <BarChart3 className="w-3 h-3" /> Progres complet
              </Link>
            </div>
            <div className="bg-[var(--bg-surface)] rounded-2xl border border-[var(--border)] overflow-hidden shadow-sm">
              {recentSessions.map((session, i) => {
                const catCfg = CATEGORY_CONFIG[session.category as TestCategory] ?? { bg: 'bg-slate-100 dark:bg-slate-800', text: 'text-slate-500' }
                return (
                  <div
                    key={session.id}
                    className={`flex items-center gap-4 px-5 py-4 hover:bg-[var(--bg-muted)] transition-colors ${i < recentSessions.length - 1 ? 'border-b border-[var(--border)]' : ''}`}
                  >
                    <div className={`w-10 h-10 rounded-xl ${catCfg.bg} flex items-center justify-center text-lg shrink-0`}>
                      {CATEGORY_ICONS[session.category as TestCategory]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-[var(--text-primary)] truncate">
                        {CATEGORY_LABELS[session.category as TestCategory]}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] mt-0.5">
                        <span className={`font-medium ${catCfg.text}`}>{session.institution}</span>
                        <span>·</span>
                        <Clock className="w-3 h-3" />
                        <span>{new Date(session.completed_at).toLocaleDateString('ro-RO', { day: 'numeric', month: 'short' })}</span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className={`text-sm font-extrabold ${getScoreColor(session.score)}`}>{session.score?.toFixed(0)}%</p>
                      <p className="text-xs text-[var(--text-muted)]">{session.correct_answers}/{session.total_questions}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* ── Upgrade CTA ── */}
        {profile?.subscription_plan === 'free' && (
          <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-700 rounded-2xl p-7 shadow-xl shadow-indigo-200 dark:shadow-indigo-950">
            <div className="absolute -right-10 -top-10 w-48 h-48 bg-white/10 rounded-full" />
            <div className="absolute right-12 bottom-0 w-24 h-24 bg-violet-500/20 rounded-full" />
            <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-4 h-4 text-yellow-300" />
                  <span className="text-yellow-300 text-xs font-semibold uppercase tracking-wide">Upgrade disponibil</span>
                </div>
                <h3 className="text-white font-extrabold text-xl leading-tight">Deblochează accesul complet</h3>
                <p className="text-indigo-200 text-sm mt-1.5">
                  De la 69 lei — 200+ întrebări, simulare completă, statistici avansate
                </p>
              </div>
              <Link href="/dashboard/pricing" className="shrink-0">
                <div className="bg-white text-indigo-700 font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-indigo-50 transition-colors flex items-center gap-2">
                  Vezi planuri <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            </div>
          </div>
        )}

      </div>
    </>
  )
}
