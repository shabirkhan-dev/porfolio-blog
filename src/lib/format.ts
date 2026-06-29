export function formatDate(date: string) {
  // Accept both date-only strings ("2026-06-26") and full ISO timestamps
  // ("2026-06-26T00:00:00.000Z"). Date-only strings get a midnight time so they
  // are not shifted by the local timezone.
  const value = date.includes("T") ? new Date(date) : new Date(`${date}T00:00:00`);

  if (Number.isNaN(value.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(value);
}
