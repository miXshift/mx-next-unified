/*
  # Initial Schema Setup

  1. New Tables
    - `users`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `username` (text)
      - `profile_image` (text)
      - `lead_source` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `organizations`
      - `id` (uuid, primary key)
      - `name` (text)
      - `company_type` (text)
      - `logo` (text)
      - `distribution_email` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `memberships`
      - `user_id` (uuid, foreign key)
      - `organization_id` (uuid, foreign key)
      - `role` (text, enum)
      - `created_at` (timestamptz)
    
    - `amazon_accounts`
      - `id` (uuid, primary key)
      - `organization_id` (uuid, foreign key)
      - `account_type` (text, enum)
      - `auth_status` (text)
      - `access_token` (text)
      - `refresh_token` (text)
      - `token_expiration_date` (timestamptz)
      - `login_email` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `merchants`
      - `id` (uuid, primary key)
      - `amazon_account_id` (uuid, foreign key)
      - `name` (text)
      - `alias` (text)
      - `merchant_type` (text)
      - `profile_id` (text)
      - `entity_id` (text)
      - `marketplace_country_code` (text)
      - `currency_code` (text)
      - `is_active` (boolean)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for organization access
    - Add policies for membership management
    - Add policies for Amazon account access
    - Add policies for merchant management

  3. Indexes
    - Add indexes for foreign keys and frequently queried fields
*/

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create tables
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  username TEXT,
  profile_image TEXT,
  lead_source TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

CREATE TABLE IF NOT EXISTS organizations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  company_type TEXT,
  logo TEXT,
  distribution_email TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

CREATE TABLE IF NOT EXISTS memberships (
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('admin', 'editor', 'viewer')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  PRIMARY KEY (user_id, organization_id)
);

CREATE TABLE IF NOT EXISTS amazon_accounts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  account_type TEXT CHECK (account_type IN ('advertising', 'selling_partner')),
  auth_status TEXT,
  access_token TEXT,
  refresh_token TEXT,
  token_expiration_date TIMESTAMP WITH TIME ZONE,
  login_email TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

CREATE TABLE IF NOT EXISTS merchants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  amazon_account_id UUID REFERENCES amazon_accounts(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  alias TEXT,
  merchant_type TEXT,
  profile_id TEXT,
  entity_id TEXT,
  marketplace_country_code TEXT,
  currency_code TEXT,
  is_active BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_memberships_user_id ON memberships(user_id);
CREATE INDEX IF NOT EXISTS idx_memberships_organization_id ON memberships(organization_id);
CREATE INDEX IF NOT EXISTS idx_amazon_accounts_organization_id ON amazon_accounts(organization_id);
CREATE INDEX IF NOT EXISTS idx_merchants_amazon_account_id ON merchants(amazon_account_id);

-- Enable Row Level Security
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE amazon_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE merchants ENABLE ROW LEVEL SECURITY;

-- Organizations policies
CREATE POLICY "Users can view organizations they belong to" ON organizations
  FOR SELECT USING (
    auth.uid() IN (
      SELECT user_id FROM memberships WHERE organization_id = organizations.id
    )
  );

CREATE POLICY "Only admins can modify organizations" ON organizations
  FOR ALL USING (
    auth.uid() IN (
      SELECT user_id FROM memberships 
      WHERE organization_id = organizations.id AND role = 'admin'
    )
  );

-- Memberships policies
CREATE POLICY "Users can view memberships of their organizations" ON memberships
  FOR SELECT USING (
    auth.uid() IN (
      SELECT user_id FROM memberships m2 
      WHERE m2.organization_id = memberships.organization_id
    )
  );

CREATE POLICY "Only admins can modify memberships" ON memberships
  FOR ALL USING (
    auth.uid() IN (
      SELECT user_id FROM memberships 
      WHERE organization_id = memberships.organization_id AND role = 'admin'
    )
  );

-- Amazon accounts policies
CREATE POLICY "Users can view their organization's Amazon accounts" ON amazon_accounts
  FOR SELECT USING (
    auth.uid() IN (
      SELECT user_id FROM memberships 
      WHERE organization_id = amazon_accounts.organization_id
    )
  );

CREATE POLICY "Only admins can modify Amazon accounts" ON amazon_accounts
  FOR ALL USING (
    auth.uid() IN (
      SELECT user_id FROM memberships 
      WHERE organization_id = amazon_accounts.organization_id AND role = 'admin'
    )
  );

-- Merchants policies
CREATE POLICY "Users can view their organization's merchants" ON merchants
  FOR SELECT USING (
    auth.uid() IN (
      SELECT user_id FROM memberships 
      WHERE organization_id = (
        SELECT organization_id FROM amazon_accounts 
        WHERE id = merchants.amazon_account_id
      )
    )
  );

CREATE POLICY "Only admins and editors can modify merchants" ON merchants
  FOR ALL USING (
    auth.uid() IN (
      SELECT user_id FROM memberships 
      WHERE organization_id = (
        SELECT organization_id FROM amazon_accounts 
        WHERE id = merchants.amazon_account_id
      ) 
      AND role IN ('admin', 'editor')
    )
  );