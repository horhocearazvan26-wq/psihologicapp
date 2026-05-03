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
    category: 'vocabular',
    question_text,
    options,
    correct_answer,
    explanation,
    difficulty,
    metadata,
    is_active: true,
  }
}

const synonymPairs: Array<[string, string, string[]]> = [
  ['perspicace', 'sagace', ['obtuz', 'inept', 'superficial']],
  ['reticent', 'rezervat', ['impulsiv', 'elocvent', 'expansiv']],
  ['laconic', 'concis', ['prolix', 'ambiguu', 'ostentativ']],
  ['tenace', 'perseverent', ['ezitant', 'frivol', 'instabil']],
  ['veridic', 'adevărat', ['aproximativ', 'fals', 'insinuant']],
  ['prolific', 'productiv', ['steril', 'rar', 'imprecis']],
  ['frugal', 'cumpătat', ['extravagant', 'abundent', 'ostentativ']],
  ['auster', 'sobru', ['extravagant', 'ornamental', 'lax']],
  ['contingent', 'accidental', ['esențial', 'obligatoriu', 'inerent']],
  ['elocvent', 'convingător', ['confuz', 'reținut', 'banal']],
  ['arid', 'sec', ['abundent', 'colorat', 'bogat']],
  ['probitate', 'integritate', ['naivitate', 'aversiune', 'celeritate']],
]

const antonymPairs: Array<[string, string, string[]]> = [
  ['peren', 'efemer', ['durabil', 'constant', 'statornic']],
  ['auster', 'extravagant', ['meticulos', 'ponderat', 'laconic']],
  ['pertinent', 'irelevant', ['concis', 'evident', 'coerent']],
  ['avid', 'dezinteresat', ['tenace', 'abundent', 'frugal']],
  ['lucid', 'confuz', ['vehement', 'reticent', 'meticulos']],
  ['flexibil', 'rigid', ['marginal', 'efemer', 'taciturn']],
  ['empatic', 'insensibil', ['rezervat', 'tenace', 'erudit']],
  ['coerent', 'incoerent', ['metodic', 'veridic', 'consistent']],
  ['progresiv', 'regresiv', ['ponderat', 'didactic', 'colateral']],
  ['explicit', 'implicit', ['lucid', 'retoric', 'amplu']],
]

const definitionItems: Array<[string, string, string[], string, Difficulty]> = [
  [
    'Ce înseamnă termenul HEURISTIC?',
    'Metodă de rezolvare prin explorare și reguli practice, fără garanția soluției optime',
    [
      'Metodă strict formală de demonstrare a teoremelor',
      'Tehnică de memorare bazată pe repetiție mecanică',
      'Procedeu de eliminare a erorilor din argumentare',
    ],
    'Heuristic desemnează strategii practice de descoperire și rezolvare, utile mai ales când algoritmul optim nu este imediat disponibil.',
    3 as Difficulty,
  ],
  [
    'Ambiguitatea se referă la:',
    'Caracterul unui enunț care permite mai multe interpretări',
    [
      'Prezența simultană a două emoții opuse',
      'Incapacitatea de a învăța o regulă nouă',
      'Tendința de a folosi doar termeni generali',
    ],
    'Ambiguitatea descrie un mesaj sau o situație care poate fi înțeleasă în mai multe moduri.',
    2 as Difficulty,
  ],
  [
    'Ce desemnează termenul APOCRIF?',
    'Text sau document a cărui autenticitate este contestată',
    [
      'Text considerat obligatoriu de doctrina oficială',
      'Document redactat anonim, dar autentificat ulterior',
      'Mesaj criptat destinat doar inițiaților',
    ],
    'Apocrif desemnează o sursă de origine incertă sau contestată, adesea exclusă din corpusul autentic.',
    3 as Difficulty,
  ],
  [
    'Tautologia este:',
    'O formulare redundantă care repetă același conținut',
    [
      'O contradicție logică internă',
      'O eroare de calcul derivată din premise false',
      'O analogie bazată pe asemănări superficiale',
    ],
    'În limbaj curent, tautologia este o repetare inutilă a aceleiași idei; în logică, este o propoziție adevărată prin forma ei.',
    3 as Difficulty,
  ],
  [
    'Termenul EPICENTRU este utilizat corect atunci când indică:',
    'Punctul de la suprafață situat deasupra focarului unui cutremur',
    [
      'Locul din adâncime unde se produce cutremurul',
      'Zona în care undele seismice dispar complet',
      'Centrul administrativ al unei regiuni expuse seismelor',
    ],
    'Epicentrul este proiecția focarului la suprafața Pământului; focarul din adâncime este hipocentrul.',
    2 as Difficulty,
  ],
  [
    'Ce înseamnă AD HOC?',
    'Conceput special pentru o situație particulară',
    [
      'Validat prin tradiție și uz îndelungat',
      'Conform unui principiu universal aplicabil',
      'Realizat sub presiune și fără discernământ',
    ],
    'Ad hoc înseamnă „pentru aceasta”: creat pentru un context precis, fără pretenția de generalitate.',
    2 as Difficulty,
  ],
]

const contextualItems: Array<[string, string, string[], string, Difficulty]> = [
  [
    'În enunțul „Raportul său a fost succint, dar nu lacunar”, cuvântul „lacunar” este cel mai apropiat ca sens de:',
    'incomplet',
    ['amplu', 'meticulos', 'retoric'],
    'Un raport lacunar este unul cu goluri, omisiuni sau lipsuri relevante de conținut.',
    3 as Difficulty,
  ],
  [
    'În contextul „un argument falacios”, termenul „falacios” înseamnă:',
    'care pare valid, dar este înșelător',
    [
      'care este adevărat prin definiție',
      'care pornește din premise incontestabile',
      'care este pur descriptiv și lipsit de concluzii',
    ],
    'Un argument falacios are aparența validității, dar conține o eroare de raționament sau o manipulare conceptuală.',
    3 as Difficulty,
  ],
  [
    'În formula „o afirmație peremptorie”, adjectivul „peremptorie” sugerează că afirmația este:',
    'categorică și nu lasă loc de replică',
    ['ezitantă și vagă', 'metaforică și ornamentată', 'marginală și secundară'],
    'O afirmație peremptorie este formulată ferm, categoric și fără deschidere spre nuanțare.',
    3 as Difficulty,
  ],
  [
    'Dacă un comportament este descris drept „circumspect”, el este:',
    'prudent și atent',
    ['impulsiv și precipitat', 'frivol și superficial', 'rigid și inflexibil'],
    'Circumspect înseamnă precaut, atent la riscuri și la implicații.',
    2 as Difficulty,
  ],
  [
    'În expresia „un lider carismatic”, termenul „carismatic” se referă la:',
    'capacitatea de a inspira și atrage adepți prin prezență personală',
    [
      'aptitudinea de a respecta riguros procedurile',
      'abilitatea de a rezolva rapid probleme matematice',
      'tendința de a evita expunerea publică',
    ],
    'Carisma este o formă de influență interpersonală bazată pe prezență, expresivitate și putere de atracție socială.',
    2 as Difficulty,
  ],
  [
    'În propoziția „decizia a fost arbitrară”, adjectivul „arbitrară” sugerează că ea a fost:',
    'luată fără un criteriu clar sau justificare solidă',
    [
      'luată prin consultare colectivă',
      'stabilită pe baza unei proceduri legale riguroase',
      'susținută de probe experimentale puternice',
    ],
    'Arbitrar desemnează ceva impus fără fundament suficient sau fără reguli coerente.',
    2 as Difficulty,
  ],
]

const items: QuestionDraft[] = ensureUniqueByText([
  ...synonymPairs.map(([word, synonym, distractors]) =>
    makeQuestion(
      `Care dintre cuvintele de mai jos este sinonim cu ${word.toUpperCase()}?`,
      synonym,
      distractors,
      `${word} are sens apropiat de „${synonym}”, în timp ce celelalte variante aparțin altor câmpuri semantice.`,
      2,
      { family: 'sinonim' }
    )
  ),
  ...antonymPairs.map(([word, antonym, distractors]) =>
    makeQuestion(
      `Care dintre variante este antonimul cel mai potrivit pentru ${word.toUpperCase()}?`,
      antonym,
      distractors,
      `Antonimul lui ${word} este „${antonym}”, adică termenul cu sens opus în context semantic apropiat.`,
      2,
      { family: 'antonim' }
    )
  ),
  ...definitionItems.map(([question, correct, distractors, explanation, difficulty]) =>
    makeQuestion(question, correct, distractors, explanation, difficulty, { family: 'definitie' })
  ),
  ...contextualItems.map(([question, correct, distractors, explanation, difficulty]) =>
    makeQuestion(question, correct, distractors, explanation, difficulty, { family: 'context' })
  ),
])

export function generateVocabular(institution: string): QuestionRow[] {
  return attachInstitution(items, institution)
}
