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
  phoneCountry: string;
  phoneCountryCode: string;
  phoneNumber: string;
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
  session: {
    accessToken: string;
    tokenType: "Bearer";
  };
  redirectTo: string;
}
```

### Validation Rules

- `fullName` is required.
- `email` is required and must be a valid email.
- `password` is required.
- `companyName` is required.
- `phoneCountry` is required.
- `phoneCountryCode` is required.
- `phoneNumber` is required.
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
- Create a persisted 30-day session and return its bearer token.
- Return `redirectTo: "/dashboard/onboarding"`.

### Excluded From This Milestone

- No payment.
- No Stripe.
- No email verification.
- No advanced permissions.
- No multi-company setup.
- No dashboard implementation.

## POST /auth/login

Authenticates an existing user through an international phone number and
password.

### Request Body

```ts
{
  phoneCountry?: string;
  phoneCountryCode: string;
  phoneNumber: string;
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

- `phoneCountry` is optional display metadata.
- `phoneCountryCode` is required.
- `phoneNumber` is required.
- `password` is required.

### First-Version Behavior

1. Trim and normalize `phoneCountryCode`.
2. Trim and normalize `phoneNumber`.
3. Combine them into the canonical normalized phone value.
4. Find the user through `phoneNormalized`.
5. Verify the submitted password against the stored password hash.
6. Generate a cryptographically random opaque session token.
7. Hash the token with SHA-256.
8. Store only the hash in PostgreSQL.
9. Set `expiresAt` to 30 days after session creation.
10. Return the raw token once as `accessToken`.
11. Return `tokenType: "Bearer"`.
12. Return the authenticated user without password fields.

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

1. Read the bearer token from the `Authorization` header.
2. Hash the supplied raw token with SHA-256.
3. Resolve the persisted session by `tokenHash`.
4. Reject missing, expired, or revoked sessions.
5. Resolve the user through the session relation.
6. Update `lastUsedAt`.
7. Return the user without password fields.

### Excluded From This Milestone

- No tenant loading.
- No subscription loading.
- No permissions.
- No refresh token rotation.
