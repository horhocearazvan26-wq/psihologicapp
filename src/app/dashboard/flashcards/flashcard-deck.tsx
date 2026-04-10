'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { ChevronLeft, ChevronRight, RotateCcw, CheckCircle } from 'lucide-react'

interface Card {
  front: string
  back: string
}

interface Deck {
  id: string
  title: string
  icon: string
  count: number
  gradient: string
  cards: Card[]
}

interface FlashcardDeckProps {
  deck: Deck
}

export function FlashcardDeck({ deck }: FlashcardDeckProps) {
  const [isStudying, setIsStudying] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [known, setKnown] = useState<Set<number>>(new Set())
  const [review, setReview] = useState<Set<number>>(new Set())

  const cards = deck.cards
  const card = cards[currentIndex]

  function start() {
    setIsStudying(true)
    setCurrentIndex(0)
    setIsFlipped(false)
    setKnown(new Set())
    setReview(new Set())
  }

  function flip() { setIsFlipped(f => !f) }

  function markKnown() {
    setKnown(prev => new Set([...prev, currentIndex]))
    setReview(prev => { const next = new Set(prev); next.delete(currentIndex); return next })
    goNext()
  }

  function markReview() {
    setReview(prev => new Set([...prev, currentIndex]))
    setKnown(prev => { const next = new Set(prev); next.delete(currentIndex); return next })
    goNext()
  }

  function goNext() {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(i => i + 1)
      setIsFlipped(false)
    }
  }

  function goPrev() {
    if (currentIndex > 0) {
      setCurrentIndex(i => i - 1)
      setIsFlipped(false)
    }
  }

  if (!isStudying) {
    return (
      <div className="text-center py-2">
        <p className="text-sm text-[var(--text-muted)] mb-4">{cards.length} carduri disponibile</p>
        <button
          onClick={start}
          className="w-full py-2.5 rounded-xl bg-[var(--text-primary)] text-[var(--text-inverse)] text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          Începe studiul
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Progress row */}
      <div className="flex items-center justify-between text-xs text-[var(--text-muted)]">
        <span className="font-medium">{currentIndex + 1} / {cards.length}</span>
        <div className="flex gap-3">
          <span className="text-green-500 dark:text-green-400 font-semibold flex items-center gap-1">
            <CheckCircle className="w-3 h-3" /> {known.size}
          </span>
          <span className="text-amber-500 dark:text-amber-400 font-semibold flex items-center gap-1">
            <RotateCcw className="w-3 h-3" /> {review.size}
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-[var(--bg-muted)] rounded-full h-1.5">
        <div
          className="bg-gradient-to-r from-indigo-500 to-violet-500 h-1.5 rounded-full transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / cards.length) * 100}%` }}
        />
      </div>

      {/* Card */}
      <button
        onClick={flip}
        className={cn(
          'w-full cursor-pointer rounded-2xl border-2 p-6 min-h-[120px] flex flex-col items-center justify-center text-center transition-all duration-200 select-none',
          isFlipped
            ? 'bg-[var(--text-primary)] border-transparent text-[var(--text-inverse)]'
            : cn(
                'bg-[var(--bg-muted)] border-[var(--border)] hover:border-[var(--border-strong)]',
                known.has(currentIndex) && 'border-green-400 dark:border-green-600',
                review.has(currentIndex) && 'border-amber-400 dark:border-amber-600',
              )
        )}
      >
        <div className={cn('text-[10px] font-semibold uppercase tracking-widest mb-2.5', isFlipped ? 'opacity-40' : 'text-[var(--text-muted)]')}>
          {isFlipped ? 'Răspuns' : 'Termen'} · click pentru a întoarce
        </div>
        <p className={cn('font-bold leading-snug', isFlipped ? 'text-sm' : 'text-base text-[var(--text-primary)]')}>
          {isFlipped ? card.back : card.front}
        </p>
      </button>

      {/* Actions post-flip */}
      {isFlipped ? (
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={markReview}
            className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl border-2 border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 text-sm font-semibold hover:bg-amber-100 dark:hover:bg-amber-950/60 transition-colors"
          >
            <RotateCcw className="w-4 h-4" /> De revăzut
          </button>
          <button
            onClick={markKnown}
            className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl border-2 border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/40 text-green-700 dark:text-green-400 text-sm font-semibold hover:bg-green-100 dark:hover:bg-green-950/60 transition-colors"
          >
            <CheckCircle className="w-4 h-4" /> Știu!
          </button>
        </div>
      ) : (
        <div className="flex gap-2">
          <button
            onClick={goPrev}
            disabled={currentIndex === 0}
            className="flex-1 flex items-center justify-center py-2 rounded-xl border border-[var(--border)] text-[var(--text-secondary)] hover:bg-[var(--bg-muted)] transition-colors disabled:opacity-30 disabled:cursor-not-allowed text-sm"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={flip}
            className="flex-1 py-2 rounded-xl bg-[var(--text-primary)] text-[var(--text-inverse)] text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Întoarce cardul
          </button>
          <button
            onClick={goNext}
            disabled={currentIndex === cards.length - 1}
            className="flex-1 flex items-center justify-center py-2 rounded-xl border border-[var(--border)] text-[var(--text-secondary)] hover:bg-[var(--bg-muted)] transition-colors disabled:opacity-30 disabled:cursor-not-allowed text-sm"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Deck complete */}
      {currentIndex === cards.length - 1 && isFlipped && (
        <div className="bg-[var(--bg-muted)] rounded-xl p-4 text-center border border-[var(--border)]">
          <p className="text-sm font-bold text-[var(--text-primary)] mb-2">
            Deck complet! {known.size}/{cards.length} știute
          </p>
          <button
            onClick={start}
            className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg border border-[var(--border)] text-sm font-semibold text-[var(--text-secondary)] hover:bg-[var(--bg-surface)] transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reia din capăt
          </button>
        </div>
      )}
    </div>
  )
}
