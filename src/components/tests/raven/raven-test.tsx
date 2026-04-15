'use client'

import { useState, useEffect, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { cn, formatTime, getScoreColor } from '@/lib/utils'
import { CellSVG } from './cell-svg'
import { generateMatrices } from './raven-patterns'
import type { Institution } from '@/types'
import { Puzzle, Trophy } from 'lucide-react'
import { IconBadge } from '@/components/ui/icon-badge'

interface RavenTestProps {
  institution: Institution
}

const TOTAL_MATRICES = 20
const TIME_PER_MATRIX = 60 // seconds each
const TOTAL_TIME = TOTAL_MATRICES * TIME_PER_MATRIX

type Phase = 'intro' | 'test' | 'results'

export function RavenTest({ institution }: RavenTestProps) {
  const [phase, setPhase] = useState<Phase>('intro')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedOptions, setSelectedOptions] = useState<Record<number, number>>({})
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME)
  const [results, setResults] = useState<{ score: number; correct: number; total: number } | null>(null)

  const matrices = useMemo(() => generateMatrices(TOTAL_MATRICES), [])

  function finishTest() {
    let correct = 0
    matrices.forEach((m, i) => {
      if (selectedOptions[i] === m.correctIndex) correct++
    })
    const score = Math.round((correct / matrices.length) * 100)
    setResults({ score, correct, total: matrices.length })
    setPhase('results')
  }

  useEffect(() => {
    if (phase !== 'test') return
    const timer = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { clearInterval(timer); finishTest(); return 0 }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [finishTest, phase])

  function startTest() {
    setCurrentIndex(0)
    setSelectedOptions({})
    setTimeLeft(TOTAL_TIME)
    setResults(null)
    setPhase('test')
  }

  function selectOption(optionIndex: number) {
    setSelectedOptions(prev => ({ ...prev, [currentIndex]: optionIndex }))
  }

  const matrix = matrices[currentIndex]
  const timerPercent = (timeLeft / TOTAL_TIME) * 100
  const timerColor = timerPercent > 50 ? 'bg-green-500' : timerPercent > 25 ? 'bg-yellow-500' : 'bg-red-500'
  const answeredCount = Object.keys(selectedOptions).length

  // INTRO
  if (phase === 'intro') {
    return (
      <div className="max-w-lg mx-auto text-center space-y-6 py-12">
        <IconBadge icon={Puzzle} className="mx-auto h-16 w-16 rounded-2xl border-slate-200 bg-slate-100 text-slate-700 shadow-none backdrop-blur-0" iconClassName="h-7 w-7 text-slate-700" />
        <h1 className="text-2xl font-bold text-slate-900">Matrici Raven</h1>
        <p className="text-slate-600 text-sm leading-relaxed">
          Vei vedea o matrice 3×3 cu un element lipsă (marcat cu X). Alege din cele 6 opțiuni
          elementul care completează corect matricea, respectând regula vizuală.
        </p>
        <div className="bg-slate-50 rounded-2xl p-5 text-left space-y-2 text-sm">
          <div className="flex justify-between"><span className="text-slate-500">Matrici:</span><span className="font-semibold">{TOTAL_MATRICES}</span></div>
          <div className="flex justify-between"><span className="text-slate-500">Timp total:</span><span className="font-semibold">{formatTime(TOTAL_TIME)}</span></div>
          <div className="flex justify-between"><span className="text-slate-500">Dificultate:</span><span className="font-semibold">Progresivă</span></div>
          <div className="flex justify-between"><span className="text-slate-500">Tip:</span><span className="font-semibold">Raționament non-verbal</span></div>
        </div>
        <Button size="lg" onClick={startTest} className="w-full">Începe testul</Button>
      </div>
    )
  }

  // RESULTS
  if (phase === 'results' && results) {
    return (
      <div className="max-w-lg mx-auto text-center space-y-6 py-12">
        <IconBadge icon={Trophy} className="mx-auto h-16 w-16 rounded-2xl border-slate-200 bg-slate-100 text-slate-700 shadow-none backdrop-blur-0" iconClassName="h-7 w-7 text-slate-700" />
        <h1 className="text-2xl font-bold text-slate-900">Rezultat Matrici Raven</h1>
        <p className={`text-5xl font-extrabold ${getScoreColor(results.score)}`}>{results.score}%</p>
        <p className="text-slate-500">{results.correct} corecte din {results.total}</p>

        <div className="w-full bg-slate-100 rounded-full h-3">
          <div className={cn('h-3 rounded-full', results.score >= 80 ? 'bg-green-500' : results.score >= 60 ? 'bg-yellow-500' : 'bg-red-500')}
            style={{ width: `${results.score}%` }} />
        </div>

        {/* Per-question review */}
        <div className="text-left space-y-3 max-h-96 overflow-y-auto">
          <h2 className="font-semibold text-slate-800 text-sm">Revizuire:</h2>
          {matrices.map((m, i) => {
            const chosen = selectedOptions[i]
            const correct = chosen === m.correctIndex
            return (
              <div key={i} className={cn('p-3 rounded-xl border text-sm', correct ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50')}>
                <div className="flex items-center gap-2 mb-2">
                  <span>{correct ? '✓' : '✗'}</span>
                  <span className="font-medium">Matricea #{i + 1}</span>
                  <span className="text-xs text-slate-500 ml-auto">{m.rule}</span>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {m.options.map((opt, oi) => (
                    <CellSVG
                      key={oi}
                      cell={opt}
                      size={40}
                      isCorrect={oi === m.correctIndex}
                      isWrong={oi === chosen && !correct}
                    />
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        <div className="flex gap-3">
          <Button variant="outline" className="flex-1" onClick={() => window.history.back()}>Înapoi</Button>
          <Button className="flex-1" onClick={startTest}>Reia testul</Button>
        </div>
      </div>
    )
  }

  // TEST
  return (
    <div className="max-w-2xl mx-auto space-y-6 py-4">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="font-medium text-slate-600">Matricea {currentIndex + 1} din {matrices.length}</span>
          <span className={cn('font-bold tabular-nums', timeLeft < 60 ? 'text-red-600 animate-pulse' : 'text-slate-700')}>
            ⏱ {formatTime(timeLeft)}
          </span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-2">
          <div className="bg-blue-500 h-2 rounded-full transition-all"
            style={{ width: `${((currentIndex + 1) / matrices.length) * 100}%` }} />
        </div>
        <div className="w-full bg-slate-100 rounded-full h-1.5">
          <div className={cn('h-1.5 rounded-full transition-all', timerColor)} style={{ width: `${timerPercent}%` }} />
        </div>
      </div>

      {/* Matrix 3×3 */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <p className="text-xs text-slate-400 mb-4 text-center">Care element completează matricea?</p>
        <div className="inline-grid grid-cols-3 gap-2 mx-auto">
          {matrix.grid.flat().map((cell, i) => (
            <CellSVG key={i} cell={cell} size={90} />
          ))}
        </div>
      </div>

      {/* Options 2×3 */}
      <div>
        <p className="text-sm font-medium text-slate-600 mb-3">Alege răspunsul corect:</p>
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
          {matrix.options.map((opt, i) => {
            const isSelected = selectedOptions[currentIndex] === i
            return (
              <button
                key={i}
                onClick={() => selectOption(i)}
                className={cn(
                  'flex flex-col items-center gap-1 p-2 rounded-xl border-2 transition-all',
                  isSelected ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:border-slate-300'
                )}
              >
                <CellSVG cell={opt} size={70} selected={isSelected} />
                <span className={cn('text-xs font-bold', isSelected ? 'text-blue-700' : 'text-slate-500')}>
                  {String.fromCharCode(65 + i)}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-3">
        <Button variant="outline" disabled={currentIndex === 0} onClick={() => setCurrentIndex(i => i - 1)}>
          ← Anterior
        </Button>
        <div className="flex-1 text-center text-xs text-slate-400">{answeredCount}/{matrices.length} răspunse</div>
        {currentIndex < matrices.length - 1 ? (
          <Button onClick={() => setCurrentIndex(i => i + 1)}>Următor →</Button>
        ) : (
          <Button variant={answeredCount === matrices.length ? 'primary' : 'outline'} onClick={finishTest}>
            Finalizează
          </Button>
        )}
      </div>

      {/* Dot nav */}
      <div className="flex flex-wrap gap-1.5">
        {matrices.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={cn(
              'w-7 h-7 rounded-lg text-xs font-semibold transition-colors',
              i === currentIndex ? 'bg-blue-500 text-white' :
              selectedOptions[i] !== undefined ? 'bg-green-100 text-green-700' :
              'bg-slate-100 text-slate-500 hover:bg-slate-200'
            )}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  )
}
