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

## POST /auth/login

Authenticates an existing user with email and password.

### Request Body

```ts
{
  email: string;
  password: string;
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
  session: {
    accessToken: string;
    tokenType: "Bearer";
  };
}
```

### Validation Rules

- `email` is required and must be a valid email.
- `password` is required.

### First-Version Behavior

- Normalize email.
- Verify the submitted password against the stored password hash.
- Return a minimal bearer access token.
- Return the authenticated user without password fields.

### Excluded From This Milestone

- No refresh tokens.
- No cookies.
- No password reset.
- No email verification.
- No role/permission system.
- No dashboard guards.

## GET /auth/me

Returns the current authenticated user from a bearer token.

### Headers

```txt
Authorization: Bearer <accessToken>
```

### Successful Response

```ts
{
  user: {
    id: string;
    email: string;
    fullName: string;
  };
}
```

### First-Version Behavior

- Read the bearer token from the `Authorization` header.
- Verify the token signature.
- Resolve the user from the token subject.
- Return the user without password fields.

### Excluded From This Milestone

- No tenant loading.
- No subscription loading.
- No permissions.
- No refresh token rotation.
