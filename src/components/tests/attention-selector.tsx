'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import type { Institution } from '@/types'
import { Eye, Puzzle } from 'lucide-react'
import { IconBadge } from '@/components/ui/icon-badge'

// Both tests are heavy (~25 KB each). Only one can be active at a time, so
// we load them on-demand the moment the user taps a card — not upfront.
// ssr: false because both rely on canvas/window APIs unavailable on the server.
const ToulouseTest = dynamic(
  () => import('./toulouse/toulouse-test').then(m => ({ default: m.ToulouseTest })),
  { loading: () => <TestLoading />, ssr: false }
)
const RavenTest = dynamic(
  () => import('./raven/raven-test').then(m => ({ default: m.RavenTest })),
  { loading: () => <TestLoading />, ssr: false }
)

function TestLoading() {
  return (
    <div className="max-w-lg mx-auto space-y-4 py-12 animate-pulse">
      <div className="mx-auto h-16 w-16 rounded-2xl bg-slate-200" />
      <div className="h-8 bg-slate-200 rounded-xl mx-auto w-48" />
      <div className="h-32 bg-slate-100 rounded-2xl" />
      <div className="h-12 bg-slate-200 rounded-xl" />
    </div>
  )
}

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
            <IconBadge icon={Eye} className="h-12 w-12 rounded-xl border-blue-200 bg-blue-100 text-blue-700 shadow-none backdrop-blur-0" iconClassName="h-5 w-5 text-blue-700" />
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
            <IconBadge icon={Puzzle} className="h-12 w-12 rounded-xl border-purple-200 bg-purple-100 text-purple-700 shadow-none backdrop-blur-0" iconClassName="h-5 w-5 text-purple-700" />
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
