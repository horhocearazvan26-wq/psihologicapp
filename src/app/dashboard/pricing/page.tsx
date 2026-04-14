import { createClient } from '@/lib/supabase/server'
import { CheckoutButton } from '@/components/dashboard/checkout-button'
import { CheckCircle, Star, Shield, Clock } from 'lucide-react'
import type { SubscriptionPlan } from '@/types'

const features = {
  free: [
    '15 întrebări demo per categorie',
    'Acces demo la toate 4 instituțiile',
    'Statistici de bază',
  ],
  one: [
    'Acces complet la 1 instituție aleasă',
    '200-300+ întrebări per categorie',
    '6 categorii complete',
    'Simulare examen complet',
    'Flashcard-uri + Review greșeli',
    'Statistici detaliate + grafice',
    'Achievements / realizări',
    'Actualizări gratuite pe viață',
    'Plată unică — fără abonament',
  ],
  all: [
    'Acces complet la TOATE 4 instituțiile',
    '24 module complete (6 categorii × 4)',
    'Simulare examen pentru fiecare instituție',
    'Flashcard-uri + Review greșeli',
    'Statistici detaliate per instituție',
    'Achievements / realizări',
    'Actualizări gratuite pe viață',
    'Economisești 157 lei vs. 4 planuri',
    'Plată unică — fără abonament',
  ],
}

const faqs = [
  { q: 'Cât timp am acces după cumpărare?', a: 'Accesul este pe viață. O singură plată, niciodată mai mult.' },
  { q: 'Pot schimba instituția după cumpărare?', a: 'Planul de o instituție este legat de instituția aleasă la checkout. Dacă vrei altă instituție, ai nevoie de un plan separat sau de planul "Toate Instituțiile".' },
  { q: 'Sunt testele actualizate conform probelor reale?', a: 'Da, întrebările sunt create și actualizate periodic pentru a reflecta tipologia reală a probelor psihologice din selecție.' },
  { q: 'Există garanție de returnare?', a: 'Oferim returnare completă în primele 7 zile de la cumpărare, fără întrebări.' },
  { q: 'Plata este securizată?', a: 'Da, plata se procesează prin Stripe, liderul global în plăți online. Nu stocăm datele cardului.' },
]

export default async function PricingPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user!.id).single()
  const currentPlan: SubscriptionPlan = profile?.subscription_plan ?? 'free'

  return (
    <div className="space-y-12 animate-fade-up">

      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 text-xs font-semibold px-4 py-2 rounded-full mb-5 border border-indigo-100 dark:border-indigo-900">
          <Shield className="w-3.5 h-3.5" /> Plată securizată prin Stripe · Garanție 7 zile
        </div>
        <h1 className="text-3xl font-extrabold text-[var(--text-primary)] tracking-tight">Planuri de acces</h1>
        <p className="text-[var(--text-muted)] mt-2 max-w-md mx-auto text-sm">
          Plată unică, acces pe viață. Fără abonament lunar sau costuri ascunse.
        </p>
      </div>

      {/* Plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">

        {/* Free */}
        <div className={`bg-[var(--bg-surface)] rounded-2xl border-2 p-7 transition-all ${currentPlan === 'free' ? 'border-indigo-300 dark:border-indigo-700' : 'border-[var(--border)]'}`}>
          {currentPlan === 'free' && (
            <span className="inline-block text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2.5 py-1 rounded-full mb-4">
              Planul tău actual
            </span>
          )}
          <h2 className="text-xl font-extrabold text-[var(--text-primary)] mb-1 tracking-tight">Gratuit</h2>
          <div className="flex items-end gap-1 mb-1">
            <span className="text-4xl font-extrabold text-[var(--text-primary)]">0</span>
            <span className="text-[var(--text-muted)] mb-1.5 text-sm">lei</span>
          </div>
          <p className="text-xs text-[var(--text-muted)] mb-6">Demo permanent</p>
          <ul className="space-y-2.5 mb-7">
            {features.free.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                <CheckCircle className="w-4 h-4 text-[var(--text-muted)] shrink-0 mt-0.5" />
                {f}
              </li>
            ))}
          </ul>
          <button disabled className="w-full py-2.5 rounded-xl border border-[var(--border)] text-sm font-semibold text-[var(--text-muted)] opacity-60 cursor-not-allowed">
            {currentPlan === 'free' ? 'Plan curent' : 'Gratuit'}
          </button>
        </div>

        {/* One Institution — recommended */}
        <div className={`relative bg-[var(--bg-surface)] rounded-2xl border-2 p-7 transition-all ${
          currentPlan === 'one_institution'
            ? 'border-indigo-300 dark:border-indigo-700'
            : 'border-indigo-500 shadow-xl shadow-indigo-100 dark:shadow-indigo-950/40'
        }`}>
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-xs font-bold px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
              <Star className="w-3 h-3 fill-white" /> Popular
            </span>
          </div>
          {currentPlan === 'one_institution' && (
            <span className="inline-block text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2.5 py-1 rounded-full mb-4">
              Planul tău actual
            </span>
          )}
          <h2 className="text-xl font-extrabold text-[var(--text-primary)] mb-1 tracking-tight">O Instituție</h2>
          <div className="flex items-end gap-1 mb-1">
            <span className="text-4xl font-extrabold text-[var(--text-primary)]">69</span>
            <span className="text-[var(--text-muted)] mb-1.5 text-sm">lei</span>
          </div>
          <p className="text-xs text-[var(--text-muted)] mb-5">Plată unică · Acces pe viață</p>

          <ul className="space-y-2.5 mb-7">
            {features.one.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                <CheckCircle className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                {f}
              </li>
            ))}
          </ul>

          {currentPlan === 'all_institutions' ? (
            <button disabled className="w-full py-2.5 rounded-xl bg-[var(--bg-muted)] text-sm font-semibold text-[var(--text-muted)] opacity-60 cursor-not-allowed">
              Inclus în planul tău
            </button>
          ) : currentPlan === 'one_institution' ? (
            <button disabled className="w-full py-2.5 rounded-xl bg-[var(--bg-muted)] text-sm font-semibold text-[var(--text-muted)] opacity-60 cursor-not-allowed">
              Plan curent
            </button>
          ) : (
            <CheckoutButton plan="one_institution" currentPlan={currentPlan} />
          )}
        </div>

        {/* All institutions */}
        <div className={`bg-[var(--bg-surface)] rounded-2xl border-2 p-7 transition-all ${currentPlan === 'all_institutions' ? 'border-violet-300 dark:border-violet-700' : 'border-[var(--border)]'}`}>
          {currentPlan === 'all_institutions' && (
            <span className="inline-block text-xs font-bold text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/60 px-2.5 py-1 rounded-full mb-4">
              Planul tău actual
            </span>
          )}
          <h2 className="text-xl font-extrabold text-[var(--text-primary)] mb-1 tracking-tight">Toate Instituțiile</h2>
          <div className="flex items-end gap-1 mb-1">
            <span className="text-4xl font-extrabold text-[var(--text-primary)]">119</span>
            <span className="text-[var(--text-muted)] mb-1.5 text-sm">lei</span>
          </div>
          <p className="text-xs text-green-600 dark:text-green-400 font-semibold mb-6">Economisești 157 lei</p>
          <ul className="space-y-2.5 mb-7">
            {features.all.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                {f}
              </li>
            ))}
          </ul>

          {currentPlan === 'all_institutions' ? (
            <button disabled className="w-full py-2.5 rounded-xl bg-[var(--bg-muted)] text-sm font-semibold text-[var(--text-muted)] opacity-60 cursor-not-allowed">
              Plan curent
            </button>
          ) : (
            <CheckoutButton plan="all_institutions" currentPlan={currentPlan} />
          )}
        </div>
      </div>

      {/* Trust badges */}
      <div className="flex flex-wrap justify-center gap-6 text-sm text-[var(--text-muted)]">
        {[
          { icon: Shield, label: 'Plată securizată Stripe' },
          { icon: Clock, label: 'Garanție returnare 7 zile' },
          { icon: CheckCircle, label: 'Acces imediat după plată' },
          { icon: Star, label: 'Fără abonament lunar' },
        ].map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-2">
            <Icon className="w-4 h-4 text-green-500" />
            <span>{label}</span>
          </div>
        ))}
      </div>

      {/* FAQ */}
      <div className="max-w-2xl mx-auto">
        <h2 className="text-xl font-extrabold text-[var(--text-primary)] text-center mb-6 tracking-tight">Întrebări frecvente</h2>
        <div className="space-y-3">
          {faqs.map(({ q, a }) => (
            <div key={q} className="bg-[var(--bg-surface)] rounded-2xl border border-[var(--border)] p-5 shadow-sm hover:border-[var(--border-strong)] transition-colors">
              <h3 className="font-bold text-[var(--text-primary)] mb-2 text-sm">{q}</h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
