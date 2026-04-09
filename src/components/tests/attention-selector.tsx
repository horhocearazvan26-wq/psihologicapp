'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ToulouseTest } from './toulouse/toulouse-test'
import { RavenTest } from './raven/raven-test'
import type { Institution } from '@/types'

type TestType = 'toulouse' | 'raven'

interface AttentionSelectorProps {
  institution: Institution
  institutionLabel: string
  isFullAccess: boolean
}

export function AttentionSelector({ institution, institutionLabel, isFullAccess }: AttentionSelectorProps) {
  const [activeTest, setActiveTest] = useState<TestType | null>(null)

  if (activeTest === 'toulouse') {
    return (
      <div>
        <button
          onClick={() => setActiveTest(null)}
          className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 mb-6 transition-colors"
        >
          ← Înapoi la selecție
        </button>
        <ToulouseTest institution={institution} />
      </div>
    )
  }

  if (activeTest === 'raven') {
    return (
      <div>
        <button
          onClick={() => setActiveTest(null)}
          className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 mb-6 transition-colors"
        >
          ← Înapoi la selecție
        </button>
        <RavenTest institution={institution} />
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Atenție & Concentrare</h1>
        <p className="text-slate-500 mt-1">{institutionLabel} — Alege tipul de test</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Toulouse-Piéron */}
        <Card hover onClick={() => setActiveTest('toulouse')}>
          <CardContent className="space-y-3">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl">👁</div>
            <div>
              <h2 className="font-bold text-slate-800">Toulouse-Piéron</h2>
              <p className="text-sm text-slate-500 mt-1">
                Identifică și marchează simboluri-țintă într-o grilă de {20}×{25} simboluri.
                Testează atenția selectivă și viteza de procesare vizuală.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full">Canvas interactiv</span>
              <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full">10 minute</span>
              <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full">500 simboluri</span>
            </div>
            <Button className="w-full" size="sm">Începe Toulouse-Piéron</Button>
          </CardContent>
        </Card>

        {/* Raven */}
        <Card hover onClick={() => setActiveTest('raven')}>
          <CardContent className="space-y-3">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-2xl">🧩</div>
            <div>
              <h2 className="font-bold text-slate-800">Matrici Raven</h2>
              <p className="text-sm text-slate-500 mt-1">
                Completează matricele 3×3 identificând regula vizuală. Testează
                raționamentul non-verbal și gândirea abstractă.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full">SVG procedural</span>
              <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full">20 matrici</span>
              <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full">Dificultate progresivă</span>
            </div>
            <Button className="w-full" size="sm" variant="outline">Începe Matrici Raven</Button>
          </CardContent>
        </Card>
      </div>

      {!isFullAccess && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-700">
          Ești în modul demo. Testele de atenție sunt disponibile integral — accesul complet deblochează
          și celelalte 5 categorii fără limită.
        </div>
      )}
    </div>
  )
}
