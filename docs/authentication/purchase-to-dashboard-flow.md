# Purchase To Dashboard Flow

This document outlines the planned purchase-to-dashboard flow for Facturance.
The first implementation milestone only connects pricing plan selection to the
registration page so the register form can recognize the selected plan.

## Future Flow

1. The user visits the website pricing page.
2. The user selects a supported plan.
3. The website redirects to `/register?plan=starter`, or the matching selected
   plan identifier.
4. The user registers an account.
5. The authentication service creates the user.
6. The platform creates a tenant/company.
7. The platform creates the tenant owner membership.
8. The platform creates a subscription record for the selected plan.
9. Later, payment succeeds through the billing provider.
10. The user is redirected to the client dashboard.

## Supported Plans

- `starter`
- `professional`
- `business`
- `enterprise`

## Future API Endpoints

- `POST /auth/register`
- `POST /auth/login`
- `GET /auth/me`
- `POST /billing/create-checkout-session`
- `POST /billing/webhook`
- `GET /tenant/current`
- `GET /subscription/current`

## First Milestone Scope

This first implementation milestone does not include real backend registration,
payment, Stripe integration, dashboard routing, or database migrations.

The milestone is limited to:

- Pricing page links pointing to `/register?plan=...` for selectable plans.
- The register page reading the selected plan from the URL.
- Shared type definitions that describe the planned auth, tenant, and billing
  concepts.
