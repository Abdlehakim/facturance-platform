import type { PlanId, SubscriptionStatus } from "./billing";

export type Tenant = {
  id: string;
  companyName: string;
  ownerUserId: string;
  planId: PlanId;
  subscriptionStatus: SubscriptionStatus;
};
