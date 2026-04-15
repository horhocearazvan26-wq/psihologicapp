import { createClient } from '@/lib/supabase/server'
import { cn } from '@/lib/utils'
import { Award, BookOpen, Brain, Flame, Goal, Palette, Shield, Sparkles, Star, Target, Trophy, Zap } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { IconBadge } from '@/components/ui/icon-badge'

interface Achievement {
  id: string
  icon: LucideIcon
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
  { id: 'first_test',       icon: Target,   title: 'Primul pas',          desc: 'Completează primul test',                       check: (s) => s.totalTests >= 1,                       color: 'text-[var(--text-primary)]', bg: 'bg-[var(--bg-muted)]' },
  { id: 'five_tests',       icon: BookOpen, title: 'Student sârguincios', desc: 'Completează 5 teste',                           check: (s) => s.totalTests >= 5,                       color: 'text-[var(--text-primary)]', bg: 'bg-[var(--bg-muted)]' },
  { id: 'twenty_tests',     icon: Goal,     title: 'Maratonist',          desc: 'Completează 20 de teste',                        check: (s) => s.totalTests >= 20,                      color: 'text-[var(--text-primary)]', bg: 'bg-[var(--bg-muted)]' },
  { id: 'fifty_tests',      icon: Flame,    title: 'On fire',             desc: 'Completează 50 de teste',                        check: (s) => s.totalTests >= 50,                      color: 'text-[var(--text-primary)]', bg: 'bg-[var(--bg-muted)]' },
  { id: 'high_score',       icon: Star,     title: 'Bun elev',            desc: 'Obține un scor de 80%+',                         check: (s) => s.bestScore >= 80,                      color: 'text-[var(--text-primary)]', bg: 'bg-[var(--bg-muted)]' },
  { id: 'excellent',        icon: Trophy,   title: 'Excelență',           desc: 'Obține un scor de 95%+',                         check: (s) => s.bestScore >= 95,                      color: 'text-[var(--text-primary)]', bg: 'bg-[var(--bg-muted)]' },
  { id: 'perfect',          icon: Award,    title: 'Perfect!',            desc: 'Obține scor 100% la un test',                    check: (s) => s.perfectTests >= 1,                    color: 'text-[var(--text-primary)]', bg: 'bg-[var(--bg-muted)]' },
  { id: 'consistent',       icon: Brain,    title: 'Consistent',          desc: 'Menține scor mediu de 70%+ pe 10 teste',         check: (s) => s.totalTests >= 10 && s.avgScore >= 70, color: 'text-[var(--text-primary)]', bg: 'bg-[var(--bg-muted)]' },
  { id: 'all_categories',   icon: Palette,  title: 'Complet',             desc: 'Completează teste din toate cele 6 categorii',   check: (s) => s.uniqueCategories >= 6,                color: 'text-[var(--text-primary)]', bg: 'bg-[var(--bg-muted)]' },
  { id: 'all_institutions', icon: Shield,   title: 'Polivalent',          desc: 'Completează teste pentru toate 4 instituțiile',  check: (s) => s.uniqueInstitutions >= 4,              color: 'text-[var(--text-primary)]', bg: 'bg-[var(--bg-muted)]' },
  { id: 'speed_demon',      icon: Zap,      title: 'Rapid',               desc: 'Completează 3 teste în aceeași zi',              check: (s) => s.testsInDay >= 3,                      color: 'text-[var(--text-primary)]', bg: 'bg-[var(--bg-muted)]' },
  { id: 'high_scorer',      icon: Sparkles, title: 'Top performer',       desc: 'Obține 80%+ la 5 teste diferite',                check: (s) => s.highScoreTests >= 5,                  color: 'text-[var(--text-primary)]', bg: 'bg-[var(--bg-muted)]' },
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
        <p className="text-[10px] font-bold tracking-widest uppercase mb-2" style={{ color: 'var(--text-muted)' }}>Gamification</p>
        <h1 className="text-2xl font-extrabold tracking-tight" style={{ color: 'var(--text-primary)' }}>Realizările mele</h1>
        <p className="mt-1.5 text-sm" style={{ color: 'var(--text-secondary)' }}>
          {earned.length} din {achievements.length} deblocate
        </p>
      </div>

      {/* Progress bar */}
      <div className="dash-card rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500 opacity-60" />
        <div className="flex justify-between text-sm mb-4">
          <span className="font-bold" style={{ color: 'var(--text-primary)' }}>{earned.length} / {achievements.length} realizări</span>
          <span className="font-extrabold text-indigo-400">{pct}%</span>
        </div>
        <div className="w-full rounded-full h-2.5" style={{ background: 'var(--bg-muted)' }}>
          <div
            className="bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-400 h-2.5 rounded-full transition-all duration-700"
            style={{ width: `${pct}%`, boxShadow: '0 0 12px rgba(99,102,241,0.4)' }}
          />
        </div>
        <div className="flex justify-between text-xs mt-2" style={{ color: 'var(--text-muted)' }}>
          <span>Începător</span>
          <span>Expert</span>
        </div>
      </div>

      {/* Earned */}
      {earned.length > 0 && (
        <div>
          <h2 className="text-sm font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
            <span className="w-2 h-2 bg-emerald-400 rounded-full shadow-[0_0_6px_rgba(52,211,153,0.6)]" />
            Deblocate ({earned.length})
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {earned.map((ach) => (
              <div
                key={ach.id}
                className="dash-card rounded-2xl p-5 text-center hover:-translate-y-1 transition-all duration-200 relative overflow-hidden"
                style={{ boxShadow: '0 0 0 1px rgba(99,102,241,0.15), 0 8px 24px -8px rgba(0,0,0,0.5)' }}
              >
                <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-indigo-500 to-violet-500 opacity-50" />
                <IconBadge icon={ach.icon} className={cn('mx-auto mb-3 h-14 w-14 rounded-2xl', ach.bg)} iconClassName="h-6 w-6 text-[var(--text-primary)]" />
                <p className={cn('font-extrabold text-sm mb-1', ach.color)}>{ach.title}</p>
                <p className="text-xs leading-snug" style={{ color: 'var(--text-muted)' }}>{ach.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Locked */}
      {locked.length > 0 && (
        <div>
          <h2 className="text-sm font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
            <span className="w-2 h-2 rounded-full" style={{ background: 'var(--border-strong)' }} />
            Blocate ({locked.length})
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {locked.map((ach) => (
              <div key={ach.id} className="dash-card rounded-2xl p-5 text-center opacity-35">
                <IconBadge icon={ach.icon} className="mx-auto mb-3 h-14 w-14 rounded-2xl opacity-60" iconClassName="h-6 w-6 text-[var(--text-primary)]" />
                <p className="font-bold text-sm mb-1" style={{ color: 'var(--text-muted)' }}>{ach.title}</p>
                <p className="text-xs leading-snug" style={{ color: 'var(--text-muted)' }}>{ach.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {earned.length === 0 && (
        <div className="dash-card rounded-2xl p-16 text-center">
          <IconBadge icon={Trophy} className="mx-auto mb-4 h-16 w-16 rounded-2xl bg-[var(--bg-muted)]" iconClassName="h-8 w-8 text-[var(--text-primary)]" />
          <h3 className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>Nicio realizare deblocată încă</h3>
          <p className="text-sm mt-2 max-w-sm mx-auto" style={{ color: 'var(--text-muted)' }}>
            Completează primul test pentru a începe să câștigi realizări!
          </p>
        </div>
      )}
    </div>
  )
}
