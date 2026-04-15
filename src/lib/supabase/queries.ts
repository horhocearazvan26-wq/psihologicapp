import { cache } from 'react'
import { createClient } from './server'

/**
 * Cached profile fetch — deduplicates across layout + page in the same render.
 * React cache() ensures this runs at most once per request, even if called
 * from both DashboardLayout and DashboardContent.
 */
export const getProfile = cache(async (userId: string) => {
  const supabase = await createClient()
  const { data } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()
  return data
})
