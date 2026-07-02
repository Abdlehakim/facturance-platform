export type UserRole = "owner" | "admin" | "member";

export type AuthUser = {
  id: string;
  email: string;
  fullName: string;
};
