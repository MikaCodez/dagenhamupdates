import path from "node:path";
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// Unit + integration tests (Vitest) — Playwright's e2e suite is separate,
// see playwright.config.ts and TESTING.md.
//
// Environment defaults to "node": most of what's under test here (content
// helpers, format functions, API route handlers) is plain server-side
// logic and Node's native fetch Request/Response cover the route-handler
// tests without needing a DOM. The couple of component tests that do need
// one opt in per-file with a `// @vitest-environment jsdom` comment at the
// top of the file, rather than paying jsdom's cost for every test.
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "node",
    include: ["src/**/*.test.{ts,tsx}"],
    setupFiles: ["./vitest.setup.ts"],
  },
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
});
