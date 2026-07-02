create table if not exists app_data.tenant_members (
  id uuid primary key,
  tenant_id uuid not null,
  user_id uuid not null,
  role text not null default 'owner',
  created_at timestamptz not null default now(),

  constraint tenant_members_role_check
    check (role in ('owner', 'admin', 'member')),

  constraint tenant_members_unique_user_per_tenant
    unique (tenant_id, user_id)
);
