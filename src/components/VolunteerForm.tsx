"use client";

import { FormEvent, useState } from "react";
import {
  Agreement01Icon,
  BulbIcon,
  Camera01Icon,
  CheckmarkCircle02Icon,
  Coffee01Icon,
  Door01Icon,
  Edit02Icon,
  FirstAidKitIcon,
  IdentificationIcon,
  Megaphone01Icon,
  MoneyBag01Icon,
  Note01Icon,
  PaintBoardIcon,
  PaintBrush01Icon,
  ProjectorIcon,
  RestaurantIcon,
  SentIcon,
  Speaker01Icon,
  Ticket01Icon,
  UserCheck02Icon,
  Video01Icon,
  Video02Icon,
  Building05Icon,
  Wrench02Icon,
} from "hugeicons-react";
import Reveal from "./Reveal";

type Role = { label: string; icon: typeof Megaphone01Icon };
type Category = { title: string; icon: typeof Megaphone01Icon; roles: Role[] };

const CATEGORIES: Category[] = [
  {
    title: "Media & Publicity",
    icon: Megaphone01Icon,
    roles: [
      { label: "Publicity & Campaign", icon: Note01Icon },
      { label: "Content Writing", icon: Edit02Icon },
      { label: "Graphics Design", icon: PaintBrush01Icon },
      { label: "Videography", icon: Video01Icon },
      { label: "Photography", icon: Camera01Icon },
      { label: "Vlogging", icon: Video02Icon },
    ],
  },
  {
    title: "Marketing & Partnership",
    icon: Agreement01Icon,
    roles: [
      { label: "Sponsor Outreach", icon: MoneyBag01Icon },
      { label: "Partnership & Collaboration", icon: Agreement01Icon },
    ],
  },
  {
    title: "Technical",
    icon: Wrench02Icon,
    roles: [
      { label: "Lighting", icon: BulbIcon },
      { label: "Sound System", icon: Speaker01Icon },
      { label: "Projection (Screen/Projector)", icon: ProjectorIcon },
      { label: "Venue", icon: Building05Icon },
    ],
  },
  {
    title: "Hospitality",
    icon: Coffee01Icon,
    roles: [
      { label: "Speaker & Guest Support", icon: UserCheck02Icon },
      { label: "Refreshments", icon: RestaurantIcon },
      { label: "Hall Decoration", icon: PaintBoardIcon },
      { label: "Health Care Support", icon: FirstAidKitIcon },
    ],
  },
  {
    title: "Reception",
    icon: Ticket01Icon,
    roles: [
      { label: "Ushering", icon: Door01Icon },
      { label: "Ticketing & Registration", icon: IdentificationIcon },
    ],
  },
];

export default function VolunteerForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [availability, setAvailability] = useState("");
  const [selectedRoles, setSelectedRoles] = useState<Set<string>>(new Set());
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  function toggleRole(categoryTitle: string, role: string) {
    const next = new Set(selectedRoles);
    if (next.has(role)) {
      next.delete(role);
    } else {
      if (activeCategory && activeCategory !== categoryTitle) return;
      next.add(role);
    }
    setSelectedRoles(next);
    setActiveCategory(next.size === 0 ? null : categoryTitle);
  }

  function clearDepartment() {
    setSelectedRoles(new Set());
    setActiveCategory(null);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  const canSubmit = name.trim() && email.trim() && selectedRoles.size > 0;

  if (submitted) {
    return (
      <div className="flex w-full max-w-2xl flex-col items-center gap-5 rounded-3xl border border-gold-400/40 bg-brand-900/50 p-10 text-center animate-tick">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gold-400 text-brand-950">
          <CheckmarkCircle02Icon size={32} />
        </span>
        <h3 className="font-heading text-2xl font-semibold text-cream">
          Thanks, {name.split(" ")[0]}.
        </h3>
        <p className="max-w-md text-sm leading-6 text-cream-dim">
          We&apos;ve got your interest in {selectedRoles.size} role
          {selectedRoles.size === 1 ? "" : "s"} on record. We&apos;re still
          finalizing how volunteer applications come together — we&apos;ll
          reach out at {email} once the team is being locked in.
        </p>
        <div className="flex flex-wrap justify-center gap-2 pt-2">
          {Array.from(selectedRoles).map((role) => (
            <span
              key={role}
              className="rounded-full border border-brand-700 bg-brand-950/60 px-3 py-1 text-xs text-cream-dim"
            >
              {role}
            </span>
          ))}
        </div>
        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            clearDepartment();
            setName("");
            setEmail("");
            setAvailability("");
          }}
          className="mt-2 text-xs font-medium text-gold-300 underline-offset-4 transition-colors hover:text-gold-200 hover:underline"
        >
          Submit another response
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-3xl flex-col gap-10"
    >
      <div className="flex flex-col gap-5 rounded-3xl border border-brand-800 bg-brand-900/40 p-6 transition-colors duration-300 hover:border-brand-700 sm:p-8">
        <h3 className="font-heading text-lg font-semibold text-cream">
          Your details
        </h3>
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-cream">
              Full name<span className="text-gold-400"> *</span>
            </span>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-full border border-brand-700 bg-brand-950/60 px-4 py-3 text-sm text-cream placeholder:text-cream-dim/60 outline-none transition-colors duration-200 focus:border-gold-400"
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-cream">
              Email<span className="text-gold-400"> *</span>
            </span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-full border border-brand-700 bg-brand-950/60 px-4 py-3 text-sm text-cream placeholder:text-cream-dim/60 outline-none transition-colors duration-200 focus:border-gold-400"
            />
          </label>
        </div>
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-cream">
            Availability on the day
          </span>
          <input
            type="text"
            placeholder="e.g. full day, morning setup only"
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
            className="w-full rounded-full border border-brand-700 bg-brand-950/60 px-4 py-3 text-sm text-cream placeholder:text-cream-dim/60 outline-none transition-colors duration-200 focus:border-gold-400"
          />
        </label>
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex flex-col items-center gap-2 text-center sm:flex-row sm:items-end sm:justify-between sm:text-left">
          <div className="flex flex-col gap-1">
            <h3 className="font-heading text-lg font-semibold text-cream">
              Where would you like to help?
            </h3>
            <p className="text-sm text-cream-dim">
              Pick one department, then as many roles within it as you like
              <span className="text-gold-400"> *</span>
            </p>
          </div>
          {activeCategory && (
            <button
              type="button"
              onClick={clearDepartment}
              className="text-xs font-medium text-gold-300 underline-offset-4 transition-colors hover:text-gold-200 hover:underline"
            >
              Change department
            </button>
          )}
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {CATEGORIES.map((category, index) => {
            const CategoryIcon = category.icon;
            const isLocked = activeCategory !== null && activeCategory !== category.title;
            return (
              <Reveal key={category.title} delay={index * 60}>
                <div
                  className={`flex h-full flex-col gap-4 rounded-3xl border border-brand-800 bg-brand-950/60 p-6 transition-all duration-300 ${
                    isLocked
                      ? "opacity-40"
                      : "hover:border-gold-400/40"
                  } ${activeCategory === category.title ? "border-gold-400/50" : ""}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-800 text-gold-300">
                      <CategoryIcon size={20} />
                    </span>
                    <h4 className="font-heading text-base font-semibold text-cream">
                      {category.title}
                    </h4>
                  </div>
                  <div className="grid gap-2.5 sm:grid-cols-2">
                    {category.roles.map((role) => {
                      const RoleIcon = role.icon;
                      const checked = selectedRoles.has(role.label);
                      return (
                        <label
                          key={role.label}
                          aria-disabled={isLocked}
                          className={`flex items-center gap-2 rounded-2xl border px-3 py-2.5 text-xs font-medium transition-all duration-200 ${
                            isLocked
                              ? "cursor-not-allowed border-brand-800 text-cream-dim/50"
                              : checked
                                ? "cursor-pointer border-gold-400 bg-gold-400/10 text-gold-200"
                                : "cursor-pointer border-brand-700 text-cream-dim hover:border-brand-600 hover:text-cream"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            disabled={isLocked}
                            onChange={() => toggleRole(category.title, role.label)}
                            className="sr-only"
                          />
                          <RoleIcon
                            size={16}
                            className={`shrink-0 transition-colors duration-200 ${
                              checked && !isLocked ? "text-gold-300" : "text-cream-dim/70"
                            }`}
                          />
                          <span className="leading-snug">{role.label}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 rounded-3xl border border-brand-800 bg-brand-900/30 p-6 text-center">
        <p className="text-sm text-cream-dim">
          {selectedRoles.size === 0
            ? "No roles selected yet."
            : `${selectedRoles.size} role${
                selectedRoles.size === 1 ? "" : "s"
              } selected in ${activeCategory}.`}{" "}
          We&apos;re still finalizing how applications come together —
          nothing is sent anywhere yet.
        </p>
        <button
          type="submit"
          disabled={!canSubmit}
          className="group inline-flex items-center justify-center gap-2 rounded-full bg-gold-400 px-6 py-3 text-sm font-semibold tracking-wide text-brand-950 shadow-[0_0_0_1px_rgba(212,162,76,0.4)] transition-all duration-200 hover:scale-[1.03] hover:bg-gold-300 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
        >
          Apply to Volunteer
          <SentIcon
            size={16}
            className="transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-0.5"
          />
        </button>
      </div>
    </form>
  );
}
