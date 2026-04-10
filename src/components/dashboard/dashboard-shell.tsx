'use client'

import { useState } from 'react'
import { Menu, Brain } from 'lucide-react'
import { Sidebar } from './sidebar'
import type { UserProfile } from '@/types'

interface DashboardShellProps {
  user: UserProfile
  children: React.ReactNode
}

export function DashboardShell({ user, children }: DashboardShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-[var(--bg-base)] overflow-hidden">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-slate-950/70 backdrop-blur-sm md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div
        className={[
          'fixed inset-y-0 left-0 z-30 transition-transform duration-300 ease-in-out',
          'md:relative md:translate-x-0 md:z-auto',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full',
        ].join(' ')}
      >
        <Sidebar user={user} onClose={() => setSidebarOpen(false)} />
      </div>

      <div className="flex flex-col flex-1 overflow-hidden min-w-0">
        <header className="md:hidden flex items-center gap-3 px-4 py-3 bg-[var(--bg-panel)] text-white border-b border-white/8 shrink-0">
          <button
            aria-label="Deschide meniu"
            onClick={() => setSidebarOpen(true)}
            className="w-9 h-9 flex items-center justify-center rounded-xl text-white/80 hover:bg-white/8 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg border border-white/10 bg-white/8 flex items-center justify-center shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
              <Brain className="w-4 h-4 text-white" />
            </div>
            <span className="font-extrabold text-sm tracking-tight text-white">PsihoPrep</span>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto relative">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/55 to-transparent dark:from-slate-900/25" />
          <div className="relative max-w-6xl mx-auto px-4 py-6 md:px-8 md:py-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
