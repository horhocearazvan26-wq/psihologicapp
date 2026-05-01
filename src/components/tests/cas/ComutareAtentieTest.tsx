'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { ArrowLeft, RotateCcw, Clock } from 'lucide-react'

type Phase = 'instructaj' | 'training' | 'test' | 'results'
type BorderColor = 'red' | 'yellow' | 'none'
type SquareFill = 'roșu' | 'albastru' | 'verde' | 'galben' | null

interface Plansa {
  digit: number
  borderColor: BorderColor
  fillColor: SquareFill
  isSolid: boolean
}

interface PlansaResult {
  plansaIndex: number
  response: string
  correct: string
  isCorrect: boolean
  reactionMs: number
}

// Training planșe (3 simple)
const TRAINING: Plansa[] = [
  { digit: 6, borderColor: 'red', fillColor: null, isSolid: false },   // Roșu → Mare/Mic
  { digit: 3, borderColor: 'yellow', fillColor: null, isSolid: false }, // Galben → Par/Impar
  { digit: 0, borderColor: 'none', fillColor: 'verde', isSolid: true }, // Solid → Culoare
]

// Test planșe (10)
const TEST_PLANSE: Plansa[] = [
  { digit: 8, borderColor: 'red', fillColor: null, isSolid: false },    // roșu → Mare (>5)
  { digit: 4, borderColor: 'yellow', fillColor: null, isSolid: false }, // galben → Par
  { digit: 0, borderColor: 'none', fillColor: 'roșu', isSolid: true },  // solid → Roșu
  { digit: 3, borderColor: 'red', fillColor: null, isSolid: false },    // roșu → Mic (<5)
  { digit: 7, borderColor: 'yellow', fillColor: null, isSolid: false }, // galben → Impar
  { digit: 0, borderColor: 'none', fillColor: 'albastru', isSolid: true },// solid → Albastru
  { digit: 9, borderColor: 'red', fillColor: null, isSolid: false },    // roșu → Mare
  { digit: 2, borderColor: 'yellow', fillColor: null, isSolid: false }, // galben → Par
  { digit: 0, borderColor: 'none', fillColor: 'galben', isSolid: true },// solid → Galben
  { digit: 5, borderColor: 'red', fillColor: null, isSolid: false },    // roșu → Mic (=5 → Mic boundary: ≤5 = Mic)
]

function getCorrectResponse(p: Plansa): string {
  if (p.isSolid) return p.fillColor ?? ''
  if (p.borderColor === 'red') return p.digit > 5 ? 'Mare' : 'Mic'
  if (p.borderColor === 'yellow') return p.digit % 2 === 0 ? 'Par' : 'Impar'
  return ''
}

const RED_RESPONSES = ['Mare', 'Mic']
const YELLOW_RESPONSES = ['Par', 'Impar']
const COLOR_RESPONSES = ['roșu', 'albastru', 'verde', 'galben']

function getResponseOptions(p: Plansa): string[] {
  if (p.isSolid) return COLOR_RESPONSES
  if (p.borderColor === 'red') return RED_RESPONSES
  if (p.borderColor === 'yellow') return YELLOW_RESPONSES
  return []
}

const BORDER_STYLES: Record<BorderColor, string> = {
  red: 'border-red-500 border-4',
  yellow: 'border-yellow-400 border-4',
  none: 'border-[var(--border)] border-2',
}

const FILL_COLORS: Record<string, string> = {
  roșu: 'bg-red-500',
  albastru: 'bg-blue-500',
  verde: 'bg-green-500',
  galben: 'bg-yellow-400',
}

const RULE_HINTS: Record<BorderColor | 'solid', string> = {
  red: 'Bordură ROȘIE → spune dacă cifra este MARE (>5) sau MIC (≤5)',
  yellow: 'Bordură GALBENĂ → spune dacă cifra este PAR sau IMPAR',
  none: 'Pătrat plin → spune CULOAREA',
  solid: 'Pătrat plin → spune CULOAREA',
}

const btnPrimary = 'flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#0f2e49] to-[#12436d] text-white text-sm font-bold border border-cyan-300/20 hover:brightness-110 transition-all shadow-lg disabled:opacity-40'
const btnSecondary = 'flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] text-[var(--text-primary)] text-sm font-medium hover:bg-[var(--bg-muted)] transition-colors'

export function ComutareAtentieTest({ institutionLabel }: { institutionLabel: string }) {
  const router = useRouter()
  const [phase, setPhase] = useState<Phase>('instructaj')
  const [plansaIndex, setPlansaIndex] = useState(0)
  const [planse, setPlanse] = useState<Plansa[]>([])
  const [results, setResults] = useState<PlansaResult[]>([])
  const [trainingFeedback, setTrainingFeedback] = useState<{ correct: boolean; msg: string } | null>(null)
  const startRef = useRef<number>(0)
  const [totalMs, setTotalMs] = useState(0)

  function startPhase(phaseName: Phase, list: Plansa[]) {
    setPlansaIndex(0)
    setPlanse(list)
    setResults([])
    setTrainingFeedback(null)
    startRef.current = Date.now()
    setPhase(phaseName)
  }

  function handleResponse(resp: string) {
    const p = planse[plansaIndex]
    const correct = getCorrectResponse(p)
    const isCorrect = resp === correct
    const reactionMs = Date.now() - startRef.current

    if (phase === 'training') {
      setTrainingFeedback({ correct: isCorrect, msg: isCorrect ? 'Corect!' : `Greșit — răspuns corect: ${correct}` })
      setTimeout(() => {
        setTrainingFeedback(null)
        if (plansaIndex < planse.length - 1) {
          setPlansaIndex(i => i + 1)
          startRef.current = Date.now()
        } else {
          setPhase('test')
          startPhase('test', TEST_PLANSE)
        }
      }, 1200)
      return
    }

    const result: PlansaResult = {
      plansaIndex: plansaIndex + 1,
      response: resp,
      correct,
      isCorrect,
      reactionMs,
    }
    const newResults = [...results, result]
    setResults(newResults)

    if (plansaIndex < planse.length - 1) {
      setPlansaIndex(i => i + 1)
      startRef.current = Date.now()
    } else {
      setTotalMs(Date.now() - startRef.current)
      setPhase('results')
    }
  }

  if (phase === 'instructaj') {
    return (
      <div className="max-w-2xl mx-auto py-8 space-y-5 animate-fade-up">
        <div className="rounded-[28px] border border-[var(--border)] bg-[linear-gradient(145deg,rgba(15,23,36,0.98),rgba(17,42,63,0.95))] overflow-hidden">
          <div className="px-7 py-6 border-b border-white/8">
            <p className="text-[10px] font-bold tracking-[0.22em] uppercase text-cyan-400/80 mb-1">Instructaj — {institutionLabel}</p>
            <h1 className="text-2xl font-extrabold tracking-tight text-white">Comutarea Atenției</h1>
            <p className="text-sm text-white/50 mt-2">Evaluează flexibilitatea cognitivă și capacitatea de a comuta rapid între reguli de clasificare.</p>
          </div>
          <div className="px-7 py-5 space-y-3 text-sm">
            <div className="flex items-start gap-3 text-white/70">
              <div className="w-5 h-5 rounded-full border-4 border-red-500 bg-transparent shrink-0 mt-0.5" />
              <p><span className="text-white font-bold">Bordură roșie</span> → răspunde cu <strong className="text-white">Mare</strong> (dacă cifra &gt;5) sau <strong className="text-white">Mic</strong> (dacă ≤5)</p>
            </div>
            <div className="flex items-start gap-3 text-white/70">
              <div className="w-5 h-5 rounded-full border-4 border-yellow-400 bg-transparent shrink-0 mt-0.5" />
              <p><span className="text-white font-bold">Bordură galbenă</span> → răspunde cu <strong className="text-white">Par</strong> sau <strong className="text-white">Impar</strong></p>
            </div>
            <div className="flex items-start gap-3 text-white/70">
              <div className="w-5 h-5 rounded-full bg-blue-500 shrink-0 mt-0.5" />
              <p><span className="text-white font-bold">Pătrat plin (fără cifră)</span> → spune <strong className="text-white">culoarea</strong> pătratului</p>
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <button className={btnSecondary} onClick={() => router.back()}><ArrowLeft className="w-4 h-4" /> Înapoi</button>
          <button className={cn(btnPrimary, 'flex-1')} onClick={() => startPhase('training', TRAINING)}>
            Antrenament (3 planșe) →
          </button>
        </div>
      </div>
    )
  }

  if (phase === 'results') {
    const correct = results.filter(r => r.isCorrect).length
    const avgMs = results.reduce((s, r) => s + r.reactionMs, 0) / results.length

    return (
      <div className="max-w-2xl mx-auto py-8 space-y-5 animate-fade-up">
        <div className="rounded-[28px] border border-[var(--border)] bg-[var(--bg-surface)] p-8 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] mb-3">Comutarea Atenției — Rezultate</p>
          <p className="text-5xl font-extrabold text-[var(--text-primary)]">{correct}/{results.length}</p>
          <p className="text-sm text-[var(--text-muted)] mt-2">Timp mediu de reacție: {avgMs.toFixed(0)} ms</p>
          <div className="w-full bg-[var(--bg-muted)] rounded-full h-2 mt-4">
            <div className="h-2 rounded-full bg-[linear-gradient(90deg,#0f3060,#2d7cae)] transition-all duration-700"
              style={{ width: `${(correct / results.length) * 100}%` }} />
          </div>
        </div>

        <div className="space-y-2">
          {results.map((r, i) => (
            <div key={i} className={cn(
              'rounded-[16px] border p-3 flex items-center gap-3 text-sm',
              r.isCorrect ? 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/15'
                : 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/15'
            )}>
              <span className="font-mono text-xs text-[var(--text-muted)] shrink-0 w-5">#{r.plansaIndex}</span>
              <span className={cn('font-semibold', r.isCorrect ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400')}>
                {r.isCorrect ? '✓' : '✗'}
              </span>
              <span className="flex-1 text-[var(--text-muted)]">
                {r.isCorrect ? r.response : `${r.response} → corect: ${r.correct}`}
              </span>
              <span className="text-xs text-[var(--text-muted)] font-mono">{r.reactionMs}ms</span>
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          <button className={cn(btnSecondary, 'flex-1')} onClick={() => router.push('/dashboard/tests')}>Toate testele</button>
          <button className={cn(btnPrimary, 'flex-1')} onClick={() => { setResults([]); setPhase('instructaj') }}>
            <RotateCcw className="w-4 h-4" /> Reia testul
          </button>
        </div>
      </div>
    )
  }

  // ── ACTIVE PLANȘĂ ─────────────────────────────────────────────
  const p = planse[plansaIndex]
  if (!p) return null
  const options = getResponseOptions(p)
  const ruleHint = p.isSolid ? RULE_HINTS.solid : RULE_HINTS[p.borderColor]
  const isTraining = phase === 'training'

  return (
    <div className="max-w-lg mx-auto py-6 space-y-6 animate-fade-up">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">
          {isTraining ? 'Antrenament' : 'Test'} · Planșa {plansaIndex + 1}/{planse.length}
        </span>
        {!isTraining && (
          <span className="flex items-center gap-1.5 text-sm font-mono font-bold text-[var(--text-primary)]">
            <Clock className="w-3.5 h-3.5" />
          </span>
        )}
      </div>

      <div className="w-full bg-[var(--bg-muted)] rounded-full h-1">
        <div className="h-1 rounded-full bg-[linear-gradient(90deg,#0f3060,#2d7cae)] transition-all"
          style={{ width: `${(plansaIndex / planse.length) * 100}%` }} />
      </div>

      {/* Planșa stimulus */}
      <div className="flex flex-col items-center gap-6 py-8">
        <div className={cn(
          'w-36 h-36 rounded-3xl flex items-center justify-center transition-all',
          BORDER_STYLES[p.isSolid ? 'none' : p.borderColor],
          p.isSolid && p.fillColor ? FILL_COLORS[p.fillColor] : 'bg-[var(--bg-elevated)]'
        )}>
          {!p.isSolid && (
            <span className="text-5xl font-extrabold text-[var(--text-primary)]">{p.digit}</span>
          )}
        </div>
        <p className="text-xs text-[var(--text-muted)] text-center max-w-xs">{ruleHint}</p>
      </div>

      {/* Feedback for training */}
      {isTraining && trainingFeedback && (
        <div className={cn(
          'rounded-2xl border px-4 py-3 text-sm font-bold text-center',
          trainingFeedback.correct
            ? 'border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-400'
            : 'border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400'
        )}>
          {trainingFeedback.msg}
        </div>
      )}

      {/* Response buttons */}
      {!trainingFeedback && (
        <div className={cn('grid gap-3', options.length === 2 ? 'grid-cols-2' : 'grid-cols-2')}>
          {options.map(opt => (
            <button key={opt} onClick={() => handleResponse(opt)}
              className={cn(
                'py-5 rounded-2xl border-2 border-[var(--border)] font-bold text-base capitalize transition-all hover:scale-105 active:scale-95',
                p.isSolid && FILL_COLORS[opt]
                  ? `${FILL_COLORS[opt]} text-white border-transparent`
                  : 'bg-[var(--bg-elevated)] text-[var(--text-primary)] hover:border-cyan-400/30 hover:bg-[var(--bg-muted)]'
              )}>
              {opt.charAt(0).toUpperCase() + opt.slice(1)}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

