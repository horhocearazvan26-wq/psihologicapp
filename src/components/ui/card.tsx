import { cn } from '@/lib/utils'
import { type HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean
  glass?: boolean
  gradient?: string
}

export function Card({ className, hover, glass, gradient, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'bg-[var(--bg-surface)] rounded-2xl border border-[var(--border)] shadow-sm',
        hover && 'hover:shadow-md hover:-translate-y-0.5 hover:border-[var(--border-strong)] transition-all duration-200 cursor-pointer',
        glass && 'backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border-white/60 dark:border-white/10',
        gradient,
        className
      )}
      {...props}
    />
  )
}

export function CardHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('p-6 pb-0', className)} {...props} />
}

export function CardContent({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('p-6', className)} {...props} />
}

export function CardFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('p-6 pt-0', className)} {...props} />
}
