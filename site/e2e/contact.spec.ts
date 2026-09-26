import { test, expect } from "@playwright/test";

test.describe("Contact / tip form", () => {
  test("required fields block submission before the network request fires", async ({ page }) => {
    let requested = false;
    await page.route("**/api/tip", (route) => {
      requested = true;
      return route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ ok: true }) });
    });

    await page.goto("/contact");
    await page.getByRole("button", { name: /send it over/i }).click();

    // Native required-field validation keeps the browser on the page and
    // never dispatches the fetch — this is a real guard, not a UI nicety,
    // since the form has no client-side JS validation of its own.
    await expect(page).toHaveURL(/\/contact$/);
    expect(requested).toBe(false);
  });

  test("submitting a valid tip anonymously shows the thank-you state", async ({ page }) => {
    await page.route("**/api/tip", (route) =>
      route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ ok: true }) })
    );

    await page.goto("/contact");
    await page.getByLabel("Subject").fill("A test tip from the e2e suite");
    await page.getByLabel("Details").fill("Nothing real — just exercising the form.");
    await page.getByLabel(/send this anonymously/i).check();
    await page.getByRole("button", { name: /send it over/i }).click();

    await expect(page.getByText(/thanks — it's with us/i)).toBeVisible();
  });

  test("toggling anonymous removes the name/email fields", async ({ page }) => {
    await page.goto("/contact");
    await expect(page.getByLabel("Name")).toBeVisible();
    await page.getByLabel(/send this anonymously/i).check();
    await expect(page.getByLabel("Name")).toHaveCount(0);
  });
});
