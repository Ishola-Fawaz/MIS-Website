"use client";

import { useEffect, useState } from "react";
import { EVENT } from "@/lib/data";

const TARGET_DATE = new Date(EVENT.dateISO).getTime();

function getTimeLeft() {
  const diff = Math.max(TARGET_DATE - Date.now(), 0);
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function Countdown() {
  const [time, setTime] = useState<ReturnType<typeof getTimeLeft> | null>(null);

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    const timeout = setTimeout(() => setTime(getTimeLeft()), 0);
    return () => {
      clearInterval(id);
      clearTimeout(timeout);
    };
  }, []);

  const units: { label: string; value: number }[] = [
    { label: "Days", value: time?.days ?? 0 },
    { label: "Hours", value: time?.hours ?? 0 },
    { label: "Min", value: time?.minutes ?? 0 },
    { label: "Sec", value: time?.seconds ?? 0 },
  ];

  return (
    <div className="flex items-center gap-3 sm:gap-4" suppressHydrationWarning>
      {units.map((unit) => (
        <div
          key={unit.label}
          className="flex w-16 flex-col items-center rounded-xl border border-brand-700 bg-brand-900/70 py-3 transition-colors duration-300 hover:border-gold-400/50 sm:w-20"
        >
          <span
            key={unit.value}
            className="animate-tick font-mono text-2xl font-semibold text-gold-300 sm:text-3xl"
          >
            {String(unit.value).padStart(2, "0")}
          </span>
          <span className="text-[10px] uppercase tracking-[0.2em] text-cream-dim">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  );
}
