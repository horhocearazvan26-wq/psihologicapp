'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { ChevronRight, Shield, Star, Eye, Scale } from 'lucide-react'

interface Institution {
  id: string
  label: string
  fullName: string
  description: string
  color: string
  gradient: string
  shadowColor: string
  icon: React.ReactNode
  pattern: string
}

const INSTITUTIONS: Institution[] = [
  {
    id: 'MAI',
    label: 'MAI',
    fullName: 'Ministerul Afacerilor Interne',
    description: 'Poliție, Jandarmerie, IGSU, Poliție de Frontieră',
    color: 'text-blue-400',
    gradient: 'from-blue-900 via-blue-800 to-blue-700',
    shadowColor: 'shadow-blue-900/50',
    icon: <Shield className="w-8 h-8 text-blue-200" />,
    pattern: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
  },
  {
    id: 'MApN',
    label: 'MApN',
    fullName: 'Ministerul Apărării Naționale',
    description: 'Armata Română, Forțe Terestre, Navale, Aeriene',
    color: 'text-emerald-400',
    gradient: 'from-emerald-900 via-emerald-800 to-teal-700',
    shadowColor: 'shadow-emerald-900/50',
    icon: <Star className="w-8 h-8 text-emerald-200" />,
    pattern: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  },
  {
    id: 'SRI',
    label: 'SRI',
    fullName: 'Serviciul Român de Informații',
    description: 'Intelligence, Contrainformații, Securitate Națională',
    color: 'text-red-400',
    gradient: 'from-red-950 via-red-900 to-rose-800',
    shadowColor: 'shadow-red-900/50',
    icon: <Eye className="w-8 h-8 text-red-200" />,
    pattern: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
  },
  {
    id: 'ANP',
    label: 'ANP',
    fullName: 'Administrația Națională a Penitenciarelor',
    description: 'Ofițer penitenciar, Agent penitenciar, Personal de execuție',
    color: 'text-violet-400',
    gradient: 'from-violet-950 via-violet-900 to-indigo-800',
    shadowColor: 'shadow-violet-900/50',
    icon: <Scale className="w-8 h-8 text-violet-200" />,
    pattern: "M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7 M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z",
  },
]

const STORAGE_KEY = 'psihoprep_institution'

export function InstitutionPicker() {
  const router = useRouter()
  const [selected, setSelected] = useState<string | null>(null)
  const [hovering, setHovering] = useState<string | null>(null)
  const [show, setShow] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (!saved) {
      setShow(true)
    }
  }, [])

  function handleSelect(id: string) {
    setSelected(id)
    setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, id)
      setShow(false)
      router.push(`/dashboard/tests?institution=${id}`)
    }, 300)
  }

  if (!show) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[var(--bg-base)]">
      <div className="w-full max-w-2xl animate-fade-up">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
            <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse" />
            Bun venit pe PsihoPrep
          </div>
          <h1 className="text-3xl font-extrabold text-[var(--text-primary)] tracking-tight">
            Pentru ce instituție te pregătești?
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
                  isSelected ? 'scale-95 opacity-80' : isHover ? 'scale-[1.02] -translate-y-1' : 'scale-100',
                  `animate-fade-up stagger-${i + 1}`
                )}
              >
                {/* Decorative circle */}
                <div className="absolute -top-6 -right-6 w-28 h-28 bg-white/5 rounded-full" />
                <div className="absolute -bottom-8 -right-2 w-36 h-36 bg-white/5 rounded-full" />

                {/* Icon */}
                <div className="mb-4 relative">
                  {inst.icon}
                </div>

                {/* Text */}
                <div className="relative">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-white font-extrabold text-xl tracking-tight">{inst.label}</span>
                  </div>
                  <p className="text-white/60 text-xs font-medium leading-snug mb-2">{inst.fullName}</p>
                  <p className="text-white/40 text-xs leading-relaxed">{inst.description}</p>
                </div>

                {/* Arrow */}
                <div className={cn(
                  'absolute right-5 bottom-5 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center transition-all duration-200',
                  isHover ? 'bg-white/20 translate-x-1' : ''
                )}>
                  <ChevronRight className="w-4 h-4 text-white" />
                </div>
              </button>
            )
          })}
        </div>

        <p className="text-center text-xs text-[var(--text-muted)] mt-6">
          Poți schimba instituția oricând din profilul tău
        </p>
      </div>
    </div>
  )
}

export function useSelectedInstitution() {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(STORAGE_KEY)
}
