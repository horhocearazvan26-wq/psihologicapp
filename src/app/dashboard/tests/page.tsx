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
import { Lock, CheckCircle, ChevronRight } from 'lucide-react'

const institutions: Institution[] = ['MAI', 'MApN', 'SRI', 'ANP']
const categories: TestCategory[] = ['attention', 'logic', 'memory', 'numerical', 'vocabulary', 'personality']

const INSTITUTION_STYLES: Record<Institution, { gradient: string; badge: string }> = {
  MAI: { gradient: 'from-blue-500 to-blue-700', badge: 'bg-blue-100 text-blue-700' },
  MApN: { gradient: 'from-green-500 to-green-700', badge: 'bg-green-100 text-green-700' },
  SRI: { gradient: 'from-red-500 to-red-700', badge: 'bg-red-100 text-red-700' },
  ANP: { gradient: 'from-purple-500 to-purple-700', badge: 'bg-purple-100 text-purple-700' },
}

const CATEGORY_STYLES: Record<TestCategory, string> = {
  attention: 'bg-blue-50 text-blue-600',
  logic: 'bg-purple-50 text-purple-600',
  memory: 'bg-amber-50 text-amber-600',
  numerical: 'bg-green-50 text-green-600',
  vocabulary: 'bg-rose-50 text-rose-600',
  personality: 'bg-teal-50 text-teal-600',
}

export default async function TestsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user!.id).single()
  const { data: progressData } = await supabase.from('user_progress').select('*').eq('user_id', user!.id)

  function isAccessible(institution: Institution): boolean {
    if (!profile) return false
    if (profile.subscription_plan === 'all_institutions') return true
    if (profile.subscription_plan === 'one_institution') {
      return profile.subscribed_institution === institution
    }
    return false
  }

  function getProgress(institution: Institution, category: TestCategory) {
    return progressData?.find(p => p.institution === institution && p.category === category)
  }

  return (
    <div className="space-y-10 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Teste de pregătire</h1>
        <p className="text-slate-500 mt-1 text-sm">Selectează instituția și categoria pentru a începe</p>
      </div>

      {institutions.map((inst) => {
        const accessible = isAccessible(inst)
        const styles = INSTITUTION_STYLES[inst]
        const instProgress = progressData?.filter(p => p.institution === inst) ?? []
        const completedCategories = categories.filter(cat => {
          const p = getProgress(inst, cat)
          return p && p.tests_taken > 0
        }).length

        return (
          <div key={inst}>
            {/* Institution header */}
            <div className="flex items-center gap-4 mb-5">
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${styles.gradient} flex items-center justify-center shadow-sm shrink-0`}>
                <span className="text-white font-bold text-sm">{inst}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-lg font-bold text-slate-800">{INSTITUTION_LABELS[inst]}</h2>
                  {accessible ? (
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" /> Acces complet
                    </span>
                  ) : (
                    <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                      <Lock className="w-3 h-3" /> Demo — 15 întrebări
                    </span>
                  )}
                </div>
                <p className="text-sm text-slate-500">{INSTITUTION_FULL_NAMES[inst]}</p>
              </div>
              <div className="hidden sm:block text-right shrink-0">
                <p className="text-sm font-bold text-slate-700">{completedCategories}/{categories.length}</p>
                <p className="text-xs text-slate-400">categorii</p>
              </div>
            </div>

            {/* Progress bar for institution */}
            {instProgress.length > 0 && (
              <div className="mb-4 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-1.5 bg-gradient-to-r ${styles.gradient} rounded-full transition-all`}
                  style={{ width: `${(completedCategories / categories.length) * 100}%` }}
                />
              </div>
            )}

            {/* Category grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((cat) => {
                const progress = getProgress(inst, cat)
                const catStyle = CATEGORY_STYLES[cat]
                const href = cat === 'attention'
                  ? `/dashboard/tests/${inst.toLowerCase()}/attention`
                  : `/dashboard/tests/${inst.toLowerCase()}/${cat}`

                return (
                  <Link key={cat} href={href}>
                    <Card hover className="group">
                      <CardContent className="p-5">
                        <div className="flex items-start gap-3">
                          <div className={`w-10 h-10 rounded-xl ${catStyle} flex items-center justify-center text-lg shrink-0`}>
                            {CATEGORY_ICONS[cat]}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-slate-800 text-sm">{CATEGORY_LABELS[cat]}</h3>
                            {progress && progress.tests_taken > 0 ? (
                              <div className="mt-2 space-y-1.5">
                                <div className="flex justify-between text-xs">
                                  <span className="text-slate-400">{progress.tests_taken} teste</span>
                                  <span className={`font-bold ${getScoreColor(progress.average_score)}`}>
                                    {progress.average_score.toFixed(0)}%
                                  </span>
                                </div>
                                <div className="w-full bg-slate-100 rounded-full h-1.5">
                                  <div
                                    className="bg-blue-500 h-1.5 rounded-full transition-all"
                                    style={{ width: `${Math.min(progress.average_score, 100)}%` }}
                                  />
                                </div>
                              </div>
                            ) : (
                              <p className="text-xs text-slate-400 mt-1">Neîncercat</p>
                            )}
                          </div>
                          <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-colors shrink-0 mt-0.5" />
                        </div>

                        <div className="mt-4 pt-4 border-t border-slate-50">
                          <div className={`text-xs font-semibold py-1.5 px-3 rounded-lg text-center transition-all ${
                            accessible
                              ? 'bg-blue-50 text-blue-700 group-hover:bg-blue-100'
                              : 'bg-slate-50 text-slate-500'
                          }`}>
                            {accessible ? 'Începe test →' : 'Demo (15 întrebări)'}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                )
              })}
            </div>
          </div>
        )
      })}

      {/* Upgrade CTA */}
      {profile?.subscription_plan === 'free' && (
        <div className="relative overflow-hidden bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-6 text-white">
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-500/20 rounded-full" />
          <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-lg">Vrei acces la toate întrebările?</h3>
              <p className="text-slate-400 text-sm mt-1">
                De la 69 lei — 200+ întrebări per categorie, simulare completă, statistici detaliate
              </p>
            </div>
            <Link href="/dashboard/pricing" className="shrink-0">
              <Button variant="secondary" size="md">
                Deblochează acum
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
