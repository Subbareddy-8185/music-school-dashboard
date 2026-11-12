import type { Role } from "./types";

export const roleHome: Record<Role, string> = {
  school: "/school",
  teacher: "/teacher",
  student: "/student",
  parent: "/parent",
};

export const roleLabel: Record<Role, string> = {
  school: "School",
  teacher: "Teacher",
  student: "Student",
  parent: "Parent",
};