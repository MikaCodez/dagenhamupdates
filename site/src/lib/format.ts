// Absolute timestamps only — no "14 min ago" style relative time. A static
// build bakes relative time in at build time, where it goes stale and quietly
// misleads readers on a trust-sensitive site. See design-decisions.md's
// "timestamped sources log" reasoning for why corrections/timestamps are
// treated as a trust feature here, not decoration.

const dayFormatter = new Intl.DateTimeFormat("en-GB", {
  weekday: "short",
  day: "numeric",
  month: "short",
});

const dayFormatterWithYear = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

const timeFormatter = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
});

/** "Wed 9 Sep · 09:16" for the current year, "9 Sep 2025 · 09:16" otherwise. */
export function formatDateTime(iso: string, now: Date = new Date()): string {
  const date = new Date(iso);
  const sameYear = date.getFullYear() === now.getFullYear();
  const datePart = sameYear
    ? dayFormatter.format(date)
    : dayFormatterWithYear.format(date);
  return `${datePart} · ${timeFormatter.format(date)}`;
}

/** "9 Sep" / "9 Sep 2025" — for compact card meta. */
export function formatDateShort(iso: string, now: Date = new Date()): string {
  const date = new Date(iso);
  const sameYear = date.getFullYear() === now.getFullYear();
  return sameYear ? dayFormatter.format(date) : dayFormatterWithYear.format(date);
}

export function toIsoDate(iso: string): string {
  return new Date(iso).toISOString();
}

const weekdayShortFormatter = new Intl.DateTimeFormat("en-GB", { weekday: "short" });
const dayOfMonthFormatter = new Intl.DateTimeFormat("en-GB", { day: "numeric" });

/** "Sat" — for the "Coming up" calendar-box day label. */
export function formatWeekdayShort(iso: string): string {
  return weekdayShortFormatter.format(new Date(iso));
}

/** "12" — for the "Coming up" calendar-box date label. */
export function formatDayOfMonth(iso: string): string {
  return dayOfMonthFormatter.format(new Date(iso));
}
