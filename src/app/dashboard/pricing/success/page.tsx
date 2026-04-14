import Link from 'next/link'
import { CheckCircle, ArrowRight, Sparkles } from 'lucide-react'

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">

        {/* Icon */}
        <div
          className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center mx-auto mb-6 shadow-xl"
          style={{ boxShadow: '0 8px 32px -4px rgba(99,102,241,0.5)' }}
        >
          <CheckCircle className="w-10 h-10 text-white" />
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 badge-gradient text-xs font-semibold px-4 py-1.5 rounded-full mb-5">
          <Sparkles className="w-3.5 h-3.5" /> Plată confirmată
        </div>

        <h1 className="text-3xl font-extrabold text-[var(--text-primary)] tracking-tight mb-3">
          Bine ai venit în<br />
          <span className="gradient-text">PsihoPrep Premium!</span>
        </h1>

        <p className="text-[var(--text-muted)] text-sm mb-8 leading-relaxed">
          Plata a fost procesată cu succes. Accesul tău complet a fost activat — poți începe antrenamentul chiar acum.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/dashboard">
            <div className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-sm font-bold glow-cta btn-shimmer">
              <Sparkles className="w-4 h-4" />
              Mergi la Dashboard
            </div>
          </Link>
          <Link href="/dashboard/tests">
            <div className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-[var(--border-strong)] text-sm font-semibold text-[var(--text-primary)] hover:bg-[var(--bg-muted)] transition-colors">
              Începe un test <ArrowRight className="w-4 h-4" />
            </div>
          </Link>
        </div>

      </div>
    </div>
  )
}
