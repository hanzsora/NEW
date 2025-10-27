/*
  # Mental Health Screening App Database Schema

  ## Overview
  This migration creates the complete database structure for a mental health screening application
  that supports multiple validated clinical assessment tools with secure, anonymized data storage.

  ## 1. New Tables

  ### `profiles`
  User profile information (minimal, privacy-focused)
  - `id` (uuid, primary key) - Links to auth.users
  - `display_name` (text, optional) - User's chosen display name
  - `language_preference` (text) - 'en' or 'ms' for UI language
  - `theme_preference` (text) - 'light' or 'dark' mode
  - `consent_given` (boolean) - Whether user accepted consent terms
  - `consent_date` (timestamptz) - When consent was given
  - `created_at` (timestamptz) - Account creation timestamp

  ### `assessments`
  Records of completed mental health assessments
  - `id` (uuid, primary key) - Unique assessment ID
  - `user_id` (uuid, foreign key) - References profiles(id)
  - `assessment_type` (text) - Type: 'PHQ9', 'GAD7', 'DASS21', 'WHO5', 'K10'
  - `responses` (jsonb) - Array of question responses
  - `total_score` (integer) - Calculated total score
  - `severity_level` (text) - Classification: 'minimal', 'mild', 'moderate', 'severe', etc.
  - `subscale_scores` (jsonb, optional) - For DASS-21 (depression/anxiety/stress subscales)
  - `crisis_flagged` (boolean) - Whether high-risk response detected
  - `completed_at` (timestamptz) - When assessment was completed
  - `created_at` (timestamptz) - Record creation timestamp

  ### `crisis_logs`
  Audit trail for crisis alerts (for safety monitoring)
  - `id` (uuid, primary key)
  - `user_id` (uuid, foreign key) - References profiles(id)
  - `assessment_id` (uuid, foreign key) - References assessments(id)
  - `trigger_reason` (text) - What triggered the alert
  - `acknowledged` (boolean) - Whether user acknowledged the crisis resources
  - `created_at` (timestamptz) - When crisis was flagged

  ## 2. Security (Row Level Security)
  
  All tables have RLS enabled with the following policies:
  
  ### profiles table:
  - Users can view only their own profile
  - Users can insert their own profile on signup
  - Users can update only their own profile
  
  ### assessments table:
  - Users can view only their own assessments
  - Users can insert their own assessments
  - No update allowed (assessments are immutable once completed)
  - Users can delete their own assessments
  
  ### crisis_logs table:
  - Users can view only their own crisis logs
  - System can insert crisis logs (authenticated users)
  - No updates or deletes (audit trail integrity)

  ## 3. Indexes
  
  Performance indexes for common queries:
  - assessments by user_id and completed_at (for timeline queries)
  - assessments by user_id and assessment_type (for filtering)
  - crisis_logs by user_id (for safety monitoring)

  ## 4. Important Notes
  
  - All timestamps use timestamptz for proper timezone handling
  - JSONB format allows flexible storage of assessment responses
  - Crisis flagging enables immediate safety interventions
  - Data is encrypted at rest by Supabase
  - Minimal PII collection (display name is optional)
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name text,
  language_preference text DEFAULT 'en' CHECK (language_preference IN ('en', 'ms')),
  theme_preference text DEFAULT 'light' CHECK (theme_preference IN ('light', 'dark')),
  consent_given boolean DEFAULT false,
  consent_date timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Create assessments table
CREATE TABLE IF NOT EXISTS assessments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  assessment_type text NOT NULL CHECK (assessment_type IN ('PHQ9', 'GAD7', 'DASS21', 'WHO5', 'K10')),
  responses jsonb NOT NULL,
  total_score integer NOT NULL,
  severity_level text NOT NULL,
  subscale_scores jsonb,
  crisis_flagged boolean DEFAULT false,
  completed_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Create crisis_logs table
CREATE TABLE IF NOT EXISTS crisis_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  assessment_id uuid REFERENCES assessments(id) ON DELETE CASCADE NOT NULL,
  trigger_reason text NOT NULL,
  acknowledged boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE crisis_logs ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Assessments policies
CREATE POLICY "Users can view own assessments"
  ON assessments FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own assessments"
  ON assessments FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own assessments"
  ON assessments FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Crisis logs policies
CREATE POLICY "Users can view own crisis logs"
  ON crisis_logs FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert crisis logs"
  ON crisis_logs FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_assessments_user_completed 
  ON assessments(user_id, completed_at DESC);

CREATE INDEX IF NOT EXISTS idx_assessments_user_type 
  ON assessments(user_id, assessment_type);

CREATE INDEX IF NOT EXISTS idx_crisis_logs_user 
  ON crisis_logs(user_id, created_at DESC);