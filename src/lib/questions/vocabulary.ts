import type { TestQuestion } from '@/types'

type Q = Omit<TestQuestion, 'id' | 'created_at'>

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function q(
  institution: string,
  question_text: string,
  correct: string,
  wrong: [string, string, string],
  explanation: string,
  meta: Record<string, unknown> = {},
  difficulty: 1 | 2 | 3 = 2
): Q {
  const opts = shuffle([correct, ...wrong])
  return {
    institution: institution as Q['institution'],
    category: 'vocabulary',
    question_text,
    options: opts,
    correct_answer: opts.indexOf(correct),
    explanation,
    difficulty,
    metadata: meta,
    is_active: true,
  }
}

export function generateVocabularyQuestions(institution: string): Q[] {
  const questions: Q[] = []

  // ── SINONIME ──────────────────────────────────────────────────────────────
  const synonyms: [string, string, [string, string, string]][] = [
    ['abil', 'priceput', ['leneș', 'trist', 'zgomotos']],
    ['acerb', 'aspru', ['blând', 'vesel', 'moale']],
    ['afabil', 'prietenos', ['ursuz', 'distant', 'sever']],
    ['anost', 'plictisitor', ['interesant', 'amuzant', 'viu']],
    ['aprig', 'înfocat', ['calm', 'pasiv', 'rece']],
    ['ardoare', 'entuziasm', ['lene', 'indiferență', 'tristețe']],
    ['asiduu', 'perseverent', ['neglijent', 'distrat', 'leneș']],
    ['auster', 'sobru', ['vesel', 'colorat', 'luxos']],
    ['avar', 'zgârcit', ['generos', 'darnic', 'cheltuitor']],
    ['candid', 'naiv', ['viclean', 'calculat', 'inteligent']],
    ['chibzuit', 'prudent', ['nechibzuit', 'impulsiv', 'neglijent']],
    ['cinstit', 'onest', ['mincinos', 'corupt', 'perfid']],
    ['clarvăzător', 'perspicace', ['naiv', 'orb', 'distrat']],
    ['concis', 'succint', ['verbos', 'lung', 'detaliat']],
    ['credul', 'naiv', ['suspicios', 'sceptic', 'prudent']],
    ['dificil', 'complicat', ['ușor', 'simplu', 'clar']],
    ['diligent', 'harnic', ['leneș', 'neglijent', 'pasiv']],
    ['discret', 'rezervat', ['zgomotos', 'indiscret', 'evident']],
    ['eficient', 'productiv', ['ineficient', 'leneș', 'pasiv']],
    ['eminent', 'ilustru', ['obscur', 'mediocru', 'necunoscut']],
    ['enigmatic', 'misterios', ['clar', 'evident', 'simplu']],
    ['elocvent', 'convingător', ['mut', 'neclar', 'nesigur']],
    ['fastidios', 'pretențios', ['modest', 'simplu', 'mulțumit']],
    ['feroce', 'sălbatic', ['blând', 'domestic', 'calm']],
    ['fidel', 'loial', ['trădător', 'infidel', 'nesigur']],
    ['frivol', 'superficial', ['serios', 'profund', 'matur']],
    ['generos', 'darnic', ['zgârcit', 'avar', 'meschin']],
    ['habotnic', 'fanatic', ['tolerant', 'moderat', 'deschis']],
    ['imparțial', 'neutru', ['părtinitor', 'subiectiv', 'interesat']],
    ['insolent', 'impertinent', ['politicos', 'respectuos', 'modest']],
    ['laconic', 'concis', ['verbos', 'prolific', 'expansiv']],
    ['limpede', 'clar', ['tulbure', 'confuz', 'obscur']],
    ['metodic', 'sistematic', ['haotic', 'aleatoriu', 'dezordonat']],
    ['nociv', 'dăunător', ['benefic', 'util', 'sănătos']],
    ['obedient', 'supus', ['rebel', 'nesupus', 'independent']],
    ['pertinent', 'relevant', ['irelevant', 'fals', 'incorect']],
    ['recalcitrant', 'rebel', ['supus', 'docil', 'ascultător']],
    ['sârguincios', 'harnic', ['leneș', 'pasiv', 'nepăsător']],
    ['taciturn', 'tăcut', ['vorbăreț', 'zgomotos', 'comunicativ']],
    ['vehement', 'impetuos', ['calm', 'liniștit', 'echilibrat']],
  ]

  for (const [word, syn, wrong] of synonyms) {
    questions.push(q(
      institution,
      `Care este sinonimul cuvântului "${word}"?`,
      syn, wrong,
      `Sinonimul lui "${word}" este "${syn}".`,
      { type: 'synonym', word }
    ))
  }

  // ── ANTONIME ─────────────────────────────────────────────────────────────
  const antonyms: [string, string, [string, string, string]][] = [
    ['optimist', 'pesimist', ['realist', 'neutru', 'pasiv']],
    ['victorie', 'înfrângere', ['luptă', 'meci', 'concurs']],
    ['curaj', 'lașitate', ['forță', 'putere', 'energie']],
    ['abundență', 'lipsă', ['bogăție', 'surplus', 'exces']],
    ['adevăr', 'minciună', ['realitate', 'fapt', 'dovadă']],
    ['a accepta', 'a refuza', ['a lua', 'a primi', 'a cere']],
    ['zel', 'nepăsare', ['entuziasm', 'dorință', 'motivație']],
    ['a avansa', 'a regresa', ['a merge', 'a rămâne', 'a pleca']],
    ['limpede', 'tulbure', ['curat', 'pur', 'cristal']],
    ['a întări', 'a slăbi', ['a pune', 'a plasa', 'a adăuga']],
    ['spontan', 'premeditat', ['natural', 'direct', 'imediat']],
    ['a înflori', 'a se ofili', ['a crește', 'a apărea', 'a trăi']],
    ['vanitate', 'modestie', ['aroganță', 'mândrie', 'orgoliu']],
    ['a construi', 'a demola', ['a ridica', 'a fabrica', 'a produce']],
    ['inocent', 'vinovat', ['curat', 'pur', 'nevinovat']],
    ['generos', 'zgârcit', ['bogat', 'amabil', 'politicos']],
    ['a urca', 'a coborî', ['a merge', 'a fugi', 'a sări']],
    ['a iubi', 'a urî', ['a admira', 'a respecta', 'a aprecia']],
    ['vechi', 'nou', ['antic', 'uzat', 'deteriorat']],
    ['a aprinde', 'a stinge', ['a pune', 'a lăsa', 'a folosi']],
    ['curajos', 'laș', ['puternic', 'viteaz', 'hotărât']],
    ['prietenos', 'dușmănos', ['afabil', 'amabil', 'sociabil']],
    ['a câștiga', 'a pierde', ['a juca', 'a lupta', 'a participa']],
    ['tare', 'moale', ['dur', 'solid', 'rigid']],
    ['luminos', 'întunecos', ['strălucitor', 'clar', 'vizibil']],
  ]

  for (const [word, ant, wrong] of antonyms) {
    questions.push(q(
      institution,
      `Care este antonimul cuvântului "${word}"?`,
      ant, wrong,
      `Antonimul lui "${word}" este "${ant}".`,
      { type: 'antonym', word }
    ))
  }

  // ── DEFINIȚII ─────────────────────────────────────────────────────────────
  const definitions: [string, string, [string, string, string], 1 | 2 | 3][] = [
    ['ostilitate', 'atitudine dușmănoasă față de cineva', ['prietenie profundă', 'indiferență totală', 'admirație sinceră'], 2],
    ['empatie', 'capacitatea de a înțelege și împărtăși sentimentele altora', ['incapacitatea de a comunica', 'dorința de a domina', 'frica de necunoscut'], 2],
    ['reziliență', 'capacitatea de a te redresa după dificultăți', ['tendința de a evita problemele', 'incapacitatea de adaptare', 'refuzul de a lupta'], 3],
    ['altruism', 'preocupare dezinteresată pentru binele altora', ['grija exclusivă pentru sine', 'indiferența față de ceilalți', 'dorința de a acumula'], 2],
    ['pragmatism', 'orientare practică, bazată pe utilitate și rezultate concrete', ['ignorarea realității', 'gândire abstractă excesivă', 'refuzul compromisului'], 3],
    ['integritate', 'calitatea de a fi onest și cu principii morale solide', ['tendința de a minți', 'lipsa de principii', 'indiferența morală'], 2],
    ['coerență', 'concordanță logică între idei sau acțiuni', ['contradicție permanentă', 'haos total', 'improvizație constantă'], 2],
    ['tenacitate', 'perseverență în atingerea unui scop în ciuda obstacolelor', ['renunțare la primul obstacol', 'schimbarea constantă a obiectivelor', 'lipsa de ambiție'], 2],
    ['ambiguitate', 'calitatea de a avea mai multe înțelesuri posibile, echivoc', ['claritate absolută', 'precizie maximă', 'simplitate extremă'], 3],
    ['veracitate', 'calitatea de a spune adevărul, sinceritate', ['tendința de a exagera', 'lipsa de onestitate', 'incapacitatea de a comunica'], 3],
    ['circumspect', 'care acționează cu precauție, prudent', ['impulsiv și nesăbuit', 'nepăsător și distrat', 'agresiv și dominator'], 3],
    ['dilematic', 'care implică o alegere dificilă între două variante', ['simplu și evident', 'ușor de rezolvat', 'lipsit de importanță'], 3],
    ['peiorativ', 'care exprimă o judecată negativă, depreciativă', ['care laudă și apreciază', 'care este neutru', 'care exprimă admirație'], 3],
    ['paradox', 'afirmație aparent contradictorie care conține un adevăr', ['o eroare logică evidentă', 'o definiție simplă', 'o regulă matematică'], 3],
    ['ipocrizie', 'comportament de a pretinde calități sau convingeri pe care nu le ai', ['sinceritate extremă', 'curaj de a spune adevărul', 'coerență în acțiuni'], 2],
    ['consecvent', 'care acționează în acord cu principiile sale, fără abateri', ['schimbând des opiniile', 'lipsit de principii', 'imprevizibil și haotic'], 2],
    ['prolific', 'care produce mult, cu randament ridicat', ['cu producție minimă', 'inactiv și pasiv', 'selectiv și rar'], 3],
    ['oportun', 'care vine la momentul potrivit, binevenit', ['nepotrivit și inoportun', 'tardiv și depășit', 'prematur și grăbit'], 2],
    ['sever', 'care impune reguli stricte, exigent', ['indulgent și tolerant', 'pasiv și nepăsător', 'blând și permisiv'], 1],
    ['pertinent', 'care este relevant și la subiect', ['lipsit de relevanță', 'deplasat și inadecvat', 'confuz și neclar'], 2],
  ]

  for (const [word, def, wrong, diff] of definitions) {
    questions.push(q(
      institution,
      `Ce înseamnă cuvântul "${word}"?`,
      def, wrong,
      `"${word}" înseamnă: ${def}.`,
      { type: 'definition', word },
      diff
    ))
  }

  // ── EXPRESII ȘI LOCUȚIUNI ────────────────────────────────────────────────
  const expressions: [string, string, [string, string, string]][] = [
    ['A bate câmpii', 'a vorbi fără sens, a divaga', ['a munci câmpul', 'a se plimba', 'a fi distrat']],
    ['A tăia frunze la câini', 'a pierde timpul fără a face nimic util', ['a munci în grădină', 'a se relaxa deliberat', 'a fi eficient']],
    ['A da cu tifla', 'a-și bate joc, a sfida pe cineva', ['a lovi cu palma', 'a oferi un dar', 'a saluta respectuos']],
    ['A-și băga picioarele', 'a se implica fără să fi fost invitat', ['a merge cu picioarele goale', 'a câștiga un concurs', 'a lucra serios']],
    ['A lua taurul de coarne', 'a înfrunta direct o problemă dificilă', ['a evita pericolul', 'a merge la fermă', 'a cere ajutor']],
    ['A face din țânțar armăsar', 'a exagera o problemă minoră', ['a transforma un insect', 'a simplifica lucrurile', 'a găsi soluția corectă']],
    ['A pune punctul pe i', 'a clarifica o situație, a spune lucrurilor pe nume', ['a scrie un text', 'a face o greșeală', 'a crea confuzie']],
    ['A umbla cu vorba', 'a nu spune adevărul direct, a ocoli subiectul', ['a vorbi mult', 'a fi comunicativ', 'a-și exprima opinia']],
    ['A trage pe sfoară', 'a înșela pe cineva', ['a trage o sfoară fizic', 'a cânta o melodie', 'a ajuta pe cineva']],
    ['A fi cu capu-n nori', 'a fi visător, lipsit de simț practic', ['a fi înalt', 'a fi la altitudine', 'a fi concentrat']],
  ]

  for (const [expr, meaning, wrong] of expressions) {
    questions.push(q(
      institution,
      `Ce înseamnă expresia "${expr}"?`,
      meaning, wrong,
      `Expresia "${expr}" înseamnă: ${meaning}.`,
      { type: 'expression', word: expr },
      2
    ))
  }

  // ── COMPLETARE PROPOZIȚIE ────────────────────────────────────────────────
  const fillIn: [string, string, [string, string, string], string][] = [
    [
      'Candidatul a dat dovadă de multă ________ în pregătirea pentru examen, studiind zilnic câte 8 ore.',
      'perseverență',
      ['superficialitate', 'lene', 'neglijență'],
      'Perseverența înseamnă stăruință în atingerea unui scop, ceea ce descrie comportamentul din propoziție.'
    ],
    [
      'Răspunsul său a fost ________, cuprinzând toate informațiile necesare în doar două fraze.',
      'concis',
      ['prolific', 'verbos', 'confuz'],
      'Concis = exprimat în puține cuvinte, fără detalii inutile.'
    ],
    [
      'Deși situația era complicată, a reacționat cu ________, fără să-și piardă calmul.',
      'serenitate',
      ['panică', 'furie', 'tristețe'],
      'Serenitate = stare de liniște și calm sufletesc.'
    ],
    [
      'Opinia sa era ________ — putea fi interpretată în mai multe moduri.',
      'ambiguă',
      ['clară', 'precisă', 'corectă'],
      'Ambiguu = care poate fi înțeles în mai multe feluri, echivoc.'
    ],
    [
      'Prin acțiunile sale ________, și-a câștigat respectul colegilor.',
      'integre',
      ['dubioase', 'incorecte', 'ilegale'],
      'Integru = onest, cu principii morale solide.'
    ],
    [
      'Decizia sa a fost ________, venind exact când era nevoie de ea.',
      'oportună',
      ['întârziată', 'prematură', 'greșită'],
      'Oportun = care vine la momentul potrivit.'
    ],
  ]

  for (const [text, correct, wrong, explanation] of fillIn) {
    questions.push(q(
      institution,
      text,
      correct, wrong,
      explanation,
      { type: 'fill-in' },
      2
    ))
  }

  // ── SENS FIGURAT vs PROPRIU ───────────────────────────────────────────────
  const figurative: [string, string, string, [string, string, string]][] = [
    ['un om de gheață', 'figurat', 'o persoană rece, insensibilă emoțional', ['o persoană care lucrează cu gheața', 'un om care tolerează frigul', 'un om cu temperatura scăzută']],
    ['a plânge cu lacrimi de crocodil', 'figurat', 'a simula tristețea sau compasiunea', ['a plânge la un film despre crocodili', 'a plânge în timp ce înoți', 'a plânge abundent']],
    ['un cap limpede', 'figurat', 'o persoană cu judecată clară și logică', ['o persoană cu părul curat', 'o persoană cu fața spălată', 'o persoană cu privirea clară']],
    ['a-și vinde sufletul', 'figurat', 'a face compromisuri morale grave pentru câștiguri materiale', ['a face o afacere spirituală', 'a fi generos', 'a ajuta pe cineva']],
  ]

  for (const [expr, usage, meaning, wrong] of figurative) {
    questions.push(q(
      institution,
      `Expresia "${expr}" este folosită în sens ${usage}. Ce înseamnă?`,
      meaning, wrong,
      `"${expr}" (sens ${usage}) înseamnă: ${meaning}.`,
      { type: 'figurative', word: expr },
      3
    ))
  }

  // ── FAMILIE LEXICALĂ ─────────────────────────────────────────────────────
  const lexical: [string, string, [string, string, string]][] = [
    ['Din cuvântul "frumos" derivă:', 'frumusețe, a înfrumuseța, frumusel', ['frumositate, frumușeală, frumoșenie', 'înfrumusețare, frumoasă, frumuselos', 'frumusire, frumusel, înfrumușat']],
    ['Care cuvânt NU face parte din familia lexicală a cuvântului "a lucra"?', 'luciu', ['lucrare', 'lucrător', 'lucru']],
    ['Din cuvântul "bun" derivă:', 'bunătate, bunăvoință, binemeritat', ['buneal, bunime, bunescă', 'bunărate, bunate, buniscă', 'bunaș, bunescă, bunime']],
  ]

  for (const [question_text, correct, wrong] of lexical) {
    questions.push(q(
      institution,
      question_text,
      correct, wrong,
      `Răspuns corect: ${correct}.`,
      { type: 'lexical-family' },
      3
    ))
  }

  return questions
}
