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
    <div className="dark flex h-screen overflow-hidden relative" style={{ background: 'var(--bg-base)' }}>
      {/* Atmospheric background blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 left-1/3 w-[700px] h-[500px] rounded-full blur-[160px]" style={{ background: 'radial-gradient(ellipse, rgba(59,130,246,0.06) 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[400px] rounded-full blur-[140px]" style={{ background: 'radial-gradient(ellipse, rgba(139,92,246,0.04) 0%, transparent 70%)' }} />
        <div className="absolute top-1/2 left-0 w-[300px] h-[300px] rounded-full blur-[120px]" style={{ background: 'radial-gradient(ellipse, rgba(34,211,238,0.025) 0%, transparent 70%)' }} />
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/70 backdrop-blur-sm md:hidden"
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

      <div className="flex flex-col flex-1 overflow-hidden min-w-0 relative z-10">
        {/* Mobile header */}
        <header className="md:hidden flex items-center gap-3 px-4 py-3 border-b shrink-0" style={{ background: 'var(--bg-panel)', borderColor: 'var(--border)' }}>
          <button
            aria-label="Deschide meniu"
            onClick={() => setSidebarOpen(true)}
            className="w-9 h-9 flex items-center justify-center rounded-xl text-white/70 hover:bg-white/8 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-900/50">
              <Brain className="w-4 h-4 text-white" />
            </div>
            <span className="font-extrabold text-sm tracking-tight text-white">PsihoPrep</span>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto relative">
          <div className="relative max-w-6xl mx-auto px-4 py-6 md:px-8 md:py-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
