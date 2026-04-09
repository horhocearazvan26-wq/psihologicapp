import type { TestQuestion } from '@/types'

export function generateNumericalQuestions(institution: string): Omit<TestQuestion, 'id' | 'created_at'>[] {
  const questions: Omit<TestQuestion, 'id' | 'created_at'>[] = []

  // Arithmetic operations
  const arithmetic = [
    { q: '347 + 589 = ?', a: '936', w: ['926', '946', '916'] },
    { q: '1024 - 376 = ?', a: '648', w: ['658', '638', '668'] },
    { q: '48 × 7 = ?', a: '336', w: ['326', '346', '316'] },
    { q: '756 ÷ 9 = ?', a: '84', w: ['74', '94', '86'] },
    { q: '23 × 15 = ?', a: '345', w: ['335', '355', '325'] },
    { q: '1296 ÷ 4 = ?', a: '324', w: ['314', '334', '344'] },
    { q: '85 + 67 + 43 = ?', a: '195', w: ['185', '205', '175'] },
    { q: '500 - 237 = ?', a: '263', w: ['253', '273', '243'] },
    { q: '36 × 25 = ?', a: '900', w: ['880', '920', '860'] },
    { q: '2160 ÷ 12 = ?', a: '180', w: '170 190 160'.split(' ') },
    { q: '144 + 256 = ?', a: '400', w: ['390', '410', '380'] },
    { q: '1000 - 463 = ?', a: '537', w: ['527', '547', '517'] },
    { q: '17 × 18 = ?', a: '306', w: ['296', '316', '286'] },
    { q: '648 ÷ 8 = ?', a: '81', w: ['71', '91', '79'] },
    { q: '125 × 4 = ?', a: '500', w: ['490', '510', '480'] },
  ]

  arithmetic.forEach(({ q, a, w }) => {
    const opts = shuffle([a, ...w])
    questions.push({
      institution: institution as TestQuestion['institution'],
      category: 'numerical',
      question_text: q,
      options: opts,
      correct_answer: opts.indexOf(a),
      explanation: `Rezultatul corect este ${a}.`,
      difficulty: 1,
      metadata: { type: 'arithmetic' },
      is_active: true,
    })
  })

  // Percentages
  const percentages = [
    { q: '20% din 350 = ?', a: '70', w: ['60', '80', '65'] },
    { q: '15% din 200 = ?', a: '30', w: ['25', '35', '20'] },
    { q: '35% din 400 = ?', a: '140', w: ['130', '150', '120'] },
    { q: '75% din 120 = ?', a: '90', w: ['80', '100', '85'] },
    { q: 'Ce procent reprezintă 45 din 180?', a: '25%', w: ['20%', '30%', '15%'] },
    { q: 'Ce procent reprezintă 84 din 420?', a: '20%', w: ['15%', '25%', '18%'] },
    { q: 'Un produs costă 250 lei. Se aplică o reducere de 12%. Prețul redus este:', a: '220 lei', w: ['230 lei', '210 lei', '225 lei'] },
    { q: '40% din 650 = ?', a: '260', w: ['250', '270', '240'] },
    { q: 'Dacă 30% dintr-o sumă este 90 lei, suma totală este:', a: '300 lei', w: ['270 lei', '330 lei', '240 lei'] },
    { q: '8% din 1250 = ?', a: '100', w: ['90', '110', '80'] },
  ]

  percentages.forEach(({ q, a, w }) => {
    const opts = shuffle([a, ...w])
    questions.push({
      institution: institution as TestQuestion['institution'],
      category: 'numerical',
      question_text: q,
      options: opts,
      correct_answer: opts.indexOf(a),
      explanation: `Răspunsul corect este ${a}.`,
      difficulty: 2,
      metadata: { type: 'percentage' },
      is_active: true,
    })
  })

  // Word problems
  const wordProblems = [
    { q: 'Un tren parcurge 360 km în 4 ore. Viteza medie este:', a: '90 km/h', w: ['80 km/h', '100 km/h', '85 km/h'] },
    { q: 'Dacă 5 muncitori termină o lucrare în 12 zile, 10 muncitori o termină în:', a: '6 zile', w: ['4 zile', '8 zile', '10 zile'] },
    { q: 'Ana are 3 ori mai mulți bani decât Ion. Împreună au 240 lei. Ion are:', a: '60 lei', w: ['80 lei', '40 lei', '70 lei'] },
    { q: 'Un dreptunghi are lungimea 15 cm și lățimea 8 cm. Perimetrul este:', a: '46 cm', w: ['40 cm', '52 cm', '44 cm'] },
    { q: 'Dacă prețul crește cu 25% de la 80 lei, noul preț este:', a: '100 lei', w: '95 lei 105 lei 90 lei'.split(' ').map(s => s + (s.includes('lei') ? '' : ' lei')) },
    { q: 'O mașină consumă 7L/100km. Pentru 350 km consumă:', a: '24.5 L', w: ['21 L', '28 L', '22 L'] },
    { q: 'Suma a 4 numere consecutive este 54. Cel mai mic număr este:', a: '12', w: ['11', '13', '10'] },
    { q: 'Un cerc are raza 7 cm. Aria este (π≈3.14):', a: '153.86 cm²', w: ['144 cm²', '163 cm²', '138 cm²'] },
    { q: '3 mere și 2 pere costă 17 lei. O pară costă 4 lei. Un măr costă:', a: '3 lei', w: ['2 lei', '4 lei', '5 lei'] },
    { q: 'O clasă are 32 elevi. Raportul fete/băieți este 3:5. Câte fete sunt?', a: '12', w: ['10', '14', '8'] },
    { q: 'Dacă x + 15 = 47, atunci x = ?', a: '32', w: ['62', '22', '30'] },
    { q: 'Produsul a două numere este 84. Unul este 7. Celălalt este:', a: '12', w: ['11', '13', '14'] },
    { q: 'Un magazin vinde 150 produse pe zi. Într-o săptămână vinde:', a: '1050', w: ['900', '1200', '1050'] },
    { q: 'Dacă 2/3 dintr-o sumă este 160 lei, suma totală este:', a: '240 lei', w: ['220 lei', '260 lei', '200 lei'] },
    { q: 'Viteza unui ciclist este 18 km/h. În 2.5 ore parcurge:', a: '45 km', w: ['36 km', '54 km', '40 km'] },
  ]

  wordProblems.forEach(({ q, a, w }) => {
    const opts = shuffle([a, ...w])
    questions.push({
      institution: institution as TestQuestion['institution'],
      category: 'numerical',
      question_text: q,
      options: opts,
      correct_answer: opts.indexOf(a),
      explanation: `Răspunsul corect este ${a}.`,
      difficulty: 2,
      metadata: { type: 'word_problem' },
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
