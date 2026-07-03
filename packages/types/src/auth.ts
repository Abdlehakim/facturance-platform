import type { SelectablePlanId } from "./billing";

export type UserRole = "owner" | "admin" | "member";

export type AuthUser = {
  id: string;
  email: string;
  fullName: string;
};

export type RegisterRequest = {
  fullName: string;
  email: string;
  password: string;
  companyName: string;
  planId: SelectablePlanId;
};

export type RegisterResponse = {
  user: AuthUser;
  tenant: {
    id: string;
    companyName: string;
    ownerUserId: string;
    planId: SelectablePlanId;
    subscriptionStatus: "trialing" | "active";
  };
  subscription: {
    id: string;
    tenantId: string;
    planId: SelectablePlanId;
    status: "trialing" | "active";
    billingCycle: "monthly" | "yearly";
  };
  redirectTo: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type AuthSession = {
  accessToken: string;
  tokenType: "Bearer";
};

export type LoginResponse = {
  user: AuthUser;
  session: AuthSession;
};

export type AuthMeResponse = {
  user: AuthUser;
};
