"use client";

import { useState, type FormEvent } from "react";

/** PRD §6.2 puts full newsletter automation out of MVP scope and
 * design-decisions.md's open questions note no provider is chosen yet — this
 * captures an email address in the UI and confirms locally. It does not send
 * anywhere; wire a real provider (Mailchimp, Buttondown, etc.) before launch. */
export function NewsletterForm() {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email) return;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <p style={{ fontSize: 13, color: "var(--du-ink-secondary)", margin: 0 }}>
        Thanks — we'll be in touch once the round-up is live.
      </p>
    );
  }

  return (
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
        style={{
          background: "var(--du-ink)",
          color: "var(--du-ink-inverse)",
          border: 0,
          padding: "13px 18px",
          fontSize: "var(--du-label-button)",
          fontWeight: 700,
          letterSpacing: "var(--du-tracking-button)",
          textTransform: "uppercase",
          cursor: "pointer",
        }}
      >
        Subscribe
      </button>
    </form>
  );
}
