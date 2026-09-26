import { defineConfig, devices } from "@playwright/test";

// End-to-end checks — real rendered pages in a real browser, on top of
// Vitest's unit/route tests (vitest.config.mts). See TESTING.md.
//
// These run against whatever content `npm run dev` actually serves,
// Sanity-backed or the local fallback — assertions below stick to
// structure that's true either way (nav present, an article renders,
// forms exist) rather than specific post titles, so the suite doesn't
// need rewriting every time the CMS content changes.
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: "list",
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL || "http://localhost:3210",
    trace: "on-first-retry",
  },
  projects: [
    { name: "desktop-chromium", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } } },
    { name: "mobile-chromium", use: { ...devices["Pixel 7"] } },
  ],
  webServer: {
    command: "npm run dev -- -p 3210",
    url: "http://localhost:3210",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
