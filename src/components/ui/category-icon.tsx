import type { LucideIcon } from 'lucide-react'
import { Brain, Database, Eye, Hash, Type, UserRound } from 'lucide-react'
import type { TestCategory } from '@/types'
import { IconBadge } from './icon-badge'

export const CATEGORY_ICON_MAP: Record<TestCategory, LucideIcon> = {
  attention: Eye,
  logic: Brain,
  memory: Database,
  numerical: Hash,
  vocabulary: Type,
  personality: UserRound,
}

interface CategoryIconProps {
  category: TestCategory
  className?: string
  iconClassName?: string
}

export function CategoryIcon({ category, className, iconClassName }: CategoryIconProps) {
  return (
    <IconBadge
      icon={CATEGORY_ICON_MAP[category]}
      className={className}
      iconClassName={iconClassName}
    />
  )
}
