import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { CATEGORY_LABELS, CATEGORY_ICONS, getScoreColor } from '@/lib/utils'
import type { TestCategory } from '@/types'
import { FileText, TrendingDown, CheckCircle, ChevronRight } from 'lucide-react'

export default async function ReviewPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: sessions } = await supabase
    .from('test_sessions')
    .select('*')
    .eq('user_id', user!.id)
    .eq('completed', true)
    .order('score', { ascending: true })
    .limit(20)

  const reviewSessions = (sessions ?? []).filter(s => (s.score ?? 0) < 70)
  const goodSessions = (sessions ?? []).filter(s => (s.score ?? 0) >= 70).slice(0, 5)

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
    <div className="space-y-8 animate-fade-up">
      <div>
        <h1 className="text-2xl font-extrabold text-[var(--text-primary)] tracking-tight">Review Greșeli</h1>
        <p className="text-[var(--text-secondary)] mt-1.5 text-sm">Zonele unde trebuie să exersezi mai mult</p>
      </div>

      {!sessions || sessions.length === 0 ? (
        <div className="bg-[var(--bg-surface)] rounded-2xl border border-[var(--border)] shadow-sm p-16 text-center">
          <div className="w-14 h-14 rounded-2xl bg-[var(--bg-muted)] flex items-center justify-center mx-auto mb-4">
            <FileText className="w-6 h-6 text-[var(--text-muted)]" />
          </div>
          <h3 className="text-base font-bold text-[var(--text-primary)]">Niciun test completat</h3>
          <p className="text-[var(--text-muted)] text-sm mt-2 mb-6 max-w-xs mx-auto">
            Completează câteva teste și vom identifica zonele unde ai nevoie de practică.
          </p>
          <Link href="/dashboard/tests">
            <div className="inline-flex items-center gap-2 bg-[var(--text-primary)] text-[var(--text-inverse)] text-sm font-semibold px-5 py-2.5 rounded-xl hover:opacity-90 transition-opacity">
              Mergi la teste <ChevronRight className="w-4 h-4" />
            </div>
          </Link>
        </div>
      ) : (
        <>
          {/* Weak categories */}
          {weakCategories.length > 0 && (
            <div>
              <h2 className="text-base font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                <TrendingDown className="w-4 h-4 text-[var(--error)]" />
                Categorii de îmbunătățit
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {weakCategories.map((wc) => (
                  <div key={wc.category} className="bg-[var(--bg-surface)] rounded-2xl border border-[var(--border)] shadow-sm p-5 hover:shadow-md hover:border-[var(--border-strong)] hover:-translate-y-0.5 transition-all duration-200">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-950/40 flex items-center justify-center text-lg shrink-0">
                        {CATEGORY_ICONS[wc.category]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-[var(--text-primary)]">{CATEGORY_LABELS[wc.category]}</p>
                        <p className="text-xs text-[var(--text-muted)]">{wc.institutions.join(', ')}</p>
                      </div>
                      <span className={`text-sm font-extrabold shrink-0 ${getScoreColor(wc.avg)}`}>
                        {wc.avg.toFixed(0)}%
                      </span>
                    </div>
                    <div className="w-full bg-[var(--bg-muted)] rounded-full h-1.5 mb-3">
                      <div
                        className="h-1.5 rounded-full bg-red-400 dark:bg-red-500 transition-all"
                        style={{ width: `${Math.min(wc.avg, 100)}%` }}
                      />
                    </div>
                    <p className="text-xs text-[var(--text-muted)] mb-3">
                      Scor mediu sub 70% — necesită practică suplimentară
                    </p>
                    {wc.institutions[0] && (
                      <Link href={
                        wc.category === 'attention'
                          ? `/dashboard/tests/${wc.institutions[0].toLowerCase()}/attention`
                          : `/dashboard/tests/${wc.institutions[0].toLowerCase()}/${wc.category}`
                      }>
                        <div className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold text-[var(--text-primary)] bg-[var(--bg-muted)] hover:bg-[var(--border-strong)] transition-colors border border-[var(--border)]">
                          Exersează acum <ChevronRight className="w-3.5 h-3.5" />
                        </div>
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Low score sessions */}
          {reviewSessions.length > 0 && (
            <div>
              <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">Teste cu scor mic (sub 70%)</h2>
              <div className="bg-[var(--bg-surface)] rounded-2xl border border-[var(--border)] shadow-sm overflow-hidden">
                {reviewSessions.map((session, i) => (
                  <div
                    key={session.id}
                    className={`flex flex-col gap-3 px-5 py-3.5 transition-colors hover:bg-[var(--bg-muted)] sm:flex-row sm:items-center ${i < reviewSessions.length - 1 ? 'border-b border-[var(--border)]' : ''}`}
                  >
                    <div className="w-9 h-9 rounded-xl bg-red-50 dark:bg-red-950/40 text-red-500 flex items-center justify-center text-base shrink-0">
                      {CATEGORY_ICONS[session.category as TestCategory]}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-[var(--text-primary)]">
                        {CATEGORY_LABELS[session.category as TestCategory]}
                        <span className="text-[var(--text-muted)] font-normal ml-1.5">— {session.institution}</span>
                      </p>
                      <p className="text-xs text-[var(--text-muted)]">
                        {new Date(session.completed_at).toLocaleDateString('ro-RO', {
                          day: 'numeric', month: 'short', year: 'numeric'
                        })}
                      </p>
                    </div>
                    <div className="flex w-full items-center justify-between gap-3 shrink-0 sm:w-auto sm:justify-normal">
                      <div className="text-left sm:text-right">
                        <p className={`text-sm font-extrabold ${getScoreColor(session.score)}`}>
                          {session.score?.toFixed(0)}%
                        </p>
                        <p className="text-xs text-[var(--text-muted)]">{session.correct_answers}/{session.total_questions}</p>
                      </div>
                      <Link href={
                        session.category === 'attention'
                          ? `/dashboard/tests/${session.institution.toLowerCase()}/attention`
                          : `/dashboard/tests/${session.institution.toLowerCase()}/${session.category}`
                      }>
                        <div className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-[var(--border)] text-[var(--text-primary)] hover:bg-[var(--bg-muted)] transition-colors">
                          Reia
                        </div>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {weakCategories.length === 0 && reviewSessions.length === 0 && (
            <div className="bg-[var(--bg-surface)] rounded-2xl border border-[var(--border)] shadow-sm p-12 text-center">
              <div className="w-14 h-14 rounded-2xl bg-green-50 dark:bg-green-950/40 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-7 h-7 text-green-500" />
              </div>
              <h3 className="text-base font-bold text-[var(--text-primary)]">Excelent!</h3>
              <p className="text-[var(--text-muted)] text-sm mt-2 max-w-xs mx-auto">
                Toate scorurile tale sunt peste 70%. Continuă să exersezi pentru a le menține!
              </p>
            </div>
          )}

          {/* Good sessions */}
          {goodSessions.length > 0 && (
            <div>
              <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">Performanțe bune</h2>
              <div className="bg-[var(--bg-surface)] rounded-2xl border border-[var(--border)] shadow-sm overflow-hidden">
                {goodSessions.map((session, i) => (
                  <div
                    key={session.id}
                    className={`flex items-center gap-3 px-5 py-3.5 ${i < goodSessions.length - 1 ? 'border-b border-[var(--border)]' : ''}`}
                  >
                    <div className="w-9 h-9 rounded-xl bg-green-50 dark:bg-green-950/40 text-green-500 flex items-center justify-center text-base shrink-0">
                      {CATEGORY_ICONS[session.category as TestCategory]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-[var(--text-primary)] truncate">
                        {CATEGORY_LABELS[session.category as TestCategory]}
                        <span className="text-[var(--text-muted)] font-normal ml-1.5">— {session.institution}</span>
                      </p>
                    </div>
                    <span className={`text-sm font-extrabold shrink-0 ${getScoreColor(session.score)}`}>
                      {session.score?.toFixed(0)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
