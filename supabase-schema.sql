-- Supabase Database Setup
-- Run this SQL in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL DEFAULT 'Your Name',
  title TEXT DEFAULT 'Full-Stack Developer',
  bio TEXT,
  email TEXT,
  avatar_url TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT CHECK (category IN ('website', 'mobile', 'game')) DEFAULT 'website',
  thumbnail_url TEXT,
  gallery_images TEXT[] DEFAULT '{}',
  tech_used TEXT[] DEFAULT '{}',
  live_url TEXT,
  github_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  display_order INT DEFAULT 0
);

-- Certificates table
CREATE TABLE IF NOT EXISTS certificates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  issuer TEXT,
  image_url TEXT,
  date_earned DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tech Stack table
CREATE TABLE IF NOT EXISTS tech_stack (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  icon_url TEXT,
  category TEXT CHECK (category IN ('frontend', 'backend', 'database', 'tools', 'other')) DEFAULT 'other',
  proficiency INT CHECK (proficiency BETWEEN 1 AND 100) DEFAULT 80,
  display_order INT DEFAULT 0
);

-- Messages table (for contact form)
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  read BOOLEAN DEFAULT FALSE
);

-- Insert default profile
INSERT INTO profiles (name, title, bio, email)
VALUES (
  'Your Name',
  'Full-Stack Developer',
  'A passionate developer who loves creating digital experiences.',
  'hello@example.com'
)
ON CONFLICT DO NOTHING;

-- Create storage bucket for portfolio assets
-- Note: Run this in Storage > Create new bucket
-- Bucket name: portfolio-assets
-- Make it public
