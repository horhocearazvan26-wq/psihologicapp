export type Institution = 'MAI' | 'MApN' | 'SRI' | 'ANP'

export type TestCategory =
  | 'attention'
  | 'logic'
  | 'memory'
  | 'numerical'
  | 'vocabulary'
  | 'personality'

export type SubscriptionPlan = 'free' | 'one_institution' | 'all_institutions'

export interface UserProfile {
  id: string
  email: string
  full_name: string | null
  avatar_url: string | null
  subscription_plan: SubscriptionPlan
  subscribed_institution: Institution | null
  target_institution: Institution | null
  exam_date: string | null
  created_at: string
}

export interface TestSession {
  id: string
  user_id: string
  institution: Institution
  category: TestCategory
  is_simulation: boolean
  score: number | null
  total_questions: number
  correct_answers: number | null
  time_spent_seconds: number | null
  completed: boolean
  started_at: string
  completed_at: string | null
}

export interface TestQuestion {
  id: string
  institution: Institution
  category: TestCategory
  question_text: string
  options: string[]
  correct_answer: number
  explanation: string | null
  difficulty: 1 | 2 | 3
  metadata: Record<string, unknown>
  is_active: boolean
}

export interface UserProgress {
  institution: Institution
  category: TestCategory
  tests_taken: number
  average_score: number
  best_score: number
  last_tested_at: string | null
}
