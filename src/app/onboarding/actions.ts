'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function saveInstitution(institution: string, examDate: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const { error } = await supabase.from('profiles').update({
    target_institution: institution,
    exam_date: examDate || null,
  }).eq('id', user.id)

  if (error) {
    return { error: error.message }
  }

  return { success: true }
}

export async function saveOnboardingFree(institution: string, examDate: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const { error } = await supabase.from('profiles').update({
    target_institution: institution,
    exam_date: examDate || null,
  }).eq('id', user.id)

  if (error) {
    return { error: error.message }
  }

  redirect('/dashboard')
}
