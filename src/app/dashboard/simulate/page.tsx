import { createClient } from '@/lib/supabase/server'
import { Card, CardContent } from '@/components/ui/card'
import { SimulationSelector } from './simulation-selector'
import type { Institution } from '@/types'
import { INSTITUTION_FULL_NAMES } from '@/lib/utils'
import { ClipboardList, Clock, Target, AlertCircle } from 'lucide-react'

const institutions: Institution[] = ['MAI', 'MApN', 'SRI', 'ANP']

const INSTITUTION_STYLES: Record<Institution, { gradient: string; bg: string; text: string }> = {
  MAI: { gradient: 'from-blue-500 to-blue-700', bg: 'bg-blue-50', text: 'text-blue-700' },
  MApN: { gradient: 'from-green-500 to-green-700', bg: 'bg-green-50', text: 'text-green-700' },
  SRI: { gradient: 'from-red-500 to-red-700', bg: 'bg-red-50', text: 'text-red-700' },
  ANP: { gradient: 'from-purple-500 to-purple-700', bg: 'bg-purple-50', text: 'text-purple-700' },
}

export default async function SimulatePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: profile } = await supabase
    .from('profiles')
    .select('subscription_plan, subscribed_institution')
    .eq('id', user!.id)
    .single()

  const { data: prevSims } = await supabase
    .from('test_sessions')
    .select('institution, score, completed_at')
    .eq('user_id', user!.id)
    .eq('is_simulation', true)
    .eq('completed', true)
    .order('completed_at', { ascending: false })
    .limit(5)

  function canSimulate(inst: Institution): boolean {
    if (!profile) return false
    if (profile.subscription_plan === 'all_institutions') return true
    if (profile.subscription_plan === 'one_institution') {
      return profile.subscribed_institution === inst
    }
    return false
  }

  return (
    <div className="space-w-8 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Simulare Examen Complet</h1>
        <p className="text-slate-500 mt-1 text-sm">
          Condiții reale — toate categoriile în ordine, cronometru strict
        </p>
      </div>

      {/* Info cards */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { icon: ClipboardList, label: 'Categorii', value: '6 probe', color: 'text-blue-600', bg: 'bg-blue-50' },
          { icon: Clock, label: 'Durată totală', value: '~90 min', color: 'text-amber-600', bg: 'bg-amber-50' },
          { icon: Target, label: 'Întrebări', value: '180 total', color: 'text-green-600', bg: 'bg-green-50' },
        ].map((item) => {
          const Icon = item.icon
          return (
            <Card key={item.label}>
              <CardContent className="p-4 text-center">
                <div className={`w-10 h-10 rounded-xl ${item.bg} flex items-center justify-center mx-auto mb-2`}>
                  <Icon className={`w-5 h-5 ${item.color}`} />
                </div>
                <p className="font-bold text-slate-800 text-sm">{item.value}</p>
                <p className="text-xs text-slate-400 mt-0.5">{item.label}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Warning */}
      <div className="flex items-start gap-3 bg-amber-50 border border-amber-100 rounded-2xl p-4 mb-8">
        <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
        <div className="text-sm text-amber-700">
          <strong>Atenție:</strong> Odată pornită simularea, nu o poți întrerupe fără a pierde progresul.
          Asigură-te că ai timp suficient (90+ minute) și că nu vei fi deranjat.
        </div>
      </div>

      {/* Institution selector */}
      <SimulationSelector
        institutions={institutions.map((inst) => ({
          inst,
          label: inst,
          fullName: INSTITUTION_FULL_NAMES[inst],
          canSimulate: canSimulate(inst),
          gradient: INSTITUTION_STYLES[inst].gradient,
          bg: INSTITUTION_STYLES[inst].bg,
          text: INSTITUTION_STYLES[inst].text,
        }))}
        userId={user!.id}
      />

      {/* Previous simulations */}
      {prevSims && prevSims.length > 0 && (
        <div className="mt-8">
          <h2 className="text-base font-bold text-slate-800 mb-4">Simulări anterioare</h2>
          <Card>
            <CardContent className="p-0">
              <div className="divide-y divide-slate-50">
                {prevSims.map((sim, i) => (
                  <div key={i} className="flex items-center justify-between px-5 py-3.5">
                    <div>
                      <p className="text-sm font-semibold text-slate-800">{sim.institution}</p>
                      <p className="text-xs text-slate-400">
                        {new Date(sim.completed_at).toLocaleDateString('ro-RO', {
                          day: 'numeric', month: 'long', year: 'numeric'
                        })}
                      </p>
                    </div>
                    <p className={`text-sm font-bold ${
                      sim.score >= 80 ? 'text-green-600' : sim.score >= 60 ? 'text-amber-600' : 'text-red-600'
                    }`}>
                      {sim.score?.toFixed(0)}%
                    </p>
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
