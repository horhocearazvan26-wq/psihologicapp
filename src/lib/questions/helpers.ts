import type { QuestionRow } from './rationament-analitic'

export type Difficulty = 1 | 2 | 3
export type QuestionDraft = Omit<QuestionRow, 'institution'>

function hashString(input: string): number {
  let hash = 2166136261
  for (let i = 0; i < input.length; i += 1) {
    hash ^= input.charCodeAt(i)
    hash = Math.imul(hash, 16777619)
  }
  return hash >>> 0
}

function seededRandom(seed: string) {
  let state = hashString(seed) || 1
  return () => {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0
    return state / 0xffffffff
  }
}

export function shuffleDeterministic<T>(items: T[], seed: string): T[] {
  const rand = seededRandom(seed)
  const copy = [...items]
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rand() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

export function buildMcqOptions(
  correct: string,
  distractors: string[],
  seed: string
): { options: string[]; correct_answer: number } {
  const unique = Array.from(new Set([correct, ...distractors]))
  const options = shuffleDeterministic(unique.slice(0, 4), seed)
  return {
    options,
    correct_answer: options.indexOf(correct),
  }
}

export function ensureUniqueByText(items: QuestionDraft[]): QuestionDraft[] {
  const seen = new Set<string>()
  return items.filter((item) => {
    if (seen.has(item.question_text)) return false
    seen.add(item.question_text)
    return true
  })
}

export function attachInstitution(
  items: QuestionDraft[],
  institution: string
): QuestionRow[] {
  return items.map((item) => ({ ...item, institution }))
}
