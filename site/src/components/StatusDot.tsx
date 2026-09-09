const labels = {
  severe: "Closed",
  minor: "Delays",
  clear: "Clear",
} as const;

const colors = {
  severe: "var(--du-status-severe)",
  minor: "var(--du-status-minor)",
  clear: "var(--du-status-clear)",
} as const;

/** Travel status is never colour alone — the dot always sits beside its word
 * (tokens.css comment on --du-status-*; PRD §10 accessibility). */
export function StatusDot({ severity }: { severity: keyof typeof labels }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
      <span
        aria-hidden="true"
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: colors[severity],
          display: "inline-block",
        }}
      />
      <span
        style={{
          fontSize: "var(--du-body-sm)",
          fontWeight: 700,
          color: "var(--du-ink-secondary)",
        }}
      >
        {labels[severity]}
      </span>
    </span>
  );
}
