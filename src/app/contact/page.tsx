import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, Mail, MessageCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact | PsihoPrep',
  description:
    'Contact PsihoPrep pentru suport, intrebari despre cont, plati, acces si pregatirea pentru probe psihologice.',
  alternates: {
    canonical: '/contact',
  },
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#f7f8f6] px-6 py-10 text-slate-900">
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900">
          <ArrowLeft className="h-4 w-4" />
          Inapoi la prima pagina
        </Link>

        <header className="mt-10 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 text-white">
            <MessageCircle className="h-6 w-6" />
          </div>
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">PsihoPrep</p>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight">Contact</h1>
          <p className="mt-4 text-sm leading-6 text-slate-600">
            Pentru intrebari despre cont, plata, acces sau pregatire, scrie-ne si revenim cu un raspuns cat mai rapid.
          </p>
        </header>

        <section className="mt-8 grid gap-4 sm:grid-cols-2">
          <a
            href="mailto:contact@psihoprep.ro"
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-transform hover:-translate-y-0.5"
          >
            <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
              <Mail className="h-5 w-5" />
            </div>
            <h2 className="font-extrabold tracking-tight">Email</h2>
            <p className="mt-2 text-sm font-semibold text-blue-700">contact@psihoprep.ro</p>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Include adresa contului si o descriere scurta a situatiei, ca sa te putem ajuta mai repede.
            </p>
          </a>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
              <Clock className="h-5 w-5" />
            </div>
            <h2 className="font-extrabold tracking-tight">Timp de raspuns</h2>
            <p className="mt-2 text-sm font-semibold text-slate-700">De obicei in 24-48h</p>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Solicitarile legate de acces sau plata sunt prioritizate, mai ales in perioadele de admitere.
            </p>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-extrabold tracking-tight">Ce poti trimite</h2>
          <div className="mt-4 grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
            {[
              'Intrebari despre planuri si acces',
              'Probleme la autentificare',
              'Solicitari legate de plata',
              'Feedback despre teste sau simulari',
            ].map((item) => (
              <div key={item} className="rounded-xl bg-slate-50 px-4 py-3 font-semibold text-slate-700">
                {item}
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
