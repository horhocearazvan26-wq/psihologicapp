import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import {
  INSTITUTION_LABELS, INSTITUTION_FULL_NAMES,
  CATEGORY_LABELS, CATEGORY_ICONS, getScoreColor,
} from '@/lib/utils'
import type { Institution, TestCategory } from '@/types'
import { Lock, CheckCircle, ChevronRight, Shield, Star, Eye, Scale } from 'lucide-react'

const institutions: Institution[] = ['MAI', 'MApN', 'SRI', 'ANP']
const categories: TestCategory[] = ['attention', 'logic', 'memory', 'numerical', 'vocabulary', 'personality']

const INST_CONFIG: Record<Institution, {
  gradient: string; lightGradient: string; border: string; badge: string;
  icon: React.ReactNode; pattern: string; accent: string;
}> = {
  MAI: {
    gradient: 'from-blue-800 to-blue-600',
    lightGradient: 'from-blue-50 to-blue-100/60 dark:from-blue-950/40 dark:to-blue-900/20',
    border: 'border-blue-200 dark:border-blue-800',
    badge: 'bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300',
    icon: <Shield className="w-5 h-5" />,
    pattern: 'bg-blue-500',
    accent: 'text-blue-600 dark:text-blue-400',
  },
  MApN: {
    gradient: 'from-emerald-800 to-teal-600',
    lightGradient: 'from-emerald-50 to-teal-100/60 dark:from-emerald-950/40 dark:to-teal-900/20',
    border: 'border-emerald-200 dark:border-emerald-800',
    badge: 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300',
    icon: <Star className="w-5 h-5" />,
    pattern: 'bg-emerald-500',
    accent: 'text-emerald-600 dark:text-emerald-400',
  },
  SRI: {
    gradient: 'from-red-900 to-rose-600',
    lightGradient: 'from-red-50 to-rose-100/60 dark:from-red-950/40 dark:to-rose-900/20',
    border: 'border-red-200 dark:border-red-800',
    badge: 'bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-300',
    icon: <Eye className="w-5 h-5" />,
    pattern: 'bg-red-500',
    accent: 'text-red-600 dark:text-red-400',
  },
  ANP: {
    gradient: 'from-violet-800 to-indigo-600',
    lightGradient: 'from-violet-50 to-indigo-100/60 dark:from-violet-950/40 dark:to-indigo-900/20',
    border: 'border-violet-200 dark:border-violet-800',
    badge: 'bg-violet-100 dark:bg-violet-950/60 text-violet-700 dark:text-violet-300',
    icon: <Scale className="w-5 h-5" />,
    pattern: 'bg-violet-500',
    accent: 'text-violet-600 dark:text-violet-400',
  },
}

const CAT_CONFIG: Record<TestCategory, { bg: string; text: string }> = {
  attention:   { bg: 'bg-sky-50 dark:bg-sky-950/40',      text: 'text-sky-600 dark:text-sky-400' },
  logic:       { bg: 'bg-purple-50 dark:bg-purple-950/40', text: 'text-purple-600 dark:text-purple-400' },
  memory:      { bg: 'bg-amber-50 dark:bg-amber-950/40',   text: 'text-amber-600 dark:text-amber-400' },
  numerical:   { bg: 'bg-green-50 dark:bg-green-950/40',   text: 'text-green-600 dark:text-green-400' },
  vocabulary:  { bg: 'bg-rose-50 dark:bg-rose-950/40',     text: 'text-rose-600 dark:text-rose-400' },
  personality: { bg: 'bg-teal-50 dark:bg-teal-950/40',    text: 'text-teal-600 dark:text-teal-400' },
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
    <div className="space-y-12 animate-fade-up">
      <div>
        <h1 className="text-2xl font-extrabold text-[var(--text-primary)] tracking-tight">Teste de pregătire</h1>
        <p className="text-[var(--text-secondary)] mt-1.5 text-sm">Selectează instituția și categoria pentru a începe</p>
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
            {/* Institution header card */}
            <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-r ${cfg.lightGradient} border ${cfg.border} p-6 mb-5`}>
              <div className="flex items-center gap-5">
                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${cfg.gradient} flex items-center justify-center shadow-lg shrink-0`}>
                  <span className="text-white font-extrabold text-base tracking-wide">{inst}</span>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2.5 flex-wrap mb-1">
                    <h2 className="text-lg font-extrabold text-[var(--text-primary)]">{INSTITUTION_LABELS[inst]}</h2>
                    <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${cfg.badge}`}>
                      {accessible
                        ? <><CheckCircle className="w-3 h-3" /> Acces complet</>
                        : <><Lock className="w-3 h-3" /> Demo — 15 întrebări</>
                      }
                    </span>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)]">{INSTITUTION_FULL_NAMES[inst]}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-xs text-[var(--text-muted)]">{completedCats}/{categories.length} categorii</span>
                    {instAvg !== null && (
                      <span className={`text-xs font-bold ${getScoreColor(instAvg)}`}>
                        Medie: {instAvg.toFixed(0)}%
                      </span>
                    )}
                  </div>
                </div>

                {/* Progress circle (desktop) */}
                {instProgress.length > 0 && (
                  <div className="hidden sm:flex flex-col items-center gap-1 shrink-0">
                    <div className="relative w-14 h-14">
                      <svg className="w-14 h-14 -rotate-90" viewBox="0 0 56 56">
                        <circle cx="28" cy="28" r="22" fill="none" stroke="currentColor" strokeWidth="4" className="text-[var(--border)]" />
                        <circle
                          cx="28" cy="28" r="22" fill="none"
                          strokeWidth="4" strokeLinecap="round"
                          className={cfg.accent}
                          stroke="currentColor"
                          strokeDasharray={`${2 * Math.PI * 22}`}
                          strokeDashoffset={`${2 * Math.PI * 22 * (1 - completedCats / categories.length)}`}
                          style={{ transition: 'stroke-dashoffset 0.8s ease' }}
                        />
                      </svg>
                      <span className="absolute inset-0 flex items-center justify-center text-xs font-extrabold text-[var(--text-primary)]">
                        {Math.round(completedCats / categories.length * 100)}%
                      </span>
                    </div>
                    <span className="text-[10px] text-[var(--text-muted)] font-medium">progres</span>
                  </div>
                )}
              </div>
            </div>

            {/* Category grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((cat) => {
                const progress = getProgress(inst, cat)
                const catCfg = CAT_CONFIG[cat]
                const href = cat === 'attention'
                  ? `/dashboard/tests/${inst.toLowerCase()}/attention`
                  : `/dashboard/tests/${inst.toLowerCase()}/${cat}`

                return (
                  <Link key={cat} href={href}>
                    <div className="group bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl p-5 hover:-translate-y-1 hover:shadow-lg hover:border-[var(--border-strong)] transition-all duration-200 cursor-pointer h-full">
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
                                  className={`bg-gradient-to-r ${cfg.gradient} h-1.5 rounded-full transition-all`}
                                  style={{ width: `${Math.min(progress.average_score, 100)}%` }}
                                />
                              </div>
                            </div>
                          ) : (
                            <p className="text-xs text-[var(--text-muted)] mt-1">Neîncercat încă</p>
                          )}
                        </div>
                      </div>

                      <div className={`flex items-center justify-between text-xs font-semibold py-2 px-3.5 rounded-xl transition-all ${
                        accessible
                          ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-950/60'
                          : 'bg-[var(--bg-muted)] text-[var(--text-muted)]'
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
        <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-900 rounded-2xl p-7 text-white shadow-xl">
          <div className="absolute -right-10 -top-10 w-48 h-48 bg-blue-500/10 rounded-full" />
          <div className="absolute right-20 bottom-0 w-24 h-24 bg-indigo-500/10 rounded-full" />
          <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div>
              <h3 className="font-extrabold text-xl">Vrei acces la toate întrebările?</h3>
              <p className="text-slate-400 text-sm mt-1.5">
                De la 69 lei — 200+ întrebări, simulare completă, statistici detaliate
              </p>
            </div>
            <Link href="/dashboard/pricing" className="shrink-0">
              <div className="bg-white text-slate-900 font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-slate-100 transition-colors flex items-center gap-2 whitespace-nowrap">
                Deblochează acum <ChevronRight className="w-4 h-4" />
              </div>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
