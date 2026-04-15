import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, CreditCard, FileText, Shield } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Termeni si conditii | PsihoPrep',
  description:
    'Termenii de utilizare pentru platforma PsihoPrep: acces, plati, continut educational si limitele serviciului.',
  alternates: {
    canonical: '/termeni',
  },
}

const sections = [
  {
    title: '1. Rolul platformei',
    content:
      'PsihoPrep este o platforma educationala pentru pregatire individuala la probe psihologice si aptitudinale. Materialele, testele si simularile au scop de antrenament si nu reprezinta subiecte oficiale de examen.',
  },
  {
    title: '2. Cont si acces',
    content:
      'Pentru a folosi modulele platformei, utilizatorul isi creeaza un cont cu adresa de email. Utilizatorul este responsabil pentru pastrarea confidentialitatii datelor de autentificare si pentru activitatea realizata in contul sau.',
  },
  {
    title: '3. Planuri si plati',
    content:
      'Planurile platite ofera acces la continutul indicat in pagina de preturi. Plata este procesata securizat prin Stripe. PsihoPrep nu stocheaza datele cardului bancar.',
  },
  {
    title: '4. Garanție si retur',
    content:
      'Daca este mentionata o garantie de retur pe site, aceasta se aplica in conditiile afisate la momentul achizitiei. Pentru solicitari, utilizatorul ne poate contacta la adresa din pagina Contact.',
  },
  {
    title: '5. Folosirea corecta a continutului',
    content:
      'Continutul platformei este destinat utilizarii personale. Copierea, redistribuirea, revanzarea sau publicarea materialelor fara acordul PsihoPrep nu este permisa.',
  },
  {
    title: '6. Limitarea raspunderii',
    content:
      'PsihoPrep ajuta la pregatire si autoevaluare, dar nu garanteaza admiterea, promovarea unei probe sau obtinerea unui anumit rezultat. Reusita depinde de mai multi factori, inclusiv pregatirea individuala si conditiile oficiale ale concursului.',
  },
  {
    title: '7. Actualizari',
    content:
      'Putem actualiza acesti termeni cand apar modificari ale platformei, serviciilor sau cerintelor operationale. Versiunea publicata pe aceasta pagina este versiunea aplicabila.',
  },
]

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#f7f8f6] px-6 py-10 text-slate-900">
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900">
          <ArrowLeft className="h-4 w-4" />
          Inapoi la prima pagina
        </Link>

        <header className="mt-10 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 text-white">
            <FileText className="h-6 w-6" />
          </div>
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">PsihoPrep</p>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight">Termeni si conditii</h1>
          <p className="mt-4 text-sm leading-6 text-slate-600">
            Ultima actualizare: 15 aprilie 2026. Acesti termeni descriu regulile de utilizare ale platformei PsihoPrep.
          </p>
        </header>

        <section className="mt-6 grid gap-3 sm:grid-cols-3">
          {[
            { icon: Shield, label: 'Pregatire educationala' },
            { icon: CreditCard, label: 'Plati prin Stripe' },
            { icon: CheckCircle, label: 'Acces instant' },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="rounded-xl border border-slate-200 bg-white p-4 text-sm font-semibold text-slate-700">
              <Icon className="mb-3 h-5 w-5 text-slate-500" />
              {label}
            </div>
          ))}
        </section>

        <article className="mt-8 space-y-5">
          {sections.map((section) => (
            <section key={section.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-extrabold tracking-tight">{section.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">{section.content}</p>
            </section>
          ))}
        </article>
      </div>
    </main>
  )
}
