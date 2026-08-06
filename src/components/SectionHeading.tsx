import { SparklesIcon } from "hugeicons-react";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
}) {
  return (
    <div
      className={`flex flex-col gap-4 ${
        align === "center" ? "items-center text-center" : "items-start text-left"
      }`}
    >
      {eyebrow && (
        <span className="inline-flex items-center gap-2 rounded-full border border-brand-600 bg-brand-900 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">
          <SparklesIcon size={14} />
          {eyebrow}
        </span>
      )}
      <h2 className="font-heading max-w-2xl text-3xl font-semibold tracking-tight text-cream sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="max-w-2xl text-base leading-7 text-cream-dim sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
