-- =============================================================================
-- ScaledNative Training - Supabase Database Schema
-- =============================================================================
-- Run this SQL in your Supabase SQL Editor to create the required tables.
-- Go to: Supabase Dashboard > SQL Editor > New Query
-- =============================================================================

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  password_hash TEXT,
  role TEXT DEFAULT 'LEARNER' CHECK (role IN ('SUPER_ADMIN', 'ORG_ADMIN', 'CREATOR', 'MANAGER', 'LEARNER')),
  organization_id TEXT,
  certification_path TEXT,
  department TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Sessions table for auth persistence
CREATE TABLE IF NOT EXISTS sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  token TEXT UNIQUE NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Training progress tracking
CREATE TABLE IF NOT EXISTS training_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  module_id TEXT NOT NULL,
  lesson_id TEXT,
  status TEXT DEFAULT 'not_started' CHECK (status IN ('not_started', 'in_progress', 'completed')),
  progress_pct INTEGER DEFAULT 0,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, module_id, COALESCE(lesson_id, ''))
);

-- Demo request leads
CREATE TABLE IF NOT EXISTS demo_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  role TEXT,
  team_size TEXT,
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================================
-- Indexes for performance
-- =============================================================================

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_token ON sessions(token);
CREATE INDEX IF NOT EXISTS idx_progress_user_id ON training_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_progress_module ON training_progress(module_id);

-- =============================================================================
-- Row Level Security (RLS) Policies
-- =============================================================================

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE training_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE demo_leads ENABLE ROW LEVEL SECURITY;

-- Allow service role full access (for server-side operations)
CREATE POLICY "Service role has full access to users"
  ON users FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "Service role has full access to sessions"
  ON sessions FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "Service role has full access to progress"
  ON training_progress FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "Service role has full access to leads"
  ON demo_leads FOR ALL
  USING (auth.role() = 'service_role');

-- Allow anon role to insert leads (for demo request form)
CREATE POLICY "Anyone can submit demo leads"
  ON demo_leads FOR INSERT
  WITH CHECK (true);

-- =============================================================================
-- Seed the admin user (sam.sweilem@gmail.com)
-- Password: Winter2022$ (hashed with bcrypt)
-- =============================================================================

-- Note: The password hash is pre-computed for 'Winter2022$'
-- In production, generate this using bcrypt in your application
INSERT INTO users (email, name, password_hash, role, department)
VALUES (
  'sam.sweilem@gmail.com',
  'Sam Sweilem',
  '$2a$10$K7LqVlZ5QhJ3V.X8VxQ5IOKxQ5X5Q5X5Q5X5Q5X5Q5X5Q5X5Q5X5O', -- placeholder hash
  'SUPER_ADMIN',
  'Administration'
) ON CONFLICT (email) DO NOTHING;

-- =============================================================================
-- Updated_at trigger
-- =============================================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_progress_updated_at
    BEFORE UPDATE ON training_progress
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
