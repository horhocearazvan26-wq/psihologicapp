'use client'

import { useTheme } from '@/components/theme-provider'
import { Sun, Moon } from 'lucide-react'
import { cn } from '@/lib/utils'

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggle } = useTheme()

  return (
    <button
      onClick={toggle}
      aria-label="Schimbă tema"
      aria-pressed={theme === 'dark'}
      className={cn(
        'relative h-7 w-14 overflow-hidden rounded-full border transition-[background-color,border-color,box-shadow] duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
        theme === 'dark'
          ? 'border-blue-400/40 bg-gradient-to-r from-slate-800 via-blue-700 to-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.35)]'
          : 'border-slate-300 bg-gradient-to-r from-slate-100 to-slate-300 shadow-inner',
        className
      )}
    >
      {/* Track icons */}
      <Sun
        className={cn(
          'absolute left-1.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-yellow-500 transition-all duration-300 ease-out',
          theme === 'light' ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
        )}
      />
      <Moon
        className={cn(
          'absolute right-1.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 transition-all duration-300 ease-out',
          theme === 'dark'
            ? 'scale-100 opacity-100 text-blue-100'
            : 'scale-75 opacity-0 text-blue-200'
        )}
      />
      <span
        className={cn(
          'pointer-events-none absolute inset-y-0 left-0 w-1/2 rounded-full bg-white/20 blur-md transition-transform duration-500 ease-out',
          theme === 'dark' ? 'translate-x-7' : 'translate-x-0'
        )}
      />
      {/* Thumb */}
      <span
        className={cn(
          'absolute left-0.5 top-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-[0_3px_10px_rgba(15,23,42,0.22)] transition-transform duration-300 ease-[cubic-bezier(.22,1,.36,1)]',
          theme === 'dark' ? 'translate-x-7' : 'translate-x-0'
        )}
      />
    </button>
  )
}
