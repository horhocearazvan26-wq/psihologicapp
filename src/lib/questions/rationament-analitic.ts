export interface QuestionRow {
  institution: string
  category: string
  question_text: string
  options: string[]
  correct_answer: number
  explanation: string
  difficulty: 1 | 2 | 3
  metadata: Record<string, unknown>
  is_active: boolean
}

const items: Omit<QuestionRow, 'institution'>[] = [
  {
    category: 'rationament-analitic',
    question_text: 'Toți vertebratele sunt animale.\nToți peștii sunt vertebrate.\nCare dintre următoarele propoziții rezultă în mod necesar din aceste premise?',
    options: [
      'Toți animalele sunt pești.',
      'Toți peștii sunt animale.',
      'Unii pești nu sunt animale.',
      'Niciun pește nu este animal.',
    ],
    correct_answer: 1,
    explanation: 'Forma Barbara: Toți M sunt P, Toți S sunt M → Toți S sunt P. Peștii sunt un subset al vertebratelor, care sunt un subset al animalelor.',
    difficulty: 1,
    metadata: {},
    is_active: true,
  },
  {
    category: 'rationament-analitic',
    question_text: 'Nicio reptilă nu este homeoterm.\nToți crocodilii sunt reptile.\nCare propoziție rezultă în mod necesar?',
    options: [
      'Unii crocodili sunt homeoterni.',
      'Toți homeotermii sunt reptile.',
      'Niciun crocodil nu este homeoterm.',
      'Unele reptile sunt homeotermii.',
    ],
    correct_answer: 2,
    explanation: 'Forma Celarent: Niciun M nu este P, Toți S sunt M → Niciun S nu este P. Dacă nicio reptilă nu este homeoterm și toți crocodilii sunt reptile, atunci niciun crocodil nu este homeoterm.',
    difficulty: 1,
    metadata: {},
    is_active: true,
  },
  {
    category: 'rationament-analitic',
    question_text: 'Toți compușii organici conțin carbon.\nUnii pigmenți naturali sunt compuși organici.\nCare propoziție rezultă în mod necesar?',
    options: [
      'Toți pigmenții naturali conțin carbon.',
      'Niciun pigment natural nu conține carbon.',
      'Unii pigmenți naturali conțin carbon.',
      'Toți compușii care conțin carbon sunt pigmenți.',
    ],
    correct_answer: 2,
    explanation: 'Forma Darii: Toți M sunt P, Unii S sunt M → Unii S sunt P. Acei pigmenți care sunt compuși organici conțin carbon.',
    difficulty: 1,
    metadata: {},
    is_active: true,
  },
  {
    category: 'rationament-analitic',
    question_text: 'Nicio sursă de energie regenerabilă nu produce deșeuri radioactive.\nUnele centrale electrice produc deșeuri radioactive.\nCare propoziție rezultă în mod necesar?',
    options: [
      'Unele centrale electrice nu sunt surse de energie regenerabilă.',
      'Toate centralele electrice sunt surse de energie regenerabilă.',
      'Nicio centrală electrică nu este sursă de energie regenerabilă.',
      'Unele surse de energie regenerabilă produc deșeuri radioactive.',
    ],
    correct_answer: 0,
    explanation: 'Forma Ferio: Niciun M nu este P, Unii S sunt P → Unii S nu sunt M. Acele centrale care produc deșeuri radioactive nu pot fi surse regenerabile.',
    difficulty: 2,
    metadata: {},
    is_active: true,
  },
  {
    category: 'rationament-analitic',
    question_text: 'Toți mammalele sunt homeotermii.\nToți delfinii sunt mamifere.\nToți homeotermii au metabolism ridicat.\nCare propoziție rezultă în mod necesar?',
    options: [
      'Unii delfini au metabolism ridicat.',
      'Toți delfinii au metabolism ridicat.',
      'Unii homeotermii sunt delfini.',
      'Niciun delfin nu are metabolism ridicat.',
    ],
    correct_answer: 1,
    explanation: 'Lanț silogistic: Delfini → Mamifere → Homeotermii → Metabolism ridicat. Toți delfinii au în mod necesar metabolism ridicat.',
    difficulty: 2,
    metadata: {},
    is_active: true,
  },
  {
    category: 'rationament-analitic',
    question_text: 'Toți mineralii din clasa a VII-a au duritate peste 7 pe scara Mohs.\nNicio substanță cu duritate sub 5 nu poate zgâria sticla.\nDiamanul are duritate 10 pe scara Mohs.\nCe putem concluziona despre diamant?',
    options: [
      'Diamantul nu poate zgâria sticla.',
      'Diamantul poate zgâria sticla.',
      'Diamantul este o substanță organică.',
      'Nu putem stabili nimic despre diamant din aceste premise.',
    ],
    correct_answer: 1,
    explanation: 'Diamantul are duritate 10 > 5, deci nu se află în categoria substanțelor cu duritate sub 5 care nu pot zgâria sticla. Prin contra-pozitivă, el poate zgâria sticla.',
    difficulty: 2,
    metadata: {},
    is_active: true,
  },
  {
    category: 'rationament-analitic',
    question_text: 'Unii filozofi greci au influențat gândirea medievală.\nToți influențatorii gândirii medievale au fost studiați de scolastici.\nCare propoziție rezultă în mod necesar?',
    options: [
      'Toți filozofii greci au fost studiați de scolastici.',
      'Niciun filozof grec nu a fost studiat de scolastici.',
      'Unii filozofi greci au fost studiați de scolastici.',
      'Toți scolasticii au studiat filozofia greacă.',
    ],
    correct_answer: 2,
    explanation: 'Unii filozofi greci au influențat gândirea medievală (premisa 1), iar toți cei care au influențat gândirea medievală au fost studiați de scolastici (premisa 2). Prin urmare, acei filozofi greci care au influențat gândirea medievală au fost studiați de scolastici.',
    difficulty: 2,
    metadata: {},
    is_active: true,
  },
  {
    category: 'rationament-analitic',
    question_text: 'Toți compușii cu legătură dublă carbon-carbon sunt nesaturați.\nNicio grăsime saturată nu conține legătură dublă carbon-carbon.\nUleiurile vegetale sunt nesaturate.\nCe putem stabili cu certitudine?',
    options: [
      'Uleiurile vegetale sunt grăsimi saturate.',
      'Nicio grăsime saturată nu este nesaturată.',
      'Toți compușii nesaturați sunt uleiuri vegetale.',
      'Grăsimile saturate nu au legătură dublă C=C, deci nu sunt nesaturate prin definiție.',
    ],
    correct_answer: 3,
    explanation: 'Din premise: saturate → fără legătură dublă C=C; fără legătură dublă C=C → nu nesaturat (contrapoziție). Deci saturate → nu nesaturate. Opțiunea D exprimă corect această concluzie.',
    difficulty: 3,
    metadata: {},
    is_active: true,
  },
  {
    category: 'rationament-analitic',
    question_text: 'Dacă o teorie este falsificabilă, atunci poate fi testată empiric.\nDacă o teorie poate fi testată empiric, atunci este știință.\nAstrologia nu este știință.\nCe putem concluziona?',
    options: [
      'Astrologia este falsificabilă.',
      'Astrologia nu poate fi testată empiric sau nu este falsificabilă.',
      'Toate teoriile falsificabile sunt astrologie.',
      'Nicio știință nu este falsificabilă.',
    ],
    correct_answer: 1,
    explanation: 'Prin modus tollens aplicat în lanț: Știință ← Testabilă empiric ← Falsificabilă. Deoarece Astrologia ≠ Știință, rezultă că Astrologia nu este testabilă empiric sau nu este falsificabilă (cel puțin una din condiții trebuie să eșueze).',
    difficulty: 3,
    metadata: {},
    is_active: true,
  },
  {
    category: 'rationament-analitic',
    question_text: 'Toți generalii victorioși au studiat istoria militară.\nUnii generali victorioși au luptat în Primul Război Mondial.\nToți cei care au luptat în Primul Război Mondial au cunoscut tranșeele.\nCare concluzie este validă?',
    options: [
      'Toți cei care au studiat istoria militară au cunoscut tranșeele.',
      'Unii generali victorioși care au studiat istoria militară au cunoscut tranșeele.',
      'Niciun general victorios nu a cunoscut tranșeele.',
      'Toți generalii victorioși au cunoscut tranșeele.',
    ],
    correct_answer: 1,
    explanation: 'Acei generali victorioși care au luptat în WWI (unii) → au studiat istoria militară (toți generalii victorioși o fac) ȘI au cunoscut tranșeele. Deci unii generali victorioși au cunoscut tranșeele și au studiat istoria militară.',
    difficulty: 3,
    metadata: {},
    is_active: true,
  },
  {
    category: 'rationament-analitic',
    question_text: 'Toți agenții de informații operează sub acoperire.\nNicio persoană care operează sub acoperire nu poate confirma identitatea sa publică.\nUnii diplomați sunt agenți de informații.\nCare propoziție rezultă în mod necesar?',
    options: [
      'Toți diplomații operează sub acoperire.',
      'Niciun diplomat nu poate confirma identitatea sa publică.',
      'Unii diplomați nu pot confirma identitatea lor publică.',
      'Toți cei care nu pot confirma identitatea lor sunt diplomați.',
    ],
    correct_answer: 2,
    explanation: 'Unii diplomați sunt agenți → operează sub acoperire → nu pot confirma identitatea publică. Deci unii diplomați nu pot confirma identitatea lor publică.',
    difficulty: 3,
    metadata: {},
    is_active: true,
  },
  {
    category: 'rationament-analitic',
    question_text: 'Dacă presiunea atmosferică scade brusc, atunci se formează nori de furtună.\nDacă se formează nori de furtună, atunci probabilitatea de precipitații crește.\nPresiunea atmosferică nu a scăzut brusc.\nCe putem concluziona cu certitudine?',
    options: [
      'Nu s-au format nori de furtună.',
      'Probabilitatea de precipitații nu a crescut.',
      'Nu putem stabili cu certitudine dacă s-au format nori de furtună.',
      'Nu există nori de furtună și nu există precipitații.',
    ],
    correct_answer: 2,
    explanation: 'Negarea antecedentului (fallacy of denying the antecedent): P→Q, ¬P nu implică ¬Q. Norii de furtună pot apărea și din alte cauze. Nu putem concluziona nimic cert despre starea norilor.',
    difficulty: 3,
    metadata: {},
    is_active: true,
  },
]

export function generateRationamentAnalitic(institution: string): QuestionRow[] {
  return items.map(item => ({ ...item, institution }))
}
