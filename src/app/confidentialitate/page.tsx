import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, BarChart3, Cookie, Database, Lock, Shield } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Politica de confidentialitate | PsihoPrep',
  description:
    'Cum colecteaza si foloseste PsihoPrep datele pentru conturi, progres, plati, securitate si analiza performantei platformei.',
  alternates: {
    canonical: '/confidentialitate',
  },
}

const dataItems = [
  {
    icon: Database,
    title: 'Date de cont',
    text: 'Adresa de email, numele introdus in profil, institutia tinta si informatiile necesare autentificarii prin Supabase.',
  },
  {
    icon: BarChart3,
    title: 'Date de progres',
    text: 'Rezultate la teste, scoruri, sesiuni completate, categorii lucrate si statistici necesare pentru dashboard.',
  },
  {
    icon: Lock,
    title: 'Date de plata',
    text: 'Platile sunt procesate prin Stripe. PsihoPrep primeste informatii despre statusul platii si planul ales, dar nu stocheaza datele cardului.',
  },
  {
    icon: Cookie,
    title: 'Cookie-uri si preferinte',
    text: 'Folosim cookie-uri pentru autentificare si localStorage pentru preferinte precum institutia selectata sau tema interfetei.',
  },
]

const sections = [
  {
    title: 'Cum folosim datele',
    content:
      'Folosim datele pentru autentificare, oferirea accesului la continut, salvarea progresului, procesarea platilor, imbunatatirea experientei si securizarea platformei.',
  },
  {
    title: 'Servicii folosite',
    content:
      'Platforma foloseste Supabase pentru autentificare si baza de date, Stripe pentru plati, Vercel pentru hosting, analytics si masuratori de performanta.',
  },
  {
    title: 'Partajarea datelor',
    content:
      'Nu vindem datele utilizatorilor. Datele pot fi transmise furnizorilor tehnici necesari functionarii platformei sau autoritatilor, daca exista o obligatie legala.',
  },
  {
    title: 'Pastrarea datelor',
    content:
      'Pastram datele atat timp cat contul este activ sau cat este necesar pentru functionarea serviciului, obligatii fiscale, securitate si solutionarea solicitarilor.',
  },
  {
    title: 'Drepturile tale',
    content:
      'Ne poti contacta pentru acces, corectare sau stergerea datelor personale, in limitele permise de obligatiile operationale si legale aplicabile.',
  },
  {
    title: 'Contact pentru confidentialitate',
    content:
      'Pentru intrebari despre datele tale, foloseste adresa din pagina Contact si mentioneaza subiectul solicitarii.',
  },
]

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#f7f8f6] px-6 py-10 text-slate-900">
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900">
          <ArrowLeft className="h-4 w-4" />
          Inapoi la prima pagina
        </Link>

        <header className="mt-10 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 text-white">
            <Shield className="h-6 w-6" />
          </div>
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">PsihoPrep</p>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight">Politica de confidentialitate</h1>
          <p className="mt-4 text-sm leading-6 text-slate-600">
            Ultima actualizare: 15 aprilie 2026. Aceasta pagina explica pe scurt ce date folosim si de ce.
          </p>
        </header>

        <section className="mt-8 grid gap-4 sm:grid-cols-2">
          {dataItems.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                <Icon className="h-5 w-5" />
              </div>
              <h2 className="font-extrabold tracking-tight">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
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
