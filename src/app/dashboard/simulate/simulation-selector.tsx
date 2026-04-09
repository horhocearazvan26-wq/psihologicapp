'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
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
  bg: string
  text: string
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
    <div className="space-y-4">
      <h2 className="text-base font-bold text-slate-800">Alege instituția</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {institutions.map((opt) => (
          <div
            key={opt.inst}
            onClick={() => opt.canSimulate && setSelected(opt.inst)}
            className={cn(
              'rounded-2xl border-2 p-5 transition-all duration-150',
              opt.canSimulate
                ? selected === opt.inst
                  ? 'border-blue-500 bg-blue-50 cursor-pointer'
                  : 'border-slate-200 hover:border-blue-300 cursor-pointer hover:bg-slate-50'
                : 'border-slate-100 opacity-60 cursor-not-allowed'
            )}
          >
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${opt.gradient} flex items-center justify-center shrink-0 shadow-sm`}>
                <span className="text-white font-bold">{opt.inst}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-slate-800">{opt.label}</p>
                <p className="text-xs text-slate-500 truncate">{opt.fullName}</p>
              </div>
              {opt.canSimulate ? (
                <div className={cn(
                  'w-6 h-6 rounded-full border-2 shrink-0 transition-all',
                  selected === opt.inst ? 'border-blue-500 bg-blue-500' : 'border-slate-300'
                )}>
                  {selected === opt.inst && (
                    <div className="w-full h-full rounded-full bg-white scale-[0.4] transform" />
                  )}
                </div>
              ) : (
                <Lock className="w-4 h-4 text-slate-400 shrink-0" />
              )}
            </div>

            {!opt.canSimulate && (
              <div className={`mt-3 text-xs ${opt.text} ${opt.bg} rounded-lg px-3 py-2 flex items-center justify-between`}>
                <span>Necesită plan plătit</span>
                <Link href="/dashboard/pricing" onClick={e => e.stopPropagation()}>
                  <span className="font-semibold underline">Upgrade →</span>
                </Link>
              </div>
            )}
          </div>
        ))}
      </div>

      <Button
        className="w-full h-12 text-base mt-2"
        disabled={!selected}
        onClick={() => selected && setRunning(true)}
      >
        <Play className="w-5 h-5 mr-2" />
        Pornește simularea pentru {selected ?? '...'}
        <ChevronRight className="w-4 h-4 ml-2" />
      </Button>
    </div>
  )
}
