'use client'

import { useState, useEffect, useCallback } from 'react'
import { cn, formatTime, CATEGORY_LABELS, CATEGORY_ICONS, getScoreColor } from '@/lib/utils'
import type { Institution, TestCategory } from '@/types'
import { CheckCircle, Clock, ChevronRight, Trophy, ArrowLeft, ArrowRight, Loader2 } from 'lucide-react'

const CATEGORIES: TestCategory[] = ['attention', 'logic', 'memory', 'numerical', 'vocabulary', 'personality']
const TIME_PER_QUESTION = 45
const QUESTIONS_PER_CATEGORY = 30

interface Question {
  id: string
  question_text: string
  options: string[]
  difficulty: number
}

interface CategoryResult {
  category: TestCategory
  score: number
  correct: number
  total: number
}

interface SimulationRunnerProps {
  institution: Institution
  onBack: () => void
}

type Phase = 'category_intro' | 'test' | 'category_result' | 'final_results'

const btnPrimary = 'flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-sm font-bold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-indigo-200 dark:shadow-indigo-950/40'
const btnSecondary = 'flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-[var(--border)] text-[var(--text-primary)] text-sm font-medium hover:bg-[var(--bg-muted)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed'

export function SimulationRunner({ institution, onBack }: SimulationRunnerProps) {
  const [phase, setPhase] = useState<Phase>('category_intro')
  const [categoryIndex, setCategoryIndex] = useState(0)
  const [questions, setQuestions] = useState<Question[]>([])
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedOptions, setSelectedOptions] = useState<Record<number, number>>({})
  const [timeLeft, setTimeLeft] = useState(0)
  const [loading, setLoading] = useState(false)
  const [categoryResults, setCategoryResults] = useState<CategoryResult[]>([])
  const [lastResult, setLastResult] = useState<{ score: number; correct: number; total: number } | null>(null)

  const currentCategory = CATEGORIES[categoryIndex]
  const totalTime = QUESTIONS_PER_CATEGORY * TIME_PER_QUESTION

  useEffect(() => {
    if (phase !== 'test') return
    const timer = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { clearInterval(timer); handleSubmit(); return 0 }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [phase])

  async function startCategory() {
    setLoading(true)
    try {
      const res = await fetch('/api/tests/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ institution, category: currentCategory, is_simulation: true }),
      })
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      setQuestions(data.questions)
      setSessionId(data.session.id)
      setTimeLeft(data.questions.length * TIME_PER_QUESTION)
      setSelectedOptions({})
      setCurrentIndex(0)
      setPhase('test')
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = useCallback(async () => {
    if (!sessionId || questions.length === 0) return
    setPhase('category_result')
    const answers = questions.map((q, i) => ({
      question_id: q.id,
      selected_option: selectedOptions[i] ?? -1,
    }))
    const res = await fetch('/api/tests/session', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ session_id: sessionId, answers, time_spent_seconds: totalTime - timeLeft }),
    })
    const data = await res.json()
    setLastResult({ score: data.score, correct: data.correct, total: data.total })
    setCategoryResults(prev => [...prev, { category: currentCategory, score: data.score, correct: data.correct, total: data.total }])
  }, [sessionId, questions, selectedOptions, timeLeft, currentCategory, totalTime])

  function nextCategory() {
    if (categoryIndex < CATEGORIES.length - 1) {
      setCategoryIndex(i => i + 1)
      setPhase('category_intro')
    } else {
      setPhase('final_results')
    }
  }

  const timerPercent = totalTime > 0 ? (timeLeft / totalTime) * 100 : 100
  const answeredCount = Object.keys(selectedOptions).length

  // CATEGORY INTRO
  if (phase === 'category_intro') {
    return (
      <div className="max-w-lg mx-auto text-center space-y-6 py-8 animate-fade-up">
        {/* Step indicators */}
        <div className="flex items-center gap-2 justify-center">
          {CATEGORIES.map((cat, i) => (
            <div key={cat} className="flex items-center gap-1">
              <div className={cn(
                'w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all',
                i < categoryIndex
                  ? 'border-green-500 bg-green-500 text-white'
                  : i === categoryIndex
                  ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400'
                  : 'border-[var(--border)] bg-[var(--bg-muted)] text-[var(--text-muted)]'
              )}>
                {i < categoryIndex ? <CheckCircle className="w-3.5 h-3.5" /> : i + 1}
              </div>
              {i < CATEGORIES.length - 1 && (
                <div className={cn('w-4 h-0.5 rounded-full', i < categoryIndex ? 'bg-green-400' : 'bg-[var(--border-strong)]')} />
              )}
            </div>
          ))}
        </div>

        <div className="text-4xl">{CATEGORY_ICONS[currentCategory]}</div>
        <div>
          <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-widest mb-1">
            Proba {categoryIndex + 1} din {CATEGORIES.length}
          </p>
          <h2 className="text-2xl font-extrabold text-[var(--text-primary)] tracking-tight">
            {CATEGORY_LABELS[currentCategory]}
          </h2>
        </div>

        <div className="bg-[var(--bg-muted)] rounded-2xl p-5 text-left space-y-2.5 border border-[var(--border)]">
          {[
            { label: 'Întrebări', value: QUESTIONS_PER_CATEGORY.toString() },
            { label: 'Timp', value: formatTime(QUESTIONS_PER_CATEGORY * TIME_PER_QUESTION) },
            { label: 'Instituție', value: institution },
          ].map(({ label, value }) => (
            <div key={label} className="flex justify-between text-sm">
              <span className="text-[var(--text-muted)]">{label}</span>
              <span className="font-semibold text-[var(--text-primary)]">{value}</span>
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          {categoryIndex === 0 && (
            <button className={cn(btnSecondary, 'flex-1')} onClick={onBack}>
              <ArrowLeft className="w-4 h-4" /> Anulează
            </button>
          )}
          <button className={cn(btnPrimary, 'flex-1')} disabled={loading} onClick={startCategory}>
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {categoryIndex === 0 ? 'Pornește simularea' : `Continuă — Proba ${categoryIndex + 2}`}
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    )
  }

  // CATEGORY RESULT
  if (phase === 'category_result' && lastResult) {
    const isLast = categoryIndex === CATEGORIES.length - 1
    const scoreBg = lastResult.score >= 80
      ? 'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800'
      : lastResult.score >= 60
      ? 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800'
      : 'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800'

    return (
      <div className="max-w-lg mx-auto text-center space-y-6 py-8 animate-fade-up">
        <div className="text-4xl">{lastResult.score >= 80 ? '🎉' : lastResult.score >= 60 ? '👍' : '💪'}</div>
        <div className={cn('rounded-2xl border p-6', scoreBg)}>
          <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-widest mb-2">
            Proba {categoryIndex + 1}: {CATEGORY_LABELS[currentCategory]}
          </p>
          <p className={cn('text-6xl font-extrabold tracking-tight', getScoreColor(lastResult.score))}>
            {lastResult.score.toFixed(0)}%
          </p>
          <p className="text-[var(--text-muted)] mt-2 text-sm">{lastResult.correct} corecte din {lastResult.total}</p>
        </div>

        <div className="w-full bg-[var(--bg-muted)] rounded-full h-2">
          <div
            className={cn('h-2 rounded-full transition-all duration-700', lastResult.score >= 80 ? 'bg-green-500' : lastResult.score >= 60 ? 'bg-amber-500' : 'bg-red-500')}
            style={{ width: `${lastResult.score}%` }}
          />
        </div>

        <button className={cn(btnPrimary, 'w-full')} onClick={nextCategory}>
          {isLast ? (
            <><Trophy className="w-5 h-5" /> Vezi rezultatele finale</>
          ) : (
            <>Proba {categoryIndex + 2}: {CATEGORY_LABELS[CATEGORIES[categoryIndex + 1]]} <ChevronRight className="w-4 h-4" /></>
          )}
        </button>
      </div>
    )
  }

  // FINAL RESULTS
  if (phase === 'final_results') {
    const totalScore = categoryResults.reduce((s, r) => s + r.score, 0) / categoryResults.length
    const finalBg = totalScore >= 80
      ? 'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800'
      : totalScore >= 60
      ? 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800'
      : 'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800'

    return (
      <div className="max-w-lg mx-auto space-y-6 py-8 animate-fade-up">
        <div className={cn('rounded-2xl border p-8 text-center', finalBg)}>
          <Trophy className="w-12 h-12 text-amber-500 mx-auto mb-3" />
          <h2 className="text-2xl font-extrabold text-[var(--text-primary)] tracking-tight mb-2">Simulare completă!</h2>
          <p className={cn('text-6xl font-extrabold tracking-tight', getScoreColor(totalScore))}>
            {totalScore.toFixed(0)}%
          </p>
          <p className="text-[var(--text-muted)] mt-2 text-sm">Scor mediu pe toate cele {CATEGORIES.length} probe</p>
        </div>

        <div className="w-full bg-[var(--bg-muted)] rounded-full h-2">
          <div
            className={cn('h-2 rounded-full transition-all duration-700', totalScore >= 80 ? 'bg-green-500' : totalScore >= 60 ? 'bg-amber-500' : 'bg-red-500')}
            style={{ width: `${totalScore}%` }}
          />
        </div>

        <div className="bg-[var(--bg-surface)] rounded-2xl border border-[var(--border)] shadow-sm overflow-hidden">
          {categoryResults.map((r, i) => (
            <div
              key={r.category}
              className={cn('flex items-center gap-3 px-5 py-3.5', i < categoryResults.length - 1 ? 'border-b border-[var(--border)]' : '')}
            >
              <span className="text-xl w-8 text-center shrink-0">{CATEGORY_ICONS[r.category]}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[var(--text-primary)]">{CATEGORY_LABELS[r.category]}</p>
                <p className="text-xs text-[var(--text-muted)]">{r.correct}/{r.total} corecte</p>
              </div>
              <span className={cn('text-sm font-extrabold shrink-0', getScoreColor(r.score))}>
                {r.score.toFixed(0)}%
              </span>
            </div>
          ))}
        </div>

        <button className={cn(btnSecondary, 'w-full')} onClick={onBack}>
          <ArrowLeft className="w-4 h-4" /> Înapoi la Simulare
        </button>
      </div>
    )
  }

  // TEST SCREEN
  const currentQ = questions[currentIndex]
  if (!currentQ) return null
  const progress = questions.length > 0 ? ((currentIndex + 1) / questions.length) * 100 : 0

  return (
    <div className="max-w-2xl mx-auto space-y-5 py-4">
      {/* Simulation header */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400 px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-violet-200 dark:border-violet-800">
          <Clock className="w-3 h-3" />
          Proba {categoryIndex + 1}/{CATEGORIES.length} · {CATEGORY_LABELS[currentCategory]}
        </span>
        <span className={cn('font-bold tabular-nums text-sm font-mono', timeLeft < 30 ? 'text-red-500 animate-pulse' : 'text-[var(--text-primary)]')}>
          ⏱ {formatTime(timeLeft)}
        </span>
      </div>

      <div className="space-y-1.5">
        <div className="flex justify-between text-xs text-[var(--text-muted)]">
          <span>Întrebarea {currentIndex + 1}/{questions.length}</span>
          <span>{answeredCount} răspunse</span>
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

      {/* Question */}
      <div className="bg-[var(--bg-surface)] rounded-2xl border border-[var(--border)] shadow-sm p-6">
        <p className="text-base font-medium text-[var(--text-primary)] leading-relaxed">{currentQ.question_text}</p>
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
                isSelected ? 'bg-indigo-500 text-white' : 'bg-[var(--bg-muted)] text-[var(--text-muted)]'
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
        <button className={btnSecondary} disabled={currentIndex === 0} onClick={() => setCurrentIndex(i => i - 1)}>
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
            Finalizează proba
          </button>
        )}
      </div>

      {/* Dots */}
      <div className="flex flex-wrap gap-1.5">
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
