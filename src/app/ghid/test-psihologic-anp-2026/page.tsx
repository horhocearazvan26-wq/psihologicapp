import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Brain,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  ExternalLink,
  FileCheck2,
  Landmark,
  ShieldCheck,
  TimerReset,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Admitere ANP 2026: test psihologic si calendar SNPAP | PsihoPrep',
  description:
    'Ghid actualizat pentru admiterea ANP 2026 la Scoala Nationala de Politie Penitenciara Targu Ocna: calendar, locuri, dosar, test psihologic si pregatire.',
  keywords: [
    'admitere ANP 2026',
    'test psihologic ANP',
    'Scoala Nationala de Politie Penitenciara Targu Ocna 2026',
    'SNPAP admitere 2026',
    'politie penitenciara admitere 2026',
    'pregatire psihologica ANP',
  ],
  alternates: {
    canonical: '/ghid/test-psihologic-anp-2026',
  },
  openGraph: {
    title: 'Admitere ANP 2026: test psihologic si calendar SNPAP',
    description:
      'Ce se intampla acum in sesiunea ANP mai-iunie 2026 si cum te pregatesti pentru evaluarea psihologica.',
    url: '/ghid/test-psihologic-anp-2026',
    type: 'article',
    images: [
      {
        url: '/images/anp.png',
        width: 1200,
        height: 630,
        alt: 'Pregatire pentru admiterea ANP 2026',
      },
    ],
  },
}

const statusCards = [
  {
    label: 'Sesiune',
    value: 'mai-iunie 2026',
    note: 'concurs SNPAP Targu Ocna',
  },
  {
    label: 'Stadiu la 1 mai',
    value: 'dosar + psihologic',
    note: 'inscrierea s-a inchis pe 24 aprilie',
  },
  {
    label: 'Termen critic',
    value: '12 mai 2026',
    note: 'finalizare dosar pana la ora 15:00',
  },
]

const timeline = [
  {
    date: '23 martie - 24 aprilie 2026',
    title: 'Depunerea cererilor de inscriere',
    text: 'Etapa de inscriere pentru sesiunea curenta s-a incheiat. Daca ai depus cererea, urmatorul risc este dosarul incomplet.',
  },
  {
    date: '1 aprilie - 12 mai 2026',
    title: 'Completarea dosarului, medical si psihologic',
    text: 'Aceasta este etapa in desfasurare la 1 mai 2026: documente, fisa medicala si programarea/parcurgerea evaluarii psihologice.',
  },
  {
    date: 'mai-iunie 2026',
    title: 'Probele de concurs',
    text: 'Concursul continua cu probele organizate de scoala, inclusiv proba fizica si proba scrisa, conform metodologiei de admitere.',
  },
]

const facts = [
  ['570', 'locuri maxime anuntate'],
  ['532', 'locuri barbati'],
  ['30', 'locuri femei'],
  ['8', 'locuri minoritati'],
]

const psychAreas = [
  {
    icon: Brain,
    title: 'Atentie si ritm',
    text: 'Exercitii in care pierzi puncte daca incetinesti, sari peste detalii sau raspunzi impulsiv.',
  },
  {
    icon: TimerReset,
    title: 'Stabilitate sub timp',
    text: 'Serii scurte, itemi repetitivi si decizii rapide, unde oboseala produce erori aparent mici.',
  },
  {
    icon: ShieldCheck,
    title: 'Profil si consecventa',
    text: 'Itemi de personalitate si situatie care urmaresc autocontrolul, disciplina si predictibilitatea raspunsurilor.',
  },
]

const checklist = [
  'Confirma la unitatea penitenciara unde ai depus cererea ce documente mai lipsesc din dosar.',
  'Verifica programarea pentru testarea psihologica si pastreaza dovada/confirmarea primita.',
  'Lucreaza zilnic 25-35 de minute pe atentie, rationament, memorie si decizie sub presiune.',
  'Fa cel putin doua simulari cu cronometru inainte de evaluare, nu doar exercitii izolate.',
  'Noteaza greselile recurente: neatentie la cerinta, graba, blocaj pe serii sau schimbari de regula.',
]

const sources = [
  {
    name: 'SNPAP Targu Ocna - Admitere 2026',
    url: 'https://snpaptgocna.ro/invatamant/admitere/admitere-2026',
    detail: 'pagina oficiala a scolii, cu trimitere la concursul de admitere 2026',
  },
  {
    name: 'Institutia Prefectului Bacau - anunt admitere ANP',
    url: 'https://bc.prefectura.mai.gov.ro/cei-care-isi-doresc-o-cariera-de-politist-de-penitenciar-isi-pot-depune-cererea-de-inscriere-pana-pe-data-de-24-aprilie-2026-la-scoala-nationala-de-politie-penitenciara-constantin-brancoveanu/',
    detail: 'calendar, durata studiilor, locuri maxime si sursa oficiala ANP',
  },
  {
    name: 'Anunt preliminar ANP - admitere mai-iunie 2026',
    url: 'https://anp.gov.ro/wp-content/uploads/2026/03/16-martie-ANUNT-PRELIMINAR-admitere-MAI-IUNIE-2026.pdf',
    detail: 'PDF-ul oficial indicat de ANP si unitatile penitenciare',
  },
  {
    name: 'SNPAP Targu Ocna - contact',
    url: 'https://snpaptgocna.ro/',
    detail: 'datele de contact ale scolii: Targu Ocna, telefon si email institutional',
  },
]

const faqs = [
  {
    question: 'Mai pot depune cererea de inscriere pe 1 mai 2026?',
    answer:
      'Pentru sesiunea ANP/SNPAP mai-iunie 2026, termenul pentru cererea de inscriere a fost 24 aprilie 2026, ora 15:00. La 1 mai, etapa activa este completarea dosarului pana la 12 mai 2026.',
  },
  {
    question: 'Ce conteaza acum pentru testul psihologic ANP?',
    answer:
      'Conteaza sa fii programat corect si sa ajungi pregatit pentru itemi de atentie, rationament, ritm de lucru si profil personal. Pregatirea trebuie sa fie scurta, constanta si cronometrata.',
  },
  {
    question: 'Este aceasta pagina sursa oficiala de admitere?',
    answer:
      'Nu. Pagina sintetizeaza sursele publice si te ajuta cu pregatirea psihologica. Pentru acte, validari si programari, verifica ANP, SNPAP si unitatea penitenciara unde ai depus dosarul.',
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

export default function AnpPsychologicalTestGuidePage() {
  return (
    <main className="min-h-screen bg-[#f4f1ea] text-[#17201a]">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="relative overflow-hidden bg-[#142017] text-white">
        <div className="absolute inset-0 opacity-18">
          <Image
            src="/images/anp.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(110deg,#142017_0%,rgba(20,32,23,0.96)_48%,rgba(20,32,23,0.74)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-[#d9b45f]" />

        <div className="relative mx-auto max-w-6xl px-6 py-6">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-white/75 hover:text-white">
            <ArrowLeft className="h-4 w-4" />
            Inapoi la PsihoPrep
          </Link>
        </div>

        <div className="relative mx-auto grid max-w-6xl gap-10 px-6 pb-16 pt-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:pb-20">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-lg border border-[#d9b45f]/35 bg-[#d9b45f]/12 px-4 py-2 text-xs font-bold uppercase tracking-wide text-[#ffe6a3]">
              <CalendarDays className="h-3.5 w-3.5" />
              Actualizat pentru 1 mai 2026
            </div>
            <h1 className="max-w-3xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Admitere ANP 2026: test psihologic si calendarul sesiunii SNPAP
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#dfe6dc]">
              Sesiunea mai-iunie 2026 pentru Scoala Nationala de Politie Penitenciara este in desfasurare.
              Inscrierea s-a inchis, dar dosarul, vizita medicala si psihologicul sunt etapa care conteaza acum.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/auth/register?plan=one_institution"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#d9b45f] px-6 py-3 text-sm font-extrabold text-[#17201a] shadow-xl shadow-black/20 hover:bg-[#e8c875]"
              >
                Exerseaza gratuit
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="#surse"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/10 px-6 py-3 text-sm font-bold text-white hover:bg-white/15"
              >
                Vezi sursele
              </Link>
            </div>
          </div>

          <aside className="border border-white/15 bg-white/10 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#d9b45f] text-[#17201a]">
                <Landmark className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-xl font-extrabold">Ce este activ acum</h2>
                <p className="mt-2 text-sm leading-6 text-[#dfe6dc]">
                  Daca ai depus cererea pana pe 24 aprilie, prioritatea este sa inchizi dosarul si sa treci evaluarea psihologica.
                </p>
              </div>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {statusCards.map((card) => (
                <div key={card.label} className="border border-white/10 bg-white/10 px-3 py-4">
                  <p className="text-[10px] font-bold uppercase tracking-wide text-white/50">{card.label}</p>
                  <p className="mt-2 text-lg font-extrabold leading-tight">{card.value}</p>
                  <p className="mt-2 text-xs leading-5 text-white/60">{card.note}</p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <article className="mx-auto max-w-5xl px-6 py-14">
        <div className="border-l-4 border-[#b78022] bg-[#fff8e7] p-5 text-[#3f2a0b]">
          <div className="flex gap-3">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-[#b78022]" />
            <p className="text-sm leading-6">
              Important: pe 1 mai 2026, cererile pentru sesiunea curenta nu mai sunt deschise. Termenul publicat pentru inscriere a fost
              24 aprilie 2026, iar dosarele pot fi completate pana la 12 mai 2026, ora 15:00.
            </p>
          </div>
        </div>

        <section className="mt-12">
          <div className="grid gap-4 sm:grid-cols-4">
            {facts.map(([value, label]) => (
              <div key={label} className="border border-[#d8d1c0] bg-white p-5">
                <p className="text-3xl font-black text-[#1f3a25]">{value}</p>
                <p className="mt-2 text-xs font-bold uppercase tracking-wide text-[#776b55]">{label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-3xl font-extrabold tracking-tight">Calendarul admiterii ANP 2026</h2>
          <div className="mt-7 grid gap-4">
            {timeline.map((item, index) => (
              <div key={item.title} className="grid gap-4 border border-[#d8d1c0] bg-white p-5 sm:grid-cols-[180px_1fr]">
                <div>
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#1f3a25] text-sm font-extrabold text-white">
                    {index + 1}
                  </span>
                  <p className="mt-3 text-sm font-extrabold text-[#1f3a25]">{item.date}</p>
                </div>
                <div>
                  <h3 className="text-lg font-extrabold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#5f665e]">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-3xl font-extrabold tracking-tight">Ce inseamna testul psihologic ANP</h2>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-[#5f665e]">
            Evaluarea psihologica nu este doar o formalitate. Pentru un viitor politist de penitenciar, conteaza atentia,
            autocontrolul, consecventa si felul in care lucrezi cand presiunea creste.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {psychAreas.map(({ icon: Icon, title, text }) => (
              <div key={title} className="border border-[#d8d1c0] bg-white p-5">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-[#edf2e8] text-[#1f3a25]">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-extrabold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#5f665e]">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <div className="inline-flex items-center gap-2 rounded-lg bg-[#1f3a25] px-3 py-2 text-xs font-bold uppercase tracking-wide text-white">
              <FileCheck2 className="h-4 w-4 text-[#d9b45f]" />
              Pentru urmatoarele zile
            </div>
            <h2 className="mt-5 text-3xl font-extrabold tracking-tight">Checklist rapid pana la 12 mai</h2>
            <p className="mt-4 text-sm leading-6 text-[#5f665e]">
              Cel mai rau scenariu acum este sa fii eligibil, dar sa pierzi timp sau claritate din cauza unui dosar incomplet ori a
              unei pregatiri psihologice facute haotic.
            </p>
          </div>
          <ol className="space-y-3">
            {checklist.map((step, index) => (
              <li key={step} className="flex gap-4 border border-[#d8d1c0] bg-white p-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#d9b45f] text-sm font-extrabold text-[#17201a]">
                  {index + 1}
                </span>
                <p className="text-sm leading-6 text-[#3f463e]">{step}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-14 bg-[#142017] p-6 text-white sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-1 text-xs font-bold uppercase text-[#ffe6a3]">
                <ClipboardList className="h-3.5 w-3.5" />
                Pregatire cronometrata
              </div>
              <h2 className="text-2xl font-extrabold tracking-tight">Intra la psihologic cu ritmul deja format</h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-white/70">
                PsihoPrep iti da module pentru ANP, exercitii demo, simulari si review de greseli, ca sa nu descoperi presiunea abia in ziua evaluarii.
              </p>
            </div>
            <Link
              href="/auth/register?plan=one_institution"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-[#d9b45f] px-5 py-3 text-sm font-extrabold text-[#17201a] hover:bg-[#e8c875]"
            >
              Creeaza cont
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-3xl font-extrabold tracking-tight">Intrebari frecvente</h2>
          <div className="mt-6 divide-y divide-[#d8d1c0] border border-[#d8d1c0] bg-white">
            {faqs.map((item) => (
              <div key={item.question} className="p-6">
                <h3 className="flex items-start gap-3 font-extrabold">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#1f3a25]" />
                  {item.question}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[#5f665e]">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="surse" className="mt-14">
          <h2 className="text-3xl font-extrabold tracking-tight">Surse verificate</h2>
          <div className="mt-6 grid gap-3">
            {sources.map((source) => (
              <a
                key={source.url}
                href={source.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-start justify-between gap-4 border border-[#d8d1c0] bg-white p-5 text-[#17201a] hover:border-[#b78022]"
              >
                <span>
                  <span className="block font-extrabold">{source.name}</span>
                  <span className="mt-1 block text-sm leading-6 text-[#5f665e]">{source.detail}</span>
                </span>
                <ExternalLink className="mt-1 h-4 w-4 shrink-0 text-[#b78022]" />
              </a>
            ))}
          </div>
        </section>
      </article>
    </main>
  )
}
