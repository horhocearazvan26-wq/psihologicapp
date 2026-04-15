import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Brain,
  CalendarDays,
  CheckCircle,
  Clock,
  FileText,
  ShieldCheck,
  Target,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Test psihologic MAI 2026: ghid complet pentru candidati | PsihoPrep',
  description:
    'Ghid practic pentru testul psihologic MAI 2026: ce tipuri de probe apar, cum te pregatesti in sesiunea Aprilie-Mai si cum faci simulare reala pe PsihoPrep.',
  keywords: [
    'teste psihologice MAI 2026',
    'test psihologic MAI 2026',
    'admitere MAI Aprilie 2026',
    'pregatire psihologica MAI',
    'test psihologic politie',
    'test psihologic jandarmerie',
  ],
  alternates: {
    canonical: '/ghid/test-psihologic-mai-2026',
  },
  openGraph: {
    title: 'Test psihologic MAI 2026: ghid complet pentru candidati',
    description:
      'Ce trebuie sa stii despre proba psihologica MAI si cum te pregatesti eficient inainte de examen.',
    url: '/ghid/test-psihologic-mai-2026',
    type: 'article',
    images: [
      {
        url: '/images/mai.png',
        width: 1200,
        height: 630,
        alt: 'Pregatire pentru testul psihologic MAI 2026',
      },
    ],
  },
}

const examAreas = [
  {
    icon: Target,
    title: 'Atentie si concentrare',
    text: 'Exercitii cu timp limitat, cautare de simboluri, identificare rapida de diferente si mentinerea ritmului fara greseli multe.',
  },
  {
    icon: Brain,
    title: 'Rationament logic',
    text: 'Serii, analogii, matrici, reguli vizuale si probleme in care trebuie sa deduci repede urmatorul pas.',
  },
  {
    icon: FileText,
    title: 'Personalitate si decizie',
    text: 'Itemi care urmaresc consecventa raspunsurilor, toleranta la stres, autocontrolul si felul in care judeci situatii concrete.',
  },
]

const prepPlan = [
  'Fa o simulare initiala ca sa vezi unde pierzi timp: atentie, logica, memorie sau vocabular.',
  'Lucreaza zilnic 25-40 de minute pe categoria cu scorul cel mai slab, nu doar pe ce iti place.',
  'Repeta testele cu cronometru. La MAI conteaza si scorul, si stabilitatea sub presiune.',
  'Revizuieste greselile imediat dupa test, cat inca iti amintesti rationamentul folosit.',
  'In ultimele zile, redu volumul si pastreaza doar simulari scurte, ca sa intri odihnit.',
]

const faqs = [
  {
    question: 'Ce contine testul psihologic MAI 2026?',
    answer:
      'De obicei, pregatirea trebuie sa acopere atentie, rationament logic, memorie, aptitudini numerice, vocabular si itemi de personalitate. Structura exacta poate varia, asa ca verifica mereu anuntul oficial al concursului.',
  },
  {
    question: 'Cat timp ar trebui sa ma pregatesc pentru proba psihologica MAI?',
    answer:
      'Daca sesiunea este aproape, e mai eficient sa lucrezi zilnic pe simulari scurte si review de greseli decat sa faci sesiuni foarte lungi o data la cateva zile.',
  },
  {
    question: 'Pot incepe gratuit pe PsihoPrep?',
    answer:
      'Da. Contul gratuit iti permite sa vezi formatul platformei si sa parcurgi intrebari demo inainte sa alegi accesul complet.',
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
}

export default function MaiPsychologicalTestGuidePage() {
  return (
    <main className="min-h-screen bg-[#f7f8f6] text-slate-900">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="relative overflow-hidden border-b border-slate-200 bg-[#101923] text-white">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/images/mai.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(115deg,#101923_0%,rgba(16,25,35,0.94)_46%,rgba(16,25,35,0.64)_100%)]" />

        <div className="relative mx-auto max-w-6xl px-6 py-6">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-white/75 hover:text-white">
            <ArrowLeft className="h-4 w-4" />
            Inapoi la PsihoPrep
          </Link>
        </div>

        <div className="relative mx-auto grid max-w-6xl gap-10 px-6 pb-16 pt-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:pb-20">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-wide text-white/85">
              <CalendarDays className="h-3.5 w-3.5 text-sky-200" />
              Sesiunea MAI Aprilie-Mai 2026
            </div>
            <h1 className="max-w-3xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Test psihologic MAI 2026: ghid complet pentru candidati
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200">
              Ai putine zile in care pregatirea chiar conteaza. Iata ce tipuri de probe trebuie sa stapanesti,
              cum sa te antrenezi cu timp limitat si cum folosesti simularile ca sa intri mai sigur in examen.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/auth/register"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-extrabold text-slate-950 shadow-xl shadow-black/20 hover:bg-sky-50"
              >
                Incepe gratuit
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/#pricing"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3 text-sm font-bold text-white hover:bg-white/15"
              >
                Vezi planurile
              </Link>
            </div>
          </div>

          <aside className="rounded-2xl border border-white/15 bg-white/10 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sky-400 text-slate-950">
                <Clock className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-xl font-extrabold">Plan rapid pentru perioada de varf</h2>
                <p className="mt-2 text-sm leading-6 text-slate-200">
                  In loc sa repeti la intamplare, lucreaza cu simulari scurte, scoruri pe categorii si review imediat.
                </p>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-3 text-center">
              {[
                ['6', 'categorii'],
                ['15+', 'demo'],
                ['1', 'simulare'],
              ].map(([value, label]) => (
                <div key={label} className="rounded-xl border border-white/10 bg-white/10 px-3 py-4">
                  <p className="text-2xl font-extrabold">{value}</p>
                  <p className="text-xs font-semibold text-slate-300">{label}</p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <article className="mx-auto max-w-4xl px-6 py-14">
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 text-amber-950">
          <div className="flex gap-3">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
            <p className="text-sm leading-6">
              Ghidul de mai jos te ajuta sa te pregatesti practic. Pentru calendar, acte si conditii oficiale,
              verifica mereu anuntul institutiei la care candidezi.
            </p>
          </div>
        </div>

        <section className="mt-12">
          <h2 className="text-3xl font-extrabold tracking-tight">Ce verifica proba psihologica MAI?</h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            Proba psihologica nu masoara doar daca stii raspunsuri, ci felul in care ramai atent, rapid si coerent
            cand timpul este limitat. De aceea, pregatirea buna combina exercitii pe categorii cu simulari in conditii
            cat mai apropiate de examen.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {examAreas.map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-800">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-extrabold text-slate-900">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-3xl font-extrabold tracking-tight">Cum te pregatesti in sesiunea Aprilie-Mai</h2>
          <ol className="mt-6 space-y-4">
            {prepPlan.map((step, index) => (
              <li key={step} className="flex gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-900 text-sm font-extrabold text-white">
                  {index + 1}
                </span>
                <p className="text-slate-700">{step}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-14 rounded-2xl bg-slate-950 p-6 text-white sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase text-sky-100">
                <ShieldCheck className="h-3.5 w-3.5" />
                Simulare pe categorii
              </div>
              <h2 className="text-2xl font-extrabold tracking-tight">Testeaza-ti nivelul inainte sa intri in sala</h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
                PsihoPrep iti da intrebari demo gratuit, apoi acces complet la module MAI, simulari, flashcard-uri si review
                de greseli pentru pregatire concentrata.
              </p>
            </div>
            <Link
              href="/auth/register"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-extrabold text-slate-950 hover:bg-sky-50"
            >
              Creeaza cont
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-3xl font-extrabold tracking-tight">Intrebari frecvente</h2>
          <div className="mt-6 divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white">
            {faqs.map((item) => (
              <div key={item.question} className="p-6">
                <h3 className="flex items-start gap-3 font-extrabold text-slate-900">
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                  {item.question}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </article>
    </main>
  )
}
