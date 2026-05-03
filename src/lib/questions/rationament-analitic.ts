import {
  attachInstitution,
  buildMcqOptions,
  ensureUniqueByText,
  type Difficulty,
  type QuestionDraft,
} from './helpers'

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

function makeQuestion(
  premises: string[],
  stem: string,
  correct: string,
  distractors: string[],
  explanation: string,
  difficulty: Difficulty,
  metadata: Record<string, unknown> = {}
): QuestionDraft {
  const question_text = `${premises.join('\n')}\n${stem}`
  const { options, correct_answer } = buildMcqOptions(correct, distractors, question_text)
  return {
    category: 'rationament-analitic',
    question_text,
    options,
    correct_answer,
    explanation,
    difficulty,
    metadata,
    is_active: true,
  }
}

function universalChainQuestions(): QuestionDraft[] {
  const configs = [
    ['Toți astronomii sunt oameni de știință.', 'Toți cosmologii sunt astronomi.', 'Toți cosmologii sunt oameni de știință.'],
    ['Toate aliajele feroase conțin fier.', 'Toate oțelurile inoxidabile sunt aliaje feroase.', 'Toate oțelurile inoxidabile conțin fier.'],
    ['Toate organismele eucariote au nucleu celular.', 'Toate ciupercile sunt organisme eucariote.', 'Toate ciupercile au nucleu celular.'],
    ['Toți judecătorii sunt magistrați.', 'Toți președinții de complet sunt judecători.', 'Toți președinții de complet sunt magistrați.'],
    ['Toate fluviile navigabile sunt căi de transport strategic.', 'Dunărea este un fluviu navigabil.', 'Dunărea este o cale de transport strategic.'],
  ]

  return configs.map(([p1, p2, correct]) =>
    makeQuestion(
      [p1, p2],
      'Care dintre următoarele concluzii rezultă în mod necesar?',
      correct,
      [
        p1.replace('Toți', 'Unii'),
        p2.replace('Toți', 'Niciun'),
        `Nu putem stabili dacă ${correct.toLowerCase()}`,
      ],
      'Structura este una de tip Barbara: Toți M sunt P, Toți S sunt M, deci Toți S sunt P.',
      1,
      { family: 'universal-chain' }
    )
  )
}

function universalNegativeQuestions(): QuestionDraft[] {
  const configs = [
    ['Nicio reptilă nu este homeotermă.', 'Toți crocodilii sunt reptile.', 'Niciun crocodil nu este homeoterm.'],
    ['Niciun material radioactiv neizolat nu este sigur pentru manipulare directă.', 'Toate barele de combustibil expuse sunt materiale radioactive neizolate.', 'Nicio bară de combustibil expusă nu este sigură pentru manipulare directă.'],
    ['Niciun arbitru în conflict de interese nu poate valida verdictul.', 'Toți evaluatorii care dețin acțiuni în companie sunt în conflict de interese.', 'Niciun evaluator care deține acțiuni în companie nu poate valida verdictul.'],
    ['Niciun compus saturat nu conține legături duble C=C.', 'Toate parafinele sunt compuși saturați.', 'Nicio parafină nu conține legături duble C=C.'],
  ]

  return configs.map(([p1, p2, correct]) =>
    makeQuestion(
      [p1, p2],
      'Ce rezultă cu necesitate din premise?',
      correct,
      [
        correct.replace('Niciun', 'Unii'),
        p2.replace('Toate', 'Unele'),
        'Nu se poate formula nicio concluzie validă',
      ],
      'Structura este de tip Celarent: Niciun M nu este P, Toți S sunt M, deci Niciun S nu este P.',
      2,
      { family: 'universal-negative' }
    )
  )
}

function particularInferenceQuestions(): QuestionDraft[] {
  const configs = [
    ['Unii cercetători în neuroștiințe lucrează cu imagistică funcțională.', 'Toți cei care lucrează cu imagistică funcțională utilizează seturi mari de date.', 'Unii cercetători în neuroștiințe utilizează seturi mari de date.'],
    ['Unii senatori sunt juriști.', 'Toți juriștii cunosc tehnica argumentării.', 'Unii senatori cunosc tehnica argumentării.'],
    ['Unele bacterii extremofile trăiesc în medii cu aciditate ridicată.', 'Toate organismele care trăiesc în medii cu aciditate ridicată au mecanisme speciale de adaptare.', 'Unele bacterii extremofile au mecanisme speciale de adaptare.'],
    ['Unele decizii administrative produc efecte retroactive.', 'Toate deciziile care produc efecte retroactive sunt contestabile în instanță.', 'Unele decizii administrative sunt contestabile în instanță.'],
  ]

  return configs.map(([p1, p2, correct]) =>
    makeQuestion(
      [p1, p2],
      'Care concluzie este validă logic?',
      correct,
      [
        correct.replace('Unii', 'Toți'),
        p2.replace('Toate', 'Nicio'),
        'Nu se poate extrage nicio concluzie particulară',
      ],
      'Forma este de tip Darii: Unii S sunt M, Toți M sunt P, deci Unii S sunt P.',
      2,
      { family: 'particular-inference' }
    )
  )
}

function conditionalQuestions(): QuestionDraft[] {
  return [
    makeQuestion(
      [
        'Dacă un sistem este criptat end-to-end, atunci conținutul mesajelor nu poate fi citit de un intermediar.',
        'Dacă un intermediar nu poate citi conținutul mesajelor, atunci interceptarea pasivă devine inutilă.',
        'Sistemul X este criptat end-to-end.',
      ],
      'Care concluzie rezultă cu necesitate?',
      'Interceptarea pasivă devine inutilă în sistemul X.',
      [
        'Sistemul X nu poate fi compromis în niciun mod.',
        'Orice sistem criptat este imun la atacuri active.',
        'Nu se poate concluziona nimic despre interceptarea pasivă.',
      ],
      'Aplicăm de două ori modus ponens pe lanțul condițional: P→Q, Q→R, P, deci R.',
      2,
      { family: 'conditional-chain' }
    ),
    makeQuestion(
      [
        'Dacă un raport este falsificabil, atunci poate fi testat empiric.',
        'Dacă poate fi testat empiric, atunci intră în domeniul științei.',
        'Astrologia nu intră în domeniul științei.',
      ],
      'Ce concluzie este cel mai bine susținută logic?',
      'Astrologia nu poate fi testată empiric sau nu este falsificabilă.',
      [
        'Astrologia este în mod cert falsificabilă.',
        'Toate teoriile științifice sunt astrologice.',
        'Nu există nicio relație între testabilitate și știință.',
      ],
      'Prin contrapoziție și modus tollens, dacă Știință este consecința testabilității, absența apartenenței la știință ne împiedică să afirmăm testabilitatea sau falsificabilitatea.',
      3,
      { family: 'conditional-chain' }
    ),
    makeQuestion(
      [
        'Dacă presiunea atmosferică scade rapid, atunci se formează nori de furtună.',
        'Presiunea atmosferică nu a scăzut rapid.',
      ],
      'Ce putem afirma cu certitudine?',
      'Nu putem stabili cu certitudine dacă s-au format nori de furtună.',
      [
        'Nu s-au format nori de furtună.',
        'Probabilitatea de precipitații este nulă.',
        'Cerul este sigur senin.',
      ],
      'Negarea antecedentului nu permite inferența negării consecventului; furtuna ar putea apărea și din alte cauze.',
      3,
      { family: 'fallacy' }
    ),
  ]
}

function comparisonQuestions(): QuestionDraft[] {
  return [
    makeQuestion(
      [
        'Andrei este mai înalt decât Bogdan.',
        'Bogdan este mai înalt decât Cătălin.',
      ],
      'Care dintre concluzii este necesară?',
      'Andrei este mai înalt decât Cătălin.',
      [
        'Cătălin este mai înalt decât Andrei.',
        'Bogdan și Andrei au aceeași înălțime.',
        'Nu se poate compara Andrei cu Cătălin.',
      ],
      'Este un silogism liniar de tip tranzitiv: dacă A > B și B > C, atunci A > C.',
      1,
      { family: 'comparatie-lineara' }
    ),
    makeQuestion(
      [
        'Documentul A este mai recent decât documentul B.',
        'Documentul B este mai recent decât documentul C.',
        'Documentul C este mai recent decât documentul D.',
      ],
      'Ce concluzie rezultă cu necesitate?',
      'Documentul A este mai recent decât documentul D.',
      [
        'Documentul D este mai recent decât documentul A.',
        'Documentul B este mai vechi decât documentul D.',
        'Nu se poate stabili ordinea dintre A și D.',
      ],
      'Ordinea temporală este tranzitivă pe întreg lanțul: A > B > C > D, deci A > D.',
      2,
      { family: 'comparatie-lineara' }
    ),
  ]
}

const items: QuestionDraft[] = ensureUniqueByText([
  ...universalChainQuestions(),
  ...universalNegativeQuestions(),
  ...particularInferenceQuestions(),
  ...conditionalQuestions(),
  ...comparisonQuestions(),
])

export function generateRationamentAnalitic(institution: string): QuestionRow[] {
  return attachInstitution(items, institution)
}
