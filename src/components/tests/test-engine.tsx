'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { cn, formatTime } from '@/lib/utils'
import type { Institution, TestCategory } from '@/types'
import { ArrowLeft, ArrowRight, CheckCircle, XCircle, Loader2 } from 'lucide-react'

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

const TIME_PER_QUESTION = 45

const btnPrimary = 'flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--text-primary)] text-[var(--text-inverse)] text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed'
const btnSecondary = 'flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-[var(--border)] text-[var(--text-primary)] text-sm font-medium hover:bg-[var(--bg-muted)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed'

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

  useEffect(() => {
    if (phase !== 'test' || timeLeft <= 0) return
    const timer = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { clearInterval(timer); handleSubmit(); return 0 }
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

  const answeredCount = Object.keys(selectedOptions).length
  const progress = questions.length > 0 ? ((currentIndex + 1) / questions.length) * 100 : 0
  const timerPercent = totalTimeForTest > 0 ? (timeLeft / totalTimeForTest) * 100 : 100

  // INTRO
  if (phase === 'intro') {
    return (
      <div className="max-w-lg mx-auto text-center space-y-6 py-12 animate-fade-up">
        <div className="text-5xl">📝</div>
        <div>
          <h1 className="text-2xl font-extrabold text-[var(--text-primary)] tracking-tight">
            {categoryLabel}
          </h1>
          <p className="text-[var(--text-muted)] text-sm mt-1">{institutionLabel}</p>
        </div>

        <div className="bg-[var(--bg-muted)] rounded-2xl p-6 text-left space-y-3 border border-[var(--border)]">
          {[
            { label: 'Număr întrebări', value: `${isFullAccess ? '30' : '15'} ${!isFullAccess ? '(demo)' : ''}` },
            { label: 'Timp per întrebare', value: `${TIME_PER_QUESTION} secunde` },
            { label: 'Timp total', value: formatTime((isFullAccess ? 30 : 15) * TIME_PER_QUESTION) },
            { label: 'Dificultate', value: 'Mixtă (ușor → dificil)' },
          ].map(({ label, value }) => (
            <div key={label} className="flex justify-between text-sm">
              <span className="text-[var(--text-muted)]">{label}:</span>
              <span className="font-semibold text-[var(--text-primary)]">{value}</span>
            </div>
          ))}
        </div>

        {!isFullAccess && (
          <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl p-4 text-sm text-amber-700 dark:text-amber-300">
            Ești în modul demo. Deblochează accesul complet (30 întrebări) din secțiunea Planuri.
          </div>
        )}

        <div className="flex gap-3">
          <button className={cn(btnSecondary, 'flex-1')} onClick={() => router.back()}>
            <ArrowLeft className="w-4 h-4" /> Înapoi
          </button>
          <button className={cn(btnPrimary, 'flex-1')} disabled={loading} onClick={startTest}>
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            Începe testul <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    )
  }

  // RESULTS
  if (phase === 'results') {
    const score = results?.score ?? 0
    const correct = results?.correct ?? 0
    const total = results?.total ?? questions.length
    const scoreColor = score >= 80 ? 'text-green-600 dark:text-green-400' : score >= 60 ? 'text-amber-600 dark:text-amber-400' : 'text-red-600 dark:text-red-400'
    const scoreBg = score >= 80 ? 'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800' : score >= 60 ? 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800' : 'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800'

    return (
      <div className="max-w-2xl mx-auto space-y-6 py-6 animate-fade-up">
        {/* Score card */}
        <div className={cn('rounded-2xl border p-8 text-center', scoreBg)}>
          <div className="text-4xl mb-3">{score >= 80 ? '🎉' : score >= 60 ? '👍' : '💪'}</div>
          <p className={cn('text-6xl font-extrabold tracking-tight', scoreColor)}>{score.toFixed(0)}%</p>
          <p className="text-[var(--text-muted)] mt-2 text-sm">{correct} răspunsuri corecte din {total}</p>
        </div>

        {/* Score bar */}
        <div className="w-full bg-[var(--bg-muted)] rounded-full h-2">
          <div
            className={cn('h-2 rounded-full transition-all duration-700', score >= 80 ? 'bg-green-500' : score >= 60 ? 'bg-amber-500' : 'bg-red-500')}
            style={{ width: `${score}%` }}
          />
        </div>

        {/* Review */}
        {results?.results && (
          <div className="space-y-3">
            <h2 className="font-bold text-[var(--text-primary)] text-base">Revizuire întrebări</h2>
            {results.results.map((r, i) => {
              const q = questions.find(q => q.id === r.question_id)
              if (!q) return null
              const isSkipped = r.selected_option === -1
              return (
                <div
                  key={r.question_id}
                  className={cn(
                    'rounded-2xl border p-4',
                    r.is_correct
                      ? 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/20'
                      : isSkipped
                      ? 'border-[var(--border)] bg-[var(--bg-muted)]'
                      : 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/20'
                  )}
                >
                  <div className="flex items-start gap-2 mb-2">
                    <span className="text-xs font-bold text-[var(--text-muted)] shrink-0 mt-0.5">#{i + 1}</span>
                    <p className="text-sm font-medium text-[var(--text-primary)]">{q.question_text}</p>
                  </div>
                  {q.metadata?.image_url && (
                    <div className="mb-2 ml-5">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={q.metadata.image_url as string}
                        alt="Imagine întrebare"
                        className="max-w-full rounded-xl border border-[var(--border)] object-contain"
                        style={{ maxHeight: '200px' }}
                      />
                    </div>
                  )}
                  <div className="ml-5 space-y-1">
                    {q.options.map((opt, oi) => (
                      <div
                        key={oi}
                        className={cn(
                          'text-xs px-3 py-1.5 rounded-lg font-medium',
                          oi === r.correct_answer
                            ? 'bg-green-100 dark:bg-green-950/40 text-green-800 dark:text-green-300'
                            : oi === r.selected_option && !r.is_correct
                            ? 'bg-red-100 dark:bg-red-950/40 text-red-800 dark:text-red-300'
                            : 'text-[var(--text-muted)]'
                        )}
                      >
                        {oi === r.correct_answer
                          ? <CheckCircle className="inline w-3 h-3 mr-1" />
                          : oi === r.selected_option && !r.is_correct
                          ? <XCircle className="inline w-3 h-3 mr-1" />
                          : null}
                        {opt}
                      </div>
                    ))}
                  </div>
                  {r.explanation && (
                    <p className="text-xs text-[var(--text-muted)] mt-2 ml-5 italic">{r.explanation}</p>
                  )}
                </div>
              )
            })}
          </div>
        )}

        <div className="flex gap-3 pt-2">
          <button className={cn(btnSecondary, 'flex-1')} onClick={() => router.push('/dashboard/tests')}>
            Toate testele
          </button>
          <button className={cn(btnPrimary, 'flex-1')} onClick={() => {
            setPhase('intro')
            setSelectedOptions({})
            setCurrentIndex(0)
            setResults(null)
            setQuestions([])
          }}>
            Reia testul
          </button>
        </div>
      </div>
    )
  }

  // TEST SCREEN
  const currentQ = questions[currentIndex]
  if (!currentQ) return null

  return (
    <div className="max-w-2xl mx-auto space-y-5 py-4">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-[var(--text-secondary)]">
            Întrebarea {currentIndex + 1} din {questions.length}
          </span>
          <span className={cn('font-bold tabular-nums font-mono', timeLeft < 30 ? 'text-red-500 animate-pulse' : 'text-[var(--text-primary)]')}>
            ⏱ {formatTime(timeLeft)}
          </span>
        </div>
        <div className="w-full bg-[var(--bg-muted)] rounded-full h-1.5">
          <div className="bg-indigo-500 h-1.5 rounded-full transition-all" style={{ width: `${progress}%` }} />
        </div>
        <div className="w-full bg-[var(--bg-muted)] rounded-full h-1">
          <div
            className={cn('h-1 rounded-full transition-all', timerPercent > 50 ? 'bg-green-500' : timerPercent > 25 ? 'bg-amber-500' : 'bg-red-500')}
            style={{ width: `${timerPercent}%` }}
          />
        </div>
      </div>

      {/* Question card */}
      <div className="bg-[var(--bg-surface)] rounded-2xl border border-[var(--border)] shadow-sm p-6 space-y-4">
        <p className="text-base font-medium text-[var(--text-primary)] leading-relaxed">
          {currentQ.question_text}
        </p>
        {currentQ.metadata?.image_url && (
          <div className="flex justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={currentQ.metadata.image_url as string}
              alt="Imagine întrebare"
              className="max-w-full rounded-xl border border-[var(--border)] object-contain"
              style={{ maxHeight: '360px' }}
            />
          </div>
        )}
      </div>

      {/* Options */}
      <div className="space-y-2.5">
        {currentQ.options.map((option, i) => {
          const isSelected = selectedOptions[currentIndex] === i
          return (
            <button
              key={i}
              onClick={() => setSelectedOptions(prev => ({ ...prev, [currentIndex]: i }))}
              className={cn(
                'w-full text-left px-5 py-4 rounded-xl border-2 transition-all duration-150 text-sm font-medium flex items-center gap-3',
                isSelected
                  ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-300'
                  : 'border-[var(--border)] bg-[var(--bg-surface)] text-[var(--text-primary)] hover:border-[var(--border-strong)] hover:bg-[var(--bg-muted)]'
              )}
            >
              <span className={cn(
                'inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold shrink-0',
                isSelected
                  ? 'bg-indigo-500 text-white'
                  : 'bg-[var(--bg-muted)] text-[var(--text-muted)]'
              )}>
                {String.fromCharCode(65 + i)}
              </span>
              {option}
            </button>
          )
        })}
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-3 pt-1">
        <button
          className={btnSecondary}
          disabled={currentIndex === 0}
          onClick={() => setCurrentIndex(i => i - 1)}
        >
          <ArrowLeft className="w-4 h-4" /> Anterior
        </button>

        <div className="flex-1 text-center text-xs text-[var(--text-muted)] font-medium">
          {answeredCount}/{questions.length} răspunse
        </div>

        {currentIndex < questions.length - 1 ? (
          <button className={btnPrimary} onClick={() => setCurrentIndex(i => i + 1)}>
            Următor <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            className={cn(answeredCount === questions.length ? btnPrimary : btnSecondary)}
            onClick={handleSubmit}
          >
            Finalizează
          </button>
        )}
      </div>

      {/* Question dots */}
      <div className="flex flex-wrap gap-1.5 pt-1">
        {questions.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={cn(
              'w-7 h-7 rounded-lg text-xs font-semibold transition-colors',
              i === currentIndex
                ? 'bg-indigo-500 text-white'
                : selectedOptions[i] !== undefined
                ? 'bg-green-100 dark:bg-green-950/40 text-green-700 dark:text-green-400'
                : 'bg-[var(--bg-muted)] text-[var(--text-muted)] hover:bg-[var(--border-strong)]'
            )}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  )
}
