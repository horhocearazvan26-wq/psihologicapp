'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import type { Institution } from '@/types'
import { Lock, Play, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { SimulationRunner } from './simulation-runner'

interface InstitutionOption {
  inst: Institution
  label: string
  fullName: string
  canSimulate: boolean
  gradient: string
  border: string
  bg: string
  text: string
  icon: React.ReactNode
}

interface SimulationSelectorProps {
  institutions: InstitutionOption[]
  userId: string
}

export function SimulationSelector({ institutions, userId }: SimulationSelectorProps) {
  const [selected, setSelected] = useState<Institution | null>(null)
  const [running, setRunning] = useState(false)

  if (running && selected) {
    return (
      <SimulationRunner
        institution={selected}
        onBack={() => { setRunning(false); setSelected(null) }}
      />
    )
  }

  return (
    <div className="space-y-5">
      <h2 className="text-base font-bold text-[var(--text-primary)]">Alege instituția</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {institutions.map((opt) => {
          const isSelected = selected === opt.inst
          return (
            <button
              key={opt.inst}
              onClick={() => opt.canSimulate && setSelected(opt.inst)}
              disabled={!opt.canSimulate}
              className={cn(
                'relative text-left rounded-2xl border-2 p-5 transition-all duration-200 group',
                opt.canSimulate
                  ? isSelected
                    ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/40 shadow-md'
                    : 'border-[var(--border)] bg-[var(--bg-surface)] hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-md cursor-pointer'
                  : 'border-[var(--border)] bg-[var(--bg-surface)] opacity-60 cursor-not-allowed'
              )}
            >
              <div className="flex items-center gap-4">
                {/* Icon */}
                <div className={cn(
                  'w-14 h-14 rounded-2xl bg-gradient-to-br flex items-center justify-center shrink-0 shadow-sm transition-transform duration-200',
                  opt.gradient,
                  isSelected ? 'scale-105' : ''
                )}>
                  <span className="text-white font-extrabold text-sm">{opt.inst}</span>
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-[var(--text-primary)] text-base leading-none">{opt.label}</p>
                  <p className="text-xs text-[var(--text-secondary)] mt-1 leading-snug">{opt.fullName}</p>
                </div>

                {/* Radio / lock */}
                {opt.canSimulate ? (
                  <div className={cn(
                    'w-6 h-6 rounded-full border-2 shrink-0 flex items-center justify-center transition-all',
                    isSelected ? 'border-indigo-500 bg-indigo-500' : 'border-[var(--border-strong)]'
                  )}>
                    {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                ) : (
                  <Lock className="w-4 h-4 text-[var(--text-muted)] shrink-0" />
                )}
              </div>

              {/* Upgrade nudge */}
              {!opt.canSimulate && (
                <div className={cn('mt-4 flex items-center justify-between text-xs rounded-xl px-3 py-2', opt.bg)}>
                  <span className={opt.text}>Necesită plan plătit</span>
                  <Link href="/dashboard/pricing" onClick={e => e.stopPropagation()}>
                    <span className={cn('font-bold underline', opt.text)}>Upgrade →</span>
                  </Link>
                </div>
              )}
            </button>
          )
        })}
      </div>

      {/* Start button */}
      <button
        disabled={!selected}
        onClick={() => selected && setRunning(true)}
        className={cn(
          'w-full h-14 rounded-2xl font-bold text-base flex items-center justify-center gap-3 transition-all duration-200',
          selected
            ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-200 dark:shadow-indigo-950 hover:shadow-xl hover:-translate-y-0.5'
            : 'bg-[var(--bg-muted)] text-[var(--text-muted)] cursor-not-allowed'
        )}
      >
        <Play className="w-5 h-5" />
        {selected ? `Pornește simularea — ${selected}` : 'Selectează o instituție'}
        {selected && <ChevronRight className="w-5 h-5" />}
      </button>
    </div>
  )
}
