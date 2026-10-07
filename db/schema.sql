-- Run this once against your Neon database (SQL Editor or `psql "$DATABASE_URL" -f db/schema.sql`).

create extension if not exists pgcrypto;

create table if not exists volunteer_applications (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  phone text not null,
  availability text,
  department text not null,
  roles text[] not null
);

create table if not exists call_form_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  form_type text not null,   -- 'speaker' today; reusable if another CallForm use appears
  fields jsonb not null       -- {label: value} pairs, in field order
);

create table if not exists ticket_orders (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  reference text not null unique,
  status text not null,       -- Paystack event status, e.g. 'success'
  email text,
  amount_kobo integer,
  currency text,
  tier text,                  -- resolved by matching amount against TICKETS prices
  paid_at timestamptz,
  raw_payload jsonb not null
);
