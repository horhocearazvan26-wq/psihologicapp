import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import {
  generateRationamentAnalitic,
  generateTransferAnalogic,
  generateVocabular,
  generateIntelegereTexte,
  generateRationamentMatematic,
  generateCalculMatematic,
} from '@/lib/questions'

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')
  const reset = searchParams.get('reset') === 'true'

  if (secret !== process.env.SEED_SECRET && process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const institutions = ['MAI', 'MApN', 'SRI', 'ANP']
  const mcqCategories = [
    'rationament-analitic',
    'transfer-analogic',
    'vocabular',
    'intelegere-texte',
    'rationament-matematic',
    'calcul-matematic',
  ]
  let totalInserted = 0
  const errors: string[] = []
  const countsByInstitution: Record<string, number> = {}

  if (reset) {
    const { error } = await supabase
      .from('test_questions')
      .delete()
      .in('category', mcqCategories)

    if (error) {
      return NextResponse.json({ error: `Reset failed: ${error.message}` }, { status: 500 })
    }
  }

  for (const institution of institutions) {
    const allQuestions = [
      ...generateRationamentAnalitic(institution),
      ...generateTransferAnalogic(institution),
      ...generateVocabular(institution),
      ...generateIntelegereTexte(institution),
      ...generateRationamentMatematic(institution),
      ...generateCalculMatematic(institution),
    ]
    countsByInstitution[institution] = allQuestions.length

    for (let i = 0; i < allQuestions.length; i += 50) {
      const batch = allQuestions.slice(i, i + 50)
      const { error } = await supabase.from('test_questions').insert(batch)
      if (error) {
        errors.push(`${institution} batch ${i}: ${error.message}`)
      } else {
        totalInserted += batch.length
      }
    }
  }

  return NextResponse.json({
    success: true,
    reset,
    totalInserted,
    countsByInstitution,
    errors: errors.length > 0 ? errors : undefined,
  })
}

export async function GET() {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { count } = await supabase
    .from('test_questions')
    .select('*', { count: 'exact', head: true })

  return NextResponse.json({ total_questions: count })
}
