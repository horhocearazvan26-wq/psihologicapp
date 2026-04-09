import { createClient } from '@/lib/supabase/server'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { CATEGORY_LABELS, CATEGORY_ICONS, getScoreColor } from '@/lib/utils'
import type { TestCategory } from '@/types'
import { FileText, TrendingDown } from 'lucide-react'

export default async function ReviewPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Get recent sessions with low scores to review
  const { data: sessions } = await supabase
    .from('test_sessions')
    .select('*')
    .eq('user_id', user!.id)
    .eq('completed', true)
    .order('score', { ascending: true })
    .limit(20)

  // Sessions with score < 70 — these need review
  const reviewSessions = (sessions ?? []).filter(s => (s.score ?? 0) < 70)
  const goodSessions = (sessions ?? []).filter(s => (s.score ?? 0) >= 70).slice(0, 5)

  // Group by category to show weak areas
  const categoryMap: Record<string, { scores: number[]; institutions: string[] }> = {}
  for (const s of sessions ?? []) {
    if (!categoryMap[s.category]) categoryMap[s.category] = { scores: [], institutions: [] }
    categoryMap[s.category].scores.push(s.score ?? 0)
    if (!categoryMap[s.category].institutions.includes(s.institution)) {
      categoryMap[s.category].institutions.push(s.institution)
    }
  }

  const weakCategories = Object.entries(categoryMap)
    .map(([cat, data]) => ({
      category: cat as TestCategory,
      avg: data.scores.reduce((a, b) => a + b, 0) / data.scores.length,
      institutions: data.institutions,
    }))
    .filter(c => c.avg < 70)
    .sort((a, b) => a.avg - b.avg)

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Review Greșeli</h1>
        <p className="text-slate-500 mt-1 text-sm">
          Zonele unde trebuie să exersezi mai mult
        </p>
      </div>

      {sessions && sessions.length === 0 ? (
        <Card>
          <CardContent className="text-center py-16">
            <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-700">Niciun test completat</h3>
            <p className="text-slate-500 text-sm mt-2 mb-6">
              Completează câteva teste și vom identifica zonele unde ai nevoie de practică.
            </p>
            <Link href="/dashboard/tests">
              <Button>Mergi la teste</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Weak categories */}
          {weakCategories.length > 0 && (
            <div>
              <h2 className="text-base font-bold text-slate-800 mb-4 flex items-center gap-2">
                <TrendingDown className="w-4 h-4 text-red-500" />
                Categorii de îmbunătățit
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {weakCategories.map((wc) => (
                  <Card key={wc.category}>
                    <CardContent className="p-5">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-lg shrink-0">
                          {CATEGORY_ICONS[wc.category]}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-slate-800">{CATEGORY_LABELS[wc.category]}</p>
                          <p className="text-xs text-slate-400">{wc.institutions.join(', ')}</p>
                        </div>
                        <span className={`text-sm font-bold ${getScoreColor(wc.avg)}`}>
                          {wc.avg.toFixed(0)}%
                        </span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2 mb-3">
                        <div
                          className="h-2 rounded-full bg-red-400"
                          style={{ width: `${Math.min(wc.avg, 100)}%` }}
                        />
                      </div>
                      <p className="text-xs text-slate-500 mb-3">
                        Scor mediu sub 70% — necesită practică suplimentară
                      </p>
                      {wc.institutions[0] && (
                        <Link href={
                          wc.category === 'attention'
                            ? `/dashboard/tests/${wc.institutions[0].toLowerCase()}/attention`
                            : `/dashboard/tests/${wc.institutions[0].toLowerCase()}/${wc.category}`
                        }>
                          <Button size="sm" variant="outline" className="w-full">
                            Exersează acum
                          </Button>
                        </Link>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Low score sessions */}
          {reviewSessions.length > 0 && (
            <div>
              <h2 className="text-base font-bold text-slate-800 mb-4">Teste cu scor mic (sub 70%)</h2>
              <Card>
                <CardContent className="p-0">
                  <div className="divide-y divide-slate-50">
                    {reviewSessions.map((session) => (
                      <div key={session.id} className="flex items-center gap-3 px-5 py-3.5 hover:bg-slate-50 transition-colors">
                        <div className="w-9 h-9 rounded-xl bg-red-50 text-red-600 flex items-center justify-center text-base shrink-0">
                          {CATEGORY_ICONS[session.category as TestCategory]}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-slate-800">
                            {CATEGORY_LABELS[session.category as TestCategory]}
                            <span className="text-slate-400 font-normal ml-1.5">— {session.institution}</span>
                          </p>
                          <p className="text-xs text-slate-400">
                            {new Date(session.completed_at).toLocaleDateString('ro-RO', {
                              day: 'numeric', month: 'short', year: 'numeric'
                            })}
                          </p>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          <div className="text-right">
                            <p className={`text-sm font-bold ${getScoreColor(session.score)}`}>
                              {session.score?.toFixed(0)}%
                            </p>
                            <p className="text-xs text-slate-400">{session.correct_answers}/{session.total_questions}</p>
                          </div>
                          <Link href={
                            session.category === 'attention'
                              ? `/dashboard/tests/${session.institution.toLowerCase()}/attention`
                              : `/dashboard/tests/${session.institution.toLowerCase()}/${session.category}`
                          }>
                            <Button size="sm" variant="outline">
                              Reia
                            </Button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {weakCategories.length === 0 && reviewSessions.length === 0 && (
            <Card>
              <CardContent className="text-center py-12">
                <div className="text-4xl mb-3">🎉</div>
                <h3 className="text-lg font-bold text-slate-700">Excelent!</h3>
                <p className="text-slate-500 text-sm mt-2">
                  Toate scorurile tale sunt peste 70%. Continuă să exersezi pentru a le menține!
                </p>
              </CardContent>
            </Card>
          )}

          {/* Good sessions for reference */}
          {goodSessions.length > 0 && (
            <div>
              <h2 className="text-base font-bold text-slate-800 mb-4">Performanțe bune</h2>
              <Card>
                <CardContent className="p-0">
                  <div className="divide-y divide-slate-50">
                    {goodSessions.map((session) => (
                      <div key={session.id} className="flex items-center gap-3 px-5 py-3.5">
                        <div className="w-9 h-9 rounded-xl bg-green-50 text-green-600 flex items-center justify-center text-base shrink-0">
                          {CATEGORY_ICONS[session.category as TestCategory]}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-slate-800">
                            {CATEGORY_LABELS[session.category as TestCategory]}
                            <span className="text-slate-400 font-normal ml-1.5">— {session.institution}</span>
                          </p>
                        </div>
                        <span className={`text-sm font-bold ${getScoreColor(session.score)}`}>
                          {session.score?.toFixed(0)}%
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </>
      )}
    </div>
  )
}
