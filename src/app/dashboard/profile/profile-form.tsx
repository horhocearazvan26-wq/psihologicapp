'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { updateProfile } from './actions'
import type { Institution } from '@/types'
import { CheckCircle, Loader2 } from 'lucide-react'

const institutions: Institution[] = ['MAI', 'MApN', 'SRI', 'ANP']
const INSTITUTION_FULL: Record<Institution, string> = {
  MAI: 'Ministerul Afacerilor Interne',
  MApN: 'Ministerul Apărării Naționale',
  SRI: 'Serviciul Român de Informații',
  ANP: 'Administrația Națională a Penitenciarelor',
}

interface ProfileFormProps {
  initialName: string
  initialInstitution: Institution | null
  initialExamDate: string
}

const inputCls = 'w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg-base)] text-[var(--text-primary)] text-sm placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all hover:border-[var(--border-strong)]'
const labelCls = 'block text-sm font-semibold text-[var(--text-secondary)] mb-1.5'

export function ProfileForm({ initialName, initialInstitution, initialExamDate }: ProfileFormProps) {
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setSaved(false)
    setError('')
    const formData = new FormData(e.currentTarget)
    const result = await updateProfile(formData)
    setLoading(false)
    if (result?.error) {
      setError(result.error)
    } else {
      setSaved(true)
      router.refresh()
      setTimeout(() => setSaved(false), 3000)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className={labelCls}>Nume complet</label>
        <input
          name="full_name"
          defaultValue={initialName}
          placeholder="Prenume Nume"
          className={inputCls}
        />
      </div>

      <div>
        <label className={labelCls}>Instituție țintă</label>
        <select
          name="target_institution"
          defaultValue={initialInstitution ?? ''}
          className={inputCls}
        >
          <option value="">— Nu am ales încă —</option>
          {institutions.map((inst) => (
            <option key={inst} value={inst}>
              {inst} — {INSTITUTION_FULL[inst]}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelCls}>Data examenului</label>
        <input
          name="exam_date"
          type="date"
          defaultValue={initialExamDate}
          className={inputCls}
        />
        <p className="text-xs text-[var(--text-muted)] mt-1.5">Te ajutăm să urmărim câte zile mai ai la dispoziție</p>
      </div>

      {error && (
        <div className="bg-[var(--error-bg)] border border-red-200 dark:border-red-800 rounded-xl px-4 py-3 text-sm text-red-600 dark:text-red-400">
          {error}
        </div>
      )}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[var(--text-primary)] text-[var(--text-inverse)] text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          Salvează modificările
        </button>
        {saved && (
          <div className="flex items-center gap-1.5 text-sm text-green-500 dark:text-green-400 font-semibold">
            <CheckCircle className="w-4 h-4" /> Salvat!
          </div>
        )}
      </div>
    </form>
  )
}
