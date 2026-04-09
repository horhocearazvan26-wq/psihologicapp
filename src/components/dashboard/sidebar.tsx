'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { signOut } from '@/app/auth/actions'
import type { UserProfile } from '@/types'
import {
  LayoutDashboard,
  BookOpen,
  ClipboardList,
  BarChart3,
  CreditCard,
  User,
  Trophy,
  Layers,
  FileText,
  LogOut,
  Zap,
  ChevronRight,
} from 'lucide-react'
import { ThemeToggle } from '@/components/ui/theme-toggle'

const navItems = [
  { href: '/dashboard', label: 'Acasă', icon: LayoutDashboard, exact: true },
  { href: '/dashboard/tests', label: 'Teste', icon: BookOpen },
  { href: '/dashboard/simulate', label: 'Simulare Examen', icon: ClipboardList },
  { href: '/dashboard/flashcards', label: 'Flashcard-uri', icon: Layers },
  { href: '/dashboard/review', label: 'Review Greșeli', icon: FileText },
  { href: '/dashboard/progress', label: 'Progres', icon: BarChart3 },
  { href: '/dashboard/achievements', label: 'Realizări', icon: Trophy },
]

const bottomItems = [
  { href: '/dashboard/profile', label: 'Profil', icon: User },
  { href: '/dashboard/pricing', label: 'Planuri', icon: CreditCard },
]

interface SidebarProps {
  user: UserProfile
  onClose?: () => void
}

export function Sidebar({ user, onClose }: SidebarProps) {
  const pathname = usePathname()

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === href
    return pathname === href || pathname.startsWith(href + '/')
  }

  const planLabel = user.subscription_plan === 'free'
    ? 'Gratuit'
    : user.subscription_plan === 'one_institution'
    ? '1 Instituție'
    : 'Toate instituțiile'

  const planColor = user.subscription_plan === 'free'
    ? 'text-slate-500 dark:text-slate-400'
    : user.subscription_plan === 'one_institution'
    ? 'text-blue-600'
    : 'text-purple-600'

  return (
    <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800 flex flex-col h-screen sticky top-0 shrink-0">
      {/* Logo */}
      <div className="p-5 border-b border-slate-100 dark:border-slate-800">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center shadow-sm shadow-blue-200">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="font-bold text-slate-900 dark:text-slate-100 text-sm leading-none block">PsihologicApp</span>
            <span className={cn('text-xs font-medium leading-none mt-0.5 block', planColor)}>{planLabel}</span>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const active = isActive(item.href, item.exact)
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group',
                active
                  ? 'bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-400'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100'
              )}
            >
              <Icon className={cn('w-4 h-4 shrink-0', active ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300')} />
              <span className="flex-1">{item.label}</span>
              {active && <ChevronRight className="w-3 h-3 text-blue-400" />}
            </Link>
          )
        })}

        <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800 space-y-0.5">
          {bottomItems.map((item) => {
            const active = isActive(item.href)
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group',
                  active
                    ? 'bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-400'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100'
                )}
              >
                <Icon className={cn('w-4 h-4 shrink-0', active ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300')} />
                <span className="flex-1">{item.label}</span>
                {active && <ChevronRight className="w-3 h-3 text-blue-400" />}
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Upgrade CTA for free users */}
      {user.subscription_plan === 'free' && (
        <div className="px-3 pb-3">
          <Link href="/dashboard/pricing">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl p-3.5 cursor-pointer hover:opacity-90 transition-opacity">
              <p className="text-white font-semibold text-xs mb-1">Deblochează tot</p>
              <p className="text-blue-100 text-xs">De la 69 lei — acces complet</p>
              <div className="mt-2.5 bg-white/20 hover:bg-white/30 transition-colors rounded-lg px-3 py-1.5 text-center">
                <span className="text-white text-xs font-semibold">Upgrade acum →</span>
              </div>
            </div>
          </Link>
        </div>
      )}

      {/* Dark mode toggle */}
      <div className="px-4 pb-3 flex items-center justify-between">
        <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Mod întunecat</span>
        <ThemeToggle />
      </div>

      {/* User + Sign out */}
      <div className="p-3 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-3 px-2 py-2 mb-1">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-sm">
            {user.full_name?.[0]?.toUpperCase() ?? user.email[0].toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">{user.full_name ?? 'Utilizator'}</p>
            <p className="text-xs text-slate-400 dark:text-slate-500 truncate">{user.email}</p>
          </div>
        </div>
        <form action={signOut}>
          <button
            type="submit"
            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-slate-500 dark:text-slate-400 hover:bg-red-50 dark:hover:bg-red-950 hover:text-red-600 transition-all duration-150"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            Deconectare
          </button>
        </form>
      </div>
    </aside>
  )
}
