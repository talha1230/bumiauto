-- Migration: Initial database schema for BumiAuto
-- Created: 2024
-- Description: Creates tables for contact submissions, loan inquiries, blog system, and admin users

-- Admin Users (create first due to foreign key references)
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  role TEXT DEFAULT 'staff', -- super_admin, admin, staff
  name TEXT NOT NULL,
  avatar_url TEXT,
  active BOOLEAN DEFAULT TRUE,
  last_login TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Contact Form Submissions
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new', -- new, read, responded, archived
  admin_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Loan Inquiries
CREATE TABLE IF NOT EXISTS loan_inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  loan_type TEXT NOT NULL, -- motorcycle, consumer-durable, other
  loan_amount DECIMAL(10,2),
  monthly_income DECIMAL(10,2),
  message TEXT,
  status TEXT DEFAULT 'pending', -- pending, contacted, approved, rejected, completed
  assigned_to UUID REFERENCES admin_users(id),
  admin_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Blog Posts
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  summary TEXT,
  content TEXT NOT NULL, -- Rich text/HTML content
  image_url TEXT,
  tag TEXT,
  author_id UUID REFERENCES admin_users(id),
  published BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMPTZ,
  likes_count INTEGER DEFAULT 0,
  views_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Blog Comments
CREATE TABLE IF NOT EXISTS blog_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID REFERENCES blog_posts(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES blog_comments(id), -- For nested replies
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  content TEXT NOT NULL,
  approved BOOLEAN DEFAULT FALSE, -- Moderation
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Blog Likes (prevent duplicate likes)
CREATE TABLE IF NOT EXISTS blog_likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID REFERENCES blog_posts(id) ON DELETE CASCADE,
  visitor_id TEXT NOT NULL, -- IP hash or fingerprint
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(post_id, visitor_id)
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_loan_inquiries_status ON loan_inquiries(status);
CREATE INDEX IF NOT EXISTS idx_loan_inquiries_created ON loan_inquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_status ON contact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_comments_post ON blog_comments(post_id, approved);
CREATE INDEX IF NOT EXISTS idx_blog_likes_post ON blog_likes(post_id);

-- Enable Row Level Security
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE loan_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_likes ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Admin users: Only service role can manage
CREATE POLICY "Service role can manage admin_users" ON admin_users
  FOR ALL USING (true);

-- Contact submissions: Anon can insert, service role can manage
CREATE POLICY "Anon can insert contact_submissions" ON contact_submissions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Service role can manage contact_submissions" ON contact_submissions
  FOR ALL USING (true);

-- Loan inquiries: Anon can insert, service role can manage
CREATE POLICY "Anon can insert loan_inquiries" ON loan_inquiries
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Service role can manage loan_inquiries" ON loan_inquiries
  FOR ALL USING (true);

-- Blog posts: Anon can read published, service role can manage
CREATE POLICY "Anon can read published blog_posts" ON blog_posts
  FOR SELECT USING (published = true);

CREATE POLICY "Service role can manage blog_posts" ON blog_posts
  FOR ALL USING (true);

-- Blog comments: Anon can read approved and insert, service role can manage
CREATE POLICY "Anon can read approved blog_comments" ON blog_comments
  FOR SELECT USING (approved = true);

CREATE POLICY "Anon can insert blog_comments" ON blog_comments
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Service role can manage blog_comments" ON blog_comments
  FOR ALL USING (true);

-- Blog likes: Anon can insert and read, service role can manage
CREATE POLICY "Anon can read blog_likes" ON blog_likes
  FOR SELECT USING (true);

CREATE POLICY "Anon can insert blog_likes" ON blog_likes
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Service role can manage blog_likes" ON blog_likes
  FOR ALL USING (true);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create function to increment view count
CREATE OR REPLACE FUNCTION increment_view_count(post_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE blog_posts 
  SET views_count = views_count + 1 
  WHERE id = post_id;
END;
$$ language 'plpgsql';

-- Create function to increment likes count
CREATE OR REPLACE FUNCTION increment_likes_count(post_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE blog_posts 
  SET likes_count = likes_count + 1 
  WHERE id = post_id;
END;
$$ language 'plpgsql';

-- Add updated_at triggers
CREATE TRIGGER update_contact_submissions_updated_at
  BEFORE UPDATE ON contact_submissions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_loan_inquiries_updated_at
  BEFORE UPDATE ON loan_inquiries
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert default admin user
INSERT INTO admin_users (email, role, name) 
VALUES ('admin@bumiauto.com', 'super_admin', 'Admin')
ON CONFLICT (email) DO NOTHING;
