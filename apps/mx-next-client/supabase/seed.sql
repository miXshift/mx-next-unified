/*
  Seed data for testing and development environments
  
  This file contains test data that matches the schema defined in migrations.
  The data includes:
  - Test users with different roles
  - Sample organizations
  - Memberships with various permission levels
  - Amazon account connections
  - Merchant profiles
*/

-- Clean existing data (in reverse order of dependencies)
TRUNCATE merchants CASCADE;
TRUNCATE amazon_accounts CASCADE;
TRUNCATE memberships CASCADE;
TRUNCATE organizations CASCADE;
TRUNCATE users CASCADE;

-- Insert test users with various roles and sources
INSERT INTO users (id, email, username, profile_image, lead_source, created_at, updated_at)
VALUES
  ('11111111-1111-1111-1111-111111111111', 'john.doe@example.com', 'johndoe', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop', 'direct', NOW(), NOW()),
  ('22222222-2222-2222-2222-222222222222', 'jane.smith@example.com', 'janesmith', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop', 'google', NOW(), NOW()),
  ('33333333-3333-3333-3333-333333333333', 'bob.wilson@example.com', 'bobwilson', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop', 'referral', NOW(), NOW()),
  ('44444444-4444-4444-4444-444444444444', 'alice.johnson@example.com', 'alicej', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop', 'linkedin', NOW(), NOW());

-- Insert organizations with different types
INSERT INTO organizations (id, name, company_type, logo, distribution_email, created_at, updated_at)
VALUES
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'TechCorp Solutions', 'enterprise', 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=200&h=200&fit=crop', 'dist@techcorp.com', NOW(), NOW()),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Global Retail Inc', 'retail', 'https://images.unsplash.com/photo-1541535650810-10d26f5c2ab3?w=200&h=200&fit=crop', 'dist@globalretail.com', NOW(), NOW()),
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', 'StartUp Ventures', 'startup', 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=200&h=200&fit=crop', 'dist@startup.com', NOW(), NOW());

-- Insert memberships with different roles
INSERT INTO memberships (user_id, organization_id, role, created_at)
VALUES
  -- TechCorp Solutions memberships
  ('11111111-1111-1111-1111-111111111111', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'admin', NOW()),
  ('22222222-2222-2222-2222-222222222222', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'editor', NOW()),
  ('33333333-3333-3333-3333-333333333333', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'viewer', NOW()),
  
  -- Global Retail Inc memberships
  ('22222222-2222-2222-2222-222222222222', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'admin', NOW()),
  ('33333333-3333-3333-3333-333333333333', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'editor', NOW()),
  
  -- StartUp Ventures memberships
  ('44444444-4444-4444-4444-444444444444', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 'admin', NOW());

-- Insert Amazon accounts with different types and statuses
INSERT INTO amazon_accounts (id, organization_id, account_type, auth_status, login_email, created_at, updated_at)
VALUES
  -- TechCorp Solutions Amazon accounts
  ('dddddddd-dddd-dddd-dddd-dddddddddddd', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'advertising', 'active', 'ads@techcorp.com', NOW(), NOW()),
  ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'selling_partner', 'active', 'seller@techcorp.com', NOW(), NOW()),
  
  -- Global Retail Inc Amazon accounts
  ('ffffffff-ffff-ffff-ffff-ffffffffffff', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'advertising', 'active', 'ads@globalretail.com', NOW(), NOW()),
  
  -- StartUp Ventures Amazon accounts
  ('99999999-9999-9999-9999-999999999999', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 'advertising', 'pending', 'ads@startup.com', NOW(), NOW());

-- Insert merchants with various configurations
INSERT INTO merchants (id, amazon_account_id, name, alias, merchant_type, profile_id, entity_id, marketplace_country_code, currency_code, is_active, created_at, updated_at)
VALUES
  -- TechCorp Solutions merchants
  ('11111111-2222-3333-4444-555555555555', 'dddddddd-dddd-dddd-dddd-dddddddddddd', 'TechCorp US Store', 'TC-US', 'retail', 'PROF_001', 'ENT_001', 'US', 'USD', true, NOW(), NOW()),
  ('22222222-3333-4444-5555-666666666666', 'dddddddd-dddd-dddd-dddd-dddddddddddd', 'TechCorp EU Store', 'TC-EU', 'retail', 'PROF_002', 'ENT_002', 'DE', 'EUR', true, NOW(), NOW()),
  ('33333333-4444-5555-6666-777777777777', 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'TechCorp Wholesale', 'TC-WH', 'wholesale', 'PROF_003', 'ENT_003', 'US', 'USD', true, NOW(), NOW()),
  
  -- Global Retail Inc merchants
  ('44444444-5555-6666-7777-888888888888', 'ffffffff-ffff-ffff-ffff-ffffffffffff', 'Global Retail UK', 'GR-UK', 'retail', 'PROF_004', 'ENT_004', 'UK', 'GBP', true, NOW(), NOW()),
  ('55555555-6666-7777-8888-999999999999', 'ffffffff-ffff-ffff-ffff-ffffffffffff', 'Global Retail CA', 'GR-CA', 'retail', 'PROF_005', 'ENT_005', 'CA', 'CAD', false, NOW(), NOW());