import { createClient } from '@/lib/supabase/server'
import { cn } from '@/lib/utils'

interface Achievement {
  id: string
  icon: string
  title: string
  desc: string
  check: (stats: AchievementStats) => boolean
  color: string
  bg: string
}

interface AchievementStats {
  totalTests: number
  avgScore: number
  bestScore: number
  perfectTests: number
  uniqueCategories: number
  uniqueInstitutions: number
  testsInDay: number
  highScoreTests: number
}

const achievements: Achievement[] = [
  { id: 'first_test',       icon: '🎯', title: 'Primul pas',       desc: 'Completează primul test',                        check: (s) => s.totalTests >= 1,                            color: 'text-blue-600 dark:text-blue-400',    bg: 'bg-blue-50 dark:bg-blue-950/40' },
  { id: 'five_tests',       icon: '📚', title: 'Student sârguincios', desc: 'Completează 5 teste',                         check: (s) => s.totalTests >= 5,                            color: 'text-green-600 dark:text-green-400',  bg: 'bg-green-50 dark:bg-green-950/40' },
  { id: 'twenty_tests',     icon: '🏃', title: 'Maratonist',        desc: 'Completează 20 de teste',                        check: (s) => s.totalTests >= 20,                           color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-50 dark:bg-purple-950/40' },
  { id: 'fifty_tests',      icon: '🔥', title: 'On fire',           desc: 'Completează 50 de teste',                        check: (s) => s.totalTests >= 50,                           color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-50 dark:bg-orange-950/40' },
  { id: 'high_score',       icon: '⭐', title: 'Bun elev',          desc: 'Obține un scor de 80%+',                         check: (s) => s.bestScore >= 80,                            color: 'text-yellow-600 dark:text-yellow-400', bg: 'bg-yellow-50 dark:bg-yellow-950/40' },
  { id: 'excellent',        icon: '🏆', title: 'Excelență',         desc: 'Obține un scor de 95%+',                         check: (s) => s.bestScore >= 95,                            color: 'text-amber-600 dark:text-amber-400',  bg: 'bg-amber-50 dark:bg-amber-950/40' },
  { id: 'perfect',          icon: '💯', title: 'Perfect!',          desc: 'Obține scor 100% la un test',                    check: (s) => s.perfectTests >= 1,                          color: 'text-rose-600 dark:text-rose-400',    bg: 'bg-rose-50 dark:bg-rose-950/40' },
  { id: 'consistent',       icon: '📊', title: 'Consistent',        desc: 'Menține scor mediu de 70%+ pe 10 teste',         check: (s) => s.totalTests >= 10 && s.avgScore >= 70,       color: 'text-teal-600 dark:text-teal-400',    bg: 'bg-teal-50 dark:bg-teal-950/40' },
  { id: 'all_categories',   icon: '🎨', title: 'Complet',           desc: 'Completează teste din toate cele 6 categorii',   check: (s) => s.uniqueCategories >= 6,                      color: 'text-indigo-600 dark:text-indigo-400', bg: 'bg-indigo-50 dark:bg-indigo-950/40' },
  { id: 'all_institutions', icon: '🏛️', title: 'Polivalent',       desc: 'Completează teste pentru toate 4 instituțiile',  check: (s) => s.uniqueInstitutions >= 4,                    color: 'text-[var(--text-secondary)]',        bg: 'bg-[var(--bg-muted)]' },
  { id: 'speed_demon',      icon: '⚡', title: 'Rapid',             desc: 'Completează 3 teste în aceeași zi',              check: (s) => s.testsInDay >= 3,                            color: 'text-yellow-500 dark:text-yellow-400', bg: 'bg-yellow-50 dark:bg-yellow-950/40' },
  { id: 'high_scorer',      icon: '🌟', title: 'Top performer',     desc: 'Obține 80%+ la 5 teste diferite',                check: (s) => s.highScoreTests >= 5,                        color: 'text-blue-500 dark:text-blue-400',    bg: 'bg-blue-50 dark:bg-blue-950/40' },
]

export default async function AchievementsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: sessions } = await supabase
    .from('test_sessions').select('*').eq('user_id', user!.id)
    .eq('completed', true).order('completed_at', { ascending: false })

  const totalTests = sessions?.length ?? 0
  const scores = (sessions ?? []).map(s => s.score ?? 0)
  const avgScore = scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0
  const bestScore = scores.length > 0 ? Math.max(...scores) : 0
  const perfectTests = scores.filter(s => s >= 100).length
  const highScoreTests = scores.filter(s => s >= 80).length
  const uniqueCategories = new Set((sessions ?? []).map(s => s.category)).size
  const uniqueInstitutions = new Set((sessions ?? []).map(s => s.institution)).size

  const dateMap: Record<string, number> = {}
  for (const s of sessions ?? []) {
    const day = s.completed_at?.slice(0, 10) ?? ''
    dateMap[day] = (dateMap[day] ?? 0) + 1
  }
  const testsInDay = Math.max(0, ...Object.values(dateMap))

  const stats: AchievementStats = { totalTests, avgScore, bestScore, perfectTests, uniqueCategories, uniqueInstitutions, testsInDay, highScoreTests }
  const earned = achievements.filter(a => a.check(stats))
  const locked = achievements.filter(a => !a.check(stats))
  const pct = Math.round((earned.length / achievements.length) * 100)

  return (
    <div className="space-y-8 animate-fade-up">
      <div>
        <h1 className="text-2xl font-extrabold text-[var(--text-primary)] tracking-tight">Realizările mele</h1>
        <p className="text-[var(--text-secondary)] mt-1.5 text-sm">
          {earned.length} din {achievements.length} deblocate
        </p>
      </div>

      {/* Progress bar */}
      <div className="bg-[var(--bg-surface)] rounded-2xl border border-[var(--border)] shadow-sm p-5">
        <div className="flex justify-between text-sm mb-3">
          <span className="font-semibold text-[var(--text-primary)]">{earned.length} / {achievements.length} realizări</span>
          <span className="text-[var(--text-muted)]">{pct}%</span>
        </div>
        <div className="w-full bg-[var(--bg-muted)] rounded-full h-2.5">
          <div
            className="bg-gradient-to-r from-indigo-500 to-violet-500 h-2.5 rounded-full transition-all duration-700"
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-[var(--text-muted)] mt-2">
          <span>Începător</span>
          <span>Expert</span>
        </div>
      </div>

      {/* Earned */}
      {earned.length > 0 && (
        <div>
          <h2 className="text-base font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full" />
            Deblocate ({earned.length})
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {earned.map((ach) => (
              <div key={ach.id} className="bg-[var(--bg-surface)] rounded-2xl border border-[var(--border)] shadow-sm p-5 text-center hover:shadow-md hover:-translate-y-0.5 hover:border-[var(--border-strong)] transition-all duration-200">
                <div className={cn('w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3 text-2xl', ach.bg)}>
                  {ach.icon}
                </div>
                <p className={cn('font-bold text-sm mb-1', ach.color)}>{ach.title}</p>
                <p className="text-xs text-[var(--text-muted)] leading-snug">{ach.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Locked */}
      {locked.length > 0 && (
        <div>
          <h2 className="text-base font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-[var(--border-strong)] rounded-full" />
            Blocate ({locked.length})
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {locked.map((ach) => (
              <div key={ach.id} className="bg-[var(--bg-surface)] rounded-2xl border border-[var(--border)] shadow-sm p-5 text-center opacity-50">
                <div className="w-14 h-14 rounded-2xl bg-[var(--bg-muted)] flex items-center justify-center mx-auto mb-3 text-2xl grayscale">
                  {ach.icon}
                </div>
                <p className="font-bold text-sm text-[var(--text-muted)] mb-1">{ach.title}</p>
                <p className="text-xs text-[var(--text-muted)] leading-snug">{ach.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {earned.length === 0 && (
        <div className="bg-[var(--bg-surface)] rounded-2xl border border-[var(--border)] shadow-sm p-16 text-center">
          <div className="text-5xl mb-4">🏆</div>
          <h3 className="text-base font-bold text-[var(--text-primary)]">Nicio realizare deblocată încă</h3>
          <p className="text-[var(--text-muted)] text-sm mt-2 max-w-sm mx-auto">
            Completează primul test pentru a începe să câștigi realizări!
          </p>
        </div>
      )}
    </div>
  )
}
