import type { LucideIcon } from 'lucide-react'
import { Brain, BookOpen, BookA, FileText, Calculator, Hash, Layers, Zap, Shuffle } from 'lucide-react'
import type { TestCategory } from '@/types'
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
