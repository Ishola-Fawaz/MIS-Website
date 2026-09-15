import { supabaseAdmin } from "@/lib/supabase-admin";
import { EVENT } from "@/lib/data";

export const dynamic = "force-dynamic";

async function getCounts() {
  const [volunteers, speakers, tickets] = await Promise.all([
    supabaseAdmin
      .from("volunteer_applications")
      .select("*", { count: "exact", head: true }),
    supabaseAdmin
      .from("call_form_submissions")
      .select("*", { count: "exact", head: true })
      .eq("form_type", "speaker"),
    supabaseAdmin
      .from("ticket_orders")
      .select("*", { count: "exact", head: true })
      .eq("status", "success"),
  ]);

  return {
    volunteers: volunteers.count ?? 0,
    speakers: speakers.count ?? 0,
    ticketsSold: tickets.count ?? 0,
  };
}

export default async function AdminOverviewPage() {
  const { volunteers, speakers, ticketsSold } = await getCounts();
  const seatsRemaining = Math.max(EVENT.seats - ticketsSold, 0);

  const stats = [
    { label: "Volunteer applications", value: volunteers },
    { label: "Speaker submissions", value: speakers },
    { label: "Tickets sold", value: ticketsSold },
    { label: "Seats remaining", value: seatsRemaining },
  ];

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex flex-col gap-2 rounded-3xl border border-brand-800 bg-brand-900/40 p-6"
        >
          <span className="text-sm text-cream-dim">{stat.label}</span>
          <span className="font-mono text-3xl font-semibold text-cream">
            {stat.value}
          </span>
        </div>
      ))}
    </div>
  );
}
