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
  alternates: { canonical: '/ghid/test-psihologic-anp-2026' },
  openGraph: {
    title: 'Admitere ANP 2026: test psihologic si calendar SNPAP',
    description: 'Ce se intampla acum in sesiunea ANP mai-iunie 2026 si cum te pregatesti pentru evaluarea psihologica.',
    url: '/ghid/test-psihologic-anp-2026',
    type: 'article',
    images: [{ url: '/images/anp.png', width: 1200, height: 630, alt: 'Pregatire pentru admiterea ANP 2026' }],
  },
}

const statusCards = [
  { label: 'Sesiune',        value: 'mai–iunie 2026', note: 'concurs SNPAP Targu Ocna' },
  { label: 'Stadiu la 1 mai', value: 'dosar + psihologic', note: 'inscrierea s-a inchis pe 24 aprilie' },
  { label: 'Termen critic',  value: '12 mai 2026',    note: 'finalizare dosar pana la ora 15:00' },
]

const timeline = [
  {
    date: '23 mar – 24 apr 2026',
    title: 'Depunerea cererilor de inscriere',
    text: 'Etapa de inscriere pentru sesiunea curenta s-a incheiat. Daca ai depus cererea, urmatorul risc este dosarul incomplet.',
    done: true,
  },
  {
    date: '1 apr – 12 mai 2026',
    title: 'Completarea dosarului, medical si psihologic',
    text: 'Aceasta este etapa in desfasurare la 1 mai 2026: documente, fisa medicala si programarea/parcurgerea evaluarii psihologice.',
    done: false,
  },
  {
    date: 'mai–iunie 2026',
    title: 'Probele de concurs',
    text: 'Concursul continua cu probele organizate de scoala, inclusiv proba fizica si proba scrisa, conform metodologiei de admitere.',
    done: false,
  },
]

const facts = [
  { value: '570', label: 'locuri maxime anuntate' },
  { value: '532', label: 'locuri barbati' },
  { value: '30',  label: 'locuri femei' },
  { value: '8',   label: 'locuri minoritati' },
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
  'Lucreaza zilnic 25–35 de minute pe atentie, rationament, memorie si decizie sub presiune.',
  'Fa cel putin doua simulari cu cronometru inainte de evaluare, nu doar exercitii izolate.',
  'Noteaza greselile recurente: neatentie la cerinta, graba, blocaj pe serii sau schimbari de regula.',
]

const sources = [
  {
    name: 'SNPAP Targu Ocna — Admitere 2026',
    url: 'https://snpaptgocna.ro/invatamant/admitere/admitere-2026',
    detail: 'pagina oficiala a scolii, cu trimitere la concursul de admitere 2026',
  },
  {
    name: 'Institutia Prefectului Bacau — anunt admitere ANP',
    url: 'https://bc.prefectura.mai.gov.ro/cei-care-isi-doresc-o-cariera-de-politist-de-penitenciar-isi-pot-depune-cererea-de-inscriere-pana-pe-data-de-24-aprilie-2026-la-scoala-nationala-de-politie-penitenciara-constantin-brancoveanu/',
    detail: 'calendar, durata studiilor, locuri maxime si sursa oficiala ANP',
  },
  {
    name: 'Anunt preliminar ANP — admitere mai–iunie 2026',
    url: 'https://anp.gov.ro/wp-content/uploads/2026/03/16-martie-ANUNT-PRELIMINAR-admitere-MAI-IUNIE-2026.pdf',
    detail: 'PDF-ul oficial indicat de ANP si unitatile penitenciare',
  },
  {
    name: 'SNPAP Targu Ocna — contact',
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
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  })),
}

export default function AnpPsychologicalTestGuidePage() {
  return (
    <main className="min-h-screen bg-[#f2ede5] text-[#17201a]">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ══════════════════════════════════ HERO ══════════════════════════════════ */}
      <section className="relative overflow-hidden text-white" style={{ background: '#0e1a10' }}>

        {/* Background image layer */}
        <div className="absolute inset-0 opacity-10">
          <Image src="/images/anp.png" alt="" fill priority sizes="100vw" className="object-cover object-center" />
        </div>

        {/* Atmospheric gradient layers */}
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(130deg, #0e1a10 0%, rgba(14,26,16,0.96) 50%, rgba(14,26,16,0.82) 100%)' }} />

        {/* Animated gold orbs */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="guide-orb-1 absolute -top-24 left-0 h-[500px] w-[500px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(217,180,95,0.16) 0%, transparent 70%)', filter: 'blur(70px)' }} />
          <div className="guide-orb-2 absolute right-0 top-10 h-[400px] w-[400px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(217,180,95,0.1) 0%, transparent 70%)', filter: 'blur(60px)' }} />
          <div className="guide-orb-3 absolute bottom-0 left-1/3 h-[300px] w-[600px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(30,80,40,0.3) 0%, transparent 70%)', filter: 'blur(80px)' }} />
          {/* Subtle grid */}
          <div className="absolute inset-0"
            style={{ backgroundImage: 'linear-gradient(rgba(217,180,95,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(217,180,95,0.03) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
          {/* Bottom fade */}
          <div className="absolute inset-x-0 bottom-0 h-24"
            style={{ background: 'linear-gradient(to top, #0e1a10, transparent)' }} />
        </div>

        {/* Gold bottom rule */}
        <div className="absolute inset-x-0 bottom-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, #d9b45f44, #d9b45f88, #d9b45f44, transparent)' }} />

        {/* Back nav */}
        <div className="relative mx-auto max-w-6xl px-6 py-6">
          <Link href="/" className="animate-fade-in inline-flex items-center gap-2 text-sm font-semibold text-white/50 transition-colors hover:text-white">
            <ArrowLeft className="h-4 w-4" />
            Inapoi la PsihoPrep
          </Link>
        </div>

        {/* Hero grid */}
        <div className="relative mx-auto grid max-w-6xl gap-12 px-6 pb-20 pt-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">

          {/* Left — headline */}
          <div>
            <div className="animate-fade-up mb-5 inline-flex items-center gap-2 rounded-lg px-4 py-2"
              style={{ border: '1px solid rgba(217,180,95,0.28)', background: 'rgba(217,180,95,0.08)' }}>
              <CalendarDays className="h-3.5 w-3.5 text-[#ffe6a3]" />
              <span className="text-[11px] font-bold uppercase tracking-wide text-[#ffe6a3]">Actualizat pentru 1 mai 2026</span>
            </div>

            <h1 className="animate-fade-up stagger-1 font-extrabold leading-tight tracking-tight"
              style={{ fontSize: 'clamp(1.9rem, 4.5vw, 3.6rem)', maxWidth: '640px' }}>
              Admitere ANP 2026:{' '}
              <span style={{
                background: 'linear-gradient(135deg,#d9b45f,#f8d08d)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                test psihologic
              </span>{' '}
              si calendarul sesiunii
            </h1>

            <p className="animate-fade-up stagger-2 mt-6 max-w-[500px] text-base leading-8 text-[#c8d4c4]">
              Sesiunea mai–iunie 2026 pentru SNPAP este in desfasurare.
              Inscrierea s-a inchis, dar dosarul si psihologicul sunt etapa care conteaza acum.
            </p>

            <div className="animate-fade-up stagger-3 mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/ghiduri#anp"
                className="btn-shimmer inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3.5 text-sm font-extrabold text-[#17201a] transition-transform hover:-translate-y-0.5 active:translate-y-0"
                style={{ background: 'linear-gradient(135deg,#d9b45f,#e8c875)', boxShadow: '0 10px 28px rgba(217,180,95,0.35)' }}
              >
                Vezi ghidul PDF ANP
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="#surse"
                className="inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-white/10"
                style={{ border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.07)' }}
              >
                Surse verificate
              </Link>
            </div>
          </div>

          {/* Right — status panel */}
          <aside
            className="animate-fade-up stagger-4 rounded-[24px] p-6"
            style={{
              border: '1px solid rgba(255,255,255,0.1)',
              background: 'rgba(255,255,255,0.06)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 40px 80px rgba(0,0,0,0.3)',
            }}
          >
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                style={{ background: '#d9b45f', color: '#17201a' }}>
                <Landmark className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-extrabold">Ce este activ acum</h2>
                <p className="mt-1.5 text-sm leading-6 text-[#b8c8b4]">
                  Daca ai depus cererea pana pe 24 aprilie, prioritatea este sa inchizi dosarul si sa treci evaluarea psihologica.
                </p>
              </div>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {statusCards.map((card) => (
                <div
                  key={card.label}
                  className="rounded-2xl px-3 py-4"
                  style={{ border: '1px solid rgba(217,180,95,0.15)', background: 'rgba(217,180,95,0.07)' }}
                >
                  <p className="text-[10px] font-bold uppercase tracking-wide text-white/45">{card.label}</p>
                  <p className="mt-2 text-base font-extrabold leading-tight">{card.value}</p>
                  <p className="mt-2 text-[11px] leading-5 text-white/50">{card.note}</p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      {/* ══════════════════════════════════ ARTICLE BODY ══════════════════════════════════ */}
      <article className="mx-auto max-w-5xl px-6 py-14">

        {/* Warning banner */}
        <div
          className="rounded-2xl p-5"
          style={{
            borderLeft: '4px solid #b78022',
            background: 'linear-gradient(135deg, #fff8e7, #fffdf4)',
            boxShadow: '0 8px 30px rgba(183,128,34,0.1)',
          }}
        >
          <div className="flex gap-3">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-[#b78022]" />
            <p className="text-sm leading-6 text-[#3f2a0b]">
              <strong>Important:</strong> pe 1 mai 2026, cererile pentru sesiunea curenta nu mai sunt deschise. Termenul publicat pentru inscriere a fost
              24 aprilie 2026, iar dosarele pot fi completate pana la 12 mai 2026, ora 15:00.
            </p>
          </div>
        </div>

        {/* ── Stats ── */}
        <section className="mt-12">
          <div className="grid gap-4 sm:grid-cols-4">
            {facts.map(({ value, label }) => (
              <div
                key={label}
                className="perf-reveal perf-reveal-up rounded-2xl p-5 text-center"
                style={{
                  border: '1px solid #ddd5c5',
                  background: 'white',
                  boxShadow: '0 10px 30px rgba(15,23,42,0.04)',
                }}
              >
                <p className="font-black text-[#1f3a25]" style={{ fontSize: 'clamp(1.8rem,3vw,2.4rem)', lineHeight: 1 }}>
                  {value}
                </p>
                <p className="mt-2.5 text-[10px] font-bold uppercase tracking-wide text-[#7a6e58]">{label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Timeline ── */}
        <section className="mt-14">
          <h2 className="font-extrabold tracking-tight text-[#17201a]" style={{ fontSize: 'clamp(1.5rem,2.5vw,2rem)' }}>
            Calendarul admiterii ANP 2026
          </h2>

          <ol className="timeline-track relative mt-7 space-y-0 pl-12">
            {timeline.map((item, index) => (
              <li
                key={item.title}
                className="perf-reveal perf-reveal-up relative pb-6"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Step dot */}
                <div
                  className="absolute -left-12 flex h-9 w-9 items-center justify-center rounded-full text-sm font-extrabold"
                  style={{
                    background: item.done
                      ? 'linear-gradient(135deg,#1f3a25,#2d5536)'
                      : 'linear-gradient(135deg,#d9b45f,#c8a44e)',
                    color: item.done ? '#d9b45f' : '#17201a',
                    boxShadow: item.done
                      ? '0 4px 14px rgba(31,58,37,0.4)'
                      : '0 4px 14px rgba(217,180,95,0.4)',
                    zIndex: 2,
                  }}
                >
                  {index + 1}
                </div>

                {/* Card */}
                <div
                  className="rounded-2xl p-5"
                  style={{
                    border: '1px solid #ddd5c5',
                    background: 'white',
                    boxShadow: '0 8px 28px rgba(15,23,42,0.04)',
                  }}
                >
                  <p className="text-[11px] font-extrabold uppercase tracking-wide text-[#1f3a25]">{item.date}</p>
                  <h3 className="mt-2 text-base font-extrabold text-[#17201a]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#5f665e]">{item.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* ── Psych areas ── */}
        <section className="mt-14">
          <h2 className="font-extrabold tracking-tight text-[#17201a]" style={{ fontSize: 'clamp(1.5rem,2.5vw,2rem)' }}>
            Ce inseamna testul psihologic ANP
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-8 text-[#5f665e]">
            Evaluarea psihologica nu este o formalitate. Conteaza atentia, autocontrolul, consecventa si felul in care lucrezi cand presiunea creste.
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {psychAreas.map(({ icon: Icon, title, text }, i) => (
              <div
                key={title}
                className="guide-card perf-reveal perf-reveal-up rounded-2xl p-5"
                style={{
                  '--card-glow-color': 'rgba(31,58,37,0.14)',
                  animationDelay: `${i * 0.08}s`,
                  border: '1px solid #ddd5c5',
                  background: 'white',
                  boxShadow: '0 10px 32px rgba(15,23,42,0.05)',
                } as React.CSSProperties}
              >
                <div
                  className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl"
                  style={{ background: '#edf2e8', border: '1px solid #d0dfc8', color: '#1f3a25' }}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-extrabold text-[#17201a]">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#5f665e]">{text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Checklist ── */}
        <section className="mt-14 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <div
              className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-[11px] font-bold uppercase tracking-wide text-white"
              style={{ background: '#1f3a25' }}
            >
              <FileCheck2 className="h-4 w-4 text-[#d9b45f]" />
              Pentru urmatoarele zile
            </div>
            <h2 className="mt-5 font-extrabold tracking-tight text-[#17201a]" style={{ fontSize: 'clamp(1.4rem,2.5vw,1.9rem)' }}>
              Checklist rapid pana la 12 mai
            </h2>
            <p className="mt-4 text-sm leading-6 text-[#5f665e]">
              Cel mai rau scenariu acum este sa fii eligibil, dar sa pierzi timp sau claritate din cauza unui dosar incomplet ori a
              unei pregatiri psihologice facute haotic.
            </p>
          </div>

          <ol className="space-y-3">
            {checklist.map((step, index) => (
              <li
                key={step}
                className="perf-reveal perf-reveal-up flex gap-4 rounded-2xl p-4"
                style={{
                  animationDelay: `${index * 0.07}s`,
                  border: '1px solid #ddd5c5',
                  background: 'white',
                  boxShadow: '0 6px 20px rgba(15,23,42,0.04)',
                }}
              >
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-extrabold text-[#17201a]"
                  style={{ background: 'linear-gradient(135deg,#d9b45f,#c8a44e)' }}
                >
                  {index + 1}
                </span>
                <p className="text-sm leading-6 text-[#3f463e]">{step}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* ── CTA block ── */}
        <section
          className="mt-14 rounded-[28px] p-8"
          style={{ background: '#0e1a10', position: 'relative', overflow: 'hidden' }}
        >
          {/* Gold glow */}
          <div className="pointer-events-none absolute right-0 top-0 h-[300px] w-[300px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(217,180,95,0.15) 0%, transparent 70%)', filter: 'blur(60px)' }} />

          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div
                className="mb-3 inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-[11px] font-bold uppercase text-[#ffe6a3]"
                style={{ background: 'rgba(255,255,255,0.08)' }}
              >
                <ClipboardList className="h-3.5 w-3.5" />
                Pregatire cronometrata
              </div>
              <h2 className="text-xl font-extrabold tracking-tight text-white">
                Intra la psihologic cu ritmul deja format
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-white/60">
                PsihoPrep iti da module pentru ANP, exercitii demo, simulari si review de greseli, ca sa nu descoperi presiunea abia in ziua evaluarii.
              </p>
            </div>
            <Link
              href="/ghiduri#anp"
              className="btn-shimmer inline-flex shrink-0 items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-extrabold text-[#17201a] transition-transform hover:-translate-y-0.5 active:translate-y-0"
              style={{
                background: 'linear-gradient(135deg,#d9b45f,#e8c875)',
                boxShadow: '0 10px 28px rgba(217,180,95,0.35)',
              }}
            >
              Vezi ghidul ANP
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="mt-14">
          <h2 className="font-extrabold tracking-tight text-[#17201a]" style={{ fontSize: 'clamp(1.5rem,2.5vw,2rem)' }}>
            Intrebari frecvente
          </h2>
          <div
            className="mt-6 overflow-hidden rounded-2xl"
            style={{ border: '1px solid #ddd5c5', background: 'white', boxShadow: '0 10px 36px rgba(15,23,42,0.05)' }}
          >
            {faqs.map((item, i) => (
              <div
                key={item.question}
                className="p-6"
                style={{ borderBottom: i < faqs.length - 1 ? '1px solid #ede6d6' : 'none' }}
              >
                <h3 className="flex items-start gap-3 font-extrabold text-[#17201a]">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#1f3a25]" />
                  {item.question}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[#5f665e]">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Sources ── */}
        <section id="surse" className="mt-14">
          <h2 className="font-extrabold tracking-tight text-[#17201a]" style={{ fontSize: 'clamp(1.5rem,2.5vw,2rem)' }}>
            Surse verificate
          </h2>
          <div className="mt-6 grid gap-3">
            {sources.map((source) => (
              <a
                key={source.url}
                href={source.url}
                target="_blank"
                rel="noreferrer"
                className="source-link flex items-start justify-between gap-4 rounded-2xl p-5"
                style={{ color: '#17201a' }}
              >
                <span>
                  <span className="block font-extrabold">{source.name}</span>
                  <span className="mt-1 block text-sm leading-6 text-[#5f665e]">{source.detail}</span>
                </span>
                <ExternalLink className="mt-0.5 h-4 w-4 shrink-0 text-[#b78022]" />
              </a>
            ))}
          </div>
        </section>
      </article>
    </main>
  )
}
