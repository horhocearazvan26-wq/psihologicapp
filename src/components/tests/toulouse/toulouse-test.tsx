'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { formatTime } from '@/lib/utils'
import { ToulouseCanvas } from './toulouse-canvas'
import { pickTargetSymbols, generateGrid, isTarget, type ToulouseSymbol } from './symbols'
import { drawSymbol } from './symbols'
import type { Institution } from '@/types'
import { Eye, Target } from 'lucide-react'
import { IconBadge } from '@/components/ui/icon-badge'

interface ToulouseTestProps {
  institution: Institution
}

const ROWS = 20
const COLS = 25
const TIME_SECONDS = 600 // 10 minutes (realistic)
const CELL_SIZE = 34

type Phase = 'intro' | 'test' | 'results'

export function ToulouseTest({ institution }: ToulouseTestProps) {
  const [phase, setPhase] = useState<Phase>('intro')
  const [targets, setTargets] = useState<ToulouseSymbol[]>([])
  const [grid, setGrid] = useState<ToulouseSymbol[][]>([])
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [timeLeft, setTimeLeft] = useState(TIME_SECONDS)
  const [results, setResults] = useState<{ score: number; hits: number; misses: number; falseAlarms: number; total: number } | null>(null)
  const [loading, setLoading] = useState(false)
  const targetCanvasRef = useRef<HTMLCanvasElement>(null)

  const finishTest = useCallback(async () => {
    setPhase('results')

    if (!grid.length || !targets.length) return

    let hits = 0
    let misses = 0
    let falseAlarms = 0

    for (let r = 0; r < grid.length; r++) {
      for (let c = 0; c < grid[r].length; c++) {
        const sym = grid[r][c]
        const key = `${r}-${c}`
        const isT = isTarget(sym, targets)
        const clicked = selected.has(key)

        if (isT && clicked) hits++
        else if (isT && !clicked) misses++
        else if (!isT && clicked) falseAlarms++
      }
    }

    const totalTargets = hits + misses
    const rawScore = Math.max(0, hits - falseAlarms)
    const score = totalTargets > 0 ? Math.round((rawScore / totalTargets) * 100) : 0

    setResults({ score, hits, misses, falseAlarms, total: totalTargets })
  }, [grid, selected, targets])

  // Draw target symbols preview
  useEffect(() => {
    if (targets.length === 0 || !targetCanvasRef.current) return
    const ctx = targetCanvasRef.current.getContext('2d')
    if (!ctx) return
    ctx.clearRect(0, 0, 160, 50)
    ctx.fillStyle = '#f8fafc'
    ctx.fillRect(0, 0, 160, 50)
    targets.forEach((t, i) => {
      drawSymbol(ctx, t, i * 55 + 5, 5, 40, false, true, false)
    })
  }, [phase, targets])

  // Timer
  useEffect(() => {
    if (phase !== 'test') return
    const timer = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timer)
          finishTest()
          return 0
        }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [finishTest, phase])

  async function startTest() {
    setLoading(true)
    const t = pickTargetSymbols()
    const g = generateGrid(ROWS, COLS, t)
    setTargets(t)
    setGrid(g)
    setSelected(new Set())
    setTimeLeft(TIME_SECONDS)

    // Create session
    try {
      const res = await fetch('/api/tests/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ institution, category: 'attention' }),
      })
      await res.json()
    } catch { /* continue without session */ }

    setLoading(false)
    setPhase('test')
  }

  function toggleCell(key: string) {
    setSelected(prev => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  const timerPercent = (timeLeft / TIME_SECONDS) * 100
  const timerColor = timerPercent > 50 ? 'bg-green-500' : timerPercent > 25 ? 'bg-yellow-500' : 'bg-red-500'

  // INTRO
  if (phase === 'intro') {
    return (
      <div className="max-w-lg mx-auto text-center space-y-6 py-12">
        <IconBadge icon={Eye} className="mx-auto h-16 w-16 rounded-2xl border-slate-200 bg-slate-100 text-slate-700 shadow-none backdrop-blur-0" iconClassName="h-7 w-7 text-slate-700" />
        <h1 className="text-2xl font-bold text-slate-900">Test Toulouse-Piéron</h1>
        <p className="text-slate-600 text-sm leading-relaxed">
          Vei vedea o grilă de simboluri. Două simboluri-țintă vor fi afișate în partea de sus.
          Marchează <strong>toate aparițiile simbolurilor-țintă</strong> din grilă cât mai rapid și precis posibil.
        </p>
        <div className="bg-slate-50 rounded-2xl p-5 text-left space-y-2 text-sm">
          <div className="flex justify-between"><span className="text-slate-500">Grilă:</span><span className="font-semibold">{ROWS} × {COLS} = {ROWS * COLS} simboluri</span></div>
          <div className="flex justify-between"><span className="text-slate-500">Timp:</span><span className="font-semibold">{formatTime(TIME_SECONDS)}</span></div>
          <div className="flex justify-between"><span className="text-slate-500">Scor:</span><span className="font-semibold">Corect − Fals pozitive</span></div>
          <div className="flex justify-between"><span className="text-slate-500">Tip:</span><span className="font-semibold">Atenție selectivă</span></div>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-700">
          Apasă pe celule pentru a le marca. Poți demarca apăsând din nou.
        </div>
        <Button size="lg" loading={loading} onClick={startTest} className="w-full">
          Începe testul
        </Button>
      </div>
    )
  }

  // RESULTS
  if (phase === 'results') {
    const s = results ?? { score: 0, hits: 0, misses: 0, falseAlarms: 0, total: 0 }
    const scoreColor = s.score >= 80 ? 'text-green-600' : s.score >= 60 ? 'text-yellow-600' : 'text-red-600'
    return (
      <div className="max-w-lg mx-auto text-center space-y-6 py-12">
        <IconBadge icon={Target} className="mx-auto h-16 w-16 rounded-2xl border-slate-200 bg-slate-100 text-slate-700 shadow-none backdrop-blur-0" iconClassName="h-7 w-7 text-slate-700" />
        <h1 className="text-2xl font-bold text-slate-900">Rezultat Toulouse-Piéron</h1>
        <p className={`text-5xl font-extrabold ${scoreColor}`}>{s.score}%</p>

        <div className="bg-slate-50 rounded-2xl p-5 text-sm space-y-3">
          <div className="flex justify-between">
            <span className="text-slate-500">Ținte totale</span>
            <span className="font-semibold">{s.total}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500 flex items-center gap-1"><span className="text-green-600">✓</span> Corect marcate</span>
            <span className="font-semibold text-green-700">{s.hits}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500 flex items-center gap-1"><span className="text-red-600">✗</span> Omise</span>
            <span className="font-semibold text-red-700">{s.misses}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500 flex items-center gap-1"><span className="text-orange-500">!</span> Fals pozitive</span>
            <span className="font-semibold text-orange-700">{s.falseAlarms}</span>
          </div>
          <div className="border-t border-slate-200 pt-2 flex justify-between">
            <span className="text-slate-600 font-medium">Scor net (corect − fals poz.)</span>
            <span className="font-bold">{Math.max(0, s.hits - s.falseAlarms)}/{s.total}</span>
          </div>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" className="flex-1" onClick={() => window.history.back()}>
            Înapoi
          </Button>
          <Button className="flex-1" onClick={() => {
            setPhase('intro')
            setResults(null)
            setSelected(new Set())
          }}>
            Reia testul
          </Button>
        </div>
      </div>
    )
  }

  // TEST
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-6 bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
        {/* Target symbols */}
        <div>
          <p className="text-xs text-slate-500 mb-1 font-medium">Simboluri-țintă:</p>
          <canvas ref={targetCanvasRef} width={160} height={50} className="border border-slate-200 rounded-lg" />
        </div>

        <div className="flex-1 space-y-2">
          {/* Timer */}
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-600 font-medium">Timp rămas</span>
            <span className={`font-bold tabular-nums text-lg ${timeLeft < 60 ? 'text-red-600 animate-pulse' : 'text-slate-800'}`}>
              {formatTime(timeLeft)}
            </span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2.5">
            <div className={`${timerColor} h-2.5 rounded-full transition-all`} style={{ width: `${timerPercent}%` }} />
          </div>
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Marcate: <strong className="text-blue-600">{selected.size}</strong></span>
            <span>Grilă: {ROWS}×{COLS}</span>
          </div>
        </div>

        <Button variant="danger" size="sm" onClick={finishTest}>
          Finalizează
        </Button>
      </div>

      {/* Canvas grid */}
      <div className="overflow-auto rounded-xl">
        <ToulouseCanvas
          grid={grid}
          targets={targets}
          selected={selected}
          onToggle={toggleCell}
          cellSize={CELL_SIZE}
        />
      </div>

      <p className="text-xs text-slate-400 text-center">
        Click pe simboluri pentru a le marca/demarca. Caută simbolurile-țintă din header.
      </p>
    </div>
  )
}
