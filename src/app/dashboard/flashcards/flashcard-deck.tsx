'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, RotateCcw, CheckCircle, XCircle } from 'lucide-react'

interface Card {
  front: string
  back: string
}

interface Deck {
  id: string
  title: string
  icon: string
  count: number
  color: string
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

  function flip() {
    setIsFlipped(f => !f)
  }

  function markKnown() {
    setKnown(prev => new Set([...prev, currentIndex]))
    setReview(prev => {
      const next = new Set(prev)
      next.delete(currentIndex)
      return next
    })
    next()
  }

  function markReview() {
    setReview(prev => new Set([...prev, currentIndex]))
    setKnown(prev => {
      const next = new Set(prev)
      next.delete(currentIndex)
      return next
    })
    next()
  }

  function next() {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(i => i + 1)
      setIsFlipped(false)
    }
  }

  function prev() {
    if (currentIndex > 0) {
      setCurrentIndex(i => i - 1)
      setIsFlipped(false)
    }
  }

  const isFinished = currentIndex === cards.length - 1 && isFlipped

  if (!isStudying) {
    return (
      <div className="text-center">
        <p className="text-sm text-slate-500 mb-4">{cards.length} carduri disponibile</p>
        <Button onClick={start} size="sm" className="w-full">
          Începe studiul
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Progress */}
      <div className="flex items-center justify-between text-xs text-slate-400">
        <span>{currentIndex + 1} / {cards.length}</span>
        <div className="flex gap-3">
          <span className="text-green-600 font-medium flex items-center gap-1">
            <CheckCircle className="w-3 h-3" /> {known.size}
          </span>
          <span className="text-amber-600 font-medium flex items-center gap-1">
            <RotateCcw className="w-3 h-3" /> {review.size}
          </span>
        </div>
      </div>

      <div className="w-full bg-slate-100 rounded-full h-1.5">
        <div
          className="bg-blue-500 h-1.5 rounded-full transition-all"
          style={{ width: `${((currentIndex + 1) / cards.length) * 100}%` }}
        />
      </div>

      {/* Card */}
      <div
        onClick={flip}
        className={cn(
          'relative cursor-pointer rounded-2xl border-2 p-6 min-h-[120px] flex flex-col items-center justify-center text-center transition-all duration-300 select-none',
          isFlipped
            ? 'bg-slate-800 border-slate-700 text-white'
            : 'bg-slate-50 border-slate-200 text-slate-800 hover:border-blue-300 hover:bg-blue-50/30',
          known.has(currentIndex) && 'border-green-300',
          review.has(currentIndex) && 'border-amber-300',
        )}
      >
        <div className="text-xs font-medium mb-2 opacity-50">
          {isFlipped ? 'Răspuns' : 'Termen'} · click pentru a întoarce
        </div>
        <p className={cn('font-bold leading-snug', isFlipped ? 'text-sm' : 'text-base')}>
          {isFlipped ? card.back : card.front}
        </p>
      </div>

      {/* Actions */}
      {isFlipped ? (
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={markReview}
            className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl border-2 border-amber-200 bg-amber-50 text-amber-700 text-sm font-semibold hover:bg-amber-100 transition-colors"
          >
            <RotateCcw className="w-4 h-4" /> De revăzut
          </button>
          <button
            onClick={markKnown}
            className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl border-2 border-green-200 bg-green-50 text-green-700 text-sm font-semibold hover:bg-green-100 transition-colors"
          >
            <CheckCircle className="w-4 h-4" /> Știu!
          </button>
        </div>
      ) : (
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={prev} disabled={currentIndex === 0} className="flex-1">
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button size="sm" onClick={flip} className="flex-1">
            Întoarce cardul
          </Button>
          <Button variant="outline" size="sm" onClick={next} disabled={currentIndex === cards.length - 1} className="flex-1">
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}

      {/* Finish */}
      {currentIndex === cards.length - 1 && isFlipped && (
        <div className="bg-slate-50 rounded-xl p-3 text-center">
          <p className="text-sm font-semibold text-slate-700 mb-2">
            Deck complet! 🎉 {known.size}/{cards.length} știute
          </p>
          <Button size="sm" variant="outline" onClick={start} className="w-full">
            <RotateCcw className="w-3.5 h-3.5 mr-1.5" /> Reia din capăt
          </Button>
        </div>
      )}
    </div>
  )
}
