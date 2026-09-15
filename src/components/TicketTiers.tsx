import { ArrowRight02Icon, CheckmarkCircle02Icon, StarIcon } from "hugeicons-react";
import Button from "./Button";
import { TICKETS } from "@/lib/data";

export default function TicketTiers() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {TICKETS.map((ticket) => (
        <div
          key={ticket.name}
          className={`flex flex-col gap-6 rounded-3xl border p-8 transition-all duration-300 hover:-translate-y-1 ${
            ticket.highlighted
              ? "border-gold-400 bg-brand-900/80 shadow-[0_0_0_1px_rgba(212,162,76,0.3)]"
              : "border-brand-800 bg-brand-950/60 hover:border-gold-400/50"
          }`}
        >
          {ticket.highlighted && (
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-gold-400 px-3 py-1 text-xs font-semibold text-brand-950">
              <StarIcon size={14} />
              Most Popular
            </span>
          )}
          <div>
            <h3 className="font-heading text-lg font-semibold text-cream">
              {ticket.name}
            </h3>
            <p className="mt-1 text-sm text-cream-dim">{ticket.description}</p>
          </div>
          <p className="text-4xl font-semibold text-cream">
            <span className="font-sans">₦</span>
            <span className="font-mono">{ticket.price.replace("₦", "")}</span>
          </p>
          <ul className="flex flex-col gap-3">
            {ticket.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2 text-sm text-cream-dim">
                <CheckmarkCircle02Icon size={18} className="mt-0.5 shrink-0 text-gold-400" />
                {feature}
              </li>
            ))}
          </ul>
          {ticket.note && (
            <p className="text-xs text-cream-dim/70">{ticket.note}</p>
          )}
          <Button
            href={ticket.paymentLink}
            variant={ticket.highlighted ? "primary" : "secondary"}
            className="mt-auto w-full"
          >
            Get {ticket.name} Ticket
            <ArrowRight02Icon
              size={16}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </Button>
        </div>
      ))}
    </div>
  );
}
