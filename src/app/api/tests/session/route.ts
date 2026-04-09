import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

// POST /api/tests/session — start a new session
export async function POST(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { institution, category, is_simulation = false } = await request.json()

  const { data: profile } = await supabase
    .from('profiles')
    .select('subscription_plan, subscribed_institution')
    .eq('id', user.id)
    .single()

  // Determine question limit based on subscription
  let limit = 15 // free demo
  if (profile?.subscription_plan === 'all_institutions') {
    limit = 30
  } else if (
    profile?.subscription_plan === 'one_institution' &&
    profile?.subscribed_institution === institution
  ) {
    limit = 30
  }

  if (is_simulation) limit = 50

  // Fetch questions
  const { data: questions, error } = await supabase
    .from('test_questions')
    .select('id, question_text, options, difficulty, category, institution, metadata')
    .eq('institution', institution)
    .eq('category', category)
    .eq('is_active', true)
    .limit(limit * 3) // fetch more, then pick random subset

  if (error || !questions) {
    return NextResponse.json({ error: 'Could not fetch questions' }, { status: 500 })
  }

  // Shuffle and pick limit
  const shuffled = questions.sort(() => Math.random() - 0.5).slice(0, limit)

  // Create session
  const { data: session, error: sessionError } = await supabase
    .from('test_sessions')
    .insert({
      user_id: user.id,
      institution,
      category,
      is_simulation,
      total_questions: shuffled.length,
    })
    .select()
    .single()

  if (sessionError) {
    return NextResponse.json({ error: sessionError.message }, { status: 500 })
  }

  return NextResponse.json({ session, questions: shuffled })
}

// PATCH /api/tests/session — submit answers and complete session
export async function PATCH(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { session_id, answers, time_spent_seconds } = await request.json()
  // answers: [{ question_id, selected_option }]

  // Fetch correct answers
  const questionIds = answers.map((a: { question_id: string }) => a.question_id)
  const { data: questions } = await supabase
    .from('test_questions')
    .select('id, correct_answer, explanation, question_text, options')
    .in('id', questionIds)

  if (!questions) {
    return NextResponse.json({ error: 'Questions not found' }, { status: 404 })
  }

  // Calculate score
  const questionMap = Object.fromEntries(questions.map(q => [q.id, q]))
  const results = answers.map((a: { question_id: string; selected_option: number }) => {
    const q = questionMap[a.question_id]
    const isCorrect = q && a.selected_option === q.correct_answer
    return {
      question_id: a.question_id,
      selected_option: a.selected_option,
      correct_answer: q?.correct_answer,
      is_correct: isCorrect,
      explanation: q?.explanation,
    }
  })

  const correctCount = results.filter((r: { is_correct: boolean }) => r.is_correct).length
  const score = (correctCount / answers.length) * 100

  // Update session
  await supabase
    .from('test_sessions')
    .update({
      completed: true,
      correct_answers: correctCount,
      score: Math.round(score * 100) / 100,
      time_spent_seconds,
      answers: results,
      completed_at: new Date().toISOString(),
    })
    .eq('id', session_id)
    .eq('user_id', user.id)

  return NextResponse.json({ score, correct: correctCount, total: answers.length, results })
}
