import Link from 'next/link'
import { redirect } from 'next/navigation'
import {
  Eye, Brain, Database, Hash, BookOpen, Users,
  CheckCircle, Shield, Clock, Award, ArrowRight, Star,
  TrendingUp, Zap, Lock, Sparkles, CalendarDays, FileText,
  Share, MoreVertical, Plus, Smartphone,
} from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { IconBadge } from '@/components/ui/icon-badge'
import { ScrollReveal } from '@/components/ui/scroll-reveal'

const institutions = [
  {
    abbr: 'MAI',
    name: 'Ministerul Afacerilor Interne',
    desc: 'Poliție, Jandarmerie, IGSU',
    image: '/images/mai.png',
    gradient: 'from-blue-500 via-blue-600 to-blue-800',
    glow: 'rgba(59,130,246,0.35)',
  },
  {
    abbr: 'MApN',
    name: 'Ministerul Apărării Naționale',
    desc: 'Armata Română',
    image: '/images/mapn.png',
    gradient: 'from-emerald-400 via-emerald-600 to-teal-700',
    glow: 'rgba(16,185,129,0.35)',
  },
  {
    abbr: 'SRI',
    name: 'Serviciul Român de Informații',
    desc: 'Servicii de informații',
    image: '/images/sri.png',
    gradient: 'from-rose-500 via-red-600 to-red-800',
    glow: 'rgba(239,68,68,0.35)',
  },
  {
    abbr: 'ANP',
    name: 'Administrația Națională a Penitenciarelor',
    desc: 'Penitenciare',
    image: '/images/anp.png',
    gradient: 'from-violet-500 via-violet-600 to-indigo-700',
    glow: 'rgba(139,92,246,0.35)',
  },
]

const categories = [
  { icon: Eye,      title: 'Atenție & Concentrare', desc: 'Toulouse-Piéron, Matrici Raven' },
  { icon: Brain,    title: 'Raționament Logic',      desc: 'Serii numerice, analogii, silogisme' },
  { icon: Database, title: 'Memorie',                desc: 'Figuri, cuvinte, secvențe' },
  { icon: Hash,     title: 'Aptitudini Numerice',    desc: 'Calcul rapid, procente, probleme' },
  { icon: BookOpen, title: 'Vocabular & Limbaj',     desc: 'Sinonime, antonime, definiții' },
  { icon: Users,    title: 'Personalitate',          desc: 'Chestionare, judecată situațională' },
]

const features = [
  { icon: Zap,        title: 'Teste adaptive',       desc: 'Dificultatea crește pe măsură ce progresezi',    metric: '6 niveluri' },
  { icon: Clock,      title: 'Simulare reală',        desc: 'Cronometru strict, condiții de examen real',     metric: 'Timer exact' },
  { icon: TrendingUp, title: 'Statistici detaliate',  desc: 'Grafice de progres, scor per categorie',         metric: '10+ grafice' },
  { icon: Award,      title: 'Flashcard-uri',         desc: 'Memorare rapidă pentru vocabular și formule',    metric: '500+ carduri' },
  { icon: Shield,     title: 'Actualizat constant',   desc: 'Banca de întrebări actualizată periodic',        metric: 'Mereu fresh' },
  { icon: Lock,       title: 'Plată unică',           desc: 'Fără abonament. Acces pe viață.',                metric: 'Forever ∞' },
]

const testimonials = [
  { name: 'Alexandru M.', initials: 'AM', role: 'Admis MAI 2024',   instColor: 'from-blue-500 to-blue-700',      text: 'Am trecut proba psihologică din prima. Testele de pe platformă sunt foarte similare cu cele reale.', rating: 5 },
  { name: 'Ioana P.',     initials: 'IP', role: 'Admisă MApN 2024', instColor: 'from-emerald-500 to-teal-600',   text: 'Simularea de examen m-a ajutat enorm. Știam exact ce să aștept și cum să gestionez timpul.',          rating: 5 },
  { name: 'Mihai C.',     initials: 'MC', role: 'Admis ANP 2023',   instColor: 'from-violet-500 to-indigo-600',  text: 'Toulouse-Piéron era cea mai dificilă probă. Cu ajutorul platformei am obținut 87%.',                  rating: 5 },
]

const pricingPlans = [
  {
    name: 'Gratuit',
    price: '0',
    period: '',
    desc: 'Ideal pentru a testa platforma',
    features: ['Demo per categorie', 'Acces la toate 4 instituțiile (demo)', 'Statistici de bază'],
    cta: 'Înregistrare gratuită',
    href: '/auth/register',
    highlight: false,
    highlight2: false,
    badge: null,
  },
  {
    name: 'O Instituție',
    price: '69',
    period: 'lei',
    desc: 'Acces complet la instituția dorită',
    features: ['Acces complet la 1 instituție', '6 categorii complete', 'Simulare examen complet', 'Flashcard-uri + Review greșeli', 'Statistici detaliate + grafice', 'Actualizări gratuite pe viață'],
    cta: 'Cumpără acum — 69 lei',
    href: '/auth/register',
    highlight: true,
    highlight2: false,
    badge: 'Popular',
  },
  {
    name: 'Toate Instituțiile',
    price: '119',
    period: 'lei',
    desc: 'MAI + MApN + SRI + ANP',
    features: ['Acces complet la TOATE 4 instituțiile', '24 module complete', 'Simulare pentru fiecare instituție', 'Flashcard-uri + Review greșeli', 'Statistici per instituție', 'Actualizări gratuite pe viață', 'Economisești 157 lei'],
    cta: 'Cumpără acum — 119 lei',
    href: '/auth/register',
    highlight: false,
    highlight2: true,
    badge: 'Best value',
  },
]

const iosSteps = [
  {
    step: '1',
    title: 'Deschide Safari',
    desc: 'Accesează psihoprep.ro în Safari pe iPhone sau iPad',
    icon: (
      <svg viewBox="0 0 40 40" className="w-8 h-8" fill="none">
        <circle cx="20" cy="20" r="20" fill="#006CFF" />
        <circle cx="20" cy="20" r="14" fill="none" stroke="white" strokeWidth="1.5" />
        <line x1="20" y1="6" x2="20" y2="34" stroke="white" strokeWidth="1.5" />
        <line x1="6" y1="20" x2="34" y2="20" stroke="white" strokeWidth="1.5" />
        <path d="M10 14 Q20 8 30 14" fill="none" stroke="white" strokeWidth="1.5" />
        <path d="M10 26 Q20 32 30 26" fill="none" stroke="white" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    step: '2',
    title: 'Apasă Share',
    desc: 'Apasă iconița Share (pătratul cu săgeată) din bara de jos',
    icon: (
      <svg viewBox="0 0 40 40" className="w-8 h-8" fill="none">
        <rect width="40" height="40" rx="10" fill="#f1f5f9" />
        <rect x="13" y="20" width="14" height="12" rx="2" fill="none" stroke="#475569" strokeWidth="1.8" />
        <path d="M20 8 L20 22" stroke="#475569" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M16 12 L20 8 L24 12" stroke="#475569" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    step: '3',
    title: 'Adaugă pe ecran',
    desc: 'Derulează în jos și apasă „Adaugă pe ecranul principal"',
    icon: (
      <svg viewBox="0 0 40 40" className="w-8 h-8" fill="none">
        <rect width="40" height="40" rx="10" fill="#f0fdf4" />
        <rect x="8" y="10" width="24" height="20" rx="3" fill="none" stroke="#16a34a" strokeWidth="1.8" />
        <path d="M20 15 L20 25M15 20 L25 20" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    step: '4',
    title: 'Confirmă',
    desc: 'Apasă „Adaugă" în colțul din dreapta sus. Gata!',
    icon: (
      <svg viewBox="0 0 40 40" className="w-8 h-8" fill="none">
        <rect width="40" height="40" rx="10" fill="#eff6ff" />
        <path d="M12 20 L18 26 L28 14" stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
]

const androidSteps = [
  {
    step: '1',
    title: 'Deschide Chrome',
    desc: 'Accesează psihoprep.ro în Google Chrome pe Android',
    icon: (
      <svg viewBox="0 0 40 40" className="w-8 h-8" fill="none">
        <circle cx="20" cy="20" r="20" fill="#fff" />
        <circle cx="20" cy="20" r="9" fill="#4285F4" />
        <circle cx="20" cy="20" r="5" fill="white" />
        <path d="M20 11 L33 11 Q37 20 33 29 L20 20 Z" fill="#EA4335" />
        <path d="M20 11 L7 29 Q3 20 7 11 Z" fill="#FBBC04" />
        <path d="M7 29 L20 20 L33 29 Q26 37 14 37 Z" fill="#34A853" />
      </svg>
    ),
  },
  {
    step: '2',
    title: 'Meniu (⋮)',
    desc: 'Apasă cele 3 puncte verticale din dreapta sus a browserului',
    icon: (
      <svg viewBox="0 0 40 40" className="w-8 h-8" fill="none">
        <rect width="40" height="40" rx="10" fill="#f8fafc" />
        <circle cx="20" cy="12" r="2.5" fill="#475569" />
        <circle cx="20" cy="20" r="2.5" fill="#475569" />
        <circle cx="20" cy="28" r="2.5" fill="#475569" />
      </svg>
    ),
  },
  {
    step: '3',
    title: 'Adaugă pe ecran',
    desc: 'Selectează „Adaugă pe ecranul de pornire" din meniu',
    icon: (
      <svg viewBox="0 0 40 40" className="w-8 h-8" fill="none">
        <rect width="40" height="40" rx="10" fill="#f0fdf4" />
        <rect x="8" y="10" width="24" height="20" rx="3" fill="none" stroke="#16a34a" strokeWidth="1.8" />
        <path d="M20 15 L20 25M15 20 L25 20" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    step: '4',
    title: 'Instalează',
    desc: 'Apasă „Adaugă" sau „Instalează". Iconița apare instant!',
    icon: (
      <svg viewBox="0 0 40 40" className="w-8 h-8" fill="none">
        <rect width="40" height="40" rx="10" fill="#eff6ff" />
        <path d="M12 20 L18 26 L28 14" stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
]

export default async function HomePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (user) redirect('/dashboard')

  return (
    <div className="min-h-screen bg-white">

      {/* ── Navbar ── */}
      <nav className="sticky top-0 z-50 border-b border-slate-100/80 bg-white/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
          <Link href="/" className="interactive-press flex items-center gap-2">
            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-xl flex items-center justify-center shadow-md shadow-indigo-200/50">
              <Brain className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <span className="font-extrabold text-slate-900 text-base sm:text-lg tracking-tight">PsihoPrep</span>
          </Link>
          <div className="hidden md:flex items-center gap-5 text-sm font-medium text-slate-500">
            <a href="#features"      className="interactive-press hover:text-slate-900 transition-colors">Funcționalități</a>
            <a href="#institutions"  className="interactive-press hover:text-slate-900 transition-colors">Instituții</a>
            <Link href="/ghid/test-psihologic-mai-2026" className="interactive-press hover:text-slate-900 transition-colors">Ghid MAI 2026</Link>
            <a href="#pricing"       className="interactive-press hover:text-slate-900 transition-colors">Prețuri</a>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/auth/login" className="interactive-press px-3 py-1.5 sm:px-4 sm:py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
              Intră în cont
            </Link>
            <Link href="/auth/register" className="interactive-press interactive-glow px-3 py-1.5 sm:px-4 sm:py-2 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-violet-600 rounded-xl hover:opacity-90 transition-opacity shadow-md shadow-indigo-200/50 btn-shimmer">
              Înregistrare
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Alert banner ── */}
      <section className="border-b border-blue-100 bg-blue-50/80 px-4 sm:px-6 py-2.5 sm:py-3">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 text-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-2 text-blue-950">
            <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-blue-700" />
            <p className="text-xs sm:text-sm">
              <span className="font-extrabold">Sesiunea MAI Aprilie-Mai 2026 este activă.</span>{' '}
              <span className="hidden sm:inline">Vezi ce include testul psihologic și cum să te pregătești.</span>
            </p>
          </div>
          <Link href="/ghid/test-psihologic-mai-2026" className="interactive-press inline-flex shrink-0 items-center gap-1.5 text-xs font-extrabold text-blue-700 hover:text-blue-900">
            Citește ghidul <FileText className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-mesh-hero pt-14 pb-20 sm:pt-20 sm:pb-28 px-4 sm:px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] sm:w-[1000px] h-[400px] sm:h-[600px] pointer-events-none -z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-100/50 via-violet-50/30 to-transparent rounded-full blur-3xl" />
        </div>
        <div className="absolute top-20 right-4 sm:right-10 w-48 sm:w-72 h-48 sm:h-72 bg-violet-200/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-4 sm:left-10 w-40 sm:w-56 h-40 sm:h-56 bg-indigo-200/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center">
          {/* Badge — animate in */}
          <div className="animate-fade-in inline-flex items-center gap-2 badge-gradient text-[10px] sm:text-xs font-bold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-5 sm:mb-7 tracking-wide uppercase">
            <Sparkles className="w-3 h-3" />
            Pregătire psihologică pentru MAI, MApN, SRI, ANP
          </div>

          <h1 className="animate-fade-up text-[2.6rem] sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-slate-900 leading-[1.05] mb-4 sm:mb-5 tracking-tight">
            PsihoPrep
            <br />
            <span className="gradient-text">
              Pregătire inteligentă<br className="sm:hidden" /> pentru proba psihologică
            </span>
          </h1>

          <p className="animate-fade-up [animation-delay:100ms] text-base sm:text-lg xl:text-xl text-slate-500 max-w-2xl mx-auto mb-7 sm:mb-9 leading-relaxed px-2">
            Simulare de examen în condiții reale, antrenament structurat pe categorii
            și analiză completă a performanței tale.
          </p>

          <div className="animate-fade-up [animation-delay:200ms] flex flex-col sm:flex-row items-center justify-center gap-3 mb-5">
            <Link href="/auth/register" className="interactive-press interactive-glow w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 sm:px-8 sm:py-4 text-base font-bold text-white bg-gradient-to-r from-indigo-600 to-violet-600 rounded-2xl glow-cta btn-shimmer shadow-lg shadow-indigo-500/25">
              Începe gratuit
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a href="#pricing" className="interactive-press w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 sm:px-8 sm:py-4 text-base font-semibold text-slate-700 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 transition-colors shadow-sm">
              Vezi prețuri
            </a>
          </div>

          <p className="animate-fade-up [animation-delay:280ms] text-xs sm:text-sm text-slate-400 flex items-center justify-center gap-2 mb-12 sm:mb-14">
            <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
            Nu necesită card de credit · Demo gratuit
          </p>
        </div>

        {/* Stats glass bar */}
        <div className="animate-fade-up [animation-delay:360ms] relative max-w-lg mx-auto px-4">
          <div className="glass-card rounded-2xl px-4 sm:px-6 py-4 sm:py-5 grid grid-cols-3 gap-3 sm:gap-4 text-center">
            {[
              { value: '4',    label: 'Instituții acoperite',     accent: 'text-indigo-600' },
              { value: '6',    label: 'Categorii per instituție', accent: 'text-violet-600' },
              { value: '24/7', label: 'Acces nelimitat',          accent: 'text-purple-600' },
            ].map((stat) => (
              <div key={stat.label} className="space-y-1">
                <p className={`text-xl sm:text-2xl font-extrabold tracking-tight ${stat.accent}`}>{stat.value}</p>
                <p className="text-[10px] sm:text-xs text-slate-500 font-medium leading-tight">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Institutions ── */}
      <section id="institutions" className="py-16 sm:py-24 px-4 sm:px-6 bg-mesh-light">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-10 sm:mb-14">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
              Teste specifice fiecărei instituții
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto text-sm sm:text-base">
              Fiecare instituție are propriile standarde. Pregătirea noastră este adaptată exact.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
            {institutions.map((inst, i) => (
              <ScrollReveal key={inst.abbr} delay={i * 80}>
                <div
                  className="group relative bg-white rounded-2xl cursor-pointer card-premium overflow-hidden h-full"
                  style={{ '--glow-color': inst.glow } as React.CSSProperties}
                >
                  <div className={`absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r ${inst.gradient} opacity-80`} />
                  <div className="relative h-28 sm:h-36 overflow-hidden">
                    <img
                      src={inst.image}
                      alt={inst.name}
                      className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-3 sm:p-5">
                      <div
                        className={`w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br ${inst.gradient} flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110`}
                        style={{ boxShadow: `0 8px 20px -4px ${inst.glow}` }}
                      >
                        <span className="text-white font-extrabold text-sm sm:text-lg tracking-tight">{inst.abbr}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 sm:p-6 sm:pt-5">
                    <h3 className="font-extrabold text-xs sm:text-sm text-slate-900 mb-0.5">{inst.abbr}</h3>
                    <p className="text-[10px] sm:text-xs font-medium text-slate-600 mb-0.5 sm:mb-1 leading-snug">{inst.name}</p>
                    <p className="text-[10px] sm:text-xs text-slate-400">{inst.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Categories ── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-10 sm:mb-14">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
              6 categorii de teste complete
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto text-sm sm:text-base">
              Acoperim toate tipurile de probe psihologice folosite în selecție.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
            {categories.map((cat, i) => {
              const Icon = cat.icon
              return (
                <ScrollReveal key={cat.title} delay={i * 60}>
                  <div className="group bg-white rounded-2xl border border-slate-100 p-4 sm:p-6 card-premium h-full">
                    <IconBadge icon={Icon} className="mb-3 sm:mb-4 h-10 w-10 sm:h-12 sm:w-12 rounded-xl border-slate-200 bg-slate-100 text-slate-700 shadow-none backdrop-blur-0 transition-transform duration-300 group-hover:scale-110" iconClassName="h-5 w-5 sm:h-6 sm:w-6 text-slate-700" />
                    <h3 className="font-bold text-xs sm:text-sm text-slate-800 mb-1 sm:mb-1.5 tracking-tight leading-tight">{cat.title}</h3>
                    <p className="text-[10px] sm:text-sm text-slate-500 leading-snug">{cat.desc}</p>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="py-16 sm:py-24 px-4 sm:px-6 relative overflow-hidden bg-slate-950">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-indigo-600/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-violet-600/15 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-10 sm:mb-14">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mb-3">
              Tot ce ai nevoie pentru a reuși
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto text-sm sm:text-base">
              O platformă completă, nu doar o colecție de întrebări.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
            {features.map((f, i) => {
              const Icon = f.icon
              return (
                <ScrollReveal key={f.title} delay={i * 70}>
                  <div className="group relative bg-white/[0.04] border border-white/[0.08] rounded-2xl p-4 sm:p-6 hover:bg-white/[0.07] hover:border-white/[0.14] transition-all duration-200 h-full">
                    <div className="flex items-start justify-between mb-3 sm:mb-4">
                      <IconBadge icon={Icon} className="h-9 w-9 sm:h-11 sm:w-11 rounded-xl bg-white/[0.06] text-white shadow-none transition-transform duration-300 group-hover:scale-110" iconClassName="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                      <span className="text-[9px] sm:text-[10px] font-bold px-2 py-1 rounded-full bg-white/[0.06] border border-white/[0.08] text-white/50">{f.metric}</span>
                    </div>
                    <h3 className="font-bold text-xs sm:text-sm text-white mb-1 sm:mb-1.5 tracking-tight leading-tight">{f.title}</h3>
                    <p className="text-[10px] sm:text-sm text-slate-400 leading-snug">{f.desc}</p>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-mesh-light">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-10 sm:mb-14">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
              Ce spun candidații admiși
            </h2>
            <p className="text-slate-500 text-sm sm:text-base">Peste 500 de candidați s-au pregătit cu PsihoPrep</p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {testimonials.map((t, i) => (
              <ScrollReveal key={t.name} delay={i * 100}>
                <div className="glass-card rounded-2xl p-5 sm:p-6 flex flex-col h-full">
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-slate-700 text-sm leading-relaxed flex-1 mb-4 sm:mb-5">&ldquo;{t.text}&rdquo;</p>
                  <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                    <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br ${t.instColor} flex items-center justify-center text-white text-xs sm:text-sm font-extrabold shrink-0 shadow-sm`}>
                      {t.initials}
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 text-sm">{t.name}</p>
                      <p className="text-xs text-slate-500">{t.role}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Install on Home Screen ── */}
      <section id="install" className="py-16 sm:py-24 px-4 sm:px-6 bg-white overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 text-xs font-bold px-4 py-2 rounded-full mb-4 border border-indigo-100">
              <Smartphone className="w-3.5 h-3.5" />
              Instalare gratuită
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
              Adaugă PsihoPrep pe ecranul tău
            </h2>
            <p className="text-slate-500 max-w-lg mx-auto text-sm sm:text-base">
              Funcționează ca o aplicație nativă — fără App Store, fără descărcare.
              Acces instant, direct de pe ecranul principal al telefonului.
            </p>
          </ScrollReveal>

          {/* Benefits row */}
          <ScrollReveal className="mb-10 sm:mb-14">
            <div className="grid grid-cols-3 gap-3 sm:gap-4 max-w-2xl mx-auto">
              {[
                { icon: Zap,          label: 'Lansare instant',    sub: 'Un singur tap' },
                { icon: Lock,         label: 'Fără App Store',     sub: 'Instalare directă' },
                { icon: TrendingUp,   label: 'Ecran complet',      sub: 'Fără bara browser' },
              ].map((b) => {
                const Icon = b.icon
                return (
                  <div key={b.label} className="flex flex-col items-center text-center gap-2 p-3 sm:p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-indigo-100 flex items-center justify-center">
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-bold text-slate-800 leading-tight">{b.label}</p>
                      <p className="text-[10px] sm:text-xs text-slate-400 mt-0.5">{b.sub}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </ScrollReveal>

          {/* iOS & Android steps */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">

            {/* iOS */}
            <ScrollReveal direction="left">
              <div className="rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
                {/* Header */}
                <div className="bg-gradient-to-r from-slate-800 to-slate-900 px-5 sm:px-6 py-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">iPhone / iPad</p>
                    <p className="text-white/40 text-xs">Safari · iOS 14+</p>
                  </div>
                </div>

                {/* Steps */}
                <div className="bg-white divide-y divide-slate-50">
                  {iosSteps.map((s, i) => (
                    <div key={i} className="flex items-start gap-4 px-5 sm:px-6 py-4 sm:py-5">
                      <div className="shrink-0 mt-0.5">{s.icon}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-500 text-[10px] font-extrabold flex items-center justify-center shrink-0">
                            {s.step}
                          </span>
                          <p className="font-bold text-slate-900 text-sm">{s.title}</p>
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed">{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer tip */}
                <div className="bg-slate-50 px-5 sm:px-6 py-3 flex items-start gap-2">
                  <Share className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                  <p className="text-[10px] sm:text-xs text-slate-400 leading-relaxed">
                    Butonul Share arată ca un <strong>pătrat cu o săgeată în sus</strong> și se află în bara de jos a Safari.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Android */}
            <ScrollReveal direction="right">
              <div className="rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
                {/* Header */}
                <div className="bg-gradient-to-r from-green-700 to-emerald-800 px-5 sm:px-6 py-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                      <path d="M17.523 15.341l-.023-6.668 1.5-.001.024 6.669zM15 9.527l-4.958 2.875L5.085 9.55l4.958-2.875zm-4.958 3.952L5.084 10.6l.023 6.668 4.958 2.875zM14.957 13.5l4.958 2.875.023-6.668-4.958-2.875zm-5.872 3.748L4.127 14.37 4.15 7.7 9.108 4.826l4.957 2.877zm9.916-9.248L14.043 5.1 9.085 7.975l4.958 2.875z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">Android</p>
                    <p className="text-white/40 text-xs">Chrome · Android 8+</p>
                  </div>
                </div>

                {/* Steps */}
                <div className="bg-white divide-y divide-slate-50">
                  {androidSteps.map((s, i) => (
                    <div key={i} className="flex items-start gap-4 px-5 sm:px-6 py-4 sm:py-5">
                      <div className="shrink-0 mt-0.5">{s.icon}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-500 text-[10px] font-extrabold flex items-center justify-center shrink-0">
                            {s.step}
                          </span>
                          <p className="font-bold text-slate-900 text-sm">{s.title}</p>
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed">{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer tip */}
                <div className="bg-slate-50 px-5 sm:px-6 py-3 flex items-start gap-2">
                  <MoreVertical className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                  <p className="text-[10px] sm:text-xs text-slate-400 leading-relaxed">
                    Meniul <strong>⋮</strong> se află în colțul din dreapta sus al browserului Chrome.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Result preview */}
          <ScrollReveal className="mt-8 sm:mt-10">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 bg-gradient-to-r from-indigo-50 to-violet-50 rounded-2xl p-5 sm:p-6 border border-indigo-100">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-200/50 shrink-0">
                <Brain className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
              <div className="text-center sm:text-left">
                <p className="font-extrabold text-slate-900 text-base sm:text-lg">PsihoPrep apare pe ecranul tău principal</p>
                <p className="text-slate-500 text-sm mt-1">Acces cu un singur tap, experiență fullscreen, exact ca o aplicație.</p>
              </div>
              <Link href="/auth/register" className="shrink-0 interactive-press inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-indigo-600 to-violet-600 rounded-xl shadow-md shadow-indigo-200/50 btn-shimmer hover:opacity-90 transition-opacity whitespace-nowrap">
                <Plus className="w-4 h-4" /> Instalează acum
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section id="pricing" className="py-16 sm:py-24 px-4 sm:px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-10 sm:mb-14">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
              Prețuri simple, plată unică
            </h2>
            <p className="text-slate-500 max-w-md mx-auto text-sm sm:text-base">
              Fără abonament lunar. Plătești o singură dată și ai acces pe viață.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 items-start sm:items-stretch">
            {pricingPlans.map((plan, i) => (
              <ScrollReveal key={plan.name} delay={i * 80}>
                <div
                  className={`relative rounded-2xl p-6 sm:p-8 flex flex-col h-full transition-all duration-200 ${
                    plan.highlight
                      ? 'bg-gradient-to-b from-indigo-600 to-violet-700 text-white shadow-2xl shadow-indigo-300/30 sm:scale-105'
                      : plan.highlight2
                      ? 'bg-gradient-to-b from-slate-900 to-slate-800 text-white border border-slate-700 shadow-xl shadow-slate-900/20'
                      : 'bg-white border border-slate-100 shadow-sm'
                  }`}
                >
                  {plan.badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className={`text-xs font-bold px-4 py-1.5 rounded-full shadow-md ${
                        plan.highlight
                          ? 'bg-white text-indigo-700'
                          : plan.highlight2
                          ? 'bg-gradient-to-r from-amber-400 to-orange-400 text-white'
                          : 'bg-slate-900 text-white'
                      }`}>
                        {plan.badge}
                      </span>
                    </div>
                  )}

                  <div className="mb-5 sm:mb-6">
                    <h3 className={`font-bold text-base sm:text-lg mb-2 ${plan.highlight || plan.highlight2 ? 'text-white' : 'text-slate-800'}`}>{plan.name}</h3>
                    <div className="flex items-end gap-1 mb-1">
                      <span className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${plan.highlight || plan.highlight2 ? 'text-white' : 'text-slate-900'}`}>{plan.price}</span>
                      {plan.period && <span className={`mb-1 font-semibold text-sm ${plan.highlight ? 'text-indigo-200' : plan.highlight2 ? 'text-slate-300' : 'text-slate-400'}`}>{plan.period}</span>}
                    </div>
                    <p className={`text-xs sm:text-sm ${plan.highlight ? 'text-indigo-200' : plan.highlight2 ? 'text-slate-300' : 'text-slate-500'}`}>{plan.desc}</p>
                  </div>

                  <ul className="space-y-2 sm:space-y-2.5 mb-6 sm:mb-8 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className={`flex items-start gap-2 sm:gap-2.5 text-xs sm:text-sm ${plan.highlight ? 'text-indigo-100' : plan.highlight2 ? 'text-slate-200' : 'text-slate-600'}`}>
                        <CheckCircle className={`w-4 h-4 shrink-0 mt-0.5 ${plan.highlight ? 'text-indigo-200' : plan.highlight2 ? 'text-amber-400' : 'text-emerald-500'}`} />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Link href={plan.href}>
                    <div className={`w-full py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold text-center transition-all duration-200 btn-shimmer ${
                      plan.highlight
                        ? 'bg-white text-indigo-700 hover:bg-indigo-50 shadow-md'
                        : plan.highlight2
                        ? 'bg-gradient-to-r from-amber-400 to-orange-400 text-white hover:opacity-90 shadow-md shadow-amber-500/30'
                        : 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:opacity-90 shadow-md shadow-indigo-200/50'
                    }`}>
                      {plan.cta}
                    </div>
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <p className="text-center text-xs sm:text-sm text-slate-400 mt-6 sm:mt-8 flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
              <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-emerald-500" /> Garanție 7 zile</span>
              <span className="flex items-center gap-1.5"><Lock className="w-3.5 h-3.5 text-slate-400" /> Plată securizată prin Stripe</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-slate-400" /> Fără costuri ascunse</span>
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 relative overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-800">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -right-32 w-64 sm:w-96 h-64 sm:h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-64 sm:w-96 h-64 sm:h-96 bg-violet-400/20 rounded-full blur-3xl" />
        </div>
        <ScrollReveal className="relative max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/15 text-white text-xs font-semibold px-4 py-2 rounded-full mb-5 sm:mb-6 border border-white/20">
            <Zap className="w-3.5 h-3.5 text-yellow-300" />
            Mii de candidați pregătiți
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4 tracking-tight leading-tight">
            Pregătește-te serios.<br />Trece din prima.
          </h2>
          <p className="text-indigo-200 text-base sm:text-lg mb-8 sm:mb-10 leading-relaxed">
            Mii de candidați s-au pregătit cu PsihoPrep. Acum e rândul tău.
          </p>
          <Link href="/auth/register" className="inline-flex items-center gap-2 px-8 sm:px-10 py-3.5 sm:py-4 text-sm sm:text-base font-bold text-indigo-700 bg-white rounded-2xl hover:bg-indigo-50 transition-colors shadow-xl shadow-indigo-900/30 btn-shimmer">
            Creează cont gratuit
            <ArrowRight className="w-5 h-5" />
          </Link>
        </ScrollReveal>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-slate-100 bg-white">
        <div className="border-b border-slate-100 py-3 sm:py-4 px-4 sm:px-6">
          <div className="max-w-5xl mx-auto flex items-center justify-center gap-4 sm:gap-6 flex-wrap">
            {[
              { icon: Shield,       text: 'Garanție 7 zile',        color: 'text-emerald-500' },
              { icon: Lock,         text: 'Plată Stripe securizată', color: 'text-slate-400' },
              { icon: CheckCircle,  text: 'Acces instant',          color: 'text-blue-500' },
              { icon: Users,        text: '500+ candidați',         color: 'text-violet-500' },
            ].map(({ icon: Icon, text, color }) => (
              <span key={text} className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                <Icon className={`w-3.5 h-3.5 ${color}`} />
                {text}
              </span>
            ))}
          </div>
        </div>
        <div className="py-6 sm:py-8 px-4 sm:px-6">
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-lg flex items-center justify-center">
                <Brain className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="font-bold text-slate-700 text-sm">PsihoPrep</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 text-center">
              © {new Date().getFullYear()} PsihoPrep. Toate drepturile rezervate.
            </p>
            <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-slate-400">
              <Link href="/termeni" className="hover:text-slate-600 transition-colors">Termeni</Link>
              <Link href="/confidentialitate" className="hover:text-slate-600 transition-colors">Confidențialitate</Link>
              <Link href="/contact" className="hover:text-slate-600 transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </footer>

    </div>
  )
}
