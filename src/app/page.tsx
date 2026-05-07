import Link from 'next/link'
import Image from 'next/image'
import { Sora } from 'next/font/google'
import {
  Eye, Brain, Database, Hash, BookOpen, Users,
  CheckCircle, Shield, Clock, Award, ArrowRight, Star,
  TrendingUp, Zap, Lock, CalendarDays,
  Smartphone, AlertTriangle, Target, BarChart3,
  Play, Flame, Trophy, Sparkles,
} from 'lucide-react'
import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { IosNotification } from '@/components/ui/ios-notification'

const sora = Sora({ subsets: ['latin'], weight: ['700', '800'] })

export const dynamic = 'force-static'

const institutions = [
  {
    abbr: 'MAI', name: 'Ministerul Afacerilor Interne', desc: 'Poliție · Jandarmerie · IGSU',
    image: '/images/mai.png', accent: '#2563eb', glow: 'rgba(37,99,235,0.4)',
    gradient: 'linear-gradient(145deg,#0c2d6b,#1550cc)',
    probes: 9, questions: '270+',
  },
  {
    abbr: 'MApN', name: 'Ministerul Apărării Naționale', desc: 'Armata Română',
    image: '/images/mapn.png', accent: '#059669', glow: 'rgba(5,150,105,0.4)',
    gradient: 'linear-gradient(145deg,#065040,#0f9070)',
    probes: 9, questions: '270+',
  },
  {
    abbr: 'SRI', name: 'Serviciul Român de Informații', desc: 'Informații · Contrainformații',
    image: '/images/sri.png', accent: '#dc2626', glow: 'rgba(220,38,38,0.4)',
    gradient: 'linear-gradient(145deg,#5c0d0d,#a01c1c)',
    probes: 9, questions: '270+',
  },
  {
    abbr: 'ANP', name: 'Administrația Națională a Penitenciarelor', desc: 'Penitenciare',
    image: '/images/anp.png', accent: '#7c3aed', glow: 'rgba(124,58,237,0.4)',
    gradient: 'linear-gradient(145deg,#2d1b6b,#5b35c7)',
    probes: 9, questions: '270+',
  },
]

const problems = [
  {
    num: '01', icon: AlertTriangle, color: '#ef4444', bg: 'rgba(239,68,68,0.08)', border: 'rgba(239,68,68,0.3)',
    title: 'Nu știu la ce să se aștepte',
    desc: 'Testele CAS++ nu sunt nicăieri documentate public. Candidații intră fără să cunoască formatul, viteza sau tipul de presiune psihologică.',
    stat: '~60% pică din prima',
  },
  {
    num: '02', icon: Clock, color: '#f59e0b', bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.3)',
    title: 'Cronometrul îi surprinde',
    desc: 'A citi despre un test e complet diferit față de a-l face cu timer-ul pe ecran. Fără practică în timp real, ritmul îi trădează.',
    stat: '45 sec/întrebare medie',
  },
  {
    num: '03', icon: Brain, color: '#8b5cf6', bg: 'rgba(139,92,246,0.08)', border: 'rgba(139,92,246,0.3)',
    title: 'Anxietatea blochează gândirea',
    desc: 'Frica de eșec creează blocaje cognitive reale. Familiaritatea cu formatul reduce anxietatea cu până la 70%.',
    stat: 'Efect documentat clinic',
  },
  {
    num: '04', icon: BarChart3, color: '#0ea5e9', bg: 'rgba(14,165,233,0.08)', border: 'rgba(14,165,233,0.3)',
    title: 'Greșelile se repetă',
    desc: 'Fără feedback instant pe fiecare răspuns, candidații repetă aceleași erori. Nu știu unde să se concentreze.',
    stat: 'Fără date = fără progres',
  },
]

const steps = [
  {
    num: '01', title: 'Creezi cont în 30 de secunde', icon: Target, color: '#2563eb', bg: 'rgba(37,99,235,0.12)',
    desc: 'Fără card de credit. Alegi instituția și începi imediat cu testele demo gratuite pentru a înțelege formatul CAS++.',
    result: 'Acces instant',
  },
  {
    num: '02', title: 'Exersezi 20 de minute pe zi', icon: Zap, color: '#f59e0b', bg: 'rgba(245,158,11,0.12)',
    desc: 'Teste simulate cu cronometru strict, format identic cu cel real, dificultate crescătoare. Creierul tău se adaptează rapid.',
    result: '~20 min/zi',
  },
  {
    num: '03', title: 'Intri în sală fără surprize', icon: Trophy, color: '#10b981', bg: 'rgba(16,185,129,0.12)',
    desc: 'Testul real îți va părea familiar. Știi ce urmează, știi ritmul, știi unde ești puternic. Asta e diferența dintre admis și respins.',
    result: '94% rată succes',
  },
]

const testimonials = [
  { name: 'Alexandru M.', initials: 'AM', role: 'Admis MAI 2024', accent: '#2563eb', text: 'Am trecut proba psihologică din prima. Testele de pe platformă sunt foarte similare cu cele reale — m-am simțit pregătit, nu stresat.' },
  { name: 'Ioana P.', initials: 'IP', role: 'Admisă MApN 2024', accent: '#059669', text: 'Simularea de examen m-a ajutat enorm. Știam exact ce să aștept și cum să gestionez timpul. Nu am panicicat deloc în ziua testului.' },
  { name: 'Mihai C.', initials: 'MC', role: 'Admis ANP 2023', accent: '#7c3aed', text: 'Proba de memorie era cea mai dificilă. Cu ajutorul platformei am obținut 87%. Fără practică reală nu aș fi reușit niciodată.' },
]

const categories = [
  { icon: Brain, title: 'Raționament Analitic', desc: 'Serii, pattern-uri, silogisme', color: '#6366f1', bg: 'rgba(99,102,241,0.12)', count: '60+' },
  { icon: TrendingUp, title: 'Transfer Analogic', desc: 'Relații conceptuale, inferențe', color: '#0ea5e9', bg: 'rgba(14,165,233,0.12)', count: '45+' },
  { icon: BookOpen, title: 'Vocabular & Texte', desc: 'Sinonime, antonime, înțelegere', color: '#10b981', bg: 'rgba(16,185,129,0.12)', count: '80+' },
  { icon: Hash, title: 'Calcul & Raționament Numeric', desc: 'Calcul rapid, procente, probleme', color: '#f59e0b', bg: 'rgba(245,158,11,0.12)', count: '60+' },
  { icon: Database, title: 'Memorie de Lucru', desc: 'Secvențe, cifre, litere', color: '#ec4899', bg: 'rgba(236,72,153,0.12)', count: '10 niveluri' },
  { icon: Eye, title: 'Atenție & Comutare', desc: 'Inhibiție cognitivă, comutare', color: '#14b8a6', bg: 'rgba(20,184,166,0.12)', count: '2 probe' },
]

const features = [
  { icon: Zap, title: 'Teste adaptive CAS++', desc: 'Format identic cu testele oficiale. 9 probe complete per instituție.', metric: '9 probe', color: '#6366f1', bg: 'rgba(99,102,241,0.15)' },
  { icon: Clock, title: 'Simulare cu cronometru', desc: 'Timer strict, condiții reale, presiune autentică de examen.', metric: 'Timer exact', color: '#f59e0b', bg: 'rgba(245,158,11,0.15)' },
  { icon: TrendingUp, title: 'Statistici detaliate', desc: 'Grafice de progres, scor per categorie, evoluție în timp.', metric: '10+ grafice', color: '#10b981', bg: 'rgba(16,185,129,0.15)' },
  { icon: Award, title: 'Flashcard-uri', desc: 'Memorare rapidă pentru vocabular, formule și concepte cheie.', metric: '500+ carduri', color: '#ec4899', bg: 'rgba(236,72,153,0.15)' },
  { icon: Shield, title: 'Actualizat constant', desc: 'Banca de întrebări sincronizată cu formatul oficial curent.', metric: 'Mereu fresh', color: '#14b8a6', bg: 'rgba(20,184,166,0.15)' },
  { icon: Lock, title: 'Plată unică', desc: 'Fără abonament lunar. Plătești o dată, acces permanent.', metric: 'Forever ∞', color: '#f97316', bg: 'rgba(249,115,22,0.15)' },
]

const plans = [
  {
    name: 'Gratuit',
    price: '0', period: '',
    desc: 'Ideal pentru a înțelege platforma',
    features: ['Demo per categorie', 'Acces la toate 4 instituțiile (demo)', 'Statistici de bază'],
    cta: 'Înregistrare gratuită',
    href: '/auth/register',
    style: 'free' as const,
  },
  {
    name: 'O Instituție',
    price: '69', period: 'lei',
    desc: 'Acces complet la instituția dorită',
    features: ['Acces complet la 1 instituție', '9 probe CAS++ complete', 'Simulare examen complet', 'Flashcard-uri + Review greșeli', 'Statistici detaliate + grafice', 'Actualizări gratuite pe viață'],
    cta: 'Cumpără acum — 69 lei',
    href: '/auth/register?plan=one_institution',
    badge: 'Popular',
    style: 'featured' as const,
  },
  {
    name: 'Toate Instituțiile',
    price: '119', period: 'lei',
    desc: 'MAI + MApN + SRI + ANP',
    features: ['Acces complet la TOATE 4 instituțiile', '36 probe CAS++ complete', 'Simulare pentru fiecare instituție', 'Flashcard-uri + Review greșeli', 'Statistici per instituție', 'Actualizări gratuite pe viață', 'Economisești 157 lei vs. separat'],
    cta: 'Cumpără acum — 119 lei',
    href: '/auth/register?plan=all_institutions',
    badge: 'Best value',
    style: 'premium' as const,
  },
]

export default async function HomePage() {
  return (
    <div className="landing-root min-h-screen" style={{ fontFamily: 'Inter, system-ui, sans-serif', overflowX: 'hidden' }}>
      <style>{`
        .landing-root { overflow-x: hidden; }

        /* ── Nav ── */
        .landing-nav-shell {
          background: rgba(3, 10, 24, 0.78);
          border-bottom: 1px solid rgba(148, 163, 184, 0.16);
          backdrop-filter: blur(18px) saturate(150%);
          -webkit-backdrop-filter: blur(18px) saturate(150%);
          box-shadow: 0 18px 40px rgba(2, 8, 23, 0.24);
        }
        .landing-nav-inner {
          position: relative;
        }
        .landing-nav-inner::after {
          content: "";
          position: absolute;
          left: 24px;
          right: 24px;
          bottom: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent 0%, rgba(96, 165, 250, 0.28) 20%, rgba(167, 139, 250, 0.26) 80%, transparent 100%);
          pointer-events: none;
        }
        .landing-brand {
          color: rgba(255,255,255,0.96);
          text-shadow: 0 8px 24px rgba(15, 23, 42, 0.45);
        }
        .landing-nav-link { transition: color 0.15s; }
        .landing-nav-link:hover { color: white !important; }
        .landing-nav-link,
        .nav-login {
          text-shadow: 0 4px 18px rgba(15, 23, 42, 0.35);
        }

        /* ── Buttons ── */
        .btn-primary {
          transition: transform 200ms ease, box-shadow 200ms ease;
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 20px 40px rgba(37,99,235,0.42) !important;
        }
        .btn-secondary { transition: background 180ms ease, color 180ms ease; }
        .btn-secondary:hover { background: rgba(255,255,255,0.12) !important; color: white !important; }

        /* ── Cards ── */
        .card-light {
          transition: transform 220ms ease, box-shadow 220ms ease, border-color 220ms ease;
        }
        .card-light:hover {
          transform: translateY(-6px);
          box-shadow: 0 24px 60px rgba(15,23,42,0.14) !important;
          border-color: rgba(37,99,235,0.2) !important;
        }
        .card-dark {
          transition: transform 220ms ease, background 220ms ease, border-color 220ms ease;
        }
        .card-dark:hover {
          transform: translateY(-5px);
          background: rgba(255,255,255,0.07) !important;
          border-color: rgba(255,255,255,0.18) !important;
        }
        .inst-card {
          transition: transform 280ms ease, box-shadow 280ms ease;
        }
        .inst-card:hover { transform: translateY(-8px); }
        .inst-card img { transition: transform 400ms ease; }
        .inst-card:hover img { transform: scale(1.08); }

        /* ── Hero mockup ── */
        .hero-float {
          animation: heroFloat 6s ease-in-out infinite;
          box-shadow: 0 32px 80px rgba(2,8,23,0.55), inset 0 1px 0 rgba(255,255,255,0.12);
        }
        .score-badge { animation: badgePulse 3.8s ease-in-out infinite; }

        /* ── iOS Notification ── */
        .ios-notif-wrap {
          position: absolute;
          top: 24px;
          left: 50%;
          width: min(380px, calc(100vw - 40px));
          z-index: 20;
          animation: notifDrop 0.75s cubic-bezier(0.34,1.48,0.64,1) 1.1s both;
        }
        .ios-notif {
          border-radius: 22px;
          background: rgba(242,242,247,0.97);
          border: 1px solid rgba(255,255,255,0.85);
          box-shadow: 0 12px 48px rgba(0,0,0,0.32), 0 2px 8px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.95);
          backdrop-filter: blur(40px) saturate(200%);
          -webkit-backdrop-filter: blur(40px) saturate(200%);
          overflow: hidden;
        }
        .notif-actions {
          display: grid;
          grid-template-columns: minmax(108px, 0.9fr) minmax(0, 1.35fr);
          align-items: stretch;
        }
        .notif-btn {
          appearance: none;
          padding: 12px 16px;
          min-height: 46px;
          border: none;
          cursor: pointer;
          font-size: 13px;
          font-weight: 700;
          transition: background 0.15s;
        }
        .notif-btn:first-child {
          background: rgba(118,118,128,0.12); color: #1c1c1e;
          border-bottom-left-radius: 20px;
          border-right: 1px solid rgba(0,0,0,0.07);
        }
        .notif-btn:first-child:hover { background: rgba(118,118,128,0.2); }
        .notif-btn-cta {
          background: #2563eb; color: white;
          border-bottom-right-radius: 20px;
          text-decoration: none;
          display: flex; align-items: center; justify-content: center;
          padding: 12px 18px;
          min-height: 46px;
          font-size: 13px; font-weight: 800;
          letter-spacing: -0.01em;
        }
        .notif-btn-cta:hover { background: #1d4ed8; }

        /* ── Eyebrow ── */
        .eyebrow-pill {
          animation: eyebrowFloat 5.2s ease-in-out infinite;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.18), 0 12px 40px rgba(148,163,184,0.1);
          position: relative; overflow: hidden; isolation: isolate;
        }
        .eyebrow-pill::before {
          content: ""; position: absolute; inset: -1px;
          background: linear-gradient(105deg, transparent 0%, rgba(255,255,255,0.22) 45%, transparent 58%);
          transform: translateX(-120%);
          animation: eyebrowSheen 5s ease-in-out infinite;
          z-index: -1;
        }

        /* ── Gradient text ── */
        .hero-title-glow {
          background: linear-gradient(180deg, #ffffff 0%, #e8f0ff 55%, #c0d5ff 100%);
          -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
        }
        .hero-title-accent {
          background: linear-gradient(100deg, #ffffff 0%, #dbeafe 25%, #8bb7ff 55%, #c4b5fd 82%, #fff 100%);
          -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 18px 42px rgba(99,102,241,0.25));
        }
        .grad-text {
          background: linear-gradient(135deg,#3b82f6,#8b5cf6);
          -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
        }
        .hero-assurance {
          margin: 0 0 34px;
        }
        .hero-assurance-copy {
          font-size: 16px;
          line-height: 1.65;
          color: rgba(255,255,255,0.82);
          font-weight: 700;
          letter-spacing: -0.01em;
          margin-bottom: 14px;
        }
        .hero-assurance-badges {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        .hero-assurance-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 9px 14px;
          border-radius: 999px;
          background: linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.04));
          border: 1px solid rgba(255,255,255,0.12);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.78);
          font-size: 13px;
          font-weight: 700;
        }
        .hero-assurance-dot {
          width: 7px;
          height: 7px;
          border-radius: 999px;
          background: linear-gradient(135deg,#60a5fa,#a78bfa);
          box-shadow: 0 0 0 4px rgba(96,165,250,0.12);
          flex-shrink: 0;
        }
        /* ── Problem card number ── */
        .prob-num {
          position: absolute; right: 16px; top: 12px;
          font-size: 80px; font-weight: 900; line-height: 1;
          letter-spacing: -0.05em; pointer-events: none; user-select: none;
          opacity: 0.06; font-family: ui-sans-serif, system-ui, sans-serif;
        }

        /* ── Step connector line ── */
        .step-connector {
          position: absolute; top: 36px; left: calc(50% + 36px + 16px);
          right: calc(50% - 36px - 16px + 100% / 3 * 2 - 100% / 3);
          height: 2px;
          background: linear-gradient(90deg, rgba(37,99,235,0.3), rgba(124,58,237,0.3));
        }

        /* ── Pricing ── */
        .pricing-featured {
          transform: scale(1.04);
          box-shadow: 0 24px 70px rgba(37,99,235,0.4) !important;
        }

        /* ── Keyframes ── */
        @keyframes heroFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes badgePulse {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-4px) scale(1.04); }
        }
        @keyframes eyebrowFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        @keyframes eyebrowSheen {
          0%, 18% { transform: translateX(-120%); opacity: 0; }
          38% { opacity: 1; }
          58%, 100% { transform: translateX(120%); opacity: 0; }
        }
        @keyframes notifDrop {
          from { transform: translateX(-50%) translateY(-140%); opacity: 0; }
          to   { transform: translateX(-50%) translateY(0);     opacity: 1; }
        }
        @keyframes progressFill {
          from { width: 0; }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 8px 24px rgba(37,99,235,0.35); }
          50% { box-shadow: 0 12px 36px rgba(37,99,235,0.6), 0 0 0 8px rgba(37,99,235,0.08); }
        }
        @keyframes scanLine {
          0% { top: 0; opacity: 0.5; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* ── Responsive ── */
        @media (max-width: 1023px) {
          .pricing-featured { transform: scale(1); }
          .hero-grid { grid-template-columns: 1fr !important; }
          .pricing-grid { grid-template-columns: 1fr !important; }
          .steps-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 767px) {
          .nav-login { display: none !important; }
          .nav-register { padding: 9px 14px !important; font-size: 13px !important; }
          .landing-nav-shell {
            background: rgba(3, 10, 24, 0.88);
          }
          .landing-nav-inner::after {
            left: 16px;
            right: 16px;
          }
          .notif-actions {
            grid-template-columns: 1fr 1.2fr;
          }
          .hero-section { padding-top: 64px !important; padding-bottom: 80px !important; }
          .hero-copy { text-align: center; }
          .hero-copy h1 { text-align: center; }
          .hero-actions, .trust-strip { justify-content: center !important; }
          .section-pad { padding-top: 64px !important; padding-bottom: 64px !important; }
          .ios-notif-wrap { top: 16px; }
          .hero-assurance { margin-bottom: 30px; }
          .hero-assurance-copy { text-align: center; }
          .hero-assurance-badges { justify-content: center; }
        }
      `}</style>

      {/* ─── NAVBAR ─── */}
      <nav className="landing-nav-shell" style={{ position: 'sticky', top: 0, zIndex: 50 }}>
        <div className="landing-nav-inner" style={{ maxWidth: 1152, margin: '0 auto', padding: '0 24px', height: 68, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <div style={{ width: 40, height: 40, background: 'linear-gradient(135deg,#2563eb,#7c3aed)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 18px rgba(37,99,235,0.4)' }}>
              <Brain style={{ width: 20, height: 20, color: 'white' }} />
            </div>
            <span className="landing-brand" style={{ fontWeight: 800, fontSize: 19 }}>PsihoPrep</span>
          </Link>

          <div className="hidden md:flex" style={{ alignItems: 'center', gap: 28 }}>
            {[{ href: '#why', label: 'De ce?' }, { href: '#how', label: 'Cum funcționează' }, { href: '#institutions', label: 'Instituții' }, { href: '#pricing', label: 'Prețuri' }].map(({ href, label }) => (
              <a key={href} href={href} className="landing-nav-link" style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, fontWeight: 500, textDecoration: 'none' }}>{label}</a>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Link href="/auth/login" className="nav-login" style={{ padding: '8px 16px', fontSize: 14, fontWeight: 500, color: 'rgba(255,255,255,0.55)', textDecoration: 'none', borderRadius: 10 }}>Intră în cont</Link>
            <Link href="/auth/register" className="nav-register btn-primary" style={{ padding: '10px 18px', fontSize: 14, fontWeight: 700, color: 'white', textDecoration: 'none', background: 'linear-gradient(135deg,#2563eb,#7c3aed)', borderRadius: 11, boxShadow: '0 4px 14px rgba(37,99,235,0.35)' }}>
              Începe gratuit
            </Link>
          </div>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section className="hero-section" style={{
        background: 'radial-gradient(circle at 50% -8%, rgba(255,255,255,0.11), transparent 28%), linear-gradient(165deg,#020814 0%,#061528 48%,#0b1a32 100%)',
        paddingTop: 80, paddingBottom: 80, position: 'relative', overflow: 'hidden',
      }}>
        {/* Grid texture */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'linear-gradient(rgba(37,99,235,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(37,99,235,0.05) 1px,transparent 1px)', backgroundSize: '56px 56px' }} />
        {/* Glow blobs */}
        <div style={{ position: 'absolute', top: -80, left: '18%', width: 520, height: 520, background: 'radial-gradient(circle,rgba(37,99,235,0.13) 0%,transparent 68%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -40, right: '8%', width: 420, height: 420, background: 'radial-gradient(circle,rgba(124,58,237,0.11) 0%,transparent 68%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: -1, height: 100, background: 'linear-gradient(180deg,rgba(2,8,20,0) 0%,rgba(2,8,20,0.8) 100%)', pointerEvents: 'none' }} />

        {/* iOS Notification */}
        <IosNotification />

        {/* Hero grid */}
        <div className="hero-grid" style={{ maxWidth: 1152, margin: '0 auto', padding: '0 24px', display: 'grid', gridTemplateColumns: '1fr 460px', gap: 64, alignItems: 'center' }}>
          {/* Copy */}
          <div className="hero-copy" style={{ maxWidth: 600 }}>
            {/* Eyebrow */}
            <div className="eyebrow-pill" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'linear-gradient(135deg,rgba(255,255,255,0.12),rgba(255,255,255,0.052))', border: '1px solid rgba(255,255,255,0.16)', borderRadius: 999, padding: '8px 16px', marginBottom: 28, backdropFilter: 'blur(18px)' }}>
              <span style={{ display: 'inline-block', width: 7, height: 7, borderRadius: 999, background: '#4ade80', boxShadow: '0 0 0 3px rgba(74,222,128,0.25)', flexShrink: 0 }} />
              <span style={{ color: 'rgba(255,255,255,0.82)', fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Proba psihologică · MAI · MApN · SRI · ANP</span>
            </div>

            {/* Headline */}
            <h1 className={sora.className} style={{ fontSize: 'clamp(40px,5.8vw,72px)', fontWeight: 900, lineHeight: 1.02, letterSpacing: '-0.02em', marginBottom: 22 }}>
              <span className="hero-title-glow">Nu mai pica</span><br />
              <span className="hero-title-accent">testul psihologic.</span>
            </h1>

            <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.58)', lineHeight: 1.72, marginBottom: 36, maxWidth: 490 }}>
              Singura platformă care simulează <strong style={{ color: 'rgba(255,255,255,0.88)', fontWeight: 700 }}>exact</strong> testele CAS++ reale ale <strong style={{ color: 'rgba(255,255,255,0.88)', fontWeight: 700 }}>MAI, MApN, SRI și ANP</strong>. Intri în sală pregătit, nu surprins.
            </p>

            {/* CTAs */}
            <div className="hero-actions" style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 40 }}>
              <Link href="/auth/register" className="btn-primary" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '14px 28px', fontSize: 15, fontWeight: 700, color: 'white', textDecoration: 'none',
                background: 'linear-gradient(135deg,#2563eb,#7c3aed)', borderRadius: 14,
                boxShadow: '0 8px 24px rgba(37,99,235,0.42)',
                animation: 'pulseGlow 3s ease-in-out infinite',
              }}>
                <Play style={{ width: 16, height: 16 }} />
                Încearcă gratuit
                <ArrowRight style={{ width: 16, height: 16 }} />
              </Link>
              <a href="#how" className="btn-secondary" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '14px 22px', fontSize: 15, fontWeight: 600, color: 'rgba(255,255,255,0.68)', textDecoration: 'none',
                background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 14,
              }}>
                Cum funcționează
              </a>
            </div>

            <div className="hero-assurance">
              <p className="hero-assurance-copy">Fără surprize. Fără blocaj. Fără panică în ziua testului.</p>
              <div className="hero-assurance-badges">
                {['Mai calm', 'Mai sigur', 'Mai pregătit'].map((item) => (
                  <span key={item} className="hero-assurance-badge">
                    <span className="hero-assurance-dot" />
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Trust strip */}
            <div className="trust-strip" style={{ display: 'flex', alignItems: 'center', gap: 28, flexWrap: 'wrap' }}>
              {[{ val: '500+', label: 'candidați admiși' }, { val: '94%', label: 'rată de succes' }, { val: '4', label: 'instituții acoperite' }].map(s => (
                <div key={s.label} style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                  <span className={sora.className} style={{ fontSize: 24, fontWeight: 900, color: 'white', letterSpacing: '-0.03em' }}>{s.val}</span>
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.38)', fontWeight: 500 }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Mockup */}
          <div className="animate-fade-up hidden lg:block" style={{ position: 'relative', width: 440, marginLeft: 'auto' }}>
            <div style={{ position: 'absolute', inset: -48, background: 'radial-gradient(circle,rgba(37,99,235,0.16) 0%,transparent 65%)', pointerEvents: 'none' }} />
            <div className="hero-float" style={{ background: 'linear-gradient(145deg,rgba(255,255,255,0.075) 0%,rgba(255,255,255,0.032) 100%)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 24, padding: 24, backdropFilter: 'blur(24px)', position: 'relative' }}>
              {/* Scan line */}
              <div style={{ position: 'absolute', left: 0, right: 0, height: 1, background: 'linear-gradient(90deg,transparent,rgba(99,102,241,0.4),transparent)', animation: 'scanLine 4s linear infinite', pointerEvents: 'none' }} />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                <div>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 4, fontWeight: 700 }}>PsihoPrep · MAI</div>
                  <div style={{ fontSize: 19, fontWeight: 800, color: 'white' }}>Command Center</div>
                </div>
                <div style={{ display: 'flex', gap: 5 }}>
                  {['MAI', 'MApN', 'SRI', 'ANP'].map((inst, idx) => (
                    <span key={inst} style={{ padding: '5px 8px', borderRadius: 8, fontSize: 10, fontWeight: 800, color: idx === 0 ? 'white' : 'rgba(255,255,255,0.42)', background: idx === 0 ? 'rgba(59,130,246,0.24)' : 'rgba(255,255,255,0.055)', border: idx === 0 ? '1px solid rgba(59,130,246,0.4)' : '1px solid rgba(255,255,255,0.07)' }}>{inst}</span>
                  ))}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '130px 1fr', gap: 14, marginBottom: 14 }}>
                <div style={{ borderRadius: 18, padding: 16, background: 'linear-gradient(145deg,rgba(59,130,246,0.2),rgba(124,58,237,0.15))', border: '1px solid rgba(96,165,250,0.28)', minHeight: 130, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 800 }}>Nivel pregătire</div>
                  <div>
                    <div className={sora.className} style={{ fontSize: 44, fontWeight: 900, color: 'white', lineHeight: 1 }}>74%</div>
                    <div style={{ fontSize: 12, color: '#93c5fd', fontWeight: 800, marginTop: 6 }}>+18% săptămâna asta</div>
                  </div>
                </div>
                <div style={{ display: 'grid', gap: 9 }}>
                  {[{ label: 'Atenție', value: 81, color: '#3b82f6' }, { label: 'Logică', value: 69, color: '#8b5cf6' }, { label: 'Memorie', value: 76, color: '#10b981' }, { label: 'Numeric', value: 64, color: '#f59e0b' }].map(item => (
                    <div key={item.label}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                        <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.62)', fontWeight: 700 }}>{item.label}</span>
                        <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)', fontWeight: 800 }}>{item.value}%</span>
                      </div>
                      <div style={{ height: 6, borderRadius: 999, background: 'rgba(255,255,255,0.07)', overflow: 'hidden' }}>
                        <div style={{ width: `${item.value}%`, height: '100%', borderRadius: 999, background: item.color, boxShadow: `0 0 14px ${item.color}66`, animation: `progressFill 1.2s ease both` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.045)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: 14, marginBottom: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                  <div>
                    <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.38)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 800, marginBottom: 4 }}>Recomandat azi</div>
                    <div style={{ fontSize: 15, color: 'white', fontWeight: 800 }}>Raționament analitic</div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', marginTop: 3 }}>12 minute · 30 întrebări</div>
                  </div>
                  <div style={{ width: 46, height: 46, borderRadius: 13, background: 'rgba(99,102,241,0.2)', border: '1px solid rgba(99,102,241,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Flame style={{ width: 20, height: 20, color: '#818cf8' }} />
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8 }}>
                {[['36', 'teste'], ['9', 'probe'], ['4', 'instituții']].map(([v, l]) => (
                  <div key={l} style={{ borderRadius: 12, padding: '10px 8px', textAlign: 'center', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                    <div className={sora.className} style={{ fontSize: 19, color: 'white', fontWeight: 900, lineHeight: 1 }}>{v}</div>
                    <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', fontWeight: 700, marginTop: 5 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="score-badge" style={{ position: 'absolute', top: -16, right: -16, background: 'linear-gradient(135deg,#2563eb,#7c3aed)', borderRadius: 16, padding: '12px 16px', boxShadow: '0 16px 42px rgba(37,99,235,0.5)', border: '1px solid rgba(255,255,255,0.2)', textAlign: 'center' }}>
              <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 4, fontWeight: 800 }}>Focus</div>
              <div style={{ fontSize: 13, fontWeight: 900, color: 'white', lineHeight: 1.1 }}>Plan zilnic</div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PROBLEMA ─── */}
      <section id="why" className="section-pad" style={{ background: '#f0f4f9', padding: '88px 24px', borderBottom: '1px solid #dde4ed' }}>
        <div style={{ maxWidth: 1152, margin: '0 auto' }}>
          <ScrollReveal className="text-center" style={{ marginBottom: 56 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(239,68,68,0.09)', border: '1px solid rgba(239,68,68,0.22)', borderRadius: 999, padding: '5px 14px', marginBottom: 16 }}>
              <AlertTriangle style={{ width: 12, height: 12, color: '#dc2626' }} />
              <span style={{ color: '#dc2626', fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Problema reală</span>
            </div>
            <h2 className={sora.className} style={{ fontSize: 'clamp(28px,4vw,44px)', fontWeight: 900, color: '#0c1524', letterSpacing: '-0.03em', marginBottom: 14, lineHeight: 1.12 }}>
              Cei mai mulți candidați pică<br />nu pentru că sunt nepotriviți.
            </h2>
            <p style={{ fontSize: 17, color: '#546e88', maxWidth: 500, margin: '0 auto', lineHeight: 1.7 }}>
              Pică pentru că nu știu la ce să se aștepte. Asta e o problemă care se rezolvă.
            </p>
          </ScrollReveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 20 }}>
            {problems.map((p, i) => {
              const Icon = p.icon
              return (
                <ScrollReveal key={p.title} delay={i * 75}>
                  <div className="card-light" style={{ background: 'white', borderRadius: 22, padding: '28px 26px 26px', border: '1px solid #dde6f0', boxShadow: '0 2px 16px rgba(0,0,0,0.04)', position: 'relative', overflow: 'hidden' }}>
                    {/* Top gradient accent */}
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${p.color}, ${p.color}88)`, borderRadius: '22px 22px 0 0' }} />
                    {/* Background number */}
                    <span className="prob-num" style={{ color: p.color }}>{p.num}</span>

                    <div style={{ width: 48, height: 48, borderRadius: 14, background: p.bg, border: `1px solid ${p.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
                      <Icon style={{ width: 22, height: 22, color: p.color }} />
                    </div>
                    <h3 style={{ fontSize: 16, fontWeight: 800, color: '#0c1524', marginBottom: 10, lineHeight: 1.3 }}>{p.title}</h3>
                    <p style={{ fontSize: 14, color: '#546e88', lineHeight: 1.68, marginBottom: 16 }}>{p.desc}</p>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: p.bg, border: `1px solid ${p.border}`, borderRadius: 8, padding: '5px 10px' }}>
                      <span style={{ fontSize: 12, fontWeight: 700, color: p.color }}>{p.stat}</span>
                    </div>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── CUM FUNCȚIONEAZĂ ─── */}
      <section id="how" className="section-pad" style={{ background: 'white', padding: '88px 24px' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <ScrollReveal className="text-center" style={{ marginBottom: 60 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(37,99,235,0.07)', border: '1px solid rgba(37,99,235,0.18)', borderRadius: 999, padding: '5px 14px', marginBottom: 16 }}>
              <Zap style={{ width: 12, height: 12, color: '#2563eb' }} />
              <span style={{ color: '#2563eb', fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Procesul</span>
            </div>
            <h2 className={sora.className} style={{ fontSize: 'clamp(28px,4vw,44px)', fontWeight: 900, color: '#0c1524', letterSpacing: '-0.03em', marginBottom: 14, lineHeight: 1.12 }}>
              3 pași. De la zero<br />la admis.
            </h2>
            <p style={{ fontSize: 17, color: '#546e88', maxWidth: 420, margin: '0 auto' }}>Simplu. Eficient. Bazat pe ce funcționează în practică.</p>
          </ScrollReveal>

          <div className="steps-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24, position: 'relative' }}>
            {/* Connector line */}
            <div className="hidden lg:block" style={{ position: 'absolute', top: 44, left: 'calc(16.5% + 44px)', right: 'calc(16.5% + 44px)', height: 2, background: 'linear-gradient(90deg,rgba(37,99,235,0.25),rgba(124,58,237,0.25))', pointerEvents: 'none', zIndex: 0 }} />

            {steps.map((step, i) => {
              const Icon = step.icon
              return (
                <ScrollReveal key={step.num} delay={i * 110}>
                  <div style={{ textAlign: 'center', padding: '0 12px', position: 'relative', zIndex: 1 }}>
                    <div style={{ position: 'relative', display: 'inline-block', marginBottom: 28 }}>
                      <div style={{ width: 88, height: 88, borderRadius: 24, background: step.bg, border: `2px solid ${step.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 12px 32px ${step.color}25` }}>
                        <Icon style={{ width: 36, height: 36, color: step.color }} />
                      </div>
                      <div style={{ position: 'absolute', top: -10, right: -10, width: 28, height: 28, borderRadius: 9, background: step.color, color: 'white', fontSize: 11, fontWeight: 900, letterSpacing: '0.04em', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 4px 12px ${step.color}55` }}>
                        {step.num}
                      </div>
                    </div>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: `${step.color}12`, border: `1px solid ${step.color}25`, borderRadius: 999, padding: '3px 10px', marginBottom: 12 }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: step.color }}>{step.result}</span>
                    </div>
                    <h3 style={{ fontSize: 17, fontWeight: 800, color: '#0c1524', marginBottom: 10, lineHeight: 1.28 }}>{step.title}</h3>
                    <p style={{ fontSize: 14, color: '#546e88', lineHeight: 1.72 }}>{step.desc}</p>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>

          <ScrollReveal delay={200}>
            <div style={{ textAlign: 'center', marginTop: 52 }}>
              <Link href="/auth/register" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', fontSize: 15, fontWeight: 700, color: 'white', textDecoration: 'none', background: 'linear-gradient(135deg,#2563eb,#7c3aed)', borderRadius: 14, boxShadow: '0 8px 28px rgba(37,99,235,0.32)' }}>
                Primul test e gratuit <ArrowRight style={{ width: 17, height: 17 }} />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── SOCIAL PROOF ─── */}
      <section className="section-pad" style={{ background: '#f0f4f9', padding: '88px 24px' }}>
        <div style={{ maxWidth: 1152, margin: '0 auto' }}>
          {/* Big number */}
          <ScrollReveal>
            <div style={{ background: 'linear-gradient(135deg,#0f172a,#1e293b)', borderRadius: 28, padding: '44px 48px', marginBottom: 52, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 28% 50%,rgba(37,99,235,0.18) 0%,transparent 58%),radial-gradient(ellipse at 72% 50%,rgba(124,58,237,0.12) 0%,transparent 58%)', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg,transparent,rgba(99,102,241,0.6),transparent)' }} />
              <div style={{ position: 'relative' }}>
                <div className={`${sora.className} grad-text`} style={{ fontSize: 'clamp(60px,9vw,100px)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1, marginBottom: 14 }}>94%</div>
                <p style={{ fontSize: 19, color: 'rgba(255,255,255,0.88)', fontWeight: 600, marginBottom: 8 }}>
                  dintre candidații care s-au pregătit cu PsihoPrep au trecut proba psihologică
                </p>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.38)', fontWeight: 500 }}>Bazat pe feedback-ul utilizatorilor după sesiunile 2023–2024</p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal className="text-center" style={{ marginBottom: 44 }}>
            <h2 className={sora.className} style={{ fontSize: 'clamp(26px,3.5vw,38px)', fontWeight: 900, color: '#0c1524', letterSpacing: '-0.03em', marginBottom: 8 }}>Ce spun candidații admiși</h2>
            <p style={{ fontSize: 16, color: '#546e88' }}>Oameni reali, examene reale.</p>
          </ScrollReveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 20 }}>
            {testimonials.map((t, i) => (
              <ScrollReveal key={t.name} delay={i * 85}>
                <div className="card-light" style={{ background: 'white', borderRadius: 22, padding: 28, border: '1px solid #dde6f0', boxShadow: '0 2px 16px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', height: '100%', boxSizing: 'border-box', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg,${t.accent},${t.accent}66)`, borderRadius: '22px 22px 0 0' }} />
                  <div style={{ display: 'flex', gap: 3, marginBottom: 18 }}>
                    {Array.from({ length: 5 }).map((_, j) => <Star key={j} style={{ width: 15, height: 15, fill: '#f59e0b', color: '#f59e0b' }} />)}
                  </div>
                  <p style={{ fontSize: 15, color: '#2d3e50', lineHeight: 1.72, flex: 1, marginBottom: 22 }}>&ldquo;{t.text}&rdquo;</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingTop: 18, borderTop: '1px solid #edf2f7' }}>
                    <div style={{ width: 42, height: 42, borderRadius: 13, background: `linear-gradient(135deg,${t.accent},${t.accent}bb)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 13, fontWeight: 800, flexShrink: 0 }}>{t.initials}</div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: '#0c1524' }}>{t.name}</div>
                      <div style={{ fontSize: 12, color: '#90a4b8', fontWeight: 600 }}>{t.role}</div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── INSTITUȚII ─── */}
      <section id="institutions" className="section-pad" style={{ background: 'white', padding: '88px 24px' }}>
        <div style={{ maxWidth: 1152, margin: '0 auto' }}>
          <ScrollReveal className="text-center" style={{ marginBottom: 52 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(99,102,241,0.07)', border: '1px solid rgba(99,102,241,0.18)', borderRadius: 999, padding: '5px 14px', marginBottom: 16 }}>
              <Shield style={{ width: 12, height: 12, color: '#6366f1' }} />
              <span style={{ color: '#6366f1', fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Instituții</span>
            </div>
            <h2 className={sora.className} style={{ fontSize: 'clamp(26px,3.5vw,42px)', fontWeight: 900, color: '#0c1524', letterSpacing: '-0.03em', marginBottom: 14, lineHeight: 1.12 }}>
              Teste specifice fiecărei instituții
            </h2>
            <p style={{ fontSize: 17, color: '#546e88', maxWidth: 480, margin: '0 auto', lineHeight: 1.68 }}>
              Fiecare instituție are propriile standarde CAS++.<br />Noi acoperim exact formatul lor oficial.
            </p>
          </ScrollReveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 20 }}>
            {institutions.map((inst, i) => (
              <ScrollReveal key={inst.abbr} delay={i * 80}>
                <div className="inst-card" style={{ background: 'white', borderRadius: 22, overflow: 'hidden', border: '1px solid #dde6f0', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', position: 'relative' }}>
                  <div style={{ position: 'relative', height: 176, overflow: 'hidden', background: inst.gradient }}>
                    <Image src={inst.image} alt={inst.name} fill sizes="280px" className="object-cover object-top" />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(0,0,0,0.72) 0%,rgba(0,0,0,0.1) 55%,transparent 100%)' }} />
                    {/* Badge */}
                    <div style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', borderRadius: 8, padding: '4px 10px', border: '1px solid rgba(255,255,255,0.15)' }}>
                      <span style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.9)', letterSpacing: '0.06em' }}>9 probe · CAS++</span>
                    </div>
                    <div style={{ position: 'absolute', left: 0, right: 0, bottom: 14, textAlign: 'center' }}>
                      <span className={sora.className} style={{ fontSize: 32, fontWeight: 900, color: 'white', letterSpacing: '-0.01em', textShadow: '0 8px 24px rgba(0,0,0,0.5)' }}>{inst.abbr}</span>
                    </div>
                  </div>
                  <div style={{ padding: '18px 20px 20px' }}>
                    <p style={{ fontSize: 13, fontWeight: 800, color: '#0c1524', lineHeight: 1.35, marginBottom: 6, textAlign: 'center' }}>{inst.name}</p>
                    <p style={{ fontSize: 12, color: '#7898b5', fontWeight: 600, lineHeight: 1.4, textAlign: 'center', marginBottom: 14 }}>{inst.desc}</p>
                    <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
                      <div style={{ flex: 1, textAlign: 'center', background: '#f0f4f9', borderRadius: 10, padding: '8px 6px' }}>
                        <div style={{ fontSize: 16, fontWeight: 900, color: '#0c1524' }}>{inst.questions}</div>
                        <div style={{ fontSize: 10, color: '#7898b5', fontWeight: 700, marginTop: 2 }}>întrebări</div>
                      </div>
                      <div style={{ flex: 1, textAlign: 'center', background: '#f0f4f9', borderRadius: 10, padding: '8px 6px' }}>
                        <div style={{ fontSize: 16, fontWeight: 900, color: '#0c1524' }}>{inst.probes}</div>
                        <div style={{ fontSize: 10, color: '#7898b5', fontWeight: 700, marginTop: 2 }}>probe</div>
                      </div>
                    </div>
                  </div>
                  {/* Bottom accent */}
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,transparent,${inst.accent},transparent)`, opacity: 0.5 }} />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CATEGORII ─── */}
      <section className="section-pad" style={{ background: '#f0f4f9', padding: '88px 24px' }}>
        <div style={{ maxWidth: 1152, margin: '0 auto' }}>
          <ScrollReveal className="text-center" style={{ marginBottom: 52 }}>
            <h2 className={sora.className} style={{ fontSize: 'clamp(26px,3.5vw,42px)', fontWeight: 900, color: '#0c1524', letterSpacing: '-0.03em', marginBottom: 14, lineHeight: 1.12 }}>
              9 probe CAS++ complete
            </h2>
            <p style={{ fontSize: 17, color: '#546e88', maxWidth: 440, margin: '0 auto', lineHeight: 1.68 }}>
              Acoperim toate tipurile de probe din selecția psihologică oficială.
            </p>
          </ScrollReveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 16 }}>
            {categories.map((cat, i) => {
              const Icon = cat.icon
              return (
                <ScrollReveal key={cat.title} delay={i * 55}>
                  <div className="card-light" style={{ background: 'white', borderRadius: 20, padding: '24px 20px', border: '1px solid #dde6f0', boxShadow: '0 2px 10px rgba(0,0,0,0.04)', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,${cat.color},${cat.color}55)` }} />
                    <div style={{ width: 48, height: 48, borderRadius: 14, background: cat.bg, border: `1px solid ${cat.color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, boxShadow: `0 8px 20px ${cat.color}20` }}>
                      <Icon style={{ width: 22, height: 22, color: cat.color }} />
                    </div>
                    <h3 style={{ fontSize: 14, fontWeight: 800, color: '#0c1524', marginBottom: 6, lineHeight: 1.3 }}>{cat.title}</h3>
                    <p style={{ fontSize: 12, color: '#7898b5', lineHeight: 1.55, marginBottom: 14 }}>{cat.desc}</p>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: cat.bg, borderRadius: 7, padding: '3px 9px' }}>
                      <span style={{ fontSize: 11, fontWeight: 800, color: cat.color }}>{cat.count}</span>
                    </div>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section className="section-pad" style={{ background: '#020c1b', padding: '88px 24px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'linear-gradient(rgba(37,99,235,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(37,99,235,0.04) 1px,transparent 1px)', backgroundSize: '50px 50px' }} />
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse at 18% 50%,rgba(37,99,235,0.11) 0%,transparent 52%),radial-gradient(ellipse at 82% 50%,rgba(124,58,237,0.09) 0%,transparent 52%)' }} />
        <div style={{ maxWidth: 1152, margin: '0 auto', position: 'relative' }}>
          <ScrollReveal className="text-center" style={{ marginBottom: 56 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 999, padding: '5px 14px', marginBottom: 16 }}>
              <Sparkles style={{ width: 12, height: 12, color: '#a78bfa' }} />
              <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Features</span>
            </div>
            <h2 className={sora.className} style={{ fontSize: 'clamp(26px,3.5vw,42px)', fontWeight: 900, color: 'white', letterSpacing: '-0.03em', marginBottom: 14, lineHeight: 1.12 }}>
              Tot ce ai nevoie pentru a reuși
            </h2>
            <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.42)', maxWidth: 400, margin: '0 auto' }}>
              O platformă completă, nu doar o colecție de întrebări.
            </p>
          </ScrollReveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 16 }}>
            {features.map((f, i) => {
              const Icon = f.icon
              return (
                <ScrollReveal key={f.title} delay={i * 65}>
                  <div className="card-dark" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: '24px 22px', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,${f.color},${f.color}44)` }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                      <div style={{ width: 46, height: 46, borderRadius: 13, background: f.bg, border: `1px solid ${f.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 8px 20px ${f.color}20` }}>
                        <Icon style={{ width: 20, height: 20, color: f.color }} />
                      </div>
                      <span style={{ fontSize: 10, fontWeight: 700, padding: '4px 10px', borderRadius: 999, background: f.bg, color: f.color, letterSpacing: '0.04em', border: `1px solid ${f.color}30`, whiteSpace: 'nowrap' }}>{f.metric}</span>
                    </div>
                    <h3 style={{ fontSize: 15, fontWeight: 800, color: 'white', marginBottom: 7 }}>{f.title}</h3>
                    <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.44)', lineHeight: 1.65 }}>{f.desc}</p>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── PRICING ─── */}
      <section id="pricing" className="section-pad" style={{ background: '#f0f4f9', padding: '88px 24px' }}>
        <div style={{ maxWidth: 1020, margin: '0 auto' }}>
          <ScrollReveal className="text-center" style={{ marginBottom: 56 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(37,99,235,0.07)', border: '1px solid rgba(37,99,235,0.18)', borderRadius: 999, padding: '5px 14px', marginBottom: 16 }}>
              <Lock style={{ width: 12, height: 12, color: '#2563eb' }} />
              <span style={{ color: '#2563eb', fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Prețuri</span>
            </div>
            <h2 className={sora.className} style={{ fontSize: 'clamp(26px,3.5vw,42px)', fontWeight: 900, color: '#0c1524', letterSpacing: '-0.03em', marginBottom: 14, lineHeight: 1.12 }}>
              Plată unică. Acces pe viață.
            </h2>
            <p style={{ fontSize: 17, color: '#546e88', maxWidth: 380, margin: '0 auto' }}>Fără abonament lunar. Plătești o dată și ai acces permanent.</p>
          </ScrollReveal>

          {/* Urgency */}
          <ScrollReveal>
            <div style={{ background: 'linear-gradient(90deg,rgba(124,58,237,0.08),rgba(37,99,235,0.08))', border: '1px solid rgba(37,99,235,0.22)', borderRadius: 16, padding: '13px 20px', marginBottom: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, flexWrap: 'wrap' }}>
              <div style={{ width: 8, height: 8, borderRadius: 999, background: '#ef4444', boxShadow: '0 0 0 4px rgba(239,68,68,0.2)', animation: 'pulseGlow 2s ease-in-out infinite' }} />
              <CalendarDays style={{ width: 15, height: 15, color: '#2563eb' }} />
              <span style={{ fontSize: 14, color: '#1e3a8a', fontWeight: 600 }}>
                Sesiunea ANP este activă acum — dosarul și psihologicul sunt în desfășurare.
              </span>
            </div>
          </ScrollReveal>

          <div className="pricing-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20, alignItems: 'end' }}>
            {plans.map((plan, i) => (
              <ScrollReveal key={plan.name} delay={i * 85}>
                <div className={plan.style === 'featured' ? 'pricing-featured' : ''} style={{
                  borderRadius: 24, padding: '30px 28px 26px', position: 'relative', display: 'flex', flexDirection: 'column',
                  minHeight: 500,
                  ...(plan.style === 'free' ? { background: 'white', border: '1px solid #dde6f0', boxShadow: '0 2px 16px rgba(0,0,0,0.04)' }
                    : plan.style === 'featured' ? { background: 'linear-gradient(160deg,#1d4ed8,#4f46e5)', boxShadow: '0 24px 70px rgba(37,99,235,0.4)', border: '1px solid rgba(255,255,255,0.18)' }
                    : { background: 'linear-gradient(160deg,#0f172a,#1e293b)', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 12px 40px rgba(0,0,0,0.2)' }),
                }}>
                  {plan.badge && (
                    <div style={{ position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)', padding: '4px 18px', borderRadius: 999, fontSize: 11, fontWeight: 800, letterSpacing: '0.06em', whiteSpace: 'nowrap', ...(plan.style === 'featured' ? { background: 'white', color: '#2563eb' } : { background: 'linear-gradient(90deg,#f59e0b,#f97316)', color: 'white' }) }}>
                      {plan.badge}
                    </div>
                  )}

                  <div style={{ marginBottom: 22 }}>
                    <h3 style={{ fontSize: 15, fontWeight: 800, marginBottom: 10, color: plan.style === 'free' ? '#0c1524' : 'white' }}>{plan.name}</h3>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 5, marginBottom: 6 }}>
                      <span className={sora.className} style={{ fontSize: 40, fontWeight: 900, letterSpacing: '-0.03em', color: plan.style === 'free' ? '#0c1524' : 'white' }}>{plan.price}</span>
                      {plan.period && <span style={{ fontSize: 16, fontWeight: 700, color: plan.style === 'featured' ? 'rgba(255,255,255,0.65)' : plan.style === 'premium' ? 'rgba(255,255,255,0.5)' : '#94a3b8' }}>{plan.period}</span>}
                    </div>
                    <p style={{ fontSize: 13, color: plan.style === 'free' ? '#7898b5' : 'rgba(255,255,255,0.52)' }}>{plan.desc}</p>
                  </div>

                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', flex: 1 }}>
                    {plan.features.map(f => (
                      <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 10, fontSize: 13, color: plan.style === 'free' ? '#3d5266' : 'rgba(255,255,255,0.82)' }}>
                        <CheckCircle style={{ width: 15, height: 15, flexShrink: 0, marginTop: 1, color: plan.style === 'featured' ? 'rgba(255,255,255,0.8)' : plan.style === 'premium' ? '#fbbf24' : '#22c55e' }} />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Link href={plan.href} className={plan.style === 'featured' ? 'btn-primary' : ''} style={{ display: 'block', textAlign: 'center', padding: '13px 20px', borderRadius: 13, fontSize: 14, fontWeight: 700, textDecoration: 'none', ...(plan.style === 'featured' ? { background: 'white', color: '#2563eb', boxShadow: '0 4px 14px rgba(0,0,0,0.15)' } : plan.style === 'premium' ? { background: 'linear-gradient(90deg,#f59e0b,#f97316)', color: 'white' } : { background: 'linear-gradient(135deg,#2563eb,#7c3aed)', color: 'white' }) }}>
                    {plan.cta}
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <p style={{ textAlign: 'center', marginTop: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 28, flexWrap: 'wrap', fontSize: 13, color: '#7898b5' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Shield style={{ width: 14, height: 14, color: '#22c55e' }} /> Garanție 7 zile</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Lock style={{ width: 14, height: 14 }} /> Plată securizată prin Stripe</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><CheckCircle style={{ width: 14, height: 14, color: '#3b82f6' }} /> Acces instant după plată</span>
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── CTA FINAL ─── */}
      <section style={{ background: 'linear-gradient(135deg,#0f172a 0%,#1e3a5f 52%,#1a1040 100%)', padding: '100px 24px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse at 38% 50%,rgba(37,99,235,0.22) 0%,transparent 58%),radial-gradient(ellipse at 68% 30%,rgba(124,58,237,0.16) 0%,transparent 55%)' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg,transparent,rgba(99,102,241,0.5),transparent)' }} />
        <ScrollReveal className="relative text-center" style={{ maxWidth: 620, margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 999, padding: '7px 18px', marginBottom: 32 }}>
            <div style={{ width: 7, height: 7, borderRadius: 999, background: '#4ade80', boxShadow: '0 0 0 3px rgba(74,222,128,0.25)' }} />
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.78)', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Sesiunea ANP e activă acum</span>
          </div>
          <h2 className={sora.className} style={{ fontSize: 'clamp(32px,5vw,54px)', fontWeight: 900, color: 'white', letterSpacing: '-0.03em', lineHeight: 1.08, marginBottom: 20 }}>
            Pregătește-te serios.<br />
            <span style={{ background: 'linear-gradient(135deg,#60a5fa,#a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Trece din prima.</span>
          </h2>
          <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.52)', marginBottom: 40, lineHeight: 1.7 }}>
            Alătură-te celor 500+ candidați care au intrat pregătiți.<br />Primul test e gratuit. Nu necesită card.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/auth/register" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '16px 34px', fontSize: 16, fontWeight: 700, color: '#1e3a5f', textDecoration: 'none', background: 'white', borderRadius: 16, boxShadow: '0 14px 44px rgba(0,0,0,0.32)' }}>
              Creează cont gratuit <ArrowRight style={{ width: 19, height: 19 }} />
            </Link>
            <a href="#pricing" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '16px 24px', fontSize: 16, fontWeight: 600, color: 'rgba(255,255,255,0.7)', textDecoration: 'none', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 16 }}>
              Vezi prețuri
            </a>
          </div>
        </ScrollReveal>
      </section>

      {/* ─── PWA ─── */}
      <section style={{ background: '#f0f4f9', borderTop: '1px solid #dde4ed', padding: '36px 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <ScrollReveal>
            <div style={{ background: 'white', borderRadius: 20, border: '1px solid #dde6f0', padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 46, height: 46, borderRadius: 14, background: 'linear-gradient(135deg,#2563eb,#7c3aed)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 6px 16px rgba(37,99,235,0.3)' }}>
                  <Smartphone style={{ width: 21, height: 21, color: 'white' }} />
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 800, color: '#0c1524' }}>Adaugă PsihoPrep pe ecranul tău</div>
                  <div style={{ fontSize: 13, color: '#7898b5' }}>Funcționează ca aplicație nativă — fără App Store, acces instant.</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <span style={{ padding: '8px 16px', fontSize: 12, fontWeight: 700, color: '#2563eb', background: '#eff6ff', borderRadius: 10, border: '1px solid #bfdbfe' }}>iPhone (Safari)</span>
                <span style={{ padding: '8px 16px', fontSize: 12, fontWeight: 700, color: '#059669', background: '#f0fdf4', borderRadius: 10, border: '1px solid #bbf7d0' }}>Android (Chrome)</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={{ background: '#0c1422', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ maxWidth: 1152, margin: '0 auto', padding: '40px 24px 32px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 32, height: 32, background: 'linear-gradient(135deg,#2563eb,#7c3aed)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Brain style={{ width: 16, height: 16, color: 'white' }} />
              </div>
              <span style={{ fontWeight: 800, color: 'white', fontSize: 15 }}>PsihoPrep</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
              {[{ icon: Shield, text: 'Garanție 7 zile', color: '#22c55e' }, { icon: Lock, text: 'Stripe securizat', color: '#94a3b8' }, { icon: CheckCircle, text: 'Acces instant', color: '#3b82f6' }, { icon: Users, text: '500+ candidați', color: '#8b5cf6' }].map(({ icon: Icon, text, color }) => (
                <span key={text} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'rgba(255,255,255,0.38)', fontWeight: 500 }}>
                  <Icon style={{ width: 13, height: 13, color }} />{text}
                </span>
              ))}
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 24, display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.28)' }}>© {new Date().getFullYear()} PsihoPrep. Toate drepturile rezervate.</p>
            <div style={{ display: 'flex', gap: 20 }}>
              {[{ href: '/termeni', label: 'Termeni' }, { href: '/confidentialitate', label: 'Confidențialitate' }, { href: '/contact', label: 'Contact' }].map(({ href, label }) => (
                <Link key={href} href={href} style={{ fontSize: 13, color: 'rgba(255,255,255,0.32)', textDecoration: 'none' }}>{label}</Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
