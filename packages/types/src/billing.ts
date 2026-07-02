export type PlanId = "starter" | "professional" | "business" | "enterprise";

export type SelectablePlanId = Exclude<PlanId, "enterprise">;

export type SubscriptionStatus =
  | "trialing"
  | "active"
  | "past_due"
  | "cancelled"
  | "expired";

export type BillingCycle = "monthly" | "yearly";

export type Subscription = {
  id: string;
  tenantId: string;
  planId: PlanId;
  status: SubscriptionStatus;
  billingCycle: BillingCycle;
  currentPeriodStart?: string;
  currentPeriodEnd?: string;
};
