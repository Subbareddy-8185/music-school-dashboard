export const ROLES = ["school", "teacher", "student", "parent"] as const;
export type Role = (typeof ROLES)[number];

export type StatusTab = "active" | "inactive";

export interface Student {
  id: number;
  name: string;
  email: string;
  city: string;
  isActive: boolean;
}

export interface AuthUser {
  name: string;
  role: Role;
}