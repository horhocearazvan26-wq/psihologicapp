'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { cn, formatTime } from '@/lib/utils'
import type { Institution, TestCategory } from '@/types'

interface Question {
  id: string
  question_text: string
  options: string[]
  difficulty: number
  metadata?: { image_url?: string; [key: string]: unknown }
}

interface TestEngineProps {
  institution: Institution
  category: TestCategory
  isFullAccess: boolean
  institutionLabel: string
  categoryLabel: string
}

type Phase = 'intro' | 'test' | 'results'

interface Result {
  question_id: string
  selected_option: number
  correct_answer: number
  is_correct: boolean
  explanation: string
}

const TIME_PER_QUESTION = 45 // seconds

export function TestEngine({ institution, category, isFullAccess, institutionLabel, categoryLabel }: TestEngineProps) {
  const router = useRouter()
  const [phase, setPhase] = useState<Phase>('intro')
  const [questions, setQuestions] = useState<Question[]>([])
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedOptions, setSelectedOptions] = useState<Record<number, number>>({})
  const [timeLeft, setTimeLeft] = useState(0)
  const [totalTime, setTotalTime] = useState(0)
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<{ score: number; correct: number; total: number; results: Result[] } | null>(null)

  const totalTimeForTest = questions.length * TIME_PER_QUESTION

  // Timer countdown
  useEffect(() => {
    if (phase !== 'test' || timeLeft <= 0) return

    const timer = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timer)
          handleSubmit()
          return 0
        }
        return t - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [phase, timeLeft])

  async function startTest() {
    setLoading(true)
    try {
      const res = await fetch('/api/tests/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ institution, category }),
      })
      const data = await res.json()
      if (data.error) throw new Error(data.error)

      setQuestions(data.questions)
      setSessionId(data.session.id)
      const t = data.questions.length * TIME_PER_QUESTION
      setTimeLeft(t)
      setTotalTime(t)
      setPhase('test')
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = useCallback(async () => {
    if (!sessionId || questions.length === 0) return
    setPhase('results')

    const answers = questions.map((q, i) => ({
      question_id: q.id,
      selected_option: selectedOptions[i] ?? -1,
    }))

    const timeSpent = totalTimeForTest - timeLeft

    const res = await fetch('/api/tests/session', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ session_id: sessionId, answers, time_spent_seconds: timeSpent }),
    })
    const data = await res.json()
    setResults(data)
  }, [sessionId, questions, selectedOptions, timeLeft, totalTimeForTest])

  function selectOption(optionIndex: number) {
    setSelectedOptions(prev => ({ ...prev, [currentIndex]: optionIndex }))
  }

  const answeredCount = Object.keys(selectedOptions).length
  const progress = questions.length > 0 ? ((currentIndex + 1) / questions.length) * 100 : 0
  const timerPercent = totalTimeForTest > 0 ? (timeLeft / totalTimeForTest) * 100 : 100
  const timerColor = timerPercent > 50 ? 'bg-green-500' : timerPercent > 25 ? 'bg-yellow-500' : 'bg-red-500'

  // INTRO SCREEN
  if (phase === 'intro') {
    return (
      <div className="max-w-lg mx-auto text-center space-y-6 py-12">
        <div className="text-5xl mb-4">📝</div>
        <h1 className="text-2xl font-bold text-slate-900">
          {categoryLabel} — {institutionLabel}
        </h1>
        <div className="bg-slate-50 rounded-2xl p-6 text-left space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Număr întrebări:</span>
            <span className="font-semibold">{isFullAccess ? '30' : '15'} (demo)</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Timp per întrebare:</span>
            <span className="font-semibold">{TIME_PER_QUESTION} secunde</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Timp total:</span>
            <span className="font-semibold">{formatTime((isFullAccess ? 30 : 15) * TIME_PER_QUESTION)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Dificultate:</span>
            <span className="font-semibold">Mixtă (ușor → dificil)</span>
          </div>
        </div>
        {!isFullAccess && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-700">
            Ești în modul demo. Deblochează accesul complet (30 întrebări) din secțiunea Planuri.
          </div>
        )}
        <div className="flex gap-3">
          <Button variant="outline" className="flex-1" onClick={() => router.back()}>
            Înapoi
          </Button>
          <Button className="flex-1" size="lg" loading={loading} onClick={startTest}>
            Începe testul
          </Button>
        </div>
      </div>
    )
  }

  // RESULTS SCREEN
  if (phase === 'results') {
    const score = results?.score ?? 0
    const correct = results?.correct ?? 0
    const total = results?.total ?? questions.length
    const scoreColor = score >= 80 ? 'text-green-600' : score >= 60 ? 'text-yellow-600' : 'text-red-600'

    return (
      <div className="max-w-2xl mx-auto space-y-6 py-6">
        <div className="text-center space-y-3">
          <div className="text-5xl">{score >= 80 ? '🎉' : score >= 60 ? '👍' : '💪'}</div>
          <h1 className="text-2xl font-bold text-slate-900">Test finalizat!</h1>
          <p className={`text-5xl font-extrabold ${scoreColor}`}>{score.toFixed(0)}%</p>
          <p className="text-slate-500">{correct} răspunsuri corecte din {total}</p>
        </div>

        {/* Score bar */}
        <div className="bg-slate-100 rounded-full h-3">
          <div
            className={cn('h-3 rounded-full transition-all', score >= 80 ? 'bg-green-500' : score >= 60 ? 'bg-yellow-500' : 'bg-red-500')}
            style={{ width: `${score}%` }}
          />
        </div>

        {/* Review */}
        {results?.results && (
          <div className="space-y-3">
            <h2 className="font-semibold text-slate-800">Revizuire întrebări</h2>
            {results.results.map((r, i) => {
              const q = questions.find(q => q.id === r.question_id)
              if (!q) return null
              return (
                <div
                  key={r.question_id}
                  className={cn(
                    'rounded-xl border p-4',
                    r.is_correct ? 'border-green-200 bg-green-50' : r.selected_option === -1 ? 'border-slate-200 bg-slate-50' : 'border-red-200 bg-red-50'
                  )}
                >
                  <div className="flex items-start gap-2 mb-2">
                    <span className="text-sm font-semibold text-slate-500 shrink-0">#{i + 1}</span>
                    <p className="text-sm font-medium text-slate-800">{q.question_text}</p>
                  </div>
                  {q.metadata?.image_url && (
                    <div className="mb-2 ml-5">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={q.metadata.image_url as string}
                        alt="Imagine întrebare"
                        className="max-w-full rounded-lg border border-slate-200 object-contain"
                        style={{ maxHeight: '200px' }}
                      />
                    </div>
                  )}
                  <div className="ml-5 space-y-1">
                    {q.options.map((opt, oi) => (
                      <div
                        key={oi}
                        className={cn(
                          'text-xs px-3 py-1.5 rounded-lg',
                          oi === r.correct_answer ? 'bg-green-200 text-green-800 font-semibold' :
                          oi === r.selected_option && !r.is_correct ? 'bg-red-200 text-red-800' :
                          'text-slate-600'
                        )}
                      >
                        {oi === r.correct_answer ? '✓ ' : oi === r.selected_option && !r.is_correct ? '✗ ' : '  '}
                        {opt}
                      </div>
                    ))}
                  </div>
                  {r.explanation && (
                    <p className="text-xs text-slate-500 mt-2 ml-5 italic">{r.explanation}</p>
                  )}
                </div>
              )
            })}
          </div>
        )}

        <div className="flex gap-3 pt-4">
          <Button variant="outline" className="flex-1" onClick={() => router.push('/dashboard/tests')}>
            Toate testele
          </Button>
          <Button className="flex-1" onClick={() => {
            setPhase('intro')
            setSelectedOptions({})
            setCurrentIndex(0)
            setResults(null)
            setQuestions([])
          }}>
            Reia testul
          </Button>
        </div>
      </div>
    )
  }

  // TEST SCREEN
  const currentQ = questions[currentIndex]
  if (!currentQ) return null

  return (
    <div className="max-w-2xl mx-auto space-y-6 py-4">
      {/* Header: progress + timer */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-slate-600">
            Întrebarea {currentIndex + 1} din {questions.length}
          </span>
          <span className={cn('font-bold tabular-nums', timeLeft < 30 ? 'text-red-600 animate-pulse' : 'text-slate-700')}>
            ⏱ {formatTime(timeLeft)}
          </span>
        </div>
        {/* Question progress */}
        <div className="w-full bg-slate-100 rounded-full h-2">
          <div className="bg-blue-500 h-2 rounded-full transition-all" style={{ width: `${progress}%` }} />
        </div>
        {/* Timer bar */}
        <div className="w-full bg-slate-100 rounded-full h-1.5">
          <div className={cn('h-1.5 rounded-full transition-all', timerColor)} style={{ width: `${timerPercent}%` }} />
        </div>
      </div>

      {/* Question */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
        <p className="text-base font-medium text-slate-900 leading-relaxed">
          {currentQ.question_text}
        </p>
        {currentQ.metadata?.image_url && (
          <div className="flex justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={currentQ.metadata.image_url as string}
              alt="Imagine întrebare"
              className="max-w-full rounded-xl border border-slate-200 object-contain"
              style={{ maxHeight: '360px' }}
            />
          </div>
        )}
      </div>

      {/* Options */}
      <div className="space-y-3">
        {currentQ.options.map((option, i) => {
          const isSelected = selectedOptions[currentIndex] === i
          return (
            <button
              key={i}
              onClick={() => selectOption(i)}
              className={cn(
                'w-full text-left px-5 py-4 rounded-xl border-2 transition-all text-sm font-medium',
                isSelected
                  ? 'border-blue-500 bg-blue-50 text-blue-800'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
              )}
            >
              <span className={cn(
                'inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold mr-3',
                isSelected ? 'bg-blue-500 text-white' : 'bg-slate-100 text-slate-600'
              )}>
                {String.fromCharCode(65 + i)}
              </span>
              {option}
            </button>
          )
        })}
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-3 pt-2">
        <Button
          variant="outline"
          disabled={currentIndex === 0}
          onClick={() => setCurrentIndex(i => i - 1)}
        >
          ← Anterior
        </Button>

        <div className="flex-1 text-center text-xs text-slate-400">
          {answeredCount}/{questions.length} răspunse
        </div>

        {currentIndex < questions.length - 1 ? (
          <Button onClick={() => setCurrentIndex(i => i + 1)}>
            Următor →
          </Button>
        ) : (
          <Button
            variant={answeredCount === questions.length ? 'primary' : 'outline'}
            onClick={handleSubmit}
          >
            Finalizează
          </Button>
        )}
      </div>

      {/* Question dots */}
      <div className="flex flex-wrap gap-1.5 pt-2">
        {questions.map((_, i) => (
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
