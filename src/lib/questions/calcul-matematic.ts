import type { QuestionRow } from './rationament-analitic'
import {
  attachInstitution,
  buildMcqOptions,
  ensureUniqueByText,
  type Difficulty,
  type QuestionDraft,
} from './helpers'

function makeQuestion(
  question_text: string,
  correct: string,
  distractors: string[],
  explanation: string,
  difficulty: Difficulty,
  metadata: Record<string, unknown> = {}
): QuestionDraft {
  const { options, correct_answer } = buildMcqOptions(correct, distractors, question_text)
  return {
    category: 'calcul-matematic',
    question_text,
    options,
    correct_answer,
    explanation,
    difficulty,
    metadata,
    is_active: true,
  }
}

function arithmeticSet(): QuestionDraft[] {
  const configs = [
    { a: 347, b: 486, c: 219 },
    { a: 582, b: 169, c: 243 },
    { a: 915, b: 278, c: 364 },
    { a: 1234, b: 587, c: 468 },
    { a: 756, b: 889, c: 417 },
    { a: 640, b: 275, c: 189 },
  ]

  return configs.map(({ a, b, c }) => {
    const result = a + b - c
    return makeQuestion(
      `Calculați: ${a} + ${b} − ${c}`,
      String(result),
      [String(result + 10), String(result - 10), String(result + (c % 10))],
      `${a} + ${b} = ${a + b}; ${a + b} − ${c} = ${result}.`,
      1,
      { family: 'aritmetica-mixta' }
    )
  })
}

function multiplicationSet(): QuestionDraft[] {
  const configs = [
    { a: 36, b: 25 },
    { a: 48, b: 125 },
    { a: 72, b: 15 },
    { a: 84, b: 12 },
    { a: 96, b: 45 },
    { a: 144, b: 18 },
  ]

  return configs.map(({ a, b }, index) => {
    const result = a * b
    return makeQuestion(
      `Calculați: ${a} × ${b}`,
      String(result),
      [String(result + a), String(result - b), String(result + b * 2)],
      `Rezultatul este ${a} × ${b} = ${result}.`,
      index < 3 ? 1 : 2,
      { family: 'inmultire' }
    )
  })
}

function divisionSet(): QuestionDraft[] {
  const configs = [
    { a: 1728, b: 12 },
    { a: 2376, b: 18 },
    { a: 3168, b: 24 },
    { a: 4095, b: 15 },
    { a: 5376, b: 28 },
  ]

  return configs.map(({ a, b }, index) => {
    const result = a / b
    return makeQuestion(
      `Calculați: ${a} ÷ ${b}`,
      String(result),
      [String(result + 10), String(result - 8), String(result + b / 3)],
      `${a} împărțit la ${b} este ${result}.`,
      index < 2 ? 1 : 2,
      { family: 'impartire' }
    )
  })
}

function fractionSet(): QuestionDraft[] {
  const configs = [
    { left: [3, 4], op: '+', right: [5, 6] },
    { left: [7, 8], op: '-', right: [1, 3] },
    { left: [2, 3], op: '×', right: [9, 8] },
    { left: [7, 10], op: '÷', right: [14, 5] },
    { left: [5, 12], op: '+', right: [7, 18] },
    { left: [11, 15], op: '-', right: [2, 5] },
    { left: [3, 7], op: '×', right: [14, 9] },
    { left: [5, 6], op: '÷', right: [10, 9] },
  ]

  return configs.map(({ left, op, right }, index) => {
    const [a, b] = left
    const [c, d] = right
    let numerator = 0
    let denominator = 1

    if (op === '+') {
      numerator = a * d + c * b
      denominator = b * d
    } else if (op === '-') {
      numerator = a * d - c * b
      denominator = b * d
    } else if (op === '×') {
      numerator = a * c
      denominator = b * d
    } else {
      numerator = a * d
      denominator = b * c
    }

    const correct = `${numerator}/${denominator}`
    return makeQuestion(
      `Calculați: ${a}/${b} ${op} ${c}/${d}`,
      correct,
      [
        `${numerator + denominator}/${denominator}`,
        `${Math.max(numerator - 1, 1)}/${denominator}`,
        `${numerator}/${denominator + 2}`,
      ],
      `Aplicând operația dintre fracții obținem ${correct}. Simplificarea poate fi făcută ulterior, dar varianta corectă corespunde rezultatului exact.`,
      index < 4 ? 2 : 3,
      { family: 'fractii' }
    )
  })
}

function percentSet(): QuestionDraft[] {
  const configs = [
    { p: 35, base: 240 },
    { p: 18, base: 650 },
    { p: 12.5, base: 480 },
    { p: 7, base: 920 },
    { p: 62, base: 150 },
  ]

  return configs.map(({ p, base }, index) => {
    const result = (p / 100) * base
    return makeQuestion(
      `Ce reprezintă ${p}% din ${base}?`,
      String(result),
      [String(result + 8), String(result - 6), String(result + base / 100)],
      `${p}% din ${base} înseamnă ${p / 100} × ${base} = ${result}.`,
      index < 2 ? 1 : 2,
      { family: 'procente' }
    )
  })
}

function discountSet(): QuestionDraft[] {
  const configs = [
    { price: 180, discount: 15 },
    { price: 320, discount: 12 },
    { price: 560, discount: 25 },
    { price: 1250, discount: 18 },
    { price: 980, discount: 7 },
  ]

  return configs.map(({ price, discount }, index) => {
    const discountValue = (price * discount) / 100
    const result = price - discountValue
    return makeQuestion(
      `Un produs costă ${price} lei. Se aplică o reducere de ${discount}%. Cât costă produsul după reducere?`,
      `${result} lei`,
      [`${result + 10} lei`, `${price - discount} lei`, `${result - 15} lei`],
      `Reducerea este ${discount}% din ${price}, adică ${discountValue} lei. Prețul final este ${price} − ${discountValue} = ${result} lei.`,
      index < 2 ? 2 : 3,
      { family: 'reducere' }
    )
  })
}

function radicalAndPowerSet(): QuestionDraft[] {
  return [
    makeQuestion(
      'Calculați: √144 + √81',
      '21',
      ['19', '23', '25'],
      '√144 = 12 și √81 = 9, deci suma este 21.',
      1,
      { family: 'radicali' }
    ),
    makeQuestion(
      'Calculați: 2⁵ − 3³',
      '5',
      ['4', '6', '7'],
      '2⁵ = 32 și 3³ = 27, deci diferența este 5.',
      2,
      { family: 'puteri' }
    ),
    makeQuestion(
      'Calculați: √225 − √49 + 2³',
      '16',
      ['14', '18', '12'],
      '√225 = 15, √49 = 7, iar 2³ = 8. Rezultatul este 15 − 7 + 8 = 16.',
      2,
      { family: 'mixt-radicali-puteri' }
    ),
    makeQuestion(
      'Calculați: (3² + 4²) ÷ 5',
      '5',
      ['4', '6', '7'],
      '3² + 4² = 9 + 16 = 25, iar 25 ÷ 5 = 5.',
      2,
      { family: 'puteri' }
    ),
    makeQuestion(
      'Calculați: √(196) + 5² − 3²',
      '30',
      ['28', '32', '26'],
      '√196 = 14, 5² = 25, 3² = 9. Rezultatul este 14 + 25 − 9 = 30.',
      2,
      { family: 'mixt-radicali-puteri' }
    ),
  ]
}

function equationSet(): QuestionDraft[] {
  const configs = [
    { a: 3, b: -7, c: 14 },
    { a: 5, b: 9, c: 44 },
    { a: 7, b: -12, c: 23 },
    { a: 4, b: 15, c: 51 },
    { a: 9, b: -18, c: 45 },
  ]

  return configs.map(({ a, b, c }, index) => {
    const result = (c - b) / a
    const signedB = b < 0 ? `− ${Math.abs(b)}` : `+ ${b}`
    return makeQuestion(
      `Dacă ${a}x ${signedB} = ${c}, care este valoarea lui x?`,
      String(result),
      [String(result + 1), String(result - 1), String(result + 2)],
      `Izolăm necunoscuta: ${a}x = ${c} ${b < 0 ? '+' : '-'} ${Math.abs(b)} = ${c - b}, deci x = ${(c - b)} ÷ ${a} = ${result}.`,
      index < 2 ? 2 : 3,
      { family: 'ecuatie-liniara' }
    )
  })
}

function ratioAndRateSet(): QuestionDraft[] {
  return [
    makeQuestion(
      'Un tren parcurge 360 km în 4 ore. Care este viteza medie?',
      '90 km/h',
      ['80 km/h', '95 km/h', '85 km/h'],
      'Viteza medie este distanța împărțită la timp: 360 ÷ 4 = 90 km/h.',
      1,
      { family: 'viteza-medie' }
    ),
    makeQuestion(
      'Un capital de 5000 lei este depus la o rată anuală de 6%. Dobânda simplă după 2 ani este:',
      '600 lei',
      ['560 lei', '630 lei', '300 lei'],
      'Dobânda simplă este C × r × t = 5000 × 0,06 × 2 = 600 lei.',
      2,
      { family: 'dobanda-simpla' }
    ),
    makeQuestion(
      'O echipă finalizează 3/5 din proiect în 12 zile. În același ritm, în câte zile finalizează întregul proiect?',
      '20 zile',
      ['18 zile', '22 zile', '24 zile'],
      'Dacă 3/5 din proiect cere 12 zile, atunci 1/5 cere 4 zile, iar 5/5 cere 20 zile.',
      2,
      { family: 'proportionalitate' }
    ),
    makeQuestion(
      'Raportul dintre două numere este 7:9, iar suma lor este 128. Care este numărul mai mare?',
      '72',
      ['63', '81', '64'],
      'Totalul părților este 16. O parte valorează 128 ÷ 16 = 8. Numărul mai mare este 9 × 8 = 72.',
      3,
      { family: 'raport' }
    ),
    makeQuestion(
      'O pompă umple 2/7 dintr-un rezervor în 18 minute. În câte minute îl umple complet, în același ritm?',
      '63 minute',
      ['56 minute', '60 minute', '72 minute'],
      'Dacă 2/7 se umplu în 18 minute, atunci 1/7 se umple în 9 minute, iar 7/7 în 63 minute.',
      3,
      { family: 'proportionalitate' }
    ),
  ]
}

const items: QuestionDraft[] = ensureUniqueByText([
  ...arithmeticSet(),
  ...multiplicationSet(),
  ...divisionSet(),
  ...fractionSet(),
  ...percentSet(),
  ...discountSet(),
  ...radicalAndPowerSet(),
  ...equationSet(),
  ...ratioAndRateSet(),
])

export function generateCalculMatematic(institution: string): QuestionRow[] {
  return attachInstitution(items, institution)
}
