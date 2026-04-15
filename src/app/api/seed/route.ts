import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import { generateLogicQuestions } from '@/lib/questions/logic'
import { generateNumericalQuestions } from '@/lib/questions/numerical'
import { generateVocabularyQuestions } from '@/lib/questions/vocabulary'
import { generateMemoryQuestions } from '@/lib/questions/memory'
import { generatePersonalityQuestions } from '@/lib/questions/personality'
import { generateRavenQuestions } from '@/lib/questions/raven'

// Only allow in development or with secret key
export async function POST(request: Request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')

  if (secret !== process.env.SEED_SECRET && process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const institutions = ['MAI', 'MApN', 'SRI', 'ANP']
  let totalInserted = 0
  const errors: string[] = []

  for (const institution of institutions) {
    const allQuestions = [
      ...generateLogicQuestions(institution),
      ...generateNumericalQuestions(institution),
      ...generateVocabularyQuestions(institution),
      ...generateMemoryQuestions(institution),
      ...generatePersonalityQuestions(institution),
      ...generateRavenQuestions(institution),
    ]

    // Insert in batches of 50
    for (let i = 0; i < allQuestions.length; i += 50) {
      const batch = allQuestions.slice(i, i + 50)
      const { error } = await supabase
        .from('test_questions')
        .insert(batch)

      if (error) {
        errors.push(`${institution} batch ${i}: ${error.message}`)
      } else {
        totalInserted += batch.length
      }
    }
  }

  return NextResponse.json({
    success: true,
    totalInserted,
    errors: errors.length > 0 ? errors : undefined,
  })
}

export async function GET() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { count } = await supabase
    .from('test_questions')
    .select('*', { count: 'exact', head: true })

  return NextResponse.json({ total_questions: count })
}
