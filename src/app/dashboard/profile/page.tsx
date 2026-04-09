import { createClient } from '@/lib/supabase/server'
import { Card, CardContent } from '@/components/ui/card'
import { ProfileForm } from './profile-form'
import type { Institution } from '@/types'
import { INSTITUTION_FULL_NAMES } from '@/lib/utils'
import { User, Shield, Calendar, Mail } from 'lucide-react'

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

  const planLabel: Record<string, string> = {
    free: 'Plan Gratuit',
    one_institution: 'O Instituție',
    all_institutions: 'Toate Instituțiile',
  }

  return (
    <div className="space-y-8 max-w-2xl animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Profilul meu</h1>
        <p className="text-slate-500 mt-1 text-sm">Gestionează informațiile tale de cont</p>
      </div>

      {/* Avatar + plan badge */}
      <Card>
        <CardContent className="flex items-center gap-5 p-6">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-3xl shadow-md shrink-0">
            {profile?.full_name?.[0]?.toUpperCase() ?? user!.email![0].toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-bold text-slate-900 truncate">
              {profile?.full_name ?? 'Fără nume'}
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-sm text-slate-500 truncate">{user!.email}</span>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                profile?.subscription_plan === 'free'
                  ? 'bg-slate-100 text-slate-600'
                  : profile?.subscription_plan === 'one_institution'
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-purple-100 text-purple-700'
              }`}>
                {planLabel[profile?.subscription_plan ?? 'free']}
              </span>
              {profile?.target_institution && (
                <span className="text-xs bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full font-medium">
                  Țintă: {profile.target_institution}
                </span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { icon: User, label: 'Teste completate', value: totalTests },
          { icon: Shield, label: 'Scor mediu', value: avgScore > 0 ? `${avgScore.toFixed(0)}%` : '—' },
          {
            icon: Calendar,
            label: 'Examen în',
            value: profile?.exam_date
              ? (() => {
                  const days = Math.ceil((new Date(profile.exam_date).getTime() - Date.now()) / 86400000)
                  return days > 0 ? `${days} zile` : 'Trecut'
                })()
              : '—',
          },
        ].map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label}>
              <CardContent className="p-4 text-center">
                <Icon className="w-5 h-5 text-blue-500 mx-auto mb-2" />
                <p className="text-lg font-bold text-slate-900">{stat.value}</p>
                <p className="text-xs text-slate-500 mt-0.5">{stat.label}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Edit form */}
      <Card>
        <CardContent className="p-6">
          <h3 className="font-bold text-slate-800 mb-5">Editează profilul</h3>
          <ProfileForm
            initialName={profile?.full_name ?? ''}
            initialInstitution={(profile?.target_institution as Institution) ?? null}
            initialExamDate={profile?.exam_date ?? ''}
          />
        </CardContent>
      </Card>

      {/* Account info */}
      <Card>
        <CardContent className="p-6 space-y-3">
          <h3 className="font-bold text-slate-800 mb-2">Informații cont</h3>
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Email</span>
            <span className="font-medium text-slate-800">{user!.email}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Plan</span>
            <span className="font-medium text-slate-800">{planLabel[profile?.subscription_plan ?? 'free']}</span>
          </div>
          {profile?.subscribed_institution && (
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Instituție abonată</span>
              <span className="font-medium text-slate-800">
                {profile.subscribed_institution} — {INSTITUTION_FULL_NAMES[profile.subscribed_institution as Institution]}
              </span>
            </div>
          )}
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Cont creat</span>
            <span className="font-medium text-slate-800">
              {new Date(user!.created_at).toLocaleDateString('ro-RO', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
