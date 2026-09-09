"use client";

import { useId, useState, type FormEvent } from "react";
import { tipTypes } from "@/lib/content/tip-types";
import { Button } from "./Button";

type Status = "idle" | "submitting" | "submitted" | "error";

/** Matches design/canvas/Tip.dc.html: type selector changes the hint and
 * subject placeholder; anonymous removes the name/email fields entirely
 * rather than greying them out (design-decisions.md, "Interaction
 * decisions") and says plainly what's lost. */
export function TipForm() {
  const [activeType, setActiveType] = useState(tipTypes[0].name);
  const [anonymous, setAnonymous] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const formId = useId();

  const type = tipTypes.find((t) => t.name === activeType) ?? tipTypes[0];

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.set("type", activeType);
    formData.set("anonymous", String(anonymous));

    try {
      const res = await fetch("/api/tip", { method: "POST", body: formData });
      if (!res.ok) throw new Error("Submission failed");
      setStatus("submitted");
    } catch {
      setStatus("error");
    }
  }

  if (status === "submitted") {
    return (
      <div style={{ border: "1px solid var(--du-ink)", padding: "var(--du-space-6)" }}>
        <p className="du-headline" style={{ fontSize: "var(--du-display-3)", margin: 0 }}>
          Thanks — it's with us.
        </p>
        <p style={{ fontSize: "var(--du-body)", color: "var(--du-ink-secondary)", marginTop: 10 }}>
          We read every submission. If we need more detail and you gave us a way
          to reach you, we'll follow up. Not every tip becomes a story — but
          nothing sent is wasted.
        </p>
        <Button type="button" style={{ marginTop: 16 }} onClick={() => setStatus("idle")}>
          Send another
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "var(--du-space-5)" }}>
      <div className="du-field">
        <span id={`${formId}-type-label`}>What are you sending?</span>
        <div className="du-type-grid" role="group" aria-labelledby={`${formId}-type-label`}>
          {tipTypes.map((t) => (
            <button
              key={t.name}
              type="button"
              className="du-type-pill"
              aria-pressed={t.name === activeType}
              onClick={() => setActiveType(t.name)}
            >
              {t.name}
            </button>
          ))}
        </div>
        <p style={{ fontSize: "var(--du-body-sm)", color: "var(--du-ink-muted)", margin: "6px 0 0 0" }}>
          {type.hint}
        </p>
      </div>

      <div className="du-field">
        <label htmlFor={`${formId}-subject`}>Subject</label>
        <input
          id={`${formId}-subject`}
          name="subject"
          type="text"
          required
          placeholder={type.subjectPlaceholder}
        />
      </div>

      <div className="du-field">
        <label htmlFor={`${formId}-message`}>Details</label>
        <textarea id={`${formId}-message`} name="message" required />
      </div>

      <div className="du-field">
        <label htmlFor={`${formId}-attachment`}>Attachment (optional)</label>
        <input id={`${formId}-attachment`} name="attachment" type="file" accept="image/*,.pdf" />
      </div>

      <div className="du-toggle-row">
        <input
          id={`${formId}-anon`}
          type="checkbox"
          checked={anonymous}
          onChange={(e) => setAnonymous(e.target.checked)}
          style={{ width: 18, height: 18 }}
        />
        <label htmlFor={`${formId}-anon`} style={{ fontSize: "var(--du-body)", fontWeight: 600 }}>
          Send this anonymously
        </label>
      </div>

      {anonymous ? (
        <p style={{ fontSize: "var(--du-body-sm)", color: "var(--du-ink-muted)", margin: 0 }}>
          We won't ask for your name or email. This means we can't come back to
          you for more detail or let you know what happened with your tip.
        </p>
      ) : (
        <>
          <div className="du-field">
            <label htmlFor={`${formId}-name`}>Name</label>
            <input id={`${formId}-name`} name="name" type="text" autoComplete="name" />
          </div>
          <div className="du-field">
            <label htmlFor={`${formId}-email`}>Email</label>
            <input id={`${formId}-email`} name="email" type="email" autoComplete="email" />
          </div>
        </>
      )}

      <div>
        <Button type="submit" variant="primary" fullWidthOnMobile disabled={status === "submitting"}>
          {status === "submitting" ? "Sending…" : "Send it over"}
        </Button>
        {status === "error" ? (
          <p role="alert" style={{ color: "var(--du-status-severe)", fontSize: "var(--du-body-sm)", marginTop: 10 }}>
            Something went wrong sending that — please try again.
          </p>
        ) : null}
      </div>
    </form>
  );
}
