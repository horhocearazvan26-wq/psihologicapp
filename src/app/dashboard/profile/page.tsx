import { createClient } from '@/lib/supabase/server'
import { ProfileForm } from './profile-form'
import type { Institution } from '@/types'
import { INSTITUTION_FULL_NAMES } from '@/lib/utils'
import { BookOpen, Target, Calendar, Mail } from 'lucide-react'

export default async function ProfilePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user!.id)
    .single()

  const { data: stats } = await supabase
    .from('test_sessions')
    .select('id, score')
    .eq('user_id', user!.id)
    .eq('completed', true)

  const totalTests = stats?.length ?? 0
  const avgScore = stats && stats.length > 0
    ? stats.reduce((s, t) => s + (t.score ?? 0), 0) / stats.length
    : 0

  const daysUntil = profile?.exam_date
    ? Math.ceil((new Date(profile.exam_date).getTime() - Date.now()) / 86400000)
    : null

  const planLabel: Record<string, string> = {
    free: 'Plan Gratuit',
    one_institution: 'O Instituție',
    all_institutions: 'Toate Instituțiile',
  }

  const planStyle: Record<string, string> = {
    free: 'bg-[var(--bg-muted)] text-[var(--text-muted)]',
    one_institution: 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400',
    all_institutions: 'bg-violet-50 dark:bg-violet-950/40 text-violet-700 dark:text-violet-400',
  }

  const currentPlan = profile?.subscription_plan ?? 'free'
  const initial = (profile?.full_name?.[0] ?? user!.email![0]).toUpperCase()

  return (
    <div className="space-y-8 max-w-2xl animate-fade-up">
      <div>
        <h1 className="text-2xl font-extrabold text-[var(--text-primary)] tracking-tight">Profilul meu</h1>
        <p className="text-[var(--text-secondary)] mt-1.5 text-sm">Gestionează informațiile tale de cont</p>
      </div>

      {/* Avatar + plan */}
      <div className="bg-[var(--bg-surface)] rounded-2xl border border-[var(--border)] shadow-sm p-6 flex items-center gap-5">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-extrabold text-3xl shadow-lg shrink-0">
          {initial}
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-xl font-extrabold text-[var(--text-primary)] truncate tracking-tight">
            {profile?.full_name ?? 'Fără nume'}
          </h2>
          <div className="flex items-center gap-2 mt-1.5">
            <Mail className="w-3.5 h-3.5 text-[var(--text-muted)]" />
            <span className="text-sm text-[var(--text-muted)] truncate">{user!.email}</span>
          </div>
          <div className="flex items-center gap-2 mt-2.5 flex-wrap">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${planStyle[currentPlan]}`}>
              {planLabel[currentPlan]}
            </span>
            {profile?.target_institution && (
              <span className="text-xs bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 px-2.5 py-1 rounded-full font-semibold">
                Țintă: {profile.target_institution}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { icon: BookOpen,  label: 'Teste completate', value: totalTests.toString() },
          { icon: Target,    label: 'Scor mediu',        value: avgScore > 0 ? `${avgScore.toFixed(0)}%` : '—' },
          { icon: Calendar,  label: 'Examen în',         value: daysUntil !== null ? (daysUntil > 0 ? `${daysUntil} zile` : 'Trecut') : '—' },
        ].map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.label} className="bg-[var(--bg-surface)] rounded-2xl border border-[var(--border)] shadow-sm p-4 text-center">
              <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 flex items-center justify-center mx-auto mb-2.5">
                <Icon className="w-4.5 h-4.5 text-indigo-500" />
              </div>
              <p className="text-lg font-extrabold text-[var(--text-primary)] leading-none">{stat.value}</p>
              <p className="text-xs text-[var(--text-muted)] mt-1">{stat.label}</p>
            </div>
          )
        })}
      </div>

      {/* Edit form */}
      <div className="bg-[var(--bg-surface)] rounded-2xl border border-[var(--border)] shadow-sm p-6">
        <h3 className="font-bold text-[var(--text-primary)] mb-5">Editează profilul</h3>
        <ProfileForm
          initialName={profile?.full_name ?? ''}
          initialInstitution={(profile?.target_institution as Institution) ?? null}
          initialExamDate={profile?.exam_date ?? ''}
        />
      </div>

      {/* Account info */}
      <div className="bg-[var(--bg-surface)] rounded-2xl border border-[var(--border)] shadow-sm p-6 space-y-3">
        <h3 className="font-bold text-[var(--text-primary)] mb-2">Informații cont</h3>
        {[
          { label: 'Email', value: user!.email },
          { label: 'Plan', value: planLabel[currentPlan] },
          ...(profile?.subscribed_institution ? [{
            label: 'Instituție abonată',
            value: `${profile.subscribed_institution} — ${INSTITUTION_FULL_NAMES[profile.subscribed_institution as Institution]}`,
          }] : []),
          { label: 'Cont creat', value: new Date(user!.created_at).toLocaleDateString('ro-RO', { day: 'numeric', month: 'long', year: 'numeric' }) },
        ].map((row) => (
          <div key={row.label} className="flex justify-between text-sm border-b border-[var(--border)] pb-3 last:border-0 last:pb-0">
            <span className="text-[var(--text-muted)]">{row.label}</span>
            <span className="font-medium text-[var(--text-primary)] text-right">{row.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
