import Link from 'next/link'
import { redirect } from 'next/navigation'
import {
  Eye, Brain, Database, Hash, BookOpen, Users,
  CheckCircle, Shield, Clock, Award, ArrowRight, Star,
  TrendingUp, Zap, Lock, Sparkles,
} from 'lucide-react'
import { createClient } from '@/lib/supabase/server'

const institutions = [
  {
    abbr: 'MAI',
    name: 'Ministerul Afacerilor Interne',
    desc: 'Poliție, Jandarmerie, IGPF',
    gradient: 'from-blue-500 via-blue-600 to-blue-800',
    glow: 'rgba(59,130,246,0.35)',
    ring: 'ring-blue-200',
    questions: '300+',
    categories: 6,
  },
  {
    abbr: 'MApN',
    name: 'Ministerul Apărării Naționale',
    desc: 'Armata Română',
    gradient: 'from-emerald-400 via-emerald-600 to-teal-700',
    glow: 'rgba(16,185,129,0.35)',
    ring: 'ring-emerald-200',
    questions: '250+',
    categories: 6,
  },
  {
    abbr: 'SRI',
    name: 'Serviciul Român de Informații',
    desc: 'Servicii de informații',
    gradient: 'from-rose-500 via-red-600 to-red-800',
    glow: 'rgba(239,68,68,0.35)',
    ring: 'ring-red-200',
    questions: '200+',
    categories: 6,
  },
  {
    abbr: 'ANP',
    name: 'Administrația Națională a Penitenciarelor',
    desc: 'Penitenciare',
    gradient: 'from-violet-500 via-violet-600 to-indigo-700',
    glow: 'rgba(139,92,246,0.35)',
    ring: 'ring-violet-200',
    questions: '200+',
    categories: 6,
  },
]

const categories = [
  { icon: Eye,      title: 'Atenție & Concentrare', desc: 'Toulouse-Piéron, Matrici Raven',      color: 'from-sky-400 to-blue-500',      iconBg: 'bg-sky-50 text-sky-500' },
  { icon: Brain,    title: 'Raționament Logic',      desc: 'Serii numerice, analogii, silogisme', color: 'from-violet-400 to-purple-600',  iconBg: 'bg-purple-50 text-purple-500' },
  { icon: Database, title: 'Memorie',                desc: 'Figuri, cuvinte, secvențe',           color: 'from-amber-400 to-orange-500',   iconBg: 'bg-amber-50 text-amber-500' },
  { icon: Hash,     title: 'Aptitudini Numerice',    desc: 'Calcul rapid, procente, probleme',    color: 'from-emerald-400 to-green-600',  iconBg: 'bg-green-50 text-green-500' },
  { icon: BookOpen, title: 'Vocabular & Limbaj',     desc: 'Sinonime, antonime, definiții',       color: 'from-rose-400 to-pink-600',      iconBg: 'bg-rose-50 text-rose-500' },
  { icon: Users,    title: 'Personalitate',          desc: 'Chestionare, judecată situațională',  color: 'from-teal-400 to-cyan-600',      iconBg: 'bg-teal-50 text-teal-500' },
]

const features = [
  { icon: Zap,       title: 'Teste adaptive',       desc: 'Dificultatea crește pe măsură ce progresezi',    color: 'text-yellow-400', bg: 'bg-yellow-500/10',  metric: '6 niveluri' },
  { icon: Clock,     title: 'Simulare reală',        desc: 'Cronometru strict, condiții de examen real',     color: 'text-blue-400',   bg: 'bg-blue-500/10',    metric: 'Timer exact' },
  { icon: TrendingUp,title: 'Statistici detaliate',  desc: 'Grafice de progres, scor per categorie',         color: 'text-green-400',  bg: 'bg-green-500/10',   metric: '10+ grafice' },
  { icon: Award,     title: 'Flashcard-uri',         desc: 'Memorare rapidă pentru vocabular și formule',    color: 'text-purple-400', bg: 'bg-purple-500/10',  metric: '500+ carduri' },
  { icon: Shield,    title: 'Actualizat constant',   desc: 'Banca de întrebări actualizată periodic',        color: 'text-rose-400',   bg: 'bg-rose-500/10',    metric: 'Mereu fresh' },
  { icon: Lock,      title: 'Plată unică',           desc: 'Fără abonament. Acces pe viață.',                color: 'text-slate-400',  bg: 'bg-slate-500/10',   metric: 'Forever ∞' },
]

const testimonials = [
  { name: 'Alexandru M.', initials: 'AM', role: 'Admis MAI 2024',  institution: 'MAI', instColor: 'from-blue-500 to-blue-700', text: 'Am trecut proba psihologică din prima. Testele de pe platformă sunt foarte similare cu cele reale.', rating: 5 },
  { name: 'Ioana P.',     initials: 'IP', role: 'Admisă MApN 2024', institution: 'MApN', instColor: 'from-emerald-500 to-teal-600', text: 'Simularea de examen m-a ajutat enorm. Știam exact ce să aștept și cum să gestionez timpul.',          rating: 5 },
  { name: 'Mihai C.',     initials: 'MC', role: 'Admis ANP 2023',   institution: 'ANP', instColor: 'from-violet-500 to-indigo-600', text: 'Toulouse-Piéron era cea mai dificilă probă. Cu ajutorul platformei am obținut 87%.',                  rating: 5 },
]

const pricingPlans = [
  {
    name: 'Gratuit',
    price: '0',
    period: '',
    desc: 'Ideal pentru a testa platforma',
    features: ['15 întrebări demo per categorie', 'Acces la toate 4 instituțiile (demo)', 'Statistici de bază'],
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
    features: ['Acces complet la 1 instituție', '200-300+ întrebări per categorie', '6 categorii complete', 'Simulare examen complet', 'Flashcard-uri + Review greșeli', 'Statistici detaliate + grafice', 'Actualizări gratuite pe viață'],
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
    features: ['Acces complet la TOATE 4 instituțiile', '24 module complete (6 × 4)', 'Simulare pentru fiecare instituție', 'Flashcard-uri + Review greșeli', 'Statistici detaliate per instituție', 'Actualizări gratuite pe viață', 'Economisești 157 lei'],
    cta: 'Cumpără acum — 119 lei',
    href: '/auth/register',
    highlight: false,
    highlight2: true,
    badge: 'Best value',
  },
]

export default async function HomePage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    redirect('/dashboard')
  }

  return (
    <div className="min-h-screen bg-white">

      {/* ── Navbar ── */}
      <nav className="sticky top-0 z-50 border-b border-slate-100/80 bg-white/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="interactive-press flex items-center gap-2.5">
            <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-xl flex items-center justify-center shadow-md shadow-indigo-200/50">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="font-extrabold text-slate-900 text-lg tracking-tight">PsihoPrep</span>
          </Link>
          <div className="hidden sm:flex items-center gap-6 text-sm font-medium text-slate-500">
            <a href="#features" className="interactive-press hover:text-slate-900 transition-colors">Funcționalități</a>
            <a href="#institutions" className="interactive-press hover:text-slate-900 transition-colors">Instituții</a>
            <a href="#pricing" className="interactive-press hover:text-slate-900 transition-colors">Prețuri</a>
          </div>
          <div className="flex items-center gap-2.5">
            <Link
              href="/auth/login"
              className="interactive-press px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              Intră în cont
            </Link>
            <Link
              href="/auth/register"
              className="interactive-press interactive-glow px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-violet-600 rounded-xl hover:opacity-90 transition-opacity shadow-md shadow-indigo-200/50 btn-shimmer"
            >
              Înregistrare gratuită
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-mesh-hero pt-20 pb-28 px-6">
        {/* Extra radial blobs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] pointer-events-none -z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-100/50 via-violet-50/30 to-transparent rounded-full blur-3xl" />
        </div>
        <div className="absolute top-20 right-10 w-72 h-72 bg-violet-200/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-56 h-56 bg-indigo-200/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 badge-gradient text-xs font-bold px-4 py-2 rounded-full mb-7 tracking-wide uppercase">
            <Sparkles className="w-3 h-3" />
            Platforma nr. 1 de pregătire psihologică din România
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 leading-[1.05] mb-5 tracking-tight">
            Trece proba psihologică
            <br />
            <span className="gradient-text">
              MAI, MApN, SRI și ANP
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto mb-9 leading-relaxed">
            Sute de întrebări per categorie, simulare cu cronometru real, flashcard-uri
            și statistici detaliate. Tot ce ai nevoie pentru a trece din prima.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-6">
            <Link
              href="/auth/register"
              className="interactive-press interactive-glow inline-flex items-center gap-2 px-8 py-4 text-base font-bold text-white bg-gradient-to-r from-indigo-600 to-violet-600 rounded-2xl glow-cta btn-shimmer shadow-lg shadow-indigo-500/25"
            >
              Începe gratuit
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="#pricing"
              className="interactive-press inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-slate-700 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 transition-colors shadow-sm"
            >
              Vezi prețuri
            </a>
          </div>

          <p className="text-sm text-slate-400 flex items-center justify-center gap-2 mb-14">
            <CheckCircle className="w-4 h-4 text-emerald-500" />
            Nu necesită card de credit · 15 întrebări demo gratuite
          </p>
        </div>

        {/* Stats glass bar */}
        <div className="relative max-w-2xl mx-auto">
          <div className="glass-card rounded-2xl px-6 py-5 grid grid-cols-3 gap-4 text-center">
            {[
              { value: '1,000+', label: 'Întrebări în baza de date', accent: 'text-indigo-600' },
              { value: '4',      label: 'Instituții acoperite',       accent: 'text-violet-600' },
              { value: '6',      label: 'Categorii per instituție',   accent: 'text-purple-600' },
            ].map((stat) => (
              <div key={stat.label} className="space-y-1">
                <p className={`text-2xl font-extrabold tracking-tight ${stat.accent}`}>{stat.value}</p>
                <p className="text-xs text-slate-500 font-medium leading-tight">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Institutions ── */}
      <section id="institutions" className="py-24 px-6 bg-mesh-light">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
              Teste specifice fiecărei instituții
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              Fiecare instituție are propriile standarde. Pregătirea noastră este adaptată exact.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {institutions.map((inst) => (
              <div
                key={inst.abbr}
                className="group relative bg-white rounded-2xl p-6 cursor-pointer card-premium overflow-hidden"
                style={{ '--glow-color': inst.glow } as React.CSSProperties}
              >
                {/* Subtle top gradient */}
                <div className={`absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r ${inst.gradient} opacity-80`} />

                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${inst.gradient} flex items-center justify-center mb-4 shadow-lg transition-transform duration-300 group-hover:scale-110`}
                  style={{ boxShadow: `0 8px 20px -4px ${inst.glow}` }}
                >
                  <span className="text-white font-extrabold text-lg tracking-tight">{inst.abbr}</span>
                </div>
                <h3 className="font-extrabold text-sm text-slate-900 mb-0.5">{inst.abbr}</h3>
                <p className="text-xs font-medium text-slate-600 mb-1 leading-snug">{inst.name}</p>
                <p className="text-xs text-slate-400 mb-4">{inst.desc}</p>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">
                    {inst.questions} întrebări
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">
                    {inst.categories} categorii
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Categories ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
              6 categorii de teste complete
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              Acoperim toate tipurile de probe psihologice folosite în selecția pentru instituțiile publice.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {categories.map((cat) => {
              const Icon = cat.icon
              return (
                <div key={cat.title} className="group bg-white rounded-2xl border border-slate-100 p-6 card-premium">
                  <div className={`w-12 h-12 rounded-xl ${cat.iconBg} flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-slate-800 mb-1.5 tracking-tight">{cat.title}</h3>
                  <p className="text-sm text-slate-500">{cat.desc}</p>
                  {/* Bottom gradient line on hover */}
                  <div className={`absolute bottom-0 inset-x-0 h-0.5 bg-gradient-to-r ${cat.color} opacity-0 group-hover:opacity-100 transition-opacity rounded-b-2xl`} />
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="py-24 px-6 relative overflow-hidden bg-slate-950">
        {/* Background glow blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-600/15 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
              Tot ce ai nevoie pentru a reuși
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              O platformă completă, nu doar o colecție de întrebări.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f) => {
              const Icon = f.icon
              return (
                <div
                  key={f.title}
                  className="group relative bg-white/[0.04] border border-white/[0.08] rounded-2xl p-6 hover:bg-white/[0.07] hover:border-white/[0.14] transition-all duration-200"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-11 h-11 rounded-xl ${f.bg} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
                      <Icon className={`w-5 h-5 ${f.color}`} />
                    </div>
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-white/[0.06] border border-white/[0.08] text-white/50">{f.metric}</span>
                  </div>
                  <h3 className="font-bold text-white mb-1.5 tracking-tight">{f.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{f.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-24 px-6 bg-mesh-light">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
              Ce spun candidații admiși
            </h2>
            <p className="text-slate-500">Peste 500 de candidați s-au pregătit cu PsihoPrep</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={t.name}
                className="group glass-card rounded-2xl p-6 hover:-translate-y-1 transition-all duration-200 flex flex-col"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-0.5">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full text-white bg-gradient-to-r ${t.instColor}`}>{t.institution}</span>
                </div>
                <p className="text-slate-700 text-sm leading-relaxed flex-1 mb-5">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${t.instColor} flex items-center justify-center text-white text-sm font-extrabold shrink-0 shadow-sm`}>
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 text-sm">{t.name}</p>
                    <p className="text-xs text-slate-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section id="pricing" className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
              Prețuri simple, plată unică
            </h2>
            <p className="text-slate-500 max-w-md mx-auto">
              Fără abonament lunar. Plătești o singură dată și ai acces pe viață.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl p-8 flex flex-col transition-all duration-200 ${
                  plan.highlight
                    ? 'bg-gradient-to-b from-indigo-600 to-violet-700 text-white scale-105 shadow-2xl shadow-indigo-300/30'
                    : plan.highlight2
                    ? 'bg-gradient-to-b from-slate-900 to-slate-800 text-white border border-slate-700 shadow-xl shadow-slate-900/20'
                    : 'bg-white border border-slate-100 shadow-sm card-premium'
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
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

                <div className="mb-6">
                  <h3 className={`font-bold text-lg mb-2 ${plan.highlight || plan.highlight2 ? 'text-white' : 'text-slate-800'}`}>{plan.name}</h3>
                  <div className="flex items-end gap-1 mb-1">
                    <span className={`text-4xl font-extrabold tracking-tight ${plan.highlight || plan.highlight2 ? 'text-white' : 'text-slate-900'}`}>{plan.price}</span>
                    {plan.period && <span className={`mb-1 font-semibold ${plan.highlight ? 'text-indigo-200' : plan.highlight2 ? 'text-slate-300' : 'text-slate-400'}`}>{plan.period}</span>}
                  </div>
                  <p className={`text-sm ${plan.highlight ? 'text-indigo-200' : plan.highlight2 ? 'text-slate-300' : 'text-slate-500'}`}>{plan.desc}</p>
                </div>

                <ul className="space-y-2.5 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className={`flex items-start gap-2.5 text-sm ${plan.highlight ? 'text-indigo-100' : plan.highlight2 ? 'text-slate-200' : 'text-slate-600'}`}>
                      <CheckCircle className={`w-4 h-4 shrink-0 mt-0.5 ${plan.highlight ? 'text-indigo-200' : plan.highlight2 ? 'text-amber-400' : 'text-emerald-500'}`} />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link href={plan.href}>
                  <div className={`w-full py-3 rounded-xl text-sm font-bold text-center transition-all duration-200 btn-shimmer ${
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
            ))}
          </div>

          <p className="text-center text-sm text-slate-400 mt-8 flex items-center justify-center gap-4 flex-wrap">
            <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-emerald-500" /> Garanție 7 zile</span>
            <span className="flex items-center gap-1.5"><Lock className="w-3.5 h-3.5 text-slate-400" /> Plată securizată prin Stripe</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-slate-400" /> Fără costuri ascunse</span>
          </p>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-28 px-6 relative overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-800">
        {/* Glow blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-violet-400/20 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-300/10 rounded-full blur-2xl" />
        </div>
        <div className="relative max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/15 text-white text-xs font-semibold px-4 py-2 rounded-full mb-6 border border-white/20">
            <Zap className="w-3.5 h-3.5 text-yellow-300" />
            Mii de candidați pregătiți
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight leading-tight">
            Pregătește-te serios.
            <br />Trece din prima.
          </h2>
          <p className="text-indigo-200 text-lg mb-10 leading-relaxed">
            Mii de candidați s-au pregătit cu PsihoPrep. Acum e rândul tău.
          </p>
          <Link
            href="/auth/register"
            className="inline-flex items-center gap-2 px-10 py-4 text-base font-bold text-indigo-700 bg-white rounded-2xl hover:bg-indigo-50 transition-colors shadow-xl shadow-indigo-900/30 btn-shimmer"
          >
            Creează cont gratuit
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-slate-100 bg-white">
        {/* Trust bar */}
        <div className="border-b border-slate-100 py-4 px-6">
          <div className="max-w-5xl mx-auto flex items-center justify-center gap-6 flex-wrap">
            {[
              { icon: Shield, text: 'Garanție 7 zile', color: 'text-emerald-500' },
              { icon: Lock, text: 'Plată Stripe securizată', color: 'text-slate-400' },
              { icon: CheckCircle, text: 'Acces instant', color: 'text-blue-500' },
              { icon: Users, text: '500+ candidați pregătiți', color: 'text-violet-500' },
            ].map(({ icon: Icon, text, color }) => (
              <span key={text} className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                <Icon className={`w-3.5 h-3.5 ${color}`} />
                {text}
              </span>
            ))}
          </div>
        </div>
        <div className="py-8 px-6">
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-lg flex items-center justify-center">
                <Brain className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="font-bold text-slate-700 text-sm">PsihoPrep</span>
            </div>
            <p className="text-sm text-slate-400">
              © {new Date().getFullYear()} PsihoPrep. Toate drepturile rezervate.
            </p>
            <div className="flex items-center gap-4 text-sm text-slate-400">
              <a href="#" className="hover:text-slate-600 transition-colors">Termeni</a>
              <a href="#" className="hover:text-slate-600 transition-colors">Confidențialitate</a>
              <a href="#" className="hover:text-slate-600 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
