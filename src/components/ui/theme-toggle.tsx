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
      className={cn(
        'relative w-14 h-7 rounded-full transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
        theme === 'dark' ? 'bg-blue-600' : 'bg-slate-200',
        className
      )}
    >
      {/* Track icons */}
      <Sun className="absolute left-1.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-yellow-500 transition-opacity duration-200"
        style={{ opacity: theme === 'light' ? 1 : 0 }}
      />
      <Moon className="absolute right-1.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-blue-200 transition-opacity duration-200"
        style={{ opacity: theme === 'dark' ? 1 : 0 }}
      />
      {/* Thumb */}
      <span
        className={cn(
          'absolute top-0.5 w-6 h-6 rounded-full bg-white shadow-sm transition-transform duration-300',
          theme === 'dark' ? 'translate-x-7' : 'translate-x-0.5'
        )}
      />
    </button>
  )
}
