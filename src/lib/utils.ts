import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { Institution, TestCategory } from '@/types'

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
  attention: 'Atenție & Concentrare',
  logic: 'Raționament Logic',
  memory: 'Memorie',
  numerical: 'Aptitudini Numerice',
  vocabulary: 'Vocabular & Limbaj',
  personality: 'Personalitate',
}

export const CATEGORY_SHORT_LABELS: Record<TestCategory, string> = {
  attention: 'AT',
  logic: 'LG',
  memory: 'MM',
  numerical: 'NR',
  vocabulary: 'VC',
  personality: 'PS',
}

export function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
}

export function getScoreColor(score: number): string {
  if (score >= 80) return 'text-green-600'
  if (score >= 60) return 'text-yellow-600'
  return 'text-red-600'
}
