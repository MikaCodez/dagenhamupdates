import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="du-container"
      style={{ paddingBlock: "var(--du-space-8)", textAlign: "center" }}
    >
      <p className="du-kicker">404</p>
      <h1 className="du-headline" style={{ fontSize: "var(--du-display-page)", margin: "10px 0 0 0" }}>
        Page not found
      </h1>
      <p style={{ fontSize: "var(--du-body)", color: "var(--du-ink-secondary)", marginTop: 12 }}>
        That page doesn't exist, or has moved.
      </p>
      <Link
        href="/"
        style={{
          display: "inline-block",
          marginTop: 20,
          border: "1px solid var(--du-ink)",
          padding: "13px 20px",
          fontSize: "var(--du-label-button)",
          fontWeight: 700,
          letterSpacing: "var(--du-tracking-button)",
          textTransform: "uppercase",
          borderBottom: "1px solid var(--du-ink)",
        }}
      >
        Back to homepage
      </Link>
    </div>
  );
}
