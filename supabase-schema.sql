-- ============================================================
-- PSIHOLOGIC APP - Supabase Schema
-- Run this in the Supabase SQL editor
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- PROFILES (extends auth.users)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  subscription_plan TEXT NOT NULL DEFAULT 'free'
    CHECK (subscription_plan IN ('free', 'one_institution', 'all_institutions')),
  subscribed_institution TEXT
    CHECK (subscribed_institution IN ('MAI', 'MApN', 'SRI', 'ANP')),
  stripe_customer_id TEXT UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================
-- TEST QUESTIONS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.test_questions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  institution TEXT NOT NULL CHECK (institution IN ('MAI', 'MApN', 'SRI', 'ANP')),
  category TEXT NOT NULL CHECK (category IN ('attention', 'logic', 'memory', 'numerical', 'vocabulary', 'personality')),
  question_text TEXT NOT NULL,
  options JSONB NOT NULL DEFAULT '[]',
  correct_answer INTEGER NOT NULL,
  explanation TEXT,
  difficulty INTEGER NOT NULL DEFAULT 1 CHECK (difficulty IN (1, 2, 3)),
  metadata JSONB NOT NULL DEFAULT '{}',
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_questions_institution_category ON public.test_questions(institution, category);
CREATE INDEX IF NOT EXISTS idx_questions_active ON public.test_questions(is_active);

-- ============================================================
-- TEST SESSIONS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.test_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  institution TEXT NOT NULL CHECK (institution IN ('MAI', 'MApN', 'SRI', 'ANP')),
  category TEXT NOT NULL CHECK (category IN ('attention', 'logic', 'memory', 'numerical', 'vocabulary', 'personality')),
  is_simulation BOOLEAN NOT NULL DEFAULT FALSE,
  score NUMERIC(5,2),
  total_questions INTEGER NOT NULL DEFAULT 0,
  correct_answers INTEGER,
  time_spent_seconds INTEGER,
  completed BOOLEAN NOT NULL DEFAULT FALSE,
  answers JSONB NOT NULL DEFAULT '[]',
  started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON public.test_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_institution ON public.test_sessions(institution);

-- ============================================================
-- USER PROGRESS (materialized view-style table, updated via triggers)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.user_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  institution TEXT NOT NULL CHECK (institution IN ('MAI', 'MApN', 'SRI', 'ANP')),
  category TEXT NOT NULL CHECK (category IN ('attention', 'logic', 'memory', 'numerical', 'vocabulary', 'personality')),
  tests_taken INTEGER NOT NULL DEFAULT 0,
  average_score NUMERIC(5,2) NOT NULL DEFAULT 0,
  best_score NUMERIC(5,2) NOT NULL DEFAULT 0,
  last_tested_at TIMESTAMPTZ,
  UNIQUE (user_id, institution, category)
);

CREATE INDEX IF NOT EXISTS idx_progress_user_id ON public.user_progress(user_id);

-- Update progress after session completion
CREATE OR REPLACE FUNCTION public.update_user_progress()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.completed = TRUE AND (OLD.completed = FALSE OR OLD.completed IS NULL) THEN
    INSERT INTO public.user_progress (user_id, institution, category, tests_taken, average_score, best_score, last_tested_at)
    VALUES (NEW.user_id, NEW.institution, NEW.category, 1, NEW.score, NEW.score, NOW())
    ON CONFLICT (user_id, institution, category) DO UPDATE SET
      tests_taken = user_progress.tests_taken + 1,
      average_score = (user_progress.average_score * user_progress.tests_taken + NEW.score) / (user_progress.tests_taken + 1),
      best_score = GREATEST(user_progress.best_score, NEW.score),
      last_tested_at = NOW();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_session_completed
  AFTER UPDATE ON public.test_sessions
  FOR EACH ROW EXECUTE FUNCTION public.update_user_progress();

-- ============================================================
-- STRIPE ORDERS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  stripe_session_id TEXT UNIQUE,
  stripe_payment_intent_id TEXT UNIQUE,
  plan TEXT NOT NULL CHECK (plan IN ('one_institution', 'all_institutions')),
  institution TEXT CHECK (institution IN ('MAI', 'MApN', 'SRI', 'ANP')),
  amount_ron INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

-- Profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;

CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Test questions
ALTER TABLE public.test_questions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Authenticated users can read active questions" ON public.test_questions;

CREATE POLICY "Authenticated users can read active questions"
  ON public.test_questions FOR SELECT
  TO authenticated
  USING (is_active = TRUE);

-- Test sessions
ALTER TABLE public.test_sessions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own sessions" ON public.test_sessions;
DROP POLICY IF EXISTS "Users can insert own sessions" ON public.test_sessions;
DROP POLICY IF EXISTS "Users can update own sessions" ON public.test_sessions;

CREATE POLICY "Users can view own sessions"
  ON public.test_sessions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own sessions"
  ON public.test_sessions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own sessions"
  ON public.test_sessions FOR UPDATE
  USING (auth.uid() = user_id);

-- User progress
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own progress" ON public.user_progress;

CREATE POLICY "Users can view own progress"
  ON public.user_progress FOR SELECT
  USING (auth.uid() = user_id);

-- Orders
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own orders" ON public.orders;

CREATE POLICY "Users can view own orders"
  ON public.orders FOR SELECT
  USING (auth.uid() = user_id);
