create schema if not exists app_data;

create table if not exists app_data.tenants (
  id uuid primary key,
  company_name text not null,
  owner_user_id uuid not null,
  plan_id text not null,
  subscription_status text not null default 'trialing',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint tenants_plan_id_check
    check (plan_id in ('starter', 'professional', 'business', 'enterprise')),

  constraint tenants_subscription_status_check
    check (subscription_status in ('trialing', 'active', 'past_due', 'cancelled', 'expired'))
);
