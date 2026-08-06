"use client";

import { useState } from "react";
import { Add01Icon } from "hugeicons-react";
import { FAQS } from "@/lib/data";

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-3">
      {FAQS.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={faq.q}
            className="overflow-hidden rounded-2xl border border-brand-800 bg-brand-900/50 transition-colors duration-300 hover:border-gold-400/40"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              aria-expanded={isOpen}
            >
              <span className="text-sm font-semibold text-cream sm:text-base">
                {faq.q}
              </span>
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-brand-600 text-gold-300 transition-transform duration-300 ${
                  isOpen ? "rotate-45 bg-gold-400 text-brand-950" : ""
                }`}
              >
                <Add01Icon size={16} />
              </span>
            </button>
            <div
              className={`grid transition-all duration-200 ease-out ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-5 text-sm leading-6 text-cream-dim">
                  {faq.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
