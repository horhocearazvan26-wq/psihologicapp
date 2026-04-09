import type { TestQuestion } from '@/types'

export function generateMemoryQuestions(institution: string): Omit<TestQuestion, 'id' | 'created_at'>[] {
  const questions: Omit<TestQuestion, 'id' | 'created_at'>[] = []

  // Short-term memory: remember a list then answer
  const listMemory = [
    {
      q: 'Citește lista și memorizeaz-o: [măr, carte, lampă, câine, mașină]. Ce al treilea element din listă?',
      a: 'lampă', w: ['carte', 'câine', 'măr'],
    },
    {
      q: 'Lista: [7, 3, 9, 1, 5]. Care este al patrulea număr?',
      a: '1', w: ['9', '5', '3'],
    },
    {
      q: 'Cuvinte: [roșu, verde, albastru, galben, violet]. Al doilea cuvânt este:',
      a: 'verde', w: ['albastru', 'roșu', 'galben'],
    },
    {
      q: 'Secvența: [A, C, E, G, I]. Al cincilea element este:',
      a: 'I', w: ['G', 'H', 'J'],
    },
    {
      q: 'Lista: [București, Cluj, Iași, Timișoara, Brașov]. Al treilea oraș este:',
      a: 'Iași', w: ['Cluj', 'Timișoara', 'Brașov'],
    },
    {
      q: 'Numere: [14, 27, 33, 45, 52]. Care număr este pe poziția a doua?',
      a: '27', w: ['33', '14', '45'],
    },
    {
      q: 'Animale: [leu, tigru, elefant, girafă, zebră]. Al patrulea animal este:',
      a: 'girafă', w: ['elefant', 'zebră', 'tigru'],
    },
    {
      q: 'Culori: [negru, alb, gri, bej, maro]. Prima culoare este:',
      a: 'negru', w: ['alb', 'gri', 'bej'],
    },
  ]

  listMemory.forEach(({ q, a, w }) => {
    const opts = shuffle([a, ...w])
    questions.push({
      institution: institution as TestQuestion['institution'],
      category: 'memory',
      question_text: q,
      options: opts,
      correct_answer: opts.indexOf(a),
      explanation: `Răspunsul corect este "${a}".`,
      difficulty: 1,
      metadata: { type: 'list_memory' },
      is_active: true,
    })
  })

  // Pattern memory
  const patternMemory = [
    {
      q: 'Secvența de litere este: B D F H ___. Care este litera lipsă?',
      a: 'J', w: ['I', 'K', 'G'],
    },
    {
      q: 'Seria: 2 4 8 16 ___. Numărul următor este:',
      a: '32', w: ['24', '28', '30'],
    },
    {
      q: 'Pattern: ○ △ □ ○ △ ___. Următorul simbol este:',
      a: '□', w: ['○', '△', '◇'],
    },
    {
      q: 'Secvența: 1A 2B 3C 4D ___. Urmează:',
      a: '5E', w: ['4E', '5D', '6F'],
    },
    {
      q: 'Culori repeate: Roșu Albastru Verde Roșu Albastru ___. Urmează:',
      a: 'Verde', w: ['Roșu', 'Albastru', 'Galben'],
    },
    {
      q: 'Cifre: 1 2 4 7 11 ___. Numărul următor este:',
      a: '16', w: ['14', '18', '15'],
    },
    {
      q: 'Secvența: Z Y X W V ___. Litera lipsă este:',
      a: 'U', w: ['T', 'V', 'S'],
    },
    {
      q: 'Pattern: △△○ △△○ △△___. Urmează:',
      a: '○', w: ['△', '□', '◇'],
    },
  ]

  patternMemory.forEach(({ q, a, w }) => {
    const opts = shuffle([a, ...w])
    questions.push({
      institution: institution as TestQuestion['institution'],
      category: 'memory',
      question_text: q,
      options: opts,
      correct_answer: opts.indexOf(a),
      explanation: `Răspunsul corect este "${a}".`,
      difficulty: 2,
      metadata: { type: 'pattern_memory' },
      is_active: true,
    })
  })

  // Working memory
  const workingMemory = [
    {
      q: 'Dacă A=1, B=2, C=3... care este valoarea cuvântului "CAB"?',
      a: '6', w: ['5', '7', '8'],
    },
    {
      q: 'Inversează numărul 3847. Care este cifra a doua din numărul inversat?',
      a: '4', w: ['8', '3', '7'],
    },
    {
      q: 'Ai 5 mere. Dai 2, primești 3, mai dai 1. Câte ai?',
      a: '5', w: ['4', '6', '3'],
    },
    {
      q: 'Un tren pleacă la 08:45 și sosește după 2h 35min. La ce oră sosește?',
      a: '11:20', w: ['11:10', '11:30', '11:15'],
    },
    {
      q: 'Cuvântul "RADAR" citit invers este:',
      a: 'RADAR', w: ['RARAD', 'DARAR', 'RAADR'],
    },
    {
      q: 'Dacă ieri a fost marți, ce zi va fi poimâine?',
      a: 'Vineri', w: ['Joi', 'Sâmbătă', 'Miercuri'],
    },
    {
      q: 'Numărul de litere din "PSIHOLOGIE" este:',
      a: '10', w: ['9', '11', '8'],
    },
    {
      q: 'Suma cifrelor numărului 2847 este:',
      a: '21', w: ['20', '22', '19'],
    },
    {
      q: 'Câte litere vocale are cuvântul "PREGĂTIRE"?',
      a: '4', w: ['3', '5', '6'],
    },
    {
      q: 'Dacă X = 5 și Y = 3, cât este X² + Y²?',
      a: '34', w: ['30', '32', '36'],
    },
  ]

  workingMemory.forEach(({ q, a, w }) => {
    const opts = shuffle([a, ...w])
    questions.push({
      institution: institution as TestQuestion['institution'],
      category: 'memory',
      question_text: q,
      options: opts,
      correct_answer: opts.indexOf(a),
      explanation: `Răspunsul corect este "${a}".`,
      difficulty: 3,
      metadata: { type: 'working_memory' },
      is_active: true,
    })
  })

  return questions
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}
