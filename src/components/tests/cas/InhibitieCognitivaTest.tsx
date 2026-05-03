'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { ArrowLeft, RotateCcw, Clock } from 'lucide-react'

type Phase = 'instructaj' | 'lista1' | 'break' | 'lista2' | 'results'
type Color = 'roșu' | 'albastru' | 'verde' | 'galben'

interface StimuliItem {
  word: string
  inkColor: Color
}

interface TestCompletionSummary {
  score: number
  correct: number
  total: number
}

const COLORS: Color[] = ['roșu', 'albastru', 'verde', 'galben']

const COLOR_STYLES: Record<Color, { bg: string; text: string; ring: string }> = {
  roșu:    { bg: 'bg-red-500/10',    text: 'text-red-500',    ring: 'ring-red-400' },
  albastru:{ bg: 'bg-blue-500/10',   text: 'text-blue-500',   ring: 'ring-blue-400' },
  verde:   { bg: 'bg-green-500/10',  text: 'text-green-500',  ring: 'ring-green-400' },
  galben:  { bg: 'bg-yellow-500/10', text: 'text-yellow-500', ring: 'ring-yellow-400' },
}

function buildStimuliList(seedShift: number): StimuliItem[] {
  const allPairs: StimuliItem[] = []

  for (let repeat = 0; repeat < 4; repeat += 1) {
    for (const word of COLORS) {
      for (const inkColor of COLORS) {
        if (word !== inkColor) {
          allPairs.push({
            word: word.toUpperCase(),
            inkColor,
          })
        }
      }
    }
  }

  return allPairs.map((_, index) => allPairs[(index * 7 + seedShift) % allPairs.length])
}

// 48 stimuli per list, all incongruent, order varied between lists.
const LISTA_1: StimuliItem[] = buildStimuliList(5)
const LISTA_2: StimuliItem[] = buildStimuliList(17)

const btnPrimary = 'flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#0f2e49] to-[#12436d] text-white text-sm font-bold border border-cyan-300/20 hover:brightness-110 transition-all shadow-lg disabled:opacity-40'
const btnSecondary = 'flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-white/10 bg-white/8 text-white text-sm font-medium hover:bg-white/[0.04] transition-colors'

export function InhibitieCognitivaTest({
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
  const [listIndex, setListIndex] = useState(0)
  const [currentList, setCurrentList] = useState<StimuliItem[]>([])
  const [errors1, setErrors1] = useState(0)
  const [errors2, setErrors2] = useState(0)
  const [time1, setTime1] = useState(0)
  const [time2, setTime2] = useState(0)
  const startRef = useRef<number>(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const [elapsed, setElapsed] = useState(0)

  function startTimer() {
    startRef.current = Date.now()
    timerRef.current = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startRef.current) / 1000))
    }, 100)
  }

  function stopTimer() {
    if (timerRef.current) clearInterval(timerRef.current)
    return Math.round((Date.now() - startRef.current) / 1000)
  }

  useEffect(() => () => { if (timerRef.current) clearInterval(timerRef.current) }, [])

  function beginList1() {
    setListIndex(0)
    setCurrentList(LISTA_1)
    setErrors1(0)
    setElapsed(0)
    startTimer()
    setPhase('lista1')
  }

  function beginList2() {
    setListIndex(0)
    setCurrentList(LISTA_2)
    setErrors2(0)
    setElapsed(0)
    startTimer()
    setPhase('lista2')
  }

  function handleAnswer(chosen: Color) {
    const item = currentList[listIndex]
    const isCorrect = chosen === item.inkColor
    const isLast = listIndex === currentList.length - 1

    if (phase === 'lista1' && !isCorrect) setErrors1(e => e + 1)
    if (phase === 'lista2' && !isCorrect) setErrors2(e => e + 1)

    if (isLast) {
      const t = stopTimer()
      if (phase === 'lista1') { setTime1(t); setPhase('break') }
      if (phase === 'lista2') { setTime2(t); setPhase('results') }
    } else {
      setListIndex(i => i + 1)
    }
  }

  const ihc = time2 - time1
  const accuracy1 = Math.round((1 - errors1 / LISTA_1.length) * 100)
  const accuracy2 = Math.round((1 - errors2 / LISTA_2.length) * 100)
  const totalCorrect = LISTA_1.length + LISTA_2.length - errors1 - errors2
  const summary: TestCompletionSummary = {
    score: Math.round((accuracy1 + accuracy2) / 2),
    correct: totalCorrect,
    total: LISTA_1.length + LISTA_2.length,
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
    beginList1()
  }, [autoStart, phase])

  if (phase === 'instructaj') {
    if (autoStart) {
      return (
        <div className="max-w-2xl mx-auto py-16 text-center space-y-4 animate-fade-up">
          <div className="mx-auto w-16 h-16 rounded-3xl border border-cyan-400/20 bg-cyan-400/10 flex items-center justify-center">
            <Clock className="w-7 h-7 text-cyan-300" />
          </div>
          <div>
            <p className="text-[10px] font-bold tracking-[0.22em] uppercase text-cyan-300/70 mb-2">Intrare în probă</p>
            <h1 className="text-2xl font-extrabold tracking-tight text-white">Inhibiție Cognitivă</h1>
            <p className="text-sm text-white/60 mt-2">Pornim lista 1 și trecem în modul de execuție.</p>
          </div>
        </div>
      )
    }

    return (
      <div className="max-w-2xl mx-auto py-8 space-y-5 animate-fade-up">
        <div className="rounded-[28px] border border-white/10 bg-[linear-gradient(145deg,rgba(15,23,36,0.98),rgba(17,42,63,0.95))] overflow-hidden">
          <div className="px-7 py-6 border-b border-white/8">
            <p className="text-[10px] font-bold tracking-[0.22em] uppercase text-cyan-400/80 mb-1">Instructaj — {institutionLabel}</p>
            <h1 className="text-2xl font-extrabold tracking-tight text-white">Inhibiție Cognitivă (Stroop)</h1>
            <p className="text-sm text-white/50 mt-2">Evaluează capacitatea de a suprima un răspuns automat și de a răspunde conform unei instrucțiuni alternative.</p>
          </div>
          <div className="px-7 py-5 space-y-2 text-sm text-white/60">
            <p>• Vei vedea cuvinte-culori scrise cu cerneală colorată.</p>
            <p>• <strong className="text-white">Nu citi cuvântul!</strong> Apasă butonul care corespunde CULORII CERNELII.</p>
            <p>• Exemplu: dacă vezi <span className="text-blue-400 font-bold">ROȘU</span> — apasă „Albastru".</p>
            <p>• Lista 1 și Lista 2 conțin câte 48 de stimuli.</p>
            <p>• Scorul de inhibiție (IHC) = Timp Lista 2 − Timp Lista 1.</p>
          </div>
        </div>
        <div className="rounded-[20px] border border-amber-200/30 bg-amber-500/5 p-5 space-y-3">
          <p className="text-sm font-bold text-amber-400">Exemplu practic:</p>
          <div className="inline-block px-6 py-3 rounded-xl bg-white/5 border border-white/10">
            <span className="text-2xl font-extrabold text-blue-500">ROȘU</span>
          </div>
          <p className="text-sm text-white/45">Cuvântul scrie „ROȘU" dar cerneala este <span className="text-blue-400 font-bold">albastră</span> → apasă <span className="font-bold text-white">Albastru</span></p>
        </div>
        <div className="flex gap-3">
          <button className={btnSecondary} onClick={handleBack}><ArrowLeft className="w-4 h-4" /> Înapoi</button>
          {startHref ? (
            <button className={cn(btnPrimary, 'flex-1')} onClick={() => router.push(startHref)}>Începe testul</button>
          ) : (
            <button className={cn(btnPrimary, 'flex-1')} onClick={beginList1}>Începe Lista 1</button>
          )}
        </div>
      </div>
    )
  }

  if (phase === 'break') {
    return (
      <div className="max-w-lg mx-auto text-center py-16 space-y-6 animate-fade-up">
        <div className="rounded-[24px] border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/20 p-8">
          <p className="text-sm font-bold uppercase tracking-widest text-green-500 mb-3">Lista 1 completă</p>
          <p className="text-3xl font-extrabold text-white">{time1}s</p>
          <p className="text-sm text-white/45 mt-1">Acuratețe: {accuracy1}%</p>
        </div>
        <p className="text-sm text-white/45">Odihniți-vă câteva secunde, apoi continuați cu Lista 2.</p>
        <button className={cn(btnPrimary, 'mx-auto px-8')} onClick={beginList2}>Continuă — Lista 2 →</button>
      </div>
    )
  }

  if (phase === 'results') {
    return (
      <div className="max-w-2xl mx-auto py-8 space-y-5 animate-fade-up">
        <div className="rounded-[28px] border border-white/10 bg-white/5 p-8">
          <p className="text-xs font-bold uppercase tracking-widest text-white/45 mb-5 text-center">Inhibiție Cognitivă — Rezultate</p>
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { label: 'Timp Lista 1', val: `${time1}s`, sub: `${accuracy1}% acuratețe` },
              { label: 'Timp Lista 2', val: `${time2}s`, sub: `${accuracy2}% acuratețe` },
              { label: 'IHC', val: `${ihc > 0 ? '+' : ''}${ihc}s`, sub: 'SL2 − SL1' },
            ].map(({ label, val, sub }) => (
              <div key={label} className="rounded-2xl border border-white/10 bg-white/8 p-4">
                <p className="text-[10px] uppercase tracking-widest text-white/45 mb-1">{label}</p>
                <p className="text-2xl font-extrabold text-white">{val}</p>
                <p className="text-xs text-white/45 mt-1">{sub}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-white/45 text-center mt-5 italic">
            IHC mai mic (apropiat de 0) indică inhibiție cognitivă mai bună.
          </p>
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
                setListIndex(0); setErrors1(0); setErrors2(0); setTime1(0); setTime2(0); setElapsed(0); setPhase('instructaj')
              }}>
                <RotateCcw className="w-4 h-4" /> Reia testul
              </button>
            </>
          )}
        </div>
      </div>
    )
  }

  // ── ACTIVE LIST ───────────────────────────────────────────────
  const item = currentList[listIndex]
  const listNum = phase === 'lista1' ? 1 : 2
  const listLen = currentList.length
  const inkStyle = COLOR_STYLES[item.inkColor]

  return (
    <div className="max-w-lg mx-auto py-6 space-y-6 animate-fade-up">
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-widest text-white/45">Lista {listNum} · {listIndex + 1}/{listLen}</span>
        <span className="flex items-center gap-1.5 text-sm font-mono font-bold text-white">
          <Clock className="w-3.5 h-3.5" /> {elapsed}s
        </span>
      </div>
      <div className="w-full bg-white/[0.04] rounded-full h-1.5">
        <div className="h-1.5 rounded-full bg-[linear-gradient(90deg,#0f3060,#2d7cae)] transition-all" style={{ width: `${(listIndex / listLen) * 100}%` }} />
      </div>

      {/* Stimulus */}
      <div className="flex items-center justify-center py-14">
        <span className={cn('text-5xl font-extrabold tracking-wider', inkStyle.text)}>
          {item.word}
        </span>
      </div>

      {/* Color buttons */}
      <div className="grid grid-cols-2 gap-3">
        {COLORS.map(color => {
          const cs = COLOR_STYLES[color]
          return (
            <button key={color} onClick={() => handleAnswer(color)}
              className={cn(
                'py-5 rounded-2xl border-2 font-bold text-lg capitalize transition-all duration-100 hover:scale-105 active:scale-95',
                cs.bg, cs.text, `hover:ring-2 hover:${cs.ring}`
              )}>
              {color.charAt(0).toUpperCase() + color.slice(1)}
            </button>
          )
        })}
      </div>

      <p className="text-xs text-center text-white/45 italic">
        Apasă culoarea CERNELII — ignoră ce scrie cuvântul
      </p>
    </div>
  )
}
