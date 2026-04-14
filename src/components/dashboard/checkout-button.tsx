'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Zap, ArrowRight, Loader2 } from 'lucide-react'
import type { Institution, SubscriptionPlan } from '@/types'

const INSTITUTIONS: Institution[] = ['MAI', 'MApN', 'SRI', 'ANP']

interface CheckoutButtonProps {
  plan: 'one_institution' | 'all_institutions'
  currentPlan: SubscriptionPlan
}

export function CheckoutButton({ plan, currentPlan }: CheckoutButtonProps) {
  const router = useRouter()
  const [institution, setInstitution] = useState<Institution>('MAI')
  const [loading, setLoading] = useState(false)

  function handleCheckout() {
    setLoading(true)
    const params = new URLSearchParams({ plan })
    if (plan === 'one_institution') params.set('institution', institution)
    router.push(`/api/stripe/checkout?${params.toString()}`)
  }

  if (plan === 'one_institution') {
    return (
      <div className="space-y-4">
        {currentPlan === 'free' && (
          <div>
            <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1.5">
              Selectează instituția:
            </label>
            <select
              value={institution}
              onChange={(e) => setInstitution(e.target.value as Institution)}
              className="w-full border border-[var(--border)] rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-[var(--bg-base)] text-[var(--text-primary)] hover:border-[var(--border-strong)] transition-colors"
            >
              {INSTITUTIONS.map((inst) => (
                <option key={inst} value={inst}>{inst}</option>
              ))}
            </select>
          </div>
        )}
        <button
          onClick={handleCheckout}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-sm font-bold hover:opacity-90 transition-opacity shadow-lg shadow-indigo-200 dark:shadow-indigo-950/50 disabled:opacity-60 disabled:cursor-not-allowed glow-cta btn-shimmer"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              <Zap className="w-4 h-4" />
              {currentPlan === 'free' ? 'Cumpără acum — 69 lei' : 'Planul tău actual'}
            </>
          )}
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 border-[var(--border-strong)] text-sm font-bold text-[var(--text-primary)] hover:bg-[var(--bg-muted)] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <>
          {currentPlan === 'one_institution' ? 'Upgrade la Toate — 119 lei' : 'Cumpără acum — 119 lei'}
          <ArrowRight className="w-4 h-4" />
        </>
      )}
    </button>
  )
}
