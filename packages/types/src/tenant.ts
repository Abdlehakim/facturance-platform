import type { PlanId, SubscriptionStatus } from "./billing";

export type Tenant = {
  id: string;
  companyName: string;
  ownerUserId: string;
  planId: PlanId;
  subscriptionStatus: SubscriptionStatus;
  onboardingCompletedAt: string | null;
};

export type CompanyOnboarding = {
  id: string;
  companyName: string;
  onboardingCompletedAt: string | null;
};

export type CompleteCompanyOnboardingRequest = {
  companyName: string;
};

export type CompanyOnboardingResponse = {
  company: CompanyOnboarding;
};
