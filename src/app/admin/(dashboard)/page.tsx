import { withDb } from "@/lib/db";
import { EVENT } from "@/lib/data";

export const dynamic = "force-dynamic";

async function getCounts() {
  return withDb(async (db) => {
    const [volunteers, speakers, tickets] = await Promise.all([
      db.query<{ count: string }>(`select count(*) from volunteer_applications`),
      db.query<{ count: string }>(
        `select count(*) from call_form_submissions where form_type = 'speaker'`
      ),
      db.query<{ count: string }>(
        `select count(*) from ticket_orders where status = 'success'`
      ),
    ]);

    return {
      volunteers: Number(volunteers.rows[0].count),
      speakers: Number(speakers.rows[0].count),
      ticketsSold: Number(tickets.rows[0].count),
    };
  });
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
