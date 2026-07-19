-- Etela Technologies: form capture tables
-- Run in Supabase SQL editor after creating a project.

create table if not exists public.consultations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  company text not null,
  email text not null,
  phone text not null,
  industry text not null,
  service_needed text not null,
  message text not null,
  preferred_date text not null,
  preferred_time text not null,
  consultation_type text not null check (consultation_type in ('virtual', 'in-person')),
  submit_mode text default 'book',
  created_at timestamptz not null default now()
);

create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now()
);

-- Enable RLS
alter table public.consultations enable row level security;
alter table public.newsletter_subscribers enable row level security;

-- Allow anonymous inserts only (no public read)
create policy "Allow anon insert consultations"
  on public.consultations
  for insert
  to anon
  with check (true);

create policy "Allow anon insert newsletter"
  on public.newsletter_subscribers
  for insert
  to anon
  with check (true);
