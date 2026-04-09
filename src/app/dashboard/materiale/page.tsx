'use client'

import { useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface MaterialCategory {
  id: string
  label: string
  description: string
  folder: string
  pages: number[]
  icon: string
}

const CATEGORIES: MaterialCategory[] = [
  {
    id: 'raven',
    label: 'Testul Raven (Matrici Progresive)',
    description: 'Matrici progresive standard — evaluarea inteligenței fluide și a raționamentului non-verbal',
    folder: 'raven',
    pages: Array.from({ length: 37 }, (_, i) => i + 4),
    icon: '🧩',
  },
  {
    id: 'inteligenta',
    label: 'Teste de Inteligență (F1-F12)',
    description: 'Bateria Bonnardel — factori de inteligență F1-F12 din Materia Generală',
    folder: 'inteligenta',
    pages: Array.from({ length: 64 }, (_, i) => i + 25),
    icon: '🧠',
  },
  {
    id: 'atentie',
    label: 'Teste de Atenție',
    description: 'Probe de atenție concentrată și distributivă',
    folder: 'atentie',
    pages: [1, 2, 3, 4],
    icon: '👁',
  },
  {
    id: 'rationament',
    label: 'Raționament Logic',
    description: 'Exerciții de raționament logic și deductiv',
    folder: 'rationament',
    pages: [1, 2, 3, 4, 5, 6, 7, 8],
    icon: '💡',
  },
  {
    id: 'matematic',
    label: 'Aptitudini Matematice',
    description: 'Probleme matematice specifice testelor de admitere',
    folder: 'matematic',
    pages: [1, 2, 3, 4, 5, 6],
    icon: '🔢',
  },
  {
    id: 'alfabet',
    label: 'Teste Alfabet / Codificare',
    description: 'Exerciții cu litere, coduri și simboluri',
    folder: 'alfabet',
    pages: [1, 2, 3, 4, 5, 6, 7, 8],
    icon: '🔤',
  },
  {
    id: 'bontila',
    label: 'Bontilă — Psihologie Aplicată',
    description: 'Material suplimentar de psihologie aplicată',
    folder: 'bontila',
    pages: Array.from({ length: 64 }, (_, i) => i + 1),
    icon: '📚',
  },
]

function pageFileName(page: number): string {
  return `page_${String(page).padStart(3, '0')}.png`
}

export default function MaterialePage() {
  const [selectedCategory, setSelectedCategory] = useState<MaterialCategory | null>(null)
  const [currentPage, setCurrentPage] = useState(0)
  const [zoom, setZoom] = useState(false)

  if (selectedCategory) {
    const pages = selectedCategory.pages
    const currentPageNum = pages[currentPage]
    const imageUrl = `/test-images/${selectedCategory.folder}/${pageFileName(currentPageNum)}`

    return (
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => { setSelectedCategory(null); setCurrentPage(0); setZoom(false) }}
            className="flex items-center gap-1.5 text-sm text-blue-600 hover:underline font-medium"
          >
            ← Materiale
          </button>
          <span className="text-slate-300">/</span>
          <span className="text-sm font-semibold text-slate-700">
            {selectedCategory.icon} {selectedCategory.label}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-xs text-slate-500">{selectedCategory.description}</p>
          <span className="text-xs text-slate-400 bg-slate-100 px-2 py-1 rounded-lg">
            Pagina {currentPage + 1} din {pages.length}
          </span>
        </div>

        {/* Image viewer */}
        <div
          className={cn(
            'relative bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden cursor-zoom-in',
            zoom && 'cursor-zoom-out'
          )}
          onClick={() => setZoom(z => !z)}
        >
          <div className={cn(
            'transition-all duration-200',
            zoom ? 'overflow-auto max-h-[80vh]' : 'overflow-hidden'
          )}>
            <img
              src={imageUrl}
              alt={`${selectedCategory.label} — pagina ${currentPageNum}`}
              className={cn(
                'w-full object-contain transition-all duration-200',
                zoom ? 'max-w-none w-auto mx-auto' : 'max-h-[70vh]'
              )}
              style={zoom ? { maxWidth: '200%' } : undefined}
            />
          </div>
          <div className="absolute bottom-3 right-3 bg-black/40 text-white text-xs px-2 py-1 rounded-lg pointer-events-none">
            {zoom ? 'Click pentru a micșora' : 'Click pentru zoom'}
          </div>
        </div>

        {/* Page navigation */}
        <div className="flex items-center gap-2">
          <button
            disabled={currentPage === 0}
            onClick={() => { setCurrentPage(p => p - 1); setZoom(false) }}
            className="px-4 py-2 text-sm font-medium rounded-xl border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            ← Anterior
          </button>

          <div className="flex-1 overflow-x-auto">
            <div className="flex gap-1 min-w-max px-1">
              {pages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setCurrentPage(i); setZoom(false) }}
                  className={cn(
                    'w-8 h-8 rounded-lg text-xs font-semibold transition-colors shrink-0',
                    i === currentPage
                      ? 'bg-blue-500 text-white'
                      : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                  )}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>

          <button
            disabled={currentPage === pages.length - 1}
            onClick={() => { setCurrentPage(p => p + 1); setZoom(false) }}
            className="px-4 py-2 text-sm font-medium rounded-xl border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Următor →
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Materiale de studiu</h1>
        <p className="text-slate-500 text-sm mt-1">
          Pagini scanate din materialele oficiale de pregătire — Testul Raven, Bonnardel, Atenție și altele.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat)}
            className="text-left p-5 bg-white rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all group"
          >
            <div className="flex items-start gap-4">
              <span className="text-3xl leading-none">{cat.icon}</span>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-slate-900 group-hover:text-blue-700 transition-colors text-sm leading-snug">
                  {cat.label}
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">{cat.description}</p>
                <span className="inline-block mt-2 text-xs bg-blue-50 text-blue-600 font-medium px-2 py-0.5 rounded-full">
                  {cat.pages.length} pagini
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
