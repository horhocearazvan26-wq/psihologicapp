'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { CATEGORY_LABELS, CATEGORY_ICONS, getScoreColor } from '@/lib/utils'
import type { TestCategory } from '@/types'
import {
  Play, Layers, TrendingUp, ChevronRight, ArrowRight,
  BookOpen, Target, Trophy, BarChart3, Clock,
  RefreshCw, Shield, Star, Eye, Scale, Zap, Flame,
} from 'lucide-react'
import { InstitutionPicker, STORAGE_KEY } from './institution-picker'

const INST_CONFIG = {
  MAI: {
    gradient: 'from-blue-800 to-blue-600',
    lightGradient: 'from-blue-600 via-blue-700 to-blue-900',
    border: 'border-blue-200 dark:border-blue-800',
    bg: 'bg-blue-50 dark:bg-blue-950/30',
    text: 'text-blue-700 dark:text-blue-300',
    badge: 'bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300',
    progress: 'bg-gradient-to-r from-blue-500 to-blue-700',
    icon: <Shield className="w-6 h-6 text-white" />,
    label: 'MAI',
    fullName: 'Ministerul Afacerilor Interne',
  },
  MApN: {
    gradient: 'from-emerald-800 to-teal-600',
    lightGradient: 'from-emerald-700 via-emerald-800 to-teal-900',
    border: 'border-emerald-200 dark:border-emerald-800',
    bg: 'bg-emerald-50 dark:bg-emerald-950/30',
    text: 'text-emerald-700 dark:text-emerald-300',
    badge: 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300',
    progress: 'bg-gradient-to-r from-emerald-500 to-teal-600',
    icon: <Star className="w-6 h-6 text-white" />,
    label: 'MApN',
    fullName: 'Ministerul Apărării Naționale',
  },
  SRI: {
    gradient: 'from-red-900 to-rose-600',
    lightGradient: 'from-red-800 via-red-900 to-rose-950',
    border: 'border-red-200 dark:border-red-800',
    bg: 'bg-red-50 dark:bg-red-950/30',
    text: 'text-red-700 dark:text-red-300',
    badge: 'bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-300',
    progress: 'bg-gradient-to-r from-red-500 to-rose-600',
    icon: <Eye className="w-6 h-6 text-white" />,
    label: 'SRI',
    fullName: 'Serviciul Român de Informații',
  },
  ANP: {
    gradient: 'from-violet-800 to-indigo-600',
    lightGradient: 'from-violet-800 via-violet-900 to-indigo-950',
    border: 'border-violet-200 dark:border-violet-800',
    bg: 'bg-violet-50 dark:bg-violet-950/30',
    text: 'text-violet-700 dark:text-violet-300',
    badge: 'bg-violet-100 dark:bg-violet-950/60 text-violet-700 dark:text-violet-300',
    progress: 'bg-gradient-to-r from-violet-500 to-indigo-600',
    icon: <Scale className="w-6 h-6 text-white" />,
    label: 'ANP',
    fullName: 'Administrația Națională a Penitenciarelor',
  },
}

const CAT_CONFIG: Record<TestCategory, { bg: string; text: string }> = {
  attention:   { bg: 'bg-sky-50 dark:bg-sky-950/40',       text: 'text-sky-600 dark:text-sky-400' },
  logic:       { bg: 'bg-purple-50 dark:bg-purple-950/40', text: 'text-purple-600 dark:text-purple-400' },
  memory:      { bg: 'bg-amber-50 dark:bg-amber-950/40',   text: 'text-amber-600 dark:text-amber-400' },
  numerical:   { bg: 'bg-green-50 dark:bg-green-950/40',   text: 'text-green-600 dark:text-green-400' },
  vocabulary:  { bg: 'bg-rose-50 dark:bg-rose-950/40',     text: 'text-rose-600 dark:text-rose-400' },
  personality: { bg: 'bg-teal-50 dark:bg-teal-950/40',    text: 'text-teal-600 dark:text-teal-400' },
}

const categories: TestCategory[] = ['attention', 'logic', 'memory', 'numerical', 'vocabulary', 'personality']

interface ProgressEntry {
  institution: string
  category: string
  tests_taken: number
  average_score: number
  best_score: number
}

interface Session {
  id: string
  institution: string
  category: string
  score: number
  correct_answers: number
  total_questions: number
  completed_at: string
}

interface DashboardClientProps {
  firstName: string
  totalTests: number
  avgScore: number
  bestScore: number
  subscriptionPlan: string
  progressData: ProgressEntry[]
  recentSessions: Session[]
  daysUntil: number | null
}

export function DashboardClient({
  firstName, totalTests, avgScore, bestScore,
  subscriptionPlan, progressData, recentSessions, daysUntil,
}: DashboardClientProps) {
  const [institution, setInstitution] = useState<string | null>(null)
  const [showPicker, setShowPicker] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) setInstitution(saved)
    else setShowPicker(true)
    setMounted(true)
  }, [])

  function handlePickerSelect(id: string) {
    setInstitution(id)
    setShowPicker(false)
  }

  function changeInstitution() {
    localStorage.removeItem(STORAGE_KEY)
    setInstitution(null)
    setShowPicker(true)
  }

  if (!mounted) return null
  if (showPicker) return <InstitutionPicker onSelect={handlePickerSelect} />

  const inst = institution as keyof typeof INST_CONFIG
  const cfg = INST_CONFIG[inst] ?? INST_CONFIG.MAI

  const instProgress = progressData.filter(p => p.institution === inst)
  const completedCats = instProgress.filter(p => p.tests_taken > 0).length
  const instAvg = instProgress.length
    ? instProgress.reduce((s, p) => s + p.average_score, 0) / instProgress.length
    : 0
  const instTests = instProgress.reduce((s, p) => s + p.tests_taken, 0)

  const instSessions = recentSessions.filter(s => s.institution === inst)

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Bună dimineața' : hour < 18 ? 'Bună ziua' : 'Bună seara'

  return (
    <div className="space-y-8 animate-fade-up">

      {/* ── Institution hero banner ── */}
      <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${cfg.lightGradient} shadow-xl p-7`}>
        {/* Decorative circles */}
        <div className="absolute -top-12 -right-12 w-56 h-56 bg-white/5 rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-20 w-32 h-32 bg-white/5 rounded-full pointer-events-none" />

        <div className="relative flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${cfg.gradient} shadow-lg flex items-center justify-center shrink-0`}>
              {cfg.icon}
            </div>
            <div>
              <p className="text-white/60 text-xs font-medium mb-0.5">{greeting}, {firstName}</p>
              <h1 className="text-white font-extrabold text-2xl tracking-tight leading-none">{cfg.label}</h1>
              <p className="text-white/50 text-sm mt-1 leading-snug">{cfg.fullName}</p>
            </div>
          </div>

          <button
            onClick={changeInstitution}
            className="flex items-center gap-1.5 text-white/50 hover:text-white/80 text-xs font-medium transition-colors shrink-0 mt-1"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Schimbă</span>
          </button>
        </div>

        {/* Stats inline */}
        <div className="relative grid grid-cols-3 gap-3 mt-6">
          {[
            { label: 'Teste', value: instTests.toString() },
            { label: 'Medie', value: instAvg > 0 ? `${instAvg.toFixed(0)}%` : '—' },
            { label: 'Categorii', value: `${completedCats}/6` },
          ].map(s => (
            <div key={s.label} className="bg-white/10 rounded-xl px-4 py-3 text-center">
              <p className="text-white font-extrabold text-xl leading-none">{s.value}</p>
              <p className="text-white/50 text-xs mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Progress bar */}
        {completedCats > 0 && (
          <div className="relative mt-4">
            <div className="flex items-center justify-between text-xs text-white/40 mb-1.5">
              <span>Progres categorii</span>
              <span>{Math.round(completedCats / 6 * 100)}%</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-1.5">
              <div
                className="bg-white/60 h-1.5 rounded-full transition-all duration-700"
                style={{ width: `${completedCats / 6 * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* ── Quick actions ── */}
      <div>
        <h2 className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-widest mb-4">Acțiuni rapide</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { href: '/dashboard/simulate', icon: Play, gradient: 'from-indigo-600 to-blue-600', shadow: 'shadow-indigo-200 dark:shadow-indigo-950', title: 'Simulare Examen', sub: 'Condiții reale, cronometru' },
            { href: '/dashboard/flashcards', icon: Layers, gradient: 'from-violet-500 to-purple-600', shadow: 'shadow-violet-200 dark:shadow-violet-950', title: 'Flashcard-uri', sub: 'Memorare rapidă' },
            { href: '/dashboard/review', icon: TrendingUp, gradient: 'from-amber-500 to-orange-500', shadow: 'shadow-amber-200 dark:shadow-amber-950', title: 'Review Greșeli', sub: 'Revizuiește erorile' },
          ].map(({ href, icon: Icon, gradient, shadow, title, sub }) => (
            <Link key={href} href={href}>
              <div className={`relative overflow-hidden bg-gradient-to-br ${gradient} rounded-2xl p-5 text-white shadow-lg ${shadow} hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group`}>
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/10 rounded-full pointer-events-none" />
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

      {/* ── Category tests ── */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-bold text-[var(--text-primary)]">Categorii {cfg.label}</h2>
          <Link href={`/dashboard/tests?institution=${inst}`} className="flex items-center gap-1 text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-semibold">
            Toate testele <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat, i) => {
            const progress = instProgress.find(p => p.category === cat)
            const catCfg = CAT_CONFIG[cat]
            const href = cat === 'attention'
              ? `/dashboard/tests/${inst.toLowerCase()}/attention`
              : `/dashboard/tests/${inst.toLowerCase()}/${cat}`

            return (
              <Link key={cat} href={href}>
                <div className={`group bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl p-5 hover:-translate-y-1 hover:shadow-lg hover:border-[var(--border-strong)] transition-all duration-200 cursor-pointer animate-fade-up stagger-${(i % 4) + 1}`}>
                  <div className="flex items-start gap-3.5 mb-4">
                    <div className={`w-11 h-11 rounded-xl ${catCfg.bg} flex items-center justify-center text-xl shrink-0`}>
                      {CATEGORY_ICONS[cat]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-[var(--text-primary)] text-sm leading-tight">{CATEGORY_LABELS[cat]}</h3>
                      {progress && progress.tests_taken > 0 ? (
                        <div className="mt-2 space-y-1.5">
                          <div className="flex justify-between text-xs">
                            <span className="text-[var(--text-muted)]">{progress.tests_taken} teste</span>
                            <span className={`font-extrabold ${getScoreColor(progress.average_score)}`}>
                              {progress.average_score.toFixed(0)}%
                            </span>
                          </div>
                          <div className="w-full bg-[var(--bg-muted)] rounded-full h-1.5">
                            <div
                              className={`${cfg.progress} h-1.5 rounded-full transition-all`}
                              style={{ width: `${Math.min(progress.average_score, 100)}%` }}
                            />
                          </div>
                        </div>
                      ) : (
                        <p className="text-xs text-[var(--text-muted)] mt-1">Neîncercat</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs font-semibold py-2 px-3.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-950/60 transition-colors">
                    <span>Începe testul</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      {/* ── Global stats ── */}
      <div>
        <h2 className="text-base font-bold text-[var(--text-primary)] mb-5">Statistici generale</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { icon: BookOpen, label: 'Teste totale',     value: totalTests.toString(),                         iconBg: 'bg-blue-50 dark:bg-blue-950/40',   iconColor: 'text-blue-500' },
            { icon: Target,   label: 'Scor mediu',       value: avgScore > 0 ? `${avgScore.toFixed(0)}%` : '—', iconBg: 'bg-green-50 dark:bg-green-950/40', iconColor: 'text-green-500' },
            { icon: Trophy,   label: 'Cel mai bun scor', value: bestScore > 0 ? `${bestScore.toFixed(0)}%` : '—', iconBg: 'bg-amber-50 dark:bg-amber-950/40', iconColor: 'text-amber-500' },
            { icon: Flame,    label: 'Plan',             value: subscriptionPlan === 'free' ? 'Gratuit' : subscriptionPlan === 'one_institution' ? '1 Inst.' : 'Complet', iconBg: 'bg-violet-50 dark:bg-violet-950/40', iconColor: 'text-violet-500' },
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
      </div>

      {/* ── Recent activity for this institution ── */}
      {instSessions.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-bold text-[var(--text-primary)]">Activitate recentă — {cfg.label}</h2>
            <Link href="/dashboard/progress" className="flex items-center gap-1 text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-semibold">
              <BarChart3 className="w-3 h-3" /> Progres
            </Link>
          </div>
          <div className="bg-[var(--bg-surface)] rounded-2xl border border-[var(--border)] overflow-hidden shadow-sm">
            {instSessions.slice(0, 5).map((session, i) => {
              const catCfg = CAT_CONFIG[session.category as TestCategory] ?? { bg: 'bg-slate-100 dark:bg-slate-800', text: 'text-slate-500' }
              return (
                <div
                  key={session.id}
                  className={`flex items-center gap-4 px-5 py-4 hover:bg-[var(--bg-muted)] transition-colors ${i < Math.min(instSessions.length, 5) - 1 ? 'border-b border-[var(--border)]' : ''}`}
                >
                  <div className={`w-10 h-10 rounded-xl ${catCfg.bg} flex items-center justify-center text-lg shrink-0`}>
                    {CATEGORY_ICONS[session.category as TestCategory]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[var(--text-primary)] truncate">
                      {CATEGORY_LABELS[session.category as TestCategory]}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] mt-0.5">
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
      {subscriptionPlan === 'free' && (
        <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-700 rounded-2xl p-7 shadow-xl shadow-indigo-200 dark:shadow-indigo-950">
          <div className="absolute -right-10 -top-10 w-48 h-48 bg-white/10 rounded-full pointer-events-none" />
          <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4 text-yellow-300" />
                <span className="text-yellow-300 text-xs font-semibold uppercase tracking-wide">Upgrade disponibil</span>
              </div>
              <h3 className="text-white font-extrabold text-xl leading-tight">Deblochează accesul complet</h3>
              <p className="text-indigo-200 text-sm mt-1.5">De la 69 lei — 200+ întrebări, simulare completă</p>
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
  )
}
