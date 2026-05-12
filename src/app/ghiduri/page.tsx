import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  Download,
  FileText,
  Layers3,
  ShieldCheck,
} from 'lucide-react'
import { GuideCheckoutButton } from '@/components/guides/guide-checkout-button'
import { GUIDE_PRODUCTS } from '@/lib/guides'

export const metadata: Metadata = {
  title: 'Ghiduri PDF pentru MAI, MApN, SRI și ANP | PsihoPrep',
  description:
    'Alege ghidul PDF potrivit pentru MAI, MApN, SRI sau ANP. Ghiduri digitale structurate pe instituție, plus bundle complet pentru toate opțiunile.',
  keywords: [
    'ghid test psihologic MAI',
    'ghid test psihologic MApN',
    'ghid test psihologic SRI',
    'ghid test psihologic ANP',
    'ghid pdf admitere politie',
  ],
  alternates: { canonical: '/ghiduri' },
  openGraph: {
    title: 'Ghiduri PDF pentru MAI, MApN, SRI și ANP',
    description: 'Patru ghiduri dedicate pe instituție și un bundle complet pentru pregătirea psihologică.',
    url: '/ghiduri',
    type: 'website',
    images: [{ url: '/images/mai.png', width: 1200, height: 630, alt: 'Ghiduri PDF PsihoPrep' }],
  },
}

function hasStripePrice(productId: string) {
  const priceMap: Record<string, string | undefined> = {
    pdf_mai: process.env.STRIPE_PRICE_PDF_MAI,
    pdf_mapn: process.env.STRIPE_PRICE_PDF_MAPN,
    pdf_sri: process.env.STRIPE_PRICE_PDF_SRI,
    pdf_anp: process.env.STRIPE_PRICE_PDF_ANP,
    pdf_bundle_all: process.env.STRIPE_PRICE_PDF_BUNDLE_ALL,
  }
  return Boolean(priceMap[productId])
}

const productComparison = [
  { label: 'Plan de pregătire clar', values: ['Da', 'Da', 'Da', 'Da', 'Da'] },
  { label: 'Accent pe particularități instituționale', values: ['MAI', 'MApN', 'SRI', 'ANP', 'Toate'] },
  { label: 'Checklist înainte de evaluare', values: ['Inclus', 'Inclus', 'Inclus', 'Inclus', 'Inclus'] },
  { label: 'Acoperire completă multi-instituție', values: ['Nu', 'Nu', 'Nu', 'Nu', 'Da'] },
]

const featureHighlights = [
  {
    icon: Layers3,
    title: '4 ghiduri dedicate',
    text: 'Fiecare instituție are unghi propriu și structura ei.',
    color: '#2563eb',
    bg: 'rgba(37,99,235,0.12)',
    border: 'rgba(37,99,235,0.2)',
  },
  {
    icon: ShieldCheck,
    title: 'Plată unică',
    text: 'Produse digitale fără abonament sau costuri ascunse.',
    color: '#059669',
    bg: 'rgba(5,150,105,0.12)',
    border: 'rgba(5,150,105,0.2)',
  },
  {
    icon: Download,
    title: 'Acces instant',
    text: 'Download imediat după confirmarea plății.',
    color: '#f97316',
    bg: 'rgba(249,115,22,0.12)',
    border: 'rgba(249,115,22,0.2)',
  },
  {
    icon: BadgeCheck,
    title: 'Conținut structurat',
    text: 'Plan 14 zile, checklist și greșeli frecvente.',
    color: '#7c3aed',
    bg: 'rgba(124,58,237,0.12)',
    border: 'rgba(124,58,237,0.2)',
  },
]

export default function GuidesPage() {
  return (
    <main className="min-h-screen bg-[#f2ede5] text-[#14213a]">

      {/* ══════════════════════════════════ HERO ══════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#060d18] text-white">

        {/* Animated depth orbs */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="guide-orb-1 absolute -left-40 -top-40 h-[700px] w-[700px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.22) 0%, transparent 70%)', filter: 'blur(80px)' }} />
          <div className="guide-orb-2 absolute -right-32 -top-10 h-[550px] w-[550px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.18) 0%, transparent 70%)', filter: 'blur(70px)' }} />
          <div className="guide-orb-3 absolute bottom-0 left-1/2 h-[400px] w-[800px] -translate-x-1/2 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.14) 0%, transparent 70%)', filter: 'blur(90px)' }} />
          {/* Fine grid texture */}
          <div className="absolute inset-0"
            style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
          {/* Bottom fade into page */}
          <div className="absolute inset-x-0 bottom-0 h-28"
            style={{ background: 'linear-gradient(to top, #060d18, transparent)' }} />
        </div>

        {/* Back nav */}
        <div className="relative mx-auto max-w-6xl px-6 py-6">
          <Link
            href="/"
            className="animate-fade-in inline-flex items-center gap-2 text-sm font-semibold text-white/50 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Înapoi la landing
          </Link>
        </div>

        {/* Hero grid */}
        <div className="relative mx-auto grid max-w-6xl gap-12 px-6 pb-24 pt-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">

          {/* Left — headline */}
          <div>
            <div className="animate-fade-up mb-5 inline-flex items-center gap-2 rounded-full border px-4 py-2"
              style={{ borderColor: 'rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)' }}>
              <FileText className="h-3 w-3 text-white/60" />
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/65">
                Ghiduri PDF — pregătire psihologică
              </span>
            </div>

            <h1 className="animate-fade-up stagger-1 max-w-2xl font-black leading-[1.04] tracking-tight"
              style={{ fontSize: 'clamp(2.1rem, 5vw, 3.8rem)' }}>
              Alege ghidul potrivit{' '}
              <span style={{
                background: 'linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.55) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                pentru instituția ta.
              </span>
            </h1>

            <p className="animate-fade-up stagger-2 mt-6 max-w-[480px] text-base leading-8 text-white/60">
              Fiecare ghid combină un nucleu comun de pregătire cu recomandări specifice pentru MAI, MApN, SRI sau ANP.
              Bundle-ul include toate patru.
            </p>

            <div className="animate-fade-up stagger-3 mt-9 flex flex-wrap gap-3">
              <a
                href="#catalog"
                className="btn-shimmer inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-extrabold text-[#060d18] transition-transform hover:-translate-y-0.5 active:translate-y-0"
                style={{ background: '#ffffff', boxShadow: '0 8px 28px rgba(0,0,0,0.35)' }}
              >
                Vedere ghidurile
              </a>
              <Link
                href="/ghid/test-psihologic-anp-2026"
                className="btn-shimmer inline-flex items-center gap-2 rounded-xl border px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-white/10"
                style={{ borderColor: 'rgba(255,255,255,0.13)', background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(8px)' }}
              >
                Ghid ANP 2026
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Right — feature grid */}
          <aside
            className="animate-fade-up stagger-4 rounded-[28px] p-6"
            style={{
              border: '1px solid rgba(255,255,255,0.08)',
              background: 'rgba(255,255,255,0.04)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 40px 80px rgba(0,0,0,0.3)',
            }}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              {featureHighlights.map((item) => {
                const Icon = item.icon
                return (
                  <div
                    key={item.title}
                    className="rounded-2xl p-4 transition-colors"
                    style={{ border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.04)' }}
                  >
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-xl"
                      style={{ background: item.bg, border: `1px solid ${item.border}` }}
                    >
                      <Icon className="h-[18px] w-[18px]" style={{ color: item.color }} />
                    </div>
                    <h2 className="mt-3.5 text-sm font-extrabold">{item.title}</h2>
                    <p className="mt-1.5 text-[13px] leading-5 text-white/50">{item.text}</p>
                  </div>
                )
              })}
            </div>
          </aside>
        </div>
      </section>

      {/* ══════════════════════════════════ CATALOG ══════════════════════════════════ */}
      <section id="catalog" className="mx-auto max-w-6xl px-6 py-20">

        <div className="mb-14 flex items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#2563eb]">Catalog complet</p>
            <h2 className="mt-2 font-black tracking-tight text-[#0d1f38]"
              style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)' }}>
              Un ghid pentru fiecare instituție.<br />
              <span className="text-[#5b6c87]">Un bundle pentru toată imaginea.</span>
            </h2>
          </div>
          <p className="hidden shrink-0 text-sm font-semibold text-[#8a9ab4] lg:block">
            {GUIDE_PRODUCTS.length} produse
          </p>
        </div>

        <div className="grid gap-7 lg:grid-cols-2 xl:grid-cols-3">
          {GUIDE_PRODUCTS.map((product, index) => {
            const available = hasStripePrice(product.id)
            const isBundle = product.id === 'pdf_bundle_all'

            return (
              <article
                key={product.id}
                id={product.slug}
                className={`guide-card perf-reveal perf-reveal-up relative overflow-hidden rounded-[28px] ${
                  isBundle
                    ? 'bg-[#0e1520] text-white'
                    : 'bg-white text-[#13243f]'
                }`}
                style={{
                  '--card-glow-color': product.glow,
                  animationDelay: `${index * 0.07}s`,
                  border: isBundle ? '1px solid rgba(245,158,11,0.18)' : '1px solid #e8edf3',
                  boxShadow: isBundle
                    ? '0 20px 60px rgba(0,0,0,0.3)'
                    : '0 16px 50px rgba(15,23,42,0.06)',
                } as React.CSSProperties}
              >
                {/* Animated top accent strip */}
                <div
                  className="absolute inset-x-0 top-0 h-[3px]"
                  style={{
                    background: isBundle
                      ? 'linear-gradient(90deg,#f59e0b,#f97316,#fbbf24,#f59e0b)'
                      : `linear-gradient(90deg,${product.accent},${product.accent}66,${product.accent})`,
                    backgroundSize: '200% 100%',
                    animation: 'borderGlimmer 2.8s linear infinite',
                  }}
                />

                {/* Bundle: pulsing gold ring overlay */}
                {isBundle && (
                  <div
                    className="bundle-ring pointer-events-none absolute inset-0 rounded-[28px]"
                    style={{ zIndex: 1 }}
                  />
                )}

                {/* ── Card body ── */}
                <div className="relative p-7" style={{ zIndex: 2 }}>

                  {/* Floating badge */}
                  {product.badge && (
                    <div
                      className="bundle-badge absolute right-6 top-7 rounded-full px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.15em] text-white"
                      style={{
                        background: 'linear-gradient(135deg,#f59e0b,#f97316)',
                        boxShadow: '0 6px 22px rgba(249,115,22,0.45)',
                      }}
                    >
                      {product.badge}
                    </div>
                  )}

                  {/* Header */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 pr-2">
                      <p className={`text-[10px] font-bold uppercase tracking-[0.18em] ${isBundle ? 'text-[#f8d08d]' : 'text-[#5b6c87]'}`}>
                        {product.audience}
                      </p>
                      <h3 className="mt-2.5 text-[1.35rem] font-black leading-tight tracking-tight">{product.title}</h3>
                    </div>
                    <div
                      className="flex h-[58px] w-[58px] shrink-0 items-center justify-center rounded-[18px]"
                      style={{
                        background: product.glow,
                        border: `1px solid ${product.accent}30`,
                        boxShadow: `0 8px 24px ${product.glow}`,
                      }}
                    >
                      <Image src={product.image} alt={product.shortTitle} width={36} height={36} className="h-9 w-9 object-contain" />
                    </div>
                  </div>

                  {/* Description */}
                  <p className={`mt-4 text-[13px] leading-[1.75] ${isBundle ? 'text-white/60' : 'text-[#55657d]'}`}>
                    {product.description}
                  </p>

                  {/* Meta chips */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {[product.format, product.pages].map((val) => (
                      <span
                        key={val}
                        className="inline-flex items-center rounded-lg px-2.5 py-1 text-[11px] font-bold"
                        style={
                          isBundle
                            ? { border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.65)' }
                            : { border: '1px solid #e2e8f0', background: '#f8fafc', color: '#4a5d75' }
                        }
                      >
                        {val}
                      </span>
                    ))}
                  </div>

                  {/* Modules */}
                  <div className="mt-6 space-y-5">
                    {[
                      { label: 'Nucleu comun', items: product.commonModules },
                      { label: 'Strat specific', items: product.specificModules },
                    ].map(({ label, items }) => (
                      <div key={label}>
                        <p className={`mb-2.5 text-[10px] font-black uppercase tracking-[0.18em] ${isBundle ? 'text-white/38' : 'text-[#8a9ab4]'}`}>
                          {label}
                        </p>
                        <ul className="space-y-2">
                          {items.map((item) => (
                            <li key={item} className="flex items-start gap-2.5 text-[13px] leading-5">
                              <CheckCircle2
                                className="mt-0.5 h-3.5 w-3.5 shrink-0"
                                style={{ color: isBundle ? '#f8d08d' : product.accent }}
                              />
                              <span className={isBundle ? 'text-white/72' : 'text-[#31435d]'}>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  {/* Outcomes */}
                  <div
                    className="mt-6 rounded-2xl p-4"
                    style={
                      isBundle
                        ? { border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.04)' }
                        : { border: '1px solid #e8edf3', background: '#f8fafc' }
                    }
                  >
                    <p className={`mb-2.5 text-[10px] font-black uppercase tracking-[0.16em] ${isBundle ? 'text-white/38' : 'text-[#8a9ab4]'}`}>
                      Ce câștigi
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {product.outcomes.map((o) => (
                        <span
                          key={o}
                          className="rounded-md px-2.5 py-1 text-[11px] font-semibold"
                          style={
                            isBundle
                              ? { background: 'rgba(245,158,11,0.14)', color: '#fcd34d' }
                              : { background: `${product.accent}12`, color: product.accent }
                          }
                        >
                          {o}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <GuideCheckoutButton
                    productId={product.id}
                    label={product.cta}
                    disabled={!available}
                    className="btn-shimmer mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-3.5 text-sm font-extrabold transition-all hover:-translate-y-0.5 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
                    style={{
                      background: isBundle
                        ? 'linear-gradient(135deg,#f59e0b,#f97316)'
                        : `linear-gradient(135deg,${product.accent},${product.accent}cc)`,
                      color: 'white',
                      boxShadow: isBundle
                        ? '0 12px 28px rgba(249,115,22,0.32)'
                        : `0 12px 28px ${product.glow}`,
                    }}
                  />
                </div>
              </article>
            )
          })}
        </div>
      </section>

      {/* ══════════════════════════════════ COMPARISON ══════════════════════════════════ */}
      <section className="px-6 py-20" style={{ background: '#faf6ef', borderTop: '1px solid #e8e0d2', borderBottom: '1px solid #e8e0d2' }}>
        <div className="mx-auto max-w-6xl">
          <div className="mb-10">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#b45309]">Comparație</p>
            <h2 className="mt-2 font-black tracking-tight text-[#11213d]"
              style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2.1rem)' }}>
              Diferența se vede rapid, fără să ghicești.
            </h2>
          </div>

          <div className="overflow-hidden rounded-[24px]"
            style={{ border: '1px solid #e4ddd0', background: 'white', boxShadow: '0 20px 60px rgba(15,23,42,0.05)' }}>
            {/* Header row */}
            <div className="grid text-xs font-extrabold uppercase tracking-[0.14em]"
              style={{ gridTemplateColumns: '1.4fr repeat(5, minmax(0, 1fr))', borderBottom: '1px solid #ede5d8', background: '#f7f1e8' }}>
              <div className="px-5 py-4 text-[#8a9ab4]">Caracteristică</div>
              {GUIDE_PRODUCTS.map((p) => (
                <div key={p.id} className="px-4 py-4 text-center" style={{ color: p.accent }}>
                  {p.shortTitle}
                </div>
              ))}
            </div>

            {productComparison.map((row, ri) => (
              <div
                key={row.label}
                className="grid text-sm"
                style={{
                  gridTemplateColumns: '1.4fr repeat(5, minmax(0, 1fr))',
                  borderBottom: ri < productComparison.length - 1 ? '1px solid #f3ede3' : 'none',
                  background: ri % 2 === 0 ? 'white' : '#fdf9f4',
                }}
              >
                <div className="px-5 py-4 font-semibold text-[#30435d]">{row.label}</div>
                {row.values.map((value, vi) => (
                  <div key={`${row.label}-${vi}`} className="flex items-center justify-center px-4 py-4">
                    <span className="text-center text-[13px] text-[#5b6c87]">{value}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════ FAQ ══════════════════════════════════ */}
      <section className="mx-auto grid max-w-6xl gap-16 px-6 py-20 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#2563eb]">Întrebări</p>
          <h2 className="mt-2 font-black tracking-tight text-[#10203d]"
            style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2.1rem)' }}>
            Ce trebuie să știi înainte să cumperi.
          </h2>
          <p className="mt-4 text-sm leading-7 text-[#5b6c87]">
            Răspunsuri la cele mai frecvente întrebări despre procesul de achiziție și livrare.
          </p>
        </div>

        <div className="space-y-4">
          {[
            {
              q: 'Cum cumpăr un ghid?',
              a: 'Alegi instituția sau bundle-ul, iar butonul deschide direct checkout-ul Stripe. Nu este nevoie să creezi cont înainte.',
            },
            {
              q: 'Cum primesc ghidul după plată?',
              a: 'Pagina de succes recunoaște produsul cumpărat și poate afișa linkurile de download imediat ce le configurezi în env pentru fiecare ghid.',
            },
            {
              q: 'Care este diferența dintre ghidurile individuale și bundle?',
              a: 'Ghidurile individuale merg pe o singură instituție. Bundle-ul include toate cele patru variante și este gândit pentru cei care vor acoperire completă.',
            },
          ].map((item) => (
            <article key={item.q} className="faq-card rounded-[22px] p-6">
              <h3 className="text-base font-black text-[#11213d]">{item.q}</h3>
              <p className="mt-3 text-sm leading-7 text-[#566780]">{item.a}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
