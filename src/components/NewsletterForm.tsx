"use client";

import { useState } from "react";
import { EVENT } from "@/lib/data";
import Button from "./Button";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");

  return (
    <form
      className="flex w-full max-w-md flex-col gap-3 sm:flex-row"
      onSubmit={(e) => {
        e.preventDefault();
        const subject = "Add me to the MIS 1.0 list";
        const body = `Please add this email to the newsletter: ${email}`;
        window.location.href = `mailto:${EVENT.contactEmail}?subject=${encodeURIComponent(
          subject
        )}&body=${encodeURIComponent(body)}`;
      }}
    >
      <input
        type="email"
        required
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full rounded-full border border-brand-700 bg-brand-900/70 px-5 py-3 text-sm text-cream placeholder:text-cream-dim/60 outline-none focus:border-gold-400"
      />
      <Button type="submit" className="shrink-0">
        Notify Me
      </Button>
    </form>
  );
}
