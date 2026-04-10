'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateProfile(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Neautentificat' }

  const full_name = formData.get('full_name') as string
  const target_institution = formData.get('target_institution') as string | null
  const exam_date = formData.get('exam_date') as string | null

  const { error } = await supabase
    .from('profiles')
    .update({
      full_name: full_name || null,
      target_institution: target_institution || null,
      exam_date: exam_date || null,
      updated_at: new Date().toISOString(),
    })
    .eq('id', user.id)

  if (error) {
    const isMissingProfileField =
      error.message.includes('exam_date') ||
      error.message.includes('target_institution')

    if (isMissingProfileField) {
      return {
        error: 'Schema Supabase nu este actualizata inca. Ruleaza migratia pentru campurile profilului si incearca din nou.',
      }
    }

    return { error: error.message }
  }

  revalidatePath('/dashboard')
  revalidatePath('/dashboard/profile')
  return { success: true }
}
