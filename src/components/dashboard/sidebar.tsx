'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { signOut } from '@/app/auth/actions'
import type { UserProfile } from '@/types'
import {
  LayoutDashboard, BookOpen, ClipboardList, BarChart3,
  CreditCard, User, Trophy, Layers, FileText, LogOut,
  ChevronRight, FolderOpen, Sparkles, Brain,
} from 'lucide-react'
import { ThemeToggle } from '@/components/ui/theme-toggle'

const navItems = [
  { href: '/dashboard',              label: 'Acasă',           icon: LayoutDashboard, exact: true },
  { href: '/dashboard/tests',        label: 'Teste',           icon: BookOpen },
  { href: '/dashboard/simulate',     label: 'Simulare',        icon: ClipboardList },
  { href: '/dashboard/flashcards',   label: 'Flashcard-uri',   icon: Layers },
  { href: '/dashboard/review',       label: 'Greșeli',         icon: FileText },
  { href: '/dashboard/materiale',    label: 'Materiale PDF',   icon: FolderOpen },
  { href: '/dashboard/progress',     label: 'Progres',         icon: BarChart3 },
  { href: '/dashboard/achievements', label: 'Realizări',       icon: Trophy },
]

const bottomItems = [
  { href: '/dashboard/profile', label: 'Profil', icon: User },
  { href: '/dashboard/pricing', label: 'Planuri', icon: CreditCard },
]

const PLAN_CONFIG = {
  free:             { label: 'Gratuit',         color: 'text-slate-400 dark:text-slate-500',   dot: 'bg-slate-300 dark:bg-slate-600' },
  one_institution:  { label: '1 Instituție',    color: 'text-blue-500',                        dot: 'bg-blue-400' },
  all_institutions: { label: 'Acces Complet',   color: 'text-violet-500',                      dot: 'bg-violet-400' },
}

interface SidebarProps {
  user: UserProfile
  onClose?: () => void
}

export function Sidebar({ user, onClose }: SidebarProps) {
  const pathname = usePathname()

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname === href || pathname.startsWith(href + '/')

  const plan = PLAN_CONFIG[user.subscription_plan as keyof typeof PLAN_CONFIG] ?? PLAN_CONFIG.free

  return (
    <aside className="w-64 flex flex-col h-screen bg-[var(--bg-surface)] border-r border-[var(--border)] shrink-0">

      {/* ── Logo ── */}
      <div className="px-5 py-5 border-b border-[var(--border)]">
        <Link href="/dashboard" onClick={onClose} className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105"
            style={{ boxShadow: '0 4px 12px -2px rgba(99,102,241,0.4)' }}
          >
            <Brain className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="font-extrabold text-[var(--text-primary)] text-sm tracking-tight block leading-none">
              PsihoPrep
            </span>
            <div className="flex items-center gap-1.5 mt-1">
              <span className={cn('w-1.5 h-1.5 rounded-full', plan.dot)} />
              <span className={cn('text-[10px] font-semibold', plan.color)}>{plan.label}</span>
            </div>
          </div>
        </Link>
      </div>

      {/* ── Nav ── */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const active = isActive(item.href, item.exact)
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group relative',
                active
                  ? 'bg-gradient-to-r from-indigo-50 to-violet-50/50 dark:from-indigo-950/70 dark:to-violet-950/40 text-indigo-700 dark:text-indigo-300'
                  : 'text-[var(--text-secondary)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-primary)]'
              )}
              style={active ? { boxShadow: 'inset 0 0 0 1px rgba(99,102,241,0.12)' } : undefined}
            >
              {active && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-gradient-to-b from-indigo-400 to-violet-500 rounded-r-full" style={{ boxShadow: '0 0 6px rgba(99,102,241,0.6)' }} />
              )}
              <Icon className={cn(
                'w-4 h-4 shrink-0 transition-colors',
                active ? 'text-indigo-500 dark:text-indigo-400' : 'text-[var(--text-muted)] group-hover:text-[var(--text-secondary)]'
              )} />
              <span className="flex-1">{item.label}</span>
              {active && <ChevronRight className="w-3 h-3 text-indigo-400 shrink-0" />}
            </Link>
          )
        })}

        <div className="pt-4 mt-4 border-t border-[var(--border)] space-y-0.5">
          {bottomItems.map((item) => {
            const active = isActive(item.href)
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group relative',
                  active
                    ? 'bg-gradient-to-r from-indigo-50 to-violet-50/50 dark:from-indigo-950/70 dark:to-violet-950/40 text-indigo-700 dark:text-indigo-300'
                    : 'text-[var(--text-secondary)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-primary)]'
                )}
                style={active ? { boxShadow: 'inset 0 0 0 1px rgba(99,102,241,0.12)' } : undefined}
              >
                {active && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-gradient-to-b from-indigo-400 to-violet-500 rounded-r-full" style={{ boxShadow: '0 0 6px rgba(99,102,241,0.6)' }} />
                )}
                <Icon className={cn('w-4 h-4 shrink-0', active ? 'text-indigo-500 dark:text-indigo-400' : 'text-[var(--text-muted)]')} />
                <span className="flex-1">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </nav>

      {/* ── Upgrade banner (free users) ── */}
      {user.subscription_plan === 'free' && (
        <div className="px-3 pb-3">
          <Link href="/dashboard/pricing" onClick={onClose}>
            <div
              className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-700 rounded-2xl p-4 cursor-pointer hover:-translate-y-0.5 transition-all duration-200 btn-shimmer"
              style={{ boxShadow: '0 8px 24px -4px rgba(99,102,241,0.5)' }}
            >
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/10 rounded-full blur-lg" />
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              <Sparkles className="w-4 h-4 text-yellow-300 mb-2 relative" />
              <p className="text-white font-bold text-xs relative">Deblochează tot</p>
              <p className="text-indigo-200 text-xs mt-0.5 leading-snug relative">De la 69 lei — acces complet</p>
              <div className="relative mt-3 bg-white/20 hover:bg-white/30 transition-colors rounded-lg px-3 py-1.5 text-center border border-white/10">
                <span className="text-white text-xs font-semibold">Upgrade acum →</span>
              </div>
            </div>
          </Link>
        </div>
      )}

      {/* ── Theme + user ── */}
      <div className="px-4 py-3 flex items-center justify-between border-t border-[var(--border)]">
        <span className="text-xs text-[var(--text-muted)]">Mod întunecat</span>
        <ThemeToggle />
      </div>

      <div className="px-3 pb-4">
        <div className="flex items-center gap-3 px-2 py-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
            {user.full_name?.[0]?.toUpperCase() ?? user.email[0].toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-[var(--text-primary)] truncate">{user.full_name ?? 'Utilizator'}</p>
            <p className="text-[10px] text-[var(--text-muted)] truncate">{user.email}</p>
          </div>
        </div>
        <form action={signOut}>
          <button
            type="submit"
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-[var(--text-muted)] hover:bg-red-50 dark:hover:bg-red-950/40 hover:text-red-500 transition-all"
          >
            <LogOut className="w-3.5 h-3.5 shrink-0" />
            Deconectare
          </button>
        </form>
      </div>
    </aside>
  )
}
