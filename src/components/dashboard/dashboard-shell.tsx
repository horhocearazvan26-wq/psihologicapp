'use client'

import { AnimatePresence, motion, LazyMotion, domAnimation } from 'framer-motion'
import { memo, useState } from 'react'
import { Menu, Brain, LogOut } from 'lucide-react'
import { signOut } from '@/app/auth/actions'
import { DashboardMain } from './dashboard-main'
import { Sidebar } from './sidebar'
import type { UserProfile } from '@/types'

interface DashboardShellProps {
  user: UserProfile
  children: React.ReactNode
}

// Memoized so the blobs never re-render when sidebarOpen toggles.
// They have no props and no state — they're pure decoration.
const AtmosphericBlobs = memo(function AtmosphericBlobs() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      <div className="absolute top-0 left-1/3 w-[700px] h-[500px] rounded-full blur-[160px]" style={{ background: 'radial-gradient(ellipse, rgba(59,130,246,0.06) 0%, transparent 70%)' }} />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[400px] rounded-full blur-[140px]" style={{ background: 'radial-gradient(ellipse, rgba(139,92,246,0.04) 0%, transparent 70%)' }} />
      <div className="absolute top-1/2 left-0 w-[300px] h-[300px] rounded-full blur-[120px]" style={{ background: 'radial-gradient(ellipse, rgba(34,211,238,0.025) 0%, transparent 70%)' }} />
    </div>
  )
})

export function DashboardShell({ user, children }: DashboardShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="dark flex h-screen overflow-hidden relative" style={{ background: 'var(--bg-base)' }}>
      <AtmosphericBlobs />

      <LazyMotion features={domAnimation} strict>
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              className="fixed inset-0 z-20 bg-black/70 backdrop-blur-sm md:hidden"
              onClick={() => setSidebarOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.14, ease: 'easeOut' }}
            />
          )}
        </AnimatePresence>

        <motion.div
          animate={sidebarOpen ? { x: 0 } : { x: '-100%' }}
          transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className={[
            'fixed inset-y-0 left-0 z-30 will-change-transform',
            'md:relative md:translate-x-0 md:z-auto',
            'md:!transform-none',
          ].join(' ')}
        >
          <Sidebar user={user} onClose={() => setSidebarOpen(false)} />
        </motion.div>
      </LazyMotion>

      <div className="flex flex-col flex-1 overflow-hidden min-w-0 relative z-10">
        {/* Mobile header */}
        <header className="md:hidden flex items-center gap-3 px-4 py-3 border-b shrink-0" style={{ background: 'var(--bg-panel)', borderColor: 'var(--border)' }}>
          <button
            aria-label="Deschide meniu"
            onClick={() => setSidebarOpen(true)}
            className="interactive-press interactive-glow w-9 h-9 flex items-center justify-center rounded-xl text-white/70 hover:bg-white/8 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-900/50">
              <Brain className="w-4 h-4 text-white" />
            </div>
            <span className="font-extrabold text-sm tracking-tight text-white">PsihoPrep</span>
          </div>
          <form action={signOut} className="ml-auto">
            <button
              type="submit"
              aria-label="Deconectare"
              title="Deconectare"
              className="interactive-press interactive-glow w-9 h-9 flex items-center justify-center rounded-xl text-white/70 hover:bg-red-500/12 hover:text-red-200 transition-colors"
            >
              <LogOut className="h-[18px] w-[18px]" />
            </button>
          </form>
        </header>

        <main className="flex-1 overflow-y-auto relative">
          <div className="relative max-w-6xl mx-auto px-4 py-6 md:px-8 md:py-10">
            <DashboardMain>{children}</DashboardMain>
          </div>
        </main>
      </div>
    </div>
  )
}
