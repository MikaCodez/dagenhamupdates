// Minimal top-level fallback — real site 404s are handled by the styled
// app/(site)/not-found.tsx, which wins for every ordinary page. This one only
// fires for a URL that doesn't match anything routable at all.
export default function RootNotFound() {
  return (
    <div style={{ padding: 40, fontFamily: "system-ui, sans-serif" }}>
      <p>Page not found.</p>
      <a href="/">Back to homepage</a>
    </div>
  );
}
