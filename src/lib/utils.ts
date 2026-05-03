import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { Institution, TestCategory } from '@/types'

const LEGACY_CATEGORY_LABELS = {
  attention: 'Atenție & Concentrare',
  logic: 'Raționament Logic',
  memory: 'Memorie',
  numerical: 'Aptitudini Numerice',
  vocabulary: 'Vocabular & Limbaj',
  personality: 'Personalitate',
} as const

const LEGACY_CATEGORY_SHORT_LABELS = {
  attention: 'AT',
  logic: 'LG',
  memory: 'MM',
  numerical: 'NR',
  vocabulary: 'VC',
  personality: 'PS',
} as const

export type LegacyTestCategory = keyof typeof LEGACY_CATEGORY_LABELS

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const INSTITUTION_LABELS: Record<Institution, string> = {
  MAI: 'MAI',
  MApN: 'MApN',
  SRI: 'SRI',
  ANP: 'ANP',
}

export const INSTITUTION_FULL_NAMES: Record<Institution, string> = {
  MAI: 'Ministerul Afacerilor Interne',
  MApN: 'Ministerul Apărării Naționale',
  SRI: 'Serviciul Român de Informații',
  ANP: 'Administrația Națională a Penitenciarelor',
}

export const CATEGORY_LABELS: Record<TestCategory, string> = {
  'rationament-analitic':  'Raționament Analitic',
  'transfer-analogic':     'Transfer Analogic Verbal',
  'vocabular':             'Vocabular',
  'intelegere-texte':      'Înțelegere Texte',
  'rationament-matematic': 'Raționament Matematic',
  'calcul-matematic':      'Calcul Matematic',
  'memorie-lucru':         'Memorie de Lucru',
  'inhibitie-cognitiva':   'Inhibiție Cognitivă',
  'comutare-atentie':      'Comutarea Atenției',
}

export const CATEGORY_SHORT_LABELS: Record<TestCategory, string> = {
  'rationament-analitic':  'RA',
  'transfer-analogic':     'TA',
  'vocabular':             'VC',
  'intelegere-texte':      'IT',
  'rationament-matematic': 'RM',
  'calcul-matematic':      'CM',
  'memorie-lucru':         'ML',
  'inhibitie-cognitiva':   'IC',
  'comutare-atentie':      'CA',
}

export function isKnownCategory(category: string): category is TestCategory {
  return category in CATEGORY_LABELS
}

export function isLegacyCategory(category: string): category is LegacyTestCategory {
  return category in LEGACY_CATEGORY_LABELS
}

export function getCategoryLabel(category: string): string {
  if (isKnownCategory(category)) return CATEGORY_LABELS[category]
  if (isLegacyCategory(category)) return LEGACY_CATEGORY_LABELS[category]
  return category
}

export function getCategoryShortLabel(category: string): string {
  if (isKnownCategory(category)) return CATEGORY_SHORT_LABELS[category]
  if (isLegacyCategory(category)) return LEGACY_CATEGORY_SHORT_LABELS[category]
  return '??'
}

export function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
}

export function normalizeInstitutionParam(value: string): Institution | null {
  const normalized = value.trim().toLowerCase()

  switch (normalized) {
    case 'mai':
      return 'MAI'
    case 'mapn':
      return 'MApN'
    case 'sri':
      return 'SRI'
    case 'anp':
      return 'ANP'
    default:
      return null
  }
}

export function getScoreColor(score: number): string {
  if (score >= 80) return 'text-green-600'
  if (score >= 60) return 'text-yellow-600'
  return 'text-red-600'
}
