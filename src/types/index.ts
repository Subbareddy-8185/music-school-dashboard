

export type Role = "School" | "Teacher" | "Student" | "Parent";

export type StatusTab = "Active" | "Inactive";

export interface Student {
  id: number;
  name: string;
  email: string;
  city: string  ;
  isActive: boolean;
}