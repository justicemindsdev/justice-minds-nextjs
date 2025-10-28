-- Justice Minds - Supabase Database Schema
-- This schema creates the articles table with all necessary fields

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create articles table
CREATE TABLE IF NOT EXISTS articles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Core article fields
  slug TEXT UNIQUE NOT NULL,
  date DATE NOT NULL,
  kicker TEXT NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  
  -- Optional fields
  meta TEXT,
  image_url TEXT,
  
  -- Publishing control
  published BOOLEAN DEFAULT false,
  
  -- Constraints
  CONSTRAINT valid_slug CHECK (slug ~ '^[a-z0-9-]+$'),
  CONSTRAINT valid_date CHECK (date <= CURRENT_DATE + INTERVAL '1 year')
);

-- Create indexes for better query performance
CREATE INDEX idx_articles_date ON articles(date DESC);
CREATE INDEX idx_articles_published ON articles(published) WHERE published = true;
CREATE INDEX idx_articles_slug ON articles(slug);
CREATE INDEX idx_articles_created_at ON articles(created_at DESC);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_articles_updated_at
  BEFORE UPDATE ON articles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Allow public read access to published articles
CREATE POLICY "Public can view published articles"
  ON articles FOR SELECT
  USING (published = true);

-- Allow authenticated users to manage all articles (for admin)
CREATE POLICY "Authenticated users can manage articles"
  ON articles FOR ALL
  USING (auth.role() = 'authenticated');

-- Create storage bucket for article images (if not exists)
INSERT INTO storage.buckets (id, name, public)
VALUES ('article-images', 'article-images', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access to article images
CREATE POLICY "Public can view article images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'article-images');

-- Allow authenticated users to upload article images
CREATE POLICY "Authenticated users can upload article images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'article-images' AND auth.role() = 'authenticated');

COMMENT ON TABLE articles IS 'Stores all forensic investigation articles';
COMMENT ON COLUMN articles.slug IS 'URL-friendly identifier (e.g., when-permission-fails)';
COMMENT ON COLUMN articles.kicker IS 'Category/section label (e.g., INVESTIGATION, ANALYSIS)';
COMMENT ON COLUMN articles.content IS 'Full HTML content of the article';
COMMENT ON COLUMN articles.meta IS 'Author byline and credentials';
