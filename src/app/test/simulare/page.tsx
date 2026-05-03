import { createClient, getRequiredUser } from '@/lib/supabase/server'
import { SimulationSelector } from '@/app/dashboard/simulate/simulation-selector'
import type { Institution } from '@/types'
import { INSTITUTION_FULL_NAMES, getScoreColor } from '@/lib/utils'
import { ClipboardList, Clock, Target, AlertTriangle, Shield, Star, Eye, Scale } from 'lucide-react'

const institutions: Institution[] = ['MAI', 'MApN', 'SRI', 'ANP']
const SIMULATION_CATEGORY_COUNT = 9
const QUESTIONS_PER_CATEGORY = 30
const TOTAL_MCQ_QUESTIONS = 6 * QUESTIONS_PER_CATEGORY
const TOTAL_INTERACTIVE_ITEMS = 10 + 96 + 18
const TOTAL_QUESTIONS = TOTAL_MCQ_QUESTIONS + TOTAL_INTERACTIVE_ITEMS
const TOTAL_MINUTES = Math.round((TOTAL_MCQ_QUESTIONS * 45) / 60) + 18

const INST_STYLES: Record<Institution, {
  gradient: string; icon: React.ReactNode
}> = {
  MAI:  { gradient: 'from-blue-700 to-blue-900',     icon: <Shield className="w-5 h-5" /> },
  MApN: { gradient: 'from-emerald-700 to-teal-900',  icon: <Star className="w-5 h-5" /> },
  SRI:  { gradient: 'from-red-800 to-rose-950',      icon: <Eye className="w-5 h-5" /> },
  ANP:  { gradient: 'from-violet-700 to-indigo-900', icon: <Scale className="w-5 h-5" /> },
}

export default async function SimulateSelectionPage() {
  const user = await getRequiredUser('/auth/login')
  const supabase = await createClient()
  const { data: profile } = await supabase
    .from('profiles').select('subscription_plan, subscribed_institution').eq('id', user.id).single()
  const { data: prevSims } = await supabase
    .from('test_sessions').select('institution, score, completed_at, correct_answers, total_questions')
    .eq('user_id', user.id).eq('is_simulation', true).eq('completed', true)
    .order('completed_at', { ascending: false }).limit(5)

  function canSimulate(inst: Institution): boolean {
    if (!profile) return false
    if (profile.subscription_plan === 'all_institutions') return true
    if (profile.subscription_plan === 'one_institution') return profile.subscribed_institution === inst
    return false
  }

  const bestSim = prevSims?.length ? Math.max(...prevSims.map(s => s.score ?? 0)) : null

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fade-up">

      {/* Header */}
      <div>
        <p className="text-[10px] font-bold tracking-widest uppercase mb-2 text-cyan-300/60">
          Pregătire avansată
        </p>
        <h1 className="text-2xl font-extrabold tracking-tight text-white">Simulare Examen</h1>
        <p className="mt-1.5 text-sm text-white/50">
          Condiții reale — toate probele CAS++ în ordine, cronometru strict
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { icon: ClipboardList, label: `${SIMULATION_CATEGORY_COUNT} probe`,  sub: 'Categorii CAS++',   color: 'text-indigo-400',  bar: 'bg-indigo-500' },
          { icon: Clock,         label: `~${TOTAL_MINUTES} min`,               sub: 'Durată estimată',   color: 'text-amber-400',   bar: 'bg-amber-500' },
          { icon: Target,        label: `${TOTAL_QUESTIONS} itemi`,            sub: 'MCQ + interactive', color: 'text-emerald-400', bar: 'bg-emerald-500' },
        ].map((item) => {
          const Icon = item.icon
          return (
            <div key={item.label} className="relative overflow-hidden rounded-2xl border border-white/8 bg-white/5 p-4 text-center backdrop-blur-sm">
              <div className={`absolute inset-x-0 top-0 h-0.5 ${item.bar} opacity-50`} />
              <Icon className={`mx-auto mb-2 w-5 h-5 ${item.color}`} />
              <p className="font-extrabold text-sm text-white leading-none">{item.label}</p>
              <p className="text-[10px] mt-1 text-white/40">{item.sub}</p>
            </div>
          )
        })}
      </div>

      {/* Best score */}
      {bestSim !== null && (
        <div className={`flex items-center gap-5 p-5 rounded-2xl border ${
          bestSim >= 80 ? 'border-green-500/20 bg-green-500/8' :
          bestSim >= 60 ? 'border-amber-500/20 bg-amber-500/8' :
          'border-red-500/20 bg-red-500/8'
        }`}>
          <div className={`text-4xl font-extrabold tracking-tight shrink-0 ${getScoreColor(bestSim)}`}>
            {bestSim.toFixed(0)}%
          </div>
          <div>
            <p className="text-sm font-bold text-white">Cel mai bun scor la simulare</p>
            <p className="text-xs mt-0.5 text-white/50">
              {bestSim >= 80 ? 'Excelent! Ești pe drumul cel bun.' :
               bestSim >= 60 ? 'Bun! Mai ai loc de îmbunătățire.' :
               'Continuă să exersezi, vei progresa!'}
            </p>
          </div>
        </div>
      )}

      {/* Warning */}
      <div className="flex items-start gap-3.5 rounded-2xl border border-amber-500/20 bg-amber-500/8 p-4">
        <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <p className="text-sm text-amber-200/80">
          <strong className="font-semibold text-amber-300">Atenție:</strong> Odată pornită simularea nu o
          poți întrerupe fără a pierde progresul. Asigură-te că ai cel puțin{' '}
          <strong>{TOTAL_MINUTES} de minute</strong> disponibile.
        </p>
      </div>

      {/* Institution selector */}
      <SimulationSelector
        institutions={institutions.map((inst) => ({
          inst,
          label: inst,
          fullName: INSTITUTION_FULL_NAMES[inst],
          canSimulate: canSimulate(inst),
          gradient: INST_STYLES[inst].gradient,
          border: '',
          bg: '',
          text: '',
          icon: INST_STYLES[inst].icon,
        }))}
      />

      {/* Previous simulations */}
      {prevSims && prevSims.length > 0 && (
        <div>
          <h2 className="text-sm font-bold mb-4 text-white/70 uppercase tracking-widest text-[11px]">
            Simulări anterioare
          </h2>
          <div className="rounded-2xl border border-white/8 bg-white/5 overflow-hidden">
            {prevSims.map((sim, i) => (
              <div
                key={i}
                className={`flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between ${i < prevSims.length - 1 ? 'border-b border-white/8' : ''}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${INST_STYLES[sim.institution as Institution]?.gradient ?? 'from-slate-600 to-slate-800'} flex items-center justify-center shrink-0 shadow-md`}>
                    <span className="text-white font-bold text-xs">{sim.institution}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{sim.institution}</p>
                    <p className="text-xs text-white/40">
                      {new Date(sim.completed_at).toLocaleDateString('ro-RO', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                  </div>
                </div>
                <div className="text-left sm:text-right">
                  <p className={`text-base font-extrabold ${getScoreColor(sim.score)}`}>
                    {sim.score?.toFixed(0)}%
                  </p>
                  {sim.correct_answers != null && (
                    <p className="text-xs text-white/40">{sim.correct_answers}/{sim.total_questions}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
