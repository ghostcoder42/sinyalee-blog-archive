const ILLEGAL_CHARS = /[/:*?"<>|]/g;

export function sanitizeFilename(title: string): string {
  return title
    .replace(ILLEGAL_CHARS, "")
    .trim()
    .replace(/^[.]+|[.]+$/g, "")
    .slice(0, 80);
}

export function generateSlug(
  title: string,
  date: string,
): { year: string; monthDay: string; slug: string } {
  const sanitized = sanitizeFilename(title);
  const dateOnly = date.split("T")[0];
  const [year, month, day] = dateOnly.split("-");
  const monthDay = `${month}${day}`;
  return {
    year,
    monthDay,
    slug: `${monthDay}-${sanitized}`,
  };
}
