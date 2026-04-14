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

const navGroups = [
  {
    label: 'Principal',
    items: [
      { href: '/dashboard', label: 'Acasă', icon: LayoutDashboard, exact: true },
      { href: '/dashboard/progress', label: 'Progres', icon: BarChart3 },
      { href: '/dashboard/achievements', label: 'Realizări', icon: Trophy },
    ],
  },
  {
    label: 'Pregătire',
    items: [
      { href: '/dashboard/tests', label: 'Teste', icon: BookOpen },
      { href: '/dashboard/simulate', label: 'Simulare', icon: ClipboardList },
      { href: '/dashboard/flashcards', label: 'Flashcard-uri', icon: Layers },
      { href: '/dashboard/review', label: 'Greșeli', icon: FileText },
      { href: '/dashboard/materiale', label: 'Materiale PDF', icon: FolderOpen },
    ],
  },
]

const bottomItems = [
  { href: '/dashboard/profile', label: 'Profil', icon: User },
  { href: '/dashboard/pricing', label: 'Planuri', icon: CreditCard },
]

const PLAN_CONFIG = {
  free: { label: 'Gratuit', color: 'text-slate-300', dot: 'bg-slate-400' },
  one_institution: { label: '1 Instituție', color: 'text-cyan-200', dot: 'bg-cyan-300' },
  all_institutions: { label: 'Acces Complet', color: 'text-emerald-200', dot: 'bg-emerald-300' },
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
    <aside className="w-72 flex flex-col h-screen bg-[var(--bg-panel)] text-white border-r border-white/8 shrink-0 shadow-[18px_0_40px_-30px_rgba(15,23,42,0.75)]">
      <div className="px-5 py-5 border-b border-white/8">
        <Link href="/dashboard" onClick={onClose} className="flex items-center gap-3 group">
          <div
            className="w-10 h-10 rounded-xl border border-white/10 bg-white/8 flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105"
            style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06), 0 10px 24px -20px rgba(255,255,255,0.3)' }}
          >
            <Brain className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="font-extrabold text-sm tracking-tight block leading-none text-white">
              PsihoPrep
            </span>
            <div className="flex items-center gap-1.5 mt-1">
              <span className={cn('w-1.5 h-1.5 rounded-full', plan.dot)} />
              <span className={cn('text-[10px] font-semibold', plan.color)}>{plan.label}</span>
            </div>
          </div>
        </Link>
      </div>

      <nav className="flex-1 px-3 py-4 overflow-y-auto space-y-5">
        {navGroups.map((group) => (
          <div key={group.label}>
            <p className="px-3 mb-1.5 text-[10px] font-bold tracking-widest uppercase text-white/28">{group.label}</p>
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const active = isActive(item.href, item.exact)
                const Icon = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      'interactive-press interactive-glow flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group relative border',
                      active
                        ? 'border-white/14 bg-white/10 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]'
                        : 'border-transparent text-white/55 hover:bg-white/6 hover:text-white'
                    )}
                  >
                    {active && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-0.5 rounded-r-full bg-cyan-300 shadow-[0_0_10px_rgba(103,232,249,0.6)]" />
                    )}
                    <Icon className={cn('w-4 h-4 shrink-0 transition-colors', active ? 'text-cyan-200' : 'text-white/34 group-hover:text-white/70')} />
                    <span className="flex-1">{item.label}</span>
                    {active && <ChevronRight className="w-3 h-3 text-cyan-200 shrink-0" />}
                  </Link>
                )
              })}
            </div>
          </div>
        ))}

        <div className="border-t border-white/8 pt-4 space-y-0.5">
          {bottomItems.map((item) => {
            const active = isActive(item.href)
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  'interactive-press interactive-glow flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group relative border',
                  active
                    ? 'border-white/14 bg-white/10 text-white'
                    : 'border-transparent text-white/55 hover:bg-white/6 hover:text-white'
                )}
              >
                {active && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-0.5 rounded-r-full bg-cyan-300 shadow-[0_0_10px_rgba(103,232,249,0.6)]" />
                )}
                <Icon className={cn('w-4 h-4 shrink-0', active ? 'text-cyan-200' : 'text-white/34 group-hover:text-white/60')} />
                <span className="flex-1">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </nav>

      {user.subscription_plan === 'free' && (
        <div className="px-3 pb-3">
          <Link href="/dashboard/pricing" onClick={onClose}>
            <div
              className="interactive-press relative overflow-hidden rounded-2xl border border-cyan-400/20 bg-[linear-gradient(145deg,rgba(10,19,31,0.98),rgba(15,44,65,0.94))] p-4 cursor-pointer hover:-translate-y-0.5 transition-all duration-200 btn-shimmer"
              style={{ boxShadow: '0 18px 30px -24px rgba(34,211,238,0.45)' }}
            >
              <div className="absolute -top-6 -right-6 h-20 w-20 rounded-full bg-cyan-400/10 blur-xl" />
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-200/40 to-transparent" />
              <Sparkles className="w-4 h-4 text-cyan-200 mb-2 relative" />
              <p className="text-white font-bold text-xs relative">Deblochează toate simulările</p>
              <p className="text-slate-300 text-xs mt-0.5 leading-snug relative">Acces complet, statistici și tot conținutul premium</p>
              <div className="relative mt-3 rounded-lg border border-white/10 bg-white/8 px-3 py-1.5 text-center transition-colors hover:bg-white/12">
                <span className="text-white text-xs font-semibold">Vezi planurile</span>
              </div>
            </div>
          </Link>
        </div>
      )}

      <div className="px-4 py-3 flex items-center justify-between border-t border-white/8">
        <span className="text-xs text-white/54">Mod întunecat</span>
        <ThemeToggle />
      </div>

      <div className="px-3 pb-4">
        <div className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/4 px-3 py-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-extrabold text-sm shrink-0 shadow-md shadow-indigo-900/40">
            {user.full_name?.[0]?.toUpperCase() ?? user.email[0].toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-white truncate">{user.full_name ?? 'Utilizator'}</p>
            <p className="text-[10px] text-white/48 truncate">{user.email}</p>
          </div>
        </div>
        <form action={signOut}>
          <button
            type="submit"
            className="interactive-press mt-2 w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-white/56 hover:bg-red-500/10 hover:text-red-200 transition-all"
          >
            <LogOut className="w-3.5 h-3.5 shrink-0" />
            Deconectare
          </button>
        </form>
      </div>
    </aside>
  )
}
