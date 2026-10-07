"use server";

import { withDb } from "@/lib/db";

export type VolunteerApplicationInput = {
  name: string;
  email: string;
  phone: string;
  availability: string;
  department: string;
  roles: string[];
};

export type VolunteerApplicationResult = { ok: true } | { ok: false; error: string };

export async function submitVolunteerApplication(
  input: VolunteerApplicationInput
): Promise<VolunteerApplicationResult> {
  const name = input.name.trim();
  const email = input.email.trim();
  const phone = input.phone.trim();
  const department = input.department.trim();
  const roles = input.roles.filter(Boolean);

  if (!name || !email || !phone || !department || roles.length === 0) {
    return { ok: false, error: "Please fill in all required fields." };
  }

  try {
    await withDb((db) =>
      db.query(
        `insert into volunteer_applications (name, email, phone, availability, department, roles)
         values ($1, $2, $3, $4, $5, $6)`,
        [name, email, phone, input.availability.trim() || null, department, roles]
      )
    );
  } catch {
    return { ok: false, error: "Something went wrong — please try again." };
  }

  return { ok: true };
}
