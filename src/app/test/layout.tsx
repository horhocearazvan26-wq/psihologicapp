import { Brain } from 'lucide-react'
import { TestExitButton } from '@/components/test/exit-button'

export default function TestLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="min-h-screen text-white"
      style={{
        background: [
          'radial-gradient(circle at top left, rgba(37,99,235,0.18), transparent 28%)',
          'radial-gradient(circle at top right, rgba(20,184,166,0.16), transparent 26%)',
          'linear-gradient(180deg, #07111d 0%, #091827 45%, #0c1522 100%)',
        ].join(', '),
      }}
    >
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-[8%] top-24 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute bottom-16 right-[10%] h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* Thin exam header — scrolls away to give screen space */}
        <header className="border-b border-white/8 bg-slate-950/60 backdrop-blur-2xl">
          <div className="mx-auto flex h-12 max-w-6xl items-center justify-between px-4 md:h-14 md:px-8">
            <TestExitButton />
            <div className="flex items-center gap-2">
              <Brain className="h-3.5 w-3.5 text-cyan-400/50" />
              <span className="text-[9px] font-black tracking-[0.35em] uppercase text-white/20">
                PSIHOLOGIC
              </span>
            </div>
            {/* spacer to center logo */}
            <div className="w-16 sm:w-24" />
          </div>
        </header>

        <main className="mx-auto max-w-6xl px-4 py-4 md:px-8 md:py-8">
          {children}
        </main>
      </div>
    </div>
  )
}
