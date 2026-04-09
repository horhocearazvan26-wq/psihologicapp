import { Card, CardContent } from '@/components/ui/card'
import { FlashcardDeck } from './flashcard-deck'

const decks = [
  {
    id: 'vocabulary',
    title: 'Vocabular',
    icon: '📚',
    count: 40,
    color: 'from-rose-500 to-pink-600',
    cards: [
      { front: 'Abscons', back: 'Greu de înțeles, obscur, enigmatic' },
      { front: 'Acerb', back: 'Aspru, violent, sever (critică acerbă)' },
      { front: 'Alacran', back: 'Scorpion (termen arhaic/regional)' },
      { front: 'Alogic', back: 'Contrar logicii, ilogic' },
      { front: 'Ambiguu', back: 'Cu înțeles dublu, echivoc, nesigur' },
      { front: 'Anacronic', back: 'Demodat, care nu mai corespunde timpului' },
      { front: 'Apatic', back: 'Lipsit de energie și interes, indiferent' },
      { front: 'Arbitrar', back: 'Bazat pe voință proprie, fără reguli' },
      { front: 'Ardoare', back: 'Entuziasm, pasiune, zel intens' },
      { front: 'Asiduu', back: 'Stăruitor, perseverent, sârguincios' },
      { front: 'Atenuat', back: 'Micșorat ca intensitate, diminuat' },
      { front: 'Avers', back: 'Fața unei monede cu efigie principală' },
      { front: 'Benign', back: 'Blând, inofensiv (opus malign)' },
      { front: 'Bigot', back: 'Fals evlavios, ipocrit în credință' },
      { front: 'Calamitate', back: 'Nenorocire mare, catastrofă, dezastru' },
      { front: 'Candoare', back: 'Sinceritate, naivitate, inocență' },
      { front: 'Capriciu', back: 'Dorință trecătoare, moft, toană' },
      { front: 'Circumspect', back: 'Prudent, atent, precaut' },
      { front: 'Clarviziune', back: 'Capacitate de a prevedea, perspicacitate' },
      { front: 'Cogent', back: 'Convingător, pertinent, concludent' },
    ],
  },
  {
    id: 'logic_formulas',
    title: 'Formule Logice',
    icon: '🧠',
    count: 20,
    color: 'from-purple-500 to-indigo-600',
    cards: [
      { front: 'Silogism categoric', back: 'Toți A sunt B. Toți B sunt C. → Toți A sunt C.' },
      { front: 'Modus Ponens', back: 'Dacă P → Q și P este adevărat, atunci Q este adevărat' },
      { front: 'Modus Tollens', back: 'Dacă P → Q și Q este fals, atunci P este fals' },
      { front: 'Lege de compoziție XOR', back: 'P XOR Q = (P ∨ Q) ∧ ¬(P ∧ Q)' },
      { front: 'De Morgan 1', back: '¬(P ∧ Q) = ¬P ∨ ¬Q' },
      { front: 'De Morgan 2', back: '¬(P ∨ Q) = ¬P ∧ ¬Q' },
      { front: 'Analogie: A:B = C:D', back: 'Relația dintre A și B este aceeași ca între C și D' },
      { front: 'Serie aritmetică', back: 'Fiecare termen = termenul anterior + rație constantă d' },
      { front: 'Serie geometrică', back: 'Fiecare termen = termenul anterior × rație constantă r' },
      { front: 'Premise false, concluzie validă', back: 'Concluzia urmează din premise, indiferent dacă premisele sunt adevărate' },
    ],
  },
  {
    id: 'numerical',
    title: 'Formule Matematice',
    icon: '🔢',
    count: 20,
    color: 'from-green-500 to-emerald-600',
    cards: [
      { front: 'Procent din număr', back: 'X% din N = (X × N) / 100' },
      { front: 'Creștere procentuală', back: '((Valoare nouă - Valoare inițială) / Valoare inițială) × 100' },
      { front: 'Medie aritmetică', back: '(x₁ + x₂ + ... + xₙ) / n' },
      { front: 'Aria dreptunghi', back: 'A = L × l (lungime × lățime)' },
      { front: 'Aria triunghi', back: 'A = (b × h) / 2' },
      { front: 'Aria cerc', back: 'A = π × r²' },
      { front: 'Circumferința cercului', back: 'C = 2 × π × r' },
      { front: 'Teorema lui Pitagora', back: 'a² + b² = c² (c = ipotenuza)' },
      { front: 'Viteza medie', back: 'v = d / t (distanță / timp)' },
      { front: 'Regulă de trei simplă', back: 'Dacă a → b, atunci c → (b × c) / a' },
      { front: 'CMMDC (algoritmul lui Euclid)', back: 'CMMDC(a, b) = CMMDC(b, a mod b)' },
      { front: 'Putere cu exponent negativ', back: 'a⁻ⁿ = 1 / aⁿ' },
    ],
  },
  {
    id: 'memory_tips',
    title: 'Tehnici de Memorare',
    icon: '💾',
    count: 15,
    color: 'from-amber-500 to-orange-600',
    cards: [
      { front: 'Metoda palatului memoriei', back: 'Asociezi informații cu locuri dintr-un traseu mental bine cunoscut' },
      { front: 'Chunking', back: 'Gruparea informațiilor în blocuri mai mici (ex: număr telefon: 07XX-XXX-XXX)' },
      { front: 'Repetare spațiată', back: 'Revizuiești materialul la intervale crescânde: 1 zi → 3 zile → 1 săpt → 1 lună' },
      { front: 'Acrostic', back: 'Prima literă a fiecărui cuvânt formează un cuvânt/propoziție nouă' },
      { front: 'Rimă și ritm', back: 'Informația set la muzică sau rimată se memorează mai ușor' },
      { front: 'Vizualizare', back: 'Transformă informația abstractă într-o imagine mentală vie și exagerată' },
      { front: 'Asociere', back: 'Leagă informația nouă de ceva familiar deja memorat' },
      { front: 'Test activ', back: 'Testarea activă a memoriei (self-testing) e mai eficientă decât recitirea' },
    ],
  },
]

export default function FlashcardsPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Flashcard-uri</h1>
        <p className="text-slate-500 mt-1 text-sm">Memorare rapidă prin carduri interactive</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {decks.map((deck) => (
          <Card key={deck.id} hover>
            <CardContent className="p-0 overflow-hidden rounded-2xl">
              <div className={`bg-gradient-to-br ${deck.color} p-5 text-white`}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{deck.icon}</span>
                  <div>
                    <h2 className="font-bold text-lg">{deck.title}</h2>
                    <p className="text-white/70 text-sm">{deck.count} carduri</p>
                  </div>
                </div>
              </div>
              <div className="p-5">
                <FlashcardDeck deck={deck} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
