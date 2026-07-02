create schema if not exists auth;

create table if not exists auth.users (
  id uuid primary key,
  email text not null unique,
  full_name text not null,
  password_hash text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
