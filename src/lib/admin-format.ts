export function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString("en-NG", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export function formatNaira(kobo: number | null) {
  if (kobo == null) return "—";
  return `₦${(kobo / 100).toLocaleString("en-NG")}`;
}
