import type { TestQuestion } from '@/types'

// Algorithmically generated logic questions
export function generateLogicQuestions(institution: string): Omit<TestQuestion, 'id' | 'created_at'>[] {
  const questions: Omit<TestQuestion, 'id' | 'created_at'>[] = []

  // Number series
  const seriesTemplates = [
    { seq: [2, 4, 6, 8, 10], next: 12, rule: '+2' },
    { seq: [3, 6, 9, 12, 15], next: 18, rule: '+3' },
    { seq: [1, 2, 4, 8, 16], next: 32, rule: '×2' },
    { seq: [100, 90, 80, 70, 60], next: 50, rule: '-10' },
    { seq: [1, 4, 9, 16, 25], next: 36, rule: 'pătrate' },
    { seq: [2, 6, 12, 20, 30], next: 42, rule: 'n(n+1)' },
    { seq: [1, 1, 2, 3, 5], next: 8, rule: 'Fibonacci' },
    { seq: [5, 10, 20, 40, 80], next: 160, rule: '×2' },
    { seq: [81, 27, 9, 3, 1], next: 0.333, rule: '÷3' },
    { seq: [0, 3, 8, 15, 24], next: 35, rule: 'n²-1' },
    { seq: [1, 3, 7, 15, 31], next: 63, rule: '×2+1' },
    { seq: [50, 45, 40, 35, 30], next: 25, rule: '-5' },
    { seq: [2, 3, 5, 7, 11], next: 13, rule: 'numere prime' },
    { seq: [4, 8, 16, 32, 64], next: 128, rule: '×2' },
    { seq: [1, 8, 27, 64, 125], next: 216, rule: 'cuburi' },
  ]

  seriesTemplates.forEach(({ seq, next, rule }) => {
    const wrong1 = next + 2
    const wrong2 = next - 2
    const wrong3 = next + 5
    questions.push({
      institution: institution as TestQuestion['institution'],
      category: 'logic',
      question_text: `Care este numărul următor în seria: ${seq.join(', ')}, __?`,
      options: shuffle([String(next), String(wrong1), String(wrong2), String(wrong3)]),
      correct_answer: 0, // will be recalculated after shuffle
      explanation: `Regula seriei: ${rule}. Numărul următor este ${next}.`,
      difficulty: 1,
      metadata: { type: 'number_series', rule },
      is_active: true,
    })
    // Fix correct_answer index after shuffle
    const opts = shuffle([String(next), String(wrong1), String(wrong2), String(wrong3)])
    const lastQ = questions[questions.length - 1]
    lastQ.options = opts
    lastQ.correct_answer = opts.indexOf(String(next))
  })

  // Verbal analogies
  const analogies = [
    { q: 'Carte este pentru citit, așa cum furculița este pentru:', a: 'mâncat', w: ['dormit', 'scris', 'alergat'] },
    { q: 'Câinele este pentru haită, așa cum omul este pentru:', a: 'societate', w: ['casă', 'animale', 'pădure'] },
    { q: 'Doctorul este pentru spital, așa cum profesorul este pentru:', a: 'școală', w: ['bibliotecă', 'muzeu', 'tribunal'] },
    { q: 'Ziua este pentru soare, așa cum noaptea este pentru:', a: 'lună', w: ['ploaie', 'vânt', 'ceață'] },
    { q: 'Apa este pentru pește, așa cum aerul este pentru:', a: 'pasăre', w: ['piatră', 'copac', 'nisip'] },
    { q: 'Cald este antonimul lui rece, așa cum rapid este antonimul lui:', a: 'lent', w: ['mare', 'puternic', 'cald'] },
    { q: 'Mașina folosește benzină, așa cum corpul uman folosește:', a: 'hrană', w: ['apă distilată', 'oxid', 'metal'] },
    { q: 'Ochii sunt organul văzului, așa cum urechile sunt organul:', a: 'auzului', w: ['mirosului', 'gustului', 'pipăitului'] },
    { q: 'Copilul devine adult, așa cum ghinda devine:', a: 'stejar', w: ['floare', 'iarbă', 'trandafir'] },
    { q: 'Triunghi are 3 laturi, așa cum octogon are:', a: '8 laturi', w: ['6 laturi', '4 laturi', '5 laturi'] },
    { q: 'Iarna este asociată cu zăpada, așa cum vara este asociată cu:', a: 'căldura', w: ['frunzele', 'ploaia', 'vântul'] },
    { q: 'Cuvintele alcătuiesc propoziții, așa cum notele alcătuiesc:', a: 'melodii', w: ['culori', 'imagini', 'tablouri'] },
    { q: 'Medicul vindecă boli, așa cum avocatul:', a: 'apără clienți', w: ['repară mașini', 'construiește case', 'predă lecții'] },
    { q: 'Foarfeca taie hârtia, așa cum toporul taie:', a: 'lemnul', w: ['apa', 'sticla', 'metalul'] },
    { q: 'Alfabetul are litere, așa cum calendarul are:', a: 'zile', w: ['culori', 'sunete', 'parfumuri'] },
  ]

  analogies.forEach(({ q, a, w }) => {
    const opts = shuffle([a, ...w])
    questions.push({
      institution: institution as TestQuestion['institution'],
      category: 'logic',
      question_text: q,
      options: opts,
      correct_answer: opts.indexOf(a),
      explanation: `Răspunsul corect este "${a}".`,
      difficulty: 2,
      metadata: { type: 'analogy' },
      is_active: true,
    })
  })

  // Syllogisms
  const syllogisms = [
    { q: 'Toți studenții învață. Andrei este student. Concluzie:', a: 'Andrei învață', w: ['Andrei nu învață', 'Unii studenți nu învață', 'Andrei poate că învață'] },
    { q: 'Niciun pește nu poate zbura. Rechinul este un pește. Concluzie:', a: 'Rechinul nu poate zbura', w: ['Rechinul poate zbura', 'Unii rechini zboară', 'Nu știm dacă rechinul zboară'] },
    { q: 'Toate mamiferele sunt animale. Câinele este mamifer. Concluzie:', a: 'Câinele este animal', w: ['Câinele nu este animal', 'Unii câini sunt animale', 'Câinele poate fi animal'] },
    { q: 'Dacă plouă, strada se udă. Strada este udă. Concluzie:', a: 'Nu putem concluziona că plouă', w: ['Plouă cu certitudine', 'Nu plouă', 'Strada nu este udă'] },
    { q: 'Toți politicienii sunt oameni. Unii oameni sunt corupți. Concluzie:', a: 'Nu putem concluziona că toți politicienii sunt corupți', w: ['Toți politicienii sunt corupți', 'Niciun politician nu este corupt', 'Politicienii sunt cei mai corupți'] },
    { q: 'Nicio pasăre nu este reptilă. Șarpele este reptilă. Concluzie:', a: 'Șarpele nu este pasăre', w: ['Șarpele este pasăre', 'Unii șerpi sunt păsări', 'Reptilele sunt păsări'] },
    { q: 'Dacă temperatura scade sub 0°C, apa îngheață. Temperatura este -5°C. Concluzie:', a: 'Apa îngheață', w: ['Apa nu îngheață', 'Apa fierbe', 'Nu putem ști ce se întâmplă'] },
    { q: 'Toți elevii din clasa a 10-a au trecut examenul. Maria este în clasa a 10-a. Concluzie:', a: 'Maria a trecut examenul', w: ['Maria nu a trecut examenul', 'Maria poate că a trecut', 'Nu știm dacă Maria a trecut'] },
  ]

  syllogisms.forEach(({ q, a, w }) => {
    const opts = shuffle([a, ...w])
    questions.push({
      institution: institution as TestQuestion['institution'],
      category: 'logic',
      question_text: q,
      options: opts,
      correct_answer: opts.indexOf(a),
      explanation: `Concluzia corectă este: "${a}".`,
      difficulty: 3,
      metadata: { type: 'syllogism' },
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
