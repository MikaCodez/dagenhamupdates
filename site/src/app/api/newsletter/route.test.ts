import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { POST } from "./route";

// Each call goes through src/lib/rate-limit.ts's shared, module-level
// counter keyed by IP — give every test its own fake IP (via
// x-forwarded-for) so they don't silently exhaust each other's rate-limit
// budget. The one test actually exercising the limiter reuses one IP on
// purpose (see below).
let ipCounter = 0;
function tipRequest(email: string, ip = `test-ip-${ipCounter++}`) {
  const formData = new FormData();
  formData.set("email", email);
  return new Request("http://localhost/api/newsletter", {
    method: "POST",
    body: formData,
    headers: { "x-forwarded-for": ip },
  });
}

describe("POST /api/newsletter", () => {
  const ORIGINAL_URL = process.env.LISTMONK_URL;
  const ORIGINAL_UUID = process.env.LISTMONK_LIST_UUID;

  beforeEach(() => {
    process.env.LISTMONK_URL = "http://listmonk.test";
    process.env.LISTMONK_LIST_UUID = "list-uuid";
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    process.env.LISTMONK_URL = ORIGINAL_URL;
    process.env.LISTMONK_LIST_UUID = ORIGINAL_UUID;
    vi.unstubAllGlobals();
  });

  it("400s with no email", async () => {
    const res = await POST(tipRequest(""));
    expect(res.status).toBe(400);
  });

  it("400s on an obviously invalid email", async () => {
    const res = await POST(tipRequest("not-an-email"));
    expect(res.status).toBe(400);
    expect(fetch).not.toHaveBeenCalled();
  });

  it("503s when listmonk isn't configured", async () => {
    delete process.env.LISTMONK_URL;
    const res = await POST(tipRequest("reader@example.com"));
    expect(res.status).toBe(503);
  });

  it("proxies a valid email to listmonk's public subscription endpoint", async () => {
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValue(new Response(null, { status: 200 }));
    const res = await POST(tipRequest("reader@example.com"));
    expect(res.status).toBe(200);
    expect(fetch).toHaveBeenCalledWith(
      "http://listmonk.test/api/public/subscription",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({ email: "reader@example.com", list_uuids: ["list-uuid"] }),
      })
    );
  });

  it("502s when listmonk rejects the subscription", async () => {
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValue(new Response("bad request", { status: 400 }));
    const res = await POST(tipRequest("reader@example.com"));
    expect(res.status).toBe(502);
  });

  it("502s when listmonk is unreachable", async () => {
    (fetch as ReturnType<typeof vi.fn>).mockRejectedValue(new Error("ECONNREFUSED"));
    const res = await POST(tipRequest("reader@example.com"));
    expect(res.status).toBe(502);
  });

  it("429s once the per-IP rate limit is exceeded", async () => {
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValue(new Response(null, { status: 200 }));
    const ip = "rate-limit-test-ip";
    let last: Response | undefined;
    for (let i = 0; i < 6; i++) {
      last = await POST(tipRequest(`reader+${i}@example.com`, ip));
    }
    expect(last!.status).toBe(429);
  });
});
