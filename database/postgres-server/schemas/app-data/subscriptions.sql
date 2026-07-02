create table if not exists app_data.subscriptions (
  id uuid primary key,
  tenant_id uuid not null,
  plan_id text not null,
  status text not null default 'trialing',
  billing_cycle text not null default 'monthly',
  current_period_start timestamptz,
  current_period_end timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint subscriptions_plan_id_check
    check (plan_id in ('starter', 'professional', 'business', 'enterprise')),

  constraint subscriptions_status_check
    check (status in ('trialing', 'active', 'past_due', 'cancelled', 'expired')),

  constraint subscriptions_billing_cycle_check
    check (billing_cycle in ('monthly', 'yearly'))
);
