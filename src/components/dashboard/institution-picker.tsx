'use client'

import { useState } from 'react'
import { CheckCircle } from 'lucide-react'

export const STORAGE_KEY = 'psihoprep_institution'

const INSTITUTIONS = [
  {
    id: 'MAI',
    label: 'MAI',
    fullName: 'Ministerul Afacerilor Interne',
    description: 'Poliție, Jandarmerie, IGSU, Poliție de Frontieră',
    gradient: 'linear-gradient(135deg, #0c2d6b 0%, #1246a8 50%, #1a5fc7 100%)',
    glow: 'rgba(59,130,246,0.4)',
  },
  {
    id: 'MApN',
    label: 'MApN',
    fullName: 'Ministerul Apărării Naționale',
    description: 'Armata Română, Forțe Terestre, Navale, Aeriene',
    gradient: 'linear-gradient(135deg, #065040 0%, #0d7a5e 50%, #0f9070 100%)',
    glow: 'rgba(16,185,129,0.4)',
  },
  {
    id: 'SRI',
    label: 'SRI',
    fullName: 'Serviciul Român de Informații',
    description: 'Intelligence, Contrainformații, Securitate Națională',
    gradient: 'linear-gradient(135deg, #5c0d0d 0%, #8b1515 50%, #a01c1c 100%)',
    glow: 'rgba(239,68,68,0.4)',
  },
  {
    id: 'ANP',
    label: 'ANP',
    fullName: 'Administrația Națională a Penitenciarelor',
    description: 'Ofițer penitenciar, Agent penitenciar',
    gradient: 'linear-gradient(135deg, #2d1b6b 0%, #4c2ba8 50%, #5b35c7 100%)',
    glow: 'rgba(139,92,246,0.4)',
  },
]

interface InstitutionPickerProps {
  onSelect: (id: string) => void
}

export function InstitutionPicker({ onSelect }: InstitutionPickerProps) {
  const [selected, setSelected] = useState<string | null>(null)

  function handleSelect(id: string) {
    setSelected(id)
    localStorage.setItem(STORAGE_KEY, id)
    setTimeout(() => onSelect(id), 250)
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[var(--bg-base)] px-4 py-8 sm:p-8">
      <div className="mx-auto w-full max-w-2xl animate-fade-up">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 text-indigo-400 text-xs font-semibold px-3 py-1.5 rounded-full mb-5 border border-indigo-500/20">
            <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-pulse" />
            Schimbă instituția
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] tracking-tight leading-tight">
            Pentru ce instituție<br className="hidden sm:block" /> te pregătești?
          </h1>
          <p className="text-[var(--text-secondary)] mt-3 text-sm">
            Vom personaliza testele și materialele pentru tine
          </p>
        </div>

        {/* Cards — 2×2 portrait grid */}
        <div className="grid grid-cols-2 gap-4">
          {INSTITUTIONS.map((inst, i) => {
            const isSelected = selected === inst.id
            return (
              <button
                key={inst.id}
                onClick={() => handleSelect(inst.id)}
                className={`group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-200 hover:-translate-y-1 animate-fade-up stagger-${i + 1} text-left`}
                style={{
                  aspectRatio: '3/4',
                  background: inst.gradient,
                  boxShadow: isSelected
                    ? `0 0 0 3px rgba(255,255,255,0.7), 0 24px 48px -12px ${inst.glow}`
                    : `0 8px 32px -8px ${inst.glow}`,
                  outline: 'none',
                }}
              >
                {/* Full-bleed image */}
                <img
                  src={`/images/${inst.id.toLowerCase()}.jpg`}
                  alt={inst.label}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.3) 55%, rgba(0,0,0,0.1) 100%)' }} />

                {/* Selected badge */}
                {isSelected && (
                  <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white flex items-center justify-center shadow-lg">
                    <CheckCircle className="w-4 h-4 text-indigo-600" />
                  </div>
                )}

                {/* Bottom content */}
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p className="text-white font-extrabold text-2xl leading-none tracking-tight drop-shadow-lg">{inst.label}</p>
                  <p className="text-white/70 text-xs mt-1 leading-snug font-medium">{inst.fullName}</p>
                  <p className="text-white/45 text-[10px] mt-0.5">{inst.description}</p>
                </div>
              </button>
            )
          })}
        </div>

        <p className="text-center text-xs text-[var(--text-muted)] mt-6">
          Poți schimba instituția oricând din dashboard
        </p>
      </div>
    </div>
  )
}

export function useSelectedInstitution(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(STORAGE_KEY)
}
