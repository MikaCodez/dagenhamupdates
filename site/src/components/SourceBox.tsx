/** PRD §13.2's editorial disclaimer, placed where people actually read
 * (homepage rail + article rail) rather than buried on About — see
 * design-decisions.md, "Additions beyond the wireframe" #1. */
export function SourceBox() {
  return (
    <div
      style={{
        border: "1px solid var(--du-rule)",
        background: "var(--du-panel)",
        padding: "var(--du-space-5)",
      }}
    >
      <div className="du-label-box" style={{ color: "var(--du-ink-muted)" }}>
        How we source
      </div>
      <p
        style={{
          fontSize: "var(--du-body-sm)",
          lineHeight: 1.55,
          color: "var(--du-ink-secondary)",
          margin: "7px 0 0 0",
          textWrap: "pretty",
        }}
      >
        Updates are checked against council, transport and emergency service
        sources where possible. Unconfirmed reports are labelled. For urgent
        situations, always check official sources.
      </p>
    </div>
  );
}
