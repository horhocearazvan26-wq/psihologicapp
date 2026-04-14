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
        <p className="text-[10px] font-bold tracking-widest uppercase mb-2" style={{ color: 'var(--text-muted)' }}>Cont</p>
        <h1 className="text-2xl font-extrabold tracking-tight" style={{ color: 'var(--text-primary)' }}>Profilul meu</h1>
        <p className="mt-1.5 text-sm" style={{ color: 'var(--text-secondary)' }}>Gestionează informațiile tale de cont</p>
      </div>

      {/* Avatar + plan */}
      <div className="dash-card relative overflow-hidden rounded-2xl p-6 flex items-center gap-5">
        <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-indigo-500 to-violet-500 opacity-40" />
        <div
          className="w-20 h-20 rounded-2xl flex items-center justify-center text-white font-extrabold text-3xl shrink-0"
          style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', boxShadow: '0 8px 24px -8px rgba(99,102,241,0.5)' }}
        >
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
          { icon: BookOpen, label: 'Teste', value: totalTests.toString(), iconBg: 'bg-blue-500/10', iconColor: 'text-blue-400' },
          { icon: Target,   label: 'Medie',  value: avgScore > 0 ? `${avgScore.toFixed(0)}%` : '—', iconBg: 'bg-emerald-500/10', iconColor: 'text-emerald-400' },
          { icon: Calendar, label: 'Examen', value: daysUntil !== null ? (daysUntil > 0 ? `${daysUntil}z` : 'Trecut') : '—', iconBg: 'bg-amber-500/10', iconColor: 'text-amber-400' },
        ].map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.label} className="dash-card rounded-2xl p-4 text-center">
              <div className={`w-9 h-9 rounded-xl ${stat.iconBg} flex items-center justify-center mx-auto mb-2.5`}>
                <Icon className={`w-4 h-4 ${stat.iconColor}`} />
              </div>
              <p className="text-lg font-extrabold leading-none" style={{ color: 'var(--text-primary)' }}>{stat.value}</p>
              <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>{stat.label}</p>
            </div>
          )
        })}
      </div>

      {/* Edit form */}
      <div className="dash-card rounded-2xl p-6">
        <h3 className="font-bold mb-5" style={{ color: 'var(--text-primary)' }}>Editează profilul</h3>
        <ProfileForm
          initialName={profile?.full_name ?? ''}
          initialInstitution={(profile?.target_institution as Institution) ?? null}
          initialExamDate={profile?.exam_date ?? ''}
        />
      </div>

      {/* Account info */}
      <div className="dash-card rounded-2xl p-6 space-y-3">
        <h3 className="font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Informații cont</h3>
        {[
          { label: 'Email', value: user!.email },
          { label: 'Plan', value: planLabel[currentPlan] },
          ...(profile?.subscribed_institution ? [{
            label: 'Instituție abonată',
            value: `${profile.subscribed_institution} — ${INSTITUTION_FULL_NAMES[profile.subscribed_institution as Institution]}`,
          }] : []),
          { label: 'Cont creat', value: new Date(user!.created_at).toLocaleDateString('ro-RO', { day: 'numeric', month: 'long', year: 'numeric' }) },
        ].map((row) => (
          <div key={row.label} className="flex justify-between text-sm border-b pb-3 last:border-0 last:pb-0" style={{ borderColor: 'var(--border)' }}>
            <span style={{ color: 'var(--text-muted)' }}>{row.label}</span>
            <span className="font-medium text-right" style={{ color: 'var(--text-primary)' }}>{row.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
