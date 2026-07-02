# Auth API

This document defines the first registration contract for the Facturance
auth-api. It is a contract and implementation guide only; this milestone does
not add production authentication logic.

## POST /auth/register

Creates the first owner account, tenant/company, owner membership, and
subscription draft for a self-service plan.

### Request Body

```ts
{
  fullName: string;
  email: string;
  password: string;
  companyName: string;
  planId: "starter" | "professional" | "business";
}
```

### Successful Response

```ts
{
  user: {
    id: string;
    email: string;
    fullName: string;
  };
  tenant: {
    id: string;
    companyName: string;
    ownerUserId: string;
    planId: "starter" | "professional" | "business";
    subscriptionStatus: "trialing" | "active";
  };
  subscription: {
    id: string;
    tenantId: string;
    planId: "starter" | "professional" | "business";
    status: "trialing" | "active";
    billingCycle: "monthly" | "yearly";
  };
  redirectTo: string;
}
```

### Validation Rules

- `fullName` is required.
- `email` is required and must be a valid email.
- `password` is required.
- `companyName` is required.
- `planId` must be one of:
  - `starter`
  - `professional`
  - `business`
- Enterprise registration is not self-service and must continue to use
  `/contact`.

### First-Version Behavior

- Create user.
- Create tenant/company.
- Add user as owner member.
- Create subscription draft with status `trialing`.
- Return `redirectTo: "/dashboard/onboarding"`.

### Excluded From This Milestone

- No payment.
- No Stripe.
- No email verification.
- No advanced permissions.
- No multi-company setup.
- No dashboard implementation.
