-- ==============================================================================
-- GetBnB Supabase SQL Setup Script
-- Copy and paste this script directly into the Supabase SQL Editor
-- (Database -> SQL Editor -> New Query) and click Run.
-- ==============================================================================

-- ── 1. CREATE LEADS TABLE ───────────────────────────────────────────────────
create table if not exists leads (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now(),
  lead_id text unique not null,
  first_name text not null,
  last_name text not null,
  email text not null,
  phone text,
  company text,
  country text not null,
  city text,
  move_in_date text not null,
  lease_type text not null,
  adults integer not null,
  children integer not null,
  pets text,
  budget_min integer not null,
  budget_max integer not null,
  currency text not null,
  bedrooms text,
  furnished text,
  must_haves text[]
);

-- Enable Row Level Security (RLS)
alter table leads enable row level security;

-- Create policies (Allow anonymous inserts; block public reads)
create policy "Allow anonymous inserts to leads" on leads for insert with check (true);
create policy "Allow authenticated reads to leads" on leads for select using (auth.role() = 'authenticated');


-- ── 2. CREATE APPLICATIONS TABLE ─────────────────────────────────────────────
create table if not exists applications (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now(),
  application_id text unique not null,
  full_name text not null,
  date_of_birth text not null,
  email text not null,
  phone_country_code text not null,
  phone_number text not null,
  citizenship text not null,
  moving_with text not null,
  emergency_contact_name text not null,
  emergency_contact_phone text not null,
  current_street text not null,
  current_city text not null,
  current_state text not null,
  current_country text not null,
  time_at_address text not null,
  landlord_name text,
  landlord_phone text,
  reason_for_moving text not null,
  current_monthly_rent text not null,
  previous_address text,
  primary_reason_for_move text not null,
  desired_stay_length text not null,
  employer_name_address text not null,
  job_title text not null,
  employment_start_date text not null,
  monthly_net_income text not null,
  supervisor_name text not null,
  supervisor_phone text not null,
  eu_visa_status text not null
);

-- Enable Row Level Security (RLS)
alter table applications enable row level security;

-- Create policies (Allow anonymous inserts; block public reads)
create policy "Allow anonymous inserts to applications" on applications for insert with check (true);
create policy "Allow authenticated reads to applications" on applications for select using (auth.role() = 'authenticated');
