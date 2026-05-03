import type { LucideIcon } from 'lucide-react'
import { Brain, BookOpen, BookA, FileText, Calculator, Hash, Layers, Zap, Shuffle } from 'lucide-react'
import type { TestCategory } from '@/types'
import type { LegacyTestCategory } from '@/lib/utils'
import { IconBadge } from './icon-badge'

export const CATEGORY_ICON_MAP: Record<TestCategory, LucideIcon> = {
  'rationament-analitic':  Brain,
  'transfer-analogic':     Shuffle,
  'vocabular':             BookA,
  'intelegere-texte':      FileText,
  'rationament-matematic': Hash,
  'calcul-matematic':      Calculator,
  'memorie-lucru':         Layers,
  'inhibitie-cognitiva':   Zap,
  'comutare-atentie':      BookOpen,
}

const LEGACY_CATEGORY_ICON_MAP: Record<LegacyTestCategory, LucideIcon> = {
  attention: Zap,
  logic: Brain,
  memory: Layers,
  numerical: Calculator,
  vocabulary: BookA,
  personality: Shuffle,
}

interface CategoryIconProps {
  category: string
  className?: string
  iconClassName?: string
}

export function CategoryIcon({ category, className, iconClassName }: CategoryIconProps) {
  const Icon =
    CATEGORY_ICON_MAP[category as TestCategory] ??
    LEGACY_CATEGORY_ICON_MAP[category as LegacyTestCategory] ??
    BookOpen

  return (
    <IconBadge
      icon={Icon}
      className={className}
      iconClassName={iconClassName}
    />
  )
}
