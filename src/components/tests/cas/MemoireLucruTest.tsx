'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { ArrowLeft, Eye, EyeOff, CheckCircle, XCircle, RotateCcw } from 'lucide-react'

type Phase = 'instructaj' | 'series' | 'input' | 'feedback' | 'results'

interface SeriesItem {
  digits: number[]
  letters: string[]
  sequence: (number | string)[]
}

interface TrialResult {
  seriesLength: number
  correct: boolean
  expected: { digits: string; letters: string }
  given: { digits: string; letters: string }
}

interface TestCompletionSummary {
  score: number
  correct: number
  total: number
}

// Series: alternating digit-letter, increasing length
const SERIES: SeriesItem[] = [
  { sequence: [3, 'F', 7], digits: [3, 7], letters: ['F'] },
  { sequence: [2, 'K', 8, 'A'], digits: [2, 8], letters: ['A', 'K'] },
  { sequence: [5, 'R', 1, 'M', 9], digits: [1, 5, 9], letters: ['M', 'R'] },
  { sequence: [4, 'B', 6, 'L', 2, 'P'], digits: [2, 4, 6], letters: ['B', 'L', 'P'] },
  { sequence: [7, 'G', 3, 'D', 9, 'N', 1], digits: [1, 3, 7, 9], letters: ['D', 'G', 'N'] },
  { sequence: [8, 'T', 5, 'C', 2, 'H', 4, 'E'], digits: [2, 4, 5, 8], letters: ['C', 'E', 'H', 'T'] },
  { sequence: [6, 'V', 3, 'S', 9, 'A', 1, 'W', 7], digits: [1, 3, 6, 7, 9], letters: ['A', 'S', 'V', 'W'] },
  { sequence: [9, 'M', 2, 'Q', 6, 'B', 4, 'Z'], digits: [2, 4, 6, 9], letters: ['B', 'M', 'Q', 'Z'] },
  { sequence: [1, 'L', 8, 'D', 5, 'R', 2, 'F', 7], digits: [1, 2, 5, 7, 8], letters: ['D', 'F', 'L', 'R'] },
  { sequence: [4, 'X', 9, 'C', 1, 'P', 6, 'J', 3, 'H'], digits: [1, 3, 4, 6, 9], letters: ['C', 'H', 'J', 'P', 'X'] },
]

function sortDigitsAsc(arr: number[]): string { return [...arr].sort((a, b) => a - b).join(' ') }
function sortLettersAlpha(arr: string[]): string { return [...arr].sort().join(' ') }

const btnPrimary = 'flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#0f2e49] to-[#12436d] text-white text-sm font-bold border border-cyan-300/20 hover:brightness-110 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-lg'
const btnSecondary = 'flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-white/10 bg-white/8 text-white text-sm font-medium hover:bg-white/[0.04] transition-colors disabled:opacity-40'

export function MemoireLucruTest({
  institutionLabel,
  backHref = '/dashboard/tests',
  onBack,
  onComplete,
  completionLabel = 'Continuă',
  startHref,
  autoStart = false,
}: {
  institutionLabel: string
  backHref?: string
  onBack?: () => void
  onComplete?: (summary: TestCompletionSummary) => void
  completionLabel?: string
  startHref?: string
  autoStart?: boolean
}) {
  const router = useRouter()
  const [phase, setPhase] = useState<Phase>('instructaj')
  const [seriesIndex, setSeriesIndex] = useState(0)
  const [showSeq, setShowSeq] = useState(false)
  const [seqStep, setSeqStep] = useState(0)
  const [digitsInput, setDigitsInput] = useState('')
  const [lettersInput, setLettersInput] = useState('')
  const [results, setResults] = useState<TrialResult[]>([])
  const [lastFeedback, setLastFeedback] = useState<{ correct: boolean; expected: { digits: string; letters: string } } | null>(null)

  const currentSeries = SERIES[seriesIndex]
  const totalSeriesLength = currentSeries?.sequence.length ?? 0

  // Auto-advance through sequence items
  useEffect(() => {
    if (phase !== 'series' || !showSeq) return
    if (seqStep >= totalSeriesLength) {
      const t = setTimeout(() => { setShowSeq(false); setSeqStep(0); setPhase('input') }, 600)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => setSeqStep(s => s + 1), 1200)
    return () => clearTimeout(t)
  }, [phase, showSeq, seqStep, totalSeriesLength])

  function startSeries() {
    setDigitsInput('')
    setLettersInput('')
    setSeqStep(0)
    setShowSeq(true)
    setPhase('series')
  }

  function submitAnswers() {
    const expectedDigits = sortDigitsAsc(currentSeries.digits)
    const expectedLetters = sortLettersAlpha(currentSeries.letters)
    const givenDigits = digitsInput.trim().replace(/,/g, ' ').replace(/\s+/g, ' ')
    const givenLetters = lettersInput.trim().toUpperCase().replace(/,/g, ' ').replace(/\s+/g, ' ')
    const correct = givenDigits === expectedDigits && givenLetters === expectedLetters

    const result: TrialResult = {
      seriesLength: currentSeries.sequence.length,
      correct,
      expected: { digits: expectedDigits, letters: expectedLetters },
      given: { digits: givenDigits, letters: givenLetters },
    }
    setResults(prev => [...prev, result])
    setLastFeedback({ correct, expected: { digits: expectedDigits, letters: expectedLetters } })
    setPhase('feedback')

    if (!correct || seriesIndex >= SERIES.length - 1) {
      setTimeout(() => setPhase('results'), 2200)
    }
  }

  function nextSeries() {
    if (seriesIndex < SERIES.length - 1) {
      setSeriesIndex(i => i + 1)
      setPhase('series')
      startSeries()
    } else {
      setPhase('results')
    }
  }

  const correctCount = results.filter(r => r.correct).length
  const maxLen = results.length > 0 ? Math.max(...results.map(r => r.seriesLength)) : 0
  const summary: TestCompletionSummary = {
    score: Math.round((correctCount / SERIES.length) * 100),
    correct: correctCount,
    total: SERIES.length,
  }

  function handleBack() {
    if (onBack) {
      onBack()
      return
    }
    router.push(backHref)
  }

  useEffect(() => {
    if (!autoStart || phase !== 'instructaj') return
    setPhase('series')
    startSeries()
  }, [autoStart, phase])

  // ── INSTRUCTAJ ────────────────────────────────────────────────
  if (phase === 'instructaj') {
    if (autoStart) {
      return (
        <div className="max-w-2xl mx-auto py-16 text-center space-y-4 animate-fade-up">
          <div className="mx-auto w-16 h-16 rounded-3xl border border-cyan-400/20 bg-cyan-400/10 flex items-center justify-center">
            <Eye className="w-7 h-7 text-cyan-300" />
          </div>
          <div>
            <p className="text-[10px] font-bold tracking-[0.22em] uppercase text-cyan-300/70 mb-2">Intrare în probă</p>
            <h1 className="text-2xl font-extrabold tracking-tight text-white">Memorie de Lucru</h1>
            <p className="text-sm text-white/60 mt-2">Pornim seria și trecem în modul de concentrare.</p>
          </div>
        </div>
      )
    }

    return (
      <div className="max-w-2xl mx-auto py-8 space-y-5 animate-fade-up">
        <div className="rounded-[28px] border border-white/10 bg-[linear-gradient(145deg,rgba(15,23,36,0.98),rgba(17,42,63,0.95))] overflow-hidden">
          <div className="px-7 py-6 border-b border-white/8">
            <p className="text-[10px] font-bold tracking-[0.22em] uppercase text-cyan-400/80 mb-1">Instructaj — {institutionLabel}</p>
            <h1 className="text-2xl font-extrabold tracking-tight text-white">Memorie de Lucru</h1>
            <p className="text-sm text-white/50 mt-2">Evaluează capacitatea de a reține și de a manipula simultan cifre și litere în memoria de scurtă durată.</p>
          </div>
          <div className="px-7 py-5 space-y-2 text-sm text-white/60">
            <p>• Vei vedea o serie de cifre și litere afișate una câte una.</p>
            <p>• La final, trebuie să scrii: cifrele în ordine crescătoare + literele în ordine alfabetică.</p>
            <p>• Seriile cresc în lungime (3 → 10 elemente).</p>
            <p>• Nu există limită de timp per item, dar testul se oprește după prima eroare.</p>
          </div>
        </div>

        <div className="rounded-[24px] border border-amber-200/30 bg-amber-500/5 p-5">
          <p className="text-sm font-bold text-amber-400 mb-3">Exemplu:</p>
          <p className="text-sm text-white/65 mb-3">Secvența afișată: <span className="font-mono font-bold text-white">4 — K — 2 — F</span></p>
          <p className="text-sm text-white/65">Răspuns corect:</p>
          <p className="text-sm text-white mt-1">Cifre (crescător): <span className="font-mono font-bold">2 4</span></p>
          <p className="text-sm text-white">Litere (alfabetic): <span className="font-mono font-bold">F K</span></p>
        </div>

        <div className="flex gap-3">
          <button className={btnSecondary} onClick={handleBack}><ArrowLeft className="w-4 h-4" /> Înapoi</button>
          {startHref ? (
            <button className={cn(btnPrimary, 'flex-1')} onClick={() => router.push(startHref)}>Începe testul</button>
          ) : (
            <button className={cn(btnPrimary, 'flex-1')} onClick={() => { setPhase('series'); startSeries() }}>Începe testul</button>
          )}
        </div>
      </div>
    )
  }

  // ── SERIES (showing sequence) ────────────────────────────────
  if (phase === 'series') {
    const currentItem = currentSeries.sequence[seqStep - 1]
    const isDigit = typeof currentItem === 'number'
    return (
      <div className="max-w-lg mx-auto text-center py-16 space-y-10 animate-fade-up">
        <p className="text-xs font-bold uppercase tracking-widest text-white/45">
          Serie {seriesIndex + 1} din {SERIES.length} · {totalSeriesLength} elemente
        </p>
        <div className="flex justify-center gap-2 flex-wrap">
          {currentSeries.sequence.map((_, i) => (
            <div key={i} className={cn(
              'w-8 h-2 rounded-full transition-all duration-300',
              i < seqStep ? 'bg-cyan-500' : 'bg-white/[0.04]'
            )} />
          ))}
        </div>
        {showSeq && seqStep > 0 && seqStep <= totalSeriesLength ? (
          <div className="flex items-center justify-center">
            <div className={cn(
              'w-32 h-32 rounded-3xl flex items-center justify-center text-5xl font-extrabold tracking-tight border-2 animate-fade-up',
              isDigit ? 'bg-blue-500/15 border-blue-400/30 text-blue-400' : 'bg-emerald-500/15 border-emerald-400/30 text-emerald-400'
            )}>
              {currentItem}
            </div>
          </div>
        ) : (
          <div className="w-32 h-32 mx-auto rounded-3xl bg-white/[0.04] border border-white/10" />
        )}
        <p className="text-xs text-white/45">
          {isDigit ? 'Cifră' : seqStep > 0 ? 'Literă' : ''} · {seqStep}/{totalSeriesLength}
        </p>
      </div>
    )
  }

  // ── INPUT ─────────────────────────────────────────────────────
  if (phase === 'input') {
    return (
      <div className="max-w-lg mx-auto text-center py-10 space-y-6 animate-fade-up">
        <div className="rounded-[24px] border border-white/10 bg-white/5 p-7 space-y-5">
          <p className="text-sm font-bold text-white">Introduceți elementele memorate</p>
          <div className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-bold text-blue-400 uppercase tracking-widest mb-2">
                Cifre — ordine crescătoare
              </label>
              <input
                type="text"
                value={digitsInput}
                onChange={e => setDigitsInput(e.target.value)}
                placeholder="ex: 2 4 7"
                className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/8 text-white font-mono text-base focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/20"
                autoFocus
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-emerald-400 uppercase tracking-widest mb-2">
                Litere — ordine alfabetică
              </label>
              <input
                type="text"
                value={lettersInput}
                onChange={e => setLettersInput(e.target.value.toUpperCase())}
                placeholder="ex: F K R"
                className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/8 text-white font-mono text-base focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/20"
              />
            </div>
          </div>
          <button className={cn(btnPrimary, 'w-full mt-2')} onClick={submitAnswers}
            disabled={!digitsInput.trim() || !lettersInput.trim()}>
            Confirmă răspunsul
          </button>
        </div>
      </div>
    )
  }

  // ── FEEDBACK ─────────────────────────────────────────────────
  if (phase === 'feedback' && lastFeedback) {
    return (
      <div className="max-w-lg mx-auto text-center py-12 space-y-5 animate-fade-up">
        <div className={cn('w-20 h-20 rounded-3xl flex items-center justify-center mx-auto',
          lastFeedback.correct ? 'bg-green-500/15 border-2 border-green-400/30' : 'bg-red-500/15 border-2 border-red-400/30'
        )}>
          {lastFeedback.correct
            ? <CheckCircle className="w-9 h-9 text-green-400" />
            : <XCircle className="w-9 h-9 text-red-400" />}
        </div>
        <p className={cn('text-xl font-extrabold', lastFeedback.correct ? 'text-green-500' : 'text-red-500')}>
          {lastFeedback.correct ? 'Corect!' : 'Incorect'}
        </p>
        {!lastFeedback.correct && (
          <div className="text-sm text-white/45 space-y-1">
            <p>Cifre corecte: <span className="font-mono font-bold text-white">{lastFeedback.expected.digits}</span></p>
            <p>Litere corecte: <span className="font-mono font-bold text-white">{lastFeedback.expected.letters}</span></p>
          </div>
        )}
        {lastFeedback.correct && seriesIndex < SERIES.length - 1 && (
          <button className={cn(btnPrimary, 'mx-auto')} onClick={nextSeries}>Seria următoare →</button>
        )}
      </div>
    )
  }

  // ── RESULTS ───────────────────────────────────────────────────
  return (
    <div className="max-w-2xl mx-auto py-8 space-y-5 animate-fade-up">
      <div className="rounded-[28px] border border-white/10 bg-white/5 p-8 text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-white/45 mb-3">Memorie de Lucru — Rezultate</p>
        <p className="text-5xl font-extrabold text-white">{correctCount} / {SERIES.length}</p>
        <p className="text-sm text-white/45 mt-2">
          Lungimea maximă procesată corect: {maxLen} elemente
        </p>
      </div>

      <div className="space-y-3">
        {results.map((r, i) => (
          <div key={i} className={cn(
            'rounded-[18px] border p-4 flex items-center gap-3',
            r.correct ? 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/20'
              : 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/20'
          )}>
            {r.correct ? <CheckCircle className="w-5 h-5 text-green-500 shrink-0" /> : <XCircle className="w-5 h-5 text-red-500 shrink-0" />}
            <div className="flex-1">
              <p className="text-sm font-semibold text-white">
                Serie {i + 1} · {r.seriesLength} elemente
              </p>
              {!r.correct && (
                <p className="text-xs text-white/45 mt-0.5">
                  Corect: cifre {r.expected.digits} · litere {r.expected.letters}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        {onComplete ? (
          <>
            <button className={cn(btnSecondary, 'flex-1')} onClick={handleBack}>Ieși din simulare</button>
            <button className={cn(btnPrimary, 'flex-1')} onClick={() => onComplete(summary)}>
              {completionLabel}
            </button>
          </>
        ) : (
          <>
            <button className={cn(btnSecondary, 'flex-1')} onClick={handleBack}>Toate testele</button>
            <button className={cn(btnPrimary, 'flex-1')} onClick={() => {
              setSeriesIndex(0); setResults([]); setLastFeedback(null); setPhase('instructaj')
            }}>
              <RotateCcw className="w-4 h-4" /> Reia testul
            </button>
          </>
        )}
      </div>
    </div>
  )
}

void Eye; void EyeOff
