"use client";

import { useVisualEditingEnvironment } from "next-sanity/hooks";

/** A way out of Draft Mode for content authors who followed a preview link
 * outside Studio's Presentation Tool — inside Presentation itself this
 * stays hidden (Studio's own chrome handles exiting preview there). See
 * next-sanity's `useVisualEditingEnvironment`: null while unresolved,
 * "presentation-iframe"/"presentation-window" inside Presentation,
 * "standalone" everywhere else. */
export function DisableDraftMode() {
  const environment = useVisualEditingEnvironment();
  if (environment !== "standalone") return null;

  return (
    <a
      href="/api/draft-mode/disable"
      style={{
        position: "fixed",
        bottom: "var(--du-space-5)",
        right: "var(--du-space-5)",
        zIndex: 100,
        background: "var(--du-ink)",
        color: "var(--du-ink-inverse)",
        padding: "11px 18px",
        fontSize: "var(--du-label-button)",
        fontWeight: 700,
        letterSpacing: "var(--du-tracking-button)",
        textTransform: "uppercase",
        borderBottom: "none",
      }}
    >
      Exit preview
    </a>
  );
}
