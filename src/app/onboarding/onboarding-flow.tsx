'use client'

import { useState, useTransition } from 'react'
import { Brain, ArrowRight, CheckCircle, Loader2, Shield, Star, Eye, Scale, Calendar, ChevronRight, CreditCard } from 'lucide-react'
import { saveInstitution, saveOnboardingFree } from './actions'

const institutions = [
  {
    id: 'MAI',
    label: 'MAI',
    fullName: 'Ministerul Afacerilor Interne',
    sub: 'Poliție, Jandarmerie, IGPF',
    gradient: 'linear-gradient(135deg, #0c2d6b 0%, #1246a8 50%, #1a5fc7 100%)',
    glow: 'rgba(59,130,246,0.4)',
    icon: Shield,
  },
  {
    id: 'MApN',
    label: 'MApN',
    fullName: 'Ministerul Apărării Naționale',
    sub: 'Armata Română',
    gradient: 'linear-gradient(135deg, #065040 0%, #0d7a5e 50%, #0f9070 100%)',
    glow: 'rgba(16,185,129,0.4)',
    icon: Star,
  },
  {
    id: 'SRI',
    label: 'SRI',
    fullName: 'Serviciul Român de Informații',
    sub: 'Servicii de informații',
    gradient: 'linear-gradient(135deg, #5c0d0d 0%, #8b1515 50%, #a01c1c 100%)',
    glow: 'rgba(239,68,68,0.4)',
    icon: Eye,
  },
  {
    id: 'ANP',
    label: 'ANP',
    fullName: 'Administrația Națională a Penitenciarelor',
    sub: 'Penitenciare',
    gradient: 'linear-gradient(135deg, #2d1b6b 0%, #4c2ba8 50%, #5b35c7 100%)',
    glow: 'rgba(139,92,246,0.4)',
    icon: Scale,
  },
]

const plans = [
  {
    id: 'free',
    name: 'Gratuit',
    price: '0',
    period: '',
    desc: 'Ideal pentru a testa platforma',
    features: ['15 întrebări demo per categorie', 'Statistici de bază', 'Acces limitat la flashcarduri'],
    cta: 'Continuă gratuit',
    href: null,
    highlight: false,
  },
  {
    id: 'one_institution',
    name: 'O Instituție',
    price: '69',
    period: 'lei',
    desc: 'Acces complet la instituția aleasă',
    features: ['200–300+ întrebări per categorie', '6 categorii complete', 'Simulare examen real', 'Flashcard-uri + Review greșeli', 'Statistici detaliate + grafice'],
    cta: 'Cumpără — 69 lei',
    href: '/dashboard/pricing',
    highlight: true,
    badge: 'Popular',
  },
  {
    id: 'all_institutions',
    name: 'Toate Instituțiile',
    price: '119',
    period: 'lei',
    desc: 'MAI + MApN + SRI + ANP complet',
    features: ['Acces complet la toate 4 instituțiile', '24 module (6 × 4)', 'Simulare pentru fiecare instituție', 'Actualizări gratuite pe viață', 'Economisești 157 lei'],
    cta: 'Cumpără — 119 lei',
    href: '/dashboard/pricing',
    highlight: false,
    badge: 'Best value',
  },
]

interface OnboardingFlowProps {
  firstName: string
}

export function OnboardingFlow({ firstName }: OnboardingFlowProps) {
  const [step, setStep] = useState<1 | 2>(1)
  const [selectedInstitution, setSelectedInstitution] = useState<string | null>(null)
  const [examDate, setExamDate] = useState('')
  const [isPending, startTransition] = useTransition()

  function goToStep2() {
    if (!selectedInstitution) return
    setStep(2)
  }

  function handlePlanContinue(plan: typeof plans[number]) {
    startTransition(async () => {
      if (plan.id === 'free') {
        // Save profile and go to dashboard (free, no payment)
        await saveOnboardingFree(selectedInstitution!, examDate)
      } else {
        // Save institution first, then redirect to Stripe
        await saveInstitution(selectedInstitution!, examDate)
        const params = new URLSearchParams({ plan: plan.id })
        if (plan.id === 'one_institution') params.set('institution', selectedInstitution!)
        window.location.href = `/api/stripe/checkout?${params.toString()}`
      }
    })
  }

  return (
    <div className="dark min-h-screen" style={{ background: 'var(--bg-base)' }}>
      {/* Background blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full blur-[120px]" style={{ background: 'rgba(99,102,241,0.06)' }} />
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full blur-[120px]" style={{ background: 'rgba(139,92,246,0.05)' }} />
      </div>

      <div className="relative min-h-screen flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-5 border-b" style={{ borderColor: 'var(--border)' }}>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-900/40">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="font-extrabold text-[var(--text-primary)] text-lg tracking-tight">PsihoPrep</span>
          </div>
          {/* Step indicator */}
          <div className="flex items-center gap-2">
            {[1, 2].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all"
                  style={{
                    borderColor: s < step ? '#4ade80' : s === step ? '#6366f1' : 'var(--border-strong)',
                    background: s < step ? '#4ade80' : s === step ? 'rgba(99,102,241,0.15)' : 'transparent',
                    color: s < step ? '#fff' : s === step ? '#818cf8' : 'var(--text-muted)',
                  }}
                >
                  {s < step ? <CheckCircle className="w-3.5 h-3.5" /> : s}
                </div>
                {s < 2 && <div className="w-8 h-0.5 rounded-full" style={{ background: s < step ? '#4ade80' : 'var(--border-strong)' }} />}
              </div>
            ))}
          </div>
        </header>

        {/* Step 1 — Institution + Exam date */}
        {step === 1 && (
          <div className="flex-1 flex flex-col items-center px-4 py-10 sm:py-16">
            <div className="w-full max-w-2xl">
              <div className="text-center mb-10">
                <p className="text-[10px] font-bold tracking-widest uppercase mb-3" style={{ color: 'var(--text-muted)' }}>Pasul 1 din 2</p>
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3" style={{ color: 'var(--text-primary)' }}>
                  Bun venit, {firstName}!
                </h1>
                <p className="text-base" style={{ color: 'var(--text-secondary)' }}>
                  Pentru ce instituție te pregătești?
                </p>
              </div>

              {/* Institution grid */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {institutions.map((inst) => {
                  const selected = selectedInstitution === inst.id
                  return (
                    <button
                      key={inst.id}
                      onClick={() => setSelectedInstitution(inst.id)}
                      className="relative overflow-hidden rounded-2xl text-left transition-all duration-200 hover:-translate-y-1 group"
                      style={{
                        aspectRatio: '3/4',
                        background: inst.gradient,
                        boxShadow: selected
                          ? `0 0 0 3px rgba(255,255,255,0.7), 0 24px 48px -12px ${inst.glow}`
                          : `0 8px 32px -8px ${inst.glow}`,
                        outline: 'none',
                      }}
                    >
                      {/* Full-bleed background image */}
                      <img
                        src={`/images/${inst.id.toLowerCase()}.jpg`}
                        alt={inst.label}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
                      />

                      {/* Dark gradient overlay — bottom heavy */}
                      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.1) 100%)' }} />

                      {/* Selected ring indicator */}
                      {selected && (
                        <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white flex items-center justify-center shadow-lg">
                          <CheckCircle className="w-4 h-4 text-indigo-600" />
                        </div>
                      )}

                      {/* Bottom content */}
                      <div className="absolute inset-x-0 bottom-0 p-4">
                        <p className="text-white font-extrabold text-2xl leading-none tracking-tight drop-shadow-lg">{inst.label}</p>
                        <p className="text-white/70 text-xs mt-1 leading-snug font-medium">{inst.fullName}</p>
                        <p className="text-white/45 text-[10px] mt-0.5">{inst.sub}</p>
                      </div>
                    </button>
                  )
                })}
              </div>

              {/* Exam date (optional) */}
              <div className="rounded-2xl p-5 mb-8" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="w-4 h-4 text-indigo-400" />
                  <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Când e examenul? <span className="font-normal" style={{ color: 'var(--text-muted)' }}>(opțional)</span></span>
                </div>
                <input
                  type="date"
                  value={examDate}
                  onChange={(e) => setExamDate(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl text-sm"
                  style={{
                    background: 'var(--bg-muted)',
                    border: '1px solid var(--border)',
                    color: 'var(--text-primary)',
                    outline: 'none',
                  }}
                />
                <p className="text-xs mt-2" style={{ color: 'var(--text-muted)' }}>
                  Vom afișa un countdown în dashboard pentru a-ți reaminti cât timp mai ai.
                </p>
              </div>

              <button
                onClick={goToStep2}
                disabled={!selectedInstitution}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl text-sm font-bold text-white transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                style={{
                  background: selectedInstitution ? 'linear-gradient(135deg, #4f46e5, #7c3aed)' : 'var(--bg-muted)',
                  boxShadow: selectedInstitution ? '0 12px 28px -8px rgba(99,102,241,0.5)' : 'none',
                }}
              >
                Continuă <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2 — Plan selection */}
        {step === 2 && (
          <div className="flex-1 flex flex-col items-center px-4 py-10 sm:py-16">
            <div className="w-full max-w-3xl">
              <div className="text-center mb-10">
                <p className="text-[10px] font-bold tracking-widest uppercase mb-3" style={{ color: 'var(--text-muted)' }}>Pasul 2 din 2</p>
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3" style={{ color: 'var(--text-primary)' }}>
                  Alege planul tău
                </h1>
                <p className="text-base" style={{ color: 'var(--text-secondary)' }}>
                  Poți upgrade oricând din dashboard. Plată unică, fără abonament.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
                {plans.map((plan) => (
                  <div
                    key={plan.id}
                    className="relative rounded-2xl p-6 flex flex-col transition-all duration-200 hover:-translate-y-1"
                    style={{
                      background: plan.highlight
                        ? 'linear-gradient(145deg, #1e1060 0%, #2d1b8a 50%, #3b26a8 100%)'
                        : 'var(--bg-surface)',
                      border: plan.highlight
                        ? '1px solid rgba(129,140,248,0.3)'
                        : '1px solid var(--border)',
                      boxShadow: plan.highlight
                        ? '0 24px 48px -16px rgba(99,102,241,0.4), 0 0 0 1px rgba(129,140,248,0.15)'
                        : '0 4px 16px -8px rgba(0,0,0,0.4)',
                    }}
                  >
                    {plan.highlight && (
                      <div className="absolute inset-x-0 top-0 h-px rounded-t-2xl" style={{ background: 'linear-gradient(90deg, transparent, rgba(165,180,252,0.5), transparent)' }} />
                    )}
                    {'badge' in plan && plan.badge && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-indigo-500 text-white shadow-md shadow-indigo-900/40">
                          {plan.badge}
                        </span>
                      </div>
                    )}

                    <div className="mb-5">
                      <h3 className="font-bold text-base mb-1" style={{ color: 'var(--text-primary)' }}>{plan.name}</h3>
                      <div className="flex items-end gap-1 mb-1">
                        <span className="text-3xl font-extrabold tracking-tight" style={{ color: 'var(--text-primary)' }}>{plan.price}</span>
                        {plan.period && <span className="mb-1 text-sm font-medium" style={{ color: 'var(--text-muted)' }}>{plan.period}</span>}
                      </div>
                      <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{plan.desc}</p>
                    </div>

                    <ul className="space-y-2 mb-6 flex-1">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
                          <CheckCircle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-indigo-400" />
                          {f}
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={() => handlePlanContinue(plan)}
                      disabled={isPending}
                      className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 disabled:opacity-50"
                      style={{
                        background: plan.highlight
                          ? 'linear-gradient(135deg, #818cf8, #6366f1)'
                          : plan.id === 'all_institutions'
                          ? 'linear-gradient(135deg, #7c3aed, #4f46e5)'
                          : 'var(--bg-muted)',
                        color: plan.id !== 'free' ? '#fff' : 'var(--text-primary)',
                        border: plan.id !== 'free' ? 'none' : '1px solid var(--border)',
                      }}
                    >
                      {isPending
                        ? <Loader2 className="w-4 h-4 animate-spin" />
                        : plan.id === 'free'
                        ? <ChevronRight className="w-4 h-4" />
                        : <CreditCard className="w-4 h-4" />
                      }
                      {plan.cta}
                    </button>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setStep(1)}
                className="mx-auto flex items-center gap-1.5 text-sm font-medium transition-colors"
                style={{ color: 'var(--text-muted)' }}
              >
                ← Înapoi
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
