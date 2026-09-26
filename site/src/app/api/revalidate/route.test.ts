import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const revalidatePath = vi.fn();
vi.mock("next/cache", () => ({ revalidatePath }));

describe("POST /api/revalidate", () => {
  const ORIGINAL_ENV = process.env.SANITY_REVALIDATE_SECRET;

  beforeEach(() => {
    revalidatePath.mockClear();
  });

  afterEach(() => {
    process.env.SANITY_REVALIDATE_SECRET = ORIGINAL_ENV;
  });

  it("500s when the secret isn't configured server-side", async () => {
    delete process.env.SANITY_REVALIDATE_SECRET;
    const { POST } = await import("./route");
    const res = await POST(new Request("http://localhost/api/revalidate?secret=anything", { method: "POST" }));
    expect(res.status).toBe(500);
    expect(revalidatePath).not.toHaveBeenCalled();
  });

  it("401s when no secret is provided", async () => {
    process.env.SANITY_REVALIDATE_SECRET = "correct-secret";
    const { POST } = await import("./route");
    const res = await POST(new Request("http://localhost/api/revalidate", { method: "POST" }));
    expect(res.status).toBe(401);
    expect(revalidatePath).not.toHaveBeenCalled();
  });

  it("401s when the wrong secret is provided", async () => {
    process.env.SANITY_REVALIDATE_SECRET = "correct-secret";
    const { POST } = await import("./route");
    const res = await POST(
      new Request("http://localhost/api/revalidate?secret=wrong-secret", { method: "POST" })
    );
    expect(res.status).toBe(401);
    expect(revalidatePath).not.toHaveBeenCalled();
  });

  it("401s on a right-length-but-wrong secret (would slip through a naive prefix check)", async () => {
    process.env.SANITY_REVALIDATE_SECRET = "correct-secret";
    const { POST } = await import("./route");
    const res = await POST(
      new Request("http://localhost/api/revalidate?secret=correct-secreX", { method: "POST" })
    );
    expect(res.status).toBe(401);
  });

  it("200s and revalidates the whole layout when the secret matches", async () => {
    process.env.SANITY_REVALIDATE_SECRET = "correct-secret";
    const { POST } = await import("./route");
    const res = await POST(
      new Request("http://localhost/api/revalidate?secret=correct-secret", { method: "POST" })
    );
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.revalidated).toBe(true);
    expect(revalidatePath).toHaveBeenCalledWith("/", "layout");
  });
});
