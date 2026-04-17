import Link from 'next/link'
import Image from 'next/image'
import { Sora } from 'next/font/google'
import {
  Eye, Brain, Database, Hash, BookOpen, Users,
  CheckCircle, Shield, Clock, Award, ArrowRight, Star,
  TrendingUp, Zap, Lock, CalendarDays,
  Smartphone, AlertTriangle, Target, BarChart3,
} from 'lucide-react'
import { ScrollReveal } from '@/components/ui/scroll-reveal'

const sora = Sora({ subsets: ['latin'], weight: ['700', '800'] })

export const dynamic = 'force-static'

const institutions = [
  { abbr: 'MAI', name: 'Ministerul Afacerilor Interne', desc: 'Poliție · Jandarmerie · IGSU', image: '/images/mai.png', accent: '#2563eb', glow: 'rgba(37,99,235,0.3)' },
  { abbr: 'MApN', name: 'Ministerul Apărării Naționale', desc: 'Armata Română', image: '/images/mapn.png', accent: '#059669', glow: 'rgba(5,150,105,0.3)' },
  { abbr: 'SRI', name: 'Serviciul Român de Informații', desc: 'Servicii de informații', image: '/images/sri.png', accent: '#dc2626', glow: 'rgba(220,38,38,0.3)' },
  { abbr: 'ANP', name: 'Administrația Națională a Penitenciarelor', desc: 'Penitenciare', image: '/images/anp.png', accent: '#7c3aed', glow: 'rgba(124,58,237,0.3)' },
]

const problems = [
  { icon: AlertTriangle, title: 'Nu știu la ce să se aștepte', desc: 'Testele sunt nondocumentate. Candidații intră nepregătiți pentru format, viteză și tipul de presiune.', color: '#ef4444' },
  { icon: Clock, title: 'Nu au exersat în condiții reale', desc: 'A citi despre un test e altceva față de a-l face cu cronometrul pe ecran. Fără practică, viteza îi trădează.', color: '#f59e0b' },
  { icon: Brain, title: 'Anxietatea îi sabotează', desc: 'Frica de eșec blochează gândirea în ziua testului. Familiaritatea cu formatul o elimină aproape complet.', color: '#8b5cf6' },
  { icon: BarChart3, title: 'Nu știu unde sunt slabi', desc: 'Fără feedback instant, candidații repetă aceleași greșeli. Nu știu ce să îmbunătățească pentru că nu au date.', color: '#0ea5e9' },
]

const steps = [
  { num: '01', title: 'Te înregistrezi în 30 de secunde', desc: 'Fără card de credit. Alegi instituția și începi cu testele demo gratuite pentru a înțelege formatul.', icon: Target },
  { num: '02', title: 'Exersezi 20 de minute pe zi', desc: 'Teste simulate în condiții reale — cronometru, format identic, dificultate crescătoare. Creierul tău se obișnuiește.', icon: Zap },
  { num: '03', title: 'Intri în sală fără surprize', desc: 'Testul real îți va părea familiar. Știi ce urmează, știi ritmul, știi unde ești puternic. Asta e diferența.', icon: CheckCircle },
]

const testimonials = [
  { name: 'Alexandru M.', initials: 'AM', role: 'Admis MAI 2024', accent: '#2563eb', text: 'Am trecut proba psihologică din prima. Testele de pe platformă sunt foarte similare cu cele reale — m-am simțit pregătit.' },
  { name: 'Ioana P.', initials: 'IP', role: 'Admisă MApN 2024', accent: '#059669', text: 'Simularea de examen m-a ajutat enorm. Știam exact ce să aștept și cum să gestionez timpul. Nu am panicicat deloc.' },
  { name: 'Mihai C.', initials: 'MC', role: 'Admis ANP 2023', accent: '#7c3aed', text: 'Toulouse-Piéron era cea mai dificilă probă. Cu ajutorul platformei am obținut 87%. Fără practică reală nu aș fi reușit.' },
]

const categories = [
  { icon: Eye, title: 'Atenție & Concentrare', desc: 'Toulouse-Piéron, Matrici Raven' },
  { icon: Brain, title: 'Raționament Logic', desc: 'Serii numerice, analogii, silogisme' },
  { icon: Database, title: 'Memorie', desc: 'Figuri, cuvinte, secvențe' },
  { icon: Hash, title: 'Aptitudini Numerice', desc: 'Calcul rapid, procente, probleme' },
  { icon: BookOpen, title: 'Vocabular & Limbaj', desc: 'Sinonime, antonime, definiții' },
  { icon: Users, title: 'Personalitate', desc: 'Chestionare, judecată situațională' },
]

const features = [
  { icon: Zap, title: 'Teste adaptive', desc: 'Dificultatea crește pe măsură ce progresezi', metric: '6 niveluri' },
  { icon: Clock, title: 'Simulare reală', desc: 'Cronometru strict, condiții de examen real', metric: 'Timer exact' },
  { icon: TrendingUp, title: 'Statistici detaliate', desc: 'Grafice de progres, scor per categorie', metric: '10+ grafice' },
  { icon: Award, title: 'Flashcard-uri', desc: 'Memorare rapidă pentru vocabular și formule', metric: '500+ carduri' },
  { icon: Shield, title: 'Actualizat constant', desc: 'Banca de întrebări actualizată periodic', metric: 'Mereu fresh' },
  { icon: Lock, title: 'Plată unică', desc: 'Fără abonament. Acces pe viață.', metric: 'Forever ∞' },
]

const plans = [
  {
    name: 'Gratuit',
    price: '0', period: '',
    desc: 'Ideal pentru a înțelege platforma',
    features: ['Demo per categorie', 'Acces la toate 4 instituțiile (demo)', 'Statistici de bază'],
    cta: 'Înregistrare gratuită',
    href: '/auth/register',
    style: 'free',
  },
  {
    name: 'O Instituție',
    price: '69', period: 'lei',
    desc: 'Acces complet la instituția dorită',
    features: ['Acces complet la 1 instituție', '6 categorii complete', 'Simulare examen complet', 'Flashcard-uri + Review greșeli', 'Statistici detaliate + grafice', 'Actualizări gratuite pe viață'],
    cta: 'Cumpără acum — 69 lei',
    href: '/auth/register?plan=one_institution',
    badge: 'Popular',
    style: 'featured',
  },
  {
    name: 'Toate Instituțiile',
    price: '119', period: 'lei',
    desc: 'MAI + MApN + SRI + ANP',
    features: ['Acces complet la TOATE 4 instituțiile', '24 module complete', 'Simulare pentru fiecare instituție', 'Flashcard-uri + Review greșeli', 'Statistici per instituție', 'Actualizări gratuite pe viață', 'Economisești 157 lei vs. separat'],
    cta: 'Cumpără acum — 119 lei',
    href: '/auth/register?plan=all_institutions',
    badge: 'Best value',
    style: 'premium',
  },
]

export default async function HomePage() {
  return (
    <div className="min-h-screen" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>

      {/* ─── NAVBAR ─── */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 50,
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        background: 'rgba(5,16,30,0.92)',
        backdropFilter: 'blur(20px)',
      }}>
        <div style={{ maxWidth: 1152, margin: '0 auto', padding: '0 24px', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <div style={{ width: 34, height: 34, background: 'linear-gradient(135deg, #2563eb, #7c3aed)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(37,99,235,0.4)' }}>
              <Brain style={{ width: 18, height: 18, color: 'white' }} />
            </div>
            <span style={{ fontWeight: 800, color: 'white', fontSize: 17, letterSpacing: '-0.02em' }}>PsihoPrep</span>
          </Link>

          <div className="hidden md:flex" style={{ alignItems: 'center', gap: 28 }}>
            {[
              { href: '#why', label: 'De ce?' },
              { href: '#how', label: 'Cum funcționează' },
              { href: '#institutions', label: 'Instituții' },
              { href: '#pricing', label: 'Prețuri' },
            ].map(({ href, label }) => (
              <a key={href} href={href} style={{ color: 'rgba(255,255,255,0.55)', fontSize: 14, fontWeight: 500, textDecoration: 'none', transition: 'color 0.15s' }}
                onMouseOver={e => (e.currentTarget.style.color = 'white')}
                onMouseOut={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}>
                {label}
              </a>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Link href="/auth/login" style={{ padding: '8px 16px', fontSize: 14, fontWeight: 500, color: 'rgba(255,255,255,0.6)', textDecoration: 'none', borderRadius: 10, transition: 'color 0.15s' }}>
              Intră în cont
            </Link>
            <Link href="/auth/register" style={{ padding: '9px 18px', fontSize: 14, fontWeight: 700, color: 'white', textDecoration: 'none', background: 'linear-gradient(135deg, #2563eb, #7c3aed)', borderRadius: 10, boxShadow: '0 4px 14px rgba(37,99,235,0.35)' }}>
              Începe gratuit
            </Link>
          </div>
        </div>
      </nav>

      {/* ─── ALERT BANNER ─── */}
      <div style={{ background: 'linear-gradient(90deg, #1e3a5f, #1a2f4e)', borderBottom: '1px solid rgba(251,191,36,0.2)', padding: '10px 24px' }}>
        <div style={{ maxWidth: 1152, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ background: '#f59e0b', color: '#000', fontSize: 10, fontWeight: 800, padding: '3px 8px', borderRadius: 6, letterSpacing: '0.08em', textTransform: 'uppercase' }}>LIVE</span>
            <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: 13, fontWeight: 500 }}>
              <strong style={{ color: 'white' }}>Sesiunea MAI Aprilie–Mai 2026 este activă.</strong> Candidații se pregătesc acum.
            </span>
          </div>
          <Link href="/ghid/test-psihologic-mai-2026" style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#fbbf24', fontSize: 13, fontWeight: 700, textDecoration: 'none', whiteSpace: 'nowrap' }}>
            Citește ghidul complet <ArrowRight style={{ width: 14, height: 14 }} />
          </Link>
        </div>
      </div>

      {/* ─── HERO ─── */}
      <section style={{
        background: 'linear-gradient(160deg, #020c1b 0%, #050f1f 50%, #08162c 100%)',
        paddingTop: 80, paddingBottom: 100,
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Grid texture */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'linear-gradient(rgba(37,99,235,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.06) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
        {/* Glow blobs */}
        <div style={{ position: 'absolute', top: -100, left: '20%', width: 500, height: 500, background: 'radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -50, right: '10%', width: 400, height: 400, background: 'radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 1152, margin: '0 auto', padding: '0 24px', display: 'grid', gridTemplateColumns: '1fr', gap: 60, alignItems: 'center' }} className="lg:grid-cols-2-auto">
          <div style={{ maxWidth: 600 }}>
            {/* Eyebrow */}
            <div className="animate-fade-in" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(37,99,235,0.15)', border: '1px solid rgba(37,99,235,0.3)', borderRadius: 999, padding: '6px 14px', marginBottom: 28 }}>
              <span style={{ width: 6, height: 6, background: '#22c55e', borderRadius: '50%', boxShadow: '0 0 8px #22c55e' }} />
              <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Pregătire psihologică · MAI · MApN · SRI · ANP</span>
            </div>

            {/* Headline */}
            <h1 className={`animate-fade-up ${sora.className}`} style={{ fontSize: 'clamp(40px, 6vw, 68px)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.03em', color: 'white', marginBottom: 24 }}>
              Nu mai pica<br />
              <span style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                testul psihologic.
              </span>
            </h1>

            <p className="animate-fade-up" style={{ animationDelay: '80ms', fontSize: 18, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, marginBottom: 36, maxWidth: 480 }}>
              Singura platformă care simulează <strong style={{ color: 'rgba(255,255,255,0.85)' }}>exact</strong> testele reale ale MAI, MApN, SRI și ANP. Intri în sală pregătit, nu surprins.
            </p>

            {/* CTAs */}
            <div className="animate-fade-up" style={{ animationDelay: '140ms', display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 36 }}>
              <Link href="/auth/register" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '14px 28px', fontSize: 15, fontWeight: 700, color: 'white',
                textDecoration: 'none',
                background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
                borderRadius: 14, boxShadow: '0 8px 24px rgba(37,99,235,0.4)',
              }}>
                Încearcă gratuit <ArrowRight style={{ width: 18, height: 18 }} />
              </Link>
              <a href="#how" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '14px 24px', fontSize: 15, fontWeight: 600, color: 'rgba(255,255,255,0.75)',
                textDecoration: 'none',
                background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 14,
              }}>
                Cum funcționează
              </a>
            </div>

            {/* Trust strip */}
            <div className="animate-fade-up" style={{ animationDelay: '200ms', display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
              {[
                { val: '500+', label: 'candidați admiși' },
                { val: '94%', label: 'rată de succes' },
                { val: '4', label: 'instituții acoperite' },
              ].map(s => (
                <div key={s.label} style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                  <span style={{ fontSize: 22, fontWeight: 800, color: 'white', letterSpacing: '-0.02em' }}>{s.val}</span>
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Product Mockup */}
          <div className="animate-fade-up hidden lg:block" style={{ animationDelay: '160ms', position: 'relative', width: 400, marginLeft: 'auto' }}>
            {/* Glow */}
            <div style={{ position: 'absolute', inset: -40, background: 'radial-gradient(circle, rgba(37,99,235,0.15) 0%, transparent 65%)', pointerEvents: 'none' }} />

            {/* Main test card */}
            <div style={{
              background: 'linear-gradient(145deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 100%)',
              border: '1px solid rgba(255,255,255,0.1)', borderRadius: 24, padding: 24,
              backdropFilter: 'blur(20px)', position: 'relative',
            }}>
              {/* Card header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 18 }}>
                <div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.38)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 4 }}>Sesiune activă · MAI</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: 'white' }}>Întrebarea 8 din 15</div>
                </div>
                <div style={{ background: 'rgba(239,68,68,0.14)', border: '1px solid rgba(239,68,68,0.28)', borderRadius: 10, padding: '7px 12px', textAlign: 'center' }}>
                  <div style={{ fontSize: 10, color: 'rgba(239,68,68,0.7)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 2 }}>Timp</div>
                  <div style={{ fontSize: 19, fontWeight: 800, color: '#ef4444', fontFamily: 'monospace', lineHeight: 1 }}>01:47</div>
                </div>
              </div>

              {/* Progress bar */}
              <div style={{ background: 'rgba(255,255,255,0.07)', borderRadius: 999, height: 3, marginBottom: 18 }}>
                <div style={{ background: 'linear-gradient(90deg,#3b82f6,#8b5cf6)', borderRadius: 999, height: 3, width: '53%' }} />
              </div>

              {/* Question */}
              <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: 14, marginBottom: 14 }}>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 6 }}>Raționament Logic</div>
                <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.9)', fontWeight: 500, lineHeight: 1.5 }}>
                  Care este termenul următor în seria:<br />2, 6, 12, 20, 30, <strong style={{ color: '#3b82f6' }}>?</strong>
                </div>
              </div>

              {/* Answer options */}
              {[
                { letter: 'A', text: '38', selected: false },
                { letter: 'B', text: '42', selected: true },
                { letter: 'C', text: '36', selected: false },
                { letter: 'D', text: '44', selected: false },
              ].map(opt => (
                <div key={opt.letter} style={{
                  display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 10, marginBottom: 6,
                  background: opt.selected ? 'rgba(59,130,246,0.14)' : 'rgba(255,255,255,0.03)',
                  border: opt.selected ? '1px solid rgba(59,130,246,0.4)' : '1px solid rgba(255,255,255,0.06)',
                }}>
                  <span style={{
                    width: 26, height: 26, borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 11, fontWeight: 800, flexShrink: 0,
                    background: opt.selected ? '#3b82f6' : 'rgba(255,255,255,0.06)',
                    color: opt.selected ? 'white' : 'rgba(255,255,255,0.35)',
                  }}>{opt.letter}</span>
                  <span style={{ fontSize: 14, color: opt.selected ? 'white' : 'rgba(255,255,255,0.5)', fontWeight: opt.selected ? 600 : 400 }}>{opt.text}</span>
                  {opt.selected && <CheckCircle style={{ width: 14, height: 14, color: '#3b82f6', marginLeft: 'auto' }} />}
                </div>
              ))}
            </div>

            {/* Score badge */}
            <div style={{
              position: 'absolute', top: -18, right: -18,
              background: 'linear-gradient(135deg,#059669,#10b981)', borderRadius: 16, padding: '12px 18px',
              boxShadow: '0 16px 40px rgba(16,185,129,0.45)', border: '1px solid rgba(255,255,255,0.2)',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.75)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 2 }}>Scor final</div>
              <div style={{ fontSize: 28, fontWeight: 900, color: 'white', lineHeight: 1, letterSpacing: '-0.02em' }}>87%</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.9)', fontWeight: 700, marginTop: 3 }}>✓ ADMIS</div>
            </div>

            {/* Streak badge */}
            <div style={{
              position: 'absolute', bottom: -14, left: -18,
              background: 'rgba(10,20,40,0.95)', border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 14, padding: '10px 14px',
              display: 'flex', alignItems: 'center', gap: 10,
              backdropFilter: 'blur(20px)', boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
            }}>
              <div style={{ width: 34, height: 34, borderRadius: 9, background: 'rgba(251,191,36,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🔥</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'white' }}>7 zile consecutiv</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.38)' }}>Streak de practică</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── DE CE PICĂ CANDIDAȚII ─── */}
      <section id="why" style={{ background: '#f8fafc', padding: '80px 24px', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: 1152, margin: '0 auto' }}>
          <ScrollReveal className="text-center" style={{ marginBottom: 52 }}>
            <div style={{ display: 'inline-block', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 999, padding: '5px 16px', marginBottom: 16 }}>
              <span style={{ color: '#dc2626', fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Problema reală</span>
            </div>
            <h2 className={sora.className} style={{ fontSize: 'clamp(28px,4vw,42px)', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.03em', marginBottom: 12 }}>
              Cei mai mulți candidați pică<br />nu pentru că sunt nepotriviți.
            </h2>
            <p style={{ fontSize: 17, color: '#64748b', maxWidth: 520, margin: '0 auto' }}>
              Pică pentru că nu știu la ce să se aștepte. Asta e o problemă care se rezolvă.
            </p>
          </ScrollReveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
            {problems.map((p, i) => {
              const Icon = p.icon
              return (
                <ScrollReveal key={p.title} delay={i * 70}>
                  <div style={{
                    background: 'white', borderRadius: 20, padding: 28,
                    border: '1px solid #e2e8f0', boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                  }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: `${p.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                      <Icon style={{ width: 22, height: 22, color: p.color }} />
                    </div>
                    <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', marginBottom: 8, lineHeight: 1.3 }}>{p.title}</h3>
                    <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.65 }}>{p.desc}</p>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── CUM FUNCȚIONEAZĂ ─── */}
      <section id="how" style={{ background: 'white', padding: '80px 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <ScrollReveal className="text-center" style={{ marginBottom: 56 }}>
            <div style={{ display: 'inline-block', background: 'rgba(37,99,235,0.07)', border: '1px solid rgba(37,99,235,0.15)', borderRadius: 999, padding: '5px 16px', marginBottom: 16 }}>
              <span style={{ color: '#2563eb', fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Procesul</span>
            </div>
            <h2 className={sora.className} style={{ fontSize: 'clamp(28px,4vw,42px)', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.03em', marginBottom: 12 }}>
              Simplu. Eficient. Repetat.
            </h2>
            <p style={{ fontSize: 17, color: '#64748b', maxWidth: 440, margin: '0 auto' }}>
              3 pași care transformă anxietatea în încredere reală.
            </p>
          </ScrollReveal>

          <div style={{ position: 'relative' }}>
            {/* Connecting line */}
            <div className="hidden lg:block" style={{
              position: 'absolute', top: 52, left: '16.5%', right: '16.5%', height: 1,
              background: 'linear-gradient(90deg, transparent, #e2e8f0 20%, #e2e8f0 80%, transparent)',
              pointerEvents: 'none',
            }} />

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 32 }}>
              {steps.map((step, i) => {
                const Icon = step.icon
                return (
                  <ScrollReveal key={step.num} delay={i * 100}>
                    <div style={{ textAlign: 'center', padding: '0 16px' }}>
                      <div style={{ position: 'relative', display: 'inline-block', marginBottom: 24 }}>
                        <div style={{
                          width: 72, height: 72, borderRadius: 20,
                          background: 'linear-gradient(135deg, #eff6ff, #f5f3ff)',
                          border: '2px solid #e0e7ff',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          boxShadow: '0 8px 24px rgba(37,99,235,0.1)',
                        }}>
                          <Icon style={{ width: 28, height: 28, color: '#2563eb' }} />
                        </div>
                        <div style={{
                          position: 'absolute', top: -10, right: -10,
                          width: 26, height: 26, borderRadius: 8,
                          background: '#0f172a', color: 'white',
                          fontSize: 11, fontWeight: 800, letterSpacing: '0.04em',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>{step.num}</div>
                      </div>
                      <h3 style={{ fontSize: 17, fontWeight: 700, color: '#0f172a', marginBottom: 10, lineHeight: 1.3 }}>{step.title}</h3>
                      <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.7 }}>{step.desc}</p>
                    </div>
                  </ScrollReveal>
                )
              })}
            </div>
          </div>

          <ScrollReveal delay={200}>
            <div style={{ textAlign: 'center', marginTop: 48 }}>
              <Link href="/auth/register" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '13px 26px', fontSize: 15, fontWeight: 700, color: 'white', textDecoration: 'none',
                background: 'linear-gradient(135deg, #2563eb, #7c3aed)', borderRadius: 13,
                boxShadow: '0 8px 24px rgba(37,99,235,0.3)',
              }}>
                Începe primul test — e gratuit <ArrowRight style={{ width: 17, height: 17 }} />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── TESTIMONIALE ─── */}
      <section style={{ background: '#f1f5f9', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1152, margin: '0 auto' }}>

          {/* Big social proof number */}
          <ScrollReveal>
            <div style={{
              background: 'linear-gradient(135deg, #0f172a, #1e293b)',
              borderRadius: 24, padding: '40px 48px', marginBottom: 48, textAlign: 'center',
              position: 'relative', overflow: 'hidden',
            }}>
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 30% 50%, rgba(37,99,235,0.15) 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, rgba(124,58,237,0.1) 0%, transparent 60%)', pointerEvents: 'none' }} />
              <div style={{ position: 'relative' }}>
                <div style={{ fontSize: 'clamp(56px,8vw,96px)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1, marginBottom: 12 }}
                  className={sora.className}>
                  <span style={{ background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>94%</span>
                </div>
                <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.85)', fontWeight: 600, marginBottom: 6 }}>
                  dintre candidații care s-au pregătit cu PsihoPrep au trecut proba psihologică
                </p>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)' }}>Bazat pe feedback-ul utilizatorilor noștri după sesiunile de admitere 2023–2024</p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal className="text-center" style={{ marginBottom: 40 }}>
            <h2 className={sora.className} style={{ fontSize: 'clamp(26px,3.5vw,38px)', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.03em', marginBottom: 8 }}>
              Ce spun candidații admiși
            </h2>
            <p style={{ fontSize: 16, color: '#64748b' }}>Oameni reali, examene reale.</p>
          </ScrollReveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
            {testimonials.map((t, i) => (
              <ScrollReveal key={t.name} delay={i * 80}>
                <div style={{
                  background: 'white', borderRadius: 20, padding: 28, height: '100%', boxSizing: 'border-box',
                  border: '1px solid #e2e8f0', boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                  display: 'flex', flexDirection: 'column',
                }}>
                  {/* Stars */}
                  <div style={{ display: 'flex', gap: 3, marginBottom: 16 }}>
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} style={{ width: 14, height: 14, fill: '#f59e0b', color: '#f59e0b' }} />
                    ))}
                  </div>
                  <p style={{ fontSize: 15, color: '#334155', lineHeight: 1.7, flex: 1, marginBottom: 20 }}>&ldquo;{t.text}&rdquo;</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingTop: 16, borderTop: '1px solid #f1f5f9' }}>
                    <div style={{ width: 40, height: 40, borderRadius: 12, background: `linear-gradient(135deg, ${t.accent}, ${t.accent}bb)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 13, fontWeight: 800, flexShrink: 0 }}>
                      {t.initials}
                    </div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>{t.name}</div>
                      <div style={{ fontSize: 12, color: '#94a3b8' }}>{t.role}</div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── INSTITUȚII ─── */}
      <section id="institutions" style={{ background: 'white', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1152, margin: '0 auto' }}>
          <ScrollReveal className="text-center" style={{ marginBottom: 48 }}>
            <h2 className={sora.className} style={{ fontSize: 'clamp(26px,3.5vw,38px)', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.03em', marginBottom: 10 }}>
              Teste specifice fiecărei instituții
            </h2>
            <p style={{ fontSize: 16, color: '#64748b', maxWidth: 460, margin: '0 auto' }}>
              Fiecare instituție are propriile standarde. Noi acoperim exact formatul lor.
            </p>
          </ScrollReveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: 18 }}>
            {institutions.map((inst, i) => (
              <ScrollReveal key={inst.abbr} delay={i * 70}>
                <div style={{
                  background: 'white', borderRadius: 20, overflow: 'hidden',
                  border: '1px solid #e2e8f0', boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                }}>
                  <div style={{ position: 'relative', height: 140, overflow: 'hidden' }}>
                    <Image src={inst.image} alt={inst.name} fill sizes="280px" className="object-cover object-top" style={{ transition: 'transform 0.4s' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)' }} />
                  </div>
                  <div style={{ padding: '18px 20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <span style={{ fontSize: 15, fontWeight: 800, color: '#0f172a' }}>{inst.abbr}</span>
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: inst.accent, flexShrink: 0 }} />
                    </div>
                    <p style={{ fontSize: 12, color: '#64748b', fontWeight: 500, lineHeight: 1.4 }}>{inst.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CATEGORII ─── */}
      <section style={{ background: '#f8fafc', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1152, margin: '0 auto' }}>
          <ScrollReveal className="text-center" style={{ marginBottom: 48 }}>
            <h2 className={sora.className} style={{ fontSize: 'clamp(26px,3.5vw,38px)', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.03em', marginBottom: 10 }}>
              6 categorii de teste complete
            </h2>
            <p style={{ fontSize: 16, color: '#64748b', maxWidth: 440, margin: '0 auto' }}>
              Acoperim toate tipurile de probe psihologice din procesul de selecție.
            </p>
          </ScrollReveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
            {categories.map((cat, i) => {
              const Icon = cat.icon
              return (
                <ScrollReveal key={cat.title} delay={i * 55}>
                  <div style={{
                    background: 'white', borderRadius: 18, padding: '22px 20px',
                    border: '1px solid #e2e8f0', boxShadow: '0 1px 6px rgba(0,0,0,0.04)',
                  }}>
                    <div style={{ width: 42, height: 42, borderRadius: 12, background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
                      <Icon style={{ width: 20, height: 20, color: '#475569' }} />
                    </div>
                    <h3 style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', marginBottom: 5, lineHeight: 1.3 }}>{cat.title}</h3>
                    <p style={{ fontSize: 12, color: '#94a3b8', lineHeight: 1.5 }}>{cat.desc}</p>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section style={{ background: '#020c1b', padding: '80px 24px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse at 20% 50%, rgba(37,99,235,0.1) 0%, transparent 55%), radial-gradient(ellipse at 80% 50%, rgba(124,58,237,0.08) 0%, transparent 55%)' }} />
        <div style={{ maxWidth: 1152, margin: '0 auto', position: 'relative' }}>
          <ScrollReveal className="text-center" style={{ marginBottom: 52 }}>
            <h2 className={sora.className} style={{ fontSize: 'clamp(26px,3.5vw,38px)', fontWeight: 900, color: 'white', letterSpacing: '-0.03em', marginBottom: 10 }}>
              Tot ce ai nevoie pentru a reuși
            </h2>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.45)', maxWidth: 400, margin: '0 auto' }}>
              O platformă completă, nu doar o colecție de întrebări.
            </p>
          </ScrollReveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
            {features.map((f, i) => {
              const Icon = f.icon
              return (
                <ScrollReveal key={f.title} delay={i * 65}>
                  <div style={{
                    background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 18, padding: '22px 22px',
                    transition: 'background 0.2s, border-color 0.2s',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                      <div style={{ width: 42, height: 42, borderRadius: 12, background: 'rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Icon style={{ width: 19, height: 19, color: 'rgba(255,255,255,0.8)' }} />
                      </div>
                      <span style={{ fontSize: 10, fontWeight: 700, padding: '4px 10px', borderRadius: 999, background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.04em' }}>{f.metric}</span>
                    </div>
                    <h3 style={{ fontSize: 14, fontWeight: 700, color: 'white', marginBottom: 6 }}>{f.title}</h3>
                    <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}>{f.desc}</p>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── PRICING ─── */}
      <section id="pricing" style={{ background: '#f8fafc', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <ScrollReveal className="text-center" style={{ marginBottom: 52 }}>
            <div style={{ display: 'inline-block', background: 'rgba(37,99,235,0.07)', border: '1px solid rgba(37,99,235,0.15)', borderRadius: 999, padding: '5px 16px', marginBottom: 16 }}>
              <span style={{ color: '#2563eb', fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Prețuri</span>
            </div>
            <h2 className={sora.className} style={{ fontSize: 'clamp(26px,3.5vw,38px)', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.03em', marginBottom: 10 }}>
              Plată unică. Acces pe viață.
            </h2>
            <p style={{ fontSize: 16, color: '#64748b', maxWidth: 380, margin: '0 auto' }}>
              Fără abonament lunar. Plătești o dată și ai acces permanent.
            </p>
          </ScrollReveal>

          {/* Urgency strip */}
          <ScrollReveal>
            <div style={{
              background: 'linear-gradient(90deg, #7c3aed15, #2563eb15)',
              border: '1px solid rgba(37,99,235,0.2)', borderRadius: 14,
              padding: '12px 20px', marginBottom: 32, textAlign: 'center',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, flexWrap: 'wrap',
            }}>
              <CalendarDays style={{ width: 16, height: 16, color: '#2563eb' }} />
              <span style={{ fontSize: 14, color: '#1e40af', fontWeight: 600 }}>
                Sesiunea MAI este activă acum — candidații care se pregătesc azi au un avantaj real față de cei care amână.
              </span>
            </div>
          </ScrollReveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, alignItems: 'start' }}>
            {plans.map((plan, i) => (
              <ScrollReveal key={plan.name} delay={i * 80}>
                <div style={{
                  borderRadius: 22, padding: '28px 28px 26px',
                  position: 'relative', display: 'flex', flexDirection: 'column',
                  ...(plan.style === 'free' ? {
                    background: 'white', border: '1px solid #e2e8f0', boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                  } : plan.style === 'featured' ? {
                    background: 'linear-gradient(160deg, #1d4ed8, #4f46e5)',
                    boxShadow: '0 20px 60px rgba(37,99,235,0.35)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    transform: 'scale(1.03)',
                  } : {
                    background: 'linear-gradient(160deg, #0f172a, #1e293b)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                  }),
                }}>
                  {plan.badge && (
                    <div style={{
                      position: 'absolute', top: -13, left: '50%', transform: 'translateX(-50%)',
                      padding: '4px 16px', borderRadius: 999, fontSize: 11, fontWeight: 800, letterSpacing: '0.06em',
                      whiteSpace: 'nowrap',
                      ...(plan.style === 'featured'
                        ? { background: 'white', color: '#2563eb' }
                        : { background: 'linear-gradient(90deg,#f59e0b,#f97316)', color: 'white' }),
                    }}>
                      {plan.badge}
                    </div>
                  )}

                  <div style={{ marginBottom: 20 }}>
                    <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 10, color: plan.style === 'free' ? '#0f172a' : 'white' }}>{plan.name}</h3>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 5, marginBottom: 5 }}>
                      <span style={{ fontSize: 38, fontWeight: 900, letterSpacing: '-0.03em', color: plan.style === 'free' ? '#0f172a' : 'white' }}>{plan.price}</span>
                      {plan.period && <span style={{ fontSize: 16, fontWeight: 600, color: plan.style === 'featured' ? 'rgba(255,255,255,0.7)' : plan.style === 'premium' ? 'rgba(255,255,255,0.5)' : '#94a3b8' }}>{plan.period}</span>}
                    </div>
                    <p style={{ fontSize: 13, color: plan.style === 'free' ? '#94a3b8' : 'rgba(255,255,255,0.55)' }}>{plan.desc}</p>
                  </div>

                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 22px', flex: 1 }}>
                    {plan.features.map(f => (
                      <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 9, marginBottom: 9, fontSize: 13, color: plan.style === 'free' ? '#475569' : 'rgba(255,255,255,0.8)' }}>
                        <CheckCircle style={{ width: 15, height: 15, flexShrink: 0, marginTop: 1, color: plan.style === 'featured' ? 'rgba(255,255,255,0.7)' : plan.style === 'premium' ? '#f59e0b' : '#22c55e' }} />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Link href={plan.href} style={{
                    display: 'block', textAlign: 'center', padding: '12px 20px',
                    borderRadius: 12, fontSize: 14, fontWeight: 700, textDecoration: 'none',
                    ...(plan.style === 'featured'
                      ? { background: 'white', color: '#2563eb' }
                      : plan.style === 'premium'
                      ? { background: 'linear-gradient(90deg,#f59e0b,#f97316)', color: 'white' }
                      : { background: 'linear-gradient(135deg,#2563eb,#7c3aed)', color: 'white' }),
                  }}>
                    {plan.cta}
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <p style={{ textAlign: 'center', marginTop: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24, flexWrap: 'wrap', fontSize: 13, color: '#94a3b8' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><Shield style={{ width: 14, height: 14, color: '#22c55e' }} /> Garanție 7 zile</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><Lock style={{ width: 14, height: 14 }} /> Plată securizată prin Stripe</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><CheckCircle style={{ width: 14, height: 14, color: '#3b82f6' }} /> Acces instant după plată</span>
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── CTA FINAL ─── */}
      <section style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #1a1040 100%)', padding: '90px 24px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse at 40% 50%, rgba(37,99,235,0.2) 0%, transparent 60%), radial-gradient(ellipse at 70% 30%, rgba(124,58,237,0.15) 0%, transparent 55%)' }} />
        <ScrollReveal className="relative text-center" style={{ maxWidth: 600, margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.14)', borderRadius: 999, padding: '6px 16px', marginBottom: 28 }}>
            <Zap style={{ width: 13, height: 13, color: '#fbbf24' }} />
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.75)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Sesiunea MAI e activă acum</span>
          </div>
          <h2 className={sora.className} style={{ fontSize: 'clamp(32px,5vw,52px)', fontWeight: 900, color: 'white', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 18 }}>
            Pregătește-te serios.<br />
            <span style={{ background: 'linear-gradient(135deg,#60a5fa,#a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Trece din prima.</span>
          </h2>
          <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.55)', marginBottom: 36, lineHeight: 1.65 }}>
            Alătură-te celor 500+ candidați care au intrat pregătiți.<br />Primul test e gratuit. Nu necesită card.
          </p>
          <Link href="/auth/register" style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            padding: '15px 32px', fontSize: 16, fontWeight: 700, color: '#1e3a5f',
            textDecoration: 'none', background: 'white', borderRadius: 16,
            boxShadow: '0 12px 40px rgba(0,0,0,0.3)',
          }}>
            Creează cont gratuit <ArrowRight style={{ width: 19, height: 19 }} />
          </Link>
        </ScrollReveal>
      </section>

      {/* ─── PWA COMPACT ─── */}
      <section style={{ background: '#f8fafc', borderTop: '1px solid #e2e8f0', padding: '36px 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <ScrollReveal>
            <div style={{
              background: 'white', borderRadius: 18, border: '1px solid #e2e8f0',
              padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 44, height: 44, borderRadius: 13, background: 'linear-gradient(135deg,#2563eb,#7c3aed)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Smartphone style={{ width: 20, height: 20, color: 'white' }} />
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>Adaugă PsihoPrep pe ecranul tău</div>
                  <div style={{ fontSize: 13, color: '#64748b' }}>Funcționează ca aplicație nativă — fără App Store, acces instant.</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <a href="#install-ios" style={{ padding: '8px 16px', fontSize: 12, fontWeight: 700, color: '#2563eb', textDecoration: 'none', background: '#eff6ff', borderRadius: 9, border: '1px solid #bfdbfe' }}>
                  iPhone (Safari)
                </a>
                <a href="#install-android" style={{ padding: '8px 16px', fontSize: 12, fontWeight: 700, color: '#059669', textDecoration: 'none', background: '#f0fdf4', borderRadius: 9, border: '1px solid #bbf7d0' }}>
                  Android (Chrome)
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={{ background: '#0f172a', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ maxWidth: 1152, margin: '0 auto', padding: '40px 24px 32px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 30, height: 30, background: 'linear-gradient(135deg,#2563eb,#7c3aed)', borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Brain style={{ width: 15, height: 15, color: 'white' }} />
              </div>
              <span style={{ fontWeight: 800, color: 'white', fontSize: 15 }}>PsihoPrep</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
              {[
                { icon: Shield, text: 'Garanție 7 zile', color: '#22c55e' },
                { icon: Lock, text: 'Stripe securizat', color: '#94a3b8' },
                { icon: CheckCircle, text: 'Acces instant', color: '#3b82f6' },
                { icon: Users, text: '500+ candidați', color: '#8b5cf6' },
              ].map(({ icon: Icon, text, color }) => (
                <span key={text} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}>
                  <Icon style={{ width: 13, height: 13, color }} />
                  {text}
                </span>
              ))}
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 24, display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)' }}>
              © {new Date().getFullYear()} PsihoPrep. Toate drepturile rezervate.
            </p>
            <div style={{ display: 'flex', gap: 20 }}>
              {[
                { href: '/termeni', label: 'Termeni' },
                { href: '/confidentialitate', label: 'Confidențialitate' },
                { href: '/contact', label: 'Contact' },
              ].map(({ href, label }) => (
                <Link key={href} href={href} style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', textDecoration: 'none' }}>
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>

    </div>
  )
}
