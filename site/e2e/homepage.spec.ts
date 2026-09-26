import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test("renders nav, a lead story, and the curated sections", async ({ page }) => {
    await page.goto("/");

    // Under 900px the primary nav is a closed drawer behind a "Menu"
    // toggle (Header.tsx / globals.css's .du-nav-toggle breakpoint) rather
    // than the always-visible desktop list — open it first when present,
    // so this one test covers both layouts instead of assuming either.
    const menuToggle = page.getByRole("button", { name: "Menu" });
    if (await menuToggle.isVisible()) await menuToggle.click();

    await expect(page.getByRole("link", { name: "Latest", exact: true })).toBeVisible();
    await expect(page.getByRole("link", { name: "Newsletter" })).toBeVisible();

    // The lead story (FeaturedCard) is always an <h2> linking to /articles/*
    // — whichever post is actually featured right now, Sanity or fallback.
    const leadHeading = page.getByRole("heading", { level: 2 }).first();
    await expect(leadHeading).toBeVisible();
    await expect(leadHeading.getByRole("link")).toHaveAttribute("href", /^\/articles\//);

    await expect(page.getByText("Coming up")).toBeVisible();
    await expect(page.getByText("Travel & alerts")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Community spotlight" })).toBeVisible();
  });

  test("has no client-side console errors on load", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });
    await page.goto("/", { waitUntil: "load" });
    await page.waitForTimeout(500);
    expect(errors).toEqual([]);
  });

  test("newsletter form shows the double opt-in message without hitting the real backend", async ({ page }) => {
    await page.route("**/api/newsletter", (route) =>
      route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ ok: true }) })
    );
    await page.goto("/");

    await page.getByLabel("Your email address").fill("reader@example.com");
    await page.getByRole("button", { name: "Subscribe" }).click();

    await expect(page.getByText(/check your inbox to confirm your subscription/i)).toBeVisible();
  });
});
