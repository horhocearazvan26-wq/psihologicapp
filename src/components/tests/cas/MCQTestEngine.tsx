'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { cn, formatTime } from '@/lib/utils'
import type { Institution, TestCategory } from '@/types'
import {
  ArrowLeft, ArrowRight, CheckCircle, XCircle,
  Loader2, BookOpen, Clock, Target, AlertCircle, ChevronUp, ChevronDown,
} from 'lucide-react'

interface Question {
  id: string
  question_text: string
  options: string[]
  difficulty: number
  metadata?: {
    passage?: string
    passage_title?: string
    image_url?: string
    [key: string]: unknown
  }
}

interface MCQTestEngineProps {
  institution: Institution
  category: TestCategory
  isFullAccess: boolean
  institutionLabel: string
  categoryLabel: string
  backHref?: string
}

interface Result {
  question_id: string
  selected_option: number
  correct_answer: number
  is_correct: boolean
  explanation: string
}

type Phase = 'instructaj' | 'test' | 'results'

const CATEGORY_INSTRUCTAJ: Record<TestCategory, {
  descriere: string
  instructiuni: string[]
  exemplu?: { enunt: string; optiuni: string[]; corect: number; explicatie: string }
  durata: string
  itemi: string
}> = {
  'rationament-analitic': {
    descriere: 'Evaluează capacitatea de a razona logic pe baza unor premise date și de a extrage concluzii valide, indiferent de conținutul concret al problemei.',
    instructiuni: [
      'Citește cu atenție ambele premise înainte de a alege răspunsul.',
      'Acceptă premisele ca adevărate, chiar dacă par neobișnuite.',
      'Alege DOAR concluzia care rezultă cu necesitate logică din premise.',
      'Evită să te bazezi pe cunoștințele generale — raționează strict din premise.',
    ],
    exemplu: {
      enunt: 'Toți matematicienii sunt logicieni.\nUnii profesori sunt matematicieni.\nCare concluzie este validă?',
      optiuni: ['Toți profesorii sunt logicieni.', 'Unii profesori sunt logicieni.', 'Toți logicienii sunt profesori.', 'Niciun profesor nu este logician.'],
      corect: 1,
      explicatie: 'Unii profesori sunt matematicieni (premisa 2) → deci și logicieni (premisa 1). Nu putem concluziona despre TOȚI profesorii.',
    },
    durata: '7 minute',
    itemi: '12 itemi',
  },
  'transfer-analogic': {
    descriere: 'Măsoară capacitatea de a identifica relații conceptuale între perechi de cuvinte și de a transfera acea relație la o altă pereche.',
    instructiuni: [
      'Analizează relația dintre primul și al doilea cuvânt (A:B).',
      'Aplică exact același tip de relație pentru a găsi cuvântul lipsă (C:?).',
      'Atenție la direcția relației (cauzalitate, parte-întreg, categorie-exemplu, etc.).',
      'Verifică toate variantele înainte de a răspunde.',
    ],
    exemplu: {
      enunt: 'CIOCAN este pentru CUIE ceea ce FOARFECĂ este pentru ___',
      optiuni: ['Metal', 'Tăiat', 'Hârtie', 'Lame'],
      corect: 1,
      explicatie: 'Ciocanul este instrumentul pentru bătut cuie (acțiunea). Foarfeca este instrumentul pentru tăiat.',
    },
    durata: '5 minute',
    itemi: '22 itemi',
  },
  'vocabular': {
    descriere: 'Evaluează bogăția lexicală și capacitatea de a opera cu sensurile și relațiile semantice ale cuvintelor.',
    instructiuni: [
      'Citește cu atenție cerința — poate solicita sinonim, antonim sau definiție.',
      'Elimină variantele evident greșite.',
      'Dacă nu cunoști cuvântul, încearcă să identifici rădăcina sau prefixul.',
      'Alege răspunsul cel mai precis, nu doar aproximativ corect.',
    ],
    exemplu: {
      enunt: 'Care cuvânt este SINONIM cu OBSTINARE?',
      optiuni: ['Renunțare', 'Încăpățânare', 'Ezitare', 'Grăbire'],
      corect: 1,
      explicatie: 'Obstinare = perseverență excesivă, îndărătnicie. Sinonim: încăpățânare.',
    },
    durata: '2 minute',
    itemi: '15 itemi',
  },
  'intelegere-texte': {
    descriere: 'Evaluează capacitatea de a extrage informații explicite, de a face inferențe și de a interpreta mesajul unui text narativ sau expozitiv.',
    instructiuni: [
      'Citește textul integral înainte de a răspunde la întrebări.',
      'Unele întrebări solicită informații explicite — caută în text.',
      'Altele solicită inferențe — ce se poate deduce, fără a fi afirmat direct.',
      'Bazează-te DOAR pe informațiile din text, nu pe cunoștințe anterioare.',
      'Textul rămâne vizibil pe tot parcursul testului.',
    ],
    durata: '12 minute',
    itemi: '22 itemi',
  },
  'rationament-matematic': {
    descriere: 'Evaluează capacitatea de a identifica regula matematică dintr-un șir de numere și de a determina elementele lipsă.',
    instructiuni: [
      'Calculează diferențele sau rapoartele dintre termeni consecutivi.',
      'Identifică tipul regulii: aritmetică (+/−), geometrică (×/÷), pătrate, Fibonacci etc.',
      'Verifică regula pe toți termenii cunoscuți înainte de a aplica.',
      'Fiecare item are exact 2 numere lipsă — alege perechea corectă.',
    ],
    exemplu: {
      enunt: '2, 4, 8, __, 32, __',
      optiuni: ['12 și 64', '16 și 64', '16 și 48', '14 și 62'],
      corect: 1,
      explicatie: 'Regula ×2: 2, 4, 8, 16, 32, 64. Numerele lipsă: 16 și 64.',
    },
    durata: '10 minute',
    itemi: '20 itemi',
  },
  'calcul-matematic': {
    descriere: 'Evaluează viteza și acuratețea calculului aritmetic: operații cu numere întregi, fracții, procente, radicali și puteri.',
    instructiuni: [
      'Respectă ordinea operațiilor: paranteze → puteri/radicali → ×/÷ → +/−.',
      'Lucrează rapid dar verifică fiecare calcul.',
      'Estimează ordinul de mărime pentru a elimina variantele absurde.',
      'Nu folosi calculator — testul măsoară calcul mental și scris.',
    ],
    exemplu: {
      enunt: 'Calculați: 15% din 80 + √49',
      optiuni: ['17', '19', '15', '21'],
      corect: 1,
      explicatie: '15% din 80 = 12; √49 = 7; 12 + 7 = 19.',
    },
    durata: '5 minute',
    itemi: '15 itemi',
  },
  'memorie-lucru': {
    descriere: 'Evaluează capacitatea de a reține și manipula simultan informații alfanumerice în memoria de scurtă durată.',
    instructiuni: [],
    durata: 'Fără limită de timp',
    itemi: '10 serii',
  },
  'inhibitie-cognitiva': {
    descriere: 'Evaluează capacitatea de inhibiție a răspunsului dominant (Testul Stroop).',
    instructiuni: [],
    durata: 'Auto-temporizat',
    itemi: '2 liste × 48 stimuli',
  },
  'comutare-atentie': {
    descriere: 'Evaluează flexibilitatea cognitivă și capacitatea de a comuta între reguli de clasificare.',
    instructiuni: [],
    durata: 'Temporizat per planșă',
    itemi: '21 planșe',
  },
}

const TIME_LIMITS: Partial<Record<TestCategory, number>> = {
  'rationament-analitic':  7 * 60,
  'transfer-analogic':     5 * 60,
  'vocabular':             2 * 60,
  'intelegere-texte':     12 * 60,
  'rationament-matematic': 10 * 60,
  'calcul-matematic':      5 * 60,
}

const btnPrimary = 'interactive-press interactive-glow flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-cyan-300/30 bg-[linear-gradient(135deg,#0f2e49,#12436d)] text-[var(--text-inverse)] text-sm font-semibold shadow-[0_18px_36px_-24px_rgba(15,76,129,0.72)] hover:brightness-110 transition-all disabled:opacity-40 disabled:cursor-not-allowed'
const btnSecondary = 'interactive-press flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] text-[var(--text-primary)] text-sm font-medium hover:bg-[var(--bg-muted)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed'

export function MCQTestEngine({
  institution,
  category,
  isFullAccess,
  institutionLabel,
  categoryLabel,
  backHref = '/dashboard/tests',
}: MCQTestEngineProps) {
  const router = useRouter()
  const [phase, setPhase] = useState<Phase>('instructaj')
  const [questions, setQuestions] = useState<Question[]>([])
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedOptions, setSelectedOptions] = useState<Record<number, number>>({})
  const [timeLeft, setTimeLeft] = useState(0)
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<{ score: number; correct: number; total: number; results: Result[] } | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [showMap, setShowMap] = useState(false)

  const categoryTimeLimit = TIME_LIMITS[category]
  const totalTime = questions.length > 0
    ? (categoryTimeLimit ?? questions.length * 45)
    : (categoryTimeLimit ?? 0)

  async function startTest() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/tests/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ institution, category }),
      })
      const data = await res.json()
      if (!res.ok || data.error) throw new Error(data.error ?? 'Nu am putut porni testul.')
      if (!Array.isArray(data.questions) || data.questions.length === 0) {
        throw new Error(`Nu există încă itemi disponibili pentru proba ${categoryLabel}.`)
      }
      setQuestions(data.questions)
      setSessionId(data.session.id)
      setTimeLeft(categoryTimeLimit ?? data.questions.length * 45)
      setPhase('test')
    } catch (err) {
      console.error(err)
      setError(err instanceof Error ? err.message : 'A apărut o eroare la inițierea testului.')
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
    const timeSpent = totalTime - timeLeft
    const res = await fetch('/api/tests/session', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ session_id: sessionId, answers, time_spent_seconds: timeSpent }),
    })
    const data = await res.json()
    setResults(data)
  }, [sessionId, questions, selectedOptions, timeLeft, totalTime])

  useEffect(() => {
    if (phase !== 'test' || timeLeft <= 0) return
    const timer = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { clearInterval(timer); handleSubmit(); return 0 }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [phase, timeLeft, handleSubmit])

  const info = CATEGORY_INSTRUCTAJ[category]
  const answeredCount = Object.keys(selectedOptions).length
  const progress = questions.length > 0 ? ((currentIndex + 1) / questions.length) * 100 : 0
  const timerPercent = totalTime > 0 ? (timeLeft / totalTime) * 100 : 100

  // ── INSTRUCTAJ ────────────────────────────────────────────────
  if (phase === 'instructaj') {
    return (
      <div className="max-w-3xl mx-auto py-6 space-y-5 animate-fade-up">
        {/* Header card */}
        <div
          className="rounded-[28px] border border-[var(--border)] overflow-hidden"
          style={{ background: 'linear-gradient(145deg,rgba(15,23,36,0.98),rgba(17,42,63,0.95))' }}
        >
          <div className="px-6 py-6 border-b border-white/8 sm:px-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0">
                <BookOpen className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <p className="text-[10px] font-bold tracking-[0.22em] uppercase text-cyan-400/80 mb-1">
                  Instructaj — {institutionLabel}
                </p>
                <h1 className="text-xl font-extrabold tracking-tight text-white sm:text-2xl">{categoryLabel}</h1>
                <p className="text-sm text-white/50 mt-1">{info.descriere}</p>
              </div>
            </div>
          </div>
          <div className="px-6 py-5 grid grid-cols-2 gap-3 sm:px-8 sm:grid-cols-3">
            {[
              { icon: Target, label: 'Itemi', val: info.itemi },
              { icon: Clock, label: 'Timp alocat', val: info.durata },
              { icon: AlertCircle, label: 'Mod acces', val: isFullAccess ? 'Acces complet' : 'Demo — 15 itemi' },
            ].map(({ icon: Icon, label, val }) => (
              <div key={label} className="bg-white/4 rounded-2xl px-4 py-3 border border-white/8">
                <div className="flex items-center gap-1.5 mb-1">
                  <Icon className="w-3 h-3 text-white/40" />
                  <p className="text-[10px] text-white/40 font-semibold uppercase tracking-widest">{label}</p>
                </div>
                <p className="text-sm font-bold text-white">{val}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Instructions */}
        {info.instructiuni.length > 0 && (
          <div className="rounded-[24px] border border-[var(--border)] bg-[var(--bg-surface)] p-6 space-y-3">
            <h2 className="text-sm font-bold text-[var(--text-primary)] uppercase tracking-widest">Instrucțiuni</h2>
            <ul className="space-y-2.5">
              {info.instructiuni.map((instr, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
                  <span className="w-5 h-5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  {instr}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Example */}
        {info.exemplu && (
          <div className="rounded-[24px] border border-amber-200/30 bg-amber-500/5 p-6 space-y-4">
            <h2 className="text-sm font-bold text-amber-400 uppercase tracking-widest">Exemplu</h2>
            <p className="text-sm font-medium text-[var(--text-primary)] leading-relaxed whitespace-pre-line">
              {info.exemplu.enunt}
            </p>
            <div className="space-y-2">
              {info.exemplu.optiuni.map((opt, i) => (
                <div key={i} className={cn(
                  'text-xs px-4 py-2.5 rounded-xl font-medium border',
                  i === info.exemplu!.corect
                    ? 'border-green-400/30 bg-green-500/10 text-green-400'
                    : 'border-[var(--border)] text-[var(--text-muted)]'
                )}>
                  {i === info.exemplu!.corect && <CheckCircle className="inline w-3.5 h-3.5 mr-1.5" />}
                  {String.fromCharCode(65 + i)}. {opt}
                </div>
              ))}
            </div>
            <p className="text-xs text-[var(--text-muted)] italic border-t border-[var(--border)] pt-3">
              {info.exemplu.explicatie}
            </p>
          </div>
        )}

        {!isFullAccess && (
          <div className="rounded-2xl border border-amber-200/40 bg-amber-500/8 px-4 py-3 text-sm text-amber-300">
            Ești în modul demo. Accesul este limitat la 15 itemi. Deblochează accesul complet din secțiunea Planuri.
          </div>
        )}

        {error && (
          <div className="rounded-2xl border border-red-300/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {error}
          </div>
        )}

        <div className="flex gap-3">
          <button className={cn(btnSecondary, 'flex-none')} onClick={() => router.push(backHref)}>
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

  // ── RESULTS ───────────────────────────────────────────────────
  if (phase === 'results') {
    const score = results?.score ?? 0
    const correct = results?.correct ?? 0
    const total = results?.total ?? questions.length
    const scoreColor = score >= 80 ? 'text-green-500' : score >= 60 ? 'text-amber-500' : 'text-red-500'
    const scoreBg = score >= 80
      ? 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/20'
      : score >= 60
      ? 'border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/20'
      : 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/20'

    return (
      <div className="max-w-3xl mx-auto space-y-5 py-6 animate-fade-up">
        <div className={cn('rounded-[28px] border p-8 text-center', scoreBg)}>
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] mb-3">
            Rezultat final — {categoryLabel}
          </p>
          <p className={cn('text-6xl font-extrabold tracking-tight', scoreColor)}>{score.toFixed(0)}%</p>
          <p className="text-[var(--text-muted)] mt-2 text-sm">{correct} răspunsuri corecte din {total}</p>
          <div className="w-full bg-black/10 dark:bg-white/10 rounded-full h-2 mt-4">
            <div
              className={cn('h-2 rounded-full transition-all duration-700', score >= 80 ? 'bg-green-500' : score >= 60 ? 'bg-amber-500' : 'bg-red-500')}
              style={{ width: `${score}%` }}
            />
          </div>
        </div>

        {results?.results && (
          <div className="space-y-3">
            <h2 className="font-bold text-[var(--text-primary)] text-sm uppercase tracking-widest">Revizuire itemi</h2>
            {results.results.map((r, i) => {
              const q = questions.find(q => q.id === r.question_id)
              if (!q) return null
              const isSkipped = r.selected_option === -1
              return (
                <div key={r.question_id} className={cn(
                  'rounded-[20px] border p-5',
                  r.is_correct
                    ? 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/15'
                    : isSkipped
                    ? 'border-[var(--border)] bg-[var(--bg-muted)]'
                    : 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/15'
                )}>
                  <div className="flex items-start gap-3 mb-3">
                    <span className="text-xs font-bold text-[var(--text-muted)] shrink-0 mt-0.5">#{i + 1}</span>
                    <p className="text-sm font-medium text-[var(--text-primary)] whitespace-pre-line">{q.question_text}</p>
                  </div>
                  <div className="ml-5 space-y-1">
                    {q.options.map((opt, oi) => (
                      <div key={oi} className={cn(
                        'text-xs px-3 py-1.5 rounded-lg font-medium flex items-center gap-1.5',
                        oi === r.correct_answer
                          ? 'bg-green-100 dark:bg-green-950/40 text-green-800 dark:text-green-300'
                          : oi === r.selected_option && !r.is_correct
                          ? 'bg-red-100 dark:bg-red-950/40 text-red-800 dark:text-red-300'
                          : 'text-[var(--text-muted)]'
                      )}>
                        {oi === r.correct_answer
                          ? <CheckCircle className="w-3 h-3 shrink-0" />
                          : oi === r.selected_option && !r.is_correct
                          ? <XCircle className="w-3 h-3 shrink-0" />
                          : null}
                        {String.fromCharCode(65 + oi)}. {opt}
                      </div>
                    ))}
                  </div>
                  {r.explanation && (
                    <p className="text-xs text-[var(--text-muted)] mt-2.5 ml-5 italic border-t border-[var(--border)] pt-2">
                      {r.explanation}
                    </p>
                  )}
                </div>
              )
            })}
          </div>
        )}

        <div className="flex gap-3 pt-2">
          <button className={cn(btnSecondary, 'flex-1')} onClick={() => router.push(backHref)}>
            Toate testele
          </button>
          <button
            className={cn(btnPrimary, 'flex-1')}
            onClick={() => {
              setPhase('instructaj')
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

  // ── TEST ──────────────────────────────────────────────────────
  const currentQ = questions[currentIndex]
  if (!currentQ) return null

  const hasPassage = !!currentQ.metadata?.passage

  return (
    <>
      {/* Main content — extra bottom padding on mobile for fixed nav bar */}
      <div className={cn('max-w-4xl mx-auto space-y-4 pb-24 md:pb-8', hasPassage && 'max-w-6xl')}>

        {/* Sticky progress header */}
        <div className="sticky top-0 z-20 rounded-[20px] border border-[var(--border)] bg-[color:rgb(10_18_28_/_0.94)] p-3 shadow-lg backdrop-blur-xl md:p-4">
          {/* Mobile: compact row */}
          <div className="flex items-center justify-between gap-3 md:hidden">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-[var(--text-muted)]">
                {categoryLabel}
              </p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-sm font-bold text-[var(--text-primary)]">
                  Item {currentIndex + 1}/{questions.length}
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

          {/* Desktop: full info row */}
          <div className="hidden md:flex items-center justify-between gap-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">
                {institutionLabel} · {categoryLabel}
              </p>
              <div className="mt-0.5 flex items-center gap-2">
                <span className="text-sm font-bold text-[var(--text-primary)]">
                  Item {currentIndex + 1}/{questions.length}
                </span>
                <span className="text-xs border border-[var(--border)] rounded-full px-2 py-0.5 text-[var(--text-muted)]">
                  {answeredCount} răspuns{answeredCount === 1 ? '' : 'uri'}
                </span>
              </div>
            </div>
            <div className="text-right border border-[var(--border)] rounded-xl px-3 py-2 bg-[var(--bg-elevated)]">
              <p className="text-[9px] uppercase tracking-widest text-[var(--text-muted)]">Timp rămas</p>
              <span className={cn(
                'font-mono font-bold text-lg tabular-nums',
                timeLeft < 30 ? 'text-red-500 animate-pulse' : 'text-[var(--text-primary)]'
              )}>
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>

          {/* Progress bars — always visible */}
          <div className="mt-2 space-y-1 md:mt-3">
            <div className="w-full bg-[var(--bg-muted)] rounded-full h-1.5">
              <div
                className="h-1.5 rounded-full bg-[linear-gradient(90deg,#0f3060,#2d7cae)] transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="w-full bg-[var(--bg-muted)] rounded-full h-0.5">
              <div
                className={cn(
                  'h-0.5 rounded-full transition-all',
                  timerPercent > 50 ? 'bg-green-500' : timerPercent > 20 ? 'bg-amber-500' : 'bg-red-500'
                )}
                style={{ width: `${timerPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Passage + question layout */}
        <div className={cn(hasPassage && 'grid grid-cols-1 gap-4 lg:grid-cols-2')}>
          {hasPassage && (
            <div className="overflow-auto rounded-[24px] border border-[var(--border)] bg-[var(--bg-surface)] p-5 max-h-[50vh] lg:sticky lg:top-20 lg:max-h-[70vh]">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)] mb-2">
                {currentQ.metadata?.passage_title ?? 'Text'}
              </p>
              <p className="text-sm text-[var(--text-secondary)] leading-7 whitespace-pre-line">
                {currentQ.metadata?.passage as string}
              </p>
            </div>
          )}

          <div className="space-y-3">
            {/* Question card */}
            <div className="rounded-[24px] border border-[var(--border)] bg-[var(--bg-surface)] p-5 shadow-sm md:p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] text-xs font-bold text-[var(--text-muted)] md:h-8 md:w-8">
                  {String(currentIndex + 1).padStart(2, '0')}
                </span>
                {currentQ.difficulty === 3 && (
                  <span className="text-[10px] font-bold bg-red-500/10 text-red-400 border border-red-500/20 px-2 py-0.5 rounded-full uppercase tracking-wide">
                    Dificil
                  </span>
                )}
              </div>
              <p className="text-base font-medium text-[var(--text-primary)] leading-relaxed whitespace-pre-line">
                {currentQ.question_text}
              </p>
              {currentQ.metadata?.image_url && (
                <div className="mt-4 flex justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={currentQ.metadata.image_url as string}
                    alt="Imagine întrebare"
                    className="max-w-full rounded-xl border border-[var(--border)] object-contain"
                    style={{ maxHeight: '280px' }}
                  />
                </div>
              )}
            </div>

            {/* Answer options — tall touch targets */}
            <div className="space-y-2.5">
              {currentQ.options.map((opt, i) => {
                const isSelected = selectedOptions[currentIndex] === i
                return (
                  <button
                    key={i}
                    onClick={() => setSelectedOptions(prev => ({ ...prev, [currentIndex]: i }))}
                    className={cn(
                      'w-full text-left px-4 py-4 rounded-2xl border transition-all duration-150 text-sm font-medium flex items-center gap-3 min-h-[58px] md:gap-4 md:px-5',
                      isSelected
                        ? 'border-cyan-400/40 bg-[linear-gradient(135deg,rgba(15,76,129,0.1),rgba(45,124,174,0.07))] text-[var(--text-primary)] shadow-sm'
                        : 'border-[var(--border)] bg-[var(--bg-surface)] text-[var(--text-primary)] hover:border-[var(--border-strong)] hover:bg-[var(--bg-elevated)]'
                    )}
                  >
                    <span className={cn(
                      'inline-flex items-center justify-center w-8 h-8 rounded-xl text-xs font-bold shrink-0 border',
                      isSelected
                        ? 'border-cyan-400/30 bg-[#12365b] text-white'
                        : 'border-[var(--border)] bg-[var(--bg-muted)] text-[var(--text-muted)]'
                    )}>
                      {String.fromCharCode(65 + i)}
                    </span>
                    {opt}
                  </button>
                )
              })}
            </div>

            {/* Desktop navigation */}
            <div className="hidden md:flex items-center gap-3 pt-1">
              <button
                className={btnSecondary}
                disabled={currentIndex === 0}
                onClick={() => setCurrentIndex(i => i - 1)}
              >
                <ArrowLeft className="w-4 h-4" /> Anterior
              </button>
              <div className="flex-1 text-center text-xs text-[var(--text-muted)]">Navigare liberă</div>
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
          </div>
        </div>

        {/* Desktop question map */}
        <div className="hidden md:block rounded-[20px] border border-[var(--border)] bg-[var(--bg-surface)] p-4">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)] mb-3">Hartă itemi</p>
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
                    : 'border-[var(--border)] bg-[var(--bg-muted)] text-[var(--text-muted)]'
                )}
              >
                {i + 1}
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
                      ? 'border-cyan-400/30 bg-[#12365b] text-white'
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
          {/* Prev */}
          <button
            disabled={currentIndex === 0}
            onClick={() => setCurrentIndex(i => i - 1)}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/70 disabled:opacity-30 transition-colors hover:bg-white/10 shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          {/* Counter / map toggle */}
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

          {/* Next or Submit */}
          {currentIndex < questions.length - 1 ? (
            <button
              onClick={() => setCurrentIndex(i => i + 1)}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-400/20 bg-[#0f2e49] text-white transition-colors hover:brightness-110 shrink-0"
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
