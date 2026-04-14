import { cn } from '@/lib/utils'
import { type ButtonHTMLAttributes, forwardRef } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success'
  size?: 'sm' | 'md' | 'lg' | 'icon'
  loading?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          'interactive-press interactive-glow inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-150 cursor-pointer select-none',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500',
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
          'active:scale-[0.985]',

          variant === 'primary' && 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm shadow-blue-200/60',
          variant === 'secondary' && 'bg-white text-slate-800 border border-slate-200 hover:bg-slate-50 shadow-sm',
          variant === 'outline' && 'bg-transparent text-blue-600 border border-blue-200 hover:bg-blue-50',
          variant === 'ghost' && 'bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900',
          variant === 'danger' && 'bg-red-600 text-white hover:bg-red-700 shadow-sm',
          variant === 'success' && 'bg-green-600 text-white hover:bg-green-700 shadow-sm',

          size === 'sm' && 'h-8 px-3 text-xs rounded-lg',
          size === 'md' && 'h-10 px-4 text-sm',
          size === 'lg' && 'h-12 px-6 text-base rounded-2xl',
          size === 'icon' && 'h-9 w-9 p-0',

          className
        )}
        {...props}
      >
        {loading ? (
          <>
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <span>Se încarcă...</span>
          </>
        ) : children}
      </button>
    )
  }
)

Button.displayName = 'Button'
export { Button }
