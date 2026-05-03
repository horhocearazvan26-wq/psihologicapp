'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { cn, formatTime, CATEGORY_LABELS, getScoreColor } from '@/lib/utils'
import type { Institution, TestCategory } from '@/types'
import { CheckCircle, Clock, ChevronRight, Trophy, ArrowLeft, ArrowRight, Loader2, ChevronUp, ChevronDown } from 'lucide-react'
import { CategoryIcon } from '@/components/ui/category-icon'
import { IconBadge } from '@/components/ui/icon-badge'
import { MemoireLucruTest } from '@/components/tests/cas/MemoireLucruTest'
import { InhibitieCognitivaTest } from '@/components/tests/cas/InhibitieCognitivaTest'
import { ComutareAtentieTest } from '@/components/tests/cas/ComutareAtentieTest'

const CATEGORIES: TestCategory[] = [
  'rationament-analitic',
  'transfer-analogic',
  'vocabular',
  'intelegere-texte',
  'rationament-matematic',
  'calcul-matematic',
  'memorie-lucru',
  'inhibitie-cognitiva',
  'comutare-atentie',
]

const INTERACTIVE_CATEGORIES: TestCategory[] = [
  'memorie-lucru',
  'inhibitie-cognitiva',
  'comutare-atentie',
]

const TIME_PER_QUESTION = 45
const QUESTIONS_PER_CATEGORY = 30

const CATEGORY_DETAILS: Record<TestCategory, { duration: string; items: string }> = {
  'rationament-analitic': { duration: formatTime(QUESTIONS_PER_CATEGORY * TIME_PER_QUESTION), items: `${QUESTIONS_PER_CATEGORY} itemi` },
  'transfer-analogic': { duration: formatTime(QUESTIONS_PER_CATEGORY * TIME_PER_QUESTION), items: `${QUESTIONS_PER_CATEGORY} itemi` },
  'vocabular': { duration: formatTime(QUESTIONS_PER_CATEGORY * TIME_PER_QUESTION), items: `${QUESTIONS_PER_CATEGORY} itemi` },
  'intelegere-texte': { duration: formatTime(QUESTIONS_PER_CATEGORY * TIME_PER_QUESTION), items: `${QUESTIONS_PER_CATEGORY} itemi` },
  'rationament-matematic': { duration: formatTime(QUESTIONS_PER_CATEGORY * TIME_PER_QUESTION), items: `${QUESTIONS_PER_CATEGORY} itemi` },
  'calcul-matematic': { duration: formatTime(QUESTIONS_PER_CATEGORY * TIME_PER_QUESTION), items: `${QUESTIONS_PER_CATEGORY} itemi` },
  'memorie-lucru': { duration: 'adaptiv', items: '10 serii' },
  'inhibitie-cognitiva': { duration: 'auto-temporizat', items: '2 liste × 48 stimuli' },
  'comutare-atentie': { duration: 'rapid', items: 'antrenament + 18 planșe' },
}

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

interface InteractiveSummary {
  score: number
  correct: number
  total: number
}

interface SimulationRunnerProps {
  institution: Institution
  backHref?: string
}

type Phase = 'category_intro' | 'test' | 'category_result' | 'final_results'

const btnPrimary = 'flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-sm font-bold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-indigo-200 dark:shadow-indigo-950/40'
const btnSecondary = 'flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-[var(--border)] text-[var(--text-primary)] text-sm font-medium hover:bg-[var(--bg-muted)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed'

export function SimulationRunner({ institution, backHref = '/dashboard/simulate' }: SimulationRunnerProps) {
  const router = useRouter()
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
  const [error, setError] = useState<string | null>(null)
  const [showMap, setShowMap] = useState(false)

  const currentCategory = CATEGORIES[categoryIndex]
  const totalTime = QUESTIONS_PER_CATEGORY * TIME_PER_QUESTION
  const isInteractiveCategory = INTERACTIVE_CATEGORIES.includes(currentCategory)
  const handleSubmitRef = useRef<() => void>(() => {})

  function goBack() {
    router.push(backHref)
  }

  useEffect(() => {
    if (phase !== 'test' || isInteractiveCategory) return
    const timer = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timer)
          handleSubmitRef.current()
          return 0
        }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [phase, isInteractiveCategory])

  async function startCategory() {
    if (isInteractiveCategory) {
      setError(null)
      setPhase('test')
      return
    }

    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/tests/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ institution, category: currentCategory, is_simulation: true }),
      })
      const data = await res.json()
      if (!res.ok || data.error) throw new Error(data.error ?? 'Nu am putut porni simularea.')
      if (!Array.isArray(data.questions) || data.questions.length === 0) {
        throw new Error(`Nu există întrebări disponibile pentru proba ${CATEGORY_LABELS[currentCategory]}.`)
      }

      setQuestions(data.questions)
      setSessionId(data.session.id)
      setTimeLeft(data.questions.length * TIME_PER_QUESTION)
      setSelectedOptions({})
      setCurrentIndex(0)
      setShowMap(false)
      setPhase('test')
    } catch (err) {
      console.error(err)
      setError(err instanceof Error ? err.message : 'A apărut o eroare la pornirea simulării.')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = useCallback(async () => {
    if (!sessionId || questions.length === 0) return

    setPhase('category_result')
    const answers = questions.map((q, index) => ({
      question_id: q.id,
      selected_option: selectedOptions[index] ?? -1,
    }))

    const res = await fetch('/api/tests/session', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        session_id: sessionId,
        answers,
        time_spent_seconds: totalTime - timeLeft,
      }),
    })

    const data = await res.json()
    setLastResult({ score: data.score, correct: data.correct, total: data.total })
    setCategoryResults(prev => [
      ...prev,
      { category: currentCategory, score: data.score, correct: data.correct, total: data.total },
    ])
  }, [sessionId, questions, selectedOptions, totalTime, timeLeft, currentCategory])

  useEffect(() => {
    handleSubmitRef.current = handleSubmit
  }, [handleSubmit])

  function nextCategory() {
    if (categoryIndex < CATEGORIES.length - 1) {
      setCategoryIndex(index => index + 1)
      setPhase('category_intro')
      return
    }
    setPhase('final_results')
  }

  function completeInteractiveCategory(summary: InteractiveSummary) {
    setCategoryResults(prev => [
      ...prev,
      { category: currentCategory, score: summary.score, correct: summary.correct, total: summary.total },
    ])

    if (categoryIndex < CATEGORIES.length - 1) {
      setCategoryIndex(index => index + 1)
      setPhase('category_intro')
      return
    }
    setPhase('final_results')
  }

  const timerPercent = totalTime > 0 ? (timeLeft / totalTime) * 100 : 100
  const answeredCount = Object.keys(selectedOptions).length

  // ── CATEGORY INTRO ────────────────────────────────────────────
  if (phase === 'category_intro') {
    return (
      <div className="max-w-lg mx-auto space-y-6 py-6 animate-fade-up">
        {/* Step indicators — horizontally scrollable on mobile */}
        <div className="overflow-x-auto pb-1 -mx-1 px-1">
          <div className="flex items-center gap-1 min-w-max">
            {CATEGORIES.map((category, index) => (
              <div key={category} className="flex items-center gap-1">
                <div className={cn(
                  'w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all shrink-0',
                  index < categoryIndex
                    ? 'border-green-500 bg-green-500 text-white'
                    : index === categoryIndex
                    ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400'
                    : 'border-[var(--border)] bg-[var(--bg-muted)] text-[var(--text-muted)]'
                )}>
                  {index < categoryIndex ? <CheckCircle className="w-3.5 h-3.5" /> : index + 1}
                </div>
                {index < CATEGORIES.length - 1 && (
                  <div className={cn(
                    'w-4 h-0.5 rounded-full shrink-0',
                    index < categoryIndex ? 'bg-green-400' : 'bg-[var(--border-strong)]'
                  )} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="text-center space-y-4">
          <CategoryIcon
            category={currentCategory}
            className="mx-auto h-16 w-16 rounded-2xl bg-[var(--bg-muted)] text-[var(--text-primary)]"
            iconClassName="h-7 w-7 text-[var(--text-primary)]"
          />
          <div>
            <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-widest mb-1">
              Proba {categoryIndex + 1} din {CATEGORIES.length}
            </p>
            <h2 className="text-2xl font-extrabold text-[var(--text-primary)] tracking-tight">
              {CATEGORY_LABELS[currentCategory]}
            </h2>
          </div>
        </div>

        <div className="bg-[var(--bg-muted)] rounded-2xl p-5 space-y-2.5 border border-[var(--border)]">
          {[
            { label: 'Itemi', value: CATEGORY_DETAILS[currentCategory].items },
            { label: 'Timp', value: CATEGORY_DETAILS[currentCategory].duration },
            { label: 'Instituție', value: institution },
          ].map(({ label, value }) => (
            <div key={label} className="flex justify-between text-sm">
              <span className="text-[var(--text-muted)]">{label}</span>
              <span className="font-semibold text-[var(--text-primary)]">{value}</span>
            </div>
          ))}
        </div>

        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/60 dark:bg-red-950/30 dark:text-red-300">
            {error}
          </div>
        )}

        <div className="flex gap-3">
          {categoryIndex === 0 && (
            <button className={cn(btnSecondary, 'flex-1')} onClick={goBack}>
              <ArrowLeft className="w-4 h-4" /> Anulează
            </button>
          )}
          <button className={cn(btnPrimary, 'flex-1')} disabled={loading} onClick={startCategory}>
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            {categoryIndex === 0 ? 'Pornește simularea' : `Continuă — Proba ${categoryIndex + 2}`}
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    )
  }

  // ── CATEGORY RESULT ────────────────────────────────────────────
  if (phase === 'category_result' && lastResult) {
    const isLast = categoryIndex === CATEGORIES.length - 1
    const scoreBg = lastResult.score >= 80
      ? 'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800'
      : lastResult.score >= 60
      ? 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800'
      : 'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800'

    return (
      <div className="max-w-lg mx-auto text-center space-y-6 py-8 animate-fade-up">
        <IconBadge
          icon={Trophy}
          className="mx-auto h-16 w-16 rounded-2xl bg-[var(--bg-muted)] text-[var(--text-primary)]"
          iconClassName="h-7 w-7 text-[var(--text-primary)]"
        />
        <div className={cn('rounded-2xl border p-6', scoreBg)}>
          <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-widest mb-2">
            Proba {categoryIndex + 1}: {CATEGORY_LABELS[currentCategory]}
          </p>
          <p className={cn('text-6xl font-extrabold tracking-tight', getScoreColor(lastResult.score))}>
            {lastResult.score.toFixed(0)}%
          </p>
          <p className="text-[var(--text-muted)] mt-2 text-sm">
            {lastResult.correct} corecte din {lastResult.total}
          </p>
        </div>

        <div className="w-full bg-[var(--bg-muted)] rounded-full h-2">
          <div
            className={cn(
              'h-2 rounded-full transition-all duration-700',
              lastResult.score >= 80 ? 'bg-green-500' : lastResult.score >= 60 ? 'bg-amber-500' : 'bg-red-500'
            )}
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

  // ── FINAL RESULTS ──────────────────────────────────────────────
  if (phase === 'final_results') {
    const totalScore = categoryResults.reduce((sum, result) => sum + result.score, 0) / categoryResults.length
    const finalBg = totalScore >= 80
      ? 'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800'
      : totalScore >= 60
      ? 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800'
      : 'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800'

    return (
      <div className="max-w-lg mx-auto space-y-6 py-8 animate-fade-up">
        <div className={cn('rounded-2xl border p-8 text-center', finalBg)}>
          <Trophy className="w-12 h-12 text-amber-500 mx-auto mb-3" />
          <h2 className="text-2xl font-extrabold text-[var(--text-primary)] tracking-tight mb-2">
            Simulare completă!
          </h2>
          <p className={cn('text-6xl font-extrabold tracking-tight', getScoreColor(totalScore))}>
            {totalScore.toFixed(0)}%
          </p>
          <p className="text-[var(--text-muted)] mt-2 text-sm">
            Scor mediu pe toate cele {CATEGORIES.length} probe
          </p>
        </div>

        <div className="w-full bg-[var(--bg-muted)] rounded-full h-2">
          <div
            className={cn(
              'h-2 rounded-full transition-all duration-700',
              totalScore >= 80 ? 'bg-green-500' : totalScore >= 60 ? 'bg-amber-500' : 'bg-red-500'
            )}
            style={{ width: `${totalScore}%` }}
          />
        </div>

        <div className="bg-[var(--bg-surface)] rounded-2xl border border-[var(--border)] shadow-sm overflow-hidden">
          {categoryResults.map((result, index) => (
            <div
              key={result.category}
              className={cn(
                'flex items-center gap-3 px-5 py-3.5',
                index < categoryResults.length - 1 ? 'border-b border-[var(--border)]' : ''
              )}
            >
              <CategoryIcon
                category={result.category}
                className="h-8 w-8 rounded-xl bg-[var(--bg-muted)] text-[var(--text-primary)] shrink-0"
                iconClassName="h-4 w-4 text-[var(--text-primary)]"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[var(--text-primary)]">
                  {CATEGORY_LABELS[result.category]}
                </p>
                <p className="text-xs text-[var(--text-muted)]">{result.correct}/{result.total} corecte</p>
              </div>
              <span className={cn('text-sm font-extrabold shrink-0', getScoreColor(result.score))}>
                {result.score.toFixed(0)}%
              </span>
            </div>
          ))}
        </div>

        <button className={cn(btnSecondary, 'w-full')} onClick={goBack}>
          <ArrowLeft className="w-4 h-4" /> Înapoi la Simulare
        </button>
      </div>
    )
  }

  // ── INTERACTIVE TEST ───────────────────────────────────────────
  if (phase === 'test' && isInteractiveCategory) {
    const completionLabel = categoryIndex === CATEGORIES.length - 1
      ? 'Vezi rezultatele finale'
      : `Continuă — Proba ${categoryIndex + 2}`

    if (currentCategory === 'memorie-lucru') {
      return (
        <MemoireLucruTest
          institutionLabel={institution}
          backHref={backHref}
          completionLabel={completionLabel}
          onComplete={completeInteractiveCategory}
        />
      )
    }

    if (currentCategory === 'inhibitie-cognitiva') {
      return (
        <InhibitieCognitivaTest
          institutionLabel={institution}
          backHref={backHref}
          completionLabel={completionLabel}
          onComplete={completeInteractiveCategory}
        />
      )
    }

    return (
      <ComutareAtentieTest
        institutionLabel={institution}
        backHref={backHref}
        completionLabel={completionLabel}
        onComplete={completeInteractiveCategory}
      />
    )
  }

  // ── MCQ TEST ───────────────────────────────────────────────────
  const currentQ = questions[currentIndex]
  if (!currentQ) return null

  const progress = questions.length > 0 ? ((currentIndex + 1) / questions.length) * 100 : 0

  return (
    <>
      <div className="max-w-2xl mx-auto space-y-4 pb-24 md:pb-8">
        {/* Sticky progress header */}
        <div className="sticky top-0 z-20 rounded-[20px] border border-[var(--border)] bg-[color:rgb(10_18_28_/_0.94)] p-3 shadow-lg backdrop-blur-xl md:p-4">
          {/* Mobile: compact */}
          <div className="flex items-center justify-between gap-3 md:hidden">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-[var(--text-muted)]">
                Proba {categoryIndex + 1}/{CATEGORIES.length} · {CATEGORY_LABELS[currentCategory]}
              </p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-sm font-bold text-[var(--text-primary)]">
                  {currentIndex + 1}/{questions.length}
                </span>
                <span className="text-xs text-[var(--text-muted)]">· {answeredCount} răsp.</span>
              </div>
            </div>
            <span className={cn(
              'font-mono font-bold text-xl tabular-nums',
              timeLeft < 30 ? 'text-red-500 animate-pulse' : 'text-[var(--text-primary)]'
            )}>
              {formatTime(timeLeft)}
            </span>
          </div>

          {/* Desktop: full info */}
          <div className="hidden md:flex items-center justify-between gap-4">
            <span className="text-xs font-semibold bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400 px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-violet-200 dark:border-violet-800">
              <Clock className="w-3 h-3" />
              Proba {categoryIndex + 1}/{CATEGORIES.length} · {CATEGORY_LABELS[currentCategory]}
            </span>
            <span className={cn(
              'font-bold tabular-nums text-sm font-mono',
              timeLeft < 30 ? 'text-red-500 animate-pulse' : 'text-[var(--text-primary)]'
            )}>
              ⏱ {formatTime(timeLeft)}
            </span>
          </div>

          <div className="mt-2 space-y-1 md:mt-3">
            <div className="w-full bg-[var(--bg-muted)] rounded-full h-1.5">
              <div className="bg-indigo-500 h-1.5 rounded-full transition-all" style={{ width: `${progress}%` }} />
            </div>
            <div className="w-full bg-[var(--bg-muted)] rounded-full h-0.5">
              <div
                className={cn(
                  'h-0.5 rounded-full transition-all',
                  timerPercent > 50 ? 'bg-green-500' : timerPercent > 25 ? 'bg-amber-500' : 'bg-red-500'
                )}
                style={{ width: `${timerPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Question card */}
        <div className="rounded-[24px] border border-[var(--border)] bg-[var(--bg-surface)] p-5 shadow-sm md:p-6">
          <p className="text-base font-medium text-[var(--text-primary)] leading-relaxed">
            {currentQ.question_text}
          </p>
        </div>

        {/* Answer options — tall touch targets */}
        <div className="space-y-2.5">
          {currentQ.options.map((option, index) => {
            const isSelected = selectedOptions[currentIndex] === index
            return (
              <button
                key={index}
                onClick={() => setSelectedOptions(prev => ({ ...prev, [currentIndex]: index }))}
                className={cn(
                  'w-full text-left px-4 py-4 rounded-xl border-2 transition-all duration-150 text-sm font-medium flex items-center gap-3 min-h-[58px] md:px-5',
                  isSelected
                    ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-300'
                    : 'border-[var(--border)] bg-[var(--bg-surface)] text-[var(--text-primary)] hover:border-[var(--border-strong)] hover:bg-[var(--bg-muted)]'
                )}
              >
                <span className={cn(
                  'inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold shrink-0',
                  isSelected ? 'bg-indigo-500 text-white' : 'bg-[var(--bg-muted)] text-[var(--text-muted)]'
                )}>
                  {String.fromCharCode(65 + index)}
                </span>
                {option}
              </button>
            )
          })}
        </div>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center gap-3 pt-1">
          <button className={btnSecondary} disabled={currentIndex === 0} onClick={() => setCurrentIndex(index => index - 1)}>
            <ArrowLeft className="w-4 h-4" /> Anterior
          </button>
          <div className="flex-1 text-center text-xs text-[var(--text-muted)] font-medium">
            {answeredCount}/{questions.length} răspunse
          </div>
          {currentIndex < questions.length - 1 ? (
            <button className={btnPrimary} onClick={() => setCurrentIndex(index => index + 1)}>
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

        {/* Desktop question map */}
        <div className="hidden md:block">
          <div className="flex flex-wrap gap-1.5">
            {questions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={cn(
                  'w-7 h-7 rounded-lg text-xs font-semibold transition-colors',
                  index === currentIndex
                    ? 'bg-indigo-500 text-white'
                    : selectedOptions[index] !== undefined
                    ? 'bg-green-100 dark:bg-green-950/40 text-green-700 dark:text-green-400'
                    : 'bg-[var(--bg-muted)] text-[var(--text-muted)] hover:bg-[var(--border-strong)]'
                )}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile fixed bottom navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-30 md:hidden border-t border-white/8 bg-[color:rgb(7_17_29_/_0.97)] backdrop-blur-2xl">
        {/* Collapsible question map */}
        {showMap && (
          <div className="border-b border-white/8 px-4 pt-3 pb-2">
            <div className="flex flex-wrap gap-1.5">
              {questions.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setCurrentIndex(i); setShowMap(false) }}
                  className={cn(
                    'w-8 h-8 rounded-xl text-xs font-semibold transition-colors border',
                    i === currentIndex
                      ? 'border-indigo-400/40 bg-indigo-900/60 text-indigo-300'
                      : selectedOptions[i] !== undefined
                      ? 'border-green-400/40 bg-green-900/30 text-green-400'
                      : 'border-white/10 bg-white/5 text-white/50'
                  )}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Nav bar */}
        <div className="flex items-center gap-2 px-4 py-3 pb-6">
          <button
            disabled={currentIndex === 0}
            onClick={() => setCurrentIndex(i => i - 1)}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/70 disabled:opacity-30 transition-colors hover:bg-white/10 shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <button
            onClick={() => setShowMap(v => !v)}
            className="flex flex-1 items-center justify-center gap-2 h-11 rounded-xl border border-white/10 bg-white/5 text-sm font-medium"
          >
            <span className="font-bold text-white">{currentIndex + 1}</span>
            <span className="text-white/40">/ {questions.length}</span>
            <span className={cn(
              'w-2 h-2 rounded-full ml-0.5 shrink-0',
              selectedOptions[currentIndex] !== undefined ? 'bg-green-400' : 'bg-white/20'
            )} />
            {showMap
              ? <ChevronDown className="w-3.5 h-3.5 text-white/40 ml-0.5" />
              : <ChevronUp className="w-3.5 h-3.5 text-white/40 ml-0.5" />}
          </button>

          {currentIndex < questions.length - 1 ? (
            <button
              onClick={() => setCurrentIndex(i => i + 1)}
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white transition-opacity hover:opacity-90 shrink-0"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="flex h-11 items-center justify-center gap-1 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 text-white text-sm font-bold shrink-0"
            >
              Gata
            </button>
          )}
        </div>
      </div>
    </>
  )
}
