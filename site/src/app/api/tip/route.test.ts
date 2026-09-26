import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// vi.mock(...) calls are hoisted above every other statement in this file
// (including `const` declarations textually above them) — anything a mock
// factory closes over has to come from vi.hoisted(), or it's a
// temporal-dead-zone ReferenceError at import time.
const { create, upload, sanityEnv, sendEmail } = vi.hoisted(() => ({
  create: vi.fn(),
  upload: vi.fn(),
  // Mutable so individual tests can flip Sanity "configured" on/off without
  // re-importing the route module (its env checks happen per-request,
  // inside the handler, same as the real src/sanity/env.ts).
  sanityEnv: { isSanityConfigured: false, writeToken: undefined as string | undefined },
  sendEmail: vi.fn(),
}));

vi.mock("@/sanity/writeClient", () => ({
  writeClient: { create, assets: { upload } },
}));
vi.mock("@/sanity/env", () => sanityEnv);
vi.mock("resend", () => ({
  Resend: vi.fn().mockImplementation(() => ({ emails: { send: sendEmail } })),
}));

import { POST } from "./route";

let ipCounter = 0;
function tipFormData(overrides: Record<string, string> = {}) {
  const formData = new FormData();
  formData.set("subject", overrides.subject ?? "A test tip");
  formData.set("message", overrides.message ?? "Something worth checking out.");
  formData.set("type", overrides.type ?? "News");
  formData.set("anonymous", overrides.anonymous ?? "true");
  return formData;
}

function tipRequest(formData: FormData, ip = `test-ip-${ipCounter++}`) {
  return new Request("http://localhost/api/tip", {
    method: "POST",
    body: formData,
    headers: { "x-forwarded-for": ip },
  });
}

describe("POST /api/tip", () => {
  beforeEach(() => {
    create.mockReset().mockResolvedValue({ _id: "submission-1" });
    upload.mockReset().mockResolvedValue({ _id: "file-asset-1" });
    sendEmail.mockReset();
    sanityEnv.isSanityConfigured = false;
    sanityEnv.writeToken = undefined;
    delete process.env.RESEND_API_KEY;
  });

  afterEach(() => {
    vi.unstubAllEnvs?.();
  });

  it("400s when a required field is missing", async () => {
    const formData = tipFormData();
    formData.delete("subject");
    const res = await POST(tipRequest(formData));
    expect(res.status).toBe(400);
  });

  it("logs only (still 200s) when Sanity isn't configured", async () => {
    const res = await POST(tipRequest(tipFormData()));
    expect(res.status).toBe(200);
    expect(create).not.toHaveBeenCalled();
  });

  it("writes a submission document when Sanity is configured", async () => {
    sanityEnv.isSanityConfigured = true;
    sanityEnv.writeToken = "write-token";
    const res = await POST(tipRequest(tipFormData()));
    expect(res.status).toBe(200);
    expect(create).toHaveBeenCalledWith(
      expect.objectContaining({ _type: "submission", subject: "A test tip", status: "new" })
    );
  });

  it("400s on an oversized subject/message (no unbounded text)", async () => {
    const res = await POST(tipRequest(tipFormData({ message: "x".repeat(9000) })));
    expect(res.status).toBe(400);
  });

  it("415s on an attachment type outside the allowlist", async () => {
    const formData = tipFormData();
    formData.set(
      "attachment",
      new File(["#!/bin/sh\necho hi"], "script.sh", { type: "application/x-sh" })
    );
    const res = await POST(tipRequest(formData));
    expect(res.status).toBe(415);
    expect(upload).not.toHaveBeenCalled();
  });

  it("413s on an attachment over the size cap", async () => {
    sanityEnv.isSanityConfigured = true;
    sanityEnv.writeToken = "write-token";
    const big = new Uint8Array(9 * 1024 * 1024); // 9MB > 8MB cap
    const formData = tipFormData();
    formData.set("attachment", new File([big], "photo.png", { type: "image/png" }));
    const res = await POST(tipRequest(formData));
    expect(res.status).toBe(413);
    expect(upload).not.toHaveBeenCalled();
  });

  it("accepts an attachment within the allowlist and size cap", async () => {
    sanityEnv.isSanityConfigured = true;
    sanityEnv.writeToken = "write-token";
    const formData = tipFormData();
    formData.set("attachment", new File(["fake-image-bytes"], "photo.png", { type: "image/png" }));
    const res = await POST(tipRequest(formData));
    expect(res.status).toBe(200);
    expect(upload).toHaveBeenCalledWith("file", expect.any(Buffer), { filename: "photo.png" });
  });

  it("429s once the per-IP rate limit is exceeded", async () => {
    const ip = "tip-rate-limit-test-ip";
    let last: Response | undefined;
    for (let i = 0; i < 6; i++) {
      last = await POST(tipRequest(tipFormData(), ip));
    }
    expect(last!.status).toBe(429);
  });
});
