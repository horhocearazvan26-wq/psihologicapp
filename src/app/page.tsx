import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Eye, Brain, Database, Hash, BookOpen, Users,
  CheckCircle, Shield, Clock, Award, ArrowRight, Star,
  TrendingUp, Zap, Lock
} from 'lucide-react'

const institutions = [
  {
    abbr: 'MAI',
    name: 'Ministerul Afacerilor Interne',
    desc: 'Poliție, Jandarmerie, IGPF',
    color: 'from-blue-500 to-blue-700',
    light: 'bg-blue-50 border-blue-100',
    textColor: 'text-blue-700',
  },
  {
    abbr: 'MApN',
    name: 'Ministerul Apărării Naționale',
    desc: 'Armata Română',
    color: 'from-green-500 to-green-700',
    light: 'bg-green-50 border-green-100',
    textColor: 'text-green-700',
  },
  {
    abbr: 'SRI',
    name: 'Serviciul Român de Informații',
    desc: 'Servicii de informații',
    color: 'from-red-500 to-red-700',
    light: 'bg-red-50 border-red-100',
    textColor: 'text-red-700',
  },
  {
    abbr: 'ANP',
    name: 'Administrația Națională a Penitenciarelor',
    desc: 'Penitenciare',
    color: 'from-purple-500 to-purple-700',
    light: 'bg-purple-50 border-purple-100',
    textColor: 'text-purple-700',
  },
]

const categories = [
  {
    icon: Eye,
    title: 'Atenție & Concentrare',
    desc: 'Toulouse-Piéron, Matrici Raven, grile de simboluri',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    icon: Brain,
    title: 'Raționament Logic',
    desc: 'Serii numerice, analogii verbale, silogisme',
    color: 'bg-purple-100 text-purple-600',
  },
  {
    icon: Database,
    title: 'Memorie',
    desc: 'Memorare figuri, cuvinte, secvențe',
    color: 'bg-amber-100 text-amber-600',
  },
  {
    icon: Hash,
    title: 'Aptitudini Numerice',
    desc: 'Calcul rapid, procente, probleme text',
    color: 'bg-green-100 text-green-600',
  },
  {
    icon: BookOpen,
    title: 'Vocabular & Limbaj',
    desc: 'Sinonime, antonime, definiții, expresii',
    color: 'bg-rose-100 text-rose-600',
  },
  {
    icon: Users,
    title: 'Personalitate',
    desc: 'Chestionare, judecată situațională',
    color: 'bg-teal-100 text-teal-600',
  },
]

const features = [
  {
    icon: Zap,
    title: 'Teste adaptive',
    desc: 'Dificultatea crește pe măsură ce progresezi',
    color: 'text-yellow-500',
  },
  {
    icon: Clock,
    title: 'Simulare reală',
    desc: 'Cronometru strict, condiții de examen real',
    color: 'text-blue-500',
  },
  {
    icon: TrendingUp,
    title: 'Statistici detaliate',
    desc: 'Grafice de progres, scor per categorie',
    color: 'text-green-500',
  },
  {
    icon: Award,
    title: 'Flashcard-uri',
    desc: 'Memorare rapidă pentru vocabular și formule',
    color: 'text-purple-500',
  },
  {
    icon: Shield,
    title: 'Actualizat constant',
    desc: 'Banca de întrebări actualizată periodic',
    color: 'text-red-500',
  },
  {
    icon: Lock,
    title: 'Plată unică',
    desc: 'Fără abonament. Acces pe viață.',
    color: 'text-slate-500',
  },
]

const testimonials = [
  {
    name: 'Alexandru M.',
    role: 'Admis MAI 2024',
    text: 'Am trecut proba psihologică din prima. Testele de pe platformă sunt foarte similare cu cele reale.',
    rating: 5,
  },
  {
    name: 'Ioana P.',
    role: 'Admisă MApN 2024',
    text: 'Simularea de examen m-a ajutat enorm. Știam exact ce să aștept și cum să gestionez timpul.',
    rating: 5,
  },
  {
    name: 'Mihai C.',
    role: 'Admis ANP 2023',
    text: 'Toulouse-Piéron era cea mai dificilă probă pentru mine. Cu ajutorul acestei platforme am obținut 87%.',
    rating: 5,
  },
]

const pricingPlans = [
  {
    name: 'Gratuit',
    price: '0',
    period: '',
    desc: 'Ideal pentru a testa platforma',
    features: [
      '15 întrebări demo per categorie',
      'Acces la toate 4 instituțiile (demo)',
      'Statistici de bază',
    ],
    cta: 'Înregistrare gratuită',
    href: '/auth/register',
    highlight: false,
    badge: null,
  },
  {
    name: 'O Instituție',
    price: '69',
    period: 'lei',
    desc: 'Acces complet la instituția dorită',
    features: [
      'Acces complet la 1 instituție',
      '200-300+ întrebări per categorie',
      '6 categorii complete',
      'Simulare examen complet',
      'Flashcard-uri + Review greșeli',
      'Statistici detaliate + grafice',
      'Actualizări gratuite pe viață',
    ],
    cta: 'Cumpără acum — 69 lei',
    href: '/auth/register',
    highlight: true,
    badge: 'Popular',
  },
  {
    name: 'Toate Instituțiile',
    price: '119',
    period: 'lei',
    desc: 'MAI + MApN + SRI + ANP',
    features: [
      'Acces complet la TOATE 4 instituțiile',
      '24 module complete (6 × 4)',
      'Simulare pentru fiecare instituție',
      'Flashcard-uri + Review greșeli',
      'Statistici detaliate per instituție',
      'Actualizări gratuite pe viață',
      'Economisești 157 lei',
    ],
    cta: 'Cumpără acum — 119 lei',
    href: '/auth/register',
    highlight: false,
    badge: 'Best value',
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="border-b border-slate-100 bg-white/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center shadow-sm shadow-blue-200">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-slate-900 text-lg">PsihologicApp</span>
          </Link>
          <div className="hidden sm:flex items-center gap-6 text-sm font-medium text-slate-600">
            <a href="#features" className="hover:text-slate-900 transition-colors">Funcționalități</a>
            <a href="#institutions" className="hover:text-slate-900 transition-colors">Instituții</a>
            <a href="#pricing" className="hover:text-slate-900 transition-colors">Prețuri</a>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/auth/login">
              <Button variant="ghost" size="sm">Intră în cont</Button>
            </Link>
            <Link href="/auth/register">
              <Button size="sm">Înregistrare gratuită</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden pt-20 pb-28 px-6">
        {/* Background decorations */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-full blur-3xl opacity-60" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-30" />
        </div>

        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-sm font-semibold px-4 py-2 rounded-full mb-8 border border-blue-100">
            <Star className="w-4 h-4 fill-blue-400 text-blue-400" />
            Platforma nr. 1 de pregătire psihologică din România
          </div>

          <h1 className="text-5xl sm:text-6xl font-extrabold text-slate-900 leading-[1.1] mb-6 tracking-tight">
            Trece proba psihologică
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              MAI, MApN, SRI și ANP
            </span>
          </h1>

          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Sute de întrebări per categorie, simulare cu cronometru real, flashcard-uri
            și statistici detaliate. Tot ce ai nevoie pentru a trece din prima.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link href="/auth/register">
              <Button size="lg" className="text-base px-8 h-14 rounded-2xl shadow-lg shadow-blue-200">
                Începe gratuit
                <ArrowRight className="w-5 h-5 ml-1" />
              </Button>
            </Link>
            <a href="#pricing">
              <Button variant="secondary" size="lg" className="text-base px-8 h-14 rounded-2xl">
                Vezi prețuri
              </Button>
            </a>
          </div>

          <p className="text-sm text-slate-400 flex items-center justify-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            Nu necesită card de credit · 15 întrebări demo gratuite
          </p>
        </div>

        {/* Stats bar */}
        <div className="max-w-3xl mx-auto mt-16">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-lg shadow-slate-100 px-8 py-6 grid grid-cols-3 gap-6 text-center">
            {[
              { value: '1,000+', label: 'Întrebări în baza de date' },
              { value: '4', label: 'Instituții acoperite' },
              { value: '6', label: 'Categorii per instituție' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-extrabold text-slate-900">{stat.value}</p>
                <p className="text-sm text-slate-500 mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Institutions */}
      <section id="institutions" className="py-20 px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">
              Teste specifice fiecărei instituții
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              Fiecare instituție are propriile standarde și tipuri de probe. Pregătirea noastră este adaptată exact.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {institutions.map((inst) => (
              <div
                key={inst.abbr}
                className={`rounded-2xl border p-6 ${inst.light} hover:-translate-y-1 transition-transform duration-200`}
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${inst.color} flex items-center justify-center mb-4 shadow-sm`}>
                  <span className="text-white font-bold text-lg">{inst.abbr}</span>
                </div>
                <h3 className={`font-bold text-sm mb-1 ${inst.textColor}`}>{inst.abbr}</h3>
                <p className="text-xs font-medium text-slate-600 mb-1">{inst.name}</p>
                <p className="text-xs text-slate-400">{inst.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">
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
                <div
                  key={cat.title}
                  className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                >
                  <div className={`w-12 h-12 rounded-xl ${cat.color} flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-slate-800 mb-1.5">{cat.title}</h3>
                  <p className="text-sm text-slate-500">{cat.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-6 bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-white mb-3">
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
                  className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors"
                >
                  <Icon className={`w-8 h-8 ${f.color} mb-4`} />
                  <h3 className="font-bold text-white mb-1.5">{f.title}</h3>
                  <p className="text-sm text-slate-400">{f.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">
              Ce spun candidații admiși
            </h2>
            <p className="text-slate-500">Peste 500 de candidați s-au pregătit cu PsihologicApp</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-slate-50 rounded-2xl p-6 border border-slate-100"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-700 text-sm leading-relaxed mb-4">&ldquo;{t.text}&rdquo;</p>
                <div>
                  <p className="font-bold text-slate-800 text-sm">{t.name}</p>
                  <p className="text-xs text-slate-500">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">
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
                className={`relative bg-white rounded-2xl border p-8 flex flex-col ${
                  plan.highlight
                    ? 'border-blue-500 shadow-xl shadow-blue-100 scale-105'
                    : 'border-slate-100 shadow-sm'
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className={`text-xs font-bold px-4 py-1.5 rounded-full ${
                      plan.highlight ? 'bg-blue-600 text-white' : 'bg-slate-800 text-white'
                    }`}>
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="font-bold text-slate-800 text-lg mb-2">{plan.name}</h3>
                  <div className="flex items-end gap-1 mb-1">
                    <span className="text-4xl font-extrabold text-slate-900">{plan.price}</span>
                    {plan.period && <span className="text-slate-500 mb-1">{plan.period}</span>}
                  </div>
                  <p className="text-sm text-slate-500">{plan.desc}</p>
                </div>

                <ul className="space-y-2.5 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-slate-600">
                      <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link href={plan.href}>
                  <Button
                    variant={plan.highlight ? 'primary' : 'outline'}
                    className="w-full"
                    size="lg"
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </div>
            ))}
          </div>

          <p className="text-center text-sm text-slate-400 mt-8">
            Garanție 7 zile · Plată securizată prin Stripe · Fără costuri ascunse
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 bg-gradient-to-br from-blue-600 to-indigo-700 relative overflow-hidden">
        <div className="absolute inset-0 -z-0">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-indigo-500/30 rounded-full blur-3xl" />
        </div>
        <div className="max-w-2xl mx-auto text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Pregătește-te serios.
            <br />Trece din prima.
          </h2>
          <p className="text-blue-100 text-lg mb-8">
            Mii de candidați s-au pregătit cu PsihologicApp. Acum e rândul tău.
          </p>
          <Link href="/auth/register">
            <Button
              variant="secondary"
              size="lg"
              className="text-base px-10 h-14 rounded-2xl shadow-xl"
            >
              Creează cont gratuit
              <ArrowRight className="w-5 h-5 ml-1" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100 py-10 px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center">
              <Zap className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-bold text-slate-700 text-sm">PsihologicApp</span>
          </div>
          <p className="text-sm text-slate-400">
            © {new Date().getFullYear()} PsihologicApp. Toate drepturile rezervate.
          </p>
          <div className="flex items-center gap-4 text-sm text-slate-400">
            <a href="#" className="hover:text-slate-600 transition-colors">Termeni</a>
            <a href="#" className="hover:text-slate-600 transition-colors">Confidențialitate</a>
            <a href="#" className="hover:text-slate-600 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
