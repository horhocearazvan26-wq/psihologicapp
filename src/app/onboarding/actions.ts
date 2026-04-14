'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function saveOnboarding(institution: string, examDate: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  await supabase.from('profiles').update({
    target_institution: institution,
    exam_date: examDate || null,
  }).eq('id', user.id)

  redirect('/dashboard')
}
