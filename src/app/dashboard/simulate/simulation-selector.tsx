'use client'

import { useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import type { Institution } from '@/types'
import { Lock, Play, ChevronRight, CheckCircle } from 'lucide-react'
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
}

export function SimulationSelector({ institutions }: SimulationSelectorProps) {
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

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {institutions.map((opt) => {
          const isSelected = selected === opt.inst
          return (
            <button
              key={opt.inst}
              onClick={() => opt.canSimulate && setSelected(opt.inst)}
              disabled={!opt.canSimulate}
              className={cn(
                'relative overflow-hidden rounded-2xl transition-all duration-200 group text-left',
                opt.canSimulate ? 'cursor-pointer hover:-translate-y-1' : 'cursor-not-allowed opacity-50'
              )}
              style={{
                aspectRatio: '3/4',
                background: `linear-gradient(135deg, ${opt.gradient.includes('blue') ? '#0c2d6b,#1550cc' : opt.gradient.includes('emerald') ? '#065040,#0f9070' : opt.gradient.includes('red') ? '#5c0d0d,#a01c1c' : '#2d1b6b,#5b35c7'})`,
                boxShadow: isSelected ? '0 0 0 3px rgba(255,255,255,0.6), 0 16px 40px -12px rgba(0,0,0,0.5)' : '0 8px 24px -8px rgba(0,0,0,0.4)',
              }}
            >
              {/* Full-bleed image */}
              <Image
                src={`/images/${opt.inst.toLowerCase()}.png`}
                alt={opt.label}
                fill
                sizes="(min-width: 640px) 280px, 50vw"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.3) 55%, rgba(0,0,0,0.1) 100%)' }} />

              {/* Lock or selected badge */}
              <div className="absolute top-2.5 right-2.5">
                {!opt.canSimulate ? (
                  <div className="w-6 h-6 rounded-full bg-black/50 flex items-center justify-center">
                    <Lock className="w-3 h-3 text-white/70" />
                  </div>
                ) : isSelected ? (
                  <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-md">
                    <CheckCircle className="w-4 h-4 text-indigo-600" />
                  </div>
                ) : null}
              </div>

              {/* Bottom content */}
              <div className="absolute inset-x-0 bottom-0 p-3">
                <p className="text-white font-extrabold text-xl leading-none tracking-tight">{opt.label}</p>
                <p className="text-white/60 text-[10px] mt-1 leading-snug">{opt.fullName}</p>
                {!opt.canSimulate && (
                  <Link href="/dashboard/pricing" onClick={e => e.stopPropagation()} className="inline-block mt-2">
                    <span className="text-[10px] font-bold text-white/80 underline">Upgrade →</span>
                  </Link>
                )}
              </div>
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
