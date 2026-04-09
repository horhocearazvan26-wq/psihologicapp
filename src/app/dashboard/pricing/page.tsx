import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import type { Institution } from '@/types'
import { CheckCircle, Star, Zap, Shield, Clock } from 'lucide-react'

const institutions: Institution[] = ['MAI', 'MApN', 'SRI', 'ANP']

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
  {
    q: 'Cât timp am acces după cumpărare?',
    a: 'Accesul este pe viață. O singură plată, niciodată mai mult.',
  },
  {
    q: 'Pot schimba instituția după cumpărare?',
    a: 'Planul de o instituție este legat de instituția aleasă la checkout. Dacă vrei altă instituție, ai nevoie de un plan separat sau de planul "Toate Instituțiile".',
  },
  {
    q: 'Sunt testele actualizate conform probelor reale?',
    a: 'Da, întrebările sunt create și actualizate periodic pentru a reflecta tipologia reală a probelor psihologice din selecție.',
  },
  {
    q: 'Există garanție de returnare?',
    a: 'Oferim returnare completă în primele 7 zile de la cumpărare, fără întrebări.',
  },
  {
    q: 'Plata este securizată?',
    a: 'Da, plata se procesează prin Stripe, liderul global în plăți online. Nu stocăm datele cardului.',
  },
]

export default async function PricingPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user!.id).single()

  const currentPlan = profile?.subscription_plan ?? 'free'

  return (
    <div className="space-y-12 animate-fade-in">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-xs font-semibold px-4 py-2 rounded-full mb-5 border border-blue-100">
          <Shield className="w-3.5 h-3.5" /> Plată securizată prin Stripe · Garanție 7 zile
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900">Planuri de acces</h1>
        <p className="text-slate-500 mt-2 max-w-md mx-auto text-sm">
          Plată unică, acces pe viață. Fără abonament lunar sau costuri ascunse.
        </p>
      </div>

      {/* Plan cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {/* Free */}
        <div className={`rounded-2xl border-2 p-7 bg-white ${currentPlan === 'free' ? 'border-blue-200' : 'border-slate-100'}`}>
          {currentPlan === 'free' && (
            <span className="inline-block text-xs font-bold text-blue-700 bg-blue-100 px-2.5 py-1 rounded-full mb-4">
              Planul tău actual
            </span>
          )}
          <h2 className="text-xl font-bold text-slate-900 mb-1">Gratuit</h2>
          <div className="flex items-end gap-1 mb-1">
            <span className="text-4xl font-extrabold text-slate-900">0</span>
            <span className="text-slate-400 mb-1">lei</span>
          </div>
          <p className="text-xs text-slate-400 mb-5">Demo permanent</p>

          <ul className="space-y-2.5 mb-6">
            {features.free.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-slate-600">
                <CheckCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                {f}
              </li>
            ))}
          </ul>

          <Button variant="outline" className="w-full" disabled>
            {currentPlan === 'free' ? 'Plan curent' : 'Gratuit'}
          </Button>
        </div>

        {/* One Institution — highlighted */}
        <div className={`rounded-2xl border-2 p-7 bg-white relative ${
          currentPlan === 'one_institution' ? 'border-blue-200' : 'border-blue-500 shadow-xl shadow-blue-100'
        }`}>
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
            <span className="bg-blue-600 text-white text-xs font-bold px-4 py-1.5 rounded-full flex items-center gap-1.5">
              <Star className="w-3 h-3 fill-white" /> Popular
            </span>
          </div>

          {currentPlan === 'one_institution' && (
            <span className="inline-block text-xs font-bold text-blue-700 bg-blue-100 px-2.5 py-1 rounded-full mb-4">
              Planul tău actual
            </span>
          )}

          <h2 className="text-xl font-bold text-slate-900 mb-1">O Instituție</h2>
          <div className="flex items-end gap-1 mb-1">
            <span className="text-4xl font-extrabold text-slate-900">69</span>
            <span className="text-slate-400 mb-1">lei</span>
          </div>
          <p className="text-xs text-slate-400 mb-5">Plată unică · Acces pe viață</p>

          {currentPlan === 'free' && (
            <div className="mb-5">
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                Selectează instituția:
              </label>
              <select
                id="institution-select"
                className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-800"
              >
                {institutions.map((inst) => (
                  <option key={inst} value={inst}>{inst}</option>
                ))}
              </select>
            </div>
          )}

          <ul className="space-y-2.5 mb-6">
            {features.one.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-slate-600">
                <CheckCircle className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                {f}
              </li>
            ))}
          </ul>

          {currentPlan === 'free' ? (
            <Link href="/api/stripe/checkout?plan=one_institution">
              <Button className="w-full" size="lg">
                <Zap className="w-4 h-4 mr-1.5" /> Cumpără acum — 69 lei
              </Button>
            </Link>
          ) : (
            <Button className="w-full" disabled>
              {currentPlan === 'one_institution' ? 'Plan curent' : 'Inclus în planul tău'}
            </Button>
          )}
        </div>

        {/* All Institutions */}
        <div className={`rounded-2xl border-2 p-7 bg-white ${currentPlan === 'all_institutions' ? 'border-blue-200' : 'border-slate-100'}`}>
          {currentPlan === 'all_institutions' && (
            <span className="inline-block text-xs font-bold text-purple-700 bg-purple-100 px-2.5 py-1 rounded-full mb-4">
              Planul tău actual
            </span>
          )}
          <h2 className="text-xl font-bold text-slate-900 mb-1">Toate Instituțiile</h2>
          <div className="flex items-end gap-1 mb-1">
            <span className="text-4xl font-extrabold text-slate-900">119</span>
            <span className="text-slate-400 mb-1">lei</span>
          </div>
          <p className="text-xs text-green-600 font-semibold mb-5">Economisești 157 lei</p>

          <ul className="space-y-2.5 mb-6">
            {features.all.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-slate-600">
                <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                {f}
              </li>
            ))}
          </ul>

          {currentPlan === 'free' ? (
            <Link href="/api/stripe/checkout?plan=all_institutions">
              <Button variant="outline" className="w-full" size="lg">
                Cumpără acum — 119 lei
              </Button>
            </Link>
          ) : currentPlan === 'one_institution' ? (
            <Link href="/api/stripe/checkout?plan=all_institutions">
              <Button variant="outline" className="w-full">
                Upgrade la Toate — 119 lei
              </Button>
            </Link>
          ) : (
            <Button className="w-full" disabled>Plan curent</Button>
          )}
        </div>
      </div>

      {/* Trust badges */}
      <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-500">
        {[
          { icon: Shield, label: 'Plată securizată Stripe' },
          { icon: Clock, label: 'Garanție returnare 7 zile' },
          { icon: CheckCircle, label: 'Acces imediat după plată' },
          { icon: Star, label: 'Fără abonament lunar' },
        ].map((item) => {
          const Icon = item.icon
          return (
            <div key={item.label} className="flex items-center gap-2">
              <Icon className="w-4 h-4 text-green-500" />
              <span>{item.label}</span>
            </div>
          )
        })}
      </div>

      {/* FAQ */}
      <div className="max-w-2xl mx-auto">
        <h2 className="text-xl font-bold text-slate-900 text-center mb-6">Întrebări frecvente</h2>
        <div className="space-y-3">
          {faqs.map(({ q, a }) => (
            <div key={q} className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
              <h3 className="font-bold text-slate-800 mb-2 text-sm">{q}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
