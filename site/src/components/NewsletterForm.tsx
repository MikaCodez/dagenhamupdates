"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "submitting" | "submitted" | "error";

/** Subscribes to the "Dagenham Updates Newsletter" list on the self-hosted
 * listmonk instance (listmonk/README.md), via /api/newsletter so the
 * browser never sees listmonk's URL or list UUID directly. Double opt-in —
 * listmonk sends a confirmation email before the address is actually
 * subscribed. */
export function NewsletterForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [email, setEmail] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email || status === "submitting") return;
    setStatus("submitting");

    try {
      const formData = new FormData();
      formData.set("email", email);
      const res = await fetch("/api/newsletter", { method: "POST", body: formData });
      if (!res.ok) throw new Error("Subscription failed");
      setStatus("submitted");
    } catch {
      setStatus("error");
    }
  }

  if (status === "submitted") {
    return (
      <p style={{ fontSize: 13, color: "var(--du-ink-secondary)", margin: 0 }}>
        Almost there — check your inbox to confirm your subscription.
      </p>
    );
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          alignItems: "stretch",
          flexWrap: "wrap",
          minWidth: 0,
          border: "1px solid var(--du-rule)",
          background: "var(--du-field)",
        }}
      >
        <label className="du-visually-hidden" htmlFor="du-newsletter-email">
          Your email address
        </label>
        <input
          id="du-newsletter-email"
          type="email"
          required
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            border: 0,
            background: "transparent",
            padding: "0 14px",
            fontSize: 12.5,
            color: "var(--du-ink)",
            flex: "1 1 140px",
            minWidth: 0,
            fontFamily: "var(--du-font-ui)",
          }}
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          style={{
            background: "var(--du-ink)",
            color: "var(--du-ink-inverse)",
            border: 0,
            padding: "13px 18px",
            fontSize: "var(--du-label-button)",
            fontWeight: 700,
            letterSpacing: "var(--du-tracking-button)",
            textTransform: "uppercase",
            cursor: status === "submitting" ? "default" : "pointer",
            opacity: status === "submitting" ? 0.6 : 1,
          }}
        >
          {status === "submitting" ? "Subscribing…" : "Subscribe"}
        </button>
      </form>
      {status === "error" ? (
        <p role="alert" style={{ color: "var(--du-status-severe)", fontSize: 12, margin: "6px 0 0 0" }}>
          Something went wrong — please try again.
        </p>
      ) : null}
    </div>
  );
}
