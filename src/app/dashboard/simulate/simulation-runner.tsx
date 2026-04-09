'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { cn, formatTime, CATEGORY_LABELS, CATEGORY_ICONS, getScoreColor } from '@/lib/utils'
import type { Institution, TestCategory } from '@/types'
import { CheckCircle, Clock, ChevronRight, Trophy } from 'lucide-react'

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
    setCategoryResults(prev => [...prev, {
      category: currentCategory,
      score: data.score,
      correct: data.correct,
      total: data.total,
    }])
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
  const timerColor = timerPercent > 50 ? 'bg-green-500' : timerPercent > 25 ? 'bg-yellow-500' : 'bg-red-500'
  const answeredCount = Object.keys(selectedOptions).length

  // CATEGORY INTRO
  if (phase === 'category_intro') {
    return (
      <div className="max-w-lg mx-auto text-center space-y-6 py-8">
        {/* Overall progress */}
        <div className="flex items-center gap-2 justify-center mb-4">
          {CATEGORIES.map((cat, i) => (
            <div
              key={cat}
              className={cn(
                'flex items-center gap-1',
                i < categoryIndex ? 'text-green-600' :
                i === categoryIndex ? 'text-blue-600' :
                'text-slate-300'
              )}
            >
              <div className={cn(
                'w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2',
                i < categoryIndex ? 'border-green-500 bg-green-50' :
                i === categoryIndex ? 'border-blue-500 bg-blue-50' :
                'border-slate-200 bg-slate-50 text-slate-400'
              )}>
                {i < categoryIndex ? <CheckCircle className="w-4 h-4" /> : i + 1}
              </div>
              {i < CATEGORIES.length - 1 && (
                <div className={cn('w-4 h-0.5', i < categoryIndex ? 'bg-green-300' : 'bg-slate-200')} />
              )}
            </div>
          ))}
        </div>

        <div className="text-4xl">{CATEGORY_ICONS[currentCategory]}</div>
        <div>
          <p className="text-sm font-medium text-slate-500 mb-1">
            Proba {categoryIndex + 1} din {CATEGORIES.length}
          </p>
          <h2 className="text-2xl font-bold text-slate-900">{CATEGORY_LABELS[currentCategory]}</h2>
        </div>

        <div className="bg-slate-50 rounded-2xl p-5 text-left space-y-2.5 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-500">Întrebări</span>
            <span className="font-semibold">{QUESTIONS_PER_CATEGORY}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Timp</span>
            <span className="font-semibold">{formatTime(QUESTIONS_PER_CATEGORY * TIME_PER_QUESTION)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Instituție</span>
            <span className="font-semibold">{institution}</span>
          </div>
        </div>

        <div className="flex gap-3">
          {categoryIndex === 0 && (
            <Button variant="outline" className="flex-1" onClick={onBack}>
              Anulează
            </Button>
          )}
          <Button className="flex-1" size="lg" loading={loading} onClick={startCategory}>
            {categoryIndex === 0 ? 'Pornește simularea' : 'Continuă cu proba următoare'}
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
    )
  }

  // CATEGORY RESULT
  if (phase === 'category_result' && lastResult) {
    const isLast = categoryIndex === CATEGORIES.length - 1
    return (
      <div className="max-w-lg mx-auto text-center space-y-6 py-8">
        <div className="text-4xl">{lastResult.score >= 80 ? '🎉' : lastResult.score >= 60 ? '👍' : '💪'}</div>
        <div>
          <p className="text-slate-500 text-sm mb-1">Proba {categoryIndex + 1}: {CATEGORY_LABELS[currentCategory]}</p>
          <p className={`text-5xl font-extrabold ${getScoreColor(lastResult.score)}`}>
            {lastResult.score.toFixed(0)}%
          </p>
          <p className="text-slate-500 mt-2">{lastResult.correct} corecte din {lastResult.total}</p>
        </div>

        <div className="w-full bg-slate-100 rounded-full h-3">
          <div
            className={cn('h-3 rounded-full', lastResult.score >= 80 ? 'bg-green-500' : lastResult.score >= 60 ? 'bg-yellow-500' : 'bg-red-500')}
            style={{ width: `${lastResult.score}%` }}
          />
        </div>

        <Button className="w-full" size="lg" onClick={nextCategory}>
          {isLast ? (
            <><Trophy className="w-5 h-5 mr-2" /> Vezi rezultatele finale</>
          ) : (
            <>Proba {categoryIndex + 2}: {CATEGORY_LABELS[CATEGORIES[categoryIndex + 1]]} <ChevronRight className="w-4 h-4 ml-1" /></>
          )}
        </Button>
      </div>
    )
  }

  // FINAL RESULTS
  if (phase === 'final_results') {
    const totalScore = categoryResults.reduce((s, r) => s + r.score, 0) / categoryResults.length
    return (
      <div className="max-w-lg mx-auto space-y-6 py-8">
        <div className="text-center space-y-3">
          <Trophy className="w-12 h-12 text-yellow-500 mx-auto" />
          <h2 className="text-2xl font-bold text-slate-900">Simulare completă!</h2>
          <p className={`text-5xl font-extrabold ${getScoreColor(totalScore)}`}>
            {totalScore.toFixed(0)}%
          </p>
          <p className="text-slate-500">Scor mediu pe toate cele 6 probe</p>
        </div>

        <div className="w-full bg-slate-100 rounded-full h-3">
          <div
            className={cn('h-3 rounded-full', totalScore >= 80 ? 'bg-green-500' : totalScore >= 60 ? 'bg-yellow-500' : 'bg-red-500')}
            style={{ width: `${totalScore}%` }}
          />
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="divide-y divide-slate-50">
              {categoryResults.map((r) => (
                <div key={r.category} className="flex items-center gap-3 px-5 py-3.5">
                  <span className="text-xl w-8 text-center">{CATEGORY_ICONS[r.category]}</span>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-800">{CATEGORY_LABELS[r.category]}</p>
                    <p className="text-xs text-slate-400">{r.correct}/{r.total} corecte</p>
                  </div>
                  <span className={`text-sm font-bold ${getScoreColor(r.score)}`}>
                    {r.score.toFixed(0)}%
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Button className="w-full" onClick={onBack}>
          Înapoi la Simulare
        </Button>
      </div>
    )
  }

  // TEST SCREEN
  const currentQ = questions[currentIndex]
  if (!currentQ) return null

  const progress = questions.length > 0 ? ((currentIndex + 1) / questions.length) * 100 : 0

  return (
    <div className="max-w-2xl mx-auto space-y-5 py-4">
      {/* Simulation badge */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold bg-purple-100 text-purple-700 px-3 py-1 rounded-full flex items-center gap-1">
          <Clock className="w-3 h-3" /> Simulare — Proba {categoryIndex + 1}/{CATEGORIES.length}: {CATEGORY_LABELS[currentCategory]}
        </span>
        <span className={cn('font-bold tabular-nums text-sm', timeLeft < 30 ? 'text-red-600 animate-pulse' : 'text-slate-700')}>
          ⏱ {formatTime(timeLeft)}
        </span>
      </div>

      <div className="space-y-1.5">
        <div className="flex justify-between text-xs text-slate-400">
          <span>Întrebarea {currentIndex + 1}/{questions.length}</span>
          <span>{answeredCount} răspunse</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-2">
          <div className="bg-blue-500 h-2 rounded-full transition-all" style={{ width: `${progress}%` }} />
        </div>
        <div className="w-full bg-slate-100 rounded-full h-1.5">
          <div className={cn('h-1.5 rounded-full transition-all', timerColor)} style={{ width: `${timerPercent}%` }} />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <p className="text-base font-medium text-slate-900 leading-relaxed">{currentQ.question_text}</p>
      </div>

      <div className="space-y-2.5">
        {currentQ.options.map((option, i) => {
          const isSelected = selectedOptions[currentIndex] === i
          return (
            <button
              key={i}
              onClick={() => setSelectedOptions(prev => ({ ...prev, [currentIndex]: i }))}
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

      <div className="flex items-center gap-3 pt-1">
        <Button variant="outline" disabled={currentIndex === 0} onClick={() => { setCurrentIndex(i => i - 1) }}>
          ← Anterior
        </Button>
        <div className="flex-1 text-center text-xs text-slate-400">{answeredCount}/{questions.length} răspunse</div>
        {currentIndex < questions.length - 1 ? (
          <Button onClick={() => { setCurrentIndex(i => i + 1) }}>Următor →</Button>
        ) : (
          <Button variant={answeredCount === questions.length ? 'primary' : 'outline'} onClick={handleSubmit}>
            Finalizează proba
          </Button>
        )}
      </div>

      <div className="flex flex-wrap gap-1.5">
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
