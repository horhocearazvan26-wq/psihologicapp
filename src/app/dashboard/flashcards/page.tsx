import { FlashcardDeck } from './flashcard-deck'
import { BookOpen, Brain, Database, Hash } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { IconBadge } from '@/components/ui/icon-badge'

const decks = [
  {
    id: 'vocabulary',
    title: 'Vocabular',
    icon: BookOpen,
    count: 40,
    gradient: 'from-rose-700 to-pink-700',
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
    icon: Brain,
    count: 20,
    gradient: 'from-violet-700 to-indigo-700',
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
    icon: Hash,
    count: 20,
    gradient: 'from-emerald-700 to-teal-700',
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
    icon: Database,
    count: 15,
    gradient: 'from-amber-700 to-orange-700',
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
    <div className="space-y-8 animate-fade-up">
      <div>
        <p className="text-[10px] font-bold tracking-widest uppercase mb-2" style={{ color: 'var(--text-muted)' }}>Memorare</p>
        <h1 className="text-2xl font-extrabold tracking-tight" style={{ color: 'var(--text-primary)' }}>Flashcard-uri</h1>
        <p className="mt-1.5 text-sm" style={{ color: 'var(--text-secondary)' }}>Memorare rapidă prin carduri interactive</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {decks.map((deck) => (
          <div
            key={deck.id}
            className="dash-card overflow-hidden hover:-translate-y-1 transition-all duration-200"
            style={{ boxShadow: '0 0 0 1px rgba(255,255,255,0.04), 0 16px 32px -16px rgba(0,0,0,0.6)' }}
          >
            {/* Deck header */}
            <div
              className={`bg-gradient-to-br ${deck.gradient} p-5 relative overflow-hidden`}
              style={{ boxShadow: 'inset 0 -1px 0 rgba(0,0,0,0.2)' }}
            >
              <div className="absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)' }} />
              <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full blur-2xl" style={{ background: 'rgba(255,255,255,0.1)' }} />
              <div className="relative flex items-center gap-3">
                <IconBadge icon={deck.icon as LucideIcon} className="h-12 w-12 rounded-2xl border-white/12 bg-white/10 text-white shadow-none" iconClassName="h-5 w-5 text-white" />
                <div>
                  <h2 className="font-extrabold text-white text-base leading-tight">{deck.title}</h2>
                  <p className="text-white/50 text-xs mt-0.5 font-medium">{deck.count} carduri</p>
                </div>
              </div>
            </div>
            {/* Deck content */}
            <div className="p-5">
              <FlashcardDeck
                deck={{
                  id: deck.id,
                  title: deck.title,
                  count: deck.count,
                  gradient: deck.gradient,
                  cards: deck.cards,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
