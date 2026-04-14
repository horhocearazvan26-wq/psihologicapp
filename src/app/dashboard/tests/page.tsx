import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import {
  INSTITUTION_LABELS, INSTITUTION_FULL_NAMES,
  CATEGORY_LABELS, CATEGORY_ICONS, getScoreColor,
} from '@/lib/utils'
import type { Institution, TestCategory } from '@/types'
import { Lock, CheckCircle, ChevronRight, Shield, Star, Eye, Scale, Sparkles } from 'lucide-react'

const institutions: Institution[] = ['MAI', 'MApN', 'SRI', 'ANP']
const categories: TestCategory[] = ['attention', 'logic', 'memory', 'numerical', 'vocabulary', 'personality']

const INST_CONFIG: Record<Institution, {
  heroBg: string; heroGlow: string; progressBar: string;
  border: string; badge: string; badgeLocked: string;
  icon: React.ReactNode; accent: string; accentText: string;
}> = {
  MAI: {
    heroBg: 'linear-gradient(135deg, #0a2560 0%, #0f3d99 60%, #1550cc 100%)',
    heroGlow: 'rgba(59,130,246,0.25)',
    progressBar: 'from-blue-400 to-blue-600',
    border: 'border-blue-500/20',
    badge: 'bg-blue-500/15 text-blue-300 border border-blue-500/20',
    badgeLocked: 'bg-white/5 text-white/40 border border-white/10',
    icon: <Shield className="w-5 h-5 text-white" />,
    accent: 'text-blue-400',
    accentText: 'bg-blue-500/10 text-blue-300',
  },
  MApN: {
    heroBg: 'linear-gradient(135deg, #054535 0%, #0a6e55 60%, #0f8a6a 100%)',
    heroGlow: 'rgba(16,185,129,0.25)',
    progressBar: 'from-emerald-400 to-teal-500',
    border: 'border-emerald-500/20',
    badge: 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/20',
    badgeLocked: 'bg-white/5 text-white/40 border border-white/10',
    icon: <Star className="w-5 h-5 text-white" />,
    accent: 'text-emerald-400',
    accentText: 'bg-emerald-500/10 text-emerald-300',
  },
  SRI: {
    heroBg: 'linear-gradient(135deg, #500a0a 0%, #821212 60%, #a01818 100%)',
    heroGlow: 'rgba(239,68,68,0.25)',
    progressBar: 'from-red-400 to-rose-500',
    border: 'border-red-500/20',
    badge: 'bg-red-500/15 text-red-300 border border-red-500/20',
    badgeLocked: 'bg-white/5 text-white/40 border border-white/10',
    icon: <Eye className="w-5 h-5 text-white" />,
    accent: 'text-red-400',
    accentText: 'bg-red-500/10 text-red-300',
  },
  ANP: {
    heroBg: 'linear-gradient(135deg, #26156a 0%, #3d22aa 60%, #5030d0 100%)',
    heroGlow: 'rgba(139,92,246,0.25)',
    progressBar: 'from-violet-400 to-indigo-500',
    border: 'border-violet-500/20',
    badge: 'bg-violet-500/15 text-violet-300 border border-violet-500/20',
    badgeLocked: 'bg-white/5 text-white/40 border border-white/10',
    icon: <Scale className="w-5 h-5 text-white" />,
    accent: 'text-violet-400',
    accentText: 'bg-violet-500/10 text-violet-300',
  },
}

const CAT_CONFIG: Record<TestCategory, { bg: string; text: string; glow: string }> = {
  attention:   { bg: 'bg-sky-500/10',     text: 'text-sky-400',     glow: 'rgba(14,165,233,0.15)' },
  logic:       { bg: 'bg-purple-500/10',  text: 'text-purple-400',  glow: 'rgba(168,85,247,0.15)' },
  memory:      { bg: 'bg-amber-500/10',   text: 'text-amber-400',   glow: 'rgba(245,158,11,0.15)' },
  numerical:   { bg: 'bg-emerald-500/10', text: 'text-emerald-400', glow: 'rgba(16,185,129,0.15)' },
  vocabulary:  { bg: 'bg-rose-500/10',    text: 'text-rose-400',    glow: 'rgba(244,63,94,0.15)' },
  personality: { bg: 'bg-teal-500/10',    text: 'text-teal-400',    glow: 'rgba(20,184,166,0.15)' },
}

export default async function TestsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user!.id).single()
  const { data: progressData } = await supabase.from('user_progress').select('*').eq('user_id', user!.id)

  function isAccessible(inst: Institution) {
    if (!profile) return false
    if (profile.subscription_plan === 'all_institutions') return true
    if (profile.subscription_plan === 'one_institution') return profile.subscribed_institution === inst
    return false
  }

  function getProgress(inst: Institution, cat: TestCategory) {
    return progressData?.find(p => p.institution === inst && p.category === cat)
  }

  return (
    <div className="space-y-10 animate-fade-up">
      {/* Header */}
      <div>
        <p className="text-[10px] font-bold tracking-widest uppercase mb-2" style={{ color: 'var(--text-muted)' }}>Pregătire</p>
        <h1 className="text-2xl font-extrabold tracking-tight" style={{ color: 'var(--text-primary)' }}>Teste de pregătire</h1>
        <p className="mt-1.5 text-sm" style={{ color: 'var(--text-secondary)' }}>Selectează instituția și categoria pentru a începe</p>
      </div>

      {institutions.map((inst, instIdx) => {
        const accessible = isAccessible(inst)
        const cfg = INST_CONFIG[inst]
        const instProgress = progressData?.filter(p => p.institution === inst) ?? []
        const completedCats = categories.filter(cat => {
          const p = getProgress(inst, cat)
          return p && p.tests_taken > 0
        }).length
        const instAvg = instProgress.length
          ? instProgress.reduce((s, p) => s + p.average_score, 0) / instProgress.length
          : null

        return (
          <div key={inst} className={`animate-fade-up stagger-${instIdx + 1}`}>
            {/* Institution hero header */}
            <div
              className="relative overflow-hidden rounded-2xl p-6 mb-4"
              style={{
                background: cfg.heroBg,
                boxShadow: `0 20px 48px -16px ${cfg.heroGlow}, 0 0 0 1px rgba(255,255,255,0.06)`,
              }}
            >
              {/* Institution background image */}
              <img
                src={`/images/${inst.toLowerCase()}.jpg`}
                alt=""
                className="absolute inset-0 w-full h-full object-cover opacity-[0.15] pointer-events-none select-none"
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
              />
              <div className="absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)' }} />
              <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full blur-3xl" style={{ background: 'rgba(255,255,255,0.05)' }} />

              <div className="relative flex items-center gap-5">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg shrink-0 border border-white/20"
                  style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(12px)' }}
                >
                  {cfg.icon}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2.5 flex-wrap mb-1">
                    <h2 className="text-lg font-extrabold text-white tracking-tight">{INSTITUTION_LABELS[inst]}</h2>
                    <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide ${accessible ? cfg.badge : cfg.badgeLocked}`}>
                      {accessible
                        ? <><CheckCircle className="w-3 h-3" /> Acces complet</>
                        : <><Lock className="w-3 h-3" /> Demo — 15 întrebări</>
                      }
                    </span>
                  </div>
                  <p className="text-sm text-white/50 font-medium">{INSTITUTION_FULL_NAMES[inst]}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-xs text-white/35 font-medium">{completedCats}/{categories.length} categorii completate</span>
                    {instAvg !== null && (
                      <span className={`text-xs font-extrabold ${getScoreColor(instAvg)}`}>
                        Medie: {instAvg.toFixed(0)}%
                      </span>
                    )}
                  </div>
                </div>

                {/* SVG progress ring */}
                {instProgress.length > 0 && (
                  <div className="hidden sm:flex flex-col items-center gap-1 shrink-0">
                    <div className="relative w-14 h-14">
                      <svg className="w-14 h-14 -rotate-90" viewBox="0 0 56 56">
                        <circle cx="28" cy="28" r="22" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3.5" />
                        <circle
                          cx="28" cy="28" r="22" fill="none"
                          stroke="rgba(255,255,255,0.7)" strokeWidth="3.5" strokeLinecap="round"
                          strokeDasharray={`${2 * Math.PI * 22}`}
                          strokeDashoffset={`${2 * Math.PI * 22 * (1 - completedCats / categories.length)}`}
                          style={{ transition: 'stroke-dashoffset 0.8s ease' }}
                        />
                      </svg>
                      <span className="absolute inset-0 flex items-center justify-center text-xs font-extrabold text-white">
                        {Math.round(completedCats / categories.length * 100)}%
                      </span>
                    </div>
                    <span className="text-[9px] text-white/30 font-bold uppercase tracking-widest">progres</span>
                  </div>
                )}
              </div>

              {/* Progress bar */}
              {completedCats > 0 && (
                <div className="relative mt-5">
                  <div className="w-full rounded-full h-1" style={{ background: 'rgba(255,255,255,0.1)' }}>
                    <div
                      className={`bg-gradient-to-r ${cfg.progressBar} h-1 rounded-full transition-all duration-700`}
                      style={{ width: `${completedCats / 6 * 100}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Category grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {categories.map((cat) => {
                const progress = getProgress(inst, cat)
                const catCfg = CAT_CONFIG[cat]
                const href = cat === 'attention'
                  ? `/dashboard/tests/${inst.toLowerCase()}/attention`
                  : `/dashboard/tests/${inst.toLowerCase()}/${cat}`

                return (
                  <Link key={cat} href={href}>
                    <div className="group dash-card rounded-2xl p-5 hover:-translate-y-1 transition-all duration-200 cursor-pointer h-full relative overflow-hidden">
                      <div className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${cfg.progressBar} opacity-0 group-hover:opacity-50 transition-opacity`} />
                      <div className="flex items-start gap-3.5 mb-4">
                        <div
                          className={`w-11 h-11 rounded-xl ${catCfg.bg} flex items-center justify-center text-xl shrink-0 transition-transform duration-200 group-hover:scale-110`}
                          style={{ boxShadow: progress?.tests_taken ? `0 0 16px ${catCfg.glow}` : 'none' }}
                        >
                          {CATEGORY_ICONS[cat]}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-sm leading-tight" style={{ color: 'var(--text-primary)' }}>{CATEGORY_LABELS[cat]}</h3>
                          {progress && progress.tests_taken > 0 ? (
                            <div className="mt-2 space-y-1.5">
                              <div className="flex justify-between text-xs">
                                <span style={{ color: 'var(--text-muted)' }}>{progress.tests_taken} teste</span>
                                <span className={`font-extrabold ${getScoreColor(progress.average_score)}`}>
                                  {progress.average_score.toFixed(0)}%
                                </span>
                              </div>
                              <div className="w-full rounded-full h-1.5" style={{ background: 'var(--bg-muted)' }}>
                                <div
                                  className={`bg-gradient-to-r ${cfg.progressBar} h-1.5 rounded-full transition-all`}
                                  style={{ width: `${Math.min(progress.average_score, 100)}%` }}
                                />
                              </div>
                            </div>
                          ) : (
                            <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>Neîncercat încă</p>
                          )}
                        </div>
                      </div>

                      <div className={`flex items-center justify-between text-xs font-semibold py-2 px-3.5 rounded-xl transition-all ${
                        accessible
                          ? `${catCfg.bg} ${catCfg.text} group-hover:opacity-80`
                          : 'bg-white/[0.04] text-white/30'
                      }`}>
                        <span>{accessible ? 'Începe testul' : 'Demo — 15 întrebări'}</span>
                        <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        )
      })}

      {/* Upgrade CTA */}
      {profile?.subscription_plan === 'free' && (
        <div
          className="relative overflow-hidden rounded-2xl p-7 text-white"
          style={{
            background: 'linear-gradient(135deg, #111827 0%, #1e2840 100%)',
            boxShadow: '0 0 0 1px rgba(255,255,255,0.06)',
          }}
        >
          <div className="absolute -right-10 -top-10 w-48 h-48 rounded-full blur-3xl" style={{ background: 'rgba(99,102,241,0.1)' }} />
          <div className="absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)' }} />
          <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-400">Acces premium</span>
              </div>
              <h3 className="font-extrabold text-xl tracking-tight">Vrei acces la toate întrebările?</h3>
              <p className="text-white/40 text-sm mt-1.5">De la 69 lei — 200+ întrebări, simulare completă, statistici</p>
            </div>
            <Link href="/dashboard/pricing" className="shrink-0">
              <div
                className="font-bold text-sm px-5 py-2.5 rounded-xl flex items-center gap-2 whitespace-nowrap btn-shimmer transition-opacity hover:opacity-90"
                style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', boxShadow: '0 8px 20px -8px rgba(99,102,241,0.5)' }}
              >
                Deblochează acum <ChevronRight className="w-4 h-4" />
              </div>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
