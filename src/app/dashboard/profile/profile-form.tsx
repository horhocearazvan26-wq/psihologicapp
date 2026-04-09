'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { updateProfile } from './actions'
import type { Institution } from '@/types'
import { CheckCircle } from 'lucide-react'

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
      <Input
        label="Nume complet"
        name="full_name"
        defaultValue={initialName}
        placeholder="Prenume Nume"
      />

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1.5">
          Instituție țintă
        </label>
        <select
          name="target_institution"
          defaultValue={initialInstitution ?? ''}
          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-slate-300"
        >
          <option value="">— Nu am ales încă —</option>
          {institutions.map((inst) => (
            <option key={inst} value={inst}>
              {inst} — {INSTITUTION_FULL[inst]}
            </option>
          ))}
        </select>
      </div>

      <Input
        label="Data examenului"
        name="exam_date"
        type="date"
        defaultValue={initialExamDate}
        hint="Te ajutăm să urmărim câte zile mai ai la dispoziție"
      />

      {error && (
        <div className="bg-red-50 border border-red-100 rounded-xl px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="flex items-center gap-3">
        <Button type="submit" loading={loading} className="flex-1">
          Salvează modificările
        </Button>
        {saved && (
          <div className="flex items-center gap-1.5 text-sm text-green-600 font-medium">
            <CheckCircle className="w-4 h-4" /> Salvat!
          </div>
        )}
      </div>
    </form>
  )
}
