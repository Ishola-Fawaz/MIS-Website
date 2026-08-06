import { SparklesIcon } from "hugeicons-react";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  light = false,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  light?: boolean;
}) {
  return (
    <div
      className={`flex flex-col gap-4 ${
        align === "center" ? "items-center text-center" : "items-start text-left"
      }`}
    >
      {eyebrow && (
        <span
          className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] ${
            light
              ? "border-brand-950/15 bg-brand-950/5 text-brand-600"
              : "border-brand-600 bg-brand-900 text-gold-300"
          }`}
        >
          <SparklesIcon size={14} />
          {eyebrow}
        </span>
      )}
      <h2
        className={`font-heading max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl ${
          light ? "text-brand-950" : "text-cream"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`max-w-2xl text-base leading-7 sm:text-lg ${
            light ? "text-brand-700" : "text-cream-dim"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
