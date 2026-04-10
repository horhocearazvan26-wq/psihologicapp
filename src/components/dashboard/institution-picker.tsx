'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { ChevronRight, Shield, Star, Eye, Scale } from 'lucide-react'

export const STORAGE_KEY = 'psihoprep_institution'

interface Inst {
  id: string
  label: string
  fullName: string
  description: string
  gradient: string
  shadowColor: string
  icon: React.ReactNode
}

const INSTITUTIONS: Inst[] = [
  {
    id: 'MAI',
    label: 'MAI',
    fullName: 'Ministerul Afacerilor Interne',
    description: 'Poliție, Jandarmerie, IGSU, Poliție de Frontieră',
    gradient: 'from-blue-900 via-blue-800 to-blue-700',
    shadowColor: 'shadow-blue-900/60',
    icon: <Shield className="w-8 h-8 text-blue-200" />,
  },
  {
    id: 'MApN',
    label: 'MApN',
    fullName: 'Ministerul Apărării Naționale',
    description: 'Armata Română, Forțe Terestre, Navale, Aeriene',
    gradient: 'from-emerald-900 via-emerald-800 to-teal-700',
    shadowColor: 'shadow-emerald-900/60',
    icon: <Star className="w-8 h-8 text-emerald-200" />,
  },
  {
    id: 'SRI',
    label: 'SRI',
    fullName: 'Serviciul Român de Informații',
    description: 'Intelligence, Contrainformații, Securitate Națională',
    gradient: 'from-red-950 via-red-900 to-rose-800',
    shadowColor: 'shadow-red-900/60',
    icon: <Eye className="w-8 h-8 text-red-200" />,
  },
  {
    id: 'ANP',
    label: 'ANP',
    fullName: 'Administrația Națională a Penitenciarelor',
    description: 'Ofițer penitenciar, Agent penitenciar',
    gradient: 'from-violet-950 via-violet-900 to-indigo-800',
    shadowColor: 'shadow-violet-900/60',
    icon: <Scale className="w-8 h-8 text-violet-200" />,
  },
]

interface InstitutionPickerProps {
  onSelect: (id: string) => void
}

export function InstitutionPicker({ onSelect }: InstitutionPickerProps) {
  const [selected, setSelected] = useState<string | null>(null)
  const [hovering, setHovering] = useState<string | null>(null)

  function handleSelect(id: string) {
    setSelected(id)
    localStorage.setItem(STORAGE_KEY, id)
    setTimeout(() => onSelect(id), 250)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[var(--bg-base)] overflow-y-auto">
      <div className="w-full max-w-2xl py-8 animate-fade-up">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
            <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse" />
            Bun venit pe PsihoPrep
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] tracking-tight leading-tight">
            Pentru ce instituție<br className="hidden sm:block" /> te pregătești?
          </h1>
          <p className="text-[var(--text-secondary)] mt-3 text-base">
            Vom personaliza testele și materialele pentru tine
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {INSTITUTIONS.map((inst, i) => {
            const isSelected = selected === inst.id
            const isHover = hovering === inst.id
            return (
              <button
                key={inst.id}
                onClick={() => handleSelect(inst.id)}
                onMouseEnter={() => setHovering(inst.id)}
                onMouseLeave={() => setHovering(null)}
                className={cn(
                  'relative overflow-hidden rounded-2xl p-6 text-left transition-all duration-300 cursor-pointer group',
                  `bg-gradient-to-br ${inst.gradient}`,
                  `shadow-xl ${inst.shadowColor}`,
                  `animate-fade-up stagger-${i + 1}`,
                  isSelected ? 'scale-95 opacity-70' : isHover ? 'scale-[1.02] -translate-y-1 shadow-2xl' : 'scale-100',
                )}
              >
                <div className="absolute -top-6 -right-6 w-28 h-28 bg-white/5 rounded-full pointer-events-none" />
                <div className="absolute -bottom-8 -right-2 w-36 h-36 bg-white/5 rounded-full pointer-events-none" />

                <div className="mb-4">{inst.icon}</div>

                <div className="relative">
                  <p className="text-white font-extrabold text-xl tracking-tight leading-none mb-1">{inst.label}</p>
                  <p className="text-white/55 text-xs font-medium leading-snug mb-2">{inst.fullName}</p>
                  <p className="text-white/35 text-xs leading-relaxed">{inst.description}</p>
                </div>

                <div className={cn(
                  'absolute right-5 bottom-5 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center transition-all duration-200',
                  isHover ? 'bg-white/25 translate-x-0.5' : ''
                )}>
                  <ChevronRight className="w-4 h-4 text-white" />
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
