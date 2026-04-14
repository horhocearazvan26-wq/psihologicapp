'use client'

import { useState, useSyncExternalStore } from 'react'
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
    heroBg: 'linear-gradient(135deg, #0c2d6b 0%, #1246a8 50%, #1a5fc7 100%)',
    heroGlow: 'rgba(59,130,246,0.2)',
    border: 'border-blue-500/20',
    bg: 'bg-blue-500/10',
    text: 'text-blue-300',
    progress: 'from-blue-400 to-blue-600',
    icon: <Shield className="w-6 h-6 text-white" />,
    label: 'MAI',
    fullName: 'Ministerul Afacerilor Interne',
  },
  MApN: {
    gradient: 'from-emerald-800 to-teal-600',
    heroBg: 'linear-gradient(135deg, #065040 0%, #0d7a5e 50%, #0f9070 100%)',
    heroGlow: 'rgba(16,185,129,0.2)',
    border: 'border-emerald-500/20',
    bg: 'bg-emerald-500/10',
    text: 'text-emerald-300',
    progress: 'from-emerald-400 to-teal-500',
    icon: <Star className="w-6 h-6 text-white" />,
    label: 'MApN',
    fullName: 'Ministerul Apărării Naționale',
  },
  SRI: {
    gradient: 'from-red-900 to-rose-600',
    heroBg: 'linear-gradient(135deg, #5c0d0d 0%, #8b1515 50%, #a01c1c 100%)',
    heroGlow: 'rgba(239,68,68,0.2)',
    border: 'border-red-500/20',
    bg: 'bg-red-500/10',
    text: 'text-red-300',
    progress: 'from-red-400 to-rose-500',
    icon: <Eye className="w-6 h-6 text-white" />,
    label: 'SRI',
    fullName: 'Serviciul Român de Informații',
  },
  ANP: {
    gradient: 'from-violet-800 to-indigo-600',
    heroBg: 'linear-gradient(135deg, #2d1b6b 0%, #4c2ba8 50%, #5b35c7 100%)',
    heroGlow: 'rgba(139,92,246,0.2)',
    border: 'border-violet-500/20',
    bg: 'bg-violet-500/10',
    text: 'text-violet-300',
    progress: 'from-violet-400 to-indigo-500',
    icon: <Scale className="w-6 h-6 text-white" />,
    label: 'ANP',
    fullName: 'Administrația Națională a Penitenciarelor',
  },
}

const CAT_CONFIG: Record<TestCategory, { bg: string; text: string; glow: string }> = {
  attention:   { bg: 'bg-indigo-500/10', text: 'text-indigo-400', glow: 'rgba(99,102,241,0.15)' },
  logic:       { bg: 'bg-indigo-500/10', text: 'text-indigo-400', glow: 'rgba(99,102,241,0.15)' },
  memory:      { bg: 'bg-indigo-500/10', text: 'text-indigo-400', glow: 'rgba(99,102,241,0.15)' },
  numerical:   { bg: 'bg-indigo-500/10', text: 'text-indigo-400', glow: 'rgba(99,102,241,0.15)' },
  vocabulary:  { bg: 'bg-indigo-500/10', text: 'text-indigo-400', glow: 'rgba(99,102,241,0.15)' },
  personality: { bg: 'bg-indigo-500/10', text: 'text-indigo-400', glow: 'rgba(99,102,241,0.15)' },
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
  initialInstitution: string | null
}

export function DashboardClient({
  firstName, totalTests, avgScore, bestScore,
  subscriptionPlan, progressData, recentSessions, daysUntil, initialInstitution,
}: DashboardClientProps) {
  const [institution, setInstitution] = useState<string | null>(() => {
    if (typeof window === 'undefined') return null
    return localStorage.getItem(STORAGE_KEY) ?? initialInstitution
  })
  const [showPicker, setShowPicker] = useState(() => {
    if (typeof window === 'undefined') return false
    return !(localStorage.getItem(STORAGE_KEY) ?? initialInstitution)
  })
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  )

  function handlePickerSelect(id: string) {
    setInstitution(id)
    setShowPicker(false)
  }

  function changeInstitution() {
    localStorage.removeItem(STORAGE_KEY)
    setInstitution(null)
    setShowPicker(true)
  }

  if (!mounted) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="h-44 rounded-3xl skeleton" />
        <div className="grid grid-cols-3 gap-3">
          <div className="h-28 rounded-2xl skeleton" />
          <div className="h-28 rounded-2xl skeleton" />
          <div className="h-28 rounded-2xl skeleton" />
        </div>
      </div>
    )
  }
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
  const examCountdown = daysUntil == null
    ? '—'
    : daysUntil < 0
      ? 'Trecut'
      : daysUntil === 0
        ? 'Azi!'
        : `${daysUntil}z`

  return (
    <div className="space-y-7 animate-fade-up">

      {/* ── Institution hero banner ── */}
      <div
        className="relative overflow-hidden rounded-3xl p-7 shadow-2xl"
        style={{
          background: cfg.heroBg,
          boxShadow: `0 32px 64px -24px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)`,
        }}
      >
        {/* Full-bleed institution image */}
        <img
          src={`/images/${inst.toLowerCase()}.png`}
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700"
          onError={(e) => { e.currentTarget.style.display = 'none' }}
        />
        {/* Gradient overlay over image */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.4) 55%, rgba(0,0,0,0.2) 100%)' }} />
        {/* Decorative elements */}
        <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full blur-3xl pointer-events-none" style={{ background: 'rgba(255,255,255,0.05)' }} />
        <div className="absolute bottom-0 right-0 w-48 h-48 rounded-full blur-2xl pointer-events-none" style={{ background: 'rgba(255,255,255,0.03)' }} />
        <div className="absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)' }} />
        {/* Geometric accent */}
        <div className="absolute right-8 top-8 w-20 h-20 rounded-2xl border border-white/10 rotate-12 hidden sm:block" />
        <div className="absolute right-14 top-14 w-12 h-12 rounded-xl border border-white/[0.07] rotate-12 hidden sm:block" />

        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-center gap-4">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 border border-white/20"
              style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(12px)' }}
            >
              {cfg.icon}
            </div>
            <div>
              <p className="text-white/50 text-xs font-medium mb-0.5 tracking-wide uppercase">{greeting}, {firstName}</p>
              <h1 className="text-white font-extrabold text-3xl tracking-tight leading-none">{cfg.label}</h1>
              <p className="text-white/40 text-xs mt-1.5 font-medium">{cfg.fullName}</p>
            </div>
          </div>

          <button
            onClick={changeInstitution}
            className="inline-flex items-center gap-1.5 self-start rounded-full px-3 py-1.5 text-xs font-medium text-white/60 transition-all hover:text-white border border-white/10 hover:border-white/20 hover:bg-white/8"
          >
            <RefreshCw className="w-3 h-3" />
            Schimbă
          </button>
        </div>

        {/* Stats bar */}
        <div className="relative mt-6 grid grid-cols-3 gap-3">
          {[
            { label: 'Teste', value: instTests.toString() || '0' },
            { label: 'Medie', value: instAvg > 0 ? `${instAvg.toFixed(0)}%` : '—' },
            { label: 'Examen', value: examCountdown },
          ].map(s => (
            <div
              key={s.label}
              className="rounded-2xl px-4 py-3 text-center border border-white/10"
              style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(8px)' }}
            >
              <p className="text-white font-extrabold text-xl leading-none tracking-tight">{s.value}</p>
              <p className="text-white/40 text-[10px] mt-1 font-semibold uppercase tracking-widest">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Progress bar */}
        {completedCats > 0 && (
          <div className="relative mt-5">
            <div className="flex items-center justify-between text-[10px] text-white/35 mb-2 uppercase tracking-widest font-semibold">
              <span>Progres categorii</span>
              <span>{completedCats}/6 — {Math.round(completedCats / 6 * 100)}%</span>
            </div>
            <div className="w-full rounded-full h-1" style={{ background: 'rgba(255,255,255,0.1)' }}>
              <div
                className={`bg-gradient-to-r ${cfg.progress} h-1 rounded-full transition-all duration-700`}
                style={{ width: `${completedCats / 6 * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* ── Quick actions ── */}
      <div>
        <p className="text-[10px] font-bold tracking-widest uppercase mb-4" style={{ color: 'var(--text-muted)' }}>Acțiuni rapide</p>
        <div className="grid grid-cols-3 gap-3">
          {[
            { href: '/dashboard/simulate',   icon: Play,       title: 'Simulare',   sub: 'Condiții reale' },
            { href: '/dashboard/flashcards', icon: Layers,     title: 'Flashcards', sub: 'Memorare' },
            { href: '/dashboard/review',     icon: TrendingUp, title: 'Review',     sub: 'Greșeli' },
          ].map(({ href, icon: Icon, title, sub }) => (
            <Link key={href} href={href}>
              <div
                className="group flex flex-col items-center gap-3 py-5 px-3 rounded-2xl cursor-pointer transition-all duration-200 active:scale-95 text-center"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  backdropFilter: 'blur(24px) saturate(160%)',
                  WebkitBackdropFilter: 'blur(24px) saturate(160%)',
                  border: '1px solid rgba(255,255,255,0.09)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.1)',
                }}
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-200 group-hover:scale-105"
                  style={{
                    background: 'linear-gradient(145deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.05) 100%)',
                    boxShadow: '0 6px 16px rgba(0,0,0,0.5), 0 2px 4px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -1px 0 rgba(0,0,0,0.2)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-white leading-tight">{title}</p>
                  <p className="text-[11px] text-white/35 mt-0.5">{sub}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ── Category tests ── */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>Categorii {cfg.label}</h2>
          <Link href={`/dashboard/tests?institution=${inst}`} className="flex items-center gap-1 text-xs font-semibold text-white/40 hover:text-white/70 transition-colors">
            Toate <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: 'rgba(255,255,255,0.04)',
            backdropFilter: 'blur(24px) saturate(160%)',
            WebkitBackdropFilter: 'blur(24px) saturate(160%)',
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.08)',
          }}
        >
          {categories.map((cat, i) => {
            const progress = instProgress.find(p => p.category === cat)
            const href = cat === 'attention'
              ? `/dashboard/tests/${inst.toLowerCase()}/attention`
              : `/dashboard/tests/${inst.toLowerCase()}/${cat}`
            const hasProgress = progress && progress.tests_taken > 0

            return (
              <Link key={cat} href={href}>
                <div
                  className={`group flex items-center gap-4 px-4 py-3.5 cursor-pointer transition-colors hover:bg-white/[0.03] ${i < categories.length - 1 ? 'border-b border-white/[0.05]' : ''}`}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-base transition-transform duration-200 group-hover:scale-105"
                    style={{
                      background: 'linear-gradient(145deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 100%)',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.18), inset 0 -1px 0 rgba(0,0,0,0.15)',
                      border: '1px solid rgba(255,255,255,0.09)',
                    }}
                  >
                    {CATEGORY_ICONS[cat]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-[14px] text-white leading-tight">{CATEGORY_LABELS[cat]}</p>
                    {hasProgress ? (
                      <div className="flex items-center gap-2 mt-1.5">
                        <div className="flex-1 h-[2px] rounded-full bg-white/10">
                          <div className="h-full rounded-full bg-white/40 transition-all duration-700" style={{ width: `${Math.min(progress.average_score, 100)}%` }} />
                        </div>
                        <span className="text-[11px] font-semibold text-white/40 shrink-0">{progress.average_score.toFixed(0)}%</span>
                      </div>
                    ) : (
                      <p className="text-[11px] mt-0.5 text-white/20">Neîncercat</p>
                    )}
                  </div>
                  <ChevronRight className="w-4 h-4 text-white/15 group-hover:text-white/40 group-hover:translate-x-0.5 transition-all shrink-0" />
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      {/* ── Global stats ── */}
      <div>
        <p className="text-[10px] font-bold tracking-widest uppercase mb-4" style={{ color: 'var(--text-muted)' }}>Statistici generale</p>
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: BookOpen, label: 'Teste totale',     value: totalTests.toString() },
            { icon: Target,   label: 'Scor mediu',       value: avgScore > 0 ? `${avgScore.toFixed(0)}%` : '—' },
            { icon: Trophy,   label: 'Cel mai bun scor', value: bestScore > 0 ? `${bestScore.toFixed(0)}%` : '—' },
            { icon: Flame,    label: 'Plan activ',       value: subscriptionPlan === 'free' ? 'Gratuit' : subscriptionPlan === 'one_institution' ? '1 Inst.' : 'Complet' },
          ].map((stat, i) => {
            const Icon = stat.icon
            return (
              <div
                key={stat.label}
                className={`relative rounded-2xl p-4 animate-fade-up stagger-${i + 1}`}
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  backdropFilter: 'blur(24px) saturate(160%)',
                  WebkitBackdropFilter: 'blur(24px) saturate(160%)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.08)',
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                  style={{
                    background: 'linear-gradient(145deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.05) 100%)',
                    boxShadow: '0 6px 16px rgba(0,0,0,0.5), 0 2px 4px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -1px 0 rgba(0,0,0,0.2)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  <Icon className="w-4.5 h-4.5 text-white/80" style={{ width: '18px', height: '18px' }} />
                </div>
                <p className="text-2xl font-bold text-white leading-none tracking-tight">{stat.value}</p>
                <p className="text-[11px] text-white/35 mt-1">{stat.label}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── Recent activity ── */}
      {instSessions.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>Activitate recentă — {cfg.label}</h2>
            <Link href="/dashboard/progress" className="flex items-center gap-1 text-xs text-white/40 hover:text-white/70 transition-colors font-semibold">
              <BarChart3 className="w-3 h-3" /> Progres
            </Link>
          </div>
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              background: 'rgba(255,255,255,0.04)',
              backdropFilter: 'blur(24px) saturate(160%)',
              WebkitBackdropFilter: 'blur(24px) saturate(160%)',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.08)',
            }}
          >
            {instSessions.slice(0, 5).map((session, i) => (
              <div
                key={session.id}
                className={`flex items-center gap-4 px-4 py-3.5 transition-colors hover:bg-white/[0.02] ${i < Math.min(instSessions.length, 5) - 1 ? 'border-b border-white/[0.05]' : ''}`}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-base shrink-0"
                  style={{
                    background: 'linear-gradient(145deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 100%)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.18), inset 0 -1px 0 rgba(0,0,0,0.15)',
                    border: '1px solid rgba(255,255,255,0.09)',
                  }}
                >
                  {CATEGORY_ICONS[session.category as TestCategory]}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-white truncate">{CATEGORY_LABELS[session.category as TestCategory]}</p>
                  <div className="flex items-center gap-1.5 text-[11px] text-white/30 mt-0.5">
                    <Clock className="w-3 h-3" />
                    <span>{new Date(session.completed_at).toLocaleDateString('ro-RO', { day: 'numeric', month: 'short' })}</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className={`text-sm font-bold ${getScoreColor(session.score)}`}>{session.score?.toFixed(0)}%</p>
                  <p className="text-[11px] text-white/30">{session.correct_answers}/{session.total_questions}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Upgrade CTA ── */}
      {subscriptionPlan === 'free' && (
        <div
          className="relative overflow-hidden rounded-2xl p-7"
          style={{
            background: 'linear-gradient(135deg, #1e1060 0%, #2d1b8a 50%, #3b26a8 100%)',
            boxShadow: '0 24px 48px -16px rgba(99,102,241,0.5), 0 0 0 1px rgba(129,140,248,0.2)',
          }}
        >
          <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full blur-3xl" style={{ background: 'rgba(139,92,246,0.15)' }} />
          <div className="absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(165,180,252,0.4), transparent)' }} />
          <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4 text-yellow-300 animate-pulse" />
                <span className="text-yellow-300 text-[10px] font-bold uppercase tracking-widest">Upgrade disponibil</span>
              </div>
              <h3 className="text-white font-extrabold text-xl leading-tight tracking-tight">Deblochează accesul complet</h3>
              <p className="text-indigo-200/70 text-sm mt-1.5">De la 69 lei — 200+ întrebări, simulare completă</p>
            </div>
            <Link href="/dashboard/pricing" className="shrink-0">
              <div className="bg-white text-indigo-700 font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-indigo-50 transition-colors flex items-center gap-2 shadow-lg btn-shimmer">
                Vezi planuri <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
