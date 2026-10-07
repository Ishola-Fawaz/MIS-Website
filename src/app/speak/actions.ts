"use server";

import { withDb } from "@/lib/db";

export async function submitCallFormEntry(formType: string, fields: Record<string, string>) {
  try {
    await withDb((db) =>
      db.query(
        `insert into call_form_submissions (form_type, fields) values ($1, $2::jsonb)`,
        [formType, JSON.stringify(fields)]
      )
    );
  } catch (error) {
    console.error("Failed to save call form submission:", error);
  }
}
