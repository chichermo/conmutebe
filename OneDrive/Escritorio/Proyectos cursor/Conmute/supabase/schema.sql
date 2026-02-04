create extension if not exists "pgcrypto";

create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text unique not null,
  password_hash text not null,
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
