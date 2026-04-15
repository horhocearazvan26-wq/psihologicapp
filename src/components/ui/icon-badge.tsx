import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface IconBadgeProps {
  icon: LucideIcon
  className?: string
  iconClassName?: string
}

export function IconBadge({ icon: Icon, className, iconClassName }: IconBadgeProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-2xl border border-white/10 bg-white/6 text-[var(--text-primary)] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-sm',
        className
      )}
    >
      <Icon className={cn('h-5 w-5 text-current opacity-80', iconClassName)} />
    </div>
  )
}
