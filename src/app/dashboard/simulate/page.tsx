import { createClient } from '@/lib/supabase/server'
import { SimulationSelector } from './simulation-selector'
import type { Institution } from '@/types'
import { INSTITUTION_FULL_NAMES } from '@/lib/utils'
import { ClipboardList, Clock, Target, AlertTriangle, Shield, Star, Eye, Scale } from 'lucide-react'
import { getScoreColor } from '@/lib/utils'

const institutions: Institution[] = ['MAI', 'MApN', 'SRI', 'ANP']

const INST_STYLES: Record<Institution, {
  gradient: string; border: string; bg: string; text: string; icon: React.ReactNode
}> = {
  MAI:  { gradient: 'from-blue-700 to-blue-900',    border: 'border-blue-200 dark:border-blue-800', bg: 'bg-blue-50 dark:bg-blue-950/30',    text: 'text-blue-600 dark:text-blue-400', icon: <Shield className="w-5 h-5" /> },
  MApN: { gradient: 'from-emerald-700 to-teal-900', border: 'border-emerald-200 dark:border-emerald-800', bg: 'bg-emerald-50 dark:bg-emerald-950/30', text: 'text-emerald-600 dark:text-emerald-400', icon: <Star className="w-5 h-5" /> },
  SRI:  { gradient: 'from-red-800 to-rose-950',     border: 'border-red-200 dark:border-red-800',   bg: 'bg-red-50 dark:bg-red-950/30',    text: 'text-red-600 dark:text-red-400', icon: <Eye className="w-5 h-5" /> },
  ANP:  { gradient: 'from-violet-700 to-indigo-900',border: 'border-violet-200 dark:border-violet-800', bg: 'bg-violet-50 dark:bg-violet-950/30', text: 'text-violet-600 dark:text-violet-400', icon: <Scale className="w-5 h-5" /> },
}

export default async function SimulatePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: profile } = await supabase
    .from('profiles').select('subscription_plan, subscribed_institution').eq('id', user!.id).single()
  const { data: prevSims } = await supabase
    .from('test_sessions').select('institution, score, completed_at, correct_answers, total_questions')
    .eq('user_id', user!.id).eq('is_simulation', true).eq('completed', true)
    .order('completed_at', { ascending: false }).limit(5)

  function canSimulate(inst: Institution): boolean {
    if (!profile) return false
    if (profile.subscription_plan === 'all_institutions') return true
    if (profile.subscription_plan === 'one_institution') return profile.subscribed_institution === inst
    return false
  }

  const bestSim = prevSims?.length ? Math.max(...prevSims.map(s => s.score ?? 0)) : null

  return (
    <div className="space-y-8 animate-fade-up">

      {/* Header */}
      <div>
        <p className="text-[10px] font-bold tracking-widest uppercase mb-2" style={{ color: 'var(--text-muted)' }}>Pregătire avansată</p>
        <h1 className="text-2xl font-extrabold tracking-tight" style={{ color: 'var(--text-primary)' }}>Simulare Examen</h1>
        <p className="mt-1.5 text-sm" style={{ color: 'var(--text-secondary)' }}>
          Condiții reale — toate probele în ordine, cronometru strict
        </p>
      </div>

      {/* Stats overview */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { icon: ClipboardList, label: '6 probe',        sub: 'Categorii',      iconBg: 'bg-indigo-500/10', iconColor: 'text-indigo-400', topBar: 'from-indigo-500 to-indigo-400' },
          { icon: Clock,         label: '~90 min',        sub: 'Durată totală',  iconBg: 'bg-amber-500/10',  iconColor: 'text-amber-400',  topBar: 'from-amber-500 to-amber-400' },
          { icon: Target,        label: '180 întrebări',  sub: 'Total probe',    iconBg: 'bg-emerald-500/10',iconColor: 'text-emerald-400',topBar: 'from-emerald-500 to-emerald-400' },
        ].map((item) => {
          const Icon = item.icon
          return (
            <div key={item.label} className="relative dash-card overflow-hidden rounded-2xl p-5 text-center">
              <div className={`absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r ${item.topBar} opacity-60`} />
              <div className={`w-10 h-10 rounded-xl ${item.iconBg} flex items-center justify-center mx-auto mb-3`}>
                <Icon className={`w-5 h-5 ${item.iconColor}`} />
              </div>
              <p className="font-extrabold text-base leading-none tracking-tight" style={{ color: 'var(--text-primary)' }}>{item.label}</p>
              <p className="text-xs mt-1.5" style={{ color: 'var(--text-muted)' }}>{item.sub}</p>
            </div>
          )
        })}
      </div>

      {/* Best score banner */}
      {bestSim !== null && (
        <div
          className="flex items-center gap-5 p-5 rounded-2xl border"
          style={{
            background: bestSim >= 80 ? 'rgba(16,185,129,0.06)' : bestSim >= 60 ? 'rgba(245,158,11,0.06)' : 'rgba(239,68,68,0.06)',
            borderColor: bestSim >= 80 ? 'rgba(16,185,129,0.2)' : bestSim >= 60 ? 'rgba(245,158,11,0.2)' : 'rgba(239,68,68,0.2)',
          }}
        >
          <div className={`text-4xl font-extrabold tracking-tight shrink-0 ${getScoreColor(bestSim)}`}>{bestSim.toFixed(0)}%</div>
          <div>
            <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>Cel mai bun scor la simulare</p>
            <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>
              {bestSim >= 80 ? 'Excelent! Ești pe drumul cel bun.' : bestSim >= 60 ? 'Bun! Mai ai loc de îmbunătățire.' : 'Continuă să exersezi, vei progresa!'}
            </p>
          </div>
        </div>
      )}

      {/* Warning */}
      <div
        className="flex items-start gap-3.5 rounded-2xl p-4 border"
        style={{ background: 'rgba(245,158,11,0.06)', borderColor: 'rgba(245,158,11,0.2)' }}
      >
        <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="text-sm text-amber-300/80">
          <strong className="font-semibold text-amber-300">Atenție:</strong> Odată pornită simularea nu o poți întrerupe fără a pierde progresul.
          Asigură-te că ai cel puțin <strong>90 de minute</strong> disponibile.
        </div>
      </div>

      {/* Selector */}
      <SimulationSelector
        institutions={institutions.map((inst) => ({
          inst,
          label: inst,
          fullName: INSTITUTION_FULL_NAMES[inst],
          canSimulate: canSimulate(inst),
          gradient: INST_STYLES[inst].gradient,
          border: INST_STYLES[inst].border,
          bg: INST_STYLES[inst].bg,
          text: INST_STYLES[inst].text,
          icon: INST_STYLES[inst].icon,
        }))}
        userId={user!.id}
      />

      {/* Previous simulations */}
      {prevSims && prevSims.length > 0 && (
        <div>
          <h2 className="text-sm font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Simulări anterioare</h2>
          <div className="dash-card rounded-2xl overflow-hidden">
            {prevSims.map((sim, i) => (
              <div
                key={i}
                className={`flex flex-col gap-3 px-5 py-4 transition-colors hover:bg-white/[0.02] sm:flex-row sm:items-center sm:justify-between ${i < prevSims.length - 1 ? 'border-b' : ''}`}
                style={{ borderColor: 'var(--border)' }}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${INST_STYLES[sim.institution as Institution]?.gradient ?? 'from-slate-600 to-slate-800'} flex items-center justify-center shrink-0 shadow-md`}>
                    <span className="text-white font-bold text-xs">{sim.institution}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{sim.institution}</p>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                      {new Date(sim.completed_at).toLocaleDateString('ro-RO', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                  </div>
                </div>
                <div className="text-left sm:text-right">
                  <p className={`text-base font-extrabold ${getScoreColor(sim.score)}`}>{sim.score?.toFixed(0)}%</p>
                  {sim.correct_answers != null && (
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{sim.correct_answers}/{sim.total_questions}</p>
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
