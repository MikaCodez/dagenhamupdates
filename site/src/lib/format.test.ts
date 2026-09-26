import { describe, expect, it } from "vitest";
import {
  formatDateTime,
  formatDateShort,
  formatWeekdayShort,
  formatDayOfMonth,
  toIsoDate,
} from "./format";

// format.ts is deterministic given an injected `now` — see its own comment
// on why absolute time is a trust feature here, not decoration. These tests
// pin `now` explicitly so they never depend on the real clock.

describe("formatDateTime", () => {
  // Deliberately avoiding September in these fixtures: en-GB's CLDR data
  // abbreviates it to "Sept" (3 letters everywhere else), which is a real
  // locale-data quirk, not something this function controls — asserting on
  // it would make the test depend on the runtime's ICU version rather than
  // on format.ts's own logic.
  it("omits the year for a date in the current year", () => {
    const now = new Date("2026-12-09T12:00:00Z");
    expect(formatDateTime("2026-12-09T09:16:00+01:00", now)).toBe("Wed 9 Dec · 08:16");
  });

  it("includes the year for a date in a different year", () => {
    const now = new Date("2026-12-09T12:00:00Z");
    expect(formatDateTime("2025-12-25T09:00:00Z", now)).toBe("25 Dec 2025 · 09:00");
  });
});

describe("formatDateShort", () => {
  it("matches formatDateTime's same-year/different-year rule, without the weekday or time", () => {
    const now = new Date("2026-12-09T12:00:00Z");
    expect(formatDateShort("2026-01-01T00:00:00Z", now)).toBe("1 Jan");
    expect(formatDateShort("2024-01-01T00:00:00Z", now)).toBe("1 Jan 2024");
  });
});

describe("formatWeekdayShort / formatDayOfMonth", () => {
  it("format the 'Coming up' calendar box's two lines", () => {
    // A Saturday.
    expect(formatWeekdayShort("2026-09-26T11:00:00+01:00")).toBe("Sat");
    expect(formatDayOfMonth("2026-09-26T11:00:00+01:00")).toBe("26");
  });
});

describe("toIsoDate", () => {
  it("round-trips any parseable date string to a full ISO string", () => {
    expect(toIsoDate("2026-09-09T09:16:00+01:00")).toBe("2026-09-09T08:16:00.000Z");
  });
});
