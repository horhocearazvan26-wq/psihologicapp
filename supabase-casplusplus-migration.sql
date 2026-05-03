-- ============================================================
-- CAS++ migration for PSIHOLOGICapp
-- Run this in the Supabase SQL editor before reseeding questions.
-- ============================================================

BEGIN;

-- Remove legacy progress rows that were tied to the previous taxonomy.
DELETE FROM public.user_progress
WHERE category IN ('attention', 'logic', 'memory', 'numerical', 'vocabulary', 'personality');

DELETE FROM public.test_sessions
WHERE category IN ('logic', 'memory', 'numerical', 'vocabulary', 'personality');

-- Keep "attention" in sessions/progress because the Toulouse-Pieron flow
-- still uses it directly, but clear any old MCQ banks before inserting CAS++.
DELETE FROM public.test_questions
WHERE category IN (
  'attention',
  'logic',
  'memory',
  'numerical',
  'vocabulary',
  'personality',
  'rationament-analitic',
  'transfer-analogic',
  'vocabular',
  'intelegere-texte',
  'rationament-matematic',
  'calcul-matematic'
);

ALTER TABLE public.test_questions
  DROP CONSTRAINT IF EXISTS test_questions_category_check;

ALTER TABLE public.test_questions
  ADD CONSTRAINT test_questions_category_check
  CHECK (
    category IN (
      'attention',
      'logic',
      'memory',
      'numerical',
      'vocabulary',
      'personality',
      'rationament-analitic',
      'transfer-analogic',
      'vocabular',
      'intelegere-texte',
      'rationament-matematic',
      'calcul-matematic'
    )
  );

ALTER TABLE public.test_sessions
  DROP CONSTRAINT IF EXISTS test_sessions_category_check;

ALTER TABLE public.test_sessions
  ADD CONSTRAINT test_sessions_category_check
  CHECK (
    category IN (
      'attention',
      'logic',
      'memory',
      'numerical',
      'vocabulary',
      'personality',
      'rationament-analitic',
      'transfer-analogic',
      'vocabular',
      'intelegere-texte',
      'rationament-matematic',
      'calcul-matematic',
      'memorie-lucru',
      'inhibitie-cognitiva',
      'comutare-atentie'
    )
  );

ALTER TABLE public.user_progress
  DROP CONSTRAINT IF EXISTS user_progress_category_check;

ALTER TABLE public.user_progress
  ADD CONSTRAINT user_progress_category_check
  CHECK (
    category IN (
      'attention',
      'logic',
      'memory',
      'numerical',
      'vocabulary',
      'personality',
      'rationament-analitic',
      'transfer-analogic',
      'vocabular',
      'intelegere-texte',
      'rationament-matematic',
      'calcul-matematic',
      'memorie-lucru',
      'inhibitie-cognitiva',
      'comutare-atentie'
    )
  );

COMMIT;
