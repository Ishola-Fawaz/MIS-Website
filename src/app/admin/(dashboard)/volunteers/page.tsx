import { supabaseAdmin } from "@/lib/supabase-admin";
import { formatDateTime } from "@/lib/admin-format";

export const dynamic = "force-dynamic";

type VolunteerApplication = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string;
  availability: string | null;
  department: string;
  roles: string[];
};

export default async function AdminVolunteersPage() {
  const { data, error } = await supabaseAdmin
    .from("volunteer_applications")
    .select("*")
    .order("created_at", { ascending: false })
    .returns<VolunteerApplication[]>();

  if (error) {
    return <p className="text-sm text-red-400">Failed to load volunteers: {error.message}</p>;
  }

  const applications = data ?? [];

  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-heading text-xl font-semibold text-cream">
        Volunteer applications ({applications.length})
      </h1>
      {applications.length === 0 ? (
        <p className="text-sm text-cream-dim">No applications yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-3xl border border-brand-800">
          <table className="w-full text-left text-sm">
            <thead className="bg-brand-900/60 text-cream-dim">
              <tr>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Phone</th>
                <th className="px-4 py-3 font-medium">Department</th>
                <th className="px-4 py-3 font-medium">Roles</th>
                <th className="px-4 py-3 font-medium">Availability</th>
                <th className="px-4 py-3 font-medium">Submitted</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app.id} className="border-t border-brand-800 bg-brand-900/40 align-top">
                  <td className="px-4 py-3 text-cream">{app.name}</td>
                  <td className="px-4 py-3 text-cream-dim">{app.email}</td>
                  <td className="px-4 py-3 text-cream-dim">{app.phone}</td>
                  <td className="px-4 py-3 text-cream-dim">{app.department}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1.5">
                      {app.roles.map((role) => (
                        <span
                          key={role}
                          className="rounded-full border border-brand-700 bg-brand-950/60 px-2.5 py-1 text-xs text-cream-dim"
                        >
                          {role}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-cream-dim">{app.availability || "—"}</td>
                  <td className="px-4 py-3 font-mono text-xs text-cream-dim">
                    {formatDateTime(app.created_at)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
