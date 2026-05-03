import type { QuestionRow } from './rationament-analitic'
import {
  attachInstitution,
  buildMcqOptions,
  ensureUniqueByText,
  type Difficulty,
  type QuestionDraft,
} from './helpers'

function formatValue(value: number): string {
  return Number.isInteger(value) ? String(value) : value.toFixed(2).replace(/\.00$/, '')
}

function makePairQuestion(
  series: number[],
  blanks: [number, number],
  correctPair: [number, number],
  distractors: [number, number][],
  explanation: string,
  difficulty: Difficulty,
  metadata: Record<string, unknown> = {}
): QuestionDraft {
  const masked = series.map((value, index) => (blanks.includes(index) ? '__' : formatValue(value)))
  const correct = `${formatValue(correctPair[0])} și ${formatValue(correctPair[1])}`
  const wrong = distractors.map(([a, b]) => `${formatValue(a)} și ${formatValue(b)}`)
  const { options, correct_answer } = buildMcqOptions(correct, wrong, masked.join('|'))

  return {
    category: 'rationament-matematic',
    question_text: `Identificați numerele lipsă din șirul următor:\n${masked.join(', ')}`,
    options,
    correct_answer,
    explanation,
    difficulty,
    metadata: {
      ...metadata,
      series,
      blanks,
      correctPair,
    },
    is_active: true,
  }
}

function arithmeticQuestions(): QuestionDraft[] {
  return [
    { start: 4, step: 3, length: 7, blanks: [2, 5] as [number, number] },
    { start: 17, step: -4, length: 7, blanks: [1, 4] as [number, number] },
    { start: 12, step: 6, length: 6, blanks: [3, 5] as [number, number] },
    { start: 95, step: -7, length: 6, blanks: [2, 4] as [number, number] },
    { start: 8, step: 9, length: 7, blanks: [3, 6] as [number, number] },
    { start: 150, step: -12, length: 6, blanks: [1, 3] as [number, number] },
  ].map(({ start, step, length, blanks }) => {
    const series = Array.from({ length }, (_, index) => start + step * index)
    const correctPair: [number, number] = [series[blanks[0]], series[blanks[1]]]
    return makePairQuestion(
      series,
      blanks,
      correctPair,
      [
        [correctPair[0] + step, correctPair[1] + step],
        [correctPair[0] - step, correctPair[1] - step],
        [correctPair[0], correctPair[1] + Math.sign(step || 1) * 2],
      ],
      `Șirul este o progresie aritmetică cu rația ${step > 0 ? `+${step}` : step}. Valorile lipsă sunt ${formatValue(correctPair[0])} și ${formatValue(correctPair[1])}.`,
      Math.abs(step) >= 9 ? 2 : 1,
      { family: 'progresie-aritmetica', step }
    )
  })
}

function geometricQuestions(): QuestionDraft[] {
  return [
    { start: 3, ratio: 2, length: 6, blanks: [3, 5] as [number, number] },
    { start: 96, ratio: 0.5, length: 6, blanks: [1, 4] as [number, number] },
    { start: 5, ratio: 3, length: 5, blanks: [2, 4] as [number, number] },
    { start: 243, ratio: 1 / 3, length: 6, blanks: [2, 5] as [number, number] },
    { start: 7, ratio: 2, length: 7, blanks: [4, 6] as [number, number] },
  ].map(({ start, ratio, length, blanks }) => {
    const series = Array.from({ length }, (_, index) => start * ratio ** index)
    const correctPair: [number, number] = [series[blanks[0]], series[blanks[1]]]
    return makePairQuestion(
      series,
      blanks,
      correctPair,
      [
        [correctPair[0] * ratio, correctPair[1] * ratio],
        [correctPair[0] / ratio, correctPair[1] / ratio],
        [correctPair[0], correctPair[1] + (ratio > 1 ? ratio : 1)],
      ],
      `Fiecare termen se obține înmulțind cu ${formatValue(ratio)} termenul precedent. Valorile lipsă sunt ${formatValue(correctPair[0])} și ${formatValue(correctPair[1])}.`,
      ratio === 3 || ratio === 1 / 3 ? 2 : 1,
      { family: 'progresie-geometrica', ratio }
    )
  })
}

function secondDifferenceQuestions(): QuestionDraft[] {
  return [
    { base: [2, 6, 12, 20, 30, 42, 56], blanks: [4, 6] as [number, number] },
    { base: [5, 9, 15, 23, 33, 45, 59], blanks: [3, 5] as [number, number] },
    { base: [3, 8, 15, 24, 35, 48, 63], blanks: [2, 6] as [number, number] },
    { base: [10, 14, 20, 28, 38, 50, 64], blanks: [1, 4] as [number, number] },
  ].map(({ base, blanks }) =>
    makePairQuestion(
      base,
      blanks,
      [base[blanks[0]], base[blanks[1]]],
      [
        [base[blanks[0]] + 2, base[blanks[1]] + 2],
        [base[blanks[0]] - 2, base[blanks[1]] - 2],
        [base[blanks[0]] + 1, base[blanks[1]] - 1],
      ],
      'Diferențele dintre termeni cresc constant cu 2, ceea ce indică o progresie cu a doua diferență constantă. Completarea corectă urmează exact acest tipar.',
      2,
      { family: 'a-doua-diferenta' }
    )
  )
}

function specialSeriesQuestions(): QuestionDraft[] {
  const configs = [
    {
      series: [1, 1, 2, 3, 5, 8, 13, 21],
      blanks: [5, 7] as [number, number],
      explanation: 'Șirul este de tip Fibonacci: fiecare termen este suma celor doi termeni anteriori.',
      difficulty: 2 as Difficulty,
      family: 'fibonacci',
    },
    {
      series: [1, 4, 9, 16, 25, 36, 49],
      blanks: [4, 6] as [number, number],
      explanation: 'Șirul conține pătrate perfecte consecutive: 1², 2², 3², ...',
      difficulty: 2 as Difficulty,
      family: 'patrate',
    },
    {
      series: [1, 8, 27, 64, 125, 216],
      blanks: [3, 5] as [number, number],
      explanation: 'Șirul conține cuburi perfecte consecutive: 1³, 2³, 3³, ...',
      difficulty: 2 as Difficulty,
      family: 'cuburi',
    },
    {
      series: [2, 3, 5, 7, 11, 13, 17, 19],
      blanks: [4, 7] as [number, number],
      explanation: 'Șirul este format din numere prime în ordine crescătoare.',
      difficulty: 2 as Difficulty,
      family: 'prime',
    },
    {
      series: [1, 2, 6, 24, 120, 720],
      blanks: [3, 5] as [number, number],
      explanation: 'Șirul reprezintă factorialele: 1!, 2!, 3!, 4!, 5!, 6!.',
      difficulty: 3 as Difficulty,
      family: 'factoriale',
    },
    {
      series: [0, 1, 3, 6, 10, 15, 21],
      blanks: [4, 6] as [number, number],
      explanation: 'Șirul conține numere triunghiulare: sumele succesive 1, 1+2, 1+2+3 etc.',
      difficulty: 3 as Difficulty,
      family: 'triunghiulare',
    },
  ]

  return configs.map(({ series, blanks, explanation, difficulty, family }) =>
    makePairQuestion(
      series,
      blanks,
      [series[blanks[0]], series[blanks[1]]],
      [
        [series[blanks[0]] + 1, series[blanks[1]] + 1],
        [series[blanks[0]] - 1, series[blanks[1]] - 1],
        [series[blanks[0]], series[blanks[1]] + 2],
      ],
      explanation,
      difficulty,
      { family }
    )
  )
}

function alternatingQuestions(): QuestionDraft[] {
  const configs = [
    {
      odd: [4, 8, 12, 16],
      even: [3, 6, 9, 12],
      blanks: [3, 6] as [number, number],
    },
    {
      odd: [30, 27, 24, 21],
      even: [2, 4, 8, 16],
      blanks: [2, 7] as [number, number],
    },
    {
      odd: [5, 10, 15, 20],
      even: [40, 35, 30, 25],
      blanks: [1, 4] as [number, number],
    },
    {
      odd: [2, 4, 8, 16],
      even: [81, 27, 9, 3],
      blanks: [5, 7] as [number, number],
    },
  ]

  return configs.map(({ odd, even, blanks }, index) => {
    const series: number[] = []
    for (let i = 0; i < odd.length; i += 1) {
      series.push(odd[i], even[i])
    }
    const correctPair: [number, number] = [series[blanks[0]], series[blanks[1]]]
    return makePairQuestion(
      series,
      blanks,
      correctPair,
      [
        [correctPair[0] + 2, correctPair[1] + 2],
        [correctPair[0] - 2, correctPair[1] - 2],
        [correctPair[0], correctPair[1] + 4],
      ],
      'Șirul alternează între două reguli independente: una pentru pozițiile impare și una pentru pozițiile pare. Valorile lipsă trebuie găsite urmărind separat cele două subșiruri.',
      index >= 2 ? 3 : 2,
      { family: 'alternant' }
    )
  })
}

function mixedOperationQuestions(): QuestionDraft[] {
  const configs = [
    { series: [2, 5, 11, 23, 47, 95], blanks: [4, 5] as [number, number], rule: '×2 + 1' },
    { series: [3, 7, 15, 31, 63, 127], blanks: [3, 5] as [number, number], rule: '×2 + 1' },
    { series: [4, 9, 19, 39, 79, 159], blanks: [2, 4] as [number, number], rule: '×2 + 1' },
    { series: [6, 13, 27, 55, 111, 223], blanks: [3, 5] as [number, number], rule: '×2 + 1' },
    { series: [1, 4, 10, 22, 46, 94], blanks: [2, 5] as [number, number], rule: '×2 + 2' },
  ]

  return configs.map(({ series, blanks, rule }, index) =>
    makePairQuestion(
      series,
      blanks,
      [series[blanks[0]], series[blanks[1]]],
      [
        [series[blanks[0]] + 1, series[blanks[1]] + 1],
        [series[blanks[0]] - 1, series[blanks[1]] - 1],
        [series[blanks[0]], series[blanks[1]] + 2],
      ],
      `Regula seriei este ${rule}: fiecare termen se obține aplicând această transformare termenului precedent.`,
      index < 3 ? 2 : 3,
      { family: 'operatie-mixta', rule }
    )
  )
}

const items: QuestionDraft[] = ensureUniqueByText([
  ...arithmeticQuestions(),
  ...geometricQuestions(),
  ...secondDifferenceQuestions(),
  ...specialSeriesQuestions(),
  ...alternatingQuestions(),
  ...mixedOperationQuestions(),
])

export function generateRationamentMatematic(institution: string): QuestionRow[] {
  return attachInstitution(items, institution)
}
