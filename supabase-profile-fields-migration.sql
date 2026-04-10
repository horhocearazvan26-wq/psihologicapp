-- Add missing profile fields used by the app UI.
-- Run this once in the Supabase SQL editor for existing projects.

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS target_institution TEXT
    CHECK (target_institution IN ('MAI', 'MApN', 'SRI', 'ANP'));

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS exam_date DATE;
