create extension if not exists "pgcrypto";

create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null,
  email text unique not null,
  language text default 'nl',
  region text default 'flanders',
  points integer default 0,
  is_premium boolean default false,
  created_at timestamp with time zone default now()
);

create table if not exists public.routes (
  id uuid primary key default gen_random_uuid(),
  origin_label text,
  origin_lat double precision,
  origin_lng double precision,
  destination_label text,
  destination_lat double precision,
  destination_lng double precision,
  mode text,
  distance_km double precision,
  duration_min integer,
  cost_eur double precision,
  co2_kg double precision,
  steps jsonb,
  created_at timestamp with time zone default now()
);

create table if not exists public.challenges (
  id uuid primary key default gen_random_uuid(),
  title text,
  description text,
  points integer,
  target integer,
  created_at timestamp with time zone default now()
);

alter table public.users enable row level security;
alter table public.routes enable row level security;
alter table public.challenges enable row level security;

create policy "Usuarios leen su perfil"
  on public.users for select
  using (auth.uid() = id);

create policy "Usuarios actualizan su perfil"
  on public.users for update
  using (auth.uid() = id);

create policy "Rutas solo lectura"
  on public.routes for select
  using (auth.role() = 'authenticated');

create policy "Retos solo lectura"
  on public.challenges for select
  using (auth.role() = 'authenticated');
