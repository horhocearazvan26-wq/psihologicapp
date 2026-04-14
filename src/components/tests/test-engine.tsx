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

const btnPrimary = 'interactive-press interactive-glow flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-cyan-300/30 bg-[linear-gradient(135deg,#0f2e49,#12436d)] text-[var(--text-inverse)] text-sm font-semibold shadow-[0_18px_36px_-24px_rgba(15,76,129,0.72)] hover:brightness-110 transition-all disabled:opacity-40 disabled:cursor-not-allowed'
const btnSecondary = 'interactive-press flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] text-[var(--text-primary)] text-sm font-medium hover:bg-[var(--bg-muted)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed'

export function TestEngine({ institution, category, isFullAccess, institutionLabel, categoryLabel }: TestEngineProps) {
  const router = useRouter()
  const [phase, setPhase] = useState<Phase>('intro')
  const [questions, setQuestions] = useState<Question[]>([])
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedOptions, setSelectedOptions] = useState<Record<number, number>>({})
  const [timeLeft, setTimeLeft] = useState(0)
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<{ score: number; correct: number; total: number; results: Result[] } | null>(null)

  const totalTimeForTest = questions.length * TIME_PER_QUESTION

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
  }, [phase, timeLeft, handleSubmit])

  const answeredCount = Object.keys(selectedOptions).length
  const progress = questions.length > 0 ? ((currentIndex + 1) / questions.length) * 100 : 0
  const timerPercent = totalTimeForTest > 0 ? (timeLeft / totalTimeForTest) * 100 : 100

  if (phase === 'intro') {
    return (
      <div className="max-w-3xl mx-auto space-y-6 py-8 animate-fade-up">
        <div className="rounded-[28px] border border-[var(--border)] bg-[linear-gradient(145deg,rgba(15,23,36,0.98),rgba(17,42,63,0.95))] px-6 py-6 text-white shadow-[0_32px_60px_-40px_rgba(15,23,42,0.85)] sm:px-8 sm:py-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-100/80">
                Exam Mode
              </div>
              <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                {categoryLabel}
              </h1>
              <p className="mt-2 text-sm text-slate-300">{institutionLabel}</p>
              <p className="mt-5 max-w-lg text-sm leading-7 text-slate-300">
                Intră într-un flux de lucru curat, concentrat și apropiat de o sesiune reală. Fără distrageri, doar întrebare, timp și ritm.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:min-w-[320px]">
              {[
                { label: 'Întrebări', value: `${isFullAccess ? '30' : '15'} ${!isFullAccess ? 'demo' : ''}` },
                { label: 'Timp / item', value: `${TIME_PER_QUESTION}s` },
                { label: 'Durată totală', value: formatTime((isFullAccess ? 30 : 15) * TIME_PER_QUESTION) },
                { label: 'Ritm', value: 'Ușor -> greu' },
              ].map(({ label, value }) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-white/6 px-4 py-4">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">{label}</p>
                  <p className="mt-2 text-lg font-extrabold text-white">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-[26px] border border-[var(--border)] bg-[var(--bg-surface)] p-6 shadow-sm">
          <div className="grid gap-3 text-left sm:grid-cols-2">
            {[
              'Răspunzi în ritmul tău, dar timpul curge continuu.',
              'Poți naviga între întrebări înainte de finalizare.',
              'După submit primești scor și review complet.',
              'Modul demo rămâne limitat la 15 întrebări.',
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] px-4 py-4 text-sm text-[var(--text-secondary)]">
                {item}
              </div>
            ))}
          </div>
        </div>

        {!isFullAccess && (
          <div className="rounded-2xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30 p-4 text-sm text-amber-700 dark:text-amber-300">
            Ești în modul demo. Deblochează accesul complet din secțiunea Planuri pentru toate întrebările și simulările.
          </div>
        )}

        <div className="flex flex-col gap-3 sm:flex-row">
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

  if (phase === 'results') {
    const score = results?.score ?? 0
    const correct = results?.correct ?? 0
    const total = results?.total ?? questions.length
    const scoreColor = score >= 80 ? 'text-green-600 dark:text-green-400' : score >= 60 ? 'text-amber-600 dark:text-amber-400' : 'text-red-600 dark:text-red-400'
    const scoreBg = score >= 80 ? 'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800' : score >= 60 ? 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800' : 'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800'

    return (
      <div className="max-w-3xl mx-auto space-y-6 py-6 animate-fade-up">
        <div className={cn('rounded-[28px] border p-8 text-center shadow-sm', scoreBg)}>
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-current/15 bg-white/40 dark:bg-white/5 text-3xl">
            {score >= 80 ? 'A' : score >= 60 ? 'B' : 'C'}
          </div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--text-muted)]">Scor final</p>
          <p className={cn('mt-3 text-6xl font-extrabold tracking-tight', scoreColor)}>{score.toFixed(0)}%</p>
          <p className="text-[var(--text-muted)] mt-2 text-sm">{correct} răspunsuri corecte din {total}</p>
        </div>

        <div className="w-full bg-[var(--bg-muted)] rounded-full h-2">
          <div
            className={cn('h-2 rounded-full transition-all duration-700', score >= 80 ? 'bg-green-500' : score >= 60 ? 'bg-amber-500' : 'bg-red-500')}
            style={{ width: `${score}%` }}
          />
        </div>

        {results?.results && (
          <div className="space-y-3">
            <h2 className="font-bold text-[var(--text-primary)] text-base">Revizuire întrebări</h2>
            {results.results.map((r, i) => {
              const q = questions.find(question => question.id === r.question_id)
              if (!q) return null
              const isSkipped = r.selected_option === -1
              return (
                <div
                  key={r.question_id}
                  className={cn(
                    'rounded-[24px] border p-5',
                    r.is_correct
                      ? 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/20'
                      : isSkipped
                        ? 'border-[var(--border)] bg-[var(--bg-muted)]'
                        : 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/20'
                  )}
                >
                  <div className="mb-3 flex items-start gap-3">
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
                    {q.options.map((opt, optionIndex) => (
                      <div
                        key={optionIndex}
                        className={cn(
                          'text-xs px-3 py-1.5 rounded-lg font-medium',
                          optionIndex === r.correct_answer
                            ? 'bg-green-100 dark:bg-green-950/40 text-green-800 dark:text-green-300'
                            : optionIndex === r.selected_option && !r.is_correct
                              ? 'bg-red-100 dark:bg-red-950/40 text-red-800 dark:text-red-300'
                              : 'text-[var(--text-muted)]'
                        )}
                      >
                        {optionIndex === r.correct_answer
                          ? <CheckCircle className="inline w-3 h-3 mr-1" />
                          : optionIndex === r.selected_option && !r.is_correct
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
          <button
            className={cn(btnPrimary, 'flex-1')}
            onClick={() => {
              setPhase('intro')
              setSelectedOptions({})
              setCurrentIndex(0)
              setResults(null)
              setQuestions([])
            }}
          >
            Reia testul
          </button>
        </div>
      </div>
    )
  }

  const currentQ = questions[currentIndex]
  if (!currentQ) return null

  return (
    <div className="max-w-4xl mx-auto space-y-5 py-4">
      <div className="sticky top-4 z-10 rounded-[24px] border border-[var(--border)] bg-[color:rgb(249_250_248_/_0.88)] p-4 shadow-lg backdrop-blur-xl dark:bg-[color:rgb(16_25_36_/_0.88)]">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--text-muted)]">Sesiune activă</p>
            <div className="mt-1 flex items-center gap-3">
              <span className="text-base font-bold text-[var(--text-primary)]">
                Întrebarea {currentIndex + 1} din {questions.length}
              </span>
              <span className="rounded-full border border-[var(--border)] bg-[var(--bg-elevated)] px-3 py-1 text-xs font-medium text-[var(--text-secondary)]">
                {answeredCount}/{questions.length} răspunse
              </span>
            </div>
          </div>
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] px-4 py-3 text-right">
            <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--text-muted)]">Timp rămas</p>
            <span className={cn('mt-1 block font-bold tabular-nums font-mono text-xl', timeLeft < 30 ? 'text-red-500 animate-pulse' : 'text-[var(--text-primary)]')}>
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>
        <div className="mt-4 w-full bg-[var(--bg-muted)] rounded-full h-1.5">
          <div className="h-1.5 rounded-full bg-[linear-gradient(90deg,#12365b,#2d7cae)] transition-all" style={{ width: `${progress}%` }} />
        </div>
        <div className="mt-2 w-full bg-[var(--bg-muted)] rounded-full h-1">
          <div
            className={cn('h-1 rounded-full transition-all', timerPercent > 50 ? 'bg-green-500' : timerPercent > 25 ? 'bg-amber-500' : 'bg-red-500')}
            style={{ width: `${timerPercent}%` }}
          />
        </div>
      </div>

      <div className="rounded-[28px] border border-[var(--border)] bg-[var(--bg-surface)] p-7 shadow-sm space-y-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] text-sm font-bold text-[var(--text-secondary)]">
            {String(currentIndex + 1).padStart(2, '0')}
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">{institutionLabel}</p>
            <p className="text-sm font-medium text-[var(--text-secondary)]">{categoryLabel}</p>
          </div>
        </div>
        <p className="text-lg font-medium text-[var(--text-primary)] leading-relaxed">
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

      <div className="space-y-3">
        {currentQ.options.map((option, i) => {
          const isSelected = selectedOptions[currentIndex] === i
          return (
            <button
              key={i}
              onClick={() => setSelectedOptions(prev => ({ ...prev, [currentIndex]: i }))}
              className={cn(
                'w-full text-left px-5 py-4 rounded-2xl border transition-all duration-150 text-sm font-medium flex items-center gap-4 shadow-sm',
                isSelected
                  ? 'border-cyan-400/40 bg-[linear-gradient(135deg,rgba(15,76,129,0.08),rgba(45,124,174,0.06))] text-[var(--text-primary)]'
                  : 'border-[var(--border)] bg-[var(--bg-surface)] text-[var(--text-primary)] hover:border-[var(--border-strong)] hover:bg-[var(--bg-elevated)]'
              )}
            >
              <span
                className={cn(
                  'inline-flex items-center justify-center w-8 h-8 rounded-xl text-xs font-bold shrink-0 border',
                  isSelected
                    ? 'border-cyan-400/30 bg-[#12365b] text-white'
                    : 'border-[var(--border)] bg-[var(--bg-muted)] text-[var(--text-muted)]'
                )}
              >
                {String.fromCharCode(65 + i)}
              </span>
              {option}
            </button>
          )
        })}
      </div>

      <div className="flex items-center gap-3 pt-1">
        <button
          className={btnSecondary}
          disabled={currentIndex === 0}
          onClick={() => setCurrentIndex(i => i - 1)}
        >
          <ArrowLeft className="w-4 h-4" /> Anterior
        </button>

        <div className="flex-1 text-center text-xs text-[var(--text-muted)] font-medium">
          Navigare liberă între itemi
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

      <div className="rounded-[24px] border border-[var(--border)] bg-[var(--bg-surface)] p-4">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">Hartă întrebări</p>
        <div className="flex flex-wrap gap-1.5">
          {questions.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={cn(
                'w-8 h-8 rounded-xl text-xs font-semibold transition-colors border',
                i === currentIndex
                  ? 'border-cyan-400/30 bg-[#12365b] text-white'
                  : selectedOptions[i] !== undefined
                    ? 'border-green-200 dark:border-green-900 bg-green-100 dark:bg-green-950/40 text-green-700 dark:text-green-400'
                    : 'border-[var(--border)] bg-[var(--bg-muted)] text-[var(--text-muted)] hover:bg-[var(--border-strong)]'
              )}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
