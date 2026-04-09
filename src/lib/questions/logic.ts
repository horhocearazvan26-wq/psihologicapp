import type { TestQuestion } from '@/types'

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function analogy(q: string, a: string, w: string[]): Omit<TestQuestion, 'id' | 'created_at'> {
  const opts = shuffle([a, ...w])
  return {
    institution: 'MAI' as TestQuestion['institution'],
    category: 'logic',
    question_text: q,
    options: opts,
    correct_answer: opts.indexOf(a),
    explanation: `Răspunsul corect este "${a}".`,
    difficulty: 2,
    metadata: { type: 'analogy' },
    is_active: true,
  }
}

function series(seq: (number | string)[], next: string, wrong: string[], rule: string): Omit<TestQuestion, 'id' | 'created_at'> {
  const opts = shuffle([next, ...wrong])
  return {
    institution: 'MAI' as TestQuestion['institution'],
    category: 'logic',
    question_text: `Care este termenul următor în seria: ${seq.join(' — ')} — ?`,
    options: opts,
    correct_answer: opts.indexOf(next),
    explanation: `Regula: ${rule}. Răspunsul este ${next}.`,
    difficulty: 2,
    metadata: { type: 'number_series' },
    is_active: true,
  }
}

function odd(q: string, a: string, w: string[]): Omit<TestQuestion, 'id' | 'created_at'> {
  const opts = shuffle([a, ...w])
  return {
    institution: 'MAI' as TestQuestion['institution'],
    category: 'logic',
    question_text: q,
    options: opts,
    correct_answer: opts.indexOf(a),
    explanation: `"${a}" este elementul care nu se încadrează în categorie.`,
    difficulty: 1,
    metadata: { type: 'odd_one_out' },
    is_active: true,
  }
}

function syllogism(q: string, a: string, w: string[]): Omit<TestQuestion, 'id' | 'created_at'> {
  const opts = shuffle([a, ...w])
  return {
    institution: 'MAI' as TestQuestion['institution'],
    category: 'logic',
    question_text: q,
    options: opts,
    correct_answer: opts.indexOf(a),
    explanation: `Concluzia corectă: "${a}".`,
    difficulty: 3,
    metadata: { type: 'syllogism' },
    is_active: true,
  }
}

function similarity(q: string, a: string, w: string[]): Omit<TestQuestion, 'id' | 'created_at'> {
  const opts = shuffle([a, ...w])
  return {
    institution: 'MAI' as TestQuestion['institution'],
    category: 'logic',
    question_text: q,
    options: opts,
    correct_answer: opts.indexOf(a),
    explanation: `Perechea cu cea mai mare asemănare: ${a}.`,
    difficulty: 2,
    metadata: { type: 'similarity' },
    is_active: true,
  }
}

export function generateLogicQuestions(institution: string): Omit<TestQuestion, 'id' | 'created_at'>[] {
  const inst = institution as TestQuestion['institution']

  // ─── SERII NUMERICE (din PDF-uri + generate) ───────────────────────────────
  const seriesQuestions: Omit<TestQuestion, 'id' | 'created_at'>[] = [
    series([2, 4, 6, 8, 10], '12', ['14', '11', '16'], 'se adaugă 2 la fiecare termen'),
    series([3, 6, 9, 12, 15], '18', ['20', '17', '21'], 'se adaugă 3 la fiecare termen'),
    series([1, 2, 4, 8, 16], '32', ['28', '36', '30'], 'fiecare termen se înmulțește cu 2'),
    series([100, 90, 80, 70, 60], '50', ['55', '45', '40'], 'se scade 10 la fiecare termen'),
    series([1, 4, 9, 16, 25], '36', ['32', '30', '49'], 'pătratele numerelor 1,2,3,4,5...'),
    series([2, 6, 12, 20, 30], '42', ['38', '44', '40'], 'n×(n+1): 1×2, 2×3, 3×4...'),
    series([1, 1, 2, 3, 5], '8', ['7', '9', '6'], 'Fibonacci: suma ultimilor doi termeni'),
    series([5, 10, 20, 40, 80], '160', ['120', '140', '180'], 'fiecare termen se înmulțește cu 2'),
    series([0, 3, 8, 15, 24], '35', ['30', '33', '40'], 'n²−1: 1,2,3,4,5...'),
    series([1, 3, 7, 15, 31], '63', ['60', '55', '65'], '2n+1 sau × 2 + 1'),
    series([50, 45, 40, 35, 30], '25', ['28', '20', '22'], 'se scade 5 la fiecare termen'),
    series([2, 3, 5, 7, 11], '13', ['12', '14', '15'], 'șirul numerelor prime'),
    series([4, 8, 16, 32, 64], '128', ['112', '96', '144'], 'fiecare termen se înmulțește cu 2'),
    series([1, 8, 27, 64, 125], '216', ['196', '200', '225'], 'cuburile: 1³, 2³, 3³...'),
    series([1, 7, 2, 9, 3, 11], '4', ['5', '6', '12'], 'două serii intercalate: 1,2,3... și 7,9,11...'),
    series([4, 5, 20, 6, 7, 42], '8', ['9', '72', '10'], 'perechi (4,5)→20, (6,7)→42, (8,?): următoarea cifră din pereche'),
    series([2, 5, 10, 17, 26], '37', ['35', '40', '30'], 'n²+1: 1²+1, 2²+1, 3²+1...'),
    series([3, 9, 27, 81, 243], '729', ['486', '648', '512'], 'fiecare termen se înmulțește cu 3'),
    series([100, 50, 25, 12.5], '6.25', ['5', '7', '8'], 'fiecare termen se împarte la 2'),
    series([1, 2, 6, 24, 120], '720', ['600', '480', '840'], 'factoriale: 1!, 2!, 3!, 4!, 5!'),
    series([10, 8, 11, 7, 12, 6], '13', ['5', '14', '9'], 'două serii intercalate: 10,11,12... și 8,7,6...'),
    series([1, 3, 6, 10, 15], '21', ['18', '20', '25'], 'numere triunghiulare: suma 1+2+3...'),
    series([7, 14, 28, 56, 112], '224', ['196', '168', '256'], 'fiecare termen se înmulțește cu 2'),
    series([5, 8, 13, 21, 34], '55', ['50', '45', '60'], 'Fibonacci generalizat: termen(n) = termen(n-1) + termen(n-2)'),
    series([2, 4, 3, 9, 4, 16], '5', ['6', '25', '8'], 'două serii: 2,3,4,5... și 4,9,16,25...'),
  ].map(q => ({ ...q, institution: inst }))

  // ─── ANALOGII VERBALE (din Transfer Analogic PDF + altele) ─────────────────
  const analogyQuestions: Omit<TestQuestion, 'id' | 'created_at'>[] = [
    // Din Transfer Analogic.pdf
    analogy('ȘOFERUL este pentru MAȘINĂ, ceea ce PILOTUL este pentru:', 'AVION', ['TRACTOR', 'TRAFIC', 'PILOTAJ']),
    analogy('PRIMUL este pentru ULTIMUL, ceea ce SFĂRȘITUL este pentru:', 'ÎNCEPUT', ['TERMINAT', 'FINAL', 'CAPĂT']),
    analogy('MEDICUL este pentru PACIENT, ceea ce AVOCATUL este pentru:', 'CLIENT', ['LEGE', 'PROCES', 'TRIBUNAL']),
    analogy('PETALA este pentru FLOARE, ceea ce CUVÂNTUL este pentru:', 'PROPOZIȚIE', ['LITERATURĂ', 'SUNET', 'LITERĂ']),
    analogy('RECHINUL este pentru PEȘTE, ceea ce ALGEBRA este pentru:', 'MATEMATICĂ', ['CALCUL', 'OPERAȚIE', 'GEOMETRIE']),
    analogy('APA este pentru EPRUBETĂ, ceea ce PLANTA este pentru:', 'GHIVECI', ['FRUNZĂ', 'SĂMÂNȚĂ', 'FLOARE']),
    analogy('URA este pentru IUBIRE, ceea ce TEAMA este pentru:', 'CURAJ', ['PLĂCERE', 'TRISTEȚE', 'VESELIE']),
    analogy('MILA este pentru CRUZIME, ceea ce ADEVĂRUL este pentru:', 'MINCIUNĂ', ['ORIGINAL', 'CLAR', 'BUN']),
    analogy('ALB este pentru NEGRU, ceea ce ZIUA este pentru:', 'NOAPTE', ['SEARA', 'ALB', 'AMIAZĂ']),
    analogy('SERINGA este pentru SER, ceea ce POMPA este pentru:', 'FURTUN', ['AER', 'AC', 'PRESIUNE']),
    analogy('ZIARUL este pentru ARTICOL, ceea ce TELEVIZORUL este pentru:', 'EMISIUNE', ['PREZENTATOR', 'REALIZATOR', 'ECRAN']),
    analogy('PERETELE este pentru TABLOU, ceea ce PODEAUA este pentru:', 'COVOR', ['PARCHET', 'PICTURĂ', 'LEMN']),
    analogy('CRUCEA este pentru CREȘTINISM, ceea ce PORUMBELUL este pentru:', 'PACE', ['BISERICĂ', 'CER', 'ZBOR']),
    analogy('FOCUL este pentru FUM, ceea ce LICURICIUL este pentru:', 'LUMINĂ', ['ÎNTUNERIC', 'AER', 'NOAPTE']),
    analogy('ZĂPADA este pentru SANIE, ceea ce APA este pentru:', 'VAPOR', ['FOC', 'SOARE', 'UMEZEALĂ']),
    analogy('ADIEREA este pentru FURTUNĂ, ceea ce OBOSEALA este pentru:', 'EXTENUARE', ['ODIHNĂ', 'EFORT', 'BOLNAV']),
    analogy('MUNTELE este pentru DEAL, ceea ce FLUVIUL este pentru:', 'RÂU', ['RELIEF', 'APĂ', 'MARE']),
    analogy('CĂLDURA este pentru EVAPORARE, ceea ce COMBUSTIBILUL este pentru:', 'ÎNCĂLZIRE', ['BENZINĂ', 'MAȘINĂ', 'AVION']),
    analogy('MINA este pentru ÎNTUNERIC, ceea ce ZORII sunt pentru:', 'NOAPTE', ['DIMINEAȚĂ', 'SEARĂ', 'RĂSĂRIT']),
    analogy('CĂMAȘA este pentru ÎMBRĂCĂMINTE, ceea ce BICICLETA este pentru:', 'VEHICUL', ['AUTOTURISM', 'BICICLIST', 'ȘOSEA']),
    // Analogii suplimentare
    analogy('Cartea este pentru citit, așa cum furculița este pentru:', 'mâncat', ['dormit', 'scris', 'alergat']),
    analogy('Câinele este pentru haită, așa cum omul este pentru:', 'societate', ['casă', 'animale', 'pădure']),
    analogy('Doctorul este pentru spital, așa cum profesorul este pentru:', 'școală', ['bibliotecă', 'muzeu', 'tribunal']),
    analogy('Ziua este pentru soare, așa cum noaptea este pentru:', 'lună', ['ploaie', 'vânt', 'ceață']),
    analogy('Apa este pentru pește, așa cum aerul este pentru:', 'pasăre', ['piatră', 'copac', 'nisip']),
    analogy('Ochii sunt organul văzului, așa cum urechile sunt organul:', 'auzului', ['mirosului', 'gustului', 'pipăitului']),
    analogy('Copilul devine adult, așa cum ghinda devine:', 'stejar', ['floare', 'iarbă', 'trandafir']),
    analogy('Foarfeca taie hârtia, așa cum toporul taie:', 'lemnul', ['apa', 'sticla', 'metalul']),
    analogy('Alfabetul are litere, așa cum calendarul are:', 'zile', ['culori', 'sunete', 'parfumuri']),
    analogy('Podea este pentru tavan, așa cum pământul este pentru:', 'cer', ['colină', 'iarbă', 'pădure']),
    analogy('Profesorul este pentru elev, așa cum medicul este pentru:', 'pacient', ['spital', 'medicament', 'boală']),
    analogy('Creionul este pentru scris, așa cum bisturiul este pentru:', 'operat', ['tăiat', 'construit', 'vopsit']),
    analogy('Soarele este pentru zi, așa cum luna este pentru:', 'noapte', ['cer', 'stele', 'vânt']),
    analogy('Coroana este pentru rege, așa cum casca este pentru:', 'soldat', ['politician', 'profesor', 'medic']),
  ].map(q => ({ ...q, institution: inst }))

  // ─── ELEMENTUL DE PRISOS (din ARBORELE PDF + altele) ───────────────────────
  const oddOneOutQuestions: Omit<TestQuestion, 'id' | 'created_at'>[] = [
    odd('Care cuvânt nu se încadrează în categorie: trandafir, viorea, garoafă, stejar, micsandră?', 'stejar', ['trandafir', 'viorea', 'garoafă']),
    odd('Care cuvânt nu se încadrează: perdea, voal, haină, baston, pătură?', 'baston', ['perdea', 'voal', 'haină']),
    odd('Care cuvânt nu se încadrează: mihnire, moleșeală, boală, veselie, tristețe?', 'veselie', ['mihnire', 'moleșeală', 'tristețe']),
    odd('Care element nu se încadrează: pisică, câine, leu, vultur, tigru?', 'vultur', ['pisică', 'câine', 'leu']),
    odd('Care cuvânt nu se încadrează: masă, scaun, pat, fereastră, dulap?', 'fereastră', ['masă', 'scaun', 'pat']),
    odd('Care element nu se încadrează: roșu, albastru, galben, pătrat, verde?', 'pătrat', ['roșu', 'albastru', 'galben']),
    odd('Care cuvânt nu se încadrează: iarbă, copac, floare, nor, tufă?', 'nor', ['iarbă', 'copac', 'floare']),
    odd('Care cuvânt nu se încadrează: București, Cluj, Ploiești, Brașov, Thames?', 'Thames', ['București', 'Cluj', 'Ploiești']),
    odd('Care element nu se încadrează: fotbal, tenis, înot, șah, baschet?', 'șah', ['fotbal', 'tenis', 'înot']),
    odd('Care cuvânt nu se încadrează: ianuarie, martie, mai, august, luni?', 'luni', ['ianuarie', 'martie', 'august']),
    odd('Care cuvânt nu aparține grupului: carpe, ulm, fag, stejar, trandafir?', 'trandafir', ['carpe', 'ulm', 'fag']),
    odd('Care instrument nu este de coarde: vioară, chitară, flaut, violoncel, mandolină?', 'flaut', ['vioară', 'chitară', 'violoncel']),
    odd('Care nu este un sentiment: bucurie, tristețe, frică, masă, furie?', 'masă', ['bucurie', 'tristețe', 'frică']),
    odd('Care nu este o planetă: Marte, Venus, Luna, Jupiter, Saturn?', 'Luna', ['Marte', 'Venus', 'Jupiter']),
    odd('Care cuvânt nu este sinonim cu "rapid": iute, sprinten, lent, vioi, ager?', 'lent', ['iute', 'sprinten', 'vioi']),
  ].map(q => ({ ...q, institution: inst }))

  // ─── ASEMĂNĂRI CUVINTE (din ARBORELE PDF) ──────────────────────────────────
  const similarityQuestions: Omit<TestQuestion, 'id' | 'created_at'>[] = [
    similarity('Găsiți perechea cu cea mai mare asemănare din: 1)închisoare 2)drum 3)gheață 4)școală 5)picior 6)cale 7)ușă 8)capac', '2-6 (drum-cale)', ['5-7 (picior-ușă)', '3-4 (gheață-școală)', '1-8 (închisoare-capac)']),
    similarity('Găsiți perechea cu cea mai mare asemănare din: 1)bere 2)munte 3)tunel 4)lapte 5)apă 6)vacă 7)vin 8)lumină', '1-7 (bere-vin)', ['2-4 (munte-lapte)', '6-8 (vacă-lumină)', '3-5 (tunel-apă)']),
    similarity('Găsiți perechea cu cea mai mare asemănare din: 1)mihnire 2)amintire 3)moleșeală 4)boală 5)veselie 6)tristețe 7)sănătate 8)dulceață', '1-6 (mihnire-tristețe)', ['4-8 (boală-dulceață)', '3-6 (moleșeală-tristețe)', '2-7 (amintire-sănătate)']),
    similarity('Găsiți perechea cu cea mai mare asemănare: 1)lapte 2)piatră 3)oțel 4)cafea 5)sânge 6)marmură 7)ceai 8)granit', '3-6 (oțel-marmură)', ['1-4 (lapte-cafea)', '2-8 (piatră-granit)', '5-7 (sânge-ceai)']),
    similarity('Găsiți perechea cu cea mai mare asemănare: 1)avion 2)bicicletă 3)tren 4)vapor 5)mașină 6)tramvai 7)elicopter 8)metrou', '1-7 (avion-elicopter)', ['2-5 (bicicletă-mașină)', '3-6 (tren-tramvai)', '4-8 (vapor-metrou)']),
  ].map(q => ({ ...q, institution: inst }))

  // ─── GRADE DE RUDENIE (din ARBORELE PDF) ───────────────────────────────────
  const familyQuestions: Omit<TestQuestion, 'id' | 'created_at'>[] = [
    {
      institution: inst,
      category: 'logic',
      question_text: 'Elena s-a căsătorit cu Petre Popescu. Sofia este mama Elenei. Maria s-a căsătorit cu Ion Costinescu și au copiii Lucian și Ana. Elena și Maria sunt surori. Angela este fiica Elenei. Angela este față de Sofia:',
      options: ['nepoată', 'soră', 'mătușă', 'verișoară'],
      correct_answer: 0,
      explanation: 'Sofia este mama Elenei, iar Elena este mama Angelei. Deci Angela este nepoata Sofiei.',
      difficulty: 2,
      metadata: { type: 'family_tree' },
      is_active: true,
    },
    {
      institution: inst,
      category: 'logic',
      question_text: 'Maria s-a căsătorit cu Ion Costinescu și au copiii Lucian și Ana. Elena este sora Mariei. Câte mătușe are Lucian?',
      options: ['1', '0', '2', '3'],
      correct_answer: 0,
      explanation: 'Lucian are o singură mătușă: Elena (sora mamei sale Maria).',
      difficulty: 2,
      metadata: { type: 'family_tree' },
      is_active: true,
    },
    {
      institution: inst,
      category: 'logic',
      question_text: 'Ion are o soră, Maria. Maria are un fiu, Andrei. Andrei este față de Ion:',
      options: ['nepot', 'fiu', 'unchi', 'văr'],
      correct_answer: 0,
      explanation: 'Maria este sora lui Ion, iar Andrei este fiul Mariei. Deci Andrei este nepotul lui Ion.',
      difficulty: 1,
      metadata: { type: 'family_tree' },
      is_active: true,
    },
    {
      institution: inst,
      category: 'logic',
      question_text: 'Ana are doi frați: Mihai și Radu. Radu are o fiică, Ioana. Ioana este față de Ana:',
      options: ['nepoată', 'verișoară', 'soră', 'mătușă'],
      correct_answer: 0,
      explanation: 'Radu este fratele Anei. Fiica lui Radu (Ioana) este nepoata Anei.',
      difficulty: 1,
      metadata: { type: 'family_tree' },
      is_active: true,
    },
    {
      institution: inst,
      category: 'logic',
      question_text: 'Dacă Maria este mama lui Ion, iar Ion este tatăl Anei, atunci Maria față de Ana este:',
      options: ['bunică', 'mătușă', 'verișoară', 'soră'],
      correct_answer: 0,
      explanation: 'Maria → Ion → Ana. Maria este bunica Anei.',
      difficulty: 1,
      metadata: { type: 'family_tree' },
      is_active: true,
    },
    {
      institution: inst,
      category: 'logic',
      question_text: 'Alexandru are o soră, Cristina. Cristina s-a căsătorit cu Bogdan. Bogdan față de Alexandru este:',
      options: ['cumnat', 'unchi', 'văr', 'frate'],
      correct_answer: 0,
      explanation: 'Bogdan este soțul surorii lui Alexandru, deci este cumnatul lui Alexandru.',
      difficulty: 1,
      metadata: { type: 'family_tree' },
      is_active: true,
    },
  ]

  // ─── SILOGISME ──────────────────────────────────────────────────────────────
  const syllogismQuestions: Omit<TestQuestion, 'id' | 'created_at'>[] = [
    syllogism('Toți studenții învață. Andrei este student. Concluzie:', 'Andrei învață', ['Andrei nu învață', 'Unii studenți nu învață', 'Andrei poate că învață']),
    syllogism('Niciun pește nu poate zbura. Rechinul este un pește. Concluzie:', 'Rechinul nu poate zbura', ['Rechinul poate zbura', 'Unii rechini zboară', 'Nu știm dacă rechinul zboară']),
    syllogism('Toate mamiferele sunt animale. Câinele este mamifer. Concluzie:', 'Câinele este animal', ['Câinele nu este animal', 'Unii câini sunt animale', 'Câinele poate fi animal']),
    syllogism('Dacă plouă, strada se udă. Strada este udă. Concluzie:', 'Nu putem concluziona că plouă cu certitudine', ['Plouă cu certitudine', 'Nu plouă', 'Strada nu este udă']),
    syllogism('Nicio pasăre nu este reptilă. Șarpele este reptilă. Concluzie:', 'Șarpele nu este pasăre', ['Șarpele este pasăre', 'Unii șerpi sunt păsări', 'Reptilele sunt păsări']),
    syllogism('Dacă temperatura scade sub 0°C, apa îngheață. Temperatura este -5°C. Concluzie:', 'Apa îngheață', ['Apa nu îngheață', 'Apa fierbe', 'Nu putem ști ce se întâmplă']),
    syllogism('Toți elevii din clasa a 10-a au trecut examenul. Maria este în clasa a 10-a. Concluzie:', 'Maria a trecut examenul', ['Maria nu a trecut examenul', 'Maria poate că a trecut', 'Nu știm dacă Maria a trecut']),
    syllogism('Unii sportivi sunt campioni. Toți campionii antrenează zilnic. Concluzie:', 'Unii sportivi antrenează zilnic', ['Toți sportivii antrenează zilnic', 'Niciun sportiv nu antrenează', 'Campionii nu sunt sportivi']),
    syllogism('Niciun hoț nu este cinstit. Unii oameni sunt hoți. Concluzie:', 'Unii oameni nu sunt cinstiți', ['Toți oamenii sunt necinstiți', 'Toți hoții sunt oameni cinstiți', 'Nu putem trage nicio concluzie']),
    syllogism('Dacă Ion studiază, va lua examenul. Ion a luat examenul. Concluzie:', 'Nu putem concluziona cu certitudine că Ion a studiat', ['Ion a studiat cu certitudine', 'Ion nu a studiat', 'Ion va studia']),
    syllogism('Toate florile au petale. Trandafirul este o floare. Concluzie:', 'Trandafirul are petale', ['Trandafirul nu are petale', 'Unele flori nu au petale', 'Petalele sunt flori']),
    syllogism('Nicio mașină nu poate înota. Scaunul este o mașină. Concluzie:', 'Scaunul nu poate înota', ['Scaunul poate înota', 'Unele scaune înoată', 'Mașinile înoată']),
  ].map(q => ({ ...q, institution: inst }))

  // ─── PROPOZIȚII LOGICE (din ANP 2020 format) ───────────────────────────────
  const propositionQuestions: Omit<TestQuestion, 'id' | 'created_at'>[] = [
    {
      institution: inst,
      category: 'logic',
      question_text: 'Mihai a luat cartea Anei și a citit-o micuței Carmen. Care variantă redă corect sensul propoziției?',
      options: [
        'Mihai a citit cartea micuței Carmen pe care a luat-o de la Ana',
        'Ana a luat cartea micuței Carmen și a citit-o lui Mihai',
        'Micuței Carmen i s-a citit o carte de Ana, luată de la Mihai',
        'Carmen a luat cartea Anei și a citit-o lui Mihai',
      ],
      correct_answer: 0,
      explanation: 'Mihai = subiect, a luat cartea de la Ana, a citit-o lui Carmen.',
      difficulty: 2,
      metadata: { type: 'proposition' },
      is_active: true,
    },
    {
      institution: inst,
      category: 'logic',
      question_text: 'Elena i-a dat Mariei cartea pe care i-o împrumutase Radu. Care variantă este corectă?',
      options: [
        'Cartea era a lui Radu, Elena a împrumutat-o și a dat-o Mariei',
        'Maria i-a dat lui Radu cartea Elenei',
        'Radu a dat cartea Mariei prin intermediul Elenei',
        'Elena a primit cartea de la Maria și i-a dat-o lui Radu',
      ],
      correct_answer: 0,
      explanation: 'Radu → Elena (împrumut) → Maria (dare). Cartea aparținea lui Radu.',
      difficulty: 2,
      metadata: { type: 'proposition' },
      is_active: true,
    },
    {
      institution: inst,
      category: 'logic',
      question_text: 'Dacă toți polițiștii sunt onești și unii funcționari sunt polițiști, atunci:',
      options: [
        'Unii funcționari sunt onești',
        'Toți funcționarii sunt onești',
        'Niciun funcționar nu este onest',
        'Polițiștii nu sunt funcționari',
      ],
      correct_answer: 0,
      explanation: 'Polițiștii onești care sunt și funcționari → unii funcționari sunt onești.',
      difficulty: 3,
      metadata: { type: 'logical_deduction' },
      is_active: true,
    },
    {
      institution: inst,
      category: 'logic',
      question_text: 'Cinci persoane stau la rând: Ana, Bogdan, Cristina, Dan, Elena. Ana este înaintea lui Bogdan. Bogdan este înaintea Cristinei. Dan este ultimul. Elena este înaintea Anei. Cine este primul?',
      options: ['Elena', 'Ana', 'Bogdan', 'Cristina'],
      correct_answer: 0,
      explanation: 'Ordinea: Elena → Ana → Bogdan → Cristina → Dan. Elena este prima.',
      difficulty: 3,
      metadata: { type: 'ordering' },
      is_active: true,
    },
    {
      institution: inst,
      category: 'logic',
      question_text: 'Dacă A > B și B > C, atunci:',
      options: ['A > C', 'C > A', 'A = C', 'Nu se poate determina'],
      correct_answer: 0,
      explanation: 'Prin tranzitivitate: dacă A > B și B > C, atunci A > C.',
      difficulty: 1,
      metadata: { type: 'transitive' },
      is_active: true,
    },
    {
      institution: inst,
      category: 'logic',
      question_text: 'Într-o cursă, Ion a terminat înaintea lui Vasile, dar după Gheorghe. Mihai a terminat după Vasile. Cine a terminat pe locul 2?',
      options: ['Ion', 'Vasile', 'Gheorghe', 'Mihai'],
      correct_answer: 0,
      explanation: 'Ordinea: Gheorghe → Ion → Vasile → Mihai. Ion este pe locul 2.',
      difficulty: 2,
      metadata: { type: 'ordering' },
      is_active: true,
    },
  ]

  const all = [
    ...seriesQuestions,
    ...analogyQuestions,
    ...oddOneOutQuestions,
    ...similarityQuestions,
    ...familyQuestions,
    ...syllogismQuestions,
    ...propositionQuestions,
  ]

  return all
}
