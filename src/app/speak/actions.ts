"use server";

import { supabaseAdmin } from "@/lib/supabase-admin";

export async function submitCallFormEntry(formType: string, fields: Record<string, string>) {
  const { error } = await supabaseAdmin.from("call_form_submissions").insert({
    form_type: formType,
    fields,
  });

  if (error) {
    console.error("Failed to save call form submission:", error.message);
  }
}
