"use client";

import { useActionState } from "react";
import { login, type LoginState } from "./actions";

const initialState: LoginState = {};

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState(login, initialState);

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-20">
      <form
        action={formAction}
        className="flex w-full max-w-sm flex-col gap-5 rounded-3xl border border-brand-800 bg-brand-900/40 p-8"
      >
        <div>
          <h1 className="font-heading text-xl font-semibold text-cream">
            Admin sign in
          </h1>
          <p className="mt-1 text-sm text-cream-dim">
            Restricted to MIS organizers.
          </p>
        </div>
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-cream">Password</span>
          <input
            type="password"
            name="password"
            required
            autoFocus
            className="w-full rounded-full border border-brand-700 bg-brand-950/60 px-4 py-3 text-sm text-cream outline-none transition-colors duration-200 focus:border-gold-400"
          />
        </label>
        {state.error && (
          <p className="text-sm text-red-400" role="alert">
            {state.error}
          </p>
        )}
        <button
          type="submit"
          disabled={pending}
          className="inline-flex w-full items-center justify-center rounded-full bg-gold-400 px-6 py-3 text-sm font-semibold tracking-wide text-brand-950 transition-all duration-200 hover:scale-[1.03] hover:bg-gold-300 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {pending ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
