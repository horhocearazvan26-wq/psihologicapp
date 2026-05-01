import type { QuestionRow } from './rationament-analitic'

const PASSAGE_1 = `Orașele inteligente (smart cities) reprezintă un model urban în care tehnologia informației și comunicațiilor este integrată în infrastructura publică pentru a îmbunătăți calitatea vieții cetățenilor și eficiența administrației. Senzorii distribuiți în rețea colectează date în timp real despre trafic, calitatea aerului, consumul de energie și alte parametri urbani. Aceste date sunt procesate de algoritmi specializați, iar rezultatele ghidează decizii administrative — de la reglarea semafoarelor la redirecționarea fluxurilor de transport public.

Cu toate acestea, implementarea orașelor inteligente ridică întrebări serioase despre viața privată. Rețelele de supraveghere video, senzorii de mișcare și sistemele de recunoaștere facială pot transforma spațiul public într-un mediu de monitorizare permanentă. Criticii susțin că, fără cadre legislative clare, aceste date ar putea fi folosite abuziv — atât de autorități, cât și de corporații private care gestionează infrastructura smart.

Paradoxul orașului inteligent constă tocmai în această tensiune: tehnologia promite o viață mai comodă și mai sigură, dar poate eroda chiar libertățile pe care prosperitatea urbană ar trebui să le protejeze.`

const PASSAGE_2 = `Memoria de lucru — capacitatea de a reține temporar și de a manipula informații — a fost descrisă de Baddeley și Hitch (1974) printr-un model cu trei componente: executivul central, bucla fonologică și agenda vizuo-spațială. Executivul central coordonează resursele cognitive, bucla fonologică procesează informații lingvistice și auditive, iar agenda vizuo-spațială gestionează reprezentările spațiale și vizuale.

Cercetările ulterioare au adăugat o a patra componentă, tamponul episodic, care integrează informațiile din cele două sub-sisteme și le conectează cu memoria pe termen lung. Capacitatea memoriei de lucru variază individual și corelează puternic cu performanța la teste de inteligență fluidă, înțelegerea textelor și rezolvarea problemelor matematice.

Studiile de neuroimagistică au identificat cortexul prefrontal dorsolateral ca substrat neural principal al memoriei de lucru. Leziunile la nivelul acestei arii determină dificultăți în menținerea și manipularea informației, afectând planificarea și luarea deciziilor.`

const PASSAGE_3 = `La 19 iulie 1848, la Cascadele Seneca din statul New York, aproximativ 300 de femei și bărbați s-au reunit la prima convenție pentru drepturile femeilor din istoria Statelor Unite. Inițiatorele evenimentului — Elizabeth Cady Stanton și Lucretia Mott — au redactat Declarația de Sentimente, un document care parafraza Declarația de Independență, substituind sintagma „toți bărbații" cu „toți bărbații și femeile".

Documentul enumera 18 nedreptăți comise de bărbați față de femei și formula unsprezece rezoluții, cea mai controversată fiind cererea dreptului de vot. Mulți participanți, inclusiv unele femei, s-au opus acestei cereri, considerând-o prea radicală. Doar rezoluția privind votul a trecut cu o majoritate mică, și doar după intervenția oratorului Frederick Douglass.

Convenția de la Seneca Falls este considerată punctul de start al mișcării sufragiste americane, care va culmina 72 de ani mai târziu, în 1920, cu adoptarea celui de-al 19-lea amendament al Constituției, prin care femeile dobândeau dreptul de vot.',`

const p1Questions: Omit<QuestionRow, 'institution'>[] = [
  {
    category: 'intelegere-texte',
    question_text: 'Care este funcția principală a senzorilor distribuiți în rețea, conform textului?',
    options: [
      'Controlul accesului cetățenilor în spațiul public',
      'Colectarea de date în timp real despre parametri urbani',
      'Detectarea infracțiunilor și identificarea infractorilor',
      'Distribuirea resurselor energetice între cartiere',
    ],
    correct_answer: 1,
    explanation: 'Textul menționează explicit că senzorii colectează date în timp real despre trafic, calitatea aerului, consumul de energie și alți parametri urbani.',
    difficulty: 1,
    metadata: { passage: PASSAGE_1, passage_title: 'Orașele inteligente' },
    is_active: true,
  },
  {
    category: 'intelegere-texte',
    question_text: 'Ce sugerează autorul prin expresia „paradoxul orașului inteligent"?',
    options: [
      'Costurile implementării depășesc beneficiile economice.',
      'Tehnologia promite confort, dar poate reduce libertățile individuale.',
      'Algoritmii de gestionare a traficului creează mai multă aglomerație.',
      'Orașele inteligente funcționează mai bine în teorie decât în practică.',
    ],
    correct_answer: 1,
    explanation: 'Ultimul paragraf definește explicit paradoxul: tensiunea dintre confortul promis de tehnologie și erodarea libertăților pe care prosperitatea urbană ar trebui să le protejeze.',
    difficulty: 2,
    metadata: { passage: PASSAGE_1, passage_title: 'Orașele inteligente' },
    is_active: true,
  },
  {
    category: 'intelegere-texte',
    question_text: 'Conform textului, care sunt cele două tipuri de entități care ar putea folosi abuziv datele colectate?',
    options: [
      'Hackeri și terorişti',
      'Autorități și corporații private',
      'Cetățeni și administrații locale',
      'Companii de telecomunicații și furnizori de energie',
    ],
    correct_answer: 1,
    explanation: 'Textul menționează explicit că datele „ar putea fi folosite abuziv — atât de autorități, cât și de corporații private care gestionează infrastructura smart."',
    difficulty: 1,
    metadata: { passage: PASSAGE_1, passage_title: 'Orașele inteligente' },
    is_active: true,
  },
  {
    category: 'intelegere-texte',
    question_text: 'Ce condiție consideră criticii necesară pentru a preveni utilizarea abuzivă a datelor în orașele inteligente?',
    options: [
      'Dezactivarea sistemelor de recunoaștere facială',
      'Existența unor cadre legislative clare',
      'Renunțarea la infrastructura smart în zonele rezidențiale',
      'Transferul administrării datelor exclusiv la autorități publice',
    ],
    correct_answer: 1,
    explanation: 'Criticii susțin că „fără cadre legislative clare, aceste date ar putea fi folosite abuziv." Soluția implicată este, deci, existența unor reglementări juridice clare.',
    difficulty: 2,
    metadata: { passage: PASSAGE_1, passage_title: 'Orașele inteligente' },
    is_active: true,
  },
  {
    category: 'intelegere-texte',
    question_text: 'Care dintre informațiile de mai jos NU este menționată explicit în text?',
    options: [
      'Senzorii colectează date despre calitatea aerului.',
      'Algoritmii ghidează reglarea semafoarelor.',
      'Sistemele smart reduc cu 30% consumul energetic urban.',
      'Recunoașterea facială poate transforma spațiul public.',
    ],
    correct_answer: 2,
    explanation: 'Reducerea cu 30% a consumului energetic nu este menționată nicăieri în text. Celelalte trei informații sunt prezente explicit.',
    difficulty: 2,
    metadata: { passage: PASSAGE_1, passage_title: 'Orașele inteligente' },
    is_active: true,
  },
  {
    category: 'intelegere-texte',
    question_text: 'Ce concluzie putem trage implicit din faptul că algoritmii „ghidează decizii administrative"?',
    options: [
      'Administrația nu mai are nevoie de personal uman.',
      'Deciziile administrative devin parțial dependente de sisteme automate.',
      'Administrația smart este mai coruptibilă decât cea tradițională.',
      'Algoritmii înlocuiesc în totalitate judecata umană.',
    ],
    correct_answer: 1,
    explanation: 'Dacă algoritmii „ghidează" decizii, concluzia implicită este că unele procese decizionale devin dependente de sisteme automate — fără ca textul să afirme că înlocuiesc în totalitate factorul uman.',
    difficulty: 3,
    metadata: { passage: PASSAGE_1, passage_title: 'Orașele inteligente' },
    is_active: true,
  },
  {
    category: 'intelegere-texte',
    question_text: 'Care dintre cuvintele de mai jos este cel mai aproape în sens de „a eroda" în contextul textului?',
    options: ['A consolida', 'A diminua treptat', 'A elimina complet', 'A transforma radical'],
    correct_answer: 1,
    explanation: 'A eroda (fig.) = a slăbi, a diminua treptat. Tehnologia poate eroda (diminua treptat) libertățile, nu le elimina complet sau le transforma radical.',
    difficulty: 2,
    metadata: { passage: PASSAGE_1, passage_title: 'Orașele inteligente' },
    is_active: true,
  },
]

const p2Questions: Omit<QuestionRow, 'institution'>[] = [
  {
    category: 'intelegere-texte',
    question_text: 'Conform textului, care componentă a memoriei de lucru coordonează resursele cognitive?',
    options: ['Bucla fonologică', 'Agenda vizuo-spațială', 'Executivul central', 'Tamponul episodic'],
    correct_answer: 2,
    explanation: 'Textul precizează explicit: „Executivul central coordonează resursele cognitive."',
    difficulty: 1,
    metadata: { passage: PASSAGE_2, passage_title: 'Memoria de lucru' },
    is_active: true,
  },
  {
    category: 'intelegere-texte',
    question_text: 'Ce funcție îndeplinește tamponul episodic, conform textului?',
    options: [
      'Procesarea informațiilor auditive și lingvistice',
      'Coordonarea resurselor cognitive disponibile',
      'Integrarea informațiilor din sub-sisteme și conectarea cu memoria pe termen lung',
      'Gestionarea reprezentărilor spațiale și vizuale',
    ],
    correct_answer: 2,
    explanation: 'Textul definește tamponul episodic ca integrând „informațiile din cele două sub-sisteme și le conectează cu memoria pe termen lung."',
    difficulty: 1,
    metadata: { passage: PASSAGE_2, passage_title: 'Memoria de lucru' },
    is_active: true,
  },
  {
    category: 'intelegere-texte',
    question_text: 'Care este substratul neural principal al memoriei de lucru identificat prin neuroimagistică?',
    options: [
      'Hipocampul bilateral',
      'Cortexul prefrontal dorsolateral',
      'Amigdala cerebrală',
      'Cortexul cingulat anterior',
    ],
    correct_answer: 1,
    explanation: 'Textul menționează că „studiile de neuroimagistică au identificat cortexul prefrontal dorsolateral ca substrat neural principal al memoriei de lucru."',
    difficulty: 2,
    metadata: { passage: PASSAGE_2, passage_title: 'Memoria de lucru' },
    is_active: true,
  },
  {
    category: 'intelegere-texte',
    question_text: 'Cu ce corelează capacitatea memoriei de lucru, conform textului?',
    options: [
      'Viteza de procesare senzorială și reflexele',
      'Inteligența fluidă, înțelegerea textelor și rezolvarea problemelor matematice',
      'Memoria autobiografică și recunoașterea emoțiilor',
      'Creativitatea și gândirea divergentă',
    ],
    correct_answer: 1,
    explanation: 'Textul precizează că „Capacitatea memoriei de lucru [...] corelează puternic cu performanța la teste de inteligență fluidă, înțelegerea textelor și rezolvarea problemelor matematice."',
    difficulty: 1,
    metadata: { passage: PASSAGE_2, passage_title: 'Memoria de lucru' },
    is_active: true,
  },
  {
    category: 'intelegere-texte',
    question_text: 'Ce implică faptul că modelul lui Baddeley și Hitch a fost elaborat în 1974 și a primit ulterior o a patra componentă?',
    options: [
      'Modelul original era fundamental greșit.',
      'Modelele științifice se rafine și se extind pe baza cercetărilor ulterioare.',
      'Psihologia cognitivă se bazează exclusiv pe speculații.',
      'Baddeley și Hitch nu au colaborat cu alți cercetători.',
    ],
    correct_answer: 1,
    explanation: 'Adăugarea tamponului episodic ilustrează procesul normal al cercetării științifice: modelele se construiesc progresiv, fiecare contribuție nouă rafinând și extinzând modelele anterioare.',
    difficulty: 3,
    metadata: { passage: PASSAGE_2, passage_title: 'Memoria de lucru' },
    is_active: true,
  },
  {
    category: 'intelegere-texte',
    question_text: 'Care afirmație este inconsistentă cu informațiile din text?',
    options: [
      'Leziunile cortexului prefrontal dorsolateral afectează planificarea.',
      'Bucla fonologică procesează informații vizuale și spațiale.',
      'Capacitatea memoriei de lucru variază de la individ la individ.',
      'Executivul central coordonează resursele cognitive.',
    ],
    correct_answer: 1,
    explanation: 'Bucla fonologică procesează informații lingvistice și auditive, NU vizuale și spațiale. Acestea sunt gestionate de agenda vizuo-spațială.',
    difficulty: 2,
    metadata: { passage: PASSAGE_2, passage_title: 'Memoria de lucru' },
    is_active: true,
  },
  {
    category: 'intelegere-texte',
    question_text: 'Ce deducem din corelația dintre memoria de lucru și inteligența fluidă?',
    options: [
      'Memoria de lucru și inteligența fluidă sunt același construct.',
      'O capacitate mai mare de memorie de lucru este asociată cu performanță mai bună la teste de inteligență fluidă.',
      'Inteligența fluidă nu poate fi îmbunătățită prin antrenament.',
      'Persoanele cu memorie de lucru slabă nu pot rezolva probleme matematice.',
    ],
    correct_answer: 1,
    explanation: 'Corelarea puternică dintre două variabile înseamnă că valorile mari ale uneia tind să fie asociate cu valori mari ale celeilalte — nu că sunt identice și nu că relația este absolută.',
    difficulty: 3,
    metadata: { passage: PASSAGE_2, passage_title: 'Memoria de lucru' },
    is_active: true,
  },
]

const p3Questions: Omit<QuestionRow, 'institution'>[] = [
  {
    category: 'intelegere-texte',
    question_text: 'Când și unde a avut loc prima convenție pentru drepturile femeilor din SUA?',
    options: [
      '4 iulie 1776, Philadelphia',
      '19 iulie 1848, Cascadele Seneca, New York',
      '19 august 1920, Washington D.C.',
      '15 septembrie 1848, Boston',
    ],
    correct_answer: 1,
    explanation: 'Textul precizează: „La 19 iulie 1848, la Cascadele Seneca din statul New York."',
    difficulty: 1,
    metadata: { passage: PASSAGE_3, passage_title: 'Convenția de la Seneca Falls' },
    is_active: true,
  },
  {
    category: 'intelegere-texte',
    question_text: 'De ce a fost controversată rezoluția privind dreptul de vot?',
    options: [
      'Deoarece implica modificarea Constituției.',
      'Deoarece mulți participanți, inclusiv unele femei, o considerau prea radicală.',
      'Deoarece contravenea legilor în vigoare ale statului New York.',
      'Deoarece Frederick Douglass s-a opus ei.',
    ],
    correct_answer: 1,
    explanation: 'Textul arată că „Mulți participanți, inclusiv unele femei, s-au opus acestei cereri, considerând-o prea radicală."',
    difficulty: 2,
    metadata: { passage: PASSAGE_3, passage_title: 'Convenția de la Seneca Falls' },
    is_active: true,
  },
  {
    category: 'intelegere-texte',
    question_text: 'Care a fost rolul lui Frederick Douglass la convenție?',
    options: [
      'A organizat și moderat convenția.',
      'A redactat Declarația de Sentimente.',
      'A susținut prin discurs adoptarea rezoluției privind votul.',
      'A reprezentat guvernul federal la eveniment.',
    ],
    correct_answer: 2,
    explanation: 'Textul menționează că rezoluția privind votul a trecut „doar după intervenția oratorului Frederick Douglass" — el a susținut cu discursul său adoptarea ei.',
    difficulty: 2,
    metadata: { passage: PASSAGE_3, passage_title: 'Convenția de la Seneca Falls' },
    is_active: true,
  },
  {
    category: 'intelegere-texte',
    question_text: 'Câți ani au trecut de la Convenția de la Seneca Falls până la adoptarea celui de-al 19-lea amendament?',
    options: ['50 ani', '62 ani', '72 ani', '84 ani'],
    correct_answer: 2,
    explanation: 'Convenția a avut loc în 1848; amendamentul a fost adoptat în 1920. 1920 − 1848 = 72 de ani.',
    difficulty: 2,
    metadata: { passage: PASSAGE_3, passage_title: 'Convenția de la Seneca Falls' },
    is_active: true,
  },
  {
    category: 'intelegere-texte',
    question_text: 'Ce modificare de text a realizat Declarația de Sentimente față de Declarația de Independență?',
    options: [
      'A înlocuit lista de nedreptăți cu un apel la reconciliere.',
      'A substituit „toți bărbații" cu „toți bărbații și femeile".',
      'A adăugat un preambul cu referiri la dreptul natural.',
      'A eliminat referirile la rege și a adăugat referiri la Constituție.',
    ],
    correct_answer: 1,
    explanation: 'Textul precizează că documentul „parafraza Declarația de Independență, substituind sintagma «toți bărbații» cu «toți bărbații și femeile»."',
    difficulty: 1,
    metadata: { passage: PASSAGE_3, passage_title: 'Convenția de la Seneca Falls' },
    is_active: true,
  },
  {
    category: 'intelegere-texte',
    question_text: 'Ce putem deduce despre contextul social al epocii din faptul că unele femei prezente s-au opus cererii dreptului la vot?',
    options: [
      'Femeile din acea epocă nu doreau egalitate cu bărbații.',
      'Normele sociale ale epocii erau atât de profund internalizate încât chiar și unele femei le apărau.',
      'Convenția a eșuat în obiectivele sale principale.',
      'Dreptul la vot nu era prioritatea principală a mișcării feministe.',
    ],
    correct_answer: 1,
    explanation: 'Opoziția unor femei față de cererea votului nu înseamnă că nu doreau egalitate, ci că normele sociale dominante ale epocii (care defineau votul ca prerogativă masculină) erau atât de adânc internalizate încât influențau chiar și judecata celor care le erau victime.',
    difficulty: 3,
    metadata: { passage: PASSAGE_3, passage_title: 'Convenția de la Seneca Falls' },
    is_active: true,
  },
  {
    category: 'intelegere-texte',
    question_text: 'Care este afirmația susținută de text?',
    options: [
      'Convenția de la Seneca Falls a acordat imediat dreptul de vot femeilor.',
      'Declarația de Sentimente a enumerat 11 nedreptăți și 18 rezoluții.',
      'Convenția este considerată punctul de start al mișcării sufragiste americane.',
      'Frederick Douglass a organizat convenția împreună cu Elizabeth Cady Stanton.',
    ],
    correct_answer: 2,
    explanation: 'Textul afirmă: „Convenția de la Seneca Falls este considerată punctul de start al mișcării sufragiste americane." Varianta B inversează cifrele (18 nedreptăți, 11 rezoluții).',
    difficulty: 2,
    metadata: { passage: PASSAGE_3, passage_title: 'Convenția de la Seneca Falls' },
    is_active: true,
  },
  {
    category: 'intelegere-texte',
    question_text: 'Care este tonul dominant al textului despre Convenția de la Seneca Falls?',
    options: [
      'Critic față de mișcarea sufragistă',
      'Ironic și detașat',
      'Neutru-informativ, cu ușoară admirație față de curajul participantelor',
      'Polemic, pledând pentru drepturi extinse',
    ],
    correct_answer: 2,
    explanation: 'Textul prezintă faptele obiectiv, fără judecăți de valoare explicite, dar sublinierea rezistenței și a duratei luptei (72 de ani) implică un ușor ton de admirație pentru perseverența mișcării.',
    difficulty: 3,
    metadata: { passage: PASSAGE_3, passage_title: 'Convenția de la Seneca Falls' },
    is_active: true,
  },
]

export function generateIntelegereTexte(institution: string): QuestionRow[] {
  return [...p1Questions, ...p2Questions, ...p3Questions].map(item => ({ ...item, institution }))
}
