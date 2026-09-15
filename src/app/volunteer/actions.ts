"use server";

import { supabaseAdmin } from "@/lib/supabase-admin";

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

  const { error } = await supabaseAdmin.from("volunteer_applications").insert({
    name,
    email,
    phone,
    availability: input.availability.trim() || null,
    department,
    roles,
  });

  if (error) {
    return { ok: false, error: "Something went wrong — please try again." };
  }

  return { ok: true };
}
